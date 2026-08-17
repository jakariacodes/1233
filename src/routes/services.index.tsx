import { createFileRoute } from '@tanstack/react-router';
import Services from '@/pages/Services';

export const Route = createFileRoute('/services/')({
  head: () => ({
    title: 'Professional Digital Services | NextOnline Technology',
    meta: [
      {
        name: 'description',
        content: 'Explore our wide range of expert digital services including Web Design, Development, Digital Marketing, and AI Solutions tailored to your business needs.',
      },
      {
        property: 'og:title',
        content: 'Professional Digital Services | NextOnline Technology',
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
  component: Services,
});