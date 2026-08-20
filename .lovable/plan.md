# Plan - Relax Password Complexity Requirements

The user wants to allow simple passwords (like "1234") for customer accounts created during checkout and general login/signup. They specifically requested that passwords do not need to be strong, allowing random or simple strings for easier access.

## Proposed Changes

### Backend Configuration
- Configure Supabase Auth to disable HIBP (Have I Been Pwned) password checks to allow simpler/common passwords.

### Frontend Validation
- Update `src/pages/Auth.tsx` to remove the 6-character minimum requirement for passwords in both login and signup Zod schemas.
- Update `src/pages/AdminAuth.tsx` to remove the 6-character minimum requirement for admin login (to maintain consistency, though the user focused on checkout/orders).
- Update `src/pages/Checkout.tsx` to remove any manual validation checks for password length before submitting the signup request.

## Technical Details
- **Auth Config**: Use `supabase--configure_auth` with `password_hibp_enabled: false`.
- **Validation**: Remove `.min(6, ...)` from Zod schemas and any other custom password length checks.

## User Review Required
> [!IMPORTANT]
> Disabling password complexity requirements and HIBP checks reduces the security of user accounts. While this makes it easier for customers to place orders, it also makes their accounts more vulnerable to brute-force or credential-stuffing attacks.
