import { createFileRoute } from '@tanstack/react-router';
import LicensePage from '@/pages/License';

export const Route = createFileRoute('/license')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Licenses & Registrations | InfraTech',
    meta: [
      { name: 'description', content: 'Review InfraTech business licenses and registration information.' },
      { property: 'og:title', content: 'Licenses & Registrations | InfraTech' },
      { property: 'og:description', content: 'InfraTech business licenses and registration information.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: LicensePage,
});
