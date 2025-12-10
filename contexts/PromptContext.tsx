import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Prompt, MainCategory, Comment } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { CATEGORY_DATA } from '../constants';

interface PromptContextType {
  prompts: Prompt[];
  isLoading: boolean;
  addPrompt: (prompt: Omit<Prompt, 'id' | 'created_at' | 'comments' | 'likes'>) => Promise<boolean>;
  deletePrompt: (id: string) => Promise<void>;
  addComment: (promptId: string, commentContent: string) => Promise<void>;
  toggleLike: (promptId: string) => Promise<void>;
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
      // Supabase defaults to 1000 rows max. We use .range() to fetch more.
      // We implement recursive fetch to handle > 1000 rows
      
      let allPrompts: Prompt[] = [];
      let from = 0;
      let step = 1000;
      let fetchMore = true;

      while (fetchMore) {
        const { data: promptsData, error: promptsError } = await supabase
            .from('prompts')
            .select(`
            *,
            comments (
                id, content, created_at, author_name, author_id
            )
            `)
            .order('created_at', { ascending: false })
            .range(from, from + step - 1);

        if (promptsError) throw promptsError;

        if (promptsData && promptsData.length > 0) {
            allPrompts = [...allPrompts, ...promptsData as Prompt[]];
            from += step;
            if (promptsData.length < step) {
                fetchMore = false;
            }
        } else {
            fetchMore = false;
        }
      }

      let formattedPrompts: Prompt[] = allPrompts;

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
