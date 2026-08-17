import React from 'react';
import { Globe, Send, ChevronLeft, ChevronRight, MapPin, Award, Users, Briefcase } from "lucide-react";

const TeamSection = () => {
  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Experts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Our team of passionate experts is dedicated to delivering excellence in every project we undertake.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
           {[1, 2, 3].map((i) => (
             <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden group">
                <div className="aspect-square bg-muted" />
                <div className="p-6 text-center">
                   <h3 className="text-xl font-bold">Expert Name {i}</h3>
                   <p className="text-muted-foreground mb-4">Lead Developer</p>
                   <div className="flex justify-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors cursor-pointer">
                         <Globe className="w-4 h-4" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors cursor-pointer">
                         <Send className="w-4 h-4" />
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export { TeamSection };
