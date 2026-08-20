import { createFileRoute } from '@tanstack/react-router';
import { PaymentHelp } from '@/pages/help/HelpPages';

export const Route = createFileRoute('/help/payment')({
  head: () => ({
    title: 'Payment Information | NextOnline Technology',
    meta: [{ name: 'description', content: 'Secure international payment methods including Card, PayPal, and Bank Transfer.' }],
  }),
  component: PaymentHelp,
});