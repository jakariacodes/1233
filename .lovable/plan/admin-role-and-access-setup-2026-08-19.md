# Admin Role and Access Setup

Provide instructions for the user to set up their admin account and clarify how to access the panel.

## Proposed Changes

### Database Setup
The user needs to manually assign themselves the admin role in the backend. I will provide the SQL snippet for this.

### Logic Verification
- The `AuthContext.tsx` already checks for the `admin` role in the `user_roles` table.
- The `Auth.tsx` page handles redirection based on the `isAdmin` flag.
- The `/admin` routes are protected by the `_authenticated` layout.

## Technical Details
- **Role System**: Uses the `user_roles` table (public schema).
- **Redirection**: `Auth.tsx` redirects `isAdmin` users to `/admin` and others to `/dashboard`.
- **SQL Execution**: The user must run the `INSERT` statement in the Supabase/Lovable Cloud backend SQL editor.

## Instructions for the User
1. Log in or create an account at `/auth`.
2. Open the Backend view.
3. Run the following SQL to grant admin access (replacing the placeholder with your User ID):
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin');
```
