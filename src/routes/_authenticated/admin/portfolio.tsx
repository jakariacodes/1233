import { createFileRoute } from '@tanstack/react-router';
import PortfolioManagement from '@/pages/admin/PortfolioManagement';

export const Route = createFileRoute('/_authenticated/admin/portfolio')({
  staticData: { sitemap: false },
  component: PortfolioManagement,
});