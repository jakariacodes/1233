import { createFileRoute } from '@tanstack/react-router';
import Auth from '@/pages/Auth';

export const Route = createFileRoute('/auth')({
  staticData: { sitemap: false },
  head: () => ({
    title: 'Sign In | InfraTech',
    meta: [
      { name: 'description', content: 'Sign in to your InfraTech account.' },
      { property: 'og:title', content: 'Sign In | InfraTech' },
      { property: 'og:description', content: 'Sign in to your InfraTech account.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: Auth,
});