import { Button } from "@/components/ui/button";
import { Link, useLoaderData } from "@tanstack/react-router";
import { 
  ArrowRight, Globe, Code2, Palette, Video, TrendingUp, Search, 
  Sparkles, Zap, Star, Clock, Briefcase
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  Globe, Code2, Palette, Video, TrendingUp, Search, Briefcase, Zap
};

const Services = () => {
  const services = useLoaderData({ from: '/services/' }) || [];

  const popularServices = services.slice(0, 4).map((s: any) => ({
    id: s.id,
    icon: iconMap[s.icon_name] || Globe,
    title: s.title,
    stats: "4.9 • Done",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  }));

  const processSteps = [
    { number: "01", title: "Discovery", description: "Understanding your needs and goals." },
    { number: "02", title: "Strategy", description: "Creating a tailored action plan." },
    { number: "03", title: "Execution", description: "Building your solution with precision." },
    { number: "04", title: "Launch", description: "Deploying and optimizing for success." },
  ];

  return (
    <div className="min-h-screen bg-slate-50/30 pt-32 pb-0 overflow-x-hidden">
      {/* Hero Section */}
      <section className="container-custom relative mb-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Premium Digital Services</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight"
          >
            Transform Your Business With <br />
            <span className="text-primary">Expert Solutions</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            Choose from our wide range of professional digital services. Each service comes with dedicated experts tailored to your specific needs.
          </motion.p>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="container-custom mb-24">
        <div className="flex items-center gap-2 mb-8">
          <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
          <h2 className="text-xl font-display font-bold">Popular Services</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularServices.map((service: any, i: number) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4 group transition-all"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shrink-0`}>
                <service.icon className={`w-7 h-7 ${service.iconColor}`} />
              </div>
              <div>
                <Link to={`/services/$id`} params={{ id: service.id }}>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{service.title}</h3>
                </Link>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                  <span className="text-xs text-muted-foreground">{service.stats}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full Range of Services Section */}
      <section className="bg-white py-24 border-y border-slate-200">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-primary font-bold text-sm mb-4 uppercase tracking-widest">All Services</div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Explore Our <span className="text-primary">Full Range</span> of Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service: any, i: number) => {
              const Icon = iconMap[service.icon_name] || Globe;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 flex flex-col h-full"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6 mb-8">
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  
                  <Link to={`/services/$id`} params={{ id: service.id }} className="inline-flex items-center text-primary text-sm font-bold group/link">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="text-primary font-bold text-sm mb-4 uppercase tracking-widest">Our Process</div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              How We <span className="text-primary">Deliver Excellence</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -z-10 hidden lg:block" />
            {processSteps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 rounded-3xl bg-white border border-slate-200 flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:border-primary group-hover:-translate-y-2 transition-all duration-500">
                  <span className="text-2xl font-display font-bold text-slate-200 group-hover:text-primary transition-colors">{step.number}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Start Section */}
      <section className="container-custom py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-500 via-cyan-500 to-primary p-12 md:p-20 text-center">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8 leading-tight">
              Ready to Start Your Project?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <Button size="xl" className="bg-white text-primary hover:bg-slate-50 font-bold px-10 h-16 rounded-2xl group transition-all shadow-xl">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <div className="flex items-center gap-3 text-white/90 font-semibold px-6 py-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <Clock className="w-5 h-5" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
