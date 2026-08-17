# Plan - Rebuild Services Page

Rebuild `src/pages/Services.tsx` to match the design from `techcrafterit.net/services` based on the provided reference image (`user-uploads://file-29`).

## Changes

### 1. Update `src/pages/Services.tsx`
- **Hero Section**:
  - Add "Premium Digital Services" badge.
  - Heading: "Transform Your Business With Expert Solutions" (Space Grotesk).
  - Description centered.
  - Stats row: Projects, Clients, Avg Rating, Support.
- **Popular Services (Horizontal Cards)**:
  - Add a "Popular Services" section with smaller horizontal cards (Icon, Title, Stats).
- **Full Range of Services (Grid)**:
  - Add "Explore Our Full Range of Services" section.
  - Use a 4-column grid (on desktop) for service cards.
  - Cards include: Badge (e.g., "Popular"), Icon (Lucide), Title, Description, Rating/Stats, and "View Gigs" link.
- **Process Section**:
  - Add "How We Deliver Excellence" timeline/process section (Discovery, Strategy, Execution, Launch).
- **CTA Section**:
  - Add "Ready to Start Your Project?" banner with "Get Free Consultation" and "24/7 Available" buttons.
- **Color Palette**:
  - Use the established deep teal (#00a884) and navy theme.

## Technical Details
- Use `framer-motion` for reveal animations if possible, or Tailwind `animate-slide-up`.
- Standardize spacing using existing `.section-padding` and `.container-custom`.
- Ensure responsiveness for all new sections.
- Use `lucide-react` for icons matching the reference.
