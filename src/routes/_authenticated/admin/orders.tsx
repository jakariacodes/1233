import { createFileRoute } from '@tanstack/react-router';
import OrderManagement from '@/pages/admin/OrderManagement';

export const Route = createFileRoute('/_authenticated/admin/orders')({
  component: OrderManagement,
});
