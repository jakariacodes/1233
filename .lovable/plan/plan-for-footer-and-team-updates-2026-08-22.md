# Plan for Footer and Team Updates

Updating the footer tagline, copyright, team leadership, and licensing links as requested.

## User-facing changes
- **Footer Tagline Removal**: Removed the repetitive tagline from the bottom-left of the footer.
- **Footer Copyright Update**: Centered the copyright notice in the left area of the bottom footer as requested.
- **Team CEO Update**: Updated the CEO & Founder name to **Mehedi Hasan**.
- **Insights Menu Update**: Replaced "Case Studies" with "All License" in the footer's Insights section.

## Technical details
- **src/components/Footer.tsx**:
    - Update `footerSections` to replace "Case Studies" with "All License" pointing to `/license`.
    - Remove the tagline paragraph in the lower footer area.
    - Reposition the copyright `<p>` tag to the left column of the lower footer.
- **Team Leadership Update**:
    - Execute a SQL statement to update the `team_members` table where role is 'CEO & Founder' to change the name to 'Mehedi Hasan'.
    - Update `src/pages/Team.tsx` or `src/components/TeamSection.tsx` if hardcoded fallback exists.
- **Verification**:
    - Verify footer links and layout in the preview.
    - Check the Team page to confirm the CEO name update.
