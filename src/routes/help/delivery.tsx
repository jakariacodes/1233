import { createFileRoute } from '@tanstack/react-router';
import { DeliveryHelp } from '@/pages/help/HelpPages';

export const Route = createFileRoute('/help/delivery')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Delivery & Handover | NextOnline LLC',
    meta: [{ name: 'description', content: 'Learn about our digital asset delivery process and project handover stages.' }],
  }),
  component: DeliveryHelp,
});