import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const WalletView: React.FC = () => {
  const {
    availableBalance,
    inEscrowBalance,
    lifetimeEarnings,
    transactions,
    triggerStripePayout,
    generateSignedUrlMock,
    currentUser,
  } = useApp();

  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState<number>(availableBalance);
  const [payoutDestination, setPayoutDestination] = useState<'debit' | 'bank'>('debit');
  const [isProcessing, setIsProcessing] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // Signed URL Vault Sandbox
  const [testFileName, setTestFileName] = useState('raw_deliverable_sponsor_4k.mp4');
  const [generatedSignedInfo, setGeneratedSignedInfo] = useState<{
    signedUrl: string;
    expiresAt: string;
    hash: string;
  } | null>(null);

  const handleOpenPayout = () => {
    setPayoutAmount(availableBalance);
    setIsPayoutModalOpen(true);
    setPayoutSuccess(false);
  };

  const handleExecutePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payoutAmount <= 0 || payoutAmount > availableBalance) return;

    setIsProcessing(true);
    const success = await triggerStripePayout(payoutAmount);
    setIsProcessing(false);

    if (success) {
      setPayoutSuccess(true);
      setTimeout(() => {
        setIsPayoutModalOpen(false);
        setPayoutSuccess(false);
      }, 1800);
    }
  };

  const handleGenerateSignedUrl = () => {
    const res = generateSignedUrlMock(testFileName);
    setGeneratedSignedInfo(res);
  };

  const expressFee = Math.round(payoutAmount * 0.015 * 100) / 100;
  const netReceived = (payoutAmount - expressFee).toFixed(2);

  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'CAD'>('USD');
  const [taxDownloaded, setTaxDownloaded] = useState(false);

  const rates: Record<'USD' | 'EUR' | 'GBP' | 'CAD', { rate: number; symbol: string }> = {
    USD: { rate: 1, symbol: '$' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.77, symbol: '£' },
    CAD: { rate: 1.36, symbol: 'CA$' },
  };

  const convert = (val: number) => {
    return (val * rates[currency].rate).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Balances Card */}
      <div className="bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#4F46E5] rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-pink-500/20 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-emerald-400 text-lg">shield</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
              Stripe Connect Vault
            </span>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10 text-[10px] font-mono">
            {(['USD', 'EUR', 'GBP', 'CAD'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-0.5 rounded-lg font-bold transition-colors ${
                  currency === curr
                    ? 'bg-white text-indigo-950 shadow-xs'
                    : 'text-indigo-200 hover:text-white'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1 relative z-10 mb-4">
          <span className="text-xs text-indigo-200 block">Available Balance (Cleared)</span>
          <div className="text-3xl font-bold font-mono tracking-tight tabular-nums flex items-baseline gap-1">
            <span>{rates[currency].symbol}</span>
            <span>{convert(availableBalance)}</span>
            <span className="text-xs text-indigo-300 font-sans font-normal ml-1">{currency}</span>
          </div>
        </div>

        {/* Secondary metrics */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-indigo-400/30 text-xs relative z-10 mb-4">
          <div>
            <span className="text-[10px] text-indigo-200 block">In Escrow (Secured Deals)</span>
            <span className="font-bold font-mono text-emerald-300 text-sm tabular-nums">
              {rates[currency].symbol}{convert(inEscrowBalance)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-indigo-200 block">Lifetime Settled</span>
            <span className="font-bold font-mono text-slate-100 text-sm tabular-nums">
              {rates[currency].symbol}{convert(lifetimeEarnings)}
            </span>
          </div>
        </div>

        {/* Instant Payout Action */}
        <div className="relative z-10">
          <button
            onClick={handleOpenPayout}
            disabled={availableBalance <= 0}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-indigo-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-[0.985] transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base text-indigo-600 font-bold">bolt</span>
            <span>Stripe Direct Express Payout (Instant)</span>
          </button>
        </div>
      </div>

      {/* Security & Signed URL Vault Tool */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">enhanced_encryption</span>
            <h3 className="font-bold text-slate-900 text-xs">Signed URL Mock Vault & Token Inspector</h3>
          </div>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
            256-Bit Cryptography
          </span>
        </div>

        <p className="text-[11px] text-slate-600 leading-relaxed">
          SponsorSync protects media drafts from unauthorized leaks using signed S3/Supabase storage tokens with strict time-to-live restrictions and SHA-256 integrity checks.
        </p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={testFileName}
            onChange={(e) => setTestFileName(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-indigo-600"
            placeholder="File name to generate signed token..."
          />
          <button
            onClick={handleGenerateSignedUrl}
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shrink-0"
          >
            Generate Token
          </button>
        </div>

        {generatedSignedInfo && (
          <div className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono space-y-1.5 animate-in fade-in">
            <div className="flex items-center justify-between text-indigo-300">
              <span>Signed URL Token (Valid: 60 mins)</span>
              <span className="text-emerald-400">STATUS: VERIFIED</span>
            </div>
            <div className="p-1.5 bg-black/50 rounded text-slate-300 break-all text-[9px]">
              {generatedSignedInfo.signedUrl}
            </div>
            <div className="text-[9px] text-slate-400 truncate">
              HMAC SHA-256 Digest: {generatedSignedInfo.hash}
            </div>
          </div>
        )}
      </div>

      {/* Tax & IRS 1099-NEC Compliance Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">receipt_long</span>
            <h3 className="font-bold text-slate-900 text-xs">Tax Compliance & 1099 Statements</h3>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
            W-9 / 1099-NEC On File
          </span>
        </div>

        <p className="text-[11px] text-slate-600 leading-relaxed">
          Stripe Connect automatically prepares your annual 1099-NEC statement for IRS reporting. Earnings thresholds and electronic delivery preferences are synchronized.
        </p>

        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block">2026 Gross Taxable Payouts</span>
            <span className="font-bold text-slate-900 font-mono text-sm">
              ${lifetimeEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
            </span>
          </div>

          <button
            onClick={() => {
              setTaxDownloaded(true);
              setTimeout(() => setTaxDownloaded(false), 2500);
            }}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-[11px] font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <span className="material-symbols-outlined text-sm text-indigo-600">
              {taxDownloaded ? 'check_circle' : 'download'}
            </span>
            <span>{taxDownloaded ? 'Statement Ready' : 'Download Tax Summary'}</span>
          </button>
        </div>
      </div>

      {/* Transaction History & Escrow Logs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-xs">Escrow & Settlement Ledger</h3>
          <span className="text-[11px] text-slate-400">Total: {transactions.length} records</span>
        </div>

        <div className="flex flex-col divide-y divide-slate-100">
          {transactions.map((tx) => (
            <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    tx.type === 'stripe_express_payout'
                      ? 'bg-rose-50 text-rose-600'
                      : tx.type === 'escrow_release'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-indigo-50 text-indigo-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {tx.type === 'stripe_express_payout'
                      ? 'arrow_outward'
                      : tx.type === 'escrow_release'
                      ? 'download_done'
                      : 'lock'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block truncate max-w-[200px]">
                    {tx.campaignTitle}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                    <span>{tx.date}</span>
                    <span>•</span>
                    <span className="truncate max-w-[120px]">{tx.stripeReference}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`font-mono font-bold block tabular-nums ${
                    tx.type === 'stripe_express_payout'
                      ? 'text-rose-600'
                      : tx.type === 'escrow_release'
                      ? 'text-emerald-600'
                      : 'text-slate-900'
                  }`}
                >
                  {tx.type === 'stripe_express_payout' ? '-' : '+'}${tx.amount.toFixed(2)}
                </span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider ${
                    tx.status === 'disbursed'
                      ? 'text-indigo-600'
                      : tx.status === 'cleared'
                      ? 'text-emerald-600'
                      : 'text-amber-600'
                  }`}
                >
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stripe Direct Express Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-xl font-bold">bolt</span>
                <h3 className="text-sm font-bold text-slate-900">Stripe Express Instant Payout</h3>
              </div>
              <button
                onClick={() => setIsPayoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {payoutSuccess ? (
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <span className="material-symbols-outlined text-2xl font-bold">check</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">Payout Initiated!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  ${payoutAmount.toFixed(2)} was sent to your debit card via Stripe Express Instant Transfer.
                </p>
              </div>
            ) : (
              <form onSubmit={handleExecutePayout} className="space-y-4 text-xs">
                {/* Available balance indicator */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">Available to transfer:</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">${availableBalance.toFixed(2)}</span>
                </div>

                {/* Amount input & Quick chips */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Transfer Amount ($ USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 font-mono font-bold">$</span>
                    <input
                      type="number"
                      max={availableBalance}
                      min={10}
                      step={10}
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-600 outline-none font-mono font-bold text-sm text-slate-900"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      type="button"
                      onClick={() => setPayoutAmount(Math.min(availableBalance, 500))}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold hover:bg-slate-200"
                    >
                      $500
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutAmount(Math.min(availableBalance, 1000))}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold hover:bg-slate-200"
                    >
                      $1,000
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutAmount(availableBalance)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-semibold hover:bg-indigo-100"
                    >
                      Full Balance (${availableBalance.toFixed(2)})
                    </button>
                  </div>
                </div>

                {/* Transfer Destination */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Transfer Destination
                  </label>
                  <div className="space-y-2">
                    <label
                      onClick={() => setPayoutDestination('debit')}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        payoutDestination === 'debit'
                          ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-indigo-600">credit_card</span>
                        <div>
                          <span className="font-semibold text-slate-900 block">Chase Visa Debit (••4892)</span>
                          <span className="text-[10px] text-emerald-600 font-medium">Instant Arrival (&lt; 30 minutes)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">1.5% fee</span>
                    </label>

                    <label
                      onClick={() => setPayoutDestination('bank')}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        payoutDestination === 'bank'
                          ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-slate-600">account_balance</span>
                        <div>
                          <span className="font-semibold text-slate-900 block">Chase Checking (••9104)</span>
                          <span className="text-[10px] text-slate-500 font-medium">Standard ACH (1-2 business days)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Free</span>
                    </label>
                  </div>
                </div>

                {/* Summary calculation */}
                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-[11px] border border-slate-200">
                  <div className="flex justify-between text-slate-600">
                    <span>Payout Amount</span>
                    <span className="font-mono">${payoutAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Express Fee (1.5%)</span>
                    <span className="font-mono text-rose-600">-${payoutDestination === 'debit' ? expressFee : '0.00'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200 text-xs">
                    <span>Net Received</span>
                    <span className="font-mono text-emerald-600">
                      ${payoutDestination === 'debit' ? netReceived : payoutAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsPayoutModalOpen(false)}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing || payoutAmount <= 0 || payoutAmount > availableBalance}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-base">bolt</span>
                        <span>Disburse Now</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
