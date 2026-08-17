import { createFileRoute } from '@tanstack/react-router';
import ContactMessages from '@/pages/admin/ContactMessages';

export const Route = createFileRoute('/_authenticated/admin/messages')({
  component: ContactMessages,
});
