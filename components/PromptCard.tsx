import React, { useState } from 'react';
import { Prompt } from '../types';
import { Copy, Heart, Check, Lock, Trash2 } from 'lucide-react';
import { usePrompts } from '../contexts/PromptContext';
import { useAuth } from '../contexts/AuthContext';

interface PromptCardProps {
  prompt: Prompt;
  onClick?: () => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt, onClick }) => {
  const { toggleLike, deletePrompt } = usePrompts();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Admin email check (hardcoded for this example)
  const ADMIN_EMAIL = 'iamcker@outlook.com';
  
  // Allow delete if user is author OR user is admin
  const canDelete = user && (user.id === prompt.author_id || user.email === ADMIN_EMAIL);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (prompt.is_paid) return;
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(prompt.id);
  };

  const handleBuy = (e: React.MouseEvent) => {
      e.stopPropagation();
      // Placeholder for buy logic
      alert('购买功能开发中');
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deletePrompt(prompt.id);
  }

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white border border-zinc-200 rounded-xl p-5 hover:shadow-lg hover:border-zinc-300 transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Badge */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        {canDelete && (
             <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                title="删除提示词"
             >
                 <Trash2 className="w-3.5 h-3.5" />
             </button>
        )}
        {prompt.is_paid ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-900 text-white">
            ￥{prompt.price}
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
            免费
          </span>
        )}
      </div>

      <div className="mb-4 pr-16">
        <h3 className="text-lg font-bold text-zinc-900 mb-1 group-hover:text-black transition-colors">
            {prompt.title}
        </h3>
        <p className="text-sm text-zinc-500 line-clamp-2 min-h-[2.5rem]">
          {prompt.description}
        </p>
      </div>

      {/* Content Preview */}
      <div className="relative mb-4 flex-grow bg-zinc-50 rounded-lg p-3 border border-zinc-100 font-mono text-xs text-zinc-600 overflow-hidden">
        {prompt.is_paid ? (
            <div className="flex flex-col items-center justify-center h-24 text-zinc-400">
                <Lock className="w-6 h-6 mb-2 opacity-50" />
                <span>付费内容</span>
            </div>
        ) : (
            <p className="line-clamp-4">{prompt.content}</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
        <div className="flex flex-wrap gap-2">
            {prompt.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 bg-zinc-100 px-2 py-1 rounded">
                    {tag}
                </span>
            ))}
        </div>
        
        <div className="flex items-center space-x-2">
            <button 
                onClick={handleLike}
                className={`p-1.5 rounded-md transition-colors ${prompt.user_has_liked ? 'text-red-500 bg-red-50' : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100'}`}
            >
                <Heart className={`w-4 h-4 ${prompt.user_has_liked ? 'fill-current' : ''}`} />
                <span className="sr-only">Like</span>
            </button>
            <span className="text-xs text-zinc-400 min-w-[1rem]">{prompt.likes}</span>
            
            {!prompt.is_paid && (
                <button 
                    onClick={handleCopy}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                    title="复制提示词"
                >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
            )}
            
            {prompt.is_paid && (
                 <button 
                 onClick={handleBuy}
                 className="p-1.5 px-3 rounded-md bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors"
             >
                 购买
             </button>
            )}
        </div>
      </div>
    </div>
  );
};