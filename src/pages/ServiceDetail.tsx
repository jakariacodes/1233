import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, ArrowRight, Star, Clock, CheckCircle2, Users, 
  Zap, Shield, RefreshCw, MessageCircle, ChevronRight,
  Globe, Code2, Palette, Video, TrendingUp, Search, Briefcase
} from "lucide-react";
import serviceWeb from "@/assets/service-web.jpg";
import serviceMarketing from "@/assets/service-marketing.jpg";
import serviceCreative from "@/assets/service-creative.jpg";

// Service data with gigs
const servicesData: Record<string, {
  id: string;
  icon: any;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gradient: string;
  stats: { projects: string; rating: string; clients: string };
  features: string[];
  gigs: {
    id: string;
    title: string;
    description: string;
    price: number;
    deliveryDays: number;
    revisions: number;
    features: string[];
    popular?: boolean;
  }[];
  faqs: { q: string; a: string }[];
}> = {
  "web-design": {
    id: "web-design",
    icon: Globe,
    title: "Web Design",
    description: "Stunning, responsive websites that captivate visitors and drive conversions.",
    longDescription: "We create stunning, responsive websites that captivate visitors and drive conversions. Our designs are modern, user-friendly, and optimized for performance. Every design is crafted with attention to detail, ensuring your brand stands out in the digital landscape.",
    image: serviceWeb,
    gradient: "from-blue-500 to-cyan-500",
    stats: { projects: "120+", rating: "4.9", clients: "85+" },
    features: [
      "Responsive Design",
      "UI/UX Excellence",
      "Brand Integration",
      "Mobile-First Approach",
      "SEO-Friendly Structure",
      "Fast Loading Speed",
    ],
    gigs: [
      {
        id: "basic-landing",
        title: "Basic Landing Page",
        description: "Perfect for startups and small businesses. A single, responsive landing page with modern design.",
        price: 99,
        deliveryDays: 3,
        revisions: 2,
        features: [
          "1 Page Design",
          "Responsive Layout",
          "Contact Form",
          "Social Media Links",
          "Basic SEO Setup",
        ],
      },
      {
        id: "business-website",
        title: "Business Website",
        description: "Complete 5-page website for established businesses. Professional design with all essential pages.",
        price: 299,
        deliveryDays: 7,
        revisions: 3,
        features: [
          "5 Page Design",
          "Responsive Layout",
          "Contact Form Integration",
          "Blog Section",
          "SEO Optimization",
          "Google Analytics Setup",
        ],
        popular: true,
      },
      {
        id: "premium-website",
        title: "Premium Custom Website",
        description: "Fully custom website with unlimited pages, advanced features, and premium design.",
        price: 599,
        deliveryDays: 14,
        revisions: 5,
        features: [
          "Unlimited Pages",
          "Custom Animations",
          "Advanced UI/UX",
          "CMS Integration",
          "E-commerce Ready",
          "Priority Support",
          "1 Month Free Maintenance",
        ],
      },
    ],
    faqs: [
      { q: "How long does a website design take?", a: "Depending on the package, delivery ranges from 3 to 14 days." },
      { q: "Do you provide the source files?", a: "Yes, you receive all source files upon project completion." },
      { q: "Can I request revisions?", a: "Absolutely! Each package includes revisions as specified." },
    ],
  },
  "web-development": {
    id: "web-development",
    icon: Code2,
    title: "Web Development",
    description: "Robust, scalable web applications built with cutting-edge technologies.",
    longDescription: "We build robust, scalable web applications using the latest technologies including React, Node.js, and cloud services. From simple websites to complex web apps, we deliver excellence with clean, maintainable code.",
    image: serviceWeb,
    gradient: "from-violet-500 to-purple-500",
    stats: { projects: "200+", rating: "4.9", clients: "150+" },
    features: [
      "Custom Development",
      "E-commerce Solutions",
      "CMS Integration",
      "API Development",
      "Database Design",
      "Cloud Deployment",
    ],
    gigs: [
      {
        id: "static-website",
        title: "Static Website Development",
        description: "Fast, secure static website with modern technologies. Perfect for portfolios and small businesses.",
        price: 149,
        deliveryDays: 5,
        revisions: 2,
        features: [
          "React/Next.js",
          "Responsive Design",
          "Contact Form",
          "Hosting Setup",
          "SSL Certificate",
        ],
      },
      {
        id: "dynamic-webapp",
        title: "Dynamic Web Application",
        description: "Full-stack web application with database, authentication, and admin panel.",
        price: 499,
        deliveryDays: 14,
        revisions: 3,
        features: [
          "Full-Stack Development",
          "User Authentication",
          "Database Integration",
          "Admin Dashboard",
          "API Development",
          "Cloud Deployment",
        ],
        popular: true,
      },
      {
        id: "enterprise-solution",
        title: "Enterprise Solution",
        description: "Custom enterprise-grade application with advanced features and scalability.",
        price: 1499,
        deliveryDays: 30,
        revisions: 5,
        features: [
          "Custom Architecture",
          "Microservices",
          "Advanced Security",
          "Performance Optimization",
          "CI/CD Pipeline",
          "24/7 Support",
          "3 Months Maintenance",
        ],
      },
    ],
    faqs: [
      { q: "What technologies do you use?", a: "We primarily use React, Node.js, TypeScript, and PostgreSQL." },
      { q: "Do you provide ongoing support?", a: "Yes, we offer maintenance packages for all our projects." },
      { q: "Can you work with existing codebases?", a: "Absolutely! We can enhance or refactor existing projects." },
    ],
  },
  "graphic-design": {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Design",
    description: "Eye-catching visuals that communicate your brand's unique identity.",
    longDescription: "We create eye-catching visuals that communicate your brand's unique identity. From logos to complete brand guidelines, our designs bring creativity to life and help your business stand out.",
    image: serviceCreative,
    gradient: "from-orange-500 to-red-500",
    stats: { projects: "350+", rating: "4.8", clients: "200+" },
    features: [
      "Logo Design",
      "Brand Identity",
      "Print Materials",
      "Social Media Graphics",
      "Packaging Design",
      "Illustration",
    ],
    gigs: [
      {
        id: "logo-design",
        title: "Professional Logo Design",
        description: "Unique, memorable logo that represents your brand perfectly.",
        price: 49,
        deliveryDays: 2,
        revisions: 3,
        features: [
          "3 Logo Concepts",
          "Unlimited Revisions",
          "All File Formats",
          "Brand Colors",
          "Social Media Kit",
        ],
      },
      {
        id: "brand-identity",
        title: "Complete Brand Identity",
        description: "Full branding package including logo, colors, typography, and guidelines.",
        price: 199,
        deliveryDays: 7,
        revisions: 4,
        features: [
          "Logo Design",
          "Color Palette",
          "Typography Guide",
          "Brand Guidelines PDF",
          "Business Card Design",
          "Social Media Templates",
        ],
        popular: true,
      },
      {
        id: "social-media-pack",
        title: "Social Media Design Pack",
        description: "Complete set of social media graphics for all platforms.",
        price: 99,
        deliveryDays: 4,
        revisions: 2,
        features: [
          "20 Social Media Posts",
          "Story Templates",
          "Cover Images",
          "Profile Pictures",
          "Editable Templates",
        ],
      },
    ],
    faqs: [
      { q: "What file formats do you deliver?", a: "AI, EPS, PDF, PNG, JPG, and SVG formats." },
      { q: "Do I own the rights to the design?", a: "Yes, you receive full ownership upon completion." },
      { q: "Can you match my existing brand?", a: "Absolutely! We ensure consistency with your brand." },
    ],
  },
  "video-editing": {
    id: "video-editing",
    icon: Video,
    title: "Video Editing",
    description: "Professional video production that tells your story with impact.",
    longDescription: "We produce professional videos that tell your story with cinematic impact. From corporate videos to social media content, our editing brings your vision to life with engaging, high-quality results.",
    image: serviceCreative,
    gradient: "from-green-500 to-emerald-500",
    stats: { projects: "80+", rating: "4.9", clients: "60+" },
    features: [
      "Corporate Videos",
      "Motion Graphics",
      "Social Media Content",
      "Video Ads",
      "Color Grading",
      "Sound Design",
    ],
    gigs: [
      {
        id: "social-video",
        title: "Social Media Video",
        description: "Engaging short-form video for social media platforms.",
        price: 79,
        deliveryDays: 2,
        revisions: 2,
        features: [
          "Up to 60 seconds",
          "Text Overlays",
          "Background Music",
          "Color Correction",
          "Multiple Formats",
        ],
      },
      {
        id: "promo-video",
        title: "Promotional Video",
        description: "Professional promo video for your business or product.",
        price: 249,
        deliveryDays: 5,
        revisions: 3,
        features: [
          "Up to 3 minutes",
          "Motion Graphics",
          "Voiceover",
          "Sound Design",
          "Thumbnail Design",
        ],
        popular: true,
      },
      {
        id: "corporate-video",
        title: "Corporate Video Package",
        description: "Complete corporate video production with premium quality.",
        price: 599,
        deliveryDays: 10,
        revisions: 5,
        features: [
          "Up to 10 minutes",
          "Script Assistance",
          "Professional VO",
          "Advanced Motion Graphics",
          "4K Quality",
          "Multiple Versions",
        ],
      },
    ],
    faqs: [
      { q: "What video formats do you deliver?", a: "MP4, MOV, and platform-optimized formats." },
      { q: "Do you provide raw footage?", a: "Raw footage can be provided upon request." },
      { q: "Can you add subtitles?", a: "Yes, we offer subtitling in multiple languages." },
    ],
  },
  "digital-marketing": {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Strategic campaigns that amplify your reach and maximize ROI.",
    longDescription: "We create strategic digital marketing campaigns that amplify your reach and maximize ROI. Our data-driven approach ensures measurable results and continuous optimization for your business growth.",
    image: serviceMarketing,
    gradient: "from-pink-500 to-rose-500",
    stats: { projects: "150+", rating: "4.8", clients: "100+" },
    features: [
      "Social Media Marketing",
      "Email Campaigns",
      "PPC Advertising",
      "Content Marketing",
      "Influencer Outreach",
      "Analytics & Reporting",
    ],
    gigs: [
      {
        id: "social-starter",
        title: "Social Media Starter",
        description: "Basic social media management for one platform.",
        price: 149,
        deliveryDays: 30,
        revisions: 2,
        features: [
          "1 Platform Management",
          "15 Posts/Month",
          "Content Calendar",
          "Basic Analytics",
          "Community Management",
        ],
      },
      {
        id: "growth-package",
        title: "Growth Marketing Package",
        description: "Comprehensive marketing across multiple platforms.",
        price: 399,
        deliveryDays: 30,
        revisions: 3,
        features: [
          "3 Platforms",
          "30 Posts/Month",
          "Paid Ads Management",
          "Email Marketing",
          "Monthly Reports",
          "Strategy Calls",
        ],
        popular: true,
      },
      {
        id: "enterprise-marketing",
        title: "Enterprise Marketing",
        description: "Full-scale digital marketing for maximum growth.",
        price: 999,
        deliveryDays: 30,
        revisions: 5,
        features: [
          "All Platforms",
          "Unlimited Content",
          "Ad Budget Management",
          "Influencer Outreach",
          "Weekly Reports",
          "Dedicated Manager",
        ],
      },
    ],
    faqs: [
      { q: "How quickly will I see results?", a: "Typically 2-4 weeks for initial results, 3-6 months for significant growth." },
      { q: "Do you manage ad spend?", a: "Yes, ad spend is separate from our service fee." },
      { q: "What platforms do you work with?", a: "Facebook, Instagram, LinkedIn, Twitter, TikTok, and more." },
    ],
  },
  "seo-optimization": {
    id: "seo-optimization",
    icon: Search,
    title: "SEO Optimization",
    description: "Dominate search rankings and drive organic traffic.",
    longDescription: "We implement data-driven SEO strategies to help you dominate search rankings and drive organic traffic. Our comprehensive approach covers technical SEO, content optimization, and link building.",
    image: serviceMarketing,
    gradient: "from-cyan-500 to-blue-500",
    stats: { projects: "100+", rating: "4.9", clients: "75+" },
    features: [
      "On-Page SEO",
      "Technical SEO",
      "Link Building",
      "Local SEO",
      "Content Strategy",
      "Competitor Analysis",
    ],
    gigs: [
      {
        id: "seo-audit",
        title: "SEO Audit & Report",
        description: "Comprehensive website SEO analysis with actionable recommendations.",
        price: 99,
        deliveryDays: 3,
        revisions: 1,
        features: [
          "Full Site Audit",
          "Competitor Analysis",
          "Keyword Research",
          "Technical Issues Report",
          "Action Plan",
        ],
      },
      {
        id: "seo-monthly",
        title: "Monthly SEO Package",
        description: "Ongoing SEO optimization for consistent growth.",
        price: 299,
        deliveryDays: 30,
        revisions: 2,
        features: [
          "On-Page Optimization",
          "Content Optimization",
          "Link Building",
          "Monthly Reports",
          "Keyword Tracking",
        ],
        popular: true,
      },
      {
        id: "seo-premium",
        title: "Premium SEO Campaign",
        description: "Aggressive SEO strategy for maximum visibility.",
        price: 599,
        deliveryDays: 30,
        revisions: 3,
        features: [
          "Full Technical SEO",
          "Content Creation",
          "Guest Posting",
          "Local SEO",
          "Weekly Reports",
          "Priority Support",
        ],
      },
    ],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Typically 3-6 months for significant ranking improvements." },
      { q: "Do you guarantee rankings?", a: "We follow best practices but can't guarantee specific rankings." },
      { q: "What tools do you use?", a: "SEMrush, Ahrefs, Google Analytics, Search Console, and more." },
    ],
  },
  "business-strategy": {
    id: "business-strategy",
    icon: Briefcase,
    title: "Business Strategy",
    description: "Expert consulting for digital transformation.",
    longDescription: "We provide expert consulting to align your digital presence with business goals. Our strategic planning helps drive growth, optimize operations, and achieve sustainable success.",
    image: serviceMarketing,
    gradient: "from-amber-500 to-orange-500",
    stats: { projects: "50+", rating: "5.0", clients: "40+" },
    features: [
      "Digital Strategy",
      "Market Research",
      "Competitor Analysis",
      "Growth Planning",
      "Process Optimization",
      "Technology Advisory",
    ],
    gigs: [
      {
        id: "strategy-session",
        title: "Strategy Consultation",
        description: "1-hour strategy session with expert recommendations.",
        price: 99,
        deliveryDays: 1,
        revisions: 1,
        features: [
          "1 Hour Session",
          "Business Analysis",
          "Quick Wins",
          "Action Items",
          "Follow-up Email",
        ],
      },
      {
        id: "growth-strategy",
        title: "Growth Strategy Plan",
        description: "Comprehensive growth strategy tailored to your business.",
        price: 499,
        deliveryDays: 7,
        revisions: 2,
        features: [
          "Market Research",
          "Competitor Analysis",
          "Growth Roadmap",
          "KPI Framework",
          "Implementation Guide",
        ],
        popular: true,
      },
      {
        id: "digital-transformation",
        title: "Digital Transformation",
        description: "Complete digital transformation consulting.",
        price: 1999,
        deliveryDays: 30,
        revisions: 5,
        features: [
          "Full Business Audit",
          "Technology Stack Review",
          "Process Optimization",
          "Change Management",
          "Ongoing Advisory",
          "Monthly Check-ins",
        ],
      },
    ],
    faqs: [
      { q: "Who will I be working with?", a: "You'll work directly with our senior strategists." },
      { q: "Is this suitable for startups?", a: "Absolutely! We work with businesses of all sizes." },
      { q: "Do you help with implementation?", a: "Yes, we can assist with implementing the strategy." },
    ],
  },
  "ai-solutions": {
    id: "ai-solutions",
    icon: Zap,
    title: "AI Solutions",
    description: "Custom AI-powered digital solutions.",
    longDescription: "We develop custom AI-powered solutions tailored to your unique business challenges. From chatbots to automation, we help you leverage artificial intelligence for competitive advantage.",
    image: serviceWeb,
    gradient: "from-purple-500 to-pink-500",
    stats: { projects: "30+", rating: "5.0", clients: "25+" },
    features: [
      "AI Chatbots",
      "Process Automation",
      "Data Analysis",
      "Machine Learning",
      "Natural Language Processing",
      "Predictive Analytics",
    ],
    gigs: [
      {
        id: "ai-chatbot",
        title: "AI Chatbot Setup",
        description: "Intelligent chatbot for customer support and engagement.",
        price: 299,
        deliveryDays: 5,
        revisions: 2,
        features: [
          "Custom Training",
          "Multi-platform",
          "24/7 Support",
          "Analytics Dashboard",
          "Easy Integration",
        ],
      },
      {
        id: "ai-automation",
        title: "AI Automation Solution",
        description: "Custom AI automation for your business processes.",
        price: 799,
        deliveryDays: 14,
        revisions: 3,
        features: [
          "Process Analysis",
          "Custom AI Development",
          "Integration Setup",
          "Training & Docs",
          "Support Period",
        ],
        popular: true,
      },
      {
        id: "ai-enterprise",
        title: "Enterprise AI Solution",
        description: "Full-scale AI implementation for enterprise needs.",
        price: 2999,
        deliveryDays: 60,
        revisions: 5,
        features: [
          "Custom AI Models",
          "Data Pipeline",
          "Enterprise Integration",
          "Security & Compliance",
          "Ongoing Support",
          "Training Sessions",
        ],
      },
    ],
    faqs: [
      { q: "What AI technologies do you use?", a: "OpenAI, TensorFlow, PyTorch, and custom solutions." },
      { q: "Do you provide training?", a: "Yes, comprehensive training is included." },
      { q: "Is my data secure?", a: "Absolutely, we follow strict data security protocols." },
    ],
  },
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services">
            <Button variant="gradient">Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <>
      <Helmet>
        <title>{service.title} - TechCrafterIT Services</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
            </div>

            <div className="container-custom relative z-10">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </Link>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} items-center justify-center mb-6 shadow-lg`}>
                    <ServiceIcon className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                    {service.title}
                  </h1>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {service.longDescription}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span className="font-bold">{service.stats.rating}</span>
                      <span className="text-muted-foreground">Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-bold">{service.stats.projects}</span>
                      <span className="text-muted-foreground">Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-bold">{service.stats.clients}</span>
                      <span className="text-muted-foreground">Clients</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className="relative">
                  <div className={`absolute -inset-4 bg-gradient-to-r ${service.gradient} opacity-20 rounded-3xl blur-2xl`} />
                  <div className="relative rounded-3xl overflow-hidden border border-border">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gigs Section - Fiverr Style */}
          <section className="py-20 bg-secondary/30">
            <div className="container-custom">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="section-badge mb-4">Choose Your Package</span>
                <h2 className="section-title mb-6">
                  Select a <span className="text-gradient">Gig</span> That Fits Your Needs
                </h2>
                <p className="text-muted-foreground text-lg">
                  Each gig is designed to deliver specific results. Choose the one that matches your requirements.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {service.gigs.map((gig, index) => (
                  <div
                    key={gig.id}
                    className={`relative bg-card rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                      gig.popular ? "border-primary shadow-lg" : "border-border"
                    }`}
                  >
                    {/* Popular Badge */}
                    {gig.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent py-2 text-center">
                        <span className="text-white text-sm font-semibold">Most Popular</span>
                      </div>
                    )}

                    <div className={`p-8 ${gig.popular ? "pt-14" : ""}`}>
                      {/* Price */}
                      <div className="mb-6">
                        <span className="text-4xl font-display font-bold">${gig.price}</span>
                        <span className="text-muted-foreground"> / project</span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-display text-xl font-bold mb-2">{gig.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6">{gig.description}</p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{gig.deliveryDays} Days</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <RefreshCw className="w-4 h-4" />
                          <span>{gig.revisions} Revisions</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {gig.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link to="/contact">
                        <Button
                          variant={gig.popular ? "gradient" : "outline"}
                          size="lg"
                          className="w-full gap-2"
                        >
                          Order Now
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Signals */}
          <section className="py-12 border-y border-border">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { icon: Shield, label: "100% Secure Payments" },
                  { icon: Clock, label: "On-Time Delivery" },
                  { icon: RefreshCw, label: "Money-Back Guarantee" },
                  { icon: MessageCircle, label: "24/7 Support" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <span className="section-badge mb-4">FAQ</span>
                  <h2 className="section-title">
                    Frequently Asked <span className="text-gradient">Questions</span>
                  </h2>
                </div>

                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                    >
                      <h3 className="font-display font-bold mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-secondary/30">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="section-title mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Choose a gig above or contact us for a custom solution tailored to your needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/contact">
                    <Button variant="gradient" size="xl" className="gap-2">
                      Get Free Quote
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <a href="https://wa.me/8801731173992" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="xl" className="gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Chat on WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ServiceDetail;
