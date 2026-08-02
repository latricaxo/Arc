import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';
import { ArcLogo } from './ArcLogo';
import { Play, Pause, ChevronRight, ChevronLeft, Sparkles, X, Globe, Zap, ShieldCheck, Award, BookOpen, Layers, Presentation, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface InvestorDemoModeProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToView: (view: ViewMode) => void;
}

export const InvestorDemoMode: React.FC<InvestorDemoModeProps> = ({
  isOpen,
  onClose,
  onJumpToView,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      id: 'vision',
      title: '1. Vision',
      headline: 'The AI-Native Social Operating System for Nostr',
      subhead: 'Today’s social media optimizes for outrage and ads. Arc optimizes for understanding, signal, and human connection.',
      targetView: 'landing' as ViewMode,
      bullets: [
        'Censorship-resistant Nostr public key identity',
        'Signal over noise philosophy',
        'Native Bitcoin Lightning micropayment monetization',
      ],
      quote: '"This is what social networking becomes after AI and decentralization mature."',
    },
    {
      id: 'brief',
      title: '2. Arc Brief Engine',
      headline: '427 Conversations Simplified into 5 High-Signal Takeaways',
      subhead: 'Users are never greeted with an endless outrage feed. They receive an AI-curated briefing crafted specifically for them.',
      targetView: 'brief' as ViewMode,
      bullets: [
        'AI key takeaways & reading time',
        'Sentiment analysis & key network voices',
        'Instant one-click discussion deep dives',
      ],
      quote: '"The first wow moment: turning chaos into calm, intelligent synthesis."',
    },
    {
      id: 'galaxy',
      title: '3. Conversation Galaxy',
      headline: 'A Visual Map Showing How Ideas & Liquidity Connect',
      subhead: 'Arc’s signature visual interaction mapping multi-dimensional threads, creators, and Lightning zaps in 2D spatial orbits.',
      targetView: 'galaxy' as ViewMode,
      bullets: [
        'Interactive 2D physics node graph',
        'Real-time pulsing connection lines',
        'Direct graph node zapping & AI synthesis',
      ],
      quote: '"The signature visual feature investors remember forever."',
    },
    {
      id: 'creator',
      title: '4. Creator Economy',
      headline: 'Direct Sovereign Audience Ownership & Earnings',
      subhead: 'Zero platform cuts. Authors earn sats directly from readers via lightning pubkeys with AI trust scoring.',
      targetView: 'creator' as ViewMode,
      bullets: [
        'AI biography & writing style analysis',
        '23,400+ sats earned per month per creator',
        'Direct Web-of-Trust subscriber relationships',
      ],
      quote: '"Sovereign monetization without central platform intermediaries."',
    },
    {
      id: 'ai',
      title: '5. Arc AI Layer',
      headline: 'Omnipresent Personal Intelligence Assistant',
      subhead: 'AI is not a separate chatbot—it is embedded across the entire operating system to summarize, catch up, translate, and refine.',
      targetView: 'feed' as ViewMode,
      bullets: [
        'Summarize feed & catch up on network debates',
        'Find domain experts & draft technical replies',
        'Tone adjustment slider (Concise, Academic, Provocative, ELI5)',
      ],
      quote: '"A personal intelligence layer accompanying every interaction."',
    },
    {
      id: 'wallet',
      title: '6. Lightning Wallet',
      headline: 'Instant Micropayments Integrated with Nostr Keys',
      subhead: 'Human-centered Lightning experience with zero-friction NWC wallet connect and instant zap feedback.',
      targetView: 'wallet' as ViewMode,
      bullets: [
        'Human-readable zap stream ("Sarah supported your article")',
        'Sub-second settlement speeds',
        'Micropayment tips & recurring supporter tiers',
      ],
      quote: '"Making Bitcoin Lightning feel as simple and joyful as a high-five."',
    },
    {
      id: 'roadmap',
      title: '7. Vision Roadmap & Seed Round',
      headline: 'From Nostr Client to Global Decentralized Social Graph',
      subhead: 'Positioned to capture 100M+ sovereign users and autonomous AI agents in a multi-billion dollar market shift.',
      targetView: 'roadmap' as ViewMode,
      bullets: [
        'Phase 1 to Phase 5 execution roadmap',
        'Open Developer SDK for autonomous AI agents',
        'Global peer-to-peer relay mesh network',
      ],
      quote: '"Why doesn’t this exist already? Today we build it."',
    },
  ];

  // Auto-advance timer logic
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((idx) => {
            const nextIdx = (idx + 1) % slides.length;
            if (nextIdx === slides.length - 1) {
              confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
            }
            return nextIdx;
          });
          return 0;
        }
        return prev + 2; // ~5 seconds per slide
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, slides.length]);

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030303]/95 backdrop-blur-2xl text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-5xl glass-panel rounded-3xl p-6 md:p-12 border border-[#F7931A]/40 shadow-[0_0_80px_rgba(247,147,26,0.25)] relative flex flex-col justify-between h-[85vh] max-h-[750px] overflow-hidden"
        >
          {/* Top Keynote Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <ArcLogo size="md" />
              <div>
                <span className="font-extrabold text-white text-base flex items-center gap-2">
                  ARC KEYNOTE PRESENTATION
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F7931A]/20 text-[#F7931A] font-mono border border-[#F7931A]/40">
                    SEED DECK
                  </span>
                </span>
                <span className="text-xs text-zinc-400">Slide {currentSlideIndex + 1} of {slides.length}</span>
              </div>
            </div>

            {/* Play/Pause & Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 rounded-full glass-card hover:bg-white/10 text-white border border-white/10"
                title={isPlaying ? 'Pause Presentation' : 'Play Presentation'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-[#F7931A]" /> : <Play className="w-4 h-4 text-[#FFD166] fill-[#FFD166]" />}
              </button>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full glass-card hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Timeline Indicator */}
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden my-4">
            <div
              className="bg-gradient-to-r from-[#F7931A] via-[#FFD166] to-[#F7931A] h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Slide Content Stage */}
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="flex-1 py-4 flex flex-col justify-center space-y-6 max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FFD166] text-xs font-mono font-bold mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentSlide.title}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {currentSlide.headline}
            </h1>

            <p className="text-zinc-300 text-sm md:text-lg font-light leading-relaxed">
              {currentSlide.subhead}
            </p>

            {/* Bullets */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {currentSlide.bullets.map((b, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300 font-medium flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F7931A]" />
                  {b}
                </span>
              ))}
            </div>

            {/* Quote block */}
            <div className="text-xs md:text-sm font-mono italic text-zinc-400 bg-white/5 p-3 rounded-2xl border border-white/5 max-w-xl mx-auto">
              {currentSlide.quote}
            </div>
          </motion.div>

          {/* Bottom Controls & Jump to Live Feature */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card hover:bg-white/10 text-xs text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => {
                onJumpToView(currentSlide.targetView);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-extrabold text-xs glow-btc hover:scale-105 transition-all flex items-center gap-2"
            >
              <Presentation className="w-4 h-4" />
              <span>Jump to Interactive Feature</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card hover:bg-white/10 text-xs text-white"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
