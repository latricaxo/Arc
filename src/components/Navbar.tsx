import React, { useState } from 'react';
import { ViewMode } from '../types';
import { ArcLogo } from './ArcLogo';
import { Sparkles, Zap, Search, Presentation, Bell, Compass, Globe, User, BookOpen, Layers, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  userSats: number;
  onOpenAI: () => void;
  onOpenComposer: () => void;
  onStartInvestorDemo: () => void;
  unreadCount: number;
  onSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  userSats,
  onOpenAI,
  onOpenComposer,
  onStartInvestorDemo,
  unreadCount,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onNavigate('feed');
    }
  };

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'brief', label: 'Brief', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'feed', label: 'Feed', icon: <Compass className="w-4 h-4" /> },
    { id: 'galaxy', label: 'Galaxy', icon: <Globe className="w-4 h-4" /> },
    { id: 'creator', label: 'Creators', icon: <User className="w-4 h-4" /> },
    { id: 'wallet', label: 'Wallet', icon: <Zap className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Layers className="w-4 h-4" /> },
    { id: 'landing', label: 'Vision', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('brief')}>
          <ArcLogo size="md" />
          <div className="flex flex-col">
            <span className="font-bold tracking-wider text-lg text-white group-hover:text-[#F7931A] transition-colors flex items-center gap-2">
              ARC
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F7931A]/20 text-[#F7931A] font-mono border border-[#F7931A]/30">
                NOSTR OS
              </span>
            </span>
            <span className="text-[10px] text-zinc-400 hidden sm:inline">Signal over noise</span>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 glass-card p-1.5 rounded-full border border-white/10">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-semibold shadow-[0_0_15px_rgba(247,147,26,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search Nostr signal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#F7931A]/50 focus:ring-1 focus:ring-[#F7931A]/30 transition-all"
          />
        </form>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          
          {/* INVESTOR DEMO KEYNOTE BUTTON */}
          <button
            id="investor-demo-btn"
            onClick={onStartInvestorDemo}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F7931A] via-[#FFD166] to-[#F7931A] text-black font-bold text-xs tracking-wide glow-btc hover:scale-105 active:scale-95 transition-all duration-300"
            title="Launch 3-Minute Apple-Style Pitch Presentation"
          >
            <Presentation className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">Investor Demo</span>
          </button>

          {/* AI Assistant Quick Toggle */}
          <button
            id="ai-assistant-toggle"
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card hover:bg-white/10 text-amber-300 border border-amber-500/30 text-xs font-medium transition-all"
            title="Open Arc AI Intelligence"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166] animate-pulse" />
            <span className="hidden sm:inline">Arc AI</span>
          </button>

          {/* Sats Balance Pill */}
          <button
            id="sats-balance-btn"
            onClick={() => onNavigate('wallet')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111] hover:bg-white/5 border border-[#F7931A]/40 text-[#F7931A] text-xs font-mono font-bold transition-all"
            title="Lightning Wallet"
          >
            <Zap className="w-3.5 h-3.5 fill-[#F7931A]" />
            <span>{userSats.toLocaleString()} sats</span>
          </button>

          {/* Notifications Bell */}
          <button
            id="notifications-btn"
            onClick={() => onNavigate('notifications')}
            className="relative p-2 rounded-full glass-card hover:bg-white/10 text-zinc-300 transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F7931A] text-black font-bold text-[10px] flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-card text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium ${
                currentView === item.id ? 'bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/40' : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
