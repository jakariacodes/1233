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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">We Help You Build Your Digital Future</h2>
            <p className="text-muted-foreground text-lg mb-8">With over a decade of experience in the industry, we provide cutting-edge solutions that help businesses thrive in the digital age.</p>
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
              <Button size="lg" className="rounded-full">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="relative">
             <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center p-8">
                <div className="w-full h-full rounded-2xl bg-card border border-border shadow-2xl flex items-center justify-center text-primary font-bold text-4xl">
                   NextOnline Technology
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection };