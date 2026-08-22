import { Button } from "@/components/ui/button";
import { Link, useLoaderData } from "@tanstack/react-router";
import { 
  ArrowRight, Globe, Code2, Palette, Video, TrendingUp, Search, 
  Sparkles, Zap, Star, Clock, Briefcase, Rocket, Layout, Database, Layers,
  ChevronRight, Shield, Laptop, BarChart
} from "lucide-react";
import { motion } from "framer-motion";
import { PricingCard } from "@/components/PricingCard";
import React from "react";

const iconMap: Record<string, any> = {
  Globe, Code2, Palette, Video, TrendingUp, Search, Briefcase, Zap, Rocket, Layout, Database, Layers, Laptop, BarChart
};

const Services = () => {
  const services = useLoaderData({ from: '/services/' }) || [];
  const activeServices = services.filter((s: any) => s.is_active);
  
  const processSteps = [
    { number: "01", title: "Strategic Analysis", description: "Comprehensive market research and project discovery." },
    { number: "02", title: "Creative Design", description: "Crafting intuitive user interfaces and experiences." },
    { number: "03", title: "Expert Development", description: "Building robust solutions with cutting-edge tech." },
    { number: "04", title: "Quality Assurance", description: "Rigorous testing and optimization for performance." },
  ];

  return (
    <div className="min-h-screen bg-[#000d0b] text-white pt-24 pb-0 overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[160px] opacity-20" />
          <div className="absolute inset-0 tech-grid opacity-[0.03]" />
        </div>
        
        <div className="container-custom text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-primary">Enterprise Excellence</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight"
          >
            World-Class Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-size-200 animate-gradient-shift">
              Service Solutions
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl leading-relaxed mb-14 max-w-3xl mx-auto font-light"
          >
            Empowering global brands with high-performance technology, strategic design, 
            and next-generation innovation that drives measurable business growth.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3 }}
             className="flex flex-wrap justify-center gap-6"
          >
            <Button size="xl" className="rounded-full px-10 h-16 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(0,168,132,0.3)] group">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center gap-4 text-white/40 text-sm font-medium border border-white/10 px-8 rounded-full bg-white/5 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-primary" />
              Secure & Certified
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services Grid */}
      <section className="py-32 container-custom relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.slice(0, 6).map((service: any, i: number) => {
            const Icon = iconMap[service.icon_name] || Globe;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                  {service.description}
                </p>
                <Link to={`/services/$id`} params={{ id: service.slug || service.id }} className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest group/link">
                  Explore Service <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Process Section - Dark Visual */}
      <section className="py-32 bg-white/5 border-y border-white/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Crafting Excellence through <br />
              <span className="text-primary">Precision Process</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((step, i) => (
              <div key={i} className="relative group text-center">
                <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-white/20 group-hover:border-primary group-hover:text-primary transition-all duration-500 transform group-hover:-rotate-6">
                  <span className="text-3xl font-display font-black">{step.number}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{step.description}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(100%+2rem)] w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Service Packages Listing */}
      <section className="py-32 container-custom">
        <div className="space-y-40">
          {activeServices.map((service: any, i: number) => {
            const Icon = iconMap[service.icon_name] || Globe;
            const packages = service.service_packages || [];
            
            return (
              <div key={service.id} className="scroll-mt-32 relative">
                {/* Visual Background Decoration */}
                <div className={`absolute -inset-x-20 -inset-y-10 bg-primary/[0.02] rounded-[3rem] -z-10 ${i % 2 === 0 ? 'translate-x-10' : '-translate-x-10'}`} />
                
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                  <div className="lg:w-1/3 sticky top-32">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary mb-8 shadow-[0_0_20px_rgba(0,168,132,0.1)]">
                      <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-4xl font-display font-bold mb-6 text-white leading-tight">{service.title}</h3>
                    <p className="text-white/60 text-lg leading-relaxed mb-10 font-light">
                      {service.description}
                    </p>
                    <div className="space-y-4 mb-10">
                       <div className="flex items-center gap-3 text-sm text-white/40">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                         Industry-standard performance
                       </div>
                       <div className="flex items-center gap-3 text-sm text-white/40">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                         Dedicated support team
                       </div>
                       <div className="flex items-center gap-3 text-sm text-white/40">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                         Global deployment ready
                       </div>
                    </div>
                    <Link 
                      to={`/services/$id`} 
                      params={{ id: service.slug || service.id }} 
                      className="inline-flex items-center gap-3 py-4 px-8 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all text-sm group"
                    >
                      Detailed Specs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  
                  <div className="lg:w-2/3 w-full">
                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                      {packages.length > 0 ? (
                        packages.map((pkg: any) => (
                          <PricingCard 
                            key={pkg.id} 
                            pkg={pkg} 
                            serviceId={service.slug || service.id} 
                          />
                        ))
                      ) : (
                        <div className="col-span-full p-16 rounded-[2.5rem] border border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center text-center">
                          <Rocket className="w-12 h-12 text-white/20 mb-6" />
                          <h4 className="text-xl font-display font-bold text-white/80 mb-2">Package Expansion In Progress</h4>
                          <p className="text-white/40 text-sm max-w-sm">We're finalizing specialized tiers for this service. Request a custom quote today.</p>
                          <Link to="/contact" className="mt-8">
                            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-10">Contact Strategist</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Reach CTA */}
      <section className="container-custom py-40">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#021d19] p-12 md:p-32 text-center group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-10 leading-[1] tracking-tighter">
                Accelerate Your <br />
                <span className="text-primary">Global Presence</span>
              </h2>
              <p className="text-white/50 text-xl md:text-2xl mb-16 font-light max-w-2xl mx-auto">
                Join hundreds of successful businesses scaling with Next Online LLC's enterprise-grade infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <Link to="/contact">
                  <Button size="xl" className="bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-widest px-12 h-20 rounded-2xl group transition-all shadow-[0_0_40px_rgba(0,168,132,0.4)]">
                    Work With Us
                    <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
                <div className="flex items-center gap-4 text-white/70 font-bold bg-white/5 border border-white/10 px-8 py-5 rounded-2xl backdrop-blur-md">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#021d19] bg-slate-800" />
                    ))}
                  </div>
                  <span className="text-sm">Trusted by 500+ Brands</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;