import React from 'react';
import { usePortfolios } from "@/hooks/usePortfolios";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PortfolioSection = () => {
  const { portfolios, loading } = usePortfolios(true);
  const featuredPortfolios = portfolios.slice(0, 3);

  return (
    <section className="py-24 bg-[#061e24] relative overflow-hidden text-white">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform origin-top blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-foreground text-sm font-bold mb-4 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-primary" />
              Featured Showcases
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Our Latest <span className="text-primary">Digital Masterpieces</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Explore how we've helped leading brands dominate their industries through 
              strategic design and cutting-edge development.
            </p>
          </div>
          <Link to="/portfolio">
            <Button variant="outline" className="gap-2 h-14 px-8 rounded-2xl border-white/20 text-white hover:bg-white/10 group">
              View All Showcase
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/3] rounded-[2.5rem] bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPortfolios.map((project) => (
              <Link 
                key={project.id} 
                to="/portfolio" 
                className="group block relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-4 shadow-2xl"
              >
                <div className="aspect-[4/3] bg-[#0a2a32] overflow-hidden relative">
                  {project.featured_image ? (
                    <img 
                      src={project.featured_image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">
                      <Briefcase className="w-20 h-20" />
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061e24] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating badge */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{project.category}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-white/60 text-sm line-clamp-2 leading-relaxed mb-6">{project.description}</p>
                  
                  <div className="text-white font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Project <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
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
