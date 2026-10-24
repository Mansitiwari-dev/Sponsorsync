import React from 'react';
import { Proposal } from '../../types';

interface AIMatchModalProps {
  proposal: Proposal;
  onClose: () => void;
}

export const AIMatchModal: React.FC<AIMatchModalProps> = ({ proposal, onClose }) => {
  const { aiMatchScore, aiMatchBreakdown } = proposal;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-pink-300 border border-white/20">
              <span className="material-symbols-outlined text-lg">auto_awesome</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">AI Match Intelligence</h3>
                <span className="px-2 py-0.2 rounded-full bg-pink-500/30 text-pink-200 text-[10px] font-bold border border-pink-400/40">
                  {aiMatchScore}% Score
                </span>
              </div>
              <p className="text-[11px] text-indigo-200">Deep audience affinity & ROI forecast</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Creator Profile Header Bar */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={proposal.creatorAvatar}
                alt={proposal.creatorName}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
              />
              <div>
                <span className="font-bold text-slate-900 text-xs block">{proposal.creatorName}</span>
                <span className="text-[11px] text-slate-500">{proposal.creatorHandle} • {proposal.creatorNiche}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-emerald-600 font-bold font-mono text-xs">{proposal.creatorEngagement}</span>
              <span className="text-[10px] text-slate-400 block font-medium">Avg Engagement</span>
            </div>
          </div>

          {/* Core Match Synergy Breakdown */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Match Vector Analysis
            </span>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Niche & Category Alignment</span>
                  <span className="font-mono text-indigo-600">{aiMatchBreakdown.nicheAlignment}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${aiMatchBreakdown.nicheAlignment}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Audience Synergy & Purchasing Intent</span>
                  <span className="font-mono text-indigo-600">{aiMatchBreakdown.audienceSynergy}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-pink-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${aiMatchBreakdown.audienceSynergy}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Budget & Deliverable Scope Fit</span>
                  <span className="font-mono text-indigo-600">{aiMatchBreakdown.budgetFit}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${aiMatchBreakdown.budgetFit}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Historical Delivery Reliability</span>
                  <span className="font-mono text-indigo-600">{aiMatchBreakdown.historicalReliability}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${aiMatchBreakdown.historicalReliability}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Demographic & Performance Forecast Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Audience Core
              </span>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-600">Top Geo:</span>
                  <strong className="text-slate-900">74% US / UK</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Age Split:</span>
                  <strong className="text-slate-900">83% 18–34 yrs</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Brand Safety:</span>
                  <strong className="text-emerald-600">100% Verified</strong>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                ROI Forecast
              </span>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-600">Est. Reach:</span>
                  <strong className="text-indigo-950 font-mono">140K–210K</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Est. CPV:</span>
                  <strong className="text-emerald-700 font-mono">$0.009</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Conversion:</span>
                  <strong className="text-indigo-950 font-semibold">High Intent</strong>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendation Summary */}
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900">
              <span className="material-symbols-outlined text-sm text-emerald-600 font-bold">verified</span>
              <span>AI Recommendation: Strong Hire</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Elena's content velocity matches Lumina's aesthetic requirements with over 98% audience overlap. Historical turnaround average is 3.8 days with 0 escrow disputes recorded across 28 completed deals.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            Close Intelligence
          </button>
        </div>
      </div>
    </div>
  );
};
