import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Prompt, MainCategory, Comment } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import { SAMPLE_PROMPTS } from '../constants';

interface PromptContextType {
  prompts: Prompt[];
  isLoading: boolean;
  addPrompt: (prompt: Omit<Prompt, 'id' | 'created_at' | 'comments' | 'likes'>) => Promise<boolean>;
  addComment: (promptId: string, commentContent: string) => Promise<void>;
  seedPrompts: () => Promise<void>;
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

  // Fetch prompts on mount
  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    setIsLoading(true);
    try {
      // Fetch prompts and their comments
      const { data, error } = await supabase
        .from('prompts')
        .select(`
          *,
          comments (
            id, content, created_at, author_name, author_id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setPrompts(data as Prompt[]);
      }
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setIsLoading(false);
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

    if (!confirm('确定要将 10 个演示提示词写入数据库吗？')) return;

    try {
      setIsLoading(true);
      const promptsToInsert = SAMPLE_PROMPTS.map(p => ({
        ...p,
        author_id: user.id,
        author_name: user.name
      }));

      const { error } = await supabase
        .from('prompts')
        .insert(promptsToInsert);

      if (error) throw error;

      alert('数据填充成功！请刷新页面查看。');
      fetchPrompts(); // Refresh list
    } catch (error) {
      console.error('Seed error:', error);
      alert('填充失败，请查看控制台');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPrompts = prompts.filter(prompt => {
    // 1. Category Filter
    let matchesCategory = true;
    if (selectedCategory !== '全部') {
      matchesCategory = prompt.tags?.includes(selectedCategory) || false;
    }

    // 2. SubCategory Filter
    let matchesSubCategory = true;
    if (selectedSubCategory) {
      matchesSubCategory = prompt.tags?.includes(selectedSubCategory) || false;
    }

    // 3. Search Filter
    const matchesSearch = 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prompt.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ?? false);
    
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  return (
    <PromptContext.Provider value={{
      prompts,
      isLoading,
      addPrompt,
      addComment,
      seedPrompts,
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