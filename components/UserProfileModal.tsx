import React, { useState } from 'react';
import { X, LogOut, User as UserIcon, Heart, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePrompts } from '../contexts/PromptContext';
import { PromptCard } from './PromptCard';
import { Button } from './Button';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { prompts } = usePrompts();
  const [activeTab, setActiveTab] = useState<'published' | 'likes'>('published');

  if (!isOpen || !user) return null;

  // Filter prompts
  const myPrompts = prompts.filter(p => p.author_id === user.id);
  const myLikes = prompts.filter(p => p.user_has_liked);

  const displayPrompts = activeTab === 'published' ? myPrompts : myLikes;

  const getInitials = (name: string) => name.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 flex-shrink-0">
          <h2 className="text-xl font-bold text-zinc-900">个人中心</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar / User Info */}
            <div className="w-full md:w-64 p-6 bg-zinc-50 border-r border-zinc-100 flex flex-col items-center text-center">
                 <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center text-white text-2xl font-bold mb-4 border-4 border-white shadow-sm">
                    {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full" /> : getInitials(user.name)}
                 </div>
                 <h3 className="text-lg font-bold text-zinc-900">{user.name}</h3>
                 <p className="text-sm text-zinc-500 mb-6">{user.email}</p>

                 <div className="w-full space-y-2 mb-auto">
                    <button
                        onClick={() => setActiveTab('published')}
                        className={`w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'published' ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100'}`}
                    >
                        <FileText className="w-4 h-4 mr-3" />
                        我的发布
                        <span className="ml-auto bg-zinc-300 text-zinc-700 text-xs px-2 py-0.5 rounded-full">{myPrompts.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('likes')}
                        className={`w-full flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'likes' ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-100'}`}
                    >
                        <Heart className="w-4 h-4 mr-3" />
                        我的收藏
                         <span className="ml-auto bg-zinc-300 text-zinc-700 text-xs px-2 py-0.5 rounded-full">{myLikes.length}</span>
                    </button>
                 </div>

                 <Button variant="outline" onClick={handleLogout} className="w-full mt-6 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200">
                    <LogOut className="w-4 h-4 mr-2" />
                    退出登录
                 </Button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-white">
                <h3 className="text-lg font-bold text-zinc-900 mb-6">
                    {activeTab === 'published' ? '我发布的提示词' : '我收藏的提示词'}
                </h3>

                {displayPrompts.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {displayPrompts.map(prompt => (
                            <PromptCard key={prompt.id} prompt={prompt} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
                        {activeTab === 'published' ? <FileText className="w-12 h-12 mb-2 opacity-20" /> : <Heart className="w-12 h-12 mb-2 opacity-20" />}
                        <p>这里还什么都没有哦</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};