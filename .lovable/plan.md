# Plan: Rebuild AboutSection to match reference UI

Rebuild `src/components/AboutSection.tsx` to match the premium, modern aesthetic in the provided reference image (`user-uploads://file-26`).

## Proposed Changes

### 1. Layout & Styling
- **Background**: Switch from plain white to a soft, layered background with large, subtle blue/teal glow orbs and a tech-grid overlay.
- **Two-Column Grid**: Keep the grid but refine proportions.
- **Left Column**:
  - Update headings with precise typography (Space Grotesk).
  - Add a sub-badge like "About TechCrafterIT".
  - Replace the icon list with a clean 2x2 grid of modern, glassmorphic feature cards (ISO Certified, 100% Satisfaction, etc.).
  - Stylize the "Learn More About Us" button as a modern blue pill with a subtle shadow.
- **Right Column**:
  - Create a large, white glassmorphic card with high-end border-radius and soft shadow.
  - Implement a top row of stats (Years Experience, Happy Clients, Completed Projects).
  - Create a profile highlight card for "Md Jakaria Hasan" with a dark navy background and circular headshot.
  - Add a testimonial/mission quote below the profile.
  - Add "Top Rated Agency", "Verified Business", and "5-Star Reviews" badges.
  - Add a "Follow on Facebook" button.

### 2. Technical Details
- Use `framer-motion` (if available, otherwise Tailwind transitions) for smooth hover states.
- Ensure responsive behavior: stacking on mobile, side-by-side on desktop.
- Maintain existing H2/H3 hierarchy for SEO.
- Import `reference_ui.png.asset.json` for internal reference if needed, but primarily replicate the design using code.

### 3. Dependencies
- No new dependencies expected (Lucide icons and Radix UI should suffice).

## User Review Required
- The reference image shows "TechCrafterIT". I will update the text to "NextOnline Technology" or keep it generic per project branding.
- I'll use the team image provided earlier for the profile headshot if applicable, or a placeholder if a specific headshot isn't available.
