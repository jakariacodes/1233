import { createFileRoute } from '@tanstack/react-router';
import { TechnicalIssue } from '@/pages/help/HelpSupportPages';

export const Route = createFileRoute('/help/technical-issue')({
  head: () => ({
    title: 'Report an Issue | NextOnline Technology',
    meta: [{ name: 'description', content: 'Report technical bugs or performance issues with our digital products.' }],
  }),
  component: TechnicalIssue,
});