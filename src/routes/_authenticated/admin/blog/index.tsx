import { createFileRoute } from '@tanstack/react-router';
import BlogManagement from '@/pages/admin/BlogManagement';

export const Route = createFileRoute('/_authenticated/admin/blog/')({
  component: BlogManagement,
});