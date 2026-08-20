import { createFileRoute } from '@tanstack/react-router';
import { WebTemplatesPage } from '@/pages/products/ProductPages';

export const Route = createFileRoute('/products/web-templates')({
  head: () => ({
    title: 'Web Templates | NextOnline Technology',
    meta: [{ name: 'description', content: 'Premium, ready-to-launch website skeletons for various industries.' }],
  }),
  component: WebTemplatesPage,
});