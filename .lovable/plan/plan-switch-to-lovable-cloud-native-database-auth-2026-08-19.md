# Plan: Switch to Lovable Cloud (Native Database & Auth)

The project currently uses a manual Supabase integration. This plan details the steps to transition to **Lovable Cloud**, which provides a managed Supabase backend integrated directly with the platform's features (Auth, RLS, Edge Functions).

## Proposed Changes

### 1. Database & Schema Configuration
- Ensure all existing tables (`services`, `service_packages`, `orders`, `blog_posts`, `blog_categories`, `portfolios`, `team_members`, `site_settings`, `profiles`, `user_roles`) are managed via Lovable Cloud's SQL migration system.
- Verify and apply Row Level Security (RLS) policies and `GRANT` statements to the `public` schema for all tables.

### 2. Authentication Refactoring
- Refactor `src/contexts/AuthContext.tsx` to use the standardized Lovable Cloud auth flow.
- Ensure the `user_roles` check remains secure, using the `has_role` security definer function.
- Verify `src/routes/_authenticated.tsx` correctly gates access based on the new auth context.

### 3. Client Integration
- Update all hooks and components to use the standard `@/integrations/supabase/client` provided by the Lovable integration.
- Remove manual `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` dependencies where they conflict with the managed environment.

### 4. Server Function Security
- Update `createServerFn` handlers to use `.middleware([requireSupabaseAuth])` where authentication is required (e.g., `createOrder`, admin management).
- Ensure `src/start.ts` is configured with `attachSupabaseAuth` middleware for the client-side router.

## Technical Details

- **Database**: PostgreSQL via Lovable Cloud (Supabase).
- **Auth**: Supabase Auth (managed).
- **Client**: `@supabase/supabase-js`.
- **Server**: TanStack Start `createServerFn`.

## Security Considerations

- All public tables MUST have `GRANT` statements to `authenticated` or `anon` as appropriate.
- Admin roles will be verified via the `user_roles` table and the `has_role` function to prevent recursive RLS issues.
- Sensitive operations in server functions will be protected by `requireSupabaseAuth` middleware.

