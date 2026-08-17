import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useAuth } from '@/contexts/AuthContext';
import { AdminLayout } from '@/components/admin/AdminLayout';

export const Route = createFileRoute('/_authenticated/admin')({
  component: AdminComponent,
});

function AdminComponent() {
  const { isAdmin, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAdmin) {
    return <div>Access Denied. Admin privileges required.</div>;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
