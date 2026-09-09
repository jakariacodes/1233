import { createFileRoute } from '@tanstack/react-router';
import { HospitalManagementPage } from '@/pages/products/ProductPages';

export const Route = createFileRoute('/products/hospital-management')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'MedTrack Pro HMS | NextOnline LLC',
    meta: [{ name: 'description', content: 'Specialized hospital management systems for healthcare providers.' }],
  }),
  component: HospitalManagementPage,
});