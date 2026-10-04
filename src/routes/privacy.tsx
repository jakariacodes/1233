import { createFileRoute } from '@tanstack/react-router';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

export const Route = createFileRoute('/privacy')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Privacy Policy | InfraTech',
    meta: [
      { name: 'description', content: 'Learn how InfraTech collects, uses, and protects your information.' },
      { property: 'og:title', content: 'Privacy Policy | InfraTech' },
      { property: 'og:description', content: 'Learn how InfraTech collects, uses, and protects your information.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: PrivacyPolicy,
});