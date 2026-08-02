import React, { useState } from 'react';
import { ViewMode, FeedPost, BriefCard, NotificationItem } from './types';
import { CURRENT_USER, MOCK_BRIEF_CARDS, MOCK_FEED_POSTS, MOCK_NOTIFICATIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { BriefView } from './components/BriefView';
import { FeedView } from './components/FeedView';
import { GalaxyView } from './components/GalaxyView';
import { CreatorView } from './components/CreatorView';
import { WalletView } from './components/WalletView';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ComposerModal } from './components/ComposerModal';
import { NotificationsView } from './components/NotificationsView';
import { ProfileView } from './components/ProfileView';
import { RoadmapView } from './components/RoadmapView';
import { LandingPageView } from './components/LandingPageView';
import { OnboardingModal } from './components/OnboardingModal';
import { InvestorDemoMode } from './components/InvestorDemoMode';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('brief');
  const [userSats, setUserSats] = useState<number>(154200);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(MOCK_FEED_POSTS);
  const [briefCards, setBriefCards] = useState<BriefCard[]>(MOCK_BRIEF_CARDS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  // Modals
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [composerOpen, setComposerOpen] = useState<boolean>(false);
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(false);
  const [investorDemoOpen, setInvestorDemoOpen] = useState<boolean>(false);

  // Unread count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Handle zapping cards or posts
  const handleZap = (amount: number, memoText: string) => {
    setUserSats((prev) => Math.max(0, prev - amount));

    // Add notification
    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      type: 'zap',
      title: '⚡ Zap Delivered',
      subtitle: `Successfully zapped ${amount.toLocaleString()} sats. ${memoText}`,
      timestamp: 'Just now',
      satsAmount: amount,
      isRead: false,
    };
    setNotifications([newNotif, ...notifications]);

    // Confetti effect
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F7931A', '#FFD166'],
    });
  };

  const handlePublishPost = (content: string, satsGoal: number) => {
    const newPost: FeedPost = {
      id: 'post_' + Date.now(),
      author: CURRENT_USER,
      content,
      aiSummary: 'User created a new high-signal post about Nostr protocol and Lightning.',
      readTime: '1 min read',
      trustIndicator: 99,
      conversationDepth: 1,
      zapCount: 0,
      createdAt: 'Just now',
      category: 'Today',
      topics: ['Nostr', 'Bitcoin'],
      relatedTopics: ['Arc'],
      repliesCount: 0,
      repostsCount: 0,
      liked: false,
    };

    setFeedPosts([newPost, ...feedPosts]);
    setCurrentView('feed');
  };

  const handleSearch = (query: string) => {
    console.log('Searching signal:', query);
    setCurrentView('feed');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#F7931A] selection:text-black pb-20 md:pb-6">
      
      {/* Top Navbar (Hidden when viewing public landing page or presentation mode) */}
      {currentView !== 'landing' && (
        <Navbar
          currentView={currentView}
          onNavigate={(v) => setCurrentView(v)}
          userSats={userSats}
          onOpenAI={() => setAiModalOpen(true)}
          onOpenComposer={() => setComposerOpen(true)}
          onStartInvestorDemo={() => setInvestorDemoOpen(true)}
          unreadCount={unreadCount}
          onSearch={handleSearch}
        />
      )}

      {/* Main View Container */}
      <main className="flex-1 w-full">
        {currentView === 'brief' && (
          <BriefView
            cards={briefCards}
            userName={CURRENT_USER.name}
            onZapCard={(id, sats) => handleZap(sats, `Card ID ${id}`)}
            onJoinDiscussion={(card) => {
              setCurrentView('feed');
            }}
            onOpenAI={() => setAiModalOpen(true)}
          />
        )}

        {currentView === 'feed' && (
          <FeedView
            posts={feedPosts}
            onZapPost={(id, amount) => handleZap(amount, `Post ID ${id}`)}
            onOpenAI={() => setAiModalOpen(true)}
            onOpenComposer={() => setComposerOpen(true)}
          />
        )}

        {currentView === 'galaxy' && (
          <GalaxyView
            onZapNode={(nodeId, sats) => handleZap(sats, `Node ${nodeId}`)}
            onOpenAI={() => setAiModalOpen(true)}
          />
        )}

        {currentView === 'creator' && (
          <CreatorView
            onZapCreator={(name, sats) => handleZap(sats, `Creator ${name}`)}
          />
        )}

        {currentView === 'wallet' && (
          <WalletView
            satsBalance={userSats}
            onSendSats={(amt, recip) => handleZap(amt, `Sent to ${recip}`)}
            onSimulateReceive={(amt) => setUserSats((s) => s + amt)}
          />
        )}

        {currentView === 'notifications' && (
          <NotificationsView
            notifications={notifications}
            onMarkAllRead={() =>
              setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
            }
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            user={CURRENT_USER}
            onOpenAI={() => setAiModalOpen(true)}
          />
        )}

        {currentView === 'roadmap' && (
          <RoadmapView
            onStartInvestorDemo={() => setInvestorDemoOpen(true)}
          />
        )}

        {currentView === 'landing' && (
          <LandingPageView
            onEnterApp={() => setCurrentView('brief')}
            onStartInvestorDemo={() => setInvestorDemoOpen(true)}
            onOpenOnboarding={() => setOnboardingOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      {currentView !== 'landing' && (
        <MobileNav
          currentView={currentView}
          onNavigate={(v) => setCurrentView(v)}
          onOpenComposer={() => setComposerOpen(true)}
          onOpenAI={() => setAiModalOpen(true)}
        />
      )}

      {/* Modals */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />

      <ComposerModal
        isOpen={composerOpen}
        onClose={() => setComposerOpen(false)}
        onPublish={handlePublishPost}
      />

      <OnboardingModal
        isOpen={onboardingOpen}
        onComplete={(topics) => {
          setOnboardingOpen(false);
          setCurrentView('brief');
        }}
      />

      <InvestorDemoMode
        isOpen={investorDemoOpen}
        onClose={() => setInvestorDemoOpen(false)}
        onJumpToView={(view) => setCurrentView(view)}
      />
    </div>
  );
}
