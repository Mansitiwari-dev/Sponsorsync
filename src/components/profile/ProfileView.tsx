import React from 'react';
import { useApp } from '../../context/AppContext';

export const ProfileView: React.FC = () => {
  const { currentUser, activeRole, switchRole, logout } = useApp();

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col items-center text-center">
        <div className="relative mb-3">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-600/20 shadow-md"
          />
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
            <span className="material-symbols-outlined text-xs font-bold">check</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 justify-center mb-0.5">
          <h2 className="text-base font-bold text-slate-900">{currentUser.name}</h2>
          <span className="material-symbols-outlined text-indigo-600 text-sm">verified</span>
        </div>

        <span className="text-xs text-indigo-600 font-semibold mb-2">
          {activeRole === 'creator' ? currentUser.creatorNiche : currentUser.companyCategory}
        </span>

        <p className="text-xs text-slate-600 max-w-sm leading-relaxed mb-4">
          {currentUser.bio}
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 w-full pt-3 border-t border-slate-100 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Rating</span>
            <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-800">
              <span className="material-symbols-outlined text-amber-500 text-sm">star</span>
              <span>{currentUser.rating}</span>
            </div>
          </div>
          <div className="border-x border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Deals Done</span>
            <span className="text-xs font-bold font-mono text-slate-800">{currentUser.completedDeals}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">
              {activeRole === 'creator' ? 'Earned' : 'Invested'}
            </span>
            <span className="text-xs font-bold font-mono text-emerald-600">
              ${(currentUser.totalEarnedOrSpent / 1000).toFixed(1)}k
            </span>
          </div>
        </div>
      </div>

      {/* Connected Social Accounts */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Verified Social Channels
          </h3>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-xs">sync</span>
            Live API Synced
          </span>
        </div>

        <div className="space-y-2">
          {currentUser.socials.map((soc) => (
            <div
              key={soc.platform}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-xs ${
                    soc.platform === 'tiktok'
                      ? 'bg-black'
                      : soc.platform === 'instagram'
                      ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'
                      : 'bg-red-600'
                  }`}
                >
                  {soc.platform === 'tiktok' ? 'TT' : soc.platform === 'instagram' ? 'IG' : 'YT'}
                </span>
                <div>
                  <span className="font-semibold text-slate-900 block">{soc.handle}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {soc.followers} followers • {soc.engagementRate} eng.
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Verified
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Stripe Status */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Compliance & Payout Security
        </h3>

        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-emerald-600 text-xl">account_balance</span>
            <div>
              <span className="font-semibold text-emerald-950 block">Stripe Connect Custom Verified</span>
              <span className="text-[10px] text-emerald-700 font-mono">ID: {currentUser.stripeAccountId}</span>
            </div>
          </div>
          <span className="text-emerald-700 font-bold text-[10px]">Active</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-indigo-600 text-xl">lock_clock</span>
            <div>
              <span className="font-semibold text-slate-900 block">256-Bit Escrow Vault Protocol</span>
              <span className="text-[10px] text-slate-500">Automated multi-sig contract release</span>
            </div>
          </div>
          <span className="text-indigo-600 font-bold text-[10px]">Enabled</span>
        </div>
      </div>

      {/* Role Switcher & Sign Out */}
      <div className="space-y-2">
        <button
          onClick={() => switchRole(activeRole === 'creator' ? 'brand' : 'creator')}
          className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-base">swap_horiz</span>
          <span>Switch to {activeRole === 'creator' ? 'Brand Manager Workspace' : 'Creator Workspace'}</span>
        </button>

        <button
          onClick={logout}
          className="w-full py-3 px-4 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          <span>Return to Onboarding Screen</span>
        </button>
      </div>
    </div>
  );
};
