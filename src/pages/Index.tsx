import { HeroSection } from "@;
import { ClientsSection } from "@;
import { ServicesSection } from "@;
import { AboutSection } from "@;
import { ValuesSection } from "@;
import { WhyChooseUs } from "@;
import { TestimonialsSection } from "@;
import { CTASection } from "@;

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
