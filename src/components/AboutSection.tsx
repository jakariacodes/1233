import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Zap, Shield, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight tracking-tight">
              Empowering Brands Through <span className="text-primary">Next-Gen</span> Innovation
            </h2>
            <p className="text-muted-foreground text-xl mb-10 leading-relaxed font-medium">
              NextOnline Technology is a premium digital powerhouse dedicated to crafting 
              high-impact experiences that redefine boundaries and drive measurable growth.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
               {[
                 { icon: Zap, title: "Speed to Market", desc: "Accelerated development cycles." },
                 { icon: Shield, title: "Enterprise Security", desc: "Robust data protection systems." },
                 { icon: Globe, title: "Global Scale", desc: "Infrastructure for worldwide reach." },
                 { icon: Sparkles, title: "Premium Design", desc: "Exquisite visual storytelling." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4 group">
                   <div className="w-12 h-12 rounded-2xl bg-secondary/50 border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                     <item.icon className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-display font-bold text-lg mb-1">{item.title}</h3>
                     <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
                   </div>
                 </div>
               ))}
            </div>
            
            <Link to="/about">
              <Button size="xl" className="h-16 px-10 rounded-2xl shadow-xl shadow-primary/20 transition-all font-bold text-lg hover:-translate-y-1">
                Learn Our Story
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          <div className="relative">
             <div className="aspect-square rounded-[3rem] bg-secondary/50 border border-border p-6 md:p-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Visual Content */}
                <div className="w-full h-full rounded-[2.5rem] bg-white border border-border shadow-2xl flex items-center justify-center relative overflow-hidden">
                   {/* Background Pattern */}
                   <div className="absolute inset-0 tech-grid opacity-10" />
                   
                   <div className="relative z-10 text-center px-8">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform">
                         <Sparkles className="w-10 h-10" />
                      </div>
                      <div className="text-primary font-display font-bold text-6xl mb-3 leading-none">Since 2021</div>
                      <div className="text-foreground/80 font-bold text-xl uppercase tracking-[0.3em]">Innovation First</div>
                   </div>
                   
                   {/* Floating Elements */}
                   <div className="absolute top-10 right-10 w-20 h-20 rounded-3xl bg-primary/5 border border-primary/10 animate-float" />
                   <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-accent/5 border border-accent/10 animate-float-delayed" />
                </div>
                
                {/* Decorative border glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection };
