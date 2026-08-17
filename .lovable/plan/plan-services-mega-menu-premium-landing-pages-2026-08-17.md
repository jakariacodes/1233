# Plan - Services Mega Menu & Premium Landing Pages

Implement a mega menu for "Services" in the Navbar and update the Service Landing Page (ServiceDetail) to match the premium design from the provided reference images (`user-uploads://file-30` and `user-uploads://file-31`).

## Changes

### 1. Update `src/components/Navbar.tsx`
- **Mega Menu Implementation**:
  - Add a hover-triggered mega menu for the "Services" link.
  - The menu will be a large glassmorphic card (matching `file-30`).
  - Layout: Grid of service items with icons, titles, and short descriptions.
  - Include "Need something custom?" footer with a "Get Free Quote" button.
  - Icons and colors should match the premium palette (teal, blue, purple, orange, green, pink).

### 2. Update `src/pages/ServiceDetail.tsx`
- **Layout Restructuring** (based on `file-31`):
  - **Packages Section (Moved to Top)**: Three pricing tiers (Basic, Standard/Popular, Premium) with "Order Now" buttons.
  - **Hero Section**: Service icon, title, punchy subtitle, rating/stats, "View Pricing" and "Free Consultation" buttons, and a premium 3D/featured image.
  - **Main Content**: "Video Content/Service that Tells Your Story" section with rich text and image.
  - **Strategy/Why Section**: "Video Marketing Strategy" content.
  - **Trust Factors**: "Why Clients Trust Us" bullet points with icons.
  - **Process Section**: "How We Deliver [Service]" 4-step process (Briefing, Rough Cut, Polish, Final Delivery).
  - **Testimonials**: "What Our Clients Say" grid.
  - **FAQ**: "Frequently Asked Questions" accordion.
  - **Other Services**: Small cards for navigating to other services.
  - **Final CTA**: "Ready to Get Started with [Service]?" banner.

## Technical Details
- Use `framer-motion` for smooth menu transitions and reveal animations.
- Use `shadcn/ui` components (Accordion, Tabs, Cards) where appropriate.
- Ensure all services (Web Design, Dev, SEO, AI, etc.) have specific mock data populated to demonstrate the premium layout.
- Standardize colors using the primary teal (#00a884) and navy theme.
