import { createFileRoute } from '@tanstack/react-router';
import { ModulexaPage } from '@/pages/products/ProductPages';

export const Route = createFileRoute('/products/modulexa')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Modulexa ERP | InfraTech',
    meta: [{ name: 'description', content: 'Modular enterprise resource planning solution for modern businesses.' }],
  }),
  component: ModulexaPage,
});