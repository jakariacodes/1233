import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AdminLayout from '@/components/admin/AdminLayout';

export const Route = createFileRoute('/_authenticated/admin')({
  staticData: { sitemap: false },
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});