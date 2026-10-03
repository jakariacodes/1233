import { createFileRoute } from '@tanstack/react-router';
import Contact from '@/pages/Contact';

export const Route = createFileRoute('/contact')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Contact InfraTech | Digital Solutions',
    meta: [
      { name: 'description', content: 'Contact InfraTech for digital services from our Dhaka and New York offices.' },
      { property: 'og:title', content: 'Contact InfraTech | Digital Solutions' },
      { property: 'og:description', content: 'Contact InfraTech for digital services from our Dhaka and New York offices.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Contact,
});