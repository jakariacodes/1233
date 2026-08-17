# Migration Fixes Plan

Fixing build errors and runtime issues following the TanStack Start migration.

## User Review Required
- **Admin Status:** I'm implementing a basic `isAdmin` check in `AuthContext.tsx` that looks for `is_admin: true` in user metadata. Please verify if your database uses a different mechanism (like a `user_roles` table).

## Proposed Changes

### Logic & Routing
- `src/components/GoogleAnalytics.tsx`: Fix runtime `TypeError` by ensuring script strings don't attempt to convert objects to primitives.
- `src/components/NavLink.tsx`: Fix missing `Link` import.
- `src/contexts/AuthContext.tsx`: Add `isAdmin` property to the context type and implementation.
- `src/components/ProtectedRoute.tsx`: Ensure it consumes the updated `AuthContext` with `isAdmin`.
- `src/integrations/supabase/client.ts`: Fix strict property access for environment variables.

### UI Components (Import & Type Fixes)
- `src/components/ui/command.tsx`, `src/components/ui/form.tsx`, `src/components/ui/sidebar.tsx`, `src/components/ui/toaster.tsx`, `src/components/ui/toggle-group.tsx`: Correct relative imports (e.g., `@/dialog` -> `@/components/ui/dialog`).
- `src/components/ui/context-menu.tsx`, `src/components/ui/dropdown-menu.tsx`, `src/components/ui/menubar.tsx`, `src/components/ui/sonner.tsx`: Fix `checked` and `theme` properties to be compatible with `exactOptionalPropertyTypes: true`.
- `src/components/ui/resizable.tsx`: Correct `react-resizable-panels` exports usage.
- `src/components/ui/input-otp.tsx`: Fix slot property access.
- `src/components/ui/chart.tsx`: Fix potential `undefined` access for tooltip items.

### Hooks & State
- `src/hooks/useBlogPosts.ts`, `src/hooks/useTeamMembers.ts`: Fix TypeScript errors where Supabase returns `null` for fields expected as `boolean` or `number`.
- `src/hooks/use-toast.ts`: Fix `toastId` type compatibility.

## Technical Details
- **Google Analytics Fix:** The error "Cannot convert object to primitive value" usually happens when an object is used in a template literal or string concatenation where a string is expected.
- **Strict Types:** The project uses `exactOptionalPropertyTypes: true`, which means `property?: type` cannot be assigned `undefined` explicitly. I will use conditional assignments.
- **Admin Check:** Defaulting to `user?.user_metadata?.is_admin` for the `isAdmin` flag.

## Verification Plan
1. Run `bun run build:dev` to ensure all TypeScript and build errors are resolved.
2. Check the browser console for the `TypeError` in `GoogleAnalytics.tsx`.
3. Verify protected admin routes still work as expected.
