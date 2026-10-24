import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    activeRole,
    switchRole,
    currentUser,
    logout,
    deviceMode,
    setDeviceMode,
    availableBalance,
    setCurrentTab,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative w-8 h-8 rounded-xl bg-white shadow-xs border border-slate-200 p-1 flex items-center justify-center">
            <img
              alt="SponsorSync"
              className="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VubaQBwwDmGenZnE96jDF1dMPPspaZEiobsNGMz-gv7x_r1l82nyYx4sDgt_2xxFOPIgFzto9bC5UsglABvXG92bEvEq2uiDFMyE4rcwvgwr14SjEq3Fn8gG8Cx0M8Dqc0kH0pT_NyA9IpNq7OEa6REmLXYAFRLZelzhv8qsC3koBcT1ZvKFRCsSYadHr0nNLRsm_dIU2Vqj_HVQLMz91_hnO7F967pPKpxDXEuuEUEE9HsUqIAGIkSRQ"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-pink-600 ring-2 ring-white"></span>
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm tracking-tight hidden sm:inline">
              SponsorSync
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[11px]">verified_user</span>
              Escrow Active
            </span>
          </div>
        </div>

        {/* Center: Global Segmented Toggle [ Creator View | Brand View ] */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
          <button
            onClick={() => switchRole('creator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeRole === 'creator'
                ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-black/5'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-sm">videocam</span>
            <span>Creator View</span>
          </button>

          <button
            onClick={() => switchRole('brand')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeRole === 'brand'
                ? 'bg-white text-indigo-700 shadow-xs ring-1 ring-black/5'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-sm">rocket_launch</span>
            <span>Brand View</span>
          </button>
        </div>

        {/* Right: Device Frame Toggle & User / Balance */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Device Frame Viewport Toggle */}
          <button
            onClick={() => setDeviceMode(deviceMode === 'mobile-frame' ? 'responsive' : 'mobile-frame')}
            title={deviceMode === 'mobile-frame' ? 'Switch to Full-Screen Web View' : 'Switch to Expo Mobile Frame'}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              {deviceMode === 'mobile-frame' ? 'laptop' : 'stay_current_portrait'}
            </span>
            <span>{deviceMode === 'mobile-frame' ? 'Wide Web' : 'Expo Mobile'}</span>
          </button>

          {/* Quick Wallet Link */}
          <button
            onClick={() => setCurrentTab('wallet')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
          >
            <span className="material-symbols-outlined text-sm text-emerald-600">account_balance_wallet</span>
            <span className="font-mono tabular-nums">${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </button>

          {/* User Profile Pill / Logout */}
          <div className="relative group">
            <button
              onClick={() => setCurrentTab('profile')}
              className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
