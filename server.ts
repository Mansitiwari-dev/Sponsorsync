import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import crypto from 'crypto';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory Supabase/Postgres simulation store
let campaignsStore = [
  {
    id: 'camp_01',
    brandId: 'usr_brand_01',
    brandName: 'Lumina Acoustics',
    brandLogo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=160&q=80',
    title: 'Lumina Nova Pro Earbuds: 60s TikTok Aesthetic Showcase',
    description: 'We are seeking creative tech/lifestyle creators to showcase the active noise cancellation and minimalist titanium design of our flagship Lumina Nova Pro earbuds during a fast-paced work/travel routine.',
    budget: 1400,
    escrowSecured: true,
    platforms: ['tiktok', 'instagram'],
    deliverables: {
      platform: 'tiktok',
      type: '60s Dedicated In-Feed Reel + Sound Hook',
      durationSeconds: 60,
      aspectRatio: '9:16',
      usageRights: '30-Day Digital Paid',
    },
    requirements: [
      'Show close-up macro of magnetic latch opening',
      'Demonstrate instantaneous ANC transition in loud coffee shop or subway',
      'Include clear CTA link in bio and promo code #LUMINA20',
      'Submit raw 4K 60fps export prior to public posting',
    ],
    deadline: 'Nov 12, 2026',
    status: 'active',
    applicantCount: 7,
    createdAt: '2 days ago',
    category: 'Tech & Gadgets',
  },
  {
    id: 'camp_02',
    brandId: 'brand_aura_app',
    brandName: 'Aura Flow Workspace',
    brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80',
    title: 'Aura 3.0 Launch: Desk Setup & AI Workflow Integration',
    description: 'Produce a high-retention desk setup aesthetic reel highlighting Aura 3.0 real-time markdown docs and visual canvas. Looking for clean mechanical keyboard and ambient lighting vibes.',
    budget: 2200,
    escrowSecured: true,
    platforms: ['youtube', 'instagram'],
    deliverables: {
      platform: 'youtube',
      type: '90s Integrated Sponsor Segment in Longform Desk Video',
      durationSeconds: 90,
      aspectRatio: '16:9',
      usageRights: 'Perpetual Organic',
    },
    requirements: [
      'Screen capture of AI auto-structuring project tasks',
      'On-camera authentic endorsement from creator',
      'Trackable affiliate link placement in video description',
    ],
    deadline: 'Nov 18, 2026',
    status: 'active',
    applicantCount: 12,
    createdAt: '3 days ago',
    category: 'Productivity & Software',
  },
];

let escrowContractsStore = [
  {
    id: 'escrow_lumina_01',
    campaignId: 'camp_01',
    campaignTitle: 'Lumina Nova Pro Earbuds: 60s TikTok Aesthetic Showcase',
    brandId: 'usr_brand_01',
    brandName: 'Lumina Acoustics',
    brandLogo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=160&q=80',
    creatorId: 'usr_creator_01',
    creatorName: 'Elena Vance',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    amount: 1400,
    escrowFee: 42,
    netPayout: 1358,
    status: 'under_review',
    fundedAt: 'Oct 21, 2026 • 14:32 UTC',
    revisionsRequestedCount: 1,
    latestRevisionFeedback: 'Make sure the ANC audio toggle effect feels dramatic. Loved the lighting in the morning kitchen cut!',
  },
];

let transactionsStore = [
  {
    id: 'tx_98214',
    contractId: 'escrow_form_03',
    campaignTitle: 'Daily Micro-Habits: Clean Morning Ritual with Form Hydrate',
    type: 'stripe_express_payout',
    amount: 824.5,
    status: 'disbursed',
    date: 'Oct 18, 2026',
    stripeReference: 'po_1NZs9k2eZvKYlo2C991823',
    recipientOrPayer: 'Direct Deposit • Chase (••4892)',
  },
];

// Anti-bypass detection list
const FORBIDDEN_WORDS = ['paypal', 'cashapp', 'venmo', 'zelle', 'wire', 'whatsapp', 'telegram', 'off platform', 'outside of sponsorsync'];

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'SponsorSync Core API & Escrow Protocol',
    version: '1.2.0-prod',
    nodeEnv: process.env.NODE_ENV || 'development',
    escrowVaultStatus: 'ACTIVE_256_BIT',
  });
});

// GET /api/campaigns
app.get('/api/campaigns', (req: Request, res: Response) => {
  const { platform, minBudget } = req.query;
  let results = [...campaignsStore];

  if (platform && platform !== 'all') {
    results = results.filter((c) => c.platforms.includes(platform as any));
  }
  if (minBudget) {
    results = results.filter((c) => c.budget >= Number(minBudget));
  }

  res.json({ data: results, count: results.length });
});

// POST /api/campaigns (Brand posts brief with escrow lock)
app.post('/api/campaigns', (req: Request, res: Response) => {
  const { title, description, budget, platforms, deliverables, requirements, deadline, category } = req.body;
  if (!title || !budget) {
    return res.status(400).json({ error: 'Title and budget are required.' });
  }

  const newCampaign = {
    id: `camp_${Date.now()}`,
    brandId: 'usr_brand_01',
    brandName: 'Lumina Acoustics',
    brandLogo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=160&q=80',
    title,
    description: description || '',
    budget: Number(budget),
    escrowSecured: true,
    platforms: platforms || ['tiktok'],
    deliverables: deliverables || { platform: 'tiktok', type: '60s Dedicated Reel', aspectRatio: '9:16', usageRights: '30-Day Digital Paid' },
    requirements: requirements || [],
    deadline: deadline || 'Nov 30, 2026',
    status: 'active',
    applicantCount: 0,
    createdAt: 'Just now',
    category: category || 'Tech & Gadgets',
  };

  campaignsStore.unshift(newCampaign);
  res.status(201).json({ data: newCampaign, message: 'Campaign created & Escrow Vault initialized.' });
});

