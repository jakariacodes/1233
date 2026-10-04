import { createFileRoute } from '@tanstack/react-router';
import Team from '@/pages/Team';

export const Route = createFileRoute('/team')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Our Team | InfraTech',
    meta: [
      {
        name: 'description',
        content: 'Meet the experts behind InfraTech — a dedicated team of creative minds, developers, and strategists delivering exceptional digital solutions globally.',
      },
      { property: 'og:title', content: 'Our Team | InfraTech' },
      {
        property: 'og:description',
        content: 'Meet the talented professionals driving digital innovation at InfraTech.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Team,
});
