import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Prompt, MainCategory, Comment } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { SAMPLE_PROMPTS, CATEGORY_DATA } from '../constants';
import { generateBatchPrompts, setStoredApiKey } from '../services/geminiService';

interface PromptContextType {
  prompts: Prompt[];
  isLoading: boolean;
  addPrompt: (prompt: Omit<Prompt, 'id' | 'created_at' | 'comments' | 'likes'>) => Promise<boolean>;
  deletePrompt: (id: string) => Promise<void>;
  addComment: (promptId: string, commentContent: string) => Promise<void>;
  toggleLike: (promptId: string) => Promise<void>;
  seedPrompts: () => Promise<void>;
  autoGeneratePrompts: () => Promise<void>;
  selectedCategory: MainCategory;
  setSelectedCategory: (category: MainCategory) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (subCategory: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPrompts: Prompt[];
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>('全部');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch prompts when component mounts or user changes
  useEffect(() => {
    fetchPrompts();
  }, [user]);

  const fetchPrompts = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch all prompts with comments
      const { data: promptsData, error: promptsError } = await supabase
        .from('prompts')
        .select(`
          *,
          comments (
            id, content, created_at, author_name, author_id
          )
        `)
        .order('created_at', { ascending: false });

      if (promptsError) throw promptsError;

      let formattedPrompts: Prompt[] = (promptsData as Prompt[]) || [];

      // 2. If user is logged in, fetch their likes to determine status
      if (user) {
        const { data: likesData, error: likesError } = await supabase
          .from('user_likes')
          .select('prompt_id')
          .eq('user_id', user.id);

        if (!likesError && likesData) {
          const likedPromptIds = new Set(likesData.map(l => l.prompt_id));
          formattedPrompts = formattedPrompts.map(p => ({
            ...p,
            user_has_liked: likedPromptIds.has(p.id)
          }));
        }
      }

      setPrompts(formattedPrompts);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePrompt = async (id: string) => {
    if (!confirm('确定要删除这个提示词吗？此操作无法撤销。')) return;

    // Optimistic update
    setPrompts(prev => prev.filter(p => p.id !== id));

    try {
      const { error } = await supabase
        .from('prompts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting prompt:', error);
      alert('删除失败，可能是权限不足');
      fetchPrompts(); // Revert
    }
  };

  const toggleLike = async (promptId: string) => {
    if (!user) {
      alert("请先登录再点赞");
      return;
    }

    const promptIndex = prompts.findIndex(p => p.id === promptId);
    if (promptIndex === -1) return;

    const prompt = prompts[promptIndex];
    const isLiked = prompt.user_has_liked;

    // Optimistic Update
    const newPrompts = [...prompts];
    newPrompts[promptIndex] = {
      ...prompt,
      likes: isLiked ? Math.max(0, prompt.likes - 1) : prompt.likes + 1,
      user_has_liked: !isLiked
    };
    setPrompts(newPrompts);

    try {
      if (isLiked) {
        // Remove like
        const { error } = await supabase
          .from('user_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('prompt_id', promptId);
          
        if (error) throw error;

        // Decrement counter
        await supabase
            .from('prompts')
            .update({ likes: Math.max(0, prompt.likes - 1) })
            .eq('id', promptId);

      } else {
        // Add like
        const { error } = await supabase
          .from('user_likes')
          .insert([{ user_id: user.id, prompt_id: promptId }]);
        
        if (error) throw error;

        // Increment counter
        await supabase
            .from('prompts')
            .update({ likes: prompt.likes + 1 })
            .eq('id', promptId);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert on error
      fetchPrompts();
    }
  };

  const addPrompt = async (newPromptData: Omit<Prompt, 'id' | 'created_at' | 'comments' | 'likes'>) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('prompts')
        .insert([{
          title: newPromptData.title,
          description: newPromptData.description,
          content: newPromptData.content,
          tags: newPromptData.tags,
          author_id: user.id,
          author_name: user.name,
          is_paid: newPromptData.is_paid,
          price: newPromptData.price
        }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const newPrompt: Prompt = { ...data, comments: [] };
        setPrompts(prev => [newPrompt, ...prev]);
        return true;
      }
    } catch (error) {
      console.error('Error adding prompt:', error);
      alert('发布失败：无法连接到数据库。请检查 Supabase 配置。');
      return false;
    }
    return false;
  };

  const addComment = async (promptId: string, commentContent: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          prompt_id: promptId,
          content: commentContent,
          author_id: user.id,
          author_name: user.name
        }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setPrompts(prev => prev.map(p => {
          if (p.id === promptId) {
            const currentComments = p.comments || [];
            return { ...p, comments: [...currentComments, data as Comment] };
          }
          return p;
        }));
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Function to seed database with sample data
  const seedPrompts = async () => {
    if (!user) {
      alert('请先登录才能填充数据');
      return;
    }

    if (!confirm(`确定要将 ${SAMPLE_PROMPTS.length} 个演示提示词写入数据库吗？这可能需要几秒钟。`)) return;

    try {
      setIsLoading(true);
      
      // Batch insert to avoid payload too large or timeout
      const BATCH_SIZE = 5;
      for (let i = 0; i < SAMPLE_PROMPTS.length; i += BATCH_SIZE) {
        const batch = SAMPLE_PROMPTS.slice(i, i + BATCH_SIZE).map(p => ({
            ...p,
            author_id: user.id,
            author_name: user.name
        }));
        
        const { error } = await supabase
            .from('prompts')
            .insert(batch);
        
        if (error) {
            console.error(`Batch ${i/BATCH_SIZE + 1} failed:`, error);
            throw error;
        }
      }

      alert('数据填充成功！请刷新页面查看。');
      fetchPrompts(); // Refresh list
    } catch (error) {
      console.error('Seed error:', error);
      alert('填充失败，请查看控制台');
    } finally {
      setIsLoading(false);
    }
  };

  // NEW: Function to auto-generate prompts using Gemini (Parallel Mode)
  const autoGeneratePrompts = async () => {
    if (!user) {
      alert('请先登录');
      return;
    }

    try {
      setIsLoading(true);
      
      // 1. Pick a random category
      const categories = CATEGORY_DATA.filter(c => c.name !== '全部');
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      
      console.log(`Starting parallel generation for: ${randomCat.name}`);

      // 2. Parallel Requests:
      // We want ~45-50 prompts.
      // Launching 3 parallel requests of 15 prompts each = 45 prompts.
      // This is faster and safer than 1 request of 50 (which often timeouts).
      const BATCH_COUNT = 3; 
      const PROMPTS_PER_BATCH = 15;

      const requests = Array(BATCH_COUNT).fill(null).map(() => 
         generateBatchPrompts(randomCat.name, PROMPTS_PER_BATCH)
           .catch(err => {
             console.warn("One batch failed, continuing with others:", err);
             return []; // Return empty array on failure so Promise.all doesn't crash completely
           })
      );

      const results = await Promise.all(requests);
      
      // Flatten the array of arrays
      const generatedData = results.flat();

      if (generatedData.length === 0) {
        throw new Error("All AI batches failed. Please check your API Key or Quota.");
      }

      // 3. Format data for Supabase
      const promptsToInsert = generatedData.map((p: any) => ({
        title: p.title,
        description: p.description,
        content: p.content,
        tags: Array.isArray(p.tags) ? [...p.tags, 'AI生成'] : [randomCat.name, 'AI生成'],
        author_id: user.id,
        author_name: `${user.name} (AI)`, 
        is_paid: false,
        price: 0
      }));

      // 4. Insert into DB (Supabase can handle 50 rows easily)
      const { error } = await supabase.from('prompts').insert(promptsToInsert);
      
      if (error) throw error;

      alert(`🚀 成功！${promptsToInsert.length} 个 "${randomCat.name}" 类别的提示词已入库！`);
      fetchPrompts(); // Refresh list

    } catch (error: any) {
      console.error("Auto generate error:", error);
      
      const errorStr = String(error);
      const isApiKeyError = 
        errorStr.includes('API key') || 
        errorStr.includes('403') || 
        errorStr.includes('401') ||
        errorStr.includes('MISSING_API_KEY');

      if (isApiKeyError || errorStr.includes('503') || errorStr.includes('404')) {
          const newKey = window.prompt(
            `AI 生成出错 (${error.message || 'API Error'}).\n\n请输入有效的 Google Gemini API Key 以继续：`, 
            ""
          );
          
          if (newKey) {
            setStoredApiKey(newKey);
            // Retry automatically
            setTimeout(() => autoGeneratePrompts(), 500);
            return;
          }
      } else {
         alert(`AI 生成失败: ${error.message || String(error)}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === '全部') return true;
    
    const matchesCategory = prompt.tags.includes(selectedCategory);
    
    if (selectedSubCategory) {
      return prompt.tags.some(t => t.toLowerCase() === selectedSubCategory.toLowerCase());
    }

    return matchesCategory;
  });

  return (
    <PromptContext.Provider value={{
      prompts,
      isLoading,
      addPrompt,
      deletePrompt,
      addComment,
      toggleLike,
      seedPrompts,
      autoGeneratePrompts,
      selectedCategory,
      setSelectedCategory,
      selectedSubCategory,
      setSelectedSubCategory,
      searchQuery,
      setSearchQuery,
      filteredPrompts
    }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompts = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error('usePrompts must be used within a PromptProvider');
  }
  return context;
};