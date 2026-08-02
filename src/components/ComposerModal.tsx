import React, { useState } from 'react';
import { Sparkles, Mic, Image, Zap, Send, Sliders, Check, Eye, PenTool, X } from 'lucide-react';
import { motion } from 'motion/react';

interface ComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (content: string, satsReward: number) => void;
}

export const ComposerModal: React.FC<ComposerModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  const [content, setContent] = useState('');
  const [isAiRewriting, setIsAiRewriting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [tipGoal, setTipGoal] = useState(5000);
  const [previewMode, setPreviewMode] = useState(false);

  if (!isOpen) return null;

  const handleAiRewrite = () => {
    if (!content.trim()) return;
    setIsAiRewriting(true);
    setTimeout(() => {
      setContent(
        `Architecting sovereign communication layers: When public key cryptography is natively combined with Bitcoin Lightning settlement, social graphs shift from platform liabilities to portable economic capital.`
      );
      setIsAiRewriting(false);
    }, 600);
  };

  const handleVoiceRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setContent(
        `Exploring how Silent Payments (BIP-352) and Nostr Wallet Connect enable seamless micro-tips for open-source AI models.`
      );
      setIsRecording(false);
    }, 1500);
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onPublish(content, tipGoal);
      setContent('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl space-y-6 bg-[#0B0B0B]"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-[#F7931A]" />
            <h3 className="font-extrabold text-white text-lg">ARC STUDIO COMPOSER</h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white glass-card px-3 py-1.5 rounded-full"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{previewMode ? 'Edit' : 'Preview'}</span>
            </button>
            <button onClick={onClose} className="text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {previewMode ? (
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
            <span className="text-xs font-mono text-[#F7931A]">PREVIEW MODE • Kind 1 Nostr Event</span>
            <p className="text-white text-sm leading-relaxed whitespace-pre-line">{content || 'Empty post...'}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <textarea
              rows={5}
              placeholder="What high-signal idea are you sharing with your Nostr network today?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F7931A] resize-none"
            />

            {/* AI Assistant Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAiRewrite}
                  disabled={isAiRewriting || !content}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7931A]/20 hover:bg-[#F7931A]/30 text-[#F7931A] text-xs font-medium border border-[#F7931A]/40 transition-all disabled:opacity-40"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>{isAiRewriting ? 'Rewriting...' : 'AI Refine & Expand'}</span>
                </button>

                <button
                  onClick={handleVoiceRecord}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isRecording
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500 animate-pulse'
                      : 'bg-white/5 text-zinc-300 border-white/10 hover:text-white'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isRecording ? 'Listening...' : 'Voice Dictate'}</span>
                </button>
              </div>

              {/* Sats Goal Setting */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Zap className="w-3.5 h-3.5 text-[#F7931A]" />
                <span>Tip Goal:</span>
                <input
                  type="number"
                  value={tipGoal}
                  onChange={(e) => setTipGoal(Number(e.target.value))}
                  className="w-20 bg-black border border-white/10 rounded-md px-2 py-0.5 font-mono text-xs text-[#F7931A] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-xs font-mono text-zinc-500">
            Cryptographically signed with secp256k1 key
          </span>

          <button
            onClick={handlePublishSubmit}
            disabled={!content.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-extrabold text-xs glow-btc disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
            <span>Publish to Relays</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
