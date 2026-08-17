import React from 'react';
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogSection = () => {
  const { posts, loading } = useBlogPosts(true);
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
            <p className="text-muted-foreground">Stay updated with the latest trends, news, and digital strategies from our experts.</p>
          </div>
          <Link to="/blog">
            <Button variant="outline" className="gap-2">
              Read Our Blog
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.id} to="/blog/$id" params={{ id: post.slug }} className="group block bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={post.featured_image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60"} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                  <span className="text-primary font-semibold text-sm flex items-center gap-1">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
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