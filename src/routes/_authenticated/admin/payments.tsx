import { createFileRoute } from '@tanstack/react-router';
import PaymentSettings from '@/pages/admin/PaymentSettings';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export const Route = createFileRoute('/_authenticated/admin/payments')({
  staticData: { sitemap: false },
  component: () => (
    <ProtectedRoute requireAdmin>
      <PaymentSettings />
    </ProtectedRoute>
  ),
});
