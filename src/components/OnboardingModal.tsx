import React, { useState } from 'react';
import { ArcLogo } from './ArcLogo';
import { Sparkles, Check, ArrowRight, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (selectedTopics: string[]) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Bitcoin', 'AI']);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const topicsList = [
    'Bitcoin',
    'AI',
    'Technology',
    'Design',
    'Startups',
    'Privacy',
    'Open Source',
    'Macroeconomics',
    'Spatial UI',
  ];

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleFinish = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onComplete(selectedTopics);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xl glass-panel rounded-3xl p-6 md:p-10 border border border-white/20 shadow-2xl space-y-8 bg-[#080808] text-center"
      >
        <div className="flex justify-center">
          <ArcLogo size="lg" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-white">WELCOME TO ARC</h2>
          <p className="text-zinc-300 text-sm">What matters to you?</p>
        </div>

        {/* Topic Pills Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 py-4">
          {topicsList.map((topic) => {
            const isSelected = selectedTopics.includes(topic);
            return (
              <button
                key={topic}
                onClick={() => toggleTopic(topic)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-bold shadow-[0_0_15px_rgba(247,147,26,0.5)] scale-105'
                    : 'glass-card text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                <span>{topic}</span>
              </button>
            );
          })}
        </div>

        {isGenerating ? (
          <div className="glass-card p-4 rounded-2xl border border-amber-500/30 text-amber-300 text-xs font-mono animate-pulse flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin text-[#F7931A]" />
            <span>Generating your personalized Arc universe...</span>
          </div>
        ) : (
          <button
            onClick={handleFinish}
            disabled={selectedTopics.length === 0}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-extrabold text-sm glow-btc hover:scale-102 transition-transform flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <span>Initialize Arc Personal Universe</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        )}
      </motion.div>
    </div>
  );
};
