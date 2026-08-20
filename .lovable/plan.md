# Plan: Update Contact Details and Navigation Structure

Update global contact information and reorganize the navigation menu to follow the user's requested order and placement.

## Proposed Changes

### Global Contact Info Update
Update `info@thenextonline.com` and `+14136281326` in all relevant components:
- `src/components/Footer.tsx`: Update the main contact section.
- `src/pages/Contact.tsx`: Update the contact information grid.
- `src/components/ContactSection.tsx`: (Verify if it contains static contact info, though it appears to be a form).
- `src/pages/About.tsx`: Update any mentions in the brand card or story.
- Any other detected instances in `src/components/PricingSection.tsx` or `src/components/HeroSection.tsx` if present.

### Navigation Menu Reorganization
Reorder the `navLinks` in `src/components/Navbar.tsx` and the mobile menu to match the following order:
1. Home
2. About
3. Hosting (Link to be determined/placeholder `#`)
4. Services (Moved to middle)
5. Team
6. Blog
7. Contact

## Technical Details
- Use `code--line_replace` for precise text updates of email and phone number.
- Reorder the array in `Navbar.tsx` to reflect the new navigation hierarchy.
- Ensure the "Services" mega menu still functions correctly after reordering.

## Verification Plan
- Check Navbar order in the preview (desktop and mobile).
- Verify all footer and contact page details show the new email and US phone number.
- Confirm "Hosting" link exists (as a placeholder).