// GET /api/escrow/contracts
app.get('/api/escrow/contracts', (req: Request, res: Response) => {
  res.json({ data: escrowContractsStore });
});

// POST /api/escrow/:id/approve-release
app.post('/api/escrow/:id/approve-release', (req: Request, res: Response) => {
  const { id } = req.params;
  const contract = escrowContractsStore.find((c) => c.id === id);
  if (!contract) {
    return res.status(404).json({ error: 'Contract not found' });
  }

  contract.status = 'payout_released';
  const stripeTransferId = `tr_${crypto.randomBytes(8).toString('hex')}`;
  (contract as any).stripeTransferId = stripeTransferId;
  (contract as any).completedAt = new Date().toISOString();

  // Log transaction
  const releaseTx = {
    id: `tx_${Date.now().toString().slice(-5)}`,
    contractId: contract.id,
    campaignTitle: contract.campaignTitle,
    type: 'escrow_release',
    amount: contract.netPayout,
    status: 'cleared',
    date: 'Today',
    stripeReference: stripeTransferId,
    recipientOrPayer: contract.brandName,
  };
  transactionsStore.unshift(releaseTx);

  res.json({
    data: contract,
    transaction: releaseTx,
    message: 'Escrow funds successfully approved & disbursed to creator balance via Stripe Connect.',
  });
});

// POST /api/escrow/:id/revisions
app.post('/api/escrow/:id/revisions', (req: Request, res: Response) => {
  const { id } = req.params;
  const { feedback } = req.body;
  const contract = escrowContractsStore.find((c) => c.id === id);
  if (!contract) {
    return res.status(404).json({ error: 'Contract not found' });
  }

  contract.status = 'under_review';
  contract.revisionsRequestedCount = (contract.revisionsRequestedCount || 0) + 1;
  contract.latestRevisionFeedback = feedback || 'Quality revisions requested.';

  res.json({ data: contract, message: 'Revision feedback dispatched to creator.' });
});

// POST /api/escrow/signed-url (Supabase/S3 signed URL token simulation)
app.post('/api/escrow/signed-url', (req: Request, res: Response) => {
  const { fileName, contractId } = req.body;
  const secretKey = 'sponsorsync_vault_hmac_secret_2026';
  const exp = Math.floor(Date.now() / 1000) + 3600; // 1 hour
  const tokenPayload = `${contractId || 'global'}:${fileName || 'draft.mp4'}:${exp}`;
  const signature = crypto.createHmac('sha256', secretKey).update(tokenPayload).digest('hex');

  res.json({
    signedUrl: `https://storage.sponsorsync.io/vault/contracts/${contractId || 'vault'}/${encodeURIComponent(fileName || 'media.mp4')}?token=${signature}&expires=${exp}`,
    expiresInSeconds: 3600,
    sha256Integrity: signature,
    algorithm: 'HMAC-SHA256',
  });
});

// POST /api/wallet/payout (Stripe Direct Express Payout)
app.post('/api/wallet/payout', (req: Request, res: Response) => {
  const { amount, destination } = req.body;
  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid payout amount' });
  }

  const expressFee = Math.round(Number(amount) * 0.015 * 100) / 100;
  const netDisbursed = Number(amount) - expressFee;
  const payoutRef = `po_${crypto.randomBytes(8).toString('hex')}`;

  const payoutTx = {
    id: `tx_${Date.now().toString().slice(-5)}`,
    contractId: 'direct_payout',
    campaignTitle: 'Stripe Direct Express Instant Transfer',
    type: 'stripe_express_payout',
    amount: Number(amount),
    status: 'disbursed',
    date: 'Today',
    stripeReference: payoutRef,
    recipientOrPayer: destination === 'debit' ? 'Chase Visa Debit (••4892)' : 'Chase Checking (••9104)',
  };
  transactionsStore.unshift(payoutTx);

  res.json({
    success: true,
    payoutReference: payoutRef,
    grossAmount: Number(amount),
    expressFee,
    netDisbursed,
    arrivalSpeed: destination === 'debit' ? 'instant' : 'standard',
    transaction: payoutTx,
  });
});

// POST /api/chat/validate-message (Anti-bypass rule scanner)
app.post('/api/chat/validate-message', (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) return res.json({ safe: true });

  const lower = text.toLowerCase();
  const detected = FORBIDDEN_WORDS.filter((kw) => lower.includes(kw));

  if (detected.length > 0) {
    return res.json({
      safe: false,
      flaggedWords: detected,
      warning: 'Off-platform contact or payment attempts violate SponsorSync Escrow Protection terms.',
    });
  }

  res.json({ safe: true });
});

async function startServer() {
  // Mount Vite dev server middleware
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SponsorSync Server] Running on http://0.0.0.0:${PORT}`);
    console.log(`[SponsorSync Server] Escrow & Stripe Connect API available at /api/*`);
  });
}

startServer().catch((err) => {
  console.error('[SponsorSync Server] Failed to start:', err);
  process.exit(1);
});
