# Logo Management & Home Landing Page Links

Enable admin control for site logos via the settings panel and link homepage service cards to their specific landing pages.

## User Review Required

> [!IMPORTANT]
> - This update adds a new `logo_url` field to the `site_settings` or `hero_content` table (or creates a dedicated `site_branding` table if preferred).
> - Homepage "Popular Services" will now link directly to their individual detail pages (e.g., `/services/web-design`) rather than the general `/services` index.

## Proposed Changes

### Database
- Create a migration to add a `branding` entry in `site_settings` or a new table to store `header_logo_url`.
- Ensure RLS policies allow admins to update these branding settings.

### Admin Panel
- Update `src/pages/admin/Settings.tsx` to add a Logo Upload section.
- Implement direct file upload to Lovable Cloud Storage (Supabase Storage) and save the resulting public URL to the database.

### Frontend - Branding
- Modify `src/components/Navbar.tsx` to fetch and display the dynamic logo from the database, falling back to the local asset if none is set.
- Update `src/components/Footer.tsx` (if requested/applicable) to maintain branding consistency.

### Homepage - Service Links
- Update `src/components/ServicesSection.tsx` to link each service card to its specific detail route (`/services/$id`).
- Ensure the slug matching correctly identifies "Web Design", "Web Development", etc., to point to their respective landing pages.

## Technical Details
- **Storage:** Use `supabase.storage.from('branding').upload()` for logo files.
- **Routing:** TanStack Router links will use `to="/services/$id"` with the service slug as the ID.
- **State Management:** Use a new hook or update `useHeroContent` to include site branding data for efficient global access.
