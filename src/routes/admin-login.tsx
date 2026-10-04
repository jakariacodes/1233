import { createFileRoute } from '@tanstack/react-router';
import AdminAuth from '@/pages/AdminAuth';

export const Route = createFileRoute('/admin-login')({
  staticData: { sitemap: false },
  head: () => ({
    title: 'Admin Sign In | InfraTech',
    meta: [
      { name: 'description', content: 'Secure InfraTech administrator sign-in.' },
      { property: 'og:title', content: 'Admin Sign In | InfraTech' },
      { property: 'og:description', content: 'Secure InfraTech administrator sign-in.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: AdminAuth,
});