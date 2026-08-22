# Plan: Revert to Light Theme (Same-to-Same Design)

Rebuild the Services page and associated components to match the light, premium aesthetic shown in the user's reference image (techcrafterit.net/services mockup).

## User Review Required

> [!IMPORTANT]
> - The design will switch back to a **light theme** (white/slate-50 background) with blue accents.
> - The dark "black" theme will be removed from the Services page and Mega Menu.
> - The layout will closely mirror the reference image's structure.

## Proposed Changes

### 1. Services Page (`src/pages/Services.tsx`)
- **Background**: Switch to `bg-slate-50/30` or white with soft blue radial gradients.
- **Hero Section**:
  - Center-aligned text with "Premium Digital Services" pill.
  - Stats bar below the hero text (Projects, Clients, Rating, Support).
- **Popular Services**: Add a section with 4 cards featuring illustrative thumbnails and quick stats.
- **Full Range Grid**:
  - Re-implement the 3/4 column grid with clean white cards.
  - Each card: Icon (with colored background), Title, Rating/Stats, Description, and "View Gigs" link.
- **Process Section**: Simple white background with 4 horizontal steps.
- **CTA Banner**: Blue gradient banner (`bg-gradient-to-r from-blue-500 to-cyan-500`).

### 2. Pricing Integration
- The user liked the "web design pricing", so I will keep the pricing data integration but move it into a design that fits the light theme.
- The pricing cards will be simplified and styled with white backgrounds and blue/teal accents.

### 3. Mega Menu (`src/components/Navbar.tsx`)
- Revert the Mega Menu to a light theme (white background, dark text).
- Match the clean, spacious feel of the reference site.

### 4. Pricing Card (`src/components/PricingCard.tsx`)
- Update to a light theme: white background, grey borders, primary blue/teal text.

## Technical Details
- Maintain dynamic data fetching from Lovable Cloud.
- Use `framer-motion` for subtle entry animations.
- Ensure responsive behavior (stacking on mobile).
