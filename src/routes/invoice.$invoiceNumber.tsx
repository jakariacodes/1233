import { createFileRoute } from '@tanstack/react-router';
import InvoicePage from '@/pages/Invoice';

export const Route = createFileRoute('/invoice/$invoiceNumber')({
  head: () => ({
    title: 'Invoice | Next Online LLC',
    meta: [
      { name: 'description', content: 'View your Next Online LLC service invoice, payment status and full payment history.' },
      { property: 'og:title', content: 'Invoice | Next Online LLC' },
      { property: 'og:description', content: 'View your Next Online LLC service invoice, payment status and full payment history.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: InvoicePage,
});
