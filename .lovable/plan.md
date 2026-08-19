# Plan: Admin-Controlled Hero & Global Content Internationalization

Move Hero section content to a database-driven model manageable via the Admin Panel and rewrite all website content to reflect a global brand positioning instead of a Bangladesh-only focus.

## User Review Required

> [!IMPORTANT]
> - This update will change hardcoded text in components to dynamic data fetched from `site_settings` or a new `hero_settings` table.
> - Global text changes will remove phrases like "in Bangladesh" and replace them with "Worldwide" or "Global" across all sections.

## Proposed Changes

### Database & Backend
- Create a `site_content` table to store key-value pairs for section-specific text (Hero title, descriptions, CTA labels).
- Seed the table with initial "Global-focused" values.
- Update RLS policies to allow public read and admin-only update.

### Admin Panel (Hero Management)
- Create a new tab in the Admin Settings page specifically for "Hero Section Control".
- Add fields for:
    - Hero Heading/Title
    - Hero Description
    - Primary/Secondary Button Text & URLs
    - Service Pills (Labels & Icons)
    - Featured Images/Backgrounds
- Integrate `useSiteSettings` (or a specialized hook) to handle updates.

### Content Internationalization
- **Hero Section**: Change "Development Company in Bangladesh" to "Development Company Worldwide".
- **About Section**: Rewrite descriptions to emphasize global service areas (UK, USA, Canada, Europe) rather than just being "based in Bangladesh".
- **Footer**: Ensure address/branding reflects global availability.
- **Across the site**: Replace "Bangladesh's Leading Agency" with "A Leading Global Digital Agency".

### Technical Details
- Use `src/hooks/useSiteSettings.ts` as a base for fetching content.
- Update `src/components/HeroSection.tsx` to use the dynamic settings.
- Add Zod validation for admin inputs to ensure URLs and text lengths are safe.

## Verification Plan

### Automated Tests
- Verify `site_content` table accessibility via Supabase client.
- Test Admin Panel update functionality by changing a Hero title and verifying the preview updates.

### Manual Verification
- Check every page for mentions of "Bangladesh" that should be "Worldwide".
- Verify that Hero button links correctly update from the Admin Panel.
- Ensure visual consistency after text length changes.
