import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SocialPlatform } from '../../types';

interface CampaignBuilderModalProps {
  onClose: () => void;
}

export const CampaignBuilderModal: React.FC<CampaignBuilderModalProps> = ({ onClose }) => {
  const { createCampaign } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(1500);
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(['tiktok', 'instagram']);
  const [deliverableType, setDeliverableType] = useState('60s Dedicated Reel + Story Hook');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [usageRights, setUsageRights] = useState<'30-Day Digital Paid' | 'Perpetual Organic' | 'Full Whitelist & Commercial'>('30-Day Digital Paid');
  const [deadline, setDeadline] = useState('Nov 24, 2026');
  const [category, setCategory] = useState('Tech & Gadgets');
  const [requirementsText, setRequirementsText] = useState('1. Highlight product ergonomics\n2. Show close-up high-resolution shots\n3. Include bio link & custom promo code');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFundedSuccess, setIsFundedSuccess] = useState(false);

  const togglePlatform = (p: SocialPlatform) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createCampaign({
        title,
        description,
        budget: Number(budget),
        escrowSecured: true,
        platforms: selectedPlatforms,
        deliverables: {
          platform: selectedPlatforms[0],
          type: deliverableType,
          aspectRatio,
          usageRights,
          durationSeconds: 60,
        },
        requirements: requirementsText.split('\n').filter((l) => l.trim().length > 0),
        deadline,
        status: 'active',
        category,
      });

      setIsSubmitting(false);
      setIsFundedSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1400);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-lg">campaign</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Post Campaign Brief & Escrow</h3>
              <p className="text-[11px] text-slate-500">Funded via 256-bit Stripe Vault</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {isFundedSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1">Brief Published & Escrow Held!</h4>
            <p className="text-xs text-slate-600 max-w-xs mb-3">
              Your brief is live in the creator discovery feed. ${budget.toLocaleString()} is locked in the verified escrow vault and ready for matching.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-4 text-xs">
            {/* Title & Category */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Campaign Brief Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lumina Titanium ANC Earbuds: 60s Tech Aesthetic Reel"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-slate-900 font-semibold text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Niche Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-slate-800 bg-white"
                >
                  <option value="Tech & Gadgets">Tech & Gadgets</option>
                  <option value="Productivity & Software">Productivity & Software</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Fashion & Everyday Carry">Fashion & Everyday Carry</option>
                  <option value="Gaming & Creator Gear">Gaming & Creator Gear</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Target Deadline
                </label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="e.g. Nov 24, 2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* Target Platforms */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Target Platforms
              </label>
              <div className="flex items-center gap-2">
                {(['tiktok', 'instagram', 'youtube'] as SocialPlatform[]).map((p) => {
                  const selected = selectedPlatforms.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePlatform(p)}
                      className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        selected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {selected && <span className="material-symbols-outlined text-sm font-bold">check</span>}
                      <span>{p}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deliverable Type & Aspect Ratio */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Deliverable Spec
                </label>
                <input
                  type="text"
                  value={deliverableType}
                  onChange={(e) => setDeliverableType(e.target.value)}
                  placeholder="e.g. 60s Reel / In-Feed Post"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-slate-800 bg-white"
                >
                  <option value="9:16">9:16 (Vertical Reel / TikTok)</option>
                  <option value="16:9">16:9 (Horizontal YouTube)</option>
                  <option value="1:1">1:1 (Square Carousel)</option>
                </select>
              </div>
            </div>

            {/* Usage Rights */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Usage Rights Granted
              </label>
              <select
                value={usageRights}
                onChange={(e) => setUsageRights(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-slate-800 bg-white font-medium"
              >
                <option value="30-Day Digital Paid">30-Day Digital Paid Advertising Rights</option>
                <option value="Perpetual Organic">Perpetual Organic Brand Channel Rights</option>
                <option value="Full Whitelist & Commercial">Full Whitelist, Paid Ad Sparks & Commercial Rights</option>
              </select>
            </div>

            {/* Campaign Objective & Brief description */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Creative Brief & Guidelines *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                required
                placeholder="What key story or message do you want the creator to convey? What makes your product distinctive?"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-slate-800 resize-none"
              />
            </div>

            {/* Requirements list */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Must-Have Checklist (1 per line)
              </label>
              <textarea
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-slate-800 resize-none font-mono text-[11px]"
              />
            </div>

            {/* Escrow Deposit Calculation */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block text-xs">Escrow Secured Budget</span>
                  <span className="text-[10px] text-slate-500">Locked in Stripe Escrow until you approve final cut</span>
                </div>
                <div className="relative w-32">
                  <span className="absolute left-2.5 top-2 text-slate-500 font-mono font-bold">$</span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    min={200}
                    step={100}
                    className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-indigo-300 focus:border-indigo-600 outline-none text-slate-900 font-mono font-bold text-sm bg-white text-right"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-indigo-200/60 flex items-center justify-between text-[11px] text-indigo-900">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-emerald-600">verified_user</span>
                  Platform Fee (3%): ${(budget * 0.03).toFixed(2)}
                </span>
                <span className="font-semibold">Creator Receives: ${(budget * 0.97).toFixed(2)}</span>
              </div>
            </div>

            {/* Submit Action */}
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
                disabled={isSubmitting || !title.trim()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-sm active:scale-[0.985] flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">lock</span>
                    <span>Fund & Post Brief</span>
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
