import { createFileRoute } from '@tanstack/react-router';
import LicensePage from '@/pages/License';

export const Route = createFileRoute('/license')({
  staticData: { sitemap: true },
  component: LicensePage,
});
