import { createFileRoute } from '@tanstack/react-router';
import ServiceManagement from '@/pages/admin/ServiceManagement';

export const Route = createFileRoute('/_authenticated/admin/services')({
  component: ServiceManagement,
});
