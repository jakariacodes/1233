import { createFileRoute } from '@tanstack/react-router';
import { BusinessManagementPage } from '@/pages/products/ProductPages';

export const Route = createFileRoute('/products/business-management')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Business Manager | NextOnline LLC',
    meta: [{ name: 'description', content: 'Integrated ERP and CRM solutions for scaling your business operations.' }],
  }),
  component: BusinessManagementPage,
});