import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { usePortfolios, Portfolio } from '@/hooks/usePortfolios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Briefcase, Loader2, Eye, EyeOff, ExternalLink, Star, StarOff } from 'lucide-react';
import { portfolioSchema, validateForm } from '@/lib/validation';

const PortfolioManagement = () => {
  const { portfolios, loading, refetch } = usePortfolios(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    long_description: '',
    category: '',
    client_name: '',
    project_url: '',
    featured_image: '',
    technologies: '',
    is_featured: false,
    is_published: true,
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      long_description: '',
      category: '',
      client_name: '',
      project_url: '',
      featured_image: '',
      technologies: '',
      is_featured: false,
      is_published: true,
      display_order: 0,
    });
    setEditingPortfolio(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const openEditDialog = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setFormData({
      title: portfolio.title,
      slug: portfolio.slug,
      description: portfolio.description || '',
      long_description: portfolio.long_description || '',
      category: portfolio.category,
      client_name: portfolio.client_name || '',
      project_url: portfolio.project_url || '',
      featured_image: portfolio.featured_image || '',
      technologies: portfolio.technologies?.join(', ') || '',
      is_featured: portfolio.is_featured,
      is_published: portfolio.is_published,
      display_order: portfolio.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = validateForm(portfolioSchema, {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      description: formData.description,
      long_description: formData.long_description,
      category: formData.category,
      client_name: formData.client_name,
      project_url: formData.project_url,
      featured_image: formData.featured_image,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
    });

    if (!validation.success) {
      const firstError = Object.values(validation.errors || {})[0];
      toast.error(firstError || 'Please fix validation errors');
      return;
    }

    setIsSubmitting(true);

    try {
      const portfolioData = {
        title: formData.title.trim(),
        slug: (formData.slug || generateSlug(formData.title)).trim(),
        description: formData.description?.trim() || null,
        long_description: formData.long_description?.trim() || null,
        category: formData.category.trim(),
        client_name: formData.client_name?.trim() || null,
        project_url: formData.project_url?.trim() || null,
        featured_image: formData.featured_image?.trim() || null,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        is_featured: formData.is_featured,
        is_published: formData.is_published,
        display_order: formData.display_order,
      };

      if (editingPortfolio) {
        const { error } = await supabase
          .from('portfolios')
          .update(portfolioData)
          .eq('id', editingPortfolio.id);

        if (error) throw error;
        toast.success('Portfolio updated successfully');
      } else {
        const { error } = await supabase
          .from('portfolios')
          .insert([portfolioData]);

        if (error) throw error;
        toast.success('Portfolio created successfully');
      }

      resetForm();
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save portfolio');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Portfolio deleted');
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete portfolio');
    }
  };

  const togglePublish = async (portfolio: Portfolio) => {
    try {
      const { error } = await supabase
        .from('portfolios')
        .update({ is_published: !portfolio.is_published })
        .eq('id', portfolio.id);

      if (error) throw error;
      toast.success(`Portfolio ${portfolio.is_published ? 'unpublished' : 'published'}`);
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update portfolio');
    }
  };

  const toggleFeatured = async (portfolio: Portfolio) => {
    try {
      const { error } = await supabase
        .from('portfolios')
        .update({ is_featured: !portfolio.is_featured })
        .eq('id', portfolio.id);

      if (error) throw error;
      toast.success(`Portfolio ${portfolio.is_featured ? 'unfeatured' : 'featured'}`);
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update portfolio');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Portfolio</h1>
            <p className="text-muted-foreground mt-1">
              Manage your portfolio projects
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPortfolio ? 'Edit Project' : 'Add New Project'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        title: e.target.value,
                        slug: formData.slug || generateSlug(e.target.value)
                      })}
                      placeholder="Project Title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Slug</label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="project-slug"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Web Design, Development, etc."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Name</label>
                    <Input
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder="Client Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Short Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description..."
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Full Description</label>
                  <Textarea
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    placeholder="Detailed project description..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project URL</label>
                    <Input
                      type="url"
                      value={formData.project_url}
                      onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                    <Input
                      value={formData.featured_image}
                      onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                  <Input
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="React, TypeScript, Tailwind CSS"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Display Order</label>
                    <Input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="is_featured" className="text-sm">Featured</label>
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <input
                      type="checkbox"
                      id="is_published"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="is_published" className="text-sm">Published</label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingPortfolio ? 'Update' : 'Create'} Project
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Portfolio List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : portfolios.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Briefcase className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">Add your first portfolio project</p>
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id} className={`${!portfolio.is_published ? 'opacity-70' : ''}`}>
                <CardContent className="flex items-center gap-4 p-4">
                  {portfolio.featured_image ? (
                    <img
                      src={portfolio.featured_image}
                      alt={portfolio.title}
                      className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-14 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold truncate">{portfolio.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-secondary">
                        {portfolio.category}
                      </span>
                      {portfolio.is_featured && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          Featured
                        </span>
                      )}
                      {!portfolio.is_published && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                          Draft
                        </span>
                      )}
                    </div>
                    {portfolio.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {portfolio.description}
                      </p>
                    )}
                    {portfolio.technologies?.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {portfolio.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                            {tech}
                          </span>
                        ))}
                        {portfolio.technologies.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{portfolio.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {portfolio.project_url && (
                      <a href={portfolio.project_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toggleFeatured(portfolio)}
                      title={portfolio.is_featured ? 'Unfeature' : 'Feature'}
                    >
                      {portfolio.is_featured ? (
                        <StarOff className="w-4 h-4" />
                      ) : (
                        <Star className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => togglePublish(portfolio)}
                      title={portfolio.is_published ? 'Unpublish' : 'Publish'}
                    >
                      {portfolio.is_published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(portfolio)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(portfolio.id)}
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

export default PortfolioManagement;
