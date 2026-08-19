import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Star } from 'lucide-react';
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
import { Plus, Edit2, Trash2, Briefcase, Loader2, Eye, EyeOff, ExternalLink, StarOff, Search } from 'lucide-react';
import { portfolioSchema, validateForm } from '@/lib/validation';
import { motion } from 'framer-motion';

const PortfolioManagement = () => {
  const { portfolios, loading, refetch } = usePortfolios(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredPortfolios = portfolios.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          .update(portfolioData as any)
          .eq('id', editingPortfolio.id);
        if (error) throw error;
        toast.success('Portfolio updated');
      } else {
        const { error } = await supabase
          .from('portfolios')
          .insert([portfolioData as any]);
        if (error) throw error;
        toast.success('Portfolio created');
      }
      resetForm();
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error('Failed to save portfolio');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const { error } = await supabase.from('portfolios').delete().eq('id', id);
      if (error) throw error;
      toast.success('Project deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete');
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
      toast.error('Update failed');
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
      toast.error('Update failed');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight">Portfolio</h1>
            <p className="text-muted-foreground mt-2 text-lg">Showcase your best engineering and design work</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button size="lg" className="rounded-2xl gap-2 shadow-xl shadow-primary/20">
                <Plus className="w-5 h-5" />
                Add New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl glass-card border-none shadow-2xl p-8 rounded-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">{editingPortfolio ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Title *</label>
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="rounded-xl h-12" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Category *</label>
                    <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required className="rounded-xl h-12" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="rounded-xl h-12 px-8 bg-primary text-white shadow-lg">
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingPortfolio ? 'Update' : 'Create'} Project
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="glass-card border-none shadow-lg">
          <CardContent className="p-6">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search projects by title or category..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-14 rounded-2xl border-border/50" />
            </div>

            {loading ? (
              <div className="py-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" /></div>
            ) : (
              <div className="grid gap-4">
                {filteredPortfolios.map((portfolio, idx) => (
                  <motion.div key={portfolio.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                    <Card className="glass-card border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                      <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-6">
                        <div className="w-full sm:w-32 h-24 rounded-2xl bg-secondary/80 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {portfolio.featured_image ? <img src={portfolio.featured_image} className="w-full h-full object-cover" /> : <Briefcase className="w-8 h-8 text-muted-foreground" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                             <h3 className="font-bold font-display text-xl tracking-tight">{portfolio.title}</h3>
                             {portfolio.is_featured && <Star className="w-4 h-4 fill-primary text-primary" />}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-primary/70">{portfolio.category}</span>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{portfolio.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => toggleFeatured(portfolio)} className="rounded-xl h-10 w-10">{portfolio.is_featured ? <StarOff className="w-4.5 h-4.5" /> : <Star className="w-4.5 h-4.5" />}</Button>
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(portfolio)} className="rounded-xl h-10 w-10"><Edit2 className="w-4.5 h-4.5" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(portfolio.id)} className="rounded-xl h-10 w-10 text-rose-500"><Trash2 className="w-4.5 h-4.5" /></Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PortfolioManagement;
