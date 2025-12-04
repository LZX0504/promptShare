import React, { useState } from 'react';
import { X, AlertCircle, Lock } from 'lucide-react';
import { Button } from './Button';
import { CreatePromptForm } from '../types';
import { usePrompts } from '../contexts/PromptContext';
import { useAuth } from '../contexts/AuthContext';

interface CreatePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuthModal: () => void;
}

export const CreatePromptModal: React.FC<CreatePromptModalProps> = ({ isOpen, onClose, onOpenAuthModal }) => {
  const { addPrompt } = usePrompts();
  const { user } = useAuth();
  const [form, setForm] = useState<CreatePromptForm>({
    title: '',
    description: '',
    content: '',
    tags: '',
    isPaid: false,
    price: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check Logic: Paid prompts require user to be logged in
    if (form.isPaid && !user) {
      onOpenAuthModal();
      return;
    }

    const newPrompt = {
      id: Date.now().toString(),
      title: form.title,
      description: form.description,
      content: form.content,
      tags: form.tags.split(/[,，]/).map(t => t.trim()).filter(Boolean),
      author: user ? user.name : 'Guest', // Use logged in user name or Guest
      likes: 0,
      isPaid: form.isPaid,
      price: form.isPaid ? parseFloat(form.price) : 0,
      createdAt: new Date().toISOString().split('T')[0],
      comments: []
    };
    addPrompt(newPrompt);
    onClose();
    // Reset form
    setForm({
      title: '',
      description: '',
      content: '',
      tags: '',
      isPaid: false,
      price: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-zinc-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-zinc-900">分享提示词</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">标题</label>
              <input
                required
                name="title"
                value={form.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                placeholder="例如：SEO 爆款文章生成器"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">简介</label>
              <input
                required
                name="description"
                value={form.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                placeholder="这个提示词的主要功能是什么？"
              />
            </div>

            <div>
              <div className="mb-1">
                <label className="block text-sm font-medium text-zinc-700">提示词内容</label>
              </div>
              <textarea
                required
                name="content"
                value={form.content}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all font-mono text-sm resize-none bg-zinc-50"
                placeholder="在此输入您的提示词..."
              />
              <p className="text-xs text-zinc-500 mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                使用 [变量] 作为可替换的占位符。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">标签</label>
                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                  placeholder="写作, Gemini, 编程..."
                />
              </div>
              
              <div className="flex flex-col justify-end">
                <div className="flex items-center space-x-3 h-10">
                   <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        name="isPaid" 
                        checked={form.isPaid} 
                        onChange={handleCheckboxChange} 
                        className="sr-only" 
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${form.isPaid ? 'bg-zinc-900' : 'bg-zinc-200'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${form.isPaid ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-zinc-700">付费提示词？</span>
                  </label>
                </div>
              </div>
            </div>

            {form.isPaid && (
              <div className={`transition-all duration-300 ${!user ? 'bg-red-50 border border-red-100 p-4 rounded-lg' : ''}`}>
                <label className="block text-sm font-medium text-zinc-700 mb-1">价格 (CNY)</label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-500">￥</span>
                    <input
                    type="number"
                    step="0.01"
                    required
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:border-transparent outline-none transition-all"
                    placeholder="9.99"
                    />
                </div>
                {!user && (
                    <div className="flex items-start mt-2 text-xs text-red-500">
                        <Lock className="w-3 h-3 mr-1 mt-0.5" />
                        发布付费提示词需要登录账号。点击发布将跳转登录。
                    </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-100">
            <Button type="button" variant="ghost" onClick={onClose}>取消</Button>
            <Button type="submit" variant="primary">发布</Button>
          </div>
        </form>
      </div>
    </div>
  );
};