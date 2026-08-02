import React, { useState } from 'react';
import { NostrUser } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { Sparkles, Zap, ShieldCheck, TrendingUp, Users, Heart, Feather, BookOpen, Share2, Award, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CreatorViewProps {
  onZapCreator: (creatorName: string, sats: number) => void;
}

export const CreatorView: React.FC<CreatorViewProps> = ({ onZapCreator }) => {
  const [selectedCreator, setSelectedCreator] = useState<NostrUser>(MOCK_USERS[0]); // Alex Rivera default
  const [zapAmount, setZapAmount] = useState<number>(1000);
  const [customTipSent, setCustomTipSent] = useState<boolean>(false);

  const handleZap = (amount: number) => {
    onZapCreator(selectedCreator.name, amount);
    setCustomTipSent(true);
    setTimeout(() => setCustomTipSent(false), 3000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>CORE FEATURE #3 • SOVEREIGN CREATOR ECONOMY</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            Creator <span className="text-gradient-btc">Reputation & Monetization</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mt-1">
            Zero platform cuts. Direct Lightning micropayments with AI-analyzed trust metrics.
          </p>
        </div>

        {/* Creator Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {MOCK_USERS.map((creator) => (
            <button
              key={creator.id}
              onClick={() => setSelectedCreator(creator)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCreator.id === creator.id
                  ? 'bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-bold shadow-[0_0_15px_rgba(247,147,26,0.4)]'
                  : 'glass-card text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <img src={creator.avatar} alt={creator.name} className="w-5 h-5 rounded-full object-cover" />
              <span>{creator.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Creator Spotlight Card */}
      <motion.div
        key={selectedCreator.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 space-y-8 shadow-2xl relative overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-bl from-[#F7931A]/10 via-[#FFD166]/5 to-transparent blur-3xl pointer-events-none" />

        {/* Top Profile Hero */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="relative">
              <img
                src={selectedCreator.avatar}
                alt={selectedCreator.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border-2 border-[#F7931A] shadow-[0_0_20px_rgba(247,147,26,0.4)]"
              />
              {selectedCreator.isVerified && (
                <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#F7931A] text-black" title="Verified Nostr Public Key">
                  <ShieldCheck className="w-4 h-4 fill-black text-[#F7931A]" />
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">{selectedCreator.name}</h2>
                <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  {selectedCreator.handle}
                </span>
              </div>

              <p className="text-zinc-300 text-sm max-w-xl leading-relaxed">{selectedCreator.bio}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedCreator.topics.map((t) => (
                  <span key={t} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-amber-300">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Lightning Tip Widget */}
          <div className="glass-card p-5 rounded-2xl border border-[#F7931A]/30 w-full md:w-72 space-y-3 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-[#F7931A]">
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 fill-[#F7931A]" />
                Support Creator Native
              </span>
              <span>Lightning</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[500, 1000, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleZap(amt)}
                  className="py-2 rounded-xl bg-white/5 hover:bg-[#F7931A]/20 border border-white/10 hover:border-[#F7931A] text-xs font-mono font-bold text-white transition-all"
                >
                  +{amt.toLocaleString()}
                </button>
              ))}
            </div>

            {customTipSent && (
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-center text-xs font-semibold animate-bounce">
                ⚡ Zap of {zapAmount.toLocaleString()} sats delivered!
              </div>
            )}
          </div>
        </div>

        {/* Key Creator Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          
          <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-1">
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#F7931A]" />
              This Month Sats
            </span>
            <div className="text-xl md:text-2xl font-extrabold font-mono text-gradient-btc">
              {selectedCreator.satsEarnedMonth.toLocaleString()} sats
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +34% vs last month
            </span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-1">
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              Sovereign Supporters
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-white">
              {selectedCreator.supportersCount.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-400">Direct wallet ties</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-1">
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Reputation Score
            </span>
            <div className="text-xl md:text-2xl font-extrabold text-[#FFD166]">
              {selectedCreator.reputationScore} / 100
            </div>
            <span className="text-[10px] text-amber-300">Top 1% Network Trust</span>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/5 space-y-1">
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Feather className="w-3.5 h-3.5 text-purple-400" />
              Writing Style
            </span>
            <div className="text-xs font-medium text-zinc-200 line-clamp-2">
              {selectedCreator.writingStyle}
            </div>
          </div>
        </div>

        {/* AI Deep Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFD166]">
              <Sparkles className="w-4 h-4" />
              <span>AI BIOGRAPHY & RESEARCH FOCUS</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5">
              {selectedCreator.aiBio}
            </p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F7931A]">
              <TrendingUp className="w-4 h-4" />
              <span>AUDIENCE INSIGHTS & SIGNAL FLOW</span>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <span>Primary Audience Category</span>
                <span className="font-semibold text-white">Bitcoin & AI Builders</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <span>Average Zap per Essay</span>
                <span className="font-mono font-bold text-[#F7931A]">1,250 sats</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <span>Web-of-Trust Reach</span>
                <span className="font-semibold text-white">142 Relays</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
