import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

const tiers = [
  { 
    name: "Starter", 
    price: "$499", 
    description: "Perfect for small businesses starting their digital journey.",
    features: ["Basic SEO", "Responsive Design", "Up to 5 Pages", "1 Month Support", "Contact Form Integration"],
    popular: false
  },
  { 
    name: "Professional", 
    price: "$999", 
    description: "Best for growing companies needing a premium presence.",
    features: ["Advanced SEO", "Custom UI/UX Design", "Unlimited Pages", "3 Months Support", "CMS Integration", "Performance Audit"],
    popular: true
  },
  { 
    name: "Enterprise", 
    price: "Custom", 
    description: "Tailored solutions for large scale complex requirements.",
    features: ["Full AI Integration", "Dedicated Project Manager", "24/7 Priority Support", "Custom API Development", "Security Pentesting"],
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-10" />
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 tracking-tight">
            Invest in Your <span className="text-primary">Digital Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Transparent pricing models designed to scale with your business goals. 
            No hidden fees, just pure value.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`relative bg-white p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col hover:-translate-y-4 hover:shadow-2xl ${
                tier.popular 
                  ? "border-primary shadow-2xl shadow-primary/10 ring-8 ring-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-display font-bold mb-2 tracking-tight">{tier.name}</h3>
                <p className="text-muted-foreground text-sm">{tier.description}</p>
              </div>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-display font-bold text-foreground">{tier.price}</span>
                {tier.price !== "Custom" && <span className="text-muted-foreground">/project</span>}
              </div>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-foreground/80 font-medium">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              
              <Link to="/contact">
                <Button 
                  className={`w-full h-14 rounded-2xl text-base font-bold transition-all duration-300 ${
                    tier.popular 
                      ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" 
                      : "variant-outline border-primary/20 hover:bg-primary/5 text-primary"
                  }`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  Get Started Now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { PricingSection };
