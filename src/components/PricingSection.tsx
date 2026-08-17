import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  const tiers = [
    { name: "Starter", price: "$499", features: ["Basic SEO", "Responsive Design", "5 Pages"] },
    { name: "Professional", price: "$999", features: ["Advanced SEO", "Custom UI/UX", "Unlimited Pages"] },
    { name: "Enterprise", price: "Custom", features: ["Full AI Integration", "Dedicated Support", "SLA"] }
  ];

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-muted-foreground">Choose the perfect plan for your business needs.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <div key={i} className="bg-card p-8 rounded-3xl border border-border hover:border-primary/50 transition-all flex flex-col">
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className="text-3xl font-bold text-primary mb-6">{tier.price}</div>
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { PricingSection };