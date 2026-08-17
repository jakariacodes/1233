import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  category: string;
  client_name: string | null;
  project_url: string | null;
  featured_image: string | null;
  images: string[];
  technologies: string[];
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export const usePortfolios = (publishedOnly = true) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('portfolios')
        .select('*')
        .order('display_order', { ascending: true });

      if (publishedOnly) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPortfolios((data || []).map(p => ({
        ...p,
        is_featured: !!p.is_featured,
        is_published: !!p.is_published,
        created_at: p.created_at || new Date().toISOString(),
        updated_at: p.updated_at || new Date().toISOString()
      })) as Portfolio[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [publishedOnly]);

  return { portfolios, loading, error, refetch: fetchPortfolios };
};