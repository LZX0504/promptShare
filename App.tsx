import React, { useState } from 'react';
import { PromptProvider, usePrompts } from './contexts/PromptContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { PromptCard } from './components/PromptCard';
import { CreatePromptModal } from './components/CreatePromptModal';
import { PromptDetailModal } from './components/PromptDetailModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { CATEGORY_DATA } from './constants';
import { MainCategory, Prompt } from './types';
import { Sparkles, ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';

// --- Components for Views ---

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center px-4 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-zinc-200 to-zinc-100 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-l from-zinc-200 to-zinc-100 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-20">
        
        <h1 className="text-5xl sm:text-7xl font-bold text-zinc-900 tracking-tight mb-8 leading-[1.1]">
          发现与分享 <br />
          <span className="text-zinc-400">专业级 AI 提示词</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-zinc-500 mb-12 font-light">
          PromptShare 是一个极简风格的提示词市场。
          寻找适合写作、编程、绘画、视频或聊天的完美指令，释放 AI 的潜能。
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onStart}
            className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-zinc-900 hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            开始分享
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onStart}
            className="inline-flex items-center justify-center px-8 py-4 border border-zinc-200 text-lg font-medium rounded-xl text-zinc-700 bg-white hover:bg-zinc-50 transition-colors"
          >
            探索库
          </button>
        </div>
      </div>
    </div>
  );
};

const MarketplacePage: React.FC<{ 
  onOpenCreateModal: () => void; 
  onSelectPrompt: (p: Prompt) => void;
  onOpenAuthModal: () => void;
  onOpenProfile: () => void;
}> = ({ onOpenCreateModal, onSelectPrompt, onOpenAuthModal, onOpenProfile }) => {
  const { filteredPrompts, selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory, isLoading } = usePrompts();
  const [expandedCategory, setExpandedCategory] = useState<MainCategory | null>('全部');

  const toggleCategory = (catName: MainCategory) => {
    if (expandedCategory === catName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(catName);
    }
    
    // Selecting a main category resets subcategory unless logically connected, 
    // but here we want to filter by Main Category immediately
    setSelectedCategory(catName);
    setSelectedSubCategory(null);
  };

  return (
    <div className="flex flex-col flex-grow">
       <Header onOpenCreateModal={onOpenCreateModal} onOpenAuthModal={onOpenAuthModal} onOpenProfile={onOpenProfile} />
       
       <div className="flex flex-grow max-w-[1600px] mx-auto w-full px-4 sm:px-6">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0 py-8 pr-8 border-r border-zinc-100">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">分类目录</h3>
            <div className="space-y-1">
              {CATEGORY_DATA.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.name;
                const isExpanded = expandedCategory === category.name;

                return (
                  <div key={category.name} className="space-y-1">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-zinc-100 text-zinc-900' 
                          : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                      }`}
                    >
                      <div className="flex items-center">
                        {Icon && <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} />}
                        {category.name}
                      </div>
                      {category.subCategories.length > 0 && (
                        isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-zinc-400" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                      )}
                    </button>

                    {/* Subcategories */}
                    {isExpanded && category.subCategories.length > 0 && (
                      <div className="ml-9 border-l border-zinc-200 pl-2 space-y-1 py-1">
                        {category.subCategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCategory(category.name);
                              setSelectedSubCategory(sub);
                            }}
                            className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                              selectedSubCategory === sub
                                ? 'text-zinc-900 font-medium bg-zinc-50'
                                : 'text-zinc-500 hover:text-zinc-900'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Main Content Grid */}
          <main className="flex-1 py-8 lg:pl-8">
            {/* Mobile Category Filter (Horizontal Scroll) - visible only on small screens */}
            <div className="lg:hidden mb-6 overflow-x-auto pb-2 no-scrollbar">
              <div className="flex space-x-2">
                {CATEGORY_DATA.map((cat) => (
                   <button
                   key={cat.name}
                   onClick={() => {
                     setSelectedCategory(cat.name);
                     setExpandedCategory(cat.name === expandedCategory ? null : cat.name);
                   }}
                   className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
                     selectedCategory === cat.name
                       ? 'bg-zinc-900 text-white border-zinc-900'
                       : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                   }`}
                 >
                   {cat.name}
                 </button>
                ))}
              </div>
              {/* Mobile Subcategories if parent selected */}
              {selectedCategory !== '全部' && (
                <div className="flex space-x-2 mt-3 pl-1">
                  {CATEGORY_DATA.find(c => c.name === selectedCategory)?.subCategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubCategory(selectedSubCategory === sub ? null : sub)}
                      className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                        selectedSubCategory === sub
                          ? 'bg-zinc-200 text-zinc-900'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-900">
                {selectedCategory} 
                {selectedSubCategory && <span className="text-zinc-400 font-normal"> / {selectedSubCategory}</span>}
              </h2>
              <span className="text-sm text-zinc-500">{filteredPrompts.length} 个结果</span>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-64 bg-zinc-50 rounded-xl animate-pulse border border-zinc-100"></div>
                    ))}
                </div>
            ) : filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPrompts.map((prompt) => (
                  <PromptCard 
                    key={prompt.id} 
                    prompt={prompt} 
                    onClick={() => onSelectPrompt(prompt)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-4">
                  <Sparkles className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium text-zinc-900">未找到相关提示词</h3>
                <p className="text-zinc-500 mt-2">请尝试切换分类或清除搜索条件。</p>
              </div>
            )}
          </main>
       </div>
    </div>
  );
};

// --- Footer Component ---
const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-zinc-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center md:items-baseline space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
            <span className="font-semibold text-zinc-900 tracking-tight">PromptShare</span>
            <span className="text-xs text-zinc-500 font-medium">
              商业合作 Email: iamcker@outlook.com / +v: lewlel
            </span>
        </div>
        
        <div className="flex items-center space-x-4">
           <p className="text-sm text-zinc-400">
             © 2025 PromptShare. Build by Chris Mai
           </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'marketplace'>('landing');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  return (
    <AuthProvider>
      <PromptProvider>
        <div className="min-h-screen bg-white flex flex-col font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
          
          {view === 'landing' ? (
            <LandingPage onStart={() => setView('marketplace')} />
          ) : (
            <MarketplacePage 
              onOpenCreateModal={() => setIsCreateModalOpen(true)} 
              onSelectPrompt={(p) => setSelectedPrompt(p)}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />
          )}

          {/* Footer is rendered inside components conditionally, but for global structure: */}
          {view !== 'landing' && <Footer />}
          {/* Landing page footer */}
          {view === 'landing' && (
             <div className="fixed bottom-0 w-full bg-white/50 backdrop-blur-sm border-t border-zinc-100 py-4">
                 <div className="max-w-7xl mx-auto px-4 text-center">
                     <p className="text-sm text-zinc-400">
                        © 2025 PromptShare. Build by Chris Mai
                     </p>
                 </div>
             </div>
          )}

          <CreatePromptModal 
            isOpen={isCreateModalOpen} 
            onClose={() => setIsCreateModalOpen(false)} 
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />

          <AuthModal 
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />

          {/* Ensure isProfileModalOpen state is used here */}
          <UserProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
          />

          {selectedPrompt && (
            <PromptDetailModal
              prompt={selectedPrompt}
              onClose={() => setSelectedPrompt(null)}
            />
          )}
        </div>
      </PromptProvider>
    </AuthProvider>
  );
};

export default App;
