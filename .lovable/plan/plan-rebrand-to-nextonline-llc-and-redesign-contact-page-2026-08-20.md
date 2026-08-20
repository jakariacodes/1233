# Plan - Rebrand to NextOnline LLC and Redesign Contact Page

## Objectives
- Update all occurrences of "NextOnline Technology" to "NextOnline LLC" across the entire codebase.
- Redesign the Contact page to match the provided demo screenshot, ensuring a premium aesthetic without the WhatsApp button/link.
- Update global metadata and SEO titles to reflect the new company name.

## Technical Details

### 1. Global Rebranding
- Perform a project-wide search and replace for "NextOnline Technology" => "NextOnline LLC".
- Update `src/routes/__root.tsx`, `src/routes/index.tsx`, and all product/help routes.
- Update `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/HeroSection.tsx`, etc.
- Update migration files and default database values for `hero_content`.

### 2. Contact Page Redesign (`src/pages/Contact.tsx`)
- Implement the layout from the provided screenshot:
  - Header: "Get in Touch & Start Your Digital Journey" with a subtext.
  - Quick Info Cards: "Call Us", "Email Us", "Visit Us" (Removing WhatsApp card).
  - Main Section: Split into "Let's Build Something Extraordinary" text + stats on the left, and a "Send Us a Message" glassmorphic form on the right.
  - Map Section: "Find Us on the Map" centered block.
  - Newsletter: Integrated bottom section above the footer.
- Remove any WhatsApp-related UI elements as requested.
- Ensure the form uses the existing Supabase integration for message submission.

### 3. Verification
- Verify that the company name is updated globally via `rg`.
- Visually verify the Contact page redesign against the reference image.
- Ensure the contact form still successfully submits messages to the database.

---
*Note: I will use the provided address (London, UK; Albuquerque, USA; Dhaka, Bangladesh) from project memory for the "Visit Us" section.*