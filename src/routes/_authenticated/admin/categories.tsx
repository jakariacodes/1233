import { createFileRoute } from '@tanstack/react-router';
import CategoryManagement from '@/pages/admin/CategoryManagement';

export const Route = createFileRoute('/_authenticated/admin/categories')({
  staticData: { sitemap: false },
  component: CategoryManagement,
});