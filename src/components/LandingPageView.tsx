import React, { useState } from 'react';
import { ArcLogo } from './ArcLogo';
import { Sparkles, Zap, ShieldCheck, Globe, BookOpen, Layers, ArrowRight, Lock, CheckCircle, ChevronDown, Play, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageViewProps {
  onEnterApp: () => void;
  onStartInvestorDemo: () => void;
  onOpenOnboarding: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onEnterApp,
  onStartInvestorDemo,
  onOpenOnboarding,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What makes Arc fundamentally different from Twitter/X or Reddit?',
      a: 'Traditional social platforms trap your relationships on corporate servers and use outrage algorithms to maximize ad view time. Arc runs natively on Nostr, making your identity cryptographically portable. Furthermore, Arc replaces endless outrage feeds with AI-synthesized daily briefs and direct Lightning creator tips.',
    },
    {
      q: 'How does the AI Brief work without reading my private keys?',
      a: 'Arc processes public Kind 1 Nostr relay events locally or via encrypted server-side proxy models. Your secp256k1 private key never leaves your device or key manager.',
    },
    {
      q: 'What is Nostr Wallet Connect (NWC)?',
      a: 'NWC is an open protocol specification allowing web and mobile apps to send and receive Bitcoin Lightning micropayments seamlessly without exposing sensitive seed phrases.',
    },
    {
      q: 'How do creators earn money on Arc?',
      a: 'Creators receive instant 100% direct Lightning zaps from readers with zero platform transaction fees. Fans can also establish per-second micropayment streams for long-form essays and voice notes.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white selection:bg-[#F7931A] selection:text-black">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-36 px-4">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F7931A]/20 via-[#FFD166]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#F7931A]/30 text-[#FFD166] text-xs font-mono font-medium animate-pulse">
            <Sparkles className="w-4 h-4 text-[#F7931A]" />
            <span>THE AI-NATIVE SOCIAL OPERATING SYSTEM FOR NOSTR</span>
          </div>

          <div className="flex justify-center">
            <ArcLogo size="xl" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none">
            ARC <br />
            <span className="text-gradient-btc">The future of social belongs to people.</span>
          </h1>

          <p className="text-zinc-300 text-base md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            An AI-powered Nostr client where conversations become intelligent, identities become portable, and creators own their audience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenOnboarding}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#F7931A] via-[#FFD166] to-[#F7931A] text-black font-extrabold text-sm glow-btc hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <span>Join Private Beta</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onClick={onStartInvestorDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-card hover:bg-white/10 text-white font-bold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 text-[#F7931A] fill-[#F7931A]" />
              <span>Request Investor Deck</span>
            </button>
          </div>

          <div className="pt-6 flex items-center justify-center gap-6 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#F7931A]" /> Portable Keys</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#FFD166]" /> Native Lightning</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-300" /> AI Brief Engine</span>
          </div>
        </div>
      </section>

      {/* 1. Problem vs Solution */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="glass-panel p-8 rounded-3xl border border-rose-500/20 space-y-4">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-bold">
              THE PROBLEM: OLD SOCIAL
            </span>
            <h3 className="text-2xl font-bold text-white">Addiction & Attention Harvesters</h3>
            <ul className="space-y-3 text-xs md:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Platforms lock your audience and data inside proprietary corporate silos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Algorithms optimize for outrage and doom-scrolling to show 30% display ads.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Centralized moderation leads to sudden account bans and de-platforming.</span>
              </li>
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-[#F7931A]/40 space-y-4 glow-btc">
            <span className="px-3 py-1 rounded-full bg-[#F7931A]/20 text-[#F7931A] text-xs font-mono font-bold">
              THE SOLUTION: ARC
            </span>
            <h3 className="text-2xl font-bold text-white">Signal, Ownership & Intelligence</h3>
            <ul className="space-y-3 text-xs md:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#F7931A] shrink-0 mt-0.5" />
                <span>Nostr cryptographic keys give you 100% portable identity across clients.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#F7931A] shrink-0 mt-0.5" />
                <span>Arc AI summarizes hundreds of posts into 5 high-signal takeaways every day.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#F7931A] shrink-0 mt-0.5" />
                <span>Bitcoin Lightning native micropayments reward creators directly with zero fee take.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Interactive Product Demo Teaser */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-t border-white/10 text-center space-y-8">
        <div>
          <span className="text-xs font-mono text-[#F7931A] uppercase">LIVE INTERACTIVE PROTOTYPE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-1">Experience Arc Today</h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2">
            Click below to explore the AI Brief, Conversation Galaxy, and Sovereign Creator Economy.
          </p>
        </div>

        <button
          onClick={onEnterApp}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-extrabold text-sm glow-btc hover:scale-105 transition-transform inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Interactive App Experience</span>
        </button>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto border-t border-white/10 space-y-6">
        <h2 className="text-3xl font-extrabold text-white text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 pt-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-5 border border-white/10 cursor-pointer"
              onClick={() => setActiveFaq(activeFaq === index ? null : index)}
            >
              <div className="flex items-center justify-between font-bold text-sm md:text-base text-white">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#F7931A] transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
              </div>
              {activeFaq === index && (
                <p className="text-xs md:text-sm text-zinc-300 mt-3 pt-3 border-t border-white/10 leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center space-y-6 border-t border-white/10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white">
          Ready to build the <span className="text-gradient-btc">future of human connection?</span>
        </h2>
        <p className="text-zinc-300 text-sm md:text-base max-w-lg mx-auto">
          Join the seed investor preview and shape the next generation of social networking.
        </p>
        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={onStartInvestorDemo}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-extrabold text-sm glow-btc hover:scale-105 transition-transform"
          >
            Launch Investor Presentation
          </button>
        </div>
      </section>
    </div>
  );
};
