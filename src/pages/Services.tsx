import { Button } from "@/components/ui/button";
import { Link, useLoaderData } from "@tanstack/react-router";
import { 
  ArrowRight, Globe, Code2, Palette, Video, TrendingUp, Search, 
  Sparkles, Zap, Star, Clock, Briefcase, Rocket, Layout, Database, Layers,
  ChevronRight, Laptop, BarChart
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
  
  const stats = [
    { label: "Projects", value: "850+" },
    { label: "Clients", value: "650+" },
    { label: "Avg Rating", value: "4.9" },
    { label: "Support", value: "24/7" },
  ];

  const popularServices = activeServices.slice(0, 4).map((s: any, idx: number) => ({
    ...s,
    img: `https://images.unsplash.com/photo-${[
      '1460925895917-afdab827c52f',
      '1498050108023-c5249f4df085',
      '1551288049-bebda4e38f71',
      '1555066931-4365d14bab8c'
    ][idx]}?auto=format&fit=crop&q=80&w=400&h=250`
  }));

  const processSteps = [
    { number: "01", title: "Discovery", description: "Understanding your needs and goals." },
    { number: "02", title: "Strategy", description: "Creating a tailored action plan." },
    { number: "03", title: "Execution", description: "Building your solution with precision." },
    { number: "04", title: "Launch", description: "Deploying and optimizing for success." },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-0 overflow-x-hidden selection:bg-primary selection:text-white font-sans text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-slate-50/50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[160px] opacity-50" />
        </div>
        
        <div className="container-custom text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary">Premium Digital Services</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-8 leading-[1.2] text-slate-900"
          >
            Transform Your Business With <br />
            <span className="text-primary">Expert Solutions</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-normal"
          >
            Choose from our wide range of professional digital services. Each service comes with 
            dedicated gigs tailored to your specific needs.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center group hover:shadow-md transition-all"
              >
                <span className="text-2xl font-display font-bold text-primary mb-1">{stat.value}</span>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-24 container-custom">
        <div className="flex items-center gap-2 mb-12">
          <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
          <h2 className="text-xl font-display font-bold text-slate-900 tracking-tight uppercase tracking-wider">Popular Services</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularServices.map((service: any, i: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div className="aspect-[4/2.5] overflow-hidden relative">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                    4.9
                  </div>
                  <span>120+ Projects</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Explore Our Full Range Grid */}
      <section className="py-24 bg-slate-50/50">
        <div className="container-custom text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-6"
          >
            All Services
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Explore Our <span className="text-primary">Full Range</span> of <br className="hidden md:block" /> Services
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-normal">
            Each service includes multiple gig packages to match your budget and requirements.
          </p>
        </div>
        
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeServices.map((service: any, i: number) => {
            const Icon = iconMap[service.icon_name] || Globe;
            const colors = ['blue', 'purple', 'orange', 'emerald', 'pink', 'sky', 'amber', 'indigo'];
            const colorClass = colors[i % colors.length];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -5 }}
                className="group p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${colorClass}-500/10 flex items-center justify-center text-${colorClass}-500 mb-8 group-hover:bg-${colorClass}-500 group-hover:text-white transition-all duration-500 shadow-sm`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 font-normal">
                  {service.description}
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mb-8 border-t border-slate-50 pt-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                    4.9
                  </div>
                  <span>120+ Done</span>
                  <span>85+</span>
                </div>
                <Link to={`/services/$id`} params={{ id: service.slug || service.id }} className="mt-auto inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest group/link">
                  View Gigs <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Main Service Packages Listing - Integrated Pricing */}
      <section className="py-32 container-custom">
        <div className="space-y-40">
          {activeServices.map((service: any, i: number) => {
            const Icon = iconMap[service.icon_name] || Globe;
            const packages = service.service_packages || [];
            
            return (
              <div key={service.id} className="scroll-mt-32 relative">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                  <div className="lg:w-1/3 sticky top-32">
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 shadow-sm">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-6 text-slate-900 leading-tight">{service.title}</h3>
                    <p className="text-slate-500 text-lg leading-relaxed mb-10 font-normal">
                      {service.description}
                    </p>
                    <div className="space-y-4 mb-10">
                       <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                         Industry-standard performance
                       </div>
                       <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                         Dedicated support team
                       </div>
                       <div className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                         Global deployment ready
                       </div>
                    </div>
                    <Link 
                      to={`/services/$id`} 
                      params={{ id: service.slug || service.id }} 
                      className="inline-flex items-center gap-3 py-3.5 px-8 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 font-bold hover:bg-slate-100 transition-all text-sm group"
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
                        <div className="col-span-full p-16 rounded-[2.5rem] border border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center">
                          <Rocket className="w-12 h-12 text-slate-200 mb-6" />
                          <h4 className="text-xl font-display font-bold text-slate-700 mb-2">Package Expansion In Progress</h4>
                          <p className="text-slate-400 text-sm max-w-sm">We're finalizing specialized tiers for this service. Request a custom quote today.</p>
                          <Link to="/contact" className="mt-8">
                            <Button variant="outline" className="rounded-full px-10 border-slate-200 hover:bg-slate-100 text-slate-900 font-bold">Contact Strategist</Button>
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

      {/* How We Deliver Excellence Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-6"
            >
              Our Process
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
              How We <span className="text-primary">Deliver Excellence</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-normal">
              A streamlined process designed for efficiency and outstanding results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {processSteps.map((step, i) => (
              <div key={i} className="relative group text-center lg:text-left">
                <div className="w-20 h-20 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center mb-8 text-slate-100 group-hover:border-primary group-hover:text-primary transition-all duration-500 shadow-sm mx-auto lg:mx-0">
                  <span className="text-4xl font-display font-black">{step.number}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-4 text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue CTA Banner Section */}
      <section className="container-custom py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 p-12 md:p-24 text-center">
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                Ready to Start Your Project?
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-12 font-medium max-w-2xl mx-auto">
                Choose a service, select a gig that fits your needs, and let's bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact">
                  <Button size="xl" className="bg-white text-blue-600 hover:bg-slate-50 font-black text-sm uppercase tracking-widest px-10 h-16 rounded-2xl group transition-all shadow-xl">
                    Get Free Consultation <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <div className="flex items-center gap-3 text-white font-bold px-8 py-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                  <Clock className="w-5 h-5" />
                  <span>24/7 Available</span>
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