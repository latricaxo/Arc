export type ViewMode =
  | 'brief'
  | 'feed'
  | 'galaxy'
  | 'creator'
  | 'wallet'
  | 'notifications'
  | 'profile'
  | 'roadmap'
  | 'landing'
  | 'onboarding';

export interface NostrUser {
  id: string;
  npub: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  aiBio: string;
  reputationScore: number;
  followersCount: number;
  supportersCount: number;
  satsEarnedMonth: number;
  writingStyle: string;
  topics: string[];
  isVerified: boolean;
  trustScore: number; // 0-100
}

export interface BriefCard {
  id: string;
  title: string;
  summary: string;
  category: 'Bitcoin' | 'AI' | 'Privacy' | 'Design' | 'Startups';
  keyPeople: { name: string; avatar: string; handle: string }[];
  mainIdeas: string[];
  readingTime: string;
  relatedCount: number;
  sentiment: 'Bullish' | 'Critical' | 'Exploratory' | 'Breakthrough';
  totalZaps: number;
  deepDiveUrl?: string;
}

export interface FeedPost {
  id: string;
  author: NostrUser;
  content: string;
  aiSummary: string;
  readTime: string;
  trustIndicator: number; // 0-100
  conversationDepth: number; // nested levels or discussion tree count
  zapCount: number; // sats
  createdAt: string;
  category: 'Today' | 'Your Network' | 'Trending Ideas' | 'Hidden Gems' | 'Recommended People';
  topics: string[];
  relatedTopics: string[];
  repliesCount: number;
  repostsCount: number;
  liked: boolean;
}

export interface GalaxyNode {
  id: string;
  label: string;
  type: 'concept' | 'person' | 'post' | 'topic';
  size: number;
  x: number;
  y: number;
  color: string;
  details: string;
  zaps?: number;
  connections: string[]; // connected node IDs
}

export interface LightningTransaction {
  id: string;
  type: 'received' | 'sent';
  amountSats: number;
  senderOrRecipient: string;
  avatar?: string;
  timestamp: string;
  memo: string;
  humanDescription: string;
}

export interface NotificationItem {
  id: string;
  type: 'zap' | 'ai_discovery' | 'trending' | 'response';
  title: string;
  subtitle: string;
  timestamp: string;
  satsAmount?: number;
  user?: { name: string; avatar: string };
  isRead: boolean;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  subtitle: string;
  status: 'Complete' | 'In Progress' | 'Upcoming' | 'Future';
  targetDate: string;
  milestones: string[];
  description: string;
}
