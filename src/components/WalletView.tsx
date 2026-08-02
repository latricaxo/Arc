import React, { useState } from 'react';
import { LightningTransaction } from '../types';
import { MOCK_TRANSACTIONS } from '../data/mockData';
import { Zap, ArrowUpRight, ArrowDownLeft, ShieldCheck, History, TrendingUp, Sparkles, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface WalletViewProps {
  satsBalance: number;
  onSendSats: (amount: number, recipient: string) => void;
  onSimulateReceive: (amount: number) => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  satsBalance,
  onSendSats,
  onSimulateReceive,
}) => {
  const [transactions, setTransactions] = useState<LightningTransaction[]>(MOCK_TRANSACTIONS);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendAmount, setSendAmount] = useState('1000');
  const [sendRecipient, setSendRecipient] = useState('@sarah_ai');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Sats to USD conversion ($68,000 / BTC rate)
  const usdValue = ((satsBalance / 100000000) * 68000).toFixed(2);

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(sendAmount, 10);
    if (!isNaN(amt) && amt > 0) {
      onSendSats(amt, sendRecipient);

      // Add to local TX list
      const newTx: LightningTransaction = {
        id: 'tx_' + Date.now(),
        type: 'sent',
        amountSats: amt,
        senderOrRecipient: sendRecipient,
        timestamp: 'Just now',
        memo: 'Zap from Arc Wallet',
        humanDescription: `You sent ${amt.toLocaleString()} sats to ${sendRecipient}`,
      };

      setTransactions([newTx, ...transactions]);
      setShowSendModal(false);

      // Trigger Confetti effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F7931A', '#FFD166', '#FFFFFF'],
      });
    }
  };

  const handleSimulateZap = () => {
    onSimulateReceive(500);
    const newTx: LightningTransaction = {
      id: 'tx_' + Date.now(),
      type: 'received',
      amountSats: 500,
      senderOrRecipient: 'Anonymous Supporter',
      timestamp: 'Just now',
      memo: 'Simulated Lightning Supporter Zap',
      humanDescription: 'Your insight received 500 sats',
    };
    setTransactions([newTx, ...transactions]);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#F7931A', '#FFD166', '#34D399'],
    });
  };

  const copyInvoice = () => {
    navigator.clipboard.writeText('lnbc100u1p3...arc_lightning_invoice');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-10 space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7931A]/10 border border-[#F7931A]/30 text-[#F7931A] text-xs font-mono">
            <Zap className="w-3.5 h-3.5 fill-[#F7931A]" />
            <span>CORE FEATURE #5 • BITCOIN LIGHTNING WALLET</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            Human-Centered <span className="text-gradient-btc">Lightning Wallet</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base mt-1">
            Zero friction, instant micro-settlement directly native to Nostr pubkeys.
          </p>
        </div>

        {/* Demo Receive Simulator */}
        <button
          onClick={handleSimulateZap}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-bold text-xs glow-btc hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Simulate Incoming Zap (+500 sats)</span>
        </button>
      </div>

      {/* Hero Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl p-6 md:p-10 border border-[#F7931A]/30 space-y-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-bl from-[#F7931A]/15 via-[#FFD166]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#F7931A]" />
              Nostr Wallet Connect (NWC) Active
            </span>
            <div className="text-4xl md:text-6xl font-extrabold font-mono text-white tracking-tight flex items-baseline gap-3">
              <span>{satsBalance.toLocaleString()}</span>
              <span className="text-xl md:text-3xl text-[#F7931A] font-sans">sats</span>
            </div>
            <p className="text-zinc-400 text-sm font-mono">
              ≈ ${usdValue} USD <span className="text-zinc-500 font-sans">(@ $68,000/BTC)</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSendModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-extrabold text-sm glow-btc hover:scale-105 transition-transform"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              <span>Send Zap</span>
            </button>

            <button
              onClick={copyInvoice}
              className="flex items-center gap-2 px-6 py-3 rounded-full glass-card hover:bg-white/10 text-white font-medium text-sm border border-white/15"
            >
              {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <ArrowDownLeft className="w-4 h-4 text-emerald-400" />}
              <span>{copiedAddress ? 'Invoice Copied!' : 'Receive LN'}</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div className="glass-card p-4 rounded-2xl border border-white/5">
            <span className="text-xs text-zinc-400">Monthly Supporter Revenue</span>
            <div className="text-lg font-bold font-mono text-gradient-btc mt-1">23,400 sats</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-white/5">
            <span className="text-xs text-zinc-400">Average Zap Received</span>
            <div className="text-lg font-bold font-mono text-white mt-1">680 sats</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-white/5 col-span-2 md:col-span-1">
            <span className="text-xs text-zinc-400">Lightning Settlement Time</span>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-1">0.4 seconds</div>
          </div>
        </div>
      </motion.div>

      {/* Human-Centered Zap History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-[#F7931A]" />
            Human Zap Stream
          </h3>
          <span className="text-xs text-zinc-400 font-mono">Real-time Nostr LN events</span>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                    tx.type === 'received'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}
                >
                  {tx.type === 'received' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white">{tx.humanDescription}</h4>
                  <p className="text-xs text-zinc-400 italic">"{tx.memo}"</p>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-sm font-bold font-mono ${
                    tx.type === 'received' ? 'text-emerald-400' : 'text-zinc-300'
                  }`}
                >
                  {tx.type === 'received' ? '+' : '-'}{tx.amountSats.toLocaleString()} sats
                </div>
                <span className="text-[11px] text-zinc-500">{tx.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Send Zap Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-full max-w-md glass-panel rounded-3xl p-6 border border-white/20 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#F7931A] fill-[#F7931A]" />
                Send Lightning Zap
              </h3>
              <button onClick={() => setShowSendModal(false)} className="text-zinc-400">✕</button>
            </div>

            <form onSubmit={handleSendSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-400">Recipient Nostr Handle or LN Address</label>
                <input
                  type="text"
                  value={sendRecipient}
                  onChange={(e) => setSendRecipient(e.target.value)}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#F7931A]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400">Amount (Sats)</label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#F7931A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-extrabold text-sm glow-btc"
              >
                Confirm Zap Send
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
