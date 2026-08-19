import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PaymentProviderConfig {
  id: string;
  provider: string;
  config: any;
  is_active: boolean;
  updated_at: string;
}

export const usePaymentSettings = () => {
  const [settings, setSettings] = useState<PaymentProviderConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('payment_settings')
        .select('*')
        .order('provider', { ascending: true });

      if (error) throw error;
      setSettings(data as PaymentProviderConfig[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payment settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (provider: string, config: any, is_active: boolean) => {
    try {
      const { error } = await supabase
        .from('payment_settings')
        .update({ config, is_active, updated_at: new Date().toISOString() })
        .eq('provider', provider);

      if (error) throw error;
      await fetchSettings();
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update setting' };
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, error, refetch: fetchSettings, updateSetting };
};
