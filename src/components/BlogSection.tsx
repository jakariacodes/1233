import React from 'react';
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogSection = () => {
  const { posts, loading } = useBlogPosts(true);
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="blog">
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 tracking-tight leading-tight">
              Latest News & <span className="text-primary">Industry Trends</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Stay ahead of the curve with expert perspectives on digital transformation, 
              AI innovation, and modern growth strategies.
            </p>
          </div>
          <Link to="/blog">
            <Button variant="outline" className="h-14 px-8 rounded-2xl gap-3 border-border hover:bg-primary hover:text-white hover:border-primary transition-all group">
              Explore All Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/3] rounded-[2.5rem] bg-secondary/50 animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link 
                key={post.id} 
                to="/blog/$id" 
                params={{ id: post.slug }} 
                className="group block bg-white rounded-[2.5rem] border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.featured_image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60"} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2 text-xs font-bold text-foreground/80">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Technology</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight tracking-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>
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

export { BlogSection };
