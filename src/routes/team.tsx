import { createFileRoute } from '@tanstack/react-router';
import Team from '@/pages/Team';

export const Route = createFileRoute('/team')({
  head: () => ({
    title: 'Our Team | NextOnline LLC',
    meta: [
      {
        name: 'description',
        content: 'Meet the experts behind NextOnline LLC — a dedicated team of creative minds, developers, and strategists delivering exceptional digital solutions worldwide.',
      },
      { property: 'og:title', content: 'Our Team | NextOnline LLC' },
      {
        property: 'og:description',
        content: 'Meet the talented professionals driving digital innovation at NextOnline LLC.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Team,
});
