import { createFileRoute } from '@tanstack/react-router';
import ServiceDetail from '@/pages/ServiceDetail';
import { getServiceById } from '@/lib/services.functions';

export const Route = createFileRoute('/services/$id')({
  staticData: { sitemap: true },
  head: ({ params }) => ({
    title: `${params.id.replaceAll('-', ' ')} Services | InfraTech`,
    meta: [
      { name: 'description', content: 'Explore this professional digital service from InfraTech.' },
      { property: 'og:title', content: `${params.id.replaceAll('-', ' ')} Services | InfraTech` },
      { property: 'og:description', content: 'Professional digital services built for sustainable business growth.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  loader: ({ params }) => getServiceById({ data: params.id }),
  component: ServiceDetail,
});