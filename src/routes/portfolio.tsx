import { createFileRoute } from '@tanstack/react-router';
import Portfolio from '@/pages/Portfolio';

export const Route = createFileRoute('/portfolio')({
  staticData: { sitemap: true },
  component: Portfolio,
});