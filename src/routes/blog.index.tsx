import { createFileRoute } from '@tanstack/react-router';
import Blog from '@/pages/Blog';

export const Route = createFileRoute('/blog/')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Digital Insights & News | InfraTech',
    meta: [
      { name: 'description', content: 'Read InfraTech insights on web technology, design, marketing, SEO, and digital growth.' },
      { property: 'og:title', content: 'Digital Insights & News | InfraTech' },
      { property: 'og:description', content: 'Expert insights for building and growing successful digital products.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Blog,
});