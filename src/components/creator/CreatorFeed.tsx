import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Campaign, SocialPlatform } from '../../types';
import { ProposalModal } from './ProposalModal';

export const CreatorFeed: React.FC = () => {
  const { campaigns, proposals, setCurrentTab, setActiveContractId, escrowContracts } = useApp();
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | 'all'>('all');
  const [escrowFilter500, setEscrowFilter500] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'feed' | 'my_pitches'>('feed');
  const [selectedCampaignForPitch, setSelectedCampaignForPitch] = useState<Campaign | null>(null);

  // Filtered campaigns
  const filteredCampaigns = campaigns.filter((camp) => {
    if (selectedPlatform !== 'all' && !camp.platforms.includes(selectedPlatform)) {
      return false;
    }
    if (escrowFilter500 && camp.budget < 500) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = camp.title.toLowerCase().includes(q);
      const matchBrand = camp.brandName.toLowerCase().includes(q);
      const matchCat = camp.category.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchCat) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Feed Sub-Header with Stats */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-2xl p-4 text-white shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
              Escrow Guaranteed Deals
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-700/80 text-[11px] font-mono text-indigo-100 border border-indigo-500/30">
            100% Payout Custody
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-indigo-700/60">
          <div>
            <span className="text-[10px] text-indigo-300 uppercase font-medium block">Total Escrow Pool</span>
            <span className="text-base font-bold font-mono text-emerald-300 tabular-nums">$6,250</span>
          </div>
          <div className="border-x border-indigo-700/60">
            <span className="text-[10px] text-indigo-300 uppercase font-medium block">Active Briefs</span>
            <span className="text-base font-bold font-mono text-white tabular-nums">{campaigns.length}</span>
          </div>
          <div>
            <span className="text-[10px] text-indigo-300 uppercase font-medium block">Avg Payout Time</span>
            <span className="text-base font-bold font-mono text-white">48 hrs</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs: Discover Briefs vs My Submitted Pitches */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'feed'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Explore Briefs ({filteredCampaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('my_pitches')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'my_pitches'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>My Pitches</span>
            <span className="px-1.5 py-0.2 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold">
              {proposals.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'feed' ? (
        <>
          {/* Filters Bar */}
          <div className="flex flex-col gap-2">
            {/* Search */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tech, audio, desk setups, wellness..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 outline-none text-xs text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              )}
            </div>

            {/* Platform & Escrow filter tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setSelectedPlatform('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  selectedPlatform === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                All Platforms
              </button>

              <button
                onClick={() => setSelectedPlatform('tiktok')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1 ${
                  selectedPlatform === 'tiktok'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>TikTok</span>
              </button>

              <button
                onClick={() => setSelectedPlatform('instagram')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1 ${
                  selectedPlatform === 'instagram'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>Instagram</span>
              </button>

              <button
                onClick={() => setSelectedPlatform('youtube')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1 ${
                  selectedPlatform === 'youtube'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>YouTube</span>
              </button>

              <button
                onClick={() => setEscrowFilter500(!escrowFilter500)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  escrowFilter500
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>$500+ Escrow Secured</span>
              </button>
            </div>
          </div>

          {/* Campaign List */}
          <div className="flex flex-col gap-3.5">
            {filteredCampaigns.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">find_in_page</span>
                <p className="text-sm font-semibold text-slate-700">No campaigns match your filters</p>
                <p className="text-xs text-slate-500 mt-1">Try resetting the platform filter or escrow threshold.</p>
              </div>
            ) : (
              filteredCampaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-indigo-300 transition-all shadow-xs flex flex-col gap-3"
                >
                  {/* Brand & Budget Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={camp.brandLogo}
                        alt={camp.brandName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 text-xs">{camp.brandName}</span>
                          <span className="material-symbols-outlined text-indigo-600 text-xs">verified</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{camp.category}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-emerald-700 font-bold font-mono text-base tabular-nums">
                        <span className="text-xs">$</span>
                        <span>{camp.budget.toLocaleString()}</span>
                      </div>
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 font-medium">
                        <span className="material-symbols-outlined text-[11px]">lock</span>
                        100% Escrow
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                      {camp.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {camp.description}
                    </p>
                  </div>

                  {/* Deliverables & Requirements Pill Bar */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1.5 text-[11px]">
                    <div className="flex items-center justify-between text-slate-700 font-medium">
                      <span className="flex items-center gap-1 text-indigo-700">
                        <span className="material-symbols-outlined text-sm">video_file</span>
                        {camp.deliverables.type}
                      </span>
                      <span className="text-slate-500">{camp.deliverables.usageRights}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-[10px] pt-1 border-t border-slate-200/60">
                      <span>Deadline: {camp.deadline}</span>
                      <span>•</span>
                      <span>{camp.applicantCount} creators pitched</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      {camp.platforms.map((p) => (
                        <span
                          key={p}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold uppercase text-[9px] tracking-wider"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedCampaignForPitch(camp)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs active:scale-[0.985] transition-all flex items-center gap-1.5"
                    >
                      <span>Pitch Campaign</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        /* Creator's Submitted Pitches Tab */
        <div className="flex flex-col gap-3">
          {proposals.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">post_add</span>
              <p className="text-sm font-semibold text-slate-700">You haven't submitted any pitches yet</p>
              <p className="text-xs text-slate-500 mt-1">Browse the campaign feed and submit your first pitch.</p>
            </div>
          ) : (
            proposals.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Target Campaign
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{prop.campaignTitle}</h4>
                    <span className="text-xs text-indigo-600 font-medium">{prop.brandName}</span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      prop.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : prop.status === 'pending'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {prop.status === 'accepted' ? 'Accepted & Escrowed' : 'Under Brand Review'}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 italic border border-slate-200/70">
                  "{prop.pitch}"
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400">Proposed Rate: </span>
                    <span className="font-bold text-slate-900 font-mono">${prop.proposedBudget}</span>
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
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <span>Open Escrow Workspace</span>
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      Pitch Submitted {prop.createdAt}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Proposal Modal */}
      {selectedCampaignForPitch && (
        <ProposalModal
          campaign={selectedCampaignForPitch}
          onClose={() => setSelectedCampaignForPitch(null)}
        />
      )}
    </div>
  );
};
