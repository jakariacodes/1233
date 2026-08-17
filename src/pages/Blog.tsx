import { Button } from "@/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, Tag, TrendingUp, Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useBlogPosts, useBlogCategories } from "@/hooks/useBlogPosts";
import { format } from "date-fns";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { posts, loading: postsLoading } = useBlogPosts(true);
  const { categories, loading: categoriesLoading } = useBlogCategories();

  const loading = postsLoading || categoriesLoading;

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category_id === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter((post) => post.is_featured);

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return "Uncategorized";
    const category = categories.find(c => c.id === categoryId);
    return category?.name || "Uncategorized";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>

      <div className="min-h-screen bg-background">

        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 relative overflow-hidden">
            {/* Premium animated background */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-[100px] animate-float" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-float-slow" />
              
              {/* Rotating circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-border/20 rounded-full animate-rotate-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-primary/10 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
              
              {/* Tech grid */}
              <div className="absolute inset-0 tech-grid opacity-20" />
              
              {/* Morphing gradient */}
              <div className="absolute inset-0 opacity-20 animate-morph" style={{
                background: 'radial-gradient(ellipse at 30% 70%, hsl(var(--primary) / 0.2) 0%, transparent 50%)'
              }} />
              
              {/* Floating particles */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-primary/50 rounded-full animate-particle"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 30}%`,
                    animationDelay: `${i * 0.7}s`
                  }}
                />
              ))}
            </div>

            <div className="container-custom relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <span className="section-badge mb-4 animate-slide-up group hover:bg-primary/20 transition-all duration-300 cursor-default">
                  <TrendingUp className="w-3.5 h-3.5 text-primary group-hover:animate-bounce" />
                  <span>Our Blog</span>
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up animation-delay-100">
                  Digital Insights &{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">Expert Tips</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 animate-slide-up animation-delay-200">
                  Stay updated with the latest trends, insights, and best practices in the digital world.
                </p>

                {/* Enhanced Search Bar */}
                <div className="relative max-w-xl mx-auto animate-slide-up animation-delay-300 group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:border-primary/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Loading State */}
          {loading && (
            <section className="py-20">
              <div className="container-custom">
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              </div>
            </section>
          )}

          {!loading && (
            <>
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <section className="py-12 border-y border-border bg-secondary/30">
                  <div className="container-custom">
                    <div className="flex items-center gap-3 mb-8">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h2 className="font-display text-xl font-bold">Featured Articles</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {featuredPosts.slice(0, 2).map((post, index) => (
                        <Link
                          key={post.id}
                          to={`/blog/${post.slug}`}
                          className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-500 animate-slide-up"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="grid md:grid-cols-2">
                            <div className="relative h-64 md:h-auto overflow-hidden">
                              {post.featured_image ? (
                                <img
                                  src={post.featured_image}
                                  alt={post.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                  <span className="text-4xl font-display font-bold text-primary-foreground">
                                    {getInitials(post.title)}
                                  </span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 md:bg-gradient-to-l" />
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold w-fit mb-4">
                                {getCategoryName(post.category_id)}
                              </span>
                              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>{formatDate(post.published_at || post.created_at)}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Category Filter */}
              <section className="py-8 sticky top-20 z-20 bg-background/80 backdrop-blur-lg border-b border-border">
                <div className="container-custom">
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                      onClick={() => setActiveCategory("All")}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                        activeCategory === "All"
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                          activeCategory === category.id
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Blog Grid */}
              <section className="py-20">
                <div className="container-custom">
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-muted-foreground text-lg">No articles found. Check back soon!</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredPosts.map((post, index) => (
                        <Link
                          key={post.id}
                          to={`/blog/${post.slug}`}
                          className="group overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-slide-up relative"
                          style={{ animationDelay: `${index * 75}ms` }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
                          
                          <div className="relative h-52 overflow-hidden">
                            {post.featured_image ? (
                              <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <span className="text-4xl font-display font-bold text-primary-foreground">
                                  {getInitials(post.title)}
                                </span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent group-hover:via-card/30 transition-all duration-500" />
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold backdrop-blur-sm group-hover:bg-primary transition-colors duration-300">
                                {getCategoryName(post.category_id)}
                              </span>
                            </div>
                            {/* Read more indicator */}
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                              <div className="w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
                                <ArrowRight className="w-5 h-5 text-primary-foreground" />
                              </div>
                            </div>
                          </div>
                          <div className="p-6 relative">
                            <h3 className="font-display text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-300">
                              {post.excerpt}
                            </p>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.slice(0, 3).map((tag, tIndex) => (
                                  <span
                                    key={tIndex}
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                                  >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Meta */}
                            <div className="flex items-center justify-between pt-4 border-t border-border group-hover:border-primary/20 transition-colors duration-300">
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 group-hover:text-primary transition-colors duration-300" />
                                  <span>{formatDate(post.published_at || post.created_at)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </>
          )}

          {/* Newsletter CTA */}
          <section className="py-20">
            <div className="container-custom">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-12 md:p-16">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

                <div className="relative max-w-2xl mx-auto text-center">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                    Subscribe to Our Newsletter
                  </h2>
                  <p className="text-primary-foreground/80 text-lg mb-8">
                    Get the latest articles, tips, and insights delivered straight to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                    />
                    <Button variant="white" size="lg" className="gap-2">
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
};

export default Blog;
