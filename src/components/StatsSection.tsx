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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="p-8 md:p-10 rounded-[2.5rem] bg-secondary/30 border border-border/50 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-4 hover:shadow-2xl text-center"
            >
              <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-xl`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 -z-10" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10" />
    </section>
  );
};

export { StatsSection };
