import React, { useState } from 'react';
import { Sparkles, MessageSquare, Compass, Send, BookOpen, Layers, Zap, Languages, Check, Sliders, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAction?: (result: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplyAction,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; actionType?: string }[]>([
    {
      role: 'assistant',
      text: "Greetings, Alex. I am your personal Arc Intelligence layer on Nostr. How can I refine your signal today?",
    },
  ]);
  const [tone, setTone] = useState<'concise' | 'academic' | 'provocative' | 'eli5'>('concise');

  const presetActions = [
    { label: 'Summarize my feed', icon: <BookOpen className="w-3.5 h-3.5" />, query: 'Summarize the top 5 high-signal discussions in my network right now.' },
    { label: 'Catch me up', icon: <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />, query: 'Catch me up on what happened in the Bitcoin & AI space in the last 24 hours.' },
    { label: 'Explain Silent Payments debate', icon: <Layers className="w-3.5 h-3.5" />, query: 'Explain the BIP-352 Silent Payments debate simply and highlight key trade-offs.' },
    { label: 'Find Nostr privacy experts', icon: <Compass className="w-3.5 h-3.5" />, query: 'Find top trusted Nostr developers publishing about zero-knowledge relay privacy.' },
    { label: 'Suggest high-signal reply', icon: <MessageSquare className="w-3.5 h-3.5" />, query: 'Draft a concise, technical reply agreeing with Lyn Alden’s monetary liquidity post.' },
    { label: 'Translate to Spanish', icon: <Languages className="w-3.5 h-3.5" />, query: 'Translate the latest network brief into Spanish maintaining technical nuance.' },
  ];

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    // Add user message
    const newMsgs = [...messages, { role: 'user' as const, text: queryText }];
    setMessages(newMsgs);
    setPrompt('');
    setIsProcessing(true);

    // Simulate AI synthesis with high-quality responses
    setTimeout(() => {
      let aiResponse = '';
      if (queryText.includes('Summarize') || queryText.includes('feed')) {
        aiResponse = `📊 **Arc Feed Synthesis**:
1. **Bitcoin Privacy**: Developers reached consensus on BIP-352 Silent Payments. Light client scanning overhead reduced by 70%.
2. **AI Identity**: Sarah Connor deployed an autonomous agent with NWC Lightning wallet signing Nostr Kind 1 events.
3. **Macro Liquidity**: Lyn Alden released a new paper showing PoW mining absorbs stranded renewable energy grids.
4. **Spatial UI**: Alex Rivera showcased 2D Conversation Galaxy graphs replacing legacy vertical timelines.`;
      } else if (queryText.includes('Catch me up') || queryText.includes('24 hours')) {
        aiResponse = `⚡ **24-Hour Network Catchup**:
- **427 total conversations** analyzed across 142 connected Nostr relays.
- **Top Signal**: Silent payments integration in Nostr Wallet Connect (NWC).
- **Creator Earnings**: Over 3,450,000 sats tipped across 54 research essays.
- **Key Takeaway**: Web-of-Trust algorithms are filtering 99.4% of bot spam without central moderators.`;
      } else if (queryText.includes('Silent Payments') || queryText.includes('debate')) {
        aiResponse = `💡 **Silent Payments (BIP-352) Overview**:
- **The Problem**: Public Bitcoin address reuse leaks transaction history to blockchain analytics firms.
- **The Arc Solution**: Silent Payments allow senders to derive unique one-time destination addresses without back-and-forth communication.
- **Nostr Integration**: Paired with Nostr NWC, wallets scan encrypted relay receipts in real time.`;
      } else if (queryText.includes('Find') || queryText.includes('experts')) {
        aiResponse = `🔍 **Top Nostr & Privacy Experts**:
1. **fiatjaf** (@fiatjaf) - Trust Score: 100 | Nostr Creator
2. **Lyn Alden** (@lyn_alden) - Trust Score: 100 | Monetary Protocol Lead
3. **Alex Rivera** (@arivera) - Trust Score: 98 | Spatial UI & Cryptography
4. **Sarah Connor** (@sarah_ai) - Trust Score: 95 | Autonomous Agent Safety`;
      } else {
        aiResponse = `✨ **Arc AI Response** (${tone.toUpperCase()} tone):
"Based on real-time Nostr relay events and cryptographic signatures, your network's signal points to strong agreement on sovereign protocol layers. Decentralized key management eliminates central point of failure."`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: aiResponse }]);
      setIsProcessing(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-3xl glass-panel rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl flex flex-col h-[80vh] max-h-[700px] bg-[#0A0A0A]/95"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F7931A] to-[#FFD166] flex items-center justify-center text-black glow-btc">
                <Sparkles className="w-5 h-5 fill-black" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg flex items-center gap-2">
                  ARC AI INTELLIGENCE
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    OMNIPRESENT
                  </span>
                </h3>
                <p className="text-zinc-400 text-xs">Your personal intelligence layer on Nostr</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full glass-card hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-white/10">
            {presetActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSendQuery(action.query)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#F7931A]/20 border border-white/10 text-xs text-zinc-300 hover:text-white transition-all shrink-0"
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {/* Conversation Chat Feed */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-medium'
                      : 'glass-card border border-white/10 text-zinc-200'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex justify-start">
                <div className="glass-card p-4 rounded-2xl text-xs text-amber-300 flex items-center gap-2 border border-amber-500/30 animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#F7931A]" />
                  <span>Synthesizing Nostr Relays & Web of Trust...</span>
                </div>
              </div>
            )}
          </div>

          {/* Tone Selector & Input Form */}
          <div className="pt-3 border-t border-white/10 space-y-3">
            {/* Tone Selector */}
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1 font-mono">
                <Sliders className="w-3.5 h-3.5 text-[#F7931A]" /> Tone:
              </span>
              <div className="flex items-center gap-1.5">
                {(['concise', 'academic', 'provocative', 'eli5'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono capitalize ${
                      tone === t ? 'bg-[#F7931A] text-black font-bold' : 'bg-white/5 text-zinc-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuery(prompt);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Arc AI to summarize, translate, catch up, or write..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#F7931A]"
              />
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="p-2.5 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-bold disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
