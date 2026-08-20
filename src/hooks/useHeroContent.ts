import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
        throw error;
      }
      return data;
    },
  });
};
