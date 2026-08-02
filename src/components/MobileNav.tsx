import React from 'react';
import { ViewMode } from '../types';
import { BookOpen, Compass, Globe, User, Zap, Plus, Sparkles } from 'lucide-react';

interface MobileNavProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenComposer: () => void;
  onOpenAI: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onNavigate,
  onOpenComposer,
  onOpenAI,
}) => {
  const tabs: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'brief', label: 'Brief', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'feed', label: 'Feed', icon: <Compass className="w-5 h-5" /> },
    { id: 'galaxy', label: 'Galaxy', icon: <Globe className="w-5 h-5" /> },
    { id: 'creator', label: 'Creators', icon: <User className="w-5 h-5" /> },
    { id: 'wallet', label: 'Wallet', icon: <Zap className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pointer-events-none">
      <div className="pointer-events-auto glass-panel rounded-2xl p-2 border border-white/10 shadow-2xl flex items-center justify-around max-w-md mx-auto">
        {tabs.slice(0, 2).map((tab) => {
          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive ? 'text-[#F7931A] scale-105' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}

        {/* Center Compose Floating Button */}
        <button
          onClick={onOpenComposer}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#F7931A] to-[#FFD166] text-black font-bold flex items-center justify-center shadow-[0_0_20px_rgba(247,147,26,0.5)] active:scale-95 transition-transform -mt-5 border-2 border-[#050505]"
          title="Compose New Nostr Signal"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>

        {tabs.slice(2).map((tab) => {
          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive ? 'text-[#F7931A] scale-105' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
