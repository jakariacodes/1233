import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ValuesSection } from "@/components/ValuesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TechCrafterIT - Premium Digital Agency in Bangladesh | Web Design & Development</title>
        <meta
          name="description"
          content="TechCrafterIT is Bangladesh's leading digital agency offering web design, web development, graphic design, video editing, digital marketing, SEO, and business strategy services. Build AI-Powered, Scalable Solutions."
        />
        <meta
          name="keywords"
          content="digital agency bangladesh, web design, web development, SEO, digital marketing, graphic design, rangpur, IT company bangladesh"
        />
        <link rel="canonical" href="https://techcrafterit.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <ClientsSection />
          <ServicesSection />
          <AboutSection />
          <ValuesSection />
          <WhyChooseUs />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
