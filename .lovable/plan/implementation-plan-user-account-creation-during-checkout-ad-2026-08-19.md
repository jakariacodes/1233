# Implementation Plan - User Account Creation During Checkout & Admin Panel User Management

This plan outlines the steps to allow users to set up an email and password during checkout, which will automatically create a user profile. It also includes adding a user management section to the Admin Panel.

## User Flow
1.  **Checkout Process**:
    *   On the `/checkout` page, if the user is not logged in, they will be presented with fields for "Email" and "Password" (instead of just email in the current guest-like form).
    *   When the user submits the order, a Supabase account will be created (sign up) and the user will be logged in.
    *   The order will be linked to this new `user_id`.
    *   If the user is already logged in, the checkout form will pre-fill their details and omit the password field.

2.  **Admin Panel**:
    *   A new "Users" menu item will be added to the Admin Layout.
    *   A "User Management" page will be created where admins can see a list of registered users.

## Technical Details

### 1. Database & Security (RLS)
*   The `profiles` table already exists. We need to ensure it triggers on user creation or is manually updated during checkout.
*   We will verify `user_roles` to ensure admins can see all profiles.

### 2. Frontend Changes
*   **`src/pages/Checkout.tsx` & `src/components/checkout/CheckoutForm.tsx`**:
    *   Modify `formData` to include `password`.
    *   Update UI to show password field if `!user`.
    *   Update `handleSubmit` to call `signUp` from `AuthContext` if the user is not authenticated before creating the order.
*   **`src/contexts/AuthContext.tsx`**:
    *   Ensure `signUp` correctly handles profile creation (metadata like `full_name`).
*   **`src/components/admin/AdminLayout.tsx`**:
    *   Add a link to `/admin/users` with a `Users` icon.
*   **`src/pages/admin/UserManagement.tsx` (New Page)**:
    *   Create a table/grid to list users from the `profiles` table.
    *   Add a route for it in `src/routes/_authenticated/admin/users.tsx`.

### 3. Server Functions / Hooks
*   `createOrder` in `src/lib/services.functions.ts` already takes `userId`. We will ensure it's passed correctly after `signUp`.
*   Create a new hook `useUsers.ts` to fetch user profiles for the admin panel.

## Implementation Steps

### Phase 1: Checkout & Auth
1.  Update `AuthContext.tsx` to ensure `signUp` is robust.
2.  Modify `CheckoutForm.tsx` to include password input for guests.
3.  Update `Checkout.tsx` logic to perform `signUp` before `createOrder`.

### Phase 2: Admin Panel
1.  Add "Users" to `AdminLayout.tsx` navigation.
2.  Create `src/pages/admin/UserManagement.tsx`.
3.  Add the route `src/routes/_authenticated/admin/users.tsx`.
4.  Implement `useUsers.ts` hook.

### Phase 3: Validation
1.  Test checkout with a new email/password -> verify user creation in backend.
2.  Test checkout with existing user -> verify no password field and correct order linking.
3.  Verify Admin Panel shows the new user in the list.
