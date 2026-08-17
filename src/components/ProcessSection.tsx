import React from 'react';
import { Search, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";

const steps = [
  { 
    title: "Discovery", 
    desc: "We dive deep into your vision, target audience, and business goals to build a rock-solid foundation.",
    icon: Search,
    color: "from-teal-500 to-cyan-500"
  },
  { 
    title: "Design", 
    desc: "Crafting intuitive, premium UI/UX designs that captivate your users and reflect your brand identity.",
    icon: PenTool,
    color: "from-blue-500 to-indigo-500"
  },
  { 
    title: "Develop", 
    desc: "Our experts build scalable, high-performance solutions using the latest tech stacks.",
    icon: Code2,
    color: "from-cyan-500 to-teal-500"
  },
  { 
    title: "Deploy", 
    desc: "Seamless launch followed by continuous optimization to ensure maximum impact and growth.",
    icon: Rocket,
    color: "from-teal-600 to-blue-600"
  }
];

const ProcessSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 uppercase tracking-wider">
            Execution Roadmap
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            From Concept to <span className="text-primary">Digital Reality</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our streamlined process ensures every project is delivered with precision, 
            quality, and a focus on your business success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-24 left-0 w-full h-0.5 bg-border hidden lg:block -z-10" />
          
          {steps.map((step, i) => (
            <div key={i} className="group relative">
              {/* Step Number */}
              <div className="absolute -top-6 -right-2 text-8xl font-display font-black text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                0{i + 1}
              </div>
              
              <div className="p-8 md:p-10 rounded-[2.5rem] bg-secondary/30 border border-border/50 hover:border-primary/50 transition-all duration-500 group-hover:-translate-y-4 hover:shadow-2xl h-full flex flex-col">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <step.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {step.desc}
                </p>
                
                <div className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background blobs */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export { ProcessSection };
