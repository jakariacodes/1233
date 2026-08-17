import { HeroSection } from "@/components/ui/button";
import { ClientsSection } from "@/components/ui/button";
import { ServicesSection } from "@/components/ui/button";
import { AboutSection } from "@/components/ui/button";
import { ValuesSection } from "@/components/ui/button";
import { WhyChooseUs } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/ui/button";
import { CTASection } from "@/components/ui/button";

export const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <AboutSection />
      <ValuesSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};
