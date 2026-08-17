import { createFileRoute } from '@tanstack/react-router';
import BlogEditor from '@/pages/admin/BlogEditor';

export const Route = createFileRoute('/_authenticated/admin/blog/editor')({
  component: BlogEditor,
});
