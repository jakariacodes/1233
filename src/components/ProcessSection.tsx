import React from 'react';
import { CheckCircle2 } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    { title: "Discovery", desc: "Understanding your goals and requirements." },
    { title: "Planning", desc: "Creating a roadmap for success." },
    { title: "Execution", desc: "Building your solution with precision." },
    { title: "Delivery", desc: "Launching and optimizing for growth." }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">How we turn your ideas into digital reality.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProcessSection };