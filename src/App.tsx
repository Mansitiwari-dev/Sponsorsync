/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { AuthScreen } from './components/auth/AuthScreen';
import { CreatorFeed } from './components/creator/CreatorFeed';
import { BrandView } from './components/brand/BrandView';
import { EscrowWorkspace } from './components/chat/EscrowWorkspace';
import { WalletView } from './components/wallet/WalletView';
import { ProfileView } from './components/profile/ProfileView';

const MainLayout: React.FC = () => {
  const { isAuthenticated, activeRole, currentTab, deviceMode } = useApp();

  const renderContent = () => {
    switch (currentTab) {
      case 'feed':
        return activeRole === 'creator' ? <CreatorFeed /> : <BrandView />;
      case 'briefs':
        return activeRole === 'brand' ? <BrandView /> : <CreatorFeed />;
      case 'workspace':
        return <EscrowWorkspace />;
      case 'wallet':
        return <WalletView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <CreatorFeed />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8FF] flex items-center justify-center p-0 sm:p-4">
        {deviceMode === 'mobile-frame' ? (
          <div className="w-full max-w-[430px] min-h-[880px] bg-white rounded-none sm:rounded-[44px] shadow-2xl border-0 sm:border-[8px] sm:border-slate-800 overflow-hidden flex flex-col relative ring-1 ring-slate-900/10">
            {/* Mobile Device Status Bar */}
            <div className="h-11 px-6 pt-3 flex items-center justify-between text-slate-800 text-[11px] font-semibold select-none bg-white z-20">
              <span>9:41</span>
              {/* Dynamic Island */}
              <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto" />
              <div className="flex items-center gap-1.5 text-xs">
                <span className="material-symbols-outlined text-sm">signal_cellular_alt</span>
                <span className="material-symbols-outlined text-sm">wifi</span>
                <span className="material-symbols-outlined text-sm">battery_full</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              <AuthScreen />
            </div>

            {/* Mobile Home Indicator */}
            <div className="h-6 flex items-center justify-center bg-white shrink-0">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <AuthScreen />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col">
      {/* Top Global Header (Role Switcher & Device Switcher) */}
      <Header />

      {/* Main Viewport Container */}
      <div className="flex-1 flex justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        {deviceMode === 'mobile-frame' ? (
          /* Expo Mobile Device Frame Preview */
          <div className="w-full max-w-[430px] h-[calc(100vh-80px)] max-h-[920px] bg-[#FAF8FF] rounded-none sm:rounded-[44px] shadow-2xl border-0 sm:border-[8px] sm:border-slate-800 overflow-hidden flex flex-col relative ring-1 ring-slate-900/10">
            {/* Mobile Device Top Status Bar */}
            <div className="h-10 px-6 pt-2.5 flex items-center justify-between text-slate-800 text-[11px] font-semibold select-none bg-[#FAF8FF] shrink-0 z-20 border-b border-slate-100">
              <span className="font-mono">9:41</span>
              {/* Dynamic Island Capsule */}
              <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto" />
              <div className="flex items-center gap-1.5 text-xs">
                <span className="material-symbols-outlined text-sm">signal_cellular_alt</span>
                <span className="material-symbols-outlined text-sm">wifi</span>
                <span className="material-symbols-outlined text-sm">battery_full</span>
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <main className="flex-1 overflow-y-auto px-4 pt-3 no-scrollbar">
              {renderContent()}
            </main>

            {/* Native Mobile Bottom Navigation */}
            <BottomNav />

            {/* Mobile Home Indicator */}
            <div className="h-5 flex items-center justify-center bg-white shrink-0">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>
        ) : (
          /* Wide Desktop / Tablet Responsive View */
          <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col min-h-[800px] overflow-hidden">
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Sidebar Tabs */}
              <aside className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {activeRole === 'creator' ? 'Creator Workspace' : 'Brand Console'}
                  </div>
                  <BottomNav />
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-slate-900 block">SponsorSync Escrow</span>
                  <p className="text-[11px] text-slate-500">
                    256-bit smart contract protection. Funds disbursed directly via Stripe Express.
                  </p>
                </div>
              </aside>

              {/* Main Content Pane */}
              <main className="flex-1 overflow-y-auto p-6 bg-[#FAF8FF]">
                {renderContent()}
              </main>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
