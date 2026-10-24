# DESIGN.md — SponsorSync Design System & Architecture Specification

## 1. Design Tokens & Palette

SponsorSync bridges the creator economy with fintech security through modern, high-contrast visual tokens:

### Color Palette
- **Canvas / Background**:
  - `background`: `#FAF8FF` / `#F8FAFC` (Soft Slate & Lavender tint Canvas)
  - `surface-container-lowest`: `#FFFFFF` (Pure White Card Surface)
  - `surface-container-low`: `#F2F3FF`
  - `surface-container`: `#EAEDFF`
  - `surface-container-high`: `#E2E7FF`
  - `surface-container-highest`: `#DAE2FD`
- **Text & Neutral Contrast**:
  - `on-surface` (Primary text): `#131B2E` / `#0F172A` (Dark Slate)
  - `on-surface-variant` (Muted labels & captions): `#464555` / `#64748B` (Slate Muted)
  - `outline` / `outline-variant`: `#E2E8F0` / `#CBD5E1` (Subtle 1px borders)
- **Primary Action (Fintech Trust & Conversion)**:
  - `primary`: `#3525CD` / `#4F46E5` (Electric Indigo)
  - `primary-container`: `#4F46E5`
  - `on-primary`: `#FFFFFF`
  - `primary-fixed`: `#E2DFFF`
- **Secondary Accent (Creator Vibrancy & Deal Highlights)**:
  - `secondary`: `#B5005D` / `#DB2777` (Warm Rose / Magenta)
  - `secondary-container`: `#DA2676`
  - `on-secondary-container`: `#FFFBFF`
  - `secondary-fixed`: `#FFD9E2`
- **Escrow & Financial Clearance (Tertiary)**:
  - `tertiary`: `#059669` / `#006E4C` (Emerald Mint)
  - `tertiary-fixed`: `#85F8C4` / `#ECFDF5`
  - `on-tertiary-fixed`: `#002114` / `#059669`
- **Security & Alerts**:
  - `error`: `#BA1A1A` / `#EF4444`
  - `error-container`: `#FFDAD6`

### Typography Hierarchy (Inter)
- `headline-xl`: 32px / line-height 38px / bold (700) / -0.025em
- `headline-xl-mobile`: 26px / line-height 32px / bold (700) / -0.02em
- `headline-lg`: 24px / line-height 30px / semibold (600) / -0.02em
- `headline-sm`: 18px / line-height 24px / semibold (600) / -0.015em
- `body-lg`: 16px / line-height 24px / regular (400) / -0.01em
- `body-md`: 14px / line-height 20px / regular (400) / 0em
- `body-sm`: 12px / line-height 16px / regular (400) / 0em
- `label-lg`: 14px / line-height 20px / semibold (600) / +0.01em
- `label-md`: 12px / line-height 16px / semibold (600) / +0.02em
- `label-sm`: 10px / line-height 14px / bold (700) / +0.05em (caps)

### Spacing & Elevation
- Grid rhythm: 4px / 8px / 12px / 16px / 24px
- Border Radius: Default `16px` (`rounded-2xl`) for cards & modals, `12px` for form inputs, `9999px` for pill tags and action indicators.
- Elevation:
  - Base cards: `0 4px 12px rgba(0, 0, 0, 0.04)` over 1px `#E2E8F0` border
  - Modals & Floating sheets: `0 10px 25px -5px rgba(15, 23, 42, 0.08)`
  - Active press: `transform: scale(0.985)`

---

## 2. Component Architecture

1. **Authentication & Onboarding**:
   - Role switcher card (`Creator` vs `Brand/Publisher`) with active checkmark radio and vibrant container highlight.
   - Social OAuth triggers (Meta/Instagram, TikTok, Google, Apple) with genuine responsive states.
   - 256-Bit Encrypted & Stripe Connect verified trust pill.

2. **Global Header & Workspace Switcher**:
   - Header bar with brand identity, live balance indicator, notification center, and interactive segmented toggle `[ Creator View | Brand View ]`.
   - Device preview frame toggle (`Mobile Expo View` vs `Full-Width Desktop Web View`).

3. **Creator View**:
   - Filterable Feed by platform (TikTok, Instagram, YouTube) and min escrow secured ($500+).
   - Deal Cards showing brand avatar, verified budget, platform tags, deliverables, escrow status.
   - Proposal Submission Sheet with custom pitch textarea, deliverables breakdown, rate card attachment, and estimated timeline.

4. **Brand View (Campaign & Discovery Management)**:
   - Campaign Builder Form: title, category, budget with auto-escrow deposit calculate, required deliverables, platform specs, usage rights, and deadline.
   - Applicant Review Pipeline: Applicant cards with verified stats (Audience, Engagement Rate, Niche), verified badge, AI Match Score (match breakdown by content affinity, follower tier, tone), and "Accept Pitch & Fund Escrow" action.

5. **In-App Chat & Escrow Workspace**:
   - Direct messaging thread between Brand & Creator.
   - Anti-Bypass Security Warning Banner detecting off-platform keywords (e.g. PayPal, CashApp, WhatsApp, Telegram, email, wire transfer) with escrow protection guarantees.
   - Interactive 4-step Escrow Status Bar:
     1. `[Funded]`
     2. `[Draft Submitted]`
     3. `[Under Review]`
     4. `[Payout Released]`
   - Integrated Media Preview Player supporting video clips, sponsored reels, carousels, and high-res image proofs with signed URL security badge.
   - Interactive Decision Matrix: "Request Revisions" with structured timestamped feedback vs. "Approve & Release Funds" with immediate instant Stripe payout trigger.

6. **Wallet, Payouts & Stripe Express**:
   - Real-time balance breakdown: Available Balance, In-Escrow Secured Funds, Total Lifetime Earnings.
   - Stripe Direct Express payout instant trigger with real-time transfer state simulation.
   - Transaction ledger with tamper-evident escrow IDs, campaign references, and settlement timestamps.
