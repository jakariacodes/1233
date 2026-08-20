import { Button } from "@/components/ui/button";
import { Link, useLoaderData } from "@tanstack/react-router";
import { 
  ArrowRight, Globe, Code2, Palette, Video, TrendingUp, Search, 
  Sparkles, Zap, Star, Clock, Briefcase, Rocket, Layout, Database, Layers
} from "lucide-react";
import { motion } from "framer-motion";
import { PricingCard } from "@/components/PricingCard";


const iconMap: Record<string, any> = {
  Globe, Code2, Palette, Video, TrendingUp, Search, Briefcase, Zap, Rocket, Layout, Database, Layers
};


const Services = () => {
  const services = useLoaderData({ from: '/services/' }) || [];

  const activeServices = services.filter((s: any) => s.is_active);
  
  const popularServices = activeServices.slice(0, 4).map((s: any) => ({
    id: s.id,
    icon: iconMap[s.icon_name] || Globe,
    title: s.title,
    stats: "4.9 • Done",
    color: "from-teal-500/20 to-cyan-500/20",
    iconColor: "text-teal-600"
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
            <span className="text-sm font-semibold text-primary">Premium Digital Solutions</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight"
          >
            Empower Your Brand With <br />
            <span className="text-primary">Next-Gen Innovation</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            Transform your digital presence with our comprehensive suite of expert services. 
            From development to growth strategy, we deliver excellence at every step.
          </motion.p>
        </div>

        {/* Dynamic Hero Grid - Step by Step Premium Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {activeServices.slice(0, 8).map((service: any, i: number) => {
            const Icon = iconMap[service.icon_name] || Globe;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-xl hover:border-primary/30"
              >
                <div className="absolute top-4 right-4 text-slate-100 font-display font-bold text-4xl group-hover:text-primary/10 transition-colors">
                  0{i + 1}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm relative z-10">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{service.description}</p>
                </div>
                <Link to={`/services/$id`} params={{ id: service.slug || service.id }} className="mt-auto pt-4 text-primary text-xs font-bold flex items-center gap-1 group/link">
                  Learn More <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
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
                <Link to={`/services/$id`} params={{ id: service.slug || service.id }}>
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

      {/* Full Range of Services with Pricing Section */}
      <section className="bg-white py-24 border-y border-slate-200">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-primary font-bold text-sm mb-4 uppercase tracking-widest">Our Offerings</div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Explore Our <span className="text-primary">Full Solutions</span>
            </h2>
          </div>
          
          <div className="space-y-24">
            {activeServices.map((service: any, i: number) => {
              const Icon = iconMap[service.icon_name] || Globe;
              const packages = service.service_packages || [];
              
              return (
                <div key={service.id} className="scroll-mt-32">
                  <div className="flex flex-col lg:flex-row gap-12 items-start mb-12">
                    <div className="lg:w-1/3">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-6 shadow-sm">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-3xl font-display font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <Link 
                        to={`/services/$id`} 
                        params={{ id: service.slug || service.id }} 

                        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                      >
                        Detailed Overview <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    
                    <div className="lg:w-2/3 w-full">
                      <div className={`grid gap-6 ${packages.length === 2 ? 'md:grid-cols-2' : packages.length >= 3 ? 'md:grid-cols-3' : 'max-w-md'}`}>
                        {packages.length > 0 ? (
                          packages.map((pkg: any) => (
                            <PricingCard 
                              key={pkg.id} 
                              pkg={pkg} 
                              serviceId={service.slug || service.id} 
                            />
                          ))
                        ) : (
                          <div className="p-8 rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center min-h-[200px]">
                            <p className="text-muted-foreground text-sm italic">Standard packages coming soon.</p>
                            <Link to="/contact" className="mt-4">
                              <Button variant="link" className="text-primary">Custom Quote</Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {i < activeServices.length - 1 && <div className="h-px w-full bg-slate-100 mt-24" />}
                </div>
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
