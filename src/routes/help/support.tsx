import { createFileRoute } from '@tanstack/react-router';
import { SupportHub } from '@/pages/help/HelpSupportPages';

export const Route = createFileRoute('/help/support')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Support Hub | NextOnline LLC',
    meta: [{ name: 'description', content: 'Contact NextOnline support via live chat or email for project assistance.' }],
  }),
  component: SupportHub,
});