import { createFileRoute } from '@tanstack/react-router';
import ServiceDetail from '@/pages/ServiceDetail';
import { getServiceById } from '@/lib/services.functions';

export const Route = createFileRoute('/services/$id')({
  staticData: { sitemap: true },
  loader: ({ params }) => getServiceById({ data: params.id }),
  component: ServiceDetail,
});