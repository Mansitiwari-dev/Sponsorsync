import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { EscrowStatus, ChatMessage } from '../../types';
import { MediaPreviewPlayer } from './MediaPreviewPlayer';
import { AntiBypassBanner } from './AntiBypassBanner';
import { SmartContractModal } from '../contract/SmartContractModal';

export const EscrowWorkspace: React.FC = () => {
  const {
    activeRole,
    currentUser,
    escrowContracts,
    activeContractId,
    setActiveContractId,
    chatMessages,
    sendChatMessage,
    requestRevisions,
    approveAndReleaseFunds,
    submitDraftMedia,
  } = useApp();

  const contract = escrowContracts.find((c) => c.id === activeContractId) || escrowContracts[0];
  const messages: ChatMessage[] = (contract && chatMessages[contract.id]) || [];

  const [inputText, setInputText] = useState('');
  const [bypassedWord, setBypassedWord] = useState<string | null>(null);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [isUploadDraftModalOpen, setIsUploadDraftModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [complianceChecks, setComplianceChecks] = useState<Record<string, boolean>>({
    ftc: true,
    raw4k: true,
    ancSound: true,
    promoCode: true,
  });
  const [draftTitle, setDraftTitle] = useState('Lumina_NovaPro_FinalCut_v3_4K.mp4');
  const [isReleasing, setIsReleasing] = useState(false);
  const [releaseSuccess, setReleaseSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Anti-bypass detection regex
  const BYPASS_KEYWORDS = ['paypal', 'cashapp', 'venmo', 'zelle', 'wire', 'telegram', 'whatsapp', 'pay off platform', 'outside of sponsorsync', 'bank transfer'];

  useEffect(() => {
    const lower = inputText.toLowerCase();
    const found = BYPASS_KEYWORDS.find((kw) => lower.includes(kw));
    setBypassedWord(found || null);
  }, [inputText]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !contract) return;
    sendChatMessage(contract.id, inputText);
    setInputText('');
  };

  const handleApprove = () => {
    if (!contract) return;
    setIsReleasing(true);
    setTimeout(() => {
      approveAndReleaseFunds(contract.id);
      setIsReleasing(false);
      setReleaseSuccess(true);
      setTimeout(() => setReleaseSuccess(false), 3000);
    }, 1000);
  };

  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionFeedback.trim() || !contract) return;
    requestRevisions(contract.id, revisionFeedback);
    setRevisionFeedback('');
    setIsRevisionModalOpen(false);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim() || !contract) return;
    submitDraftMedia(contract.id, draftTitle);
    setIsUploadDraftModalOpen(false);
  };

  if (!contract) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">lock_clock</span>
        <h3 className="text-sm font-bold text-slate-800">No Active Escrow Contracts</h3>
        <p className="text-xs text-slate-500 mt-1">Accept a proposal or create a campaign to initialize an escrow workspace.</p>
      </div>
    );
  }

  // 4-Step Escrow Status Bar Progress
  const steps: { key: EscrowStatus; label: string; sub: string }[] = [
    { key: 'funded', label: '1. Funded', sub: '100% in Vault' },
    { key: 'draft_submitted', label: '2. Draft Uploaded', sub: '4K Master Cut' },
    { key: 'under_review', label: '3. Under Review', sub: 'Quality Check' },
    { key: 'payout_released', label: '4. Payout Released', sub: 'Stripe Instant' },
  ];

  const getStepState = (stepKey: EscrowStatus) => {
    const order: EscrowStatus[] = ['funded', 'draft_submitted', 'under_review', 'payout_released'];
    const currentIdx = order.indexOf(contract.status);
    const thisIdx = order.indexOf(stepKey);

    if (thisIdx < currentIdx) return 'completed';
    if (thisIdx === currentIdx) return 'current';
    return 'upcoming';
  };

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Contract Switcher Bar (if multiple contracts exist) */}
      {escrowContracts.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Deals:
          </span>
          {escrowContracts.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveContractId(c.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                activeContractId === c.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span>{c.brandName}</span>
              <span className="font-mono text-[11px] opacity-90">${c.amount}</span>
            </button>
          ))}
        </div>
      )}

      {/* Contract Meta & Top Escrow Banner */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src={contract.brandLogo}
              alt={contract.brandName}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-xs">{contract.brandName}</span>
                <span className="material-symbols-outlined text-indigo-600 text-xs">verified</span>
              </div>
              <h2 className="text-xs font-semibold text-slate-700 leading-snug line-clamp-1">
                {contract.campaignTitle}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-slate-400">Escrow ID: {contract.id}</span>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => setIsContractModalOpen(true)}
                  className="text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">gavel</span>
                  <span>View Smart Agreement</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-base font-bold font-mono text-emerald-700 tabular-nums">
              ${contract.amount.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold block flex items-center justify-end gap-0.5">
              <span className="material-symbols-outlined text-xs">lock</span>
              Vault Secured
            </span>
          </div>
        </div>

        {/* 4-Step Escrow Status Bar */}
        <div className="pt-2 border-t border-slate-100">
          <div className="grid grid-cols-4 gap-1 relative">
            {steps.map((st) => {
              const state = getStepState(st.key);
              return (
                <div key={st.key} className="flex flex-col items-center text-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-all ${
                      state === 'completed'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : state === 'current'
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-200'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {state === 'completed' ? (
                      <span className="material-symbols-outlined text-xs font-bold">check</span>
                    ) : (
                      st.label.charAt(0)
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-bold leading-tight ${
                      state === 'current'
                        ? 'text-indigo-600'
                        : state === 'completed'
                        ? 'text-emerald-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {st.label}
                  </span>
                  <span className="text-[9px] text-slate-400 hidden sm:inline">{st.sub}</span>
                </div>
              );
            })}
          </div>

          {/* Progress Bar Line */}
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
              style={{
                width:
                  contract.status === 'funded'
                    ? '25%'
                    : contract.status === 'draft_submitted'
                    ? '50%'
                    : contract.status === 'under_review'
                    ? '75%'
                    : '100%',
              }}
            />
          </div>
        </div>
      </div>

      {/* Integrated Media Preview Player */}
      {contract.draftMedia ? (
        <MediaPreviewPlayer
          draft={contract.draftMedia}
          canUpload={activeRole === 'creator' && contract.status !== 'payout_released'}
          onUploadNewVersion={() => setIsUploadDraftModalOpen(true)}
        />
      ) : (
        <div className="bg-indigo-50/70 border border-dashed border-indigo-300 rounded-2xl p-6 text-center">
          <span className="material-symbols-outlined text-3xl text-indigo-500 mb-1">upload_file</span>
          <h4 className="text-xs font-bold text-slate-900">Deliverable Awaiting Production</h4>
          <p className="text-[11px] text-slate-600 max-w-xs mx-auto mt-0.5 mb-3">
            Escrow funds are 100% held. Creator can upload raw drafts for approval when ready.
          </p>
          {activeRole === 'creator' && (
            <button
              onClick={() => setIsUploadDraftModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs"
            >
              Upload First Cut Draft
            </button>
          )}
        </div>
      )}

      {/* Decision Matrix Action Bar (Brand vs Creator) */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800">Escrow Milestone Controls</span>
          <span className="text-[11px] text-slate-500">
            Net Payout: <strong className="font-mono text-emerald-600">${contract.netPayout.toFixed(2)}</strong>
          </span>
        </div>

        {contract.status === 'payout_released' ? (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800">
            <div className="flex items-center justify-center gap-1.5 font-bold text-xs mb-0.5">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Funds Disbursed to Creator</span>
            </div>
            <p className="text-[11px] text-emerald-700">
              Stripe Transfer Ref: <code className="font-mono text-[10px]">{contract.stripeTransferId}</code>
            </p>
          </div>
        ) : activeRole === 'brand' ? (
          /* Brand Review Controls */
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => setIsRevisionModalOpen(true)}
              className="py-2.5 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm text-amber-600">rate_review</span>
              <span>Request Revisions</span>
            </button>

            <button
              onClick={handleApprove}
              disabled={isReleasing}
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.985] disabled:opacity-50"
            >
              {isReleasing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
                  <span>Approve & Release Funds</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Creator Controls */
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[11px] text-slate-500">
              {contract.status === 'under_review'
                ? 'Brand is currently reviewing your draft.'
                : 'Upload your deliverables to trigger brand approval.'}
            </span>
            <button
              onClick={() => setIsUploadDraftModalOpen(true)}
              className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-all flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">upload</span>
              <span>Upload New Cut</span>
            </button>
          </div>
        )}

        {/* Deliverable & FTC Compliance Checklist */}
        <div className="mt-2 p-3 bg-slate-50/90 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
              <span className="material-symbols-outlined text-sm text-indigo-600">fact_check</span>
              <span>Deliverable & FTC Compliance Checklist</span>
            </div>
            <span className="text-[10px] text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
              {Object.values(complianceChecks).filter(Boolean).length}/4 Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
            <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors">
              <input
                type="checkbox"
                checked={complianceChecks.ftc}
                onChange={(e) => setComplianceChecks((prev) => ({ ...prev, ftc: e.target.checked }))}
                className="w-3.5 h-3.5 accent-indigo-600 rounded"
              />
              <span className="text-slate-700 font-medium">Clear FTC #ad / #sponsored tag</span>
            </label>

            <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors">
              <input
                type="checkbox"
                checked={complianceChecks.raw4k}
                onChange={(e) => setComplianceChecks((prev) => ({ ...prev, raw4k: e.target.checked }))}
                className="w-3.5 h-3.5 accent-indigo-600 rounded"
              />
              <span className="text-slate-700 font-medium">Raw 4K 60fps export uploaded</span>
            </label>

            <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors">
              <input
                type="checkbox"
                checked={complianceChecks.ancSound}
                onChange={(e) => setComplianceChecks((prev) => ({ ...prev, ancSound: e.target.checked }))}
                className="w-3.5 h-3.5 accent-indigo-600 rounded"
              />
              <span className="text-slate-700 font-medium">Binaural ANC sound transition hook</span>
            </label>

            <label className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:border-indigo-300 transition-colors">
              <input
                type="checkbox"
                checked={complianceChecks.promoCode}
                onChange={(e) => setComplianceChecks((prev) => ({ ...prev, promoCode: e.target.checked }))}
                className="w-3.5 h-3.5 accent-indigo-600 rounded"
              />
              <span className="text-slate-700 font-medium">Promo code #LUMINA20 in bio</span>
            </label>
          </div>
        </div>
      </div>

      {/* Direct Messaging Area */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col h-[400px]">
        {/* Chat Header */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-bold text-xs text-slate-900">
              Direct Negotiation Thread • {contract.brandName}
            </span>
          </div>
          <span className="text-[10px] text-indigo-600 font-semibold">256-Bit Encrypted</span>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#FAF8FF]">
          {messages.map((msg) => {
            if (msg.isSystemEvent) {
              return (
                <div
                  key={msg.id}
                  className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-[11px] text-center my-1 font-medium"
                >
                  {msg.text}
                </div>
              );
            }

            const isMe = msg.senderRole === activeRole;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1 mb-0.5 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-600">{msg.senderName}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input & Anti-Bypass Scanner */}
        <div className="p-3 bg-white border-t border-slate-200">
          {/* Anti-Bypass Alert if triggered */}
          {bypassedWord && <AntiBypassBanner detectedKeyword={bypassedWord} />}

          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeRole === 'creator' ? contract.brandName : contract.creatorName}...`}
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 outline-none text-xs text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-all disabled:opacity-40 shrink-0 shadow-xs"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Revision Request Modal */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Request Draft Revisions</h3>
              <button
                onClick={() => setIsRevisionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Provide constructive, timestamped notes (e.g. audio levels, CTA text overlay, color grading) for the creator.
            </p>
            <form onSubmit={handleRevisionSubmit} className="space-y-3">
              <textarea
                value={revisionFeedback}
                onChange={(e) => setRevisionFeedback(e.target.value)}
                rows={3}
                required
                placeholder="e.g. Please lower background music at 0:20 so the unboxing voiceover is crisper, and make sure promo code #LUMINA20 stays on screen for 4s."
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none text-xs text-slate-800 resize-none"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRevisionModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs"
                >
                  Send Revision Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Draft Modal */}
      {isUploadDraftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Upload New Video Cut</h3>
              <button
                onClick={() => setIsUploadDraftModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Deliverable Cut Title
                </label>
                <input
                  type="text"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none font-medium"
                />
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 text-center">
                <span className="material-symbols-outlined text-3xl text-indigo-600 mb-1">cloud_upload</span>
                <span className="block font-semibold text-slate-800 text-xs">Raw 4K / 1080p Export Selected</span>
                <span className="text-[10px] text-slate-400">Simulating S3/Supabase 256-bit signed upload</span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadDraftModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  Publish Cut to Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Smart Contract & Legal Terms Modal */}
      {isContractModalOpen && (
        <SmartContractModal
          contract={contract}
          onClose={() => setIsContractModalOpen(false)}
        />
      )}
    </div>
  );
};
