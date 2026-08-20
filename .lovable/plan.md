---
name: Footer Redesign & Page Creation
description: Overhaul the footer to match the user's reference and create all missing content pages for Help, Products, and Insights.
type: feature
---

## Footer Redesign
- Remove "Industries" section.
- Implement 4-column layout: Help, Products, Services, Insights.
- Categorize links exactly as requested:
  - **Help**: Payment, Delivery, Chat with us, Technical issue, Offers & Campaigns, Next Online Support.
  - **Products**: Modulexa, Domain, Hosting, Business Management, Hospital Management, Web Template.
  - **Services**: Custom Software, Web Design & Development, SEO Optimization, Graphic Design, Digital Marketing.
  - **Insights**: About Us, Our Team, Case Studies, Career, Blog, News.
- Design style:
  - Text color: `#FFFFFF` for pure white links.
  - Headings: Bold, uppercase, spaced tracking.
  - Social icons and logo preserved in the top bar.
  - Address blocks preserved for UK, USA, and Bangladesh.
  - Pure white text for better contrast on the dark background.

## Page Creation
For every new link in the footer, create a dedicated route and page with relevant content:

### Help Section
- `/help/payment`: Explains accepted payment methods (Card, PayPal, Bank, Crypto).
- `/help/delivery`: Describes service delivery timelines and digital handovers.
- `/help/support`: Central support hub with "Chat with us" and contact options.
- `/help/technical-issue`: Support ticket/form for technical reporting.
- `/help/offers`: Current promotions and campaign details.

### Products Section
- `/products/modulexa`: Showcase for the flagship product.
- `/products/domain`: Domain registration services page.
- `/products/hosting`: Hosting packages and infrastructure details.
- `/products/business-management`: ERP/Business solution details.
- `/products/hospital-management`: Specialized healthcare software solution.
- `/products/web-templates`: Showcase of pre-built website templates.

### Insights Section
- `/insights/case-studies`: Redirects/points to the existing Portfolio.
- `/insights/news`: Latest company news (integrated with Blog).

## Technical Implementation
- Routes created using TanStack File Routes under `src/routes/help/`, `src/routes/products/`, etc.
- Components created in `src/pages/help/`, `src/pages/products/`, etc.
- UI will follow the established "NextOnline" premium aesthetic (Space Grotesk for headings, Plus Jakarta Sans for body).
- Footer text color will be force-set to `#FFFFFF` using Tailwind utility classes.
