---
name: SponsorSync Mobile
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#b5005d'
  on-secondary: '#ffffff'
  secondary-container: '#da2676'
  on-secondary-container: '#fffbff'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4c'
  on-tertiary-container: '#7df1bd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#ffd9e2'
  secondary-fixed-dim: '#ffb1c7'
  on-secondary-fixed: '#3f001c'
  on-secondary-fixed-variant: '#8e0048'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-sm: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system reflects a high-velocity creator economy fintech platform, balancing transactional rigor with vibrant creator energy. It targets digital creators, talent managers, and brand marketers handling high-stakes sponsorship deals and escrow workflows on mobile devices.

The design movement combines **Modern Fintech Precision** with high-conversion mobile design patterns:
- Confident, high-contrast typography prioritizing fast parsing of critical payout terms, active campaign metrics, and escrow release milestones.
- Airy, multi-tiered white surface layering over an ultra-soft cool gray backdrop to emphasize structural clarity without visual clutter.
- Tactical, high-saturation color placement reserved exclusively for primary actions, deal highlights, and financial security states.

## Colors

The palette drives decisive, frictionless financial actions:
- **Primary Indigo (`#4F46E5`)**: Anchors primary conversion paths, deal approval triggers, active state toggles, and critical platform workflows.
- **Secondary Rose / Magenta (`#DB2777`)**: Accents high-priority notifications, live sponsorship tags, campaign milestones, and creator bonus callouts.
- **Tertiary Mint Green (`#059669`)**: Strictly reserved for verified escrow funds, settlement confirmations, positive yields, and cleared payments.
- **Neutral Dark Slate (`#0F172A`)**: Primary text and high-emphasis data points.
- **Canvas & Surface Architecture**:
  - Main App Canvas: Soft Gray (`#F8FAFC`) to distinguish foreground interaction zones.
  - Cards & Sheet Surfaces: Pure White (`#FFFFFF`).
  - Subtle Structural Borders: Gray (`#E2E8F0`).
  - Subdued Labels & Secondary Metrics: Slate Muted (`#64748B`).

## Typography

The type system is built on **Inter** to ensure maximum legibility at small sizes and high scanning speeds across mobile viewports.
- All monetary and balance sums utilize tight negative tracking (`-0.02em` to `-0.025em`) with semi-bold or bold weights to mirror clean institutional fintech.
- Metadata and uppercase badge labels enforce `0.02em` to `0.05em` letter spacing with medium to bold weights to maintain optical balance alongside high-contrast numbers.

## Layout & Spacing

This mobile-first layout operates on an ergonomic 4px/8px incremental rhythm configured for natural touch interactions:
- **Canvas Margins**: Set to `1rem` (16px) on standard viewports (375px–430px) and condensed to `0.75rem` (12px) on ultra-compact devices (under 360px).
- **Component Flow**: Fluid column layout where cards, modal sheets, and interaction lists span full bleed up to device safe bounds.
- **Thumb Zone Anchors**: Sticky action bars and checkout triggers sit fixed at the viewport bottom, cushioned by `1rem` vertical padding above the device home indicator.

## Elevation & Depth

Visual hierarchy combines clean boundary borders with light, ambient dispersal:
- **Default Card Elevation**: Pure White (`#FFFFFF`) cards sit over the Soft Gray (`#F8FAFC`) canvas framed by a 1px solid `#E2E8F0` border, enhanced by an ambient drop shadow: `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04)`.
- **Raised Interactive Layers (Sheets, Menus, Floating Bars)**: `box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` over a 1px border.
- **Tactile Pressed States**: On touch-down, elements drop to zero elevation and register an instantaneous scale transform to `0.985` for immediate feedback.

## Shapes

The interface embraces a friendly yet tightly-contained `16px` (`rounded-2xl` / Level 2 roundedness) radius across primary cards, balance displays, and interaction containers:
- Inner tags, pill switches, and action buttons scale down proportionally to 8px–12px or full-pill structures to echo creator-centric mobile norms while keeping critical layout containers at standard 16px curvature.

## Components

### Buttons
- **Primary Action (Payment/Approval)**: Background `#4F46E5`, foreground `#FFFFFF`, height 52px, radius 16px, font `label-lg`, center-aligned.
- **Secondary Action (Escrow Verification)**: Background `#F0FDF4` (tinted Mint), text `#059669`, border 1px solid `#A7F3D0`.
- **Tertiary/Ghost**: Background transparent, foreground `#64748B`, active pressed state background `#F1F5F9`.

### Escrow & Status Badges (Chips)
- Height 26px, radius 9999px (pill-shaped), horizontal padding 10px, typography `label-sm` uppercase.
- **Escrow Funded**: Background `#ECFDF5`, text `#059669`, 1px border `#A7F3D0`.
- **Live Deal**: Background `#FDF2F8`, text `#DB2777`, 1px border `#FBCFE8`.
- **Pending Action**: Background `#F8FAFC`, text `#64748B`, 1px border `#E2E8F0`.

### Cards & Deal Containers
- Background `#FFFFFF`, border 1px solid `#E2E8F0`, radius 16px, padding `1rem`, `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04)`.
- Split vertical sections separated by a subtle 1px divider (`#F1F5F9`) between deal terms and payout status.

### Form Inputs
- Background `#FFFFFF`, 1px solid border `#E2E8F0`, radius 12px, height 48px, horizontal padding 14px, typography `body-md` in `#0F172A`.
- Placeholder text in `#64748B`.
- Active focus state: 1.5px solid border `#4F46E5` accompanied by an indigo ring glow (`rgba(79, 70, 229, 0.12)`).

### Checkboxes & Milestone Radios
- Size 20x20px, radius 6px for checkboxes and 9999px for milestone selectors.
- Unselected: Border 1.5px solid `#CBD5E1`, background `#FFFFFF`.
- Selected: Background `#4F46E5` (or `#059669` in escrow release steps) displaying an interior white checkmark.

### Deal Milestone Stepper (Escrow Release)
- Segmented linear tracker utilizing 4px progress tracks (`#E2E8F0` unfilled, `#059669` funded/cleared) paired with compact 24px step icons to convey payout custody at a glance.