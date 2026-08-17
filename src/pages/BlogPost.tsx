import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Share2, Globe, Send, Link as LinkIcon, Tag, ChevronRight, Loader2 } from "lucide-react";
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
  const { slug } = useParams({ strict: false }) as { slug: string };
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
          setPost({
            ...data,
            is_published: !!data.is_published,
            is_featured: !!data.is_featured
          } as BlogPostData);
          
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
            <Button variant="outline">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts();

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-20">
        <section className="relative">
          <div className="container-custom">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {categoryName}
                </span>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                {post.title}
              </h1>

              {post.featured_image && (
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid lg:grid-cols-12 gap-12">
                <article className="lg:col-span-8">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {post.content ? (
                      <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
                    ) : (
                      <p>{post.excerpt}</p>
                    )}
                  </div>
                </article>

                <aside className="lg:col-span-4 space-y-10">
                  <div className="p-8 rounded-3xl bg-secondary/30 border border-border">
                    <h3 className="font-display font-bold text-xl mb-6">Share this article</h3>
                    <div className="flex gap-4">
                      <button className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <Globe className="w-5 h-5" />
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                        <Send className="w-5 h-5" />
                      </button>
                      <button className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-blue-700 hover:text-white transition-all shadow-sm">
                        <LinkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPost;