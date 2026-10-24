export type UserRole = 'creator' | 'brand';

export type SocialPlatform = 'tiktok' | 'instagram' | 'youtube';

export interface SocialStat {
  platform: SocialPlatform;
  handle: string;
  followers: string;
  engagementRate: string;
  avgViews: string;
  verified: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  brandName?: string;
  companyCategory?: string;
  creatorNiche?: string;
  bio: string;
  socials: SocialStat[];
  stripeConnected: boolean;
  stripeAccountId?: string;
  rating: number;
  completedDeals: number;
  totalEarnedOrSpent: number;
}

export interface CampaignDeliverables {
  platform: SocialPlatform;
  type: string; // '60s Dedicated Reel', 'TikTok In-Feed Video', 'YouTube 90s Integration'
  durationSeconds?: number;
  aspectRatio: '9:16' | '16:9' | '1:1';
  usageRights: '30-Day Digital Paid' | 'Perpetual Organic' | 'Full Whitelist & Commercial';
}

export interface Campaign {
  id: string;
  brandId: string;
  brandName: string;
  brandLogo: string;
  title: string;
  description: string;
  budget: number;
  escrowSecured: boolean;
  platforms: SocialPlatform[];
  deliverables: CampaignDeliverables;
  requirements: string[];
  deadline: string;
  status: 'active' | 'in_progress' | 'completed' | 'paused';
  applicantCount: number;
  createdAt: string;
  category: string;
}

export interface Proposal {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandName: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorHandle: string;
  creatorNiche: string;
  creatorFollowers: string;
  creatorEngagement: string;
  aiMatchScore: number;
  aiMatchBreakdown: {
    nicheAlignment: number;
    audienceSynergy: number;
    budgetFit: number;
    historicalReliability: number;
  };
  pitch: string;
  proposedBudget: number;
  estimatedDeliveryDays: number;
  rateCardName: string;
  rateCardUrl: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export type EscrowStatus = 'funded' | 'draft_submitted' | 'under_review' | 'payout_released';

export interface DraftMedia {
  id: string;
  title: string;
  mediaType: 'video' | 'image';
  previewUrl: string;
  aspectRatio: '9:16' | '16:9';
  submittedAt: string;
  signedUrl: string;
  signedUrlExpiresAt: string;
  sha256Hash: string;
  version: number;
  revisionsNotes?: string[];
}

export interface EscrowContract {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  brandName: string;
  brandLogo: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  amount: number;
  escrowFee: number;
  netPayout: number;
  status: EscrowStatus;
  fundedAt: string;
  draftMedia?: DraftMedia;
  revisionsRequestedCount: number;
  latestRevisionFeedback?: string;
  completedAt?: string;
  stripeTransferId?: string;
}

export interface ChatMessage {
  id: string;
  contractId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  isSystemEvent?: boolean;
  systemActionType?: 'escrow_funded' | 'draft_submitted' | 'revisions_requested' | 'funds_released';
  attachedDraft?: boolean;
}

export interface Transaction {
  id: string;
  contractId: string;
  campaignTitle: string;
  type: 'escrow_deposit' | 'escrow_release' | 'stripe_express_payout';
  amount: number;
  status: 'held' | 'cleared' | 'disbursed';
  date: string;
  stripeReference: string;
  recipientOrPayer: string;
}
