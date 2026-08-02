import React from 'react';
import { NostrUser } from '../types';
import { ShieldCheck, Zap, Users, Award, Sparkles, Globe, Heart, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileViewProps {
  user: NostrUser;
  onOpenAI: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onOpenAI }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-6">
      
      {/* Profile Header Canvas */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl">
        {/* Cover Image */}
        <div className="h-44 md:h-56 bg-gradient-to-r from-zinc-900 via-[#F7931A]/20 to-black relative">
          <div className="absolute inset-0 bg-[radial-gradient(#F7931A_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
        </div>

        {/* Profile Info Row */}
        <div className="px-6 md:px-10 pb-8 relative -mt-16 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover border-4 border-[#050505] shadow-[0_0_25px_rgba(247,147,26,0.4)]"
              />
              <div className="mb-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
                  {user.name}
                  <ShieldCheck className="w-5 h-5 text-[#F7931A] fill-[#F7931A]" />
                </h1>
                <span className="text-xs text-zinc-400 font-mono">{user.handle}</span>
              </div>
            </div>

            <button
              onClick={onOpenAI}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-extrabold text-xs glow-btc"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>AI Profile Synthesis</span>
            </button>
          </div>

          <p className="text-zinc-300 text-sm max-w-2xl leading-relaxed">{user.bio}</p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div className="glass-card p-3.5 rounded-2xl border border-white/5">
              <span className="text-xs text-zinc-400">Reputation Score</span>
              <div className="text-xl font-bold font-mono text-[#FFD166]">{user.reputationScore} / 100</div>
            </div>

            <div className="glass-card p-3.5 rounded-2xl border border-white/5">
              <span className="text-xs text-zinc-400">Monthly Sats Earned</span>
              <div className="text-xl font-bold font-mono text-gradient-btc">{user.satsEarnedMonth.toLocaleString()}</div>
            </div>

            <div className="glass-card p-3.5 rounded-2xl border border-white/5">
              <span className="text-xs text-zinc-400">Supporters</span>
              <div className="text-xl font-bold text-white">{user.supportersCount}</div>
            </div>

            <div className="glass-card p-3.5 rounded-2xl border border-white/5">
              <span className="text-xs text-zinc-400">Trust Rank</span>
              <div className="text-xl font-bold text-emerald-400">Top 1%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
