import { createFileRoute } from '@tanstack/react-router';
import { DeliveryHelp } from '@/pages/help/HelpPages';

export const Route = createFileRoute('/help/delivery')({
  head: () => ({
    title: 'Delivery & Handover | NextOnline Technology',
    meta: [{ name: 'description', content: 'Learn about our digital asset delivery process and project handover stages.' }],
  }),
  component: DeliveryHelp,
});