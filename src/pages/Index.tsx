import { HeroSection } from "@/components/HeroSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ValuesSection } from "@/components/ValuesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";

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
