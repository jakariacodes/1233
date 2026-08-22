# Plan: Rebuild Services Page

Rebuild the Services page and integrated elements (Mega Menu, Pricing Cards) to match the premium, professional aesthetic of the reference site (techcrafterit.net/services).

## User Review Required

> [!IMPORTANT]
> - The new design will shift to a darker, more high-contrast theme for the Services page to match the reference site.
> - Pricing sections will be integrated directly into the service listings for a streamlined "Order Now" flow.

## Proposed Changes

### 1. Services Page (`src/pages/Services.tsx`)
- **Hero Section**: Implement a darker, high-contrast hero with a large headline and a subtle background grid/pattern.
- **Service Grid**: Replace the current 4-column step-by-step grid with a 3-column feature grid using premium glassmorphism and animated borders.
- **Detailed Service Blocks**: For each service from the database:
  - Display its description and unique features.
  - Embed the pricing tiers (Basic, Standard, Premium) directly in a horizontal layout or optimized grid.
- **Process Section**: Refine the "How We Work" timeline to be more sleek and vertically oriented on mobile.
- **Call to Action**: Update the bottom banner with higher contrast and a stronger visual pull.

### 2. Pricing Component (`src/components/PricingCard.tsx`)
- **Visual Overhaul**: Use a more professional, corporate-style card design.
- **Pricing Display**: Standardize font sizes for prices and feature lists.
- **Interactive States**: Enhance hover effects to clearly highlight the "Most Popular" choice.

### 3. Navigation & Footer Integration
- **Navbar Mega Menu (`src/components/Navbar.tsx`)**: Update the dropdown to match the new visual style of the Services page.
- **Footer Links**: Ensure consistency with the new page structure.

### 4. Styling (`src/styles.css`)
- Add specific utility classes for the new glassmorphism and grid patterns used in the reference site.

## Technical Details
- Use `framer-motion` for smooth entry and hover animations.
- Ensure data is still pulled dynamically from the Lovable Cloud (Supabase) `services` and `service_packages` tables.
- Maintain SEO-friendly slug-based routing for detailed service views.
