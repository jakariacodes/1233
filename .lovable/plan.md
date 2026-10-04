# Plan: Complete the New InfraTech Admin Login

The new administrator account will use Lovable Cloud’s secure authentication; passwords will not be stored in a separate database table.

## Changes
- Add a public password-setup page for invitation and password-reset links.
- Let the invited administrator choose their own password securely.
- Send the password-setup email to `info@InfraGlobalTech.com` after the page is ready.
- Keep administrator authorization in the separate `user_roles` table.
- Verify sign-in redirects the administrator to the existing Admin Panel.

## Technical details
- Use the existing InfraTech authentication context and Cloud auth service.
- Handle recovery/invitation sessions, validate the new password, and call the secure password update API.
- Add unique page metadata for the new password page.

## Verification
- Confirm the new page renders correctly.
- Confirm the app builds without errors.
- Confirm the account has the `admin` role and can reach `/admin` after sign-in.
