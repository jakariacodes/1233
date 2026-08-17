import { createFileRoute } from '@tanstack/react-router';
import Dashboard from '@/pages/admin/Dashboard';

export const Route = createFileRoute('/_authenticated/admin/')({
  component: Dashboard,
});