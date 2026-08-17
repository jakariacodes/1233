import { Button } from "@/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Tag, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useBlogPosts } from "@/hooks/useBlogPosts";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  category_id: string | null;
  tags: string[] | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string>("Uncategorized");
  const { posts: allPosts } = useBlogPosts(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (error) {
          console.error('Error fetching post:', error);
          setPost(null);
        } else {
          setPost(data);
          
          // Fetch category name
          if (data.category_id) {
            const { data: catData } = await supabase
              .from('blog_categories')
              .select('name')
              .eq('id', data.category_id)
              .single();
            if (catData) setCategoryName(catData.name);
          }
        }
      } catch (err) {
        console.error('Error:', err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "";
    }
  };

  const calculateReadTime = (content: string | null) => {
    if (!content) return "1 min read";
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const getRelatedPosts = () => {
    if (!post) return [];
    return allPosts
      .filter(p => p.id !== post.id)
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button variant="gradient">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts();

  return (
    <>

      <div className="min-h-screen bg-background">

        <main className="pt-24">
          {/* Hero Section */}
          <section className="relative">
            {/* Featured Image */}
            <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
              {post.featured_image ? (
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="container-custom relative z-10 -mt-48 md:-mt-64">
              <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>

                {/* Category & Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {categoryName}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{calculateReadTime(post.content)}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-8 leading-tight">
                  {post.title}
                </h1>

                {/* Author Card */}
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                    TC
                  </div>
                  <div>
                    <p className="font-semibold">TechCrafterIT Team</p>
                    <p className="text-sm text-muted-foreground">Digital Solutions Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-16">
            <div className="container-custom">
              <div className="grid lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <article className="lg:col-span-8">
                  <div className="bg-card rounded-3xl border border-border p-8 md:p-12">
                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground">
                      {post.content ? (
                        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
                      ) : (
                        <p>{post.excerpt}</p>
                      )}
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-border">
                        <div className="flex flex-wrap items-center gap-3">
                          <Tag className="w-5 h-5 text-muted-foreground" />
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 rounded-full bg-secondary text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Share */}
                    <div className="mt-8 pt-8 border-t border-border">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <p className="font-semibold flex items-center gap-2">
                          <Share2 className="w-5 h-5" />
                          Share this article
                        </p>
                        <div className="flex gap-3">
                          <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                          >
                            <Facebook className="w-5 h-5" />
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[#1da1f2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                          <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-4">
                  <div className="sticky top-28 space-y-8">
                    {/* Related Articles */}
                    {relatedPosts.length > 0 && (
                      <div className="bg-card rounded-2xl border border-border p-6">
                        <h3 className="font-display font-bold text-lg mb-6">Related Articles</h3>
                        <div className="space-y-4">
                          {relatedPosts.map((relatedPost) => (
                            <Link
                              key={relatedPost.id}
                              to={`/blog/${relatedPost.slug}`}
                              className="group flex gap-4 p-3 -mx-3 rounded-xl hover:bg-secondary/50 transition-colors"
                            >
                              <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                {relatedPost.featured_image ? (
                                  <img
                                    src={relatedPost.featured_image}
                                    alt={relatedPost.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-primary to-accent" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                  {relatedPost.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatDate(relatedPost.published_at || relatedPost.created_at)}
                                </p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Newsletter */}
                    <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6">
                      <h3 className="font-display font-bold text-lg text-white mb-2">
                        Stay Updated
                      </h3>
                      <p className="text-white/80 text-sm mb-4">
                        Get the latest articles delivered to your inbox.
                      </p>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 text-sm"
                      />
                      <Button variant="white" className="w-full mt-3">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
};

export default BlogPost;