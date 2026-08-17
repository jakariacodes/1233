import React from 'react';
import { HeroSection } from "@/components/HeroSection";

import { ServicesSection } from "@/components/ServicesSection";
import { StatsSection } from "@/components/StatsSection";
import { AboutSection } from "@/components/AboutSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ProcessSection } from "@/components/ProcessSection";
import { TeamSection } from "@/components/TeamSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";


const Index = () => {
  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      <HeroSection />
      
      <ServicesSection />
      <StatsSection />
      <AboutSection />
      <PortfolioSection />
      <ProcessSection />
      <TeamSection />
      <PricingSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
      
    </div>
  );
};

export default Index;