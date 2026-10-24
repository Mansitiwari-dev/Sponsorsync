import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, activeRole, escrowContracts } = useApp();

  const activeEscrowNeedsAttention = escrowContracts.some(
    (c) => c.status === 'under_review' || c.status === 'draft_submitted'
  );

  const tabs: { id: NavigationTab; label: string; icon: string; badge?: boolean }[] = [
    {
      id: 'feed',
      label: activeRole === 'creator' ? 'Campaigns' : 'Explore',
      icon: 'explore',
    },
    {
      id: 'briefs',
      label: activeRole === 'brand' ? 'My Briefs' : 'Proposals',
      icon: activeRole === 'brand' ? 'campaign' : 'send_and_archive',
    },
    {
      id: 'workspace',
      label: 'Escrow Chat',
      icon: 'chat_bubble',
      badge: activeEscrowNeedsAttention,
    },
    {
      id: 'wallet',
      label: 'Wallet',
      icon: 'account_balance_wallet',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'person',
    },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shrink-0 z-30">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              <span
                className={`material-symbols-outlined text-[22px] transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
              >
                {tab.icon}
              </span>
              {tab.badge && (
                <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-pink-600 rounded-full ring-2 ring-white"></span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
