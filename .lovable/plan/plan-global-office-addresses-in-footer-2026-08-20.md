# Plan: Global Office Addresses in Footer

Update the footer to display the company's official global addresses (UK, USA, and Bangladesh) with a premium, smart design featuring location icons/flags.

## Proposed Changes

### Components
#### [Footer.tsx](src/components/Footer.tsx)
- Reorganize the address section to use a structured grid similar to the reference image.
- Add flag icons or stylized markers for each region.
- Update the address text for:
    - **UK Office**: NEXT ONLINE GLOBAL LTD, 20-22 WENLOCK ROAD, LONDON, ENGLAND, N1 7GU UK.
    - **USA Office**: Next Online LLC, 1209 Mountain Road Pl NE, Ste N, Albuquerque, NM, 87110 USA.
    - **Bangladesh Office**: Next Online Technology, 1505/13, 37 Bir Uttam C R Dotto Road, Nahar Plaza, Ramana, Dhaka-1000, Bangladesh.
- Ensure the layout is responsive and maintains high visual contrast (bright white text on dark background).
- Refine the social icons and contact info alignment to match the "smart and premium" aesthetic.

## Technical Details
- Use `lucide-react` for generic icons if specific flags aren't available as SVG components, or use emoji flags for simplicity and high visibility as seen in the current implementation.
- Apply Tailwind utility classes for the multi-column layout (`grid-cols-1 md:grid-cols-3` etc.).
- Maintain the existing color palette (`bg-[#011612]` and primary accents).

## Verification Plan
- Check the footer on mobile and desktop viewports to ensure the address grid wraps correctly.
- Verify text accuracy for all three addresses.
- Confirm that links and contact buttons remain functional.
