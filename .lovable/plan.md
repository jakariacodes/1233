# Plan - Redesign Footer Links Layout

Update the footer link structure to match the user's specific requested order: Services, Products, Help, Insights.

## Technical Details

- Modify `src/components/Footer.tsx`:
    - Reorder the `footerSections` array.
    - 1st position: Services.
    - 2nd position: Products.
    - 3rd position: Help.
    - 4th position: Insights.
- No changes to link content or styling, just the order of the columns.

## User Review Required

> [!IMPORTANT]
> This will change the order of columns in the footer links grid.
