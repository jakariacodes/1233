import React from 'react';
import { usePortfolios } from "@/hooks/usePortfolios";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const PortfolioSection = () => {
  const { portfolios, loading } = usePortfolios(true);
  const featuredPortfolios = portfolios.slice(0, 3);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Recent Work</h2>
            <p className="text-muted-foreground">Take a look at some of our most successful projects and digital transformations.</p>
          </div>
          <Link to="/portfolio">
            <Button variant="outline" className="gap-2">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-video rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPortfolios.map((project) => (
              <Link key={project.id} to="/portfolio" className="group block relative overflow-hidden rounded-2xl border border-border">
                <div className="aspect-video bg-muted overflow-hidden">
                  {project.featured_image ? (
                    <img src={project.featured_image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Briefcase className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 block">{project.category}</span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { PortfolioSection };