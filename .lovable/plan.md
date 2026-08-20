# Plan - Implement Slug-based Routing for Services

The user wants to fix the service page links which currently show UUIDs (e.g., `/services/1c55cca1...`) in the URL. We will transition the routing to use human-readable slugs while maintaining fallback support for IDs.

## User Review Required

> [!IMPORTANT]
> This change will update URLs from `/services/[uuid]` to `/services/[slug]` (e.g., `/services/web-design`). Existing bookmarks using UUIDs will still work as a fallback.

## Proposed Changes

### Database & Backend
- No schema changes needed as the `services` table already has a `slug` column.
- The `getServiceById` server function already supports both ID and Slug lookup.

### Navigation & Components
- Update `src/components/Navbar.tsx` to use the `slug` property for service links instead of `id` or hardcoded paths.
- Audit and update other components that link to service details:
    - `src/pages/Services.tsx` (Service grid/list)
    - `src/components/HeroSection.tsx` (if applicable)
    - `src/components/AboutSection.tsx` (if applicable)

### Routing
- Update the `services.$id.tsx` route to correctly handle the `$id` parameter as either a slug or a UUID. (The current implementation in `src/routes/services.$id.tsx` already uses `getServiceById` which handles both).

## Technical Details

- **Navbar Update**: Modify the dynamic services fetch and the hardcoded `services` array in `Navbar.tsx` to prioritize `slug`.
- **Link Logic**: Use `service.slug || service.id` when generating URLs.
- **Verification**: Test navigation from the homepage, navbar mega-menu, and services index page to ensure URLs are clean.

## Constraints & Considerations
- Ensures SEO-friendly URLs.
- Maintains backward compatibility for any existing links using UUIDs.
