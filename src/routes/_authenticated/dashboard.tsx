import { createFileRoute } from '@tanstack/react-router';
import UserDashboard from '@/pages/UserDashboard';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: UserDashboard,
});
