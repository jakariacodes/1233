import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Star, Clock, CheckCircle2, Users, Sparkles } from "lucide-react";
import {
  Globe,
  Code2,
  Palette,
  Video,
  TrendingUp,
  Search,
  Briefcase,
  Zap,
} from "lucide-react";
import serviceWeb from "@/assets/service-web.jpg";
import serviceMarketing from "@/assets/service-marketing.jpg";
import serviceCreative from "@/assets/service-creative.jpg";

const services = [
  {
    id: "web-design",
    icon: Globe,
    title: "Web Design",
    shortDesc: "Stunning, responsive websites that captivate visitors",
    description: "We create stunning, responsive websites that captivate visitors and drive conversions. Our designs are modern, user-friendly, and optimized for performance.",
    image: serviceWeb,
    gradient: "from-blue-500 to-cyan-500",
    stats: { projects: "120+", rating: "4.9", clients: "85+" },
    popular: true,
  },
  {
    id: "web-development",
    icon: Code2,
    title: "Web Development",
    shortDesc: "Robust, scalable web applications with cutting-edge tech",
    description: "Robust, scalable web applications built with cutting-edge technologies. From simple websites to complex web apps, we deliver excellence.",
    image: serviceWeb,
    gradient: "from-violet-500 to-purple-500",
    stats: { projects: "200+", rating: "4.9", clients: "150+" },
    popular: true,
  },
  {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Design",
    shortDesc: "Eye-catching visuals that communicate your brand",
    description: "Eye-catching visuals that communicate your brand's unique identity. From logos to complete brand guidelines, we bring creativity to life.",
    image: serviceCreative,
    gradient: "from-orange-500 to-red-500",
    stats: { projects: "350+", rating: "4.8", clients: "200+" },
    popular: false,
  },
  {
    id: "video-editing",
    icon: Video,
    title: "Video Editing",
    shortDesc: "Professional video production with cinematic impact",
    description: "Professional video production that tells your story with impact. Engaging content that captures attention and drives engagement.",
    image: serviceCreative,
    gradient: "from-green-500 to-emerald-500",
    stats: { projects: "80+", rating: "4.9", clients: "60+" },
    popular: false,
  },
  {
    id: "digital-marketing",
    icon: TrendingUp,
    title: "Digital Marketing",
    shortDesc: "Strategic campaigns that maximize ROI",
    description: "Strategic campaigns that amplify your reach and maximize ROI. Data-driven marketing that delivers measurable results.",
    image: serviceMarketing,
    gradient: "from-pink-500 to-rose-500",
    stats: { projects: "150+", rating: "4.8", clients: "100+" },
    popular: true,
  },
  {
    id: "seo-optimization",
    icon: Search,
    title: "SEO Optimization",
    shortDesc: "Dominate search rankings and drive organic traffic",
    description: "Data-driven strategies to dominate search rankings and drive organic traffic. Get found by customers actively searching for you.",
    image: serviceMarketing,
    gradient: "from-cyan-500 to-blue-500",
    stats: { projects: "100+", rating: "4.9", clients: "75+" },
    popular: false,
  },
  {
    id: "business-strategy",
    icon: Briefcase,
    title: "Business Strategy",
    shortDesc: "Expert consulting for digital transformation",
    description: "Expert consulting to align your digital presence with business goals. Strategic planning that drives growth and success.",
    image: serviceMarketing,
    gradient: "from-amber-500 to-orange-500",
    stats: { projects: "50+", rating: "5.0", clients: "40+" },
    popular: false,
  },
  {
    id: "ai-solutions",
    icon: Zap,
    title: "AI Solutions",
    shortDesc: "Custom AI-powered digital solutions",
    description: "Custom digital solutions tailored to your unique challenges. Innovative approaches for complex business needs.",
    image: serviceWeb,
    gradient: "from-purple-500 to-pink-500",
    stats: { projects: "30+", rating: "5.0", clients: "25+" },
    popular: true,
  },
];

const processSteps = [
  { step: "01", title: "Discovery", desc: "Understanding your needs and goals" },
  { step: "02", title: "Strategy", desc: "Creating a tailored action plan" },
  { step: "03", title: "Execution", desc: "Building your solution with precision" },
  { step: "04", title: "Launch", desc: "Deploying and optimizing for success" },
];

