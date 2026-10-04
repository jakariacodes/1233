import { createFileRoute } from '@tanstack/react-router';
import Careers from '@/pages/Careers';

export const Route = createFileRoute('/careers')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Careers | InfraTech',
    meta: [
      { name: 'description', content: 'Explore career opportunities and grow with the InfraTech team.' },
      { property: 'og:title', content: 'Careers | InfraTech' },
      { property: 'og:description', content: 'Explore career opportunities and grow with the InfraTech team.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Careers,
});