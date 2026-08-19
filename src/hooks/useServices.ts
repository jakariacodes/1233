import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ServicePackage {
  id: string;
  service_id: string;
  name: string;
  price: number;
  description: string | null;
  features: string[];
  is_popular: boolean;
  delivery_days: number | null;
  created_at: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  icon_name: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  service_packages?: ServicePackage[];
}

export const useServices = (activeOnly = false) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('services')
        .select('*, service_packages(*)')
        .order('sort_order', { ascending: true });

      if (activeOnly) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setServices(data as Service[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [activeOnly]);

  return { services, loading, error, refetch: fetchServices };
};
