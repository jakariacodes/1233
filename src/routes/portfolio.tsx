import { createFileRoute } from '@tanstack/react-router';
import Portfolio from '@/pages/Portfolio';

export const Route = createFileRoute('/portfolio')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Our Work | InfraTech Portfolio',
    meta: [
      { name: 'description', content: 'Explore selected websites, digital products, and creative work delivered by InfraTech.' },
      { property: 'og:title', content: 'Our Work | InfraTech Portfolio' },
      { property: 'og:description', content: 'Explore selected websites, digital products, and creative work delivered by InfraTech.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Portfolio,
});