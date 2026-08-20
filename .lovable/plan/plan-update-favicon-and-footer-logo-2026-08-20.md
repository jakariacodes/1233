# Plan: Update Favicon and Footer Logo

Update the application's favicon and the footer logo with the newly provided assets.

## Proposed Changes

### Assets
- **Favicon**: Replace `public/favicon.png` with the content of `user-uploads://febicon.png`.
- **Footer Logo**: Replace `src/assets/logo-footer.png.asset.json` with a new asset pointer created from `user-uploads://ewfrsdfwae.png`.

### Implementation Steps
1. **Favicon**:
   - Use `cp /mnt/user-uploads/febicon.png public/favicon.png` to replace the existing favicon.
2. **Footer Logo**:
   - Create a new asset pointer using `lovable-assets create --file /mnt/user-uploads/ewfrsdfwae.png --filename logo-footer.png > src/assets/logo-footer.png.asset.json`.

## Verification Plan
- **Favicon**: Refresh the preview and check the browser tab for the updated icon.
- **Footer Logo**: Inspect the footer section to ensure the new logo `ewfrsdfwae.png` is displayed correctly.
