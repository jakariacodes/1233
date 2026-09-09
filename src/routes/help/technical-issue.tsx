import { createFileRoute } from '@tanstack/react-router';
import { TechnicalIssue } from '@/pages/help/HelpSupportPages';

export const Route = createFileRoute('/help/technical-issue')({
  staticData: { sitemap: true },
  head: () => ({
    title: 'Report an Issue | NextOnline LLC',
    meta: [{ name: 'description', content: 'Report technical bugs or performance issues with our digital products.' }],
  }),
  component: TechnicalIssue,
});