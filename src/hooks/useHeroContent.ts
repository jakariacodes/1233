import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface HeroContent {
  badge_text: string;
  badge_subtext: string;
  top_label: string;
  heading_line1: string;
  heading_accent: string;
  heading_line2: string;
  description: string;
  primary_btn_text: string;
  primary_btn_link: string;
  secondary_btn_text: string;
  secondary_btn_link: string;
  header_logo_url?: string;
}

export const useHeroContent = () => {
  return useQuery({
    queryKey: ["hero-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_content" as any)
        .select("*")
        .single();
      
      if (error) {
        console.error("Error fetching hero content:", error);
        return null;
      }
      return data as unknown as HeroContent;
    },
  });
};
