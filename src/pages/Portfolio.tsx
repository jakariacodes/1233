import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ArrowRight, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { usePortfolios } from "@/hooks/usePortfolios";

const Portfolio = () => {
  const { portfolios, loading } = usePortfolios(true);

  return (
    <>
      <Helmet>
        <title>Portfolio - TechCrafterIT | Our Work Showcase</title>
        <meta
          name="description"
          content="Explore TechCrafterIT's portfolio of successful projects. See our work in web design, development, graphic design, video editing, and digital marketing."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 relative overflow-hidden">
            {/* Premium animated background */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-[100px] animate-float" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-float-slow" />
              
              {/* Animated rotating circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-border/20 rounded-full animate-rotate-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-primary/15 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
              
              {/* Tech grid pattern */}
              <div className="absolute inset-0 tech-grid opacity-15" />
              
              {/* Morphing gradient */}
              <div className="absolute inset-0 opacity-20 animate-morph" style={{
                background: 'radial-gradient(ellipse at 60% 40%, hsl(var(--primary) / 0.2) 0%, transparent 50%)'
              }} />
              
              {/* Floating particles */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full animate-particle"
                  style={{
                    left: `${15 + i * 18}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-sm uppercase tracking-widest mb-6 animate-slide-up group hover:bg-primary/20 transition-all duration-300 cursor-default">
                  <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                  Our Portfolio
                </span>
                <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 animate-slide-up animation-delay-100">
                  Our Success
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift block mt-2">Stories</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed animate-slide-up animation-delay-200">
                  Explore our collection of projects that showcase our expertise
                  and commitment to delivering exceptional digital solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Portfolio Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : portfolios.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No projects found. Check back soon!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolios.map((project, index) => (
                    <a
                      key={project.id}
                      href={project.project_url || "#"}
                      target={project.project_url ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-3xl glass-card hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
                      
                      <div className="relative h-64 overflow-hidden">
                        {project.featured_image ? (
                          <img
                            src={project.featured_image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <span className="text-4xl font-display font-bold text-primary-foreground">
                              {project.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent group-hover:via-card/60 transition-all duration-500" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold group-hover:bg-primary transition-colors duration-300">
                            {project.category}
                          </span>
                        </div>
                        {project.project_url && (
                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <div className="w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform duration-300">
                              <ExternalLink className="w-5 h-5 text-primary-foreground" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6 relative">
                        <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-300">
                          {project.description}
                        </p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.slice(0, 3).map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Want to Be Our Next Success Story?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Let's create something amazing together.
                </p>
                <Link to="/contact">
                  <Button variant="hero" size="xl" className="gap-3">
                    Start Your Project
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Portfolio;
