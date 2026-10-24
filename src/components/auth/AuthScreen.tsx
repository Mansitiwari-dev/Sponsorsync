import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const AuthScreen: React.FC = () => {
  const { login } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('creator');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProvider, setAuthProvider] = useState<string | null>(null);

  const handleAuth = (provider: string) => {
    setAuthProvider(provider);
    setIsAuthenticating(true);
    setTimeout(() => {
      login(selectedRole);
      setIsAuthenticating(false);
      setAuthProvider(null);
    }, 600);
  };

  return (
    <div className="min-h-full flex flex-col justify-between px-4 py-6 max-w-md mx-auto">
      {/* Brand Showcase & Header */}
      <div className="flex flex-col items-center text-center mt-2 mb-6">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-md mb-4 p-2 border border-slate-100">
          <img
            alt="SponsorSync Logo"
            className="w-16 h-16 object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VubaQBwwDmGenZnE96jDF1dMPPspaZEiobsNGMz-gv7x_r1l82nyYx4sDgt_2xxFOPIgFzto9bC5UsglABvXG92bEvEq2uiDFMyE4rcwvgwr14SjEq3Fn8gG8Cx0M8Dqc0kH0pT_NyA9IpNq7OEa6REmLXYAFRLZelzhv8qsC3koBcT1ZvKFRCsSYadHr0nNLRsm_dIU2Vqj_HVQLMz91_hnO7F967pPKpxDXEuuEUEE9HsUqIAGIkSRQ"
          />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-600"></span>
          </span>
        </div>

        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight mb-1.5 font-sans">
          SponsorSync
        </h1>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2DFFF] mb-2 border border-[#C3C0FF]/40">
          <span className="material-symbols-outlined text-indigo-700 text-sm">auto_awesome</span>
          <p className="text-xs text-indigo-700 font-bold tracking-wide">
            Connect. Collab. Get Paid.
          </p>
        </div>

        <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
          The escrow-backed marketplace uniting creators & leading brands.
        </p>
      </div>

      {/* Role Selection Group */}
      <div className="flex flex-col gap-3 mb-6">
        <p className="text-[11px] uppercase tracking-wider text-slate-500 ml-1 font-bold">
          Choose Your Workspace
        </p>

        {/* Option 1: Creator */}
        <div
          onClick={() => setSelectedRole('creator')}
          role="button"
          tabIndex={0}
          aria-pressed={selectedRole === 'creator'}
          className={`group relative flex items-start gap-3.5 p-4 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.985] border ${
            selectedRole === 'creator'
              ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div
            className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
              selectedRole === 'creator'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <span className="material-symbols-outlined text-xl">videocam</span>
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[15px] text-slate-900 font-semibold">I am a Content Creator</span>
              <span className="material-symbols-outlined text-pink-600 text-sm">stars</span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              Discover paid sponsorships, pitch brands & get guaranteed escrow payouts.
            </p>
          </div>

          <div className="absolute top-4 right-4 flex items-center justify-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                selectedRole === 'creator'
                  ? 'bg-indigo-600'
                  : 'bg-slate-200 border border-slate-300'
              }`}
            >
              {selectedRole === 'creator' && (
                <span className="material-symbols-outlined text-white text-xs font-bold">check</span>
              )}
            </div>
          </div>
        </div>

        {/* Option 2: Brand / Publisher */}
        <div
          onClick={() => setSelectedRole('brand')}
          role="button"
          tabIndex={0}
          aria-pressed={selectedRole === 'brand'}
          className={`group relative flex items-start gap-3.5 p-4 rounded-2xl cursor-pointer transition-all duration-200 active:scale-[0.985] border ${
            selectedRole === 'brand'
              ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
          }`}
        >
          <div
            className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
              selectedRole === 'brand'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <span className="material-symbols-outlined text-xl">rocket_launch</span>
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[15px] text-slate-900 font-semibold">I am a Brand / Publisher</span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              Post campaign briefs, review creator pitches & secure deals risk-free.
            </p>
          </div>

          <div className="absolute top-4 right-4 flex items-center justify-center">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                selectedRole === 'brand'
                  ? 'bg-indigo-600'
                  : 'bg-slate-200 border border-slate-300'
              }`}
            >
              {selectedRole === 'brand' && (
                <span className="material-symbols-outlined text-white text-xs font-bold">check</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Social Authentication Methods */}
      <div className="flex flex-col gap-2.5 mb-6">
        {/* Instagram / Meta Continue */}
        <button
          onClick={() => handleAuth('instagram')}
          disabled={isAuthenticating}
          className="w-full h-12 py-3 px-4 rounded-xl bg-[#DA2676] hover:bg-[#C21865] text-white flex items-center justify-center gap-3 shadow-sm active:scale-[0.985] transition-all font-medium text-sm disabled:opacity-75"
          type="button"
        >
          {isAuthenticating && authProvider === 'instagram' ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          )}
          <span>Continue with Instagram / Meta</span>
        </button>

        {/* TikTok Continue */}
        <button
          onClick={() => handleAuth('tiktok')}
          disabled={isAuthenticating}
          className="w-full h-12 py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white flex items-center justify-center gap-3 shadow-sm active:scale-[0.985] transition-all font-medium text-sm disabled:opacity-75"
          type="button"
        >
          {isAuthenticating && authProvider === 'tiktok' ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.86-4.49V8.58a8.28 8.28 0 0 0 4.84 1.56V6.69h-.93z" />
            </svg>
          )}
          <span>Continue with TikTok</span>
        </button>

        {/* Dual Row: Google & Apple */}
        <div className="grid grid-cols-2 gap-2.5 mt-0.5">
          <button
            onClick={() => handleAuth('google')}
            disabled={isAuthenticating}
            className="h-11 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm flex items-center justify-center gap-2 active:scale-[0.985] transition-all text-xs font-semibold text-slate-800"
            type="button"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Google</span>
          </button>

          <button
            onClick={() => handleAuth('apple')}
            disabled={isAuthenticating}
            className="h-11 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm flex items-center justify-center gap-2 active:scale-[0.985] transition-all text-xs font-semibold text-slate-800"
            type="button"
          >
            <svg className="w-4 h-4 fill-current text-slate-900 shrink-0" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.87-.9.04-2 .6-2.65 1.35-.58.65-1.09 1.71-1.02 2.76 1.01.08 2.05-.49 2.66-1.24z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>
      </div>

      {/* Security Verification Trust Badge */}
      <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#85F8C4]/60 text-[#002114] self-center mb-4 border border-[#005338]/10 shadow-xs">
        <span className="material-symbols-outlined text-sm font-semibold">lock</span>
        <span className="text-[10px] uppercase font-bold tracking-wider">
          256-Bit Encrypted • Stripe Connect Verified Partner
        </span>
      </div>

      {/* Terms & Policy Footer */}
      <div className="text-center px-4">
        <p className="text-xs text-slate-500">
          By continuing, you agree to SponsorSync{' '}
          <a href="#terms" className="text-indigo-600 font-semibold underline underline-offset-2">
            Terms of Service
          </a>{' '}
          &{' '}
          <a href="#privacy" className="text-indigo-600 font-semibold underline underline-offset-2">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
