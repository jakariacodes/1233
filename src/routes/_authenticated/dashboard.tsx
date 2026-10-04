import { createFileRoute } from '@tanstack/react-router';
import UserDashboard from '@/pages/UserDashboard';

export const Route = createFileRoute('/_authenticated/dashboard')({
  staticData: { sitemap: false },
  head: () => ({
    title: 'Customer Dashboard | InfraTech',
    meta: [
      { name: 'description', content: 'Manage your InfraTech orders, invoices, and account.' },
      { property: 'og:title', content: 'Customer Dashboard | InfraTech' },
      { property: 'og:description', content: 'Manage your InfraTech orders, invoices, and account.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: UserDashboard,
});
