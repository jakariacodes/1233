import { createFileRoute } from '@tanstack/react-router';
import RefundPolicy from '@/pages/RefundPolicy';

export const Route = createFileRoute('/refund')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Refund Policy | InfraTech',
    meta: [
      { name: 'description', content: 'Review the InfraTech refund policy for digital services and projects.' },
      { property: 'og:title', content: 'Refund Policy | InfraTech' },
      { property: 'og:description', content: 'Review the InfraTech refund policy for digital services and projects.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: RefundPolicy,
});