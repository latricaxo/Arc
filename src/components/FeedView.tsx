import React, { useState } from 'react';
import { FeedPost } from '../types';
import { Sparkles, Clock, ShieldCheck, Zap, MessageSquare, Repeat, Heart, Filter, ChevronDown, Compass, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface FeedViewProps {
  posts: FeedPost[];
  onZapPost: (postId: string, amount: number) => void;
  onOpenAI: () => void;
  onOpenComposer: () => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  posts,
  onZapPost,
  onOpenAI,
  onOpenComposer,
}) => {
  const [selectedTab, setSelectedTab] = useState<FeedPost['category']>('Today');
  const [activePosts, setActivePosts] = useState<FeedPost[]>(posts);
  const [expandedSummaryId, setExpandedSummaryId] = useState<string | null>(null);

  const tabs: FeedPost['category'][] = [
    'Today',
    'Your Network',
    'Trending Ideas',
    'Hidden Gems',
    'Recommended People',
  ];

  const filteredPosts = activePosts.filter((p) => p.category === selectedTab);

  const handleLike = (id: string) => {
    setActivePosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
            Intelligent <span className="text-gradient-btc">Signal Stream</span>
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm">
            Censorship-resistant Nostr events ranked by AI Web of Trust algorithms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card hover:bg-white/10 text-amber-300 border border-amber-500/30 text-xs font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            <span>AI Summarize Stream</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-white/10 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-medium shrink-0 transition-all ${
              selectedTab === tab
                ? 'bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-bold shadow-[0_0_15px_rgba(247,147,26,0.4)]'
                : 'glass-card text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Feed Posts List */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="glass-panel p-10 rounded-3xl text-center space-y-3 border border-white/10">
            <Compass className="w-10 h-10 text-[#F7931A] mx-auto animate-spin-slow" />
            <h3 className="text-lg font-bold text-white">Arc is discovering your signal.</h3>
            <p className="text-zinc-400 text-xs max-w-sm mx-auto">
              Connecting to peer relays and applying your custom trust scoring parameters...
            </p>
          </div>
        ) : (
          filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all space-y-4 shadow-xl"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#F7931A]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm">{post.author.name}</span>
                      <span className="text-xs text-zinc-400 font-mono">{post.author.handle}</span>
                      {post.author.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-[#F7931A] fill-[#F7931A]" />
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-500">{post.createdAt}</span>
                  </div>
                </div>

                {/* Trust Badge & Read Time */}
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    {post.trustIndicator}% Trust
                  </span>
                  <span className="flex items-center gap-1 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* AI Summary Overlay Drawer */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-[#FFD166]">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    ARC AI SYNTHESIS
                  </span>
                  <button
                    onClick={() => setExpandedSummaryId(expandedSummaryId === post.id ? null : post.id)}
                    className="text-zinc-400 hover:text-white underline text-[11px]"
                  >
                    {expandedSummaryId === post.id ? 'Collapse' : 'Expand Details'}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {post.aiSummary}
                </p>
              </div>

              {/* Main Content */}
              <p className="text-zinc-200 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5">
                {post.topics.map((topic) => (
                  <span key={topic} className="px-2.5 py-0.5 rounded-full bg-white/5 text-[11px] text-zinc-400 border border-white/5">
                    #{topic}
                  </span>
                ))}
              </div>

              {/* Engagement Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.liked ? 'text-rose-500 font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-rose-500' : ''}`} />
                    <span>{post.liked ? 134 : 133}</span>
                  </button>

                  <button className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.repliesCount}</span>
                  </button>

                  <button className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                    <Repeat className="w-4 h-4" />
                    <span>{post.repostsCount}</span>
                  </button>
                </div>

                {/* Zap Button */}
                <button
                  onClick={() => onZapPost(post.id, 1000)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111] hover:bg-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/40 font-mono font-bold text-xs transition-all glow-btc"
                >
                  <Zap className="w-3.5 h-3.5 fill-[#F7931A]" />
                  <span>{post.zapCount.toLocaleString()} sats</span>
                </button>
              </div>
            </motion.article>
          ))
        )}
      </div>
    </div>
  );
};
