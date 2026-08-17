# Branding and Design Overhaul Plan

Update the application's visual identity, naming, and overall design quality to match the "NextOnline Technology" logo and reference design.

## Proposed Changes

### 1. Brand & Naming
- **Global Rename**: Replace all instances of "TechCrafterIT" with "NextOnline Technology".
- **Logo Integration**: Use the uploaded teal/cyan logos for header and footer.
- **Color System Update**:
  - Update CSS variables in `src/styles.css` to use a teal/cyan primary color (#0d9488 or similar teal) extracted from the logo.
  - Define high-contrast accent colors for a premium look.

### 2. Header (Navbar)
- Replace text logo with the new header logo image.
- Ensure white background and premium hover effects for navigation.
- Use a rounded-full "Get Started" button with teal theme.

### 3. Footer Redesign
- Redesign the footer to match the reference style:
  - Centered layout for main branding.
  - Premium pill-shaped navigation links.
  - Integrated social media links with teal hover states.
  - Clean, organized contact information.

### 4. Visual Quality & Content
- **Typography**: Refine font weights and sizes for a more "premium" feel.
- **Hero Section**: Update the teal-cyan gradients and animations to align with the new branding.
- **Image Quality**: Audit and improve spacing/padding for sections to ensure a more spacious, professional layout.
- **Section Polish**: Add subtle entrance animations and glassmorphism effects where appropriate.

## Technical Details

- **Tailwind v4**: Update `--primary` and gradients in `src/styles.css`.
- **Assets**: Use `lovable-assets` pointers for `logo-header.png` and `logo-footer.png`.
- **Components**: Modify `Navbar.tsx`, `Footer.tsx`, and `HeroSection.tsx` primarily.
- **Global Search & Replace**: Update metadata and text across the project.
