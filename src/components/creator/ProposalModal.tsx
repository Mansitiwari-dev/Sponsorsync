import React, { useState } from 'react';
import { Campaign } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProposalModalProps {
  campaign: Campaign;
  onClose: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ campaign, onClose }) => {
  const { submitProposal, currentUser } = useApp();
  const [pitch, setPitch] = useState('');
  const [proposedBudget, setProposedBudget] = useState(campaign.budget);
  const [deliveryDays, setDeliveryDays] = useState(4);
  const [rateCardFile, setRateCardFile] = useState('Elena_Vance_Media_RateCard_2026.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitch.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitProposal({
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        brandName: campaign.brandName,
        pitch,
        proposedBudget: Number(proposedBudget),
        estimatedDeliveryDays: Number(deliveryDays),
        rateCardName: rateCardFile,
        rateCardUrl: 'https://cdn.sponsorsync.io/rates/creator_sample_kit.pdf',
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined text-lg">rate_review</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Submit Sponsorship Pitch</h3>
              <p className="text-[11px] text-slate-500 truncate max-w-[240px]">{campaign.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1">Proposal Submitted!</h4>
            <p className="text-xs text-slate-600 max-w-xs mb-3">
              Your pitch and rate card were delivered to {campaign.brandName}. If accepted, the ${proposedBudget.toLocaleString()} escrow will be locked immediately!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-4 text-xs">
            {/* Escrow Guarantee Pill */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-900">
              <span className="material-symbols-outlined text-emerald-600 text-lg">lock</span>
              <div className="text-[11px]">
                <span className="font-semibold block">Escrow Protection Guaranteed</span>
                <span>The brand must fund 100% of the agreed amount before you begin production.</span>
              </div>
            </div>

            {/* Campaign Summary */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block">Deliverables Required</span>
                <span className="font-semibold text-slate-800">{campaign.deliverables.type}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">Brand Budget</span>
                <span className="font-bold text-indigo-600 font-mono text-sm">${campaign.budget.toLocaleString()}</span>
              </div>
            </div>

            {/* Custom Pitch */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Your Custom Pitch & Creative Concept *
              </label>
              <textarea
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                rows={3}
                required
                placeholder="Describe your video angle, opening hook, camera setup, and how you will highlight the product organically..."
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 outline-none text-slate-800 resize-none"
              />
            </div>

            {/* Proposed Rate & Delivery Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Proposed Rate ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-mono">$</span>
                  <input
                    type="number"
                    value={proposedBudget}
                    onChange={(e) => setProposedBudget(Number(e.target.value))}
                    min={100}
                    step={50}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-slate-900 font-mono font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Turnaround Time
                </label>
                <select
                  value={deliveryDays}
                  onChange={(e) => setDeliveryDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-slate-800 bg-white"
                >
                  <option value={2}>2 Days (Rush)</option>
                  <option value={4}>4 Days (Standard)</option>
                  <option value={7}>7 Days (Extended)</option>
                  <option value={10}>10 Days</option>
                </select>
              </div>
            </div>

            {/* Media Rate Card Attachment */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Media Kit / Rate Card Attachment
              </label>
              <div className="p-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-rose-500">picture_as_pdf</span>
                  <div>
                    <span className="font-medium text-slate-800 block truncate max-w-[200px]">
                      {rateCardFile}
                    </span>
                    <span className="text-[10px] text-slate-400">Verified Rate Card (1.8 MB)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRateCardFile(rateCardFile === 'Elena_Vance_Media_RateCard_2026.pdf' ? 'Custom_Q4_RateDeck_Updated.pdf' : 'Elena_Vance_Media_RateCard_2026.pdf')}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !pitch.trim()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-sm active:scale-[0.985] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit Pitch</span>
                    <span className="material-symbols-outlined text-base">send</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
