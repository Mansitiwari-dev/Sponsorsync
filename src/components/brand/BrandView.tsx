import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CampaignBuilderModal } from './CampaignBuilderModal';
import { Proposal } from '../../types';
import { AIMatchModal } from '../analytics/AIMatchModal';

export const BrandView: React.FC = () => {
  const { campaigns, proposals, acceptProposal, setActiveContractId, setCurrentTab, escrowContracts } = useApp();
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedProposalDetail, setSelectedProposalDetail] = useState<Proposal | null>(null);
  const [activeTab, setActiveTab] = useState<'applicants' | 'campaigns'>('applicants');

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Brand Dashboard Summary Banner */}
      <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Brand Campaign Console
            </span>
          </div>
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-sm font-bold">add</span>
            <span>New Brief</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Active Briefs</span>
            <span className="text-base font-bold font-mono text-white tabular-nums">{campaigns.length}</span>
          </div>
          <div className="border-x border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Pitches In Review</span>
            <span className="text-base font-bold font-mono text-pink-400 tabular-nums">
              {proposals.filter((p) => p.status === 'pending').length}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Escrow Protected</span>
            <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">
              ${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'applicants'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>Applicant Pitches</span>
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
              {proposals.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'campaigns'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Active Briefs ({campaigns.length})
          </button>
        </div>

        <button
          onClick={() => setIsBuilderOpen(true)}
          className="text-indigo-600 hover:text-indigo-700 text-xs font-semibold flex items-center gap-0.5"
        >
          <span className="material-symbols-outlined text-sm">post_add</span>
          <span>Post Brief</span>
        </button>
      </div>

      {/* Main View Area */}
      {activeTab === 'applicants' ? (
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Ranked by AI Match Score & Audience Synergy</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span> Verified Stats
            </span>
          </div>

          {proposals.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs flex flex-col gap-3"
            >
              {/* Creator Info & AI Match Score Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={prop.creatorAvatar}
                    alt={prop.creatorName}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">{prop.creatorName}</span>
                      <span className="material-symbols-outlined text-indigo-600 text-xs">verified</span>
                    </div>
                    <span className="text-xs text-slate-500">{prop.creatorHandle}</span>
                    <span className="text-[10px] block text-slate-400 font-medium">{prop.creatorNiche}</span>
                  </div>
                </div>

                {/* AI Match Score Badge (Clickable for full analytics) */}
                <div className="text-right">
                  <button
                    onClick={() => setSelectedProposalDetail(prop)}
                    title="Click for deep AI Match vector intelligence"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 shadow-2xs transition-transform active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm font-bold text-indigo-600">auto_awesome</span>
                    <span className="font-bold font-mono text-xs">{prop.aiMatchScore}% Match</span>
                  </button>
                  <span className="block text-[10px] text-slate-400 mt-0.5">High Affinity • Click AI</span>
                </div>
              </div>

              {/* Verified Social Stats Bar */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Audience</span>
                  <span className="text-xs font-bold font-mono text-slate-800">{prop.creatorFollowers}</span>
                </div>
                <div className="border-x border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Engagement</span>
                  <span className="text-xs font-bold font-mono text-emerald-600">{prop.creatorEngagement}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Turnaround</span>
                  <span className="text-xs font-bold font-mono text-slate-800">{prop.estimatedDeliveryDays} Days</span>
                </div>
              </div>

              {/* Pitch Preview */}
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                  Creative Pitch
                </span>
                <p className="text-xs text-slate-700 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                  "{prop.pitch}"
                </p>
              </div>

              {/* Rate Card Attachment link */}
              <div className="flex items-center justify-between text-[11px] text-slate-600 bg-indigo-50/40 px-3 py-1.5 rounded-lg border border-indigo-100">
                <span className="flex items-center gap-1 text-indigo-700 font-medium">
                  <span className="material-symbols-outlined text-base text-rose-500">picture_as_pdf</span>
                  {prop.rateCardName}
                </span>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Verified Media Kit & Rate Card for ${prop.creatorName}: 82% 18-34 Age demographic, $48 CPM.`);
                  }}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  View Deck
                </a>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block">Proposed Budget</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">${prop.proposedBudget.toLocaleString()}</span>
                </div>

                {prop.status === 'accepted' ? (
                  <button
                    onClick={() => {
                      const contract = escrowContracts.find((c) => c.campaignId === prop.campaignId);
                      if (contract) {
                        setActiveContractId(contract.id);
                      }
                      setCurrentTab('workspace');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>Open Escrow Workspace</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => acceptProposal(prop.id)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs active:scale-[0.985] transition-all flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">lock</span>
                      <span>Accept Pitch & Fund Escrow</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Active Briefs List */
        <div className="flex flex-col gap-3">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 block">
                    {camp.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{camp.title}</h4>
                  <span className="text-xs text-slate-500">Deadline: {camp.deadline}</span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-900 font-mono text-base">${camp.budget.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-600 block font-semibold">100% Escrow Deposited</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-700 font-medium">{camp.deliverables.type}</span>
                <span className="text-indigo-600 font-semibold">{camp.applicantCount} Creators Applied</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Campaign Builder Modal */}
      {isBuilderOpen && <CampaignBuilderModal onClose={() => setIsBuilderOpen(false)} />}

      {/* AI Match Detail Modal */}
      {selectedProposalDetail && (
        <AIMatchModal
          proposal={selectedProposalDetail}
          onClose={() => setSelectedProposalDetail(null)}
        />
      )}
    </div>
  );
};
