import React from 'react';

interface AntiBypassBannerProps {
  detectedKeyword?: string;
}

export const AntiBypassBanner: React.FC<AntiBypassBannerProps> = ({ detectedKeyword }) => {
  return (
    <div className="bg-rose-50 border-l-4 border-rose-500 p-3 rounded-r-xl shadow-xs text-xs animate-in fade-in duration-200 mb-2">
      <div className="flex items-start gap-2">
        <span className="material-symbols-outlined text-rose-600 text-lg shrink-0 mt-0.5">
          warning
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-1.5 font-bold text-rose-900">
            <span>Anti-Bypass Protection Triggered</span>
            {detectedKeyword && (
              <span className="px-1.5 py-0.2 bg-rose-200 text-rose-800 rounded font-mono text-[10px]">
                "{detectedKeyword}"
              </span>
            )}
          </div>
          <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">
            Taking communication or payments off SponsorSync voids 256-bit escrow protection, dispute resolution, and Stripe Express instant payouts. Keep all agreements in-app to safeguard your deal.
          </p>
        </div>
      </div>
    </div>
  );
};
