import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface InvoiceRecord {
  id: string;
  order_id: string;
  invoice_number: string;
  customer_name: string;
  customer_email: string;
  currency: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  status: 'due' | 'partial' | 'paid';
  issue_date: string;
  due_date: string | null;
  notes: string | null;
}

export interface PaymentRecord {
  id: string;
  order_id: string;
  amount: number;
  method: string | null;
  reference: string | null;
  note: string | null;
  paid_at: string;
}

export interface InvoiceOrder {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  service_type: string;
  package_name: string | null;
  amount: number;
  currency: string | null;
  status: string | null;
  payment_status: string | null;
  payment_method: string | null;
  created_at: string | null;
  deadline: string | null;
}

/** Loads an invoice (plus its order and payment history) by invoice or order number. */
export const useInvoice = (invoiceNumber: string | undefined) => {
  const [invoice, setInvoice] = useState<InvoiceRecord | null>(null);
  const [order, setOrder] = useState<InvoiceOrder | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!invoiceNumber) return;
    setLoading(true);
    setError(null);
    try {
      let inv: any = null;

      const byInvoice = await supabase
        .from('invoices' as any)
        .select('*')
        .eq('invoice_number', invoiceNumber)
        .maybeSingle();
      if (byInvoice.error) throw byInvoice.error;
      inv = byInvoice.data;

      if (!inv) {
        // Allow lookup by order number too
        const ord = await supabase
          .from('orders')
          .select('id')
          .eq('order_number', invoiceNumber)
          .maybeSingle();
        if (ord.data?.id) {
          const byOrder = await supabase
            .from('invoices' as any)
            .select('*')
            .eq('order_id', ord.data.id)
            .maybeSingle();
          if (byOrder.error) throw byOrder.error;
          inv = byOrder.data;
        }
      }

      if (!inv) {
        setInvoice(null);
        setOrder(null);
        setPayments([]);
        setError('Invoice not found');
        return;
      }

      const [{ data: orderData }, { data: paymentData }] = await Promise.all([
        supabase.from('orders').select('*').eq('id', inv.order_id).maybeSingle(),
        supabase
          .from('order_payments' as any)
          .select('*')
          .eq('order_id', inv.order_id)
          .order('paid_at', { ascending: true }),
      ]);

      setInvoice(inv as InvoiceRecord);
      setOrder((orderData as unknown as InvoiceOrder) || null);
      setPayments((paymentData as unknown as PaymentRecord[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load invoice');
    } finally {
      setLoading(false);
    }
  }, [invoiceNumber]);

  useEffect(() => {
    load();
  }, [load]);

  return { invoice, order, payments, loading, error, refetch: load };
};

/** Lists all invoices for the signed-in customer (admins see every invoice). */
export const useInvoices = () => {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('invoices' as any)
        .select('*')
        .order('issue_date', { ascending: false });
      setInvoices((data as unknown as InvoiceRecord[]) || []);
      setLoading(false);
    })();
  }, []);

  return { invoices, loading };
};
