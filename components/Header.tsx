import React from 'react';
import { Layers, Search, LogOut } from 'lucide-react';
import { Button } from './Button';
import { usePrompts } from '../contexts/PromptContext';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onOpenCreateModal: () => void;
  onOpenAuthModal: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateModal, onOpenAuthModal, onOpenProfile }) => {
  const { searchQuery, setSearchQuery } = usePrompts();
  const { user } = useAuth();

  // Helper to get initials
  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 hidden sm:block">PromptShare</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-lg leading-5 bg-zinc-50 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm transition-colors"
                placeholder="搜索提示词..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                 <button 
                    onClick={onOpenProfile}
                    className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                 >
                    {/* CSS Generated Avatar */}
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full border border-zinc-200 bg-zinc-100" 
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-bold border border-zinc-200 shadow-sm">
                        {getInitials(user.name)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-zinc-900 hidden lg:block">{user.name}</span>
                 </button>
              </div>
            ) : (
              <button 
                onClick={onOpenAuthModal}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 hidden sm:block"
              >
                登录
              </button>
            )}
            
            <Button onClick={onOpenCreateModal} size="sm">
              发布提示词
            </Button>
          </div>
        </div>
        
        {/* Mobile Search - Only visible on small screens */}
        <div className="md:hidden py-3 border-t border-zinc-100">
             <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-lg leading-5 bg-zinc-50 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm"
                placeholder="搜索提示词..."
              />
            </div>
        </div>
      </div>
    </header>
  );
};