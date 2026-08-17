# Migration Plan - TechCrafterIT

Migrating the uploaded Vite + React SPA project to TanStack Start v1.

## Proposed Changes

### Core Infrastructure
- Update `src/styles.css` with custom fonts (Plus Jakarta Sans, Space Grotesk), CSS variables, and animations from the source `index.css`.
- Update `src/routes/__root.tsx` to include `AuthProvider`, `Toaster` (sonner), and `GoogleAnalytics`.
- Implement `AuthContext` in a TanStack Start friendly way (moving it to `src/contexts/AuthContext.tsx` or similar).

### Components & Hooks
- Copy and adapt all UI components from `src/components/` and `src/components/ui/`.
- Migrate custom hooks (`useBlogPosts`, `usePortfolios`, `useTeamMembers`, etc.) to `src/hooks/`.
- Copy utility functions and validation schemas to `src/lib/`.

### Routing (Mapping source pages to TanStack routes)
- `src/pages/Index.tsx` -> `src/routes/index.tsx`
- `src/pages/About.tsx` -> `src/routes/about.tsx`
- `src/pages/Services.tsx` -> `src/routes/services/index.tsx`
- `src/pages/ServiceDetail.tsx` -> `src/routes/services/$serviceId.tsx`
- `src/pages/Portfolio.tsx` -> `src/routes/portfolio.tsx`
- `src/pages/Team.tsx` -> `src/routes/team.tsx`
- `src/pages/Blog.tsx` -> `src/routes/blog/index.tsx`
- `src/pages/BlogPost.tsx` -> `src/routes/blog/$slug.tsx`
- `src/pages/Contact.tsx` -> `src/routes/contact.tsx`
- `src/pages/Auth.tsx` -> `src/routes/auth.tsx`
- `src/pages/Careers.tsx` -> `src/routes/careers.tsx`
- `src/pages/PrivacyPolicy.tsx` -> `src/routes/privacy.tsx`
- `src/pages/TermsOfService.tsx` -> `src/routes/terms.tsx`
- `src/pages/RefundPolicy.tsx` -> `src/routes/refund.tsx`

### Admin Dashboard (Protected Routes)
- Create a pathless layout `src/routes/_authenticated` for admin protection.
- Migrate admin pages:
    - `src/pages/admin/Dashboard.tsx` -> `src/routes/_authenticated/admin/dashboard.tsx` (redirect /admin here)
    - `src/pages/admin/BlogManagement.tsx` -> `src/routes/_authenticated/admin/blog/index.tsx`
    - `src/pages/admin/BlogEditor.tsx` -> `src/routes/_authenticated/admin/blog/$id.tsx` and `src/routes/_authenticated/admin/blog/new.tsx`
    - `src/pages/admin/CategoryManagement.tsx` -> `src/routes/_authenticated/admin/categories.tsx`
    - `src/pages/admin/ContactMessages.tsx` -> `src/routes/_authenticated/admin/messages.tsx`
    - `src/pages/admin/OrderManagement.tsx` -> `src/routes/_authenticated/admin/orders.tsx`
    - `src/pages/admin/PortfolioManagement.tsx` -> `src/routes/_authenticated/admin/portfolio.tsx`
    - `src/pages/admin/TeamManagement.tsx` -> `src/routes/_authenticated/admin/team.tsx`
    - `src/pages/admin/Settings.tsx` -> `src/routes/_authenticated/admin/settings.tsx`

## Technical Details
- Replacing `react-router-dom` hooks (`useLocation`, `useParams`, `useNavigate`, `Link`) with `@tanstack/react-router` equivalents.
- Ensuring `Helmet` is replaced by TanStack Router's `head()` or correctly integrated.
- Handling Supabase client integration within the server/client boundary rules.
- Moving assets to the correct public/src paths.

## Next Steps
1. Initialize the directory structure.
2. Migration of styles and root layout.
3. Batch migration of shared components and hooks.
4. Systematic migration of individual routes.
