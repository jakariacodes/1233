# Plan: Add Services and Packages from Reference

The user wants to add specific services and their pricing packages (including images) to the website. Based on the provided screenshot, I will add these services to the database so they appear dynamically on the site.

## Proposed Changes

### Database Seeding
- Create a migration to insert the following services and their packages into the `services` and `service_packages` tables:
    1.  **Web Design**: Stunning responsive websites
    2.  **Web Development**: Scalable web applications
    3.  **Graphic Design**: Eye-catching brand visuals
    4.  **Video Editing**: Cinematic video production
    5.  **Digital Marketing**: ROI-driven campaigns
    6.  **SEO Optimization**: Dominate search rankings
    7.  **Business Strategy**: Expert digital consulting
    8.  **AI Solutions**: AI-powered automation

### Implementation Details
- For each service, I will:
    - Assign an appropriate Lucide icon name (e.g., `Globe`, `Code2`, `Palette`, `Video`, `TrendingUp`, `Search`, `Briefcase`, `Zap`).
    - Create three standard packages (Basic, Standard, Premium) with realistic prices in BDT (৳) to match the existing currency setting.
    - Set default features for each package based on industry standards for these services.
- I will use the established migration pattern and `supabase--migration` tool to ensure data persistence.

## Technical Details
- **Tables affected**: `public.services`, `public.service_packages`.
- **Icons**: Mapping text descriptions to Lucide icon components used in `src/pages/Services.tsx`.
- **Pricing**: Estimating prices in BDT (e.g., 5,000 to 50,000 range) to ensure the UI looks "ready to order".

## Verification Plan
- **Preview Check**: Navigate to `/services` to verify all 8 services are listed with their correct titles and subtitles.
- **Detail Check**: Click on a service to verify that the pricing packages (Basic, Standard, Premium) are rendered correctly with their features and "Order Now" buttons.
- **Admin Check**: Verify that these new services appear in the Admin Service Management panel for future editing.
