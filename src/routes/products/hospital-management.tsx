import { createFileRoute } from '@tanstack/react-router';
import { HospitalManagementPage } from '@/pages/products/ProductPages';

export const Route = createFileRoute('/products/hospital-management')({
  head: () => ({
    title: 'MedTrack Pro HMS | NextOnline Technology',
    meta: [{ name: 'description', content: 'Specialized hospital management systems for healthcare providers.' }],
  }),
  component: HospitalManagementPage,
});