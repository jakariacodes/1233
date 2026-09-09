import { createFileRoute } from '@tanstack/react-router';
import { DomainPage } from '@/pages/products/ProductPages';

export const Route = createFileRoute('/products/domain')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Domain Registration | NextOnline LLC',
    meta: [{ name: 'description', content: 'Secure your brand with premium domain names and WHOIS protection.' }],
  }),
  component: DomainPage,
});