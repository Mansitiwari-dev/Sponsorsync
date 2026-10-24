import React, { useState } from 'react';
import { EscrowContract } from '../../types';

interface SmartContractModalProps {
  contract: EscrowContract;
  onClose: () => void;
}

export const SmartContractModal: React.FC<SmartContractModalProps> = ({ contract, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const contractHash = `0x${contract.id}_sha256_7a9f82d1c4b03e84617a29e5d`;

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(contractHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 border border-white/20">
              <span className="material-symbols-outlined text-lg">gavel</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">Smart Escrow Agreement</h3>
                <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/40">
                  Legally Binding
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">Contract Ref: {contract.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Contract Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-700 font-sans">
          {/* Parties Box */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Brand / Publisher
              </span>
              <strong className="text-slate-900 text-xs block">{contract.brandName}</strong>
              <span className="text-[11px] text-slate-500">Lumina Audio Inc. (Delaware Corp)</span>
            </div>
            <div className="border-l border-slate-200 pl-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Content Creator
              </span>
              <strong className="text-slate-900 text-xs block">{contract.creatorName}</strong>
              <span className="text-[11px] text-slate-500">Vance Creative Studio LLC</span>
            </div>
          </div>

          {/* Section 1: Escrow & Consideration */}
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span className="text-indigo-600 font-mono">1.</span> Escrow Consideration & Payout Terms
            </h4>
            <p className="text-slate-600 text-[11px]">
              Brand has deposited <strong>${contract.amount.toLocaleString()}.00 USD</strong> into the SponsorSync 256-Bit Escrow Vault. Funds are held in irrevocable custody and cannot be unilaterally withdrawn while production is active. Net creator compensation of <strong>${contract.netPayout.toLocaleString()}.00 USD</strong> (less 3% platform servicing) will be disbursed immediately via Stripe Direct Express upon final deliverable acceptance.
            </p>
          </div>

          {/* Section 2: Deliverable Specifications */}
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span className="text-indigo-600 font-mono">2.</span> Deliverable Specifications & Formats
            </h4>
            <p className="text-slate-600 text-[11px]">
              Creator agrees to produce 1x high-definition (minimum 4K 60fps) vertical (9:16) video reel showcasing the specified brand product, integrating natural lifestyle audio and the required promotional call-to-action (#LUMINA20).
            </p>
          </div>

          {/* Section 3: Usage Rights & Exclusivity */}
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span className="text-indigo-600 font-mono">3.</span> Usage Rights & Whitelist License
            </h4>
            <p className="text-slate-600 text-[11px]">
              Creator grants Brand a non-exclusive, worldwide, 30-day paid advertising digital whitelist license, plus perpetual organic usage rights for brand social archives. Creator maintains original copyright ownership of master raw footage.
            </p>
          </div>

          {/* Section 4: FTC Compliance */}
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span className="text-indigo-600 font-mono">4.</span> FTC & Regulatory Disclosure Compliance
            </h4>
            <p className="text-slate-600 text-[11px]">
              Both parties agree to adhere strictly to FTC Endorsement Guides. Creator must display an unambiguous disclosure (e.g. <code>#ad</code>, <code>#sponsored</code>, or platform branded content tool) visible above the "more" fold in captions.
            </p>
          </div>

          {/* Section 5: Revisions & Automated Release */}
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <span className="text-indigo-600 font-mono">5.</span> Revisions & Automated Settlement
            </h4>
            <p className="text-slate-600 text-[11px]">
              Agreement includes up to two (2) rounds of reasonable constructive edits. Brand has a 7-day review window upon draft delivery; failure to request revisions within 7 days triggers automated escrow release in favor of Creator.
            </p>
          </div>

          {/* Cryptographic E-Signatures Block */}
          <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-mono">CRYPTOGRAPHIC E-SIGNATURE BLOCK</span>
              <span className="text-emerald-400 font-bold">MUTUALLY COUNTERSIGNED</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[10px] font-mono">
              <div>
                <span className="text-slate-400 block">Brand Signer:</span>
                <span className="text-indigo-300 font-bold">Marcus Sterling [Lumina]</span>
                <span className="text-slate-500 block truncate">IP: 198.51.100.42 • Oct 21, 2026</span>
              </div>
              <div>
                <span className="text-slate-400 block">Creator Signer:</span>
                <span className="text-pink-300 font-bold">Elena Vance [Creator]</span>
                <span className="text-slate-500 block truncate">IP: 203.0.113.19 • Oct 21, 2026</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-[9px] text-slate-400 font-mono">
              <span className="truncate max-w-[320px]">HASH: {contractHash}</span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="text-indigo-300 hover:text-white underline ml-2 shrink-0"
              >
                {copied ? 'Copied' : 'Copy Hash'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
          {downloadSuccess ? (
            <span className="text-emerald-600 font-semibold text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Agreement Exported (PDF Receipt Ready)
            </span>
          ) : (
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Download Signed Copy</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            Close Agreement
          </button>
        </div>
      </div>
    </div>
  );
};
