import { createFileRoute } from '@tanstack/react-router';
import UserManagement from '@/pages/admin/UserManagement';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export const Route = createFileRoute('/_authenticated/admin/users')({
  staticData: { sitemap: false },
  component: () => (
    <ProtectedRoute requireAdmin>
      <UserManagement />
    </ProtectedRoute>
  ),
});