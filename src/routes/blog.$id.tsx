import { createFileRoute } from '@tanstack/react-router';
import BlogPost from '@/pages/BlogPost';

export const Route = createFileRoute('/blog/$id')({
  staticData: { sitemap: true },
  head: ({ params }) => ({
    title: `${params.id.replaceAll('-', ' ')} | InfraTech Insights`,
    meta: [
      { name: 'description', content: 'Read this digital technology insight from InfraTech.' },
      { property: 'og:title', content: `${params.id.replaceAll('-', ' ')} | InfraTech Insights` },
      { property: 'og:description', content: 'Practical digital technology insights from InfraTech.' },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: BlogPost,
});