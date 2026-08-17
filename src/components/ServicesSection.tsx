import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Globe, Code2, Palette, Video, TrendingUp, Search, Briefcase, Zap, ArrowRight, ArrowUpRight,  } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Design",
    description: "Stunning, responsive websites that captivate visitors and drive conversions with modern UI/UX.",
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-500/10 to-cyan-500/10",
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Robust, scalable web applications built with cutting-edge technologies like React & Node.js.",
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/10 to-purple-500/10",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Eye-catching visuals that communicate your brand's unique identity and message.",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Professional video production that tells your story with cinematic impact.",
    gradient: "from-cyan-600 to-cyan-400",
    bgGradient: "from-cyan-600/10 to-cyan-400/10",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Strategic campaigns that amplify your reach and maximize ROI across all channels.",
    gradient: "from-teal-500 to-blue-500",
    bgGradient: "from-teal-500/10 to-blue-500/10",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Data-driven strategies to dominate search rankings and drive organic traffic.",
    gradient: "from-cyan-500 to-blue-500",
    bgGradient: "from-cyan-500/10 to-blue-500/10",
  },
  {
    icon: Briefcase,
    title: "Business Strategy",
    description: "Expert consulting to align your digital presence with business goals.",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    icon: Zap,
    title: "AI Solutions",
    description: "Custom AI-powered digital solutions tailored to your unique challenges.",
    gradient: "from-cyan-500 to-teal-500",
    bgGradient: "from-cyan-500/10 to-teal-500/10",
  },
];

export const ServicesSection = () => {
  return (
    <section className="section-padding relative overflow-hidden" id="services">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-morph animation-delay-2000" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="section-badge mb-4 animate-slide-up hover:scale-105 transition-transform cursor-default">
              Our Services
            </span>
            <h2 className="section-title mb-6 animate-slide-up animation-delay-100">
              Premium Digital Services{" "}
              <span className="text-gradient-animated">Under One Platform</span>
            </h2>
            <p className="section-subtitle animate-slide-up animation-delay-200">
              We deliver comprehensive digital solutions that transform businesses 
              and create lasting impact in the digital landscape.
            </p>
          </div>
          <div className="animate-slide-up animation-delay-300">
            <Link to="/services">
              <Button variant="outline" size="lg" className="gap-2 group hover-glow">
                View All Services
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              to="/services"
              key={index}
              className="group relative bg-card rounded-3xl p-7 border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`} />
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div className="relative">
                {/* Icon with glow */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                  <service.icon className="w-7 h-7 text-white group-hover:animate-pulse" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 group-hover:text-foreground/80 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border animate-slide-up animation-delay-600 hover:border-primary/20 transition-all duration-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "850+", label: "Projects Completed" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
              { value: "5+", label: "Years of Excellence" },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};