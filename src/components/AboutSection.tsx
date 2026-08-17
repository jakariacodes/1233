import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Zap, Shield, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>About Our Agency</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Empowering Brands with <span className="text-primary">Next-Gen</span> Innovation</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">NextOnline Technology is a forward-thinking digital powerhouse. We specialize in crafting high-impact digital experiences that bridge the gap between imagination and reality.</p>
            <div className="space-y-4 mb-8">
               {[
                 { icon: Zap, text: "Fast & Efficient Solutions" },
                 { icon: Shield, text: "Secure & Reliable Systems" },
                 { icon: Globe, text: "Global Reach & Support" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                   <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                     <item.icon className="w-4 h-4" />
                   </div>
                   <span className="font-medium">{item.text}</span>
                 </div>
               ))}
            </div>
            <Link to="/about">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="relative">
             <div className="aspect-[4/3] rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center p-8 overflow-hidden group">
                <div className="w-full h-full rounded-[2rem] bg-card border border-border shadow-2xl flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                   <div className="relative z-10 text-center px-6">
                      <div className="text-primary font-display font-bold text-5xl mb-2">Since 2021</div>
                      <div className="text-muted-foreground font-medium text-lg uppercase tracking-widest">Innovation First</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection };