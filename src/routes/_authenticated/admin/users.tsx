import { createFileRoute } from '@tanstack/react-router';
import UserManagement from '@/pages/admin/UserManagement';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export const Route = createFileRoute('/_authenticated/admin/users')({
  component: () => (
    <ProtectedRoute requireAdmin>
      <UserManagement />
    </ProtectedRoute>
  ),
});