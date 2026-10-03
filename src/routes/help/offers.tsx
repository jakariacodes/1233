import { createFileRoute } from '@tanstack/react-router';
import { OffersCampaigns } from '@/pages/help/HelpSupportPages';

export const Route = createFileRoute('/help/offers')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Offers & Campaigns | InfraTech',
    meta: [{ name: 'description', content: 'Explore latest promotions, discounts, and innovation grants for startups.' }],
  }),
  component: OffersCampaigns,
});