const Services = () => {
  const popularServices = services.filter(s => s.popular);

  return (
    <>
      <Helmet>
        <title>Our Services - TechCrafterIT | Digital Solutions Bangladesh</title>
        <meta
          name="description"
          content="Explore TechCrafterIT's comprehensive digital services including web design, development, graphic design, video editing, digital marketing, SEO, and business strategy."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 tech-grid opacity-30" />
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-morph" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-morph animation-delay-2000" />
            </div>

            <div className="container-custom relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-slide-up hover:scale-105 transition-transform cursor-default">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-semibold text-primary">Premium Digital Services</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up animation-delay-100">
                  Transform Your Business With{" "}
                  <span className="text-gradient-animated">Expert Solutions</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 animate-slide-up animation-delay-200">
                  Choose from our wide range of professional digital services. Each service comes with dedicated gigs tailored to your specific needs.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up animation-delay-300">
                  {[
                    { value: "850+", label: "Projects" },
                    { value: "650+", label: "Clients" },
                    { value: "4.9", label: "Avg Rating" },
                    { value: "24/7", label: "Support" },
                  ].map((stat, index) => (
                    <div key={index} className="p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 group cursor-default">
                      <div className="text-2xl font-display font-bold text-gradient group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Popular Services */}
          <section className="py-12 border-y border-border bg-secondary/30">
            <div className="container-custom">
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <h2 className="font-display text-xl font-bold">Popular Services</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularServices.map((service, index) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                    
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <div className={`absolute top-3 right-3 w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <service.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>{service.stats.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{service.stats.projects} Projects</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* All Services Grid */}
          <section className="py-20">
            <div className="container-custom">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="section-badge mb-4 animate-slide-up hover:scale-105 transition-transform cursor-default">All Services</span>
                <h2 className="section-title mb-6 animate-slide-up animation-delay-100">
                  Explore Our <span className="text-gradient-animated">Full Range</span> of Services
                </h2>
                <p className="text-muted-foreground text-lg animate-slide-up animation-delay-200">
                  Each service includes multiple gig packages to match your budget and requirements.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="group relative bg-card rounded-3xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 animate-slide-up overflow-hidden"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold animate-glow-pulse">
                        Popular
                      </div>
                    )}

                    {/* Icon */}
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <service.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="relative font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="relative text-muted-foreground text-sm leading-relaxed mb-5 group-hover:text-foreground/80 transition-colors duration-300">
                      {service.shortDesc}
                    </p>

                    {/* Stats */}
                    <div className="relative flex items-center gap-4 text-xs text-muted-foreground mb-5 pb-5 border-b border-border">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-foreground">{service.stats.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        <span>{service.stats.projects} Done</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-primary" />
                        <span>{service.stats.clients}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="relative flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">View Gigs</span>
                      <ArrowUpRight className="w-5 h-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Our Process */}
          <section className="py-20 bg-secondary/30 relative overflow-hidden">
            <div className="absolute inset-0 tech-grid opacity-20" />
            <div className="container-custom relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="section-badge mb-4 hover:scale-105 transition-transform cursor-default">Our Process</span>
                <h2 className="section-title mb-6">
                  How We <span className="text-gradient-animated">Deliver Excellence</span>
                </h2>
                <p className="text-muted-foreground text-lg">
                  A streamlined process designed for efficiency and outstanding results.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                    {/* Connector Line */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                    )}
                    
                    <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      
                      <div className="relative text-5xl font-display font-bold text-primary/20 mb-4 group-hover:text-primary/40 transition-colors duration-300">
                        {step.step}
                      </div>
                      <h3 className="relative font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                      <p className="relative text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container-custom">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-12 md:p-16">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-accent bg-[length:200%_100%] animate-gradient-shift opacity-50" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-morph" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-morph animation-delay-2000" />

                <div className="relative max-w-3xl mx-auto text-center">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                    Ready to Start Your Project?
                  </h2>
                  <p className="text-primary-foreground/80 text-lg mb-8">
                    Choose a service, select a gig that fits your needs, and let's bring your vision to life.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/contact">
                      <Button variant="white" size="xl" className="gap-2 group hover:scale-105 transition-transform duration-300">
                        Get Free Consultation
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <a href="tel:+8801731173992">
                      <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 hover:text-white gap-2 group">
                        <Clock className="w-5 h-5 group-hover:animate-pulse" />
                        24/7 Available
                      </Button>
                    </a>
                  </div>
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

export default Services;
