# Plan - Add Rounded Pill Background to Navbar Menu

The user wants the desktop navigation menu to have a rounded pill-shaped background, matching a provided reference image.

## User Review Required

> [!IMPORTANT]
> The navigation menu will be updated to include a glassmorphic pill-shaped container for the main links. The "Contact" link will be transformed into a primary button at the end of this pill.

## Proposed Changes

### Components

#### [Navbar](src/components/Navbar.tsx)
- Update the desktop menu container to have a rounded pill design (`rounded-full`).
- Add a subtle background (`bg-slate-50/80`), backdrop blur, and soft shadow to the pill.
- Re-style the "Contact" link as a blue button within the pill.
- Ensure the "Login" and "Get Started" buttons remain on the far right outside the pill.
- Adjust spacing and alignment to match the reference image's layout.

## Technical Details

- **Pill Container Styling**: Using Tailwind classes like `bg-slate-50/80 backdrop-blur-sm border border-slate-200/50 rounded-full px-2 py-1 shadow-lg shadow-slate-200/20`.
- **Contact Button**: Styling the last item in the nav links array specifically as a button while keeping its semantic link behavior.
- **Responsiveness**: Maintaining the existing mobile menu behavior while applying the new design only to the desktop view.

## Verification Plan

### Manual Verification
- Inspect the desktop view to ensure the pill menu is centered/positioned correctly between the logo and right-side actions.
- Verify the "Contact" button styling matches the "Get Started" button but resides inside the pill.
- Check that the hover states and mega menu still work as expected.
- Verify mobile menu remains functional and unaffected by the desktop pill styling.
