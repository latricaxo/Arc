import React, { useState } from 'react';
import { BriefCard } from '../types';
import { Sparkles, Clock, MessageSquare, ArrowRight, Zap, ShieldCheck, Flame, BookOpen, UserPlus, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BriefViewProps {
  cards: BriefCard[];
  userName: string;
  onZapCard: (cardId: string, sats: number) => void;
  onJoinDiscussion: (card: BriefCard) => void;
  onOpenAI: () => void;
}

export const BriefView: React.FC<BriefViewProps> = ({
  cards,
  userName,
  onZapCard,
  onJoinDiscussion,
  onOpenAI,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalCard, setActiveModalCard] = useState<BriefCard | null>(null);

  const categories = ['All', 'Bitcoin', 'AI', 'Privacy', 'Design'];

  const filteredCards = selectedCategory === 'All'
    ? cards
    : cards.filter(c => c.category === selectedCategory);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-10 space-[#050505]">
      
      {/* Header Banner: The Wow Moment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl glass-panel p-6 md:p-10 border border-white/10 mb-8"
      >
        {/* Ambient glow backdrop */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#F7931A]/20 via-[#FFD166]/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FFD166] text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>ARC BRIEF ENGINE • DAILY SYNTHESIS</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              GOOD AFTERNOON, <span className="text-gradient-btc">{userName.toUpperCase()}</span>
            </h1>

            <p className="text-zinc-300 text-base md:text-xl font-light max-w-2xl leading-relaxed">
              Your network created <span className="font-semibold text-white underline decoration-[#F7931A]">427 conversations</span> today.{' '}
              <span className="text-gradient-btc font-semibold">Arc found 5 worth your attention.</span>
            </p>
          </div>

          <button
            onClick={onOpenAI}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-xs tracking-wide transition-all duration-200 group"
          >
            <Sparkles className="w-4 h-4 text-[#FFD166] group-hover:rotate-12 transition-transform" />
            <span>Customize Synthesis Rules</span>
          </button>
        </div>

        {/* Live Filter Chips */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#F7931A] text-black font-semibold shadow-[0_0_15px_rgba(247,147,26,0.4)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid of 5 High-Signal Brief Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-3xl glass-card p-6 border border-white/10 hover:border-[#F7931A]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(247,147,26,0.15)]"
          >
            <div className="space-y-4">
              
              {/* Top Card Meta */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#F7931A]/10 text-[#F7931A] font-semibold border border-[#F7931A]/30">
                  {card.category}
                </span>

                <div className="flex items-center gap-3 text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {card.readingTime}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-amber-300">
                    {card.sentiment}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-white group-hover:text-[#FFD166] transition-colors leading-snug">
                {card.title}
              </h2>

              {/* AI Summary */}
              <p className="text-zinc-300 text-sm leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/5">
                {card.summary}
              </p>

              {/* Key Ideas List */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Key Takeaways</span>
                <ul className="space-y-1.5">
                  {card.mainIdeas.map((idea, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="text-[#F7931A] font-bold">•</span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key People Avatars */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-400">Key Voices:</span>
                  <div className="flex -space-x-2">
                    {card.keyPeople.map((person, pIdx) => (
                      <img
                        key={pIdx}
                        src={person.avatar}
                        alt={person.name}
                        title={person.name}
                        className="w-7 h-7 rounded-full border-2 border-[#111] object-cover"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <MessageSquare className="w-3.5 h-3.5 text-[#F7931A]" />
                  <span>{card.relatedCount} discussions</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
              <button
                onClick={() => onZapCard(card.id, 500)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#111] hover:bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/30 text-xs font-mono font-bold transition-all"
              >
                <Zap className="w-3.5 h-3.5 fill-[#F7931A]" />
                <span>Zap 500 sats</span>
              </button>

              <button
                onClick={() => {
                  setActiveModalCard(card);
                  onJoinDiscussion(card);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all group-hover:bg-[#F7931A] group-hover:text-black"
              >
                <span>Join Discussion</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deep Dive Modal */}
      <AnimatePresence>
        {activeModalCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveModalCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 border border-white/20 space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="px-3 py-1 rounded-full bg-[#F7931A]/20 text-[#F7931A] text-xs font-bold">
                  {activeModalCard.category} • Deep Dive
                </span>
                <button
                  onClick={() => setActiveModalCard(null)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white">{activeModalCard.title}</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{activeModalCard.summary}</p>

              <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                <h4 className="text-xs font-mono text-[#FFD166] uppercase tracking-wider">AI Insight Analysis</h4>
                <ul className="space-y-2">
                  {activeModalCard.mainIdeas.map((idea, i) => (
                    <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#F7931A] shrink-0 mt-0.5" />
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => onZapCard(activeModalCard.id, 1000)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-bold text-xs"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Zap 1,000 Sats to Authors</span>
                </button>
                <button
                  onClick={() => setActiveModalCard(null)}
                  className="px-4 py-2 rounded-full glass-card text-xs text-zinc-300 hover:text-white"
                >
                  Close Synthesis
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
