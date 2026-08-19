import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useBlogPosts, BlogPost } from '@/hooks/useBlogPosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, FileText, Loader2, Eye, EyeOff, Search, Calendar, Filter } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

const BlogManagement = () => {
  const { posts, loading, refetch } = useBlogPosts(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'published' && post.is_published) ||
      (filter === 'draft' && !post.is_published);
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Post deleted');
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete post');
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          is_published: !post.is_published,
          published_at: !post.is_published ? new Date().toISOString() : null
        })
        .eq('id', post.id);

      if (error) throw error;
      toast.success(`Post ${post.is_published ? 'unpublished' : 'published'}`);
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update post');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight">Blog Posts</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Manage your brand's digital presence and news
            </p>
          </div>
          <Link to="/admin/blog/editor">
            <Button size="lg" className="rounded-2xl gap-2 shadow-xl shadow-primary/20">
              <Plus className="w-5 h-5" />
              Write New Post
            </Button>
          </Link>
        </div>

        {/* Search & Filters */}
        <Card className="glass-card border-none shadow-lg overflow-visible">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 rounded-2xl border-border/50"
                />
              </div>
              <div className="flex p-1 bg-secondary/50 rounded-2xl self-start">
                {(['all', 'published', 'draft'] as const).map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter(f)}
                    className={`capitalize h-12 px-6 rounded-xl transition-all duration-300 ${filter === f ? 'shadow-md' : ''}`}
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <Card className="glass-card border-none shadow-xl">
            <CardContent className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-3xl bg-secondary/50 flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">
                {posts.length === 0 ? 'No articles yet' : 'No results found'}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                {posts.length === 0
                  ? 'Start sharing your knowledge by creating your first blog post.'
                  : 'We couldn\'t find any posts matching your current search or filter.'}
              </p>
              {posts.length === 0 && (
                <Link to="/admin/blog/editor">
                  <Button size="lg" className="rounded-xl px-8">
                    Create Post
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className={`glass-card border-none shadow-md hover:shadow-xl transition-all duration-300 group ${!post.is_published ? 'opacity-80' : ''}`}>
                  <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
                    {post.featured_image ? (
                      <div className="relative w-full sm:w-32 h-24 rounded-2xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full sm:w-32 h-24 rounded-2xl bg-secondary/80 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                post.is_published
                                  ? 'bg-emerald-500/10 text-emerald-500'
                                  : 'bg-amber-500/10 text-amber-500'
                              }`}
                            >
                              {post.is_published ? 'Published' : 'Draft'}
                            </span>
                            {post.is_featured && (
                              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                                Featured
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold font-display tracking-tight group-hover:text-primary transition-colors line-clamp-1">{post.title}</h3>
                        </div>
                      </div>
                      
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
                          {post.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 mt-4 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {post.tags && post.tags.length > 0 && (
                          <span className="hidden sm:inline">• {post.tags.slice(0, 2).join(', ')}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center bg-secondary/30 p-2 rounded-2xl border border-white/5">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePublish(post)}
                        className="rounded-xl h-10 w-10 hover:bg-white/10"
                        title={post.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {post.is_published ? (
                          <EyeOff className="w-4.5 h-4.5" />
                        ) : (
                          <Eye className="w-4.5 h-4.5" />
                        )}
                      </Button>
                      <Link to="/admin/blog/editor" search={{ id: post.id }}>
                        <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 hover:bg-white/10">
                          <Edit2 className="w-4.5 h-4.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl h-10 w-10 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BlogManagement;
