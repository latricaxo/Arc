import React from 'react';
import { MOCK_ROADMAP } from '../data/mockData';
import { Layers, CheckCircle2, Circle, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface RoadmapViewProps {
  onStartInvestorDemo: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onStartInvestorDemo }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7931A]/10 border border-[#F7931A]/30 text-[#F7931A] text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>5-PHASE VISION ROADMAP</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            The Future of <span className="text-gradient-btc">Decentralized Social</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mt-1">
            Our strategic trajectory to 100 million sovereign users.
          </p>
        </div>

        <button
          onClick={onStartInvestorDemo}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-extrabold text-xs glow-btc"
        >
          <Sparkles className="w-4 h-4 fill-black" />
          <span>Launch Investor Pitch Presentation</span>
        </button>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-[#F7931A] before:via-white/20 before:to-transparent">
        {MOCK_ROADMAP.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                isEven ? 'md:flex-row-reverse' : ''
              } gap-8`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050505] border-2 border-[#F7931A] flex items-center justify-center text-[#F7931A] shadow-[0_0_15px_rgba(247,147,26,0.6)] z-10">
                {item.status === 'Complete' ? (
                  <CheckCircle2 className="w-4 h-4 fill-[#F7931A] text-black" />
                ) : (
                  <Circle className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Card Container */}
              <div className="w-full md:w-[46%] pl-12 md:pl-0">
                <div className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#F7931A]/40 transition-all space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FFD166] text-xs font-mono font-bold">
                      PHASE {item.phase} • {item.targetDate}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === 'Complete'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : item.status === 'In Progress'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-white/5 text-zinc-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{item.description}</p>

                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">Key Deliverables</span>
                    <ul className="space-y-1">
                      {item.milestones.map((m, mIdx) => (
                        <li key={mIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                          <span className="text-[#F7931A]">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
