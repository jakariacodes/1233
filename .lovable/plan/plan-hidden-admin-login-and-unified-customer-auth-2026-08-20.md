# Plan - Hidden Admin Login and Unified Customer Auth

The user wants to separate Admin and Customer login experiences:
1. **Admin Login**: Must be "hidden" (not in the header). A new route `domain.com/admin/login` (or similar) will be used for admins to log in.
2. **Customer Auth**: The "Login" link in the header should lead to a unified portal where customers can log in or register if they don't have an account.

## User Review Required

> [!IMPORTANT]
> - I will create a dedicated `/admin-login` route that is not linked in the main navigation. This will be the only place for admins to log in specifically for administrative access.
> - The existing `/auth` route will be updated to include a "Register" toggle/section at the bottom, making it a complete portal for customers.

## Proposed Changes

### Routes & Components

#### [Navbar](src/components/Navbar.tsx)
- Keep the "Login" link but ensure it explicitly points to the customer-facing `/auth` route.
- Ensure no "Admin" links are visible unless the user is already authenticated as an admin.

#### [Auth Page](src/pages/Auth.tsx)
- Add a "Register Now" toggle at the bottom of the login form.
- Implement registration logic (linking to `AuthContext`'s `signUp`).
- Redesign the layout to handle both Login and Sign Up states gracefully.
- Include a "Forgot Password" link as requested.

#### [Admin Login Page](src/pages/AdminAuth.tsx) (New)
- Create a dedicated, minimalist login page for admins.
- This page will be accessible at `/admin-login`.
- It will only handle login and "Forgot Password".

#### [Admin Auth Route](src/routes/admin-login.tsx) (New)
- Register the new `/admin-login` route in TanStack Router.

#### [Auth Middleware](src/routes/_authenticated.tsx)
- Ensure the existing logic correctly redirects unauthenticated users to the correct login page based on their intended destination (though usually, they'll just go to `/auth` or `/admin-login` directly).
- If a user tries to access `/admin/*` without being logged in, they should be redirected to `/admin-login` instead of the general `/auth`.

### Security & Logic

#### [Auth Context](src/contexts/AuthContext.tsx)
- Add a `resetPassword` function to handle password recovery.

## Technical Details

- **Pill Menu Consistency**: Ensure the Navbar changes don't break the recently added pill-shaped design.
- **Admin Redirect Logic**: Update `src/routes/_authenticated.tsx` to differentiate between admin and customer redirection targets.

## Verification Plan

### Manual Verification
- Navigate to `/auth` and verify the Login/Register toggle works.
- Navigate to `/admin-login` and verify it's a standalone login page for admins.
- Try accessing `/admin` while logged out and ensure it redirects to `/admin-login`.
- Try accessing `/dashboard` while logged out and ensure it redirects to `/auth`.
- Verify the "Forgot Password" flow triggers the Supabase reset email (or at least logs the intent if not fully configured).
