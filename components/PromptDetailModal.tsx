import React, { useState } from 'react';
import { X, Heart, Copy, Check, Lock, Send } from 'lucide-react';
import { Prompt } from '../types';
import { Button } from './Button';
import { usePrompts } from '../contexts/PromptContext';
import { useAuth } from '../contexts/AuthContext';

interface PromptDetailModalProps {
  prompt: Prompt;
  onClose: () => void;
}

export const PromptDetailModal: React.FC<PromptDetailModalProps> = ({ prompt, onClose }) => {
  const { addComment } = usePrompts();
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    
    setIsSubmitting(true);
    await addComment(prompt.id, commentText);
    setCommentText('');
    setIsSubmitting(false);
  };

  // Helper for avatar initials
  const getInitials = (name: string) => (name || 'U').slice(0, 2).toUpperCase();

  // Format date safely
  const formatDate = (dateString: string) => {
    try {
        return new Date(dateString).toLocaleDateString('zh-CN');
    } catch (e) {
        return dateString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">{prompt.title}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-zinc-500">by {prompt.author_name}</span>
              <span className="text-zinc-300">•</span>
              <span className="text-sm text-zinc-500">{formatDate(prompt.created_at)}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
            {/* Left Column: Prompt Content */}
            <div className="md:w-3/5 space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide mb-2">简介</h3>
                    <p className="text-zinc-600 leading-relaxed">{prompt.description}</p>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">提示词</h3>
                        {prompt.is_paid ? (
                           <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-2 py-1 rounded flex items-center">
                             <Lock className="w-3 h-3 mr-1" />
                             付费内容
                           </span>
                        ) : (
                          <button 
                            onClick={handleCopy}
                            className="text-xs flex items-center text-zinc-500 hover:text-zinc-900 transition-colors"
                          >
                            {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                            {copied ? '已复制' : '复制'}
                          </button>
                        )}
                    </div>
                    
                    <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 font-mono text-sm text-zinc-700 whitespace-pre-wrap">
                        {prompt.is_paid ? (
                            <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                                <Lock className="w-8 h-8 mb-3 opacity-50" />
                                <p>此提示词需要购买后查看</p>
                                <Button className="mt-4 bg-zinc-900 text-white">
                                    购买 ￥{prompt.price}
                                </Button>
                            </div>
                        ) : (
                            prompt.content
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {prompt.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right Column: Interaction & Comments */}
            <div className="md:w-2/5 flex flex-col border-t md:border-t-0 md:border-l border-zinc-100 pt-6 md:pt-0 md:pl-8">
                <div className="flex items-center space-x-4 mb-8">
                    <Button 
                        variant="secondary" 
                        onClick={() => setLiked(!liked)}
                        className={`flex-1 ${liked ? 'bg-red-50 text-red-600' : ''}`}
                    >
                        <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                        {liked ? '已收藏' : '收藏'} ({prompt.likes + (liked ? 1 : 0)})
                    </Button>
                    {prompt.is_paid && (
                        <Button className="flex-1 bg-zinc-900 text-white">
                            购买 ￥{prompt.price}
                        </Button>
                    )}
                </div>

                <div className="flex-1 flex flex-col">
                    <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide mb-4">
                        评论 ({(prompt.comments || []).length})
                    </h3>
                    
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 max-h-[300px]">
                        {prompt.comments && prompt.comments.length > 0 ? (
                            prompt.comments.map(comment => (
                                <div key={comment.id} className="flex space-x-3">
                                    {/* Initials Avatar for Comments */}
                                    <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center flex-shrink-0 text-zinc-600 text-xs font-bold select-none">
                                        {getInitials(comment.author_name)}
                                    </div>
                                    <div>
                                        <div className="flex items-baseline space-x-2">
                                            <span className="text-sm font-medium text-zinc-900">{comment.author_name}</span>
                                            <span className="text-xs text-zinc-400">{formatDate(comment.created_at)}</span>
                                        </div>
                                        <p className="text-sm text-zinc-600 mt-0.5">{comment.content}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-zinc-400 italic">暂无评论，快来抢沙发吧！</p>
                        )}
                    </div>

                    {user ? (
                        <form onSubmit={handlePostComment} className="relative mt-auto">
                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="写下你的评论..."
                                className="w-full pl-4 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 focus:outline-none transition-all text-sm"
                            />
                            <button 
                                type="submit"
                                disabled={!commentText.trim() || isSubmitting}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-zinc-900 disabled:opacity-50 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    ) : (
                        <div className="mt-auto p-3 bg-zinc-50 text-center text-sm text-zinc-500 rounded-lg">
                            请先登录以发布评论
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};