import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
  portfolio_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTeamMembers((data || []).map(member => {
        const socialLinks = member.social_links as any || {};
        return {
          ...member,
          linkedin_url: socialLinks.linkedin || null,
          twitter_url: socialLinks.twitter || null,
          facebook_url: socialLinks.facebook || null,
          portfolio_url: socialLinks.portfolio || null,
          display_order: member.display_order ?? 0,
          is_active: !!member.is_active,
          created_at: member.created_at || new Date().toISOString(),
          updated_at: member.updated_at || new Date().toISOString()
        };
      }) as TeamMember[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return { teamMembers, loading, error, refetch: fetchTeamMembers };
};