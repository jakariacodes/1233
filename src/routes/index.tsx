import { createFileRoute } from '@tanstack/react-router';
import IndexPage from '@/pages/Index';

export const Route = createFileRoute('/')({
  head: () => ({
    title: 'NextOnline Technology | Premier Digital Agency & IT Solutions',
    meta: [
      {
        name: 'description',
        content: 'NextOnline Technology is a leading digital agency in Bangladesh providing web development, mobile apps, and premium IT solutions.',
      },
      {
        property: 'og:title',
        content: 'NextOnline Technology | Premier Digital Agency & IT Solutions',
      },
      {
        property: 'og:description',
        content: 'Revolutionizing the digital landscape with premium technology solutions and AI-powered platforms.',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  }),
  component: IndexPage,
});
