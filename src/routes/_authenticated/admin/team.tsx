import { createFileRoute } from '@tanstack/react-router';
import TeamManagement from '@/pages/admin/TeamManagement';

export const Route = createFileRoute('/_authenticated/admin/team')({
  component: TeamManagement,
});
