import { createFileRoute } from '@tanstack/react-router';
import RefundPolicy from '@/pages/RefundPolicy';

export const Route = createFileRoute('/refund')({
  staticData: { sitemap: true },
  component: RefundPolicy,
});