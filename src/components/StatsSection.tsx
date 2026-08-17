import React from 'react';
import { Users, Award, Zap, Star } from "lucide-react";

const stats = [
  { value: "850+", label: "Projects Done", icon: Zap, color: "from-teal-500 to-cyan-500" },
  { value: "650+", label: "Happy Clients", icon: Users, color: "from-blue-500 to-indigo-500" },
  { value: "5+", label: "Years Experience", icon: Award, color: "from-teal-600 to-teal-400" },
  { value: "99%", label: "Satisfaction", icon: Star, color: "from-cyan-500 to-blue-500" },
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Driving Digital Excellence at <span className="text-primary">Global Scale</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our numbers speak for themselves. We've helped hundreds of businesses transform their digital presence.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="p-8 rounded-[2rem] bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-500 group hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium text-lg italic">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    </section>
  );
};

export { StatsSection };
