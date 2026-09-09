import { createFileRoute } from '@tanstack/react-router';
import Settings from '@/pages/admin/Settings';

export const Route = createFileRoute('/_authenticated/admin/settings')({
  staticData: { sitemap: false },
  component: Settings,
});