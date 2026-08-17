import { Helmet } from "react-helmet-async";
import { Navbar } from "@/Navbar";
import { HeroSection } from "@/HeroSection";
import { ClientsSection } from "@/ClientsSection";
import { ServicesSection } from "@/ServicesSection";
import { AboutSection } from "@/AboutSection";
import { ValuesSection } from "@/ValuesSection";
import { WhyChooseUs } from "@/WhyChooseUs";
import { TestimonialsSection } from "@/TestimonialsSection";
import { CTASection } from "@/CTASection";
import { Footer } from "@/Footer";

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
