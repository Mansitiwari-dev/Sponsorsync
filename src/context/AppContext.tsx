import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  Campaign,
  Proposal,
  EscrowContract,
  EscrowStatus,
  ChatMessage,
  Transaction,
} from '../types';
import {
  initialCreatorProfile,
  initialBrandProfile,
  initialCampaigns,
  initialProposals,
  initialEscrowContracts,
  initialChatMessages,
  initialTransactions,
} from '../data/mockData';

export type NavigationTab = 'feed' | 'briefs' | 'workspace' | 'wallet' | 'profile';
export type DeviceMode = 'mobile-frame' | 'responsive';

interface AppContextType {
  isAuthenticated: boolean;
  activeRole: UserRole;
  currentUser: UserProfile;
  deviceMode: DeviceMode;
  currentTab: NavigationTab;
  campaigns: Campaign[];
  proposals: Proposal[];
  escrowContracts: EscrowContract[];
  activeContractId: string;
  chatMessages: Record<string, ChatMessage[]>;
  transactions: Transaction[];
  availableBalance: number;
  inEscrowBalance: number;
  lifetimeEarnings: number;
  // Actions
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  setDeviceMode: (mode: DeviceMode) => void;
  setCurrentTab: (tab: NavigationTab) => void;
  setActiveContractId: (id: string) => void;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'applicantCount' | 'brandId' | 'brandName' | 'brandLogo'>) => void;
  submitProposal: (proposal: Omit<Proposal, 'id' | 'createdAt' | 'status' | 'creatorId' | 'creatorName' | 'creatorAvatar' | 'creatorHandle' | 'creatorNiche' | 'creatorFollowers' | 'creatorEngagement' | 'aiMatchScore' | 'aiMatchBreakdown'>) => void;
  acceptProposal: (proposalId: string) => void;
  requestRevisions: (contractId: string, feedback: string) => void;
  approveAndReleaseFunds: (contractId: string) => void;
  submitDraftMedia: (contractId: string, title: string, previewUrl?: string) => void;
  sendChatMessage: (contractId: string, text: string) => void;
  triggerStripePayout: (amount: number) => Promise<boolean>;
  generateSignedUrlMock: (fileName: string) => { signedUrl: string; expiresAt: string; hash: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default authenticated for seamless exploration
  const [activeRole, setActiveRole] = useState<UserRole>('creator');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('mobile-frame');
  const [currentTab, setCurrentTab] = useState<NavigationTab>('feed');
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [escrowContracts, setEscrowContracts] = useState<EscrowContract[]>(initialEscrowContracts);
  const [activeContractId, setActiveContractId] = useState<string>('escrow_lumina_01');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(initialChatMessages);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  // Balances
  const [availableBalance, setAvailableBalance] = useState<number>(3420.5);
  const [inEscrowBalance, setInEscrowBalance] = useState<number>(3600.0);
  const [lifetimeEarnings, setLifetimeEarnings] = useState<number>(42800.0);

  const currentUser = activeRole === 'creator' ? initialCreatorProfile : initialBrandProfile;

  const login = (role: UserRole) => {
    setActiveRole(role);
    setIsAuthenticated(true);
    setCurrentTab(role === 'creator' ? 'feed' : 'briefs');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    if (role === 'brand') {
      setCurrentTab('briefs');
    } else {
      setCurrentTab('feed');
    }
  };

  const createCampaign = (newCampData: Omit<Campaign, 'id' | 'createdAt' | 'applicantCount' | 'brandId' | 'brandName' | 'brandLogo'>) => {
    const newCamp: Campaign = {
      ...newCampData,
      id: `camp_${Date.now()}`,
      brandId: initialBrandProfile.id,
      brandName: initialBrandProfile.brandName || 'Lumina Acoustics',
      brandLogo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=160&q=80',
      applicantCount: 0,
      createdAt: 'Just now',
    };
    setCampaigns((prev) => [newCamp, ...prev]);

    // Sync to backend Express API
    try {
      fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCamp),
      }).catch(() => {});
    } catch (e) {}

    // Record escrow deposit transaction
    const depositTx: Transaction = {
      id: `tx_${Date.now().toString().slice(-5)}`,
      contractId: newCamp.id,
      campaignTitle: newCamp.title,
      type: 'escrow_deposit',
      amount: newCamp.budget,
      status: 'held',
      date: 'Today',
      stripeReference: `pi_${Math.random().toString(36).substring(2, 12)}`,
      recipientOrPayer: 'Brand Escrow Deposit (Locked in Vault)',
    };
    setTransactions((prev) => [depositTx, ...prev]);
  };

  const submitProposal = (data: Omit<Proposal, 'id' | 'createdAt' | 'status' | 'creatorId' | 'creatorName' | 'creatorAvatar' | 'creatorHandle' | 'creatorNiche' | 'creatorFollowers' | 'creatorEngagement' | 'aiMatchScore' | 'aiMatchBreakdown'>) => {
    const newProp: Proposal = {
      ...data,
      id: `prop_${Date.now()}`,
      creatorId: initialCreatorProfile.id,
      creatorName: initialCreatorProfile.name,
      creatorAvatar: initialCreatorProfile.avatarUrl,
      creatorHandle: initialCreatorProfile.socials[0].handle,
      creatorNiche: initialCreatorProfile.creatorNiche || 'Lifestyle Tech',
      creatorFollowers: initialCreatorProfile.socials[0].followers,
      creatorEngagement: initialCreatorProfile.socials[0].engagementRate,
      aiMatchScore: Math.floor(Math.random() * 8) + 91, // 91-98%
      aiMatchBreakdown: {
        nicheAlignment: 96,
        audienceSynergy: 94,
        budgetFit: 98,
        historicalReliability: 99,
      },
      status: 'pending',
      createdAt: 'Just now',
    };
    setProposals((prev) => [newProp, ...prev]);

    // Update campaign applicant count
    setCampaigns((prev) =>
      prev.map((c) => (c.id === data.campaignId ? { ...c, applicantCount: c.applicantCount + 1 } : c))
    );
  };

  const acceptProposal = (proposalId: string) => {
    const proposal = proposals.find((p) => p.id === proposalId);
    if (!proposal) return;

    // Update proposal status
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status: 'accepted' } : p))
    );

    // Create escrow contract
    const contractId = `escrow_${Date.now().toString().slice(-6)}`;
    const fee = Math.round(proposal.proposedBudget * 0.03 * 10) / 10;
    const newContract: EscrowContract = {
      id: contractId,
      campaignId: proposal.campaignId,
      campaignTitle: proposal.campaignTitle,
      brandId: initialBrandProfile.id,
      brandName: initialBrandProfile.brandName || proposal.brandName,
      brandLogo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=160&q=80',
      creatorId: proposal.creatorId,
      creatorName: proposal.creatorName,
      creatorAvatar: proposal.creatorAvatar,
      amount: proposal.proposedBudget,
      escrowFee: fee,
      netPayout: proposal.proposedBudget - fee,
      status: 'funded',
      fundedAt: 'Just now • Instant 256-Bit Escrow Vault',
      revisionsRequestedCount: 0,
    };

    setEscrowContracts((prev) => [newContract, ...prev]);
    setActiveContractId(contractId);

    // System message
    setChatMessages((prev) => ({
      ...prev,
      [contractId]: [
        {
          id: `msg_sys_${Date.now()}`,
          contractId,
          senderId: 'system',
          senderName: 'SponsorSync Escrow Protocol',
          senderRole: 'brand',
          text: `🛡️ ESCROW FUNDS SECURED: $${proposal.proposedBudget.toLocaleString()}.00 USD has been locked into the 256-bit smart escrow vault. Elena can begin production risk-free!`,
          timestamp: 'Just now',
          isSystemEvent: true,
          systemActionType: 'escrow_funded',
        },
      ],
    }));

    setCurrentTab('workspace');
  };

  const requestRevisions = (contractId: string, feedback: string) => {
    setEscrowContracts((prev) =>
      prev.map((c) =>
        c.id === contractId
          ? {
              ...c,
              status: 'under_review',
              revisionsRequestedCount: c.revisionsRequestedCount + 1,
              latestRevisionFeedback: feedback,
            }
          : c
      )
    );

    // Add revision message to chat
    const revisionMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      contractId,
      senderId: activeRole === 'brand' ? initialBrandProfile.id : initialCreatorProfile.id,
      senderName: activeRole === 'brand' ? initialBrandProfile.name : initialCreatorProfile.name,
      senderRole: activeRole,
      text: `🔄 Revision Requested: "${feedback}"`,
      timestamp: 'Just now',
      isSystemEvent: true,
      systemActionType: 'revisions_requested',
    };

    setChatMessages((prev) => ({
      ...prev,
      [contractId]: [...(prev[contractId] || []), revisionMsg],
    }));
  };

  const approveAndReleaseFunds = (contractId: string) => {
    const contract = escrowContracts.find((c) => c.id === contractId);
    if (!contract) return;

    setEscrowContracts((prev) =>
      prev.map((c) =>
        c.id === contractId
          ? {
              ...c,
              status: 'payout_released',
              completedAt: 'Just now • Verified Released',
              stripeTransferId: `tr_${Math.random().toString(36).substring(2, 14)}`,
            }
          : c
      )
    );

    // Update balances
    setInEscrowBalance((prev) => Math.max(0, prev - contract.amount));
    setAvailableBalance((prev) => prev + contract.netPayout);
    setLifetimeEarnings((prev) => prev + contract.netPayout);

    // Add transaction
    const releaseTx: Transaction = {
      id: `tx_${Date.now().toString().slice(-5)}`,
      contractId,
      campaignTitle: contract.campaignTitle,
      type: 'escrow_release',
      amount: contract.netPayout,
      status: 'cleared',
      date: 'Just now',
      stripeReference: `tr_${Math.random().toString(36).substring(2, 14)}`,
      recipientOrPayer: contract.brandName,
    };
    setTransactions((prev) => [releaseTx, ...prev]);

    // System chat notification
    const releaseMsg: ChatMessage = {
      id: `msg_rel_${Date.now()}`,
      contractId,
      senderId: 'system',
      senderName: 'SponsorSync Escrow Protocol',
      senderRole: 'brand',
      text: `🎉 FUNDS RELEASED: Brand approved deliverables! $${contract.netPayout.toLocaleString()} net payout is now available in Elena's wallet and eligible for instant Stripe Express payout.`,
      timestamp: 'Just now',
      isSystemEvent: true,
      systemActionType: 'funds_released',
    };

    setChatMessages((prev) => ({
      ...prev,
      [contractId]: [...(prev[contractId] || []), releaseMsg],
    }));
  };

  const submitDraftMedia = (contractId: string, title: string, previewUrl?: string) => {
    const signedHash = Math.random().toString(36).substring(2) + '8f1c3a8b29c017d';
    const draft = {
      id: `draft_${Date.now()}`,
      title: title || 'SponsorSync_Deliverable_Final_4K.mp4',
      mediaType: 'video' as const,
      previewUrl: previewUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      aspectRatio: '9:16' as const,
      submittedAt: 'Just now',
      signedUrl: `https://storage.sponsorsync.io/vault/contracts/${contractId}/draft.mp4?sig=${signedHash}&expires=3600`,
      signedUrlExpiresAt: 'Expires in 60 minutes (256-bit signed token)',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      version: 2,
    };

    setEscrowContracts((prev) =>
      prev.map((c) =>
        c.id === contractId
          ? {
              ...c,
              status: 'under_review',
              draftMedia: draft,
            }
          : c
      )
    );

    // Chat notice
    const draftMsg: ChatMessage = {
      id: `msg_d_${Date.now()}`,
      contractId,
      senderId: initialCreatorProfile.id,
      senderName: initialCreatorProfile.name,
      senderRole: 'creator',
      text: `🎬 Draft Uploaded: "${draft.title}". Check out the preview player above. Looking forward to your thoughts!`,
      timestamp: 'Just now',
      attachedDraft: true,
    };

    setChatMessages((prev) => ({
      ...prev,
      [contractId]: [...(prev[contractId] || []), draftMsg],
    }));
  };

  const sendChatMessage = (contractId: string, text: string) => {
    const sender = activeRole === 'creator' ? initialCreatorProfile : initialBrandProfile;
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      contractId,
      senderId: sender.id,
      senderName: sender.name,
      senderRole: activeRole,
      text,
      timestamp: 'Just now',
    };

    setChatMessages((prev) => ({
      ...prev,
      [contractId]: [...(prev[contractId] || []), newMsg],
    }));
  };

  const triggerStripePayout = async (amount: number): Promise<boolean> => {
    if (amount <= 0 || amount > availableBalance) return false;
    
    try {
      fetch('/api/wallet/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, destination: 'debit' }),
      }).catch(() => {});
    } catch (e) {}

    // Simulate real instant transfer API latency
    await new Promise((r) => setTimeout(r, 1000));

    setAvailableBalance((prev) => Math.max(0, prev - amount));
    const payoutTx: Transaction = {
      id: `tx_${Date.now().toString().slice(-5)}`,
      contractId: 'direct_payout',
      campaignTitle: 'Stripe Direct Express Payout',
      type: 'stripe_express_payout',
      amount,
      status: 'disbursed',
      date: 'Just now',
      stripeReference: `po_${Math.random().toString(36).substring(2, 14)}`,
      recipientOrPayer: 'Instant Transfer • Debit Card (••4892)',
    };
    setTransactions((prev) => [payoutTx, ...prev]);
    return true;
  };

  const generateSignedUrlMock = (fileName: string) => {
    const hash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return {
      signedUrl: `https://storage.sponsorsync.io/secure/vault/${encodeURIComponent(fileName)}?sig=${hash.slice(0, 24)}&exp=${Date.now() + 3600000}`,
      expiresAt: '60 minutes',
      hash,
    };
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        activeRole,
        currentUser,
        deviceMode,
        currentTab,
        campaigns,
        proposals,
        escrowContracts,
        activeContractId,
        chatMessages,
        transactions,
        availableBalance,
        inEscrowBalance,
        lifetimeEarnings,
        login,
        logout,
        switchRole,
        setDeviceMode,
        setCurrentTab,
        setActiveContractId,
        createCampaign,
        submitProposal,
        acceptProposal,
        requestRevisions,
        approveAndReleaseFunds,
        submitDraftMedia,
        sendChatMessage,
        triggerStripePayout,
        generateSignedUrlMock,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
