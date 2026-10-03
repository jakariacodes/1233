import { createFileRoute } from '@tanstack/react-router';
import InvoicePage from '@/pages/Invoice';

export const Route = createFileRoute('/invoice/$invoiceNumber')({
  staticData: { sitemap: false },
  head: () => ({
    title: 'Invoice | InfraTech',
    meta: [
      { name: 'description', content: 'View your InfraTech service invoice, payment status and full payment history.' },
      { property: 'og:title', content: 'Invoice | InfraTech' },
      { property: 'og:description', content: 'View your InfraTech service invoice, payment status and full payment history.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: InvoicePage,
});
