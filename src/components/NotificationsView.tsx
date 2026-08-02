import React from 'react';
import { NotificationItem } from '../types';
import { Zap, Sparkles, TrendingUp, MessageSquare, ShieldCheck, CheckCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllRead,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Signal <span className="text-gradient-btc">Notifications</span>
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm">High-value events, zaps, and AI discoveries.</p>
        </div>

        <button
          onClick={onMarkAllRead}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-card hover:bg-white/10 text-xs text-zinc-300 transition-all"
        >
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`glass-panel rounded-3xl p-5 border transition-all flex items-start gap-4 ${
              item.isRead ? 'border-white/5 opacity-80' : 'border-[#F7931A]/40 bg-[#F7931A]/5 shadow-[0_0_20px_rgba(247,147,26,0.15)]'
            }`}
          >
            {/* Icon representation */}
            <div className="shrink-0 mt-1">
              {item.type === 'zap' && (
                <div className="w-10 h-10 rounded-2xl bg-[#F7931A]/20 border border-[#F7931A]/40 flex items-center justify-center text-[#F7931A] glow-btc">
                  <Zap className="w-5 h-5 fill-[#F7931A]" />
                </div>
              )}
              {item.type === 'ai_discovery' && (
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              )}
              {item.type === 'trending' && (
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
              )}
              {item.type === 'response' && (
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  {item.title}
                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-ping" />
                  )}
                </h3>
                <span className="text-[11px] text-zinc-500 font-mono">{item.timestamp}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{item.subtitle}</p>

              {item.satsAmount && (
                <div className="pt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7931A]/10 border border-[#F7931A]/30 text-[#F7931A] text-xs font-mono font-bold">
                  ⚡ +{item.satsAmount.toLocaleString()} sats received
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
