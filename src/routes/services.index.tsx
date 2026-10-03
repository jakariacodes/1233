import { createFileRoute } from '@tanstack/react-router';
import Services from '@/pages/Services';
import { getServices } from '@/lib/services.functions';

export const Route = createFileRoute('/services/')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Professional Digital Services | InfraTech',
    meta: [
      {
        name: 'description',
        content: 'Explore our wide range of expert digital services including Web Design, Development, Digital Marketing, and AI Solutions tailored to your business needs.',
      },
      {
        property: 'og:title',
        content: 'Professional Digital Services | InfraTech',
      },
      {
        property: 'og:description',
        content: 'Transform your business with our premium digital solutions and expert-led innovation.',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  }),
  loader: () => getServices(),
  component: Services,
});