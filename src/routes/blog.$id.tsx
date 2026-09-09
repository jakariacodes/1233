import { createFileRoute } from '@tanstack/react-router';
import BlogPost from '@/pages/BlogPost';

export const Route = createFileRoute('/blog/$id')({
  staticData: { sitemap: true },
  component: BlogPost,
});