import { createFileRoute } from '@tanstack/react-router';
import TermsOfService from '@/pages/TermsOfService';

export const Route = createFileRoute('/terms')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Terms of Service | InfraTech',
    meta: [
      { name: 'description', content: 'Review the terms governing InfraTech digital services and projects.' },
      { property: 'og:title', content: 'Terms of Service | InfraTech' },
      { property: 'og:description', content: 'Review the terms governing InfraTech digital services and projects.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: TermsOfService,
});