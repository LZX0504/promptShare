import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Prompt, MainCategory, Comment } from '../types';
import { MOCK_PROMPTS } from '../constants';

interface PromptContextType {
  prompts: Prompt[];
  addPrompt: (prompt: Prompt) => void;
  addComment: (promptId: string, commentContent: string) => void;
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
  const [prompts, setPrompts] = useState<Prompt[]>(MOCK_PROMPTS);
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>('全部');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addPrompt = (newPrompt: Prompt) => {
    setPrompts(prev => [newPrompt, ...prev]);
  };

  const addComment = (promptId: string, commentContent: string) => {
    setPrompts(prev => prev.map(prompt => {
      if (prompt.id === promptId) {
        const newComment: Comment = {
          id: Date.now().toString(),
          author: '我', // Mock current user
          content: commentContent,
          createdAt: new Date().toISOString().split('T')[0]
        };
        return { ...prompt, comments: [...prompt.comments, newComment] };
      }
      return prompt;
    }));
  };

  const filteredPrompts = prompts.filter(prompt => {
    // 1. Category Filter
    let matchesCategory = true;
    if (selectedCategory !== '全部') {
      matchesCategory = prompt.tags.includes(selectedCategory);
      // Strict filter: prompt must have the main category tag to appear
    }

    // 2. SubCategory Filter
    let matchesSubCategory = true;
    if (selectedSubCategory) {
      matchesSubCategory = prompt.tags.includes(selectedSubCategory);
    }

    // 3. Search Filter
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  return (
    <PromptContext.Provider value={{
      prompts,
      addPrompt,
      addComment,
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