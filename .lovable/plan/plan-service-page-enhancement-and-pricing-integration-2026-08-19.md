# Plan - Service Page Enhancement and Pricing Integration

Enhance the Services page with dynamic hero content and integrate pricing/checkout across the site.

## Proposed Changes

### 1. Services Page (`src/pages/Services.tsx`)
- Update the Hero section to dynamically render all active services from the database.
- Redesign the service boxes in the hero for a premium "step-by-step" or "pixel perfect" look.
- Add pricing tables/packages for each service directly on the Services index page to allow direct ordering.
- Ensure "Order Now" buttons pass `serviceId` and `packageId` to the `/checkout` route.

### 2. Homepage Pricing (`src/components/PricingSection.tsx`)
- Update the `tiers` or dynamic pricing to link to the `/checkout` page.
- Since the homepage currently uses static `tiers`, I will check if these correspond to actual database services/packages and link them accordingly, or keep them as general starters that lead to contact/checkout.

### 3. Service Detail (`src/pages/ServiceDetail.tsx`)
- Verify the existing checkout link is working correctly (it seems to be, but will ensure consistency).

## Technical Details
- Use `useLoaderData` in `Services.tsx` to access all services and their packages.
- Implement a reusable `PricingCard` or similar component to maintain visual consistency between `ServiceDetail` and `Services` index.
- Use `@tanstack/react-router`'s `useNavigate` for programmatic navigation to checkout.

## Verification Plan
- Navigate to `/services` and verify the hero shows all active database services.
- Click "Order Now" on a service package and verify it redirects to `/checkout` with the correct query parameters.
- Verify the homepage pricing "Get Started" buttons now lead to the checkout flow.
