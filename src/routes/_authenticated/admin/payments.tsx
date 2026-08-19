import { createFileRoute } from '@tanstack/react-router';
import PaymentSettings from '@/pages/admin/PaymentSettings';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export const Route = createFileRoute('/_authenticated/admin/payments')({
  component: () => (
    <ProtectedRoute requireAdmin>
      <PaymentSettings />
    </ProtectedRoute>
  ),
});
