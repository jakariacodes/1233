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
    gradient: "from-teal-600 to-teal-400",
    bgGradient: "from-teal-600/10 to-teal-400/10",
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
    <section className="section-padding relative overflow-hidden bg-white" id="services">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-morph animation-delay-2000" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight tracking-tight">
              Premium Digital Services{" "}
              <span className="text-gradient-animated">Under One Platform</span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link
              to="/services"
              key={index}
              className="group relative bg-white rounded-[2.5rem] p-10 border border-border/60 hover:border-primary/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] animate-slide-up overflow-hidden flex flex-col"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              {/* Subtle hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-bold text-primary translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Explore Service</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-20 p-8 rounded-[2.5rem] bg-secondary/30 border border-border animate-slide-up animation-delay-600 hover:border-primary/50 transition-all duration-500">
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