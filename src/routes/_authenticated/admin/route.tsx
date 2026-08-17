import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AdminLayout from '@/components/admin/AdminLayout';

export const Route = createFileRoute('/_authenticated/admin')({
  component: () => (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ),
});