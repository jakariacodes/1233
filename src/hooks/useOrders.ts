import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  service_type: string;
  service_details: string | null;
  package_name: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'in_progress' | 'review' | 'revision' | 'completed' | 'cancelled';
  payment_status: 'unpaid' | 'partial' | 'paid' | 'refunded';
  payment_method: string | null;
  notes: string | null;
  admin_notes: string | null;
  deadline: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders((data || []).map(o => ({
        ...o,
        created_at: o.created_at || new Date().toISOString(),
        updated_at: o.updated_at || new Date().toISOString()
      })) as Order[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const inProgressCount = orders.filter(o => o.status === 'in_progress').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;

  return { orders, loading, error, refetch: fetchOrders, pendingCount, inProgressCount, completedCount };
};