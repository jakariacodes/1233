import { createFileRoute } from '@tanstack/react-router';
import { HostingPage } from '@/pages/products/ProductPages';

export const Route = createFileRoute('/products/hosting')({
  head: () => ({
    title: 'Managed Hosting | NextOnline LLC',
    meta: [{ name: 'description', content: 'High-performance cloud hosting for web applications and websites.' }],
  }),
  component: HostingPage,
});