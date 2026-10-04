import { createFileRoute } from '@tanstack/react-router';
import About from '@/pages/About';

export const Route = createFileRoute('/about')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'About InfraTech | Global Digital Innovation',
    meta: [
      { name: 'description', content: 'Learn about InfraTech, our global digital services, values, journey, and commitment to business growth.' },
      { property: 'og:title', content: 'About InfraTech | Global Digital Innovation' },
      { property: 'og:description', content: 'Discover the team, values, and global vision behind InfraTech.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: About,
});