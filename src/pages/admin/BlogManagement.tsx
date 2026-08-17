import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useBlogPosts, BlogPost } from '@/hooks/useBlogPosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, FileText, Loader2, Eye, EyeOff, Search, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Blog Management</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your blog posts
            </p>
          </div>
          <Link to="/admin/blog/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {(['all', 'published', 'draft'] as const).map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(f)}
                    className="capitalize"
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
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {posts.length === 0 ? 'No posts yet' : 'No posts found'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {posts.length === 0
                  ? 'Create your first blog post to get started'
                  : 'Try adjusting your search or filters'}
              </p>
              {posts.length === 0 && (
                <Link to="/admin/blog/new">
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Post
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className={`${!post.is_published ? 'opacity-70' : ''}`}>
                <CardContent className="flex items-center gap-4 p-4">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-14 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold truncate">{post.title}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          post.is_published
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}
                      >
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                      {post.is_featured && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                          Featured
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <span>{post.tags.slice(0, 2).join(', ')}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => togglePublish(post)}
                      title={post.is_published ? 'Unpublish' : 'Publish'}
                    >
                      {post.is_published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Link to={`/admin/blog/edit/${post.id}`}>
                      <Button variant="outline" size="icon">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BlogManagement;
