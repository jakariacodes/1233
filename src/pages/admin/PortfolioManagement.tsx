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
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Plus, Edit2, Trash2, Briefcase, Loader2, Eye, EyeOff, 
  ExternalLink, Star, StarOff, Search, Image as ImageIcon,
  Layout, Globe, Code, User
} from 'lucide-react';
import { portfolioSchema, validateForm } from '@/lib/validation';
import { motion, AnimatePresence } from 'framer-motion';

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

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
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
      display_order: portfolio.display_order || 0,
    });
    setIsDialogOpen(true);
  };

  const filteredPortfolios = portfolios.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const techArray = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
    
    const validation = validateForm(portfolioSchema, {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      description: formData.description,
      long_description: formData.long_description,
      category: formData.category,
      client_name: formData.client_name,
      project_url: formData.project_url,
      featured_image: formData.featured_image,
      technologies: techArray,
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
        technologies: techArray,
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
        toast.success('Portfolio updated successfully');
      } else {
        const { error } = await supabase
          .from('portfolios')
          .insert([portfolioData as any]);
        if (error) throw error;
        toast.success('New portfolio project created');
      }
      resetForm();
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;
    try {
      const { error } = await supabase.from('portfolios').delete().eq('id', id);
      if (error) throw error;
      toast.success('Project deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const togglePublish = async (portfolio: Portfolio) => {
    try {
      const { error } = await supabase
        .from('portfolios')
        .update({ is_published: !portfolio.is_published })
        .eq('id', portfolio.id);
      if (error) throw error;
      toast.success(`Project ${portfolio.is_published ? 'hidden' : 'published'}`);
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
      toast.success(`Project ${portfolio.is_featured ? 'removed from' : 'added to'} featured`);
      refetch();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-display font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Portfolio Management</h1>
            <p className="text-muted-foreground mt-2 text-lg">Curate and showcase your most impressive digital masterpieces.</p>
          </motion.div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button size="lg" className="rounded-2xl gap-2 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                <Plus className="w-5 h-5" />
                Add New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl glass-card border-none shadow-2xl p-0 overflow-hidden rounded-[2.5rem]">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 border-b border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-display font-bold">{editingPortfolio ? 'Edit Showcase Project' : 'Create New Showcase'}</DialogTitle>
                  <p className="text-muted-foreground">Fill in the details below to showcase your work.</p>
                </DialogHeader>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Basic Info */}
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                        <Layout className="w-3.5 h-3.5" /> Project Title *
                      </label>
                      <Input 
                        placeholder="e.g. Next-Gen Fintech App"
                        value={formData.title} 
                        onChange={(e) => handleTitleChange(e.target.value)} 
                        required 
                        className="rounded-xl h-12 bg-secondary/30 border-none focus:ring-2 ring-primary/20 transition-all" 
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                        <Globe className="w-3.5 h-3.5" /> Slug (URL Path)
                      </label>
                      <Input 
                        placeholder="next-gen-fintech-app"
                        value={formData.slug} 
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })} 
                        className="rounded-xl h-12 bg-secondary/30 border-none focus:ring-2 ring-primary/20 transition-all" 
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                        <Briefcase className="w-3.5 h-3.5" /> Category *
                      </label>
                      <Input 
                        placeholder="e.g. Mobile Development, Web Design"
                        value={formData.category} 
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                        required 
                        className="rounded-xl h-12 bg-secondary/30 border-none focus:ring-2 ring-primary/20 transition-all" 
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                        <User className="w-3.5 h-3.5" /> Client Name
                      </label>
                      <Input 
                        placeholder="e.g. Global Finance Inc."
                        value={formData.client_name} 
                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} 
                        className="rounded-xl h-12 bg-secondary/30 border-none focus:ring-2 ring-primary/20 transition-all" 
                      />
                    </div>
                  </div>

                  {/* Media & Links */}
                  <div className="space-y-6">
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                        <ImageIcon className="w-3.5 h-3.5" /> Featured Image URL
                      </label>
                      <Input 
                        placeholder="https://images.unsplash.com/..."
                        value={formData.featured_image} 
                        onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })} 
                        className="rounded-xl h-12 bg-secondary/30 border-none focus:ring-2 ring-primary/20 transition-all" 
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                        <ExternalLink className="w-3.5 h-3.5" /> Project URL
                      </label>
                      <Input 
                        placeholder="https://example.com"
                        value={formData.project_url} 
                        onChange={(e) => setFormData({ ...formData, project_url: e.target.value })} 
                        className="rounded-xl h-12 bg-secondary/30 border-none focus:ring-2 ring-primary/20 transition-all" 
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                        <Code className="w-3.5 h-3.5" /> Technologies (comma separated)
                      </label>
                      <Input 
                        placeholder="React, Tailwind, Supabase"
                        value={formData.technologies} 
                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} 
                        className="rounded-xl h-12 bg-secondary/30 border-none focus:ring-2 ring-primary/20 transition-all" 
                      />
                    </div>

                    <div className="flex gap-8 pt-4">
                      <div className="flex items-center gap-3">
                        <Switch 
                          checked={formData.is_featured} 
                          onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })} 
                        />
                        <span className="text-sm font-semibold">Featured Project</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch 
                          checked={formData.is_published} 
                          onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })} 
                        />
                        <span className="text-sm font-semibold">Published</span>
                      </div>
                    </div>
                  </div>

                  {/* Full Width */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Short Description</label>
                      <Textarea 
                        placeholder="A brief summary for cards and lists..."
                        value={formData.description} 
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                        className="rounded-xl min-h-[80px] bg-secondary/30 border-none focus:ring-2 ring-primary/20 transition-all resize-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Long Description / Case Study</label>
                      <Textarea 
                        placeholder="Detailed explanation of the project, challenges, and solutions..."
                        value={formData.long_description} 
                        onChange={(e) => setFormData({ ...formData, long_description: e.target.value })} 
                        className="rounded-xl min-h-[150px] bg-secondary/30 border-none focus:ring-2 ring-primary/20 transition-all resize-none" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-8 border-t border-border/50 mt-8">
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-6">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="rounded-xl h-12 px-10 bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingPortfolio ? 'Update Project' : 'Launch Project'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="glass-card border-none shadow-xl rounded-[2rem] overflow-hidden">
          <CardContent className="p-0">
            <div className="p-8 border-b border-border/50 bg-secondary/10">
              <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search projects by title, category, or technologies..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="pl-12 h-14 rounded-2xl border-none bg-background/50 focus:ring-2 ring-primary/20 transition-all shadow-inner" 
                />
              </div>
            </div>

            <div className="p-8">
              {loading ? (
                <div className="py-20 text-center">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary opacity-50" />
                  <p className="mt-4 text-muted-foreground font-medium">Loading your portfolio...</p>
                </div>
              ) : filteredPortfolios.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-10 h-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-bold">No projects found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or add a new project.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredPortfolios.map((portfolio, idx) => (
                      <motion.div 
                        key={portfolio.id} 
                        layout
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Card className="glass-card border-none shadow-md hover:shadow-2xl transition-all duration-500 group overflow-hidden rounded-[2rem]">
                          <CardContent className="flex flex-col sm:flex-row items-center gap-8 p-8">
                            <div className="w-full sm:w-48 h-36 rounded-2xl bg-secondary/50 flex items-center justify-center overflow-hidden flex-shrink-0 relative group-hover:shadow-lg transition-all duration-500">
                              {portfolio.featured_image ? (
                                <img src={portfolio.featured_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={portfolio.title} />
                              ) : (
                                <Briefcase className="w-10 h-10 text-muted-foreground/30" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                <span className="text-[10px] text-white font-bold uppercase tracking-widest">{portfolio.category}</span>
                              </div>
                            </div>
                            
                            <div className="flex-1 w-full space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold font-display text-2xl tracking-tight group-hover:text-primary transition-colors">{portfolio.title}</h3>
                                  {portfolio.is_featured && (
                                    <div className="bg-primary/10 p-1.5 rounded-full" title="Featured Project">
                                      <Star className="w-4 h-4 fill-primary text-primary" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-1">
                                  {portfolio.is_published ? (
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                                      <Eye className="w-3 h-3" /> Live
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full">
                                      <EyeOff className="w-3 h-3" /> Hidden
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{portfolio.description || "No description provided."}</p>
                              
                              <div className="flex flex-wrap gap-2 pt-2">
                                {portfolio.technologies?.slice(0, 3).map(tech => (
                                  <span key={tech} className="text-[10px] font-bold bg-secondary px-2.5 py-1 rounded-lg text-muted-foreground border border-border/50 italic">#{tech}</span>
                                ))}
                                {(portfolio.technologies?.length || 0) > 3 && (
                                  <span className="text-[10px] font-bold text-muted-foreground/60 px-2 py-1">+{portfolio.technologies.length - 3} more</span>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50">
                                <div className="flex items-center gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => toggleFeatured(portfolio)} 
                                    className={`rounded-xl h-9 px-3 gap-2 text-xs font-bold ${portfolio.is_featured ? 'text-primary' : 'text-muted-foreground'}`}
                                  >
                                    {portfolio.is_featured ? <StarOff className="w-3.5 h-3.5" /> : <Star className="w-3.5 h-3.5" />}
                                    {portfolio.is_featured ? 'Unfeature' : 'Feature'}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => togglePublish(portfolio)} 
                                    className={`rounded-xl h-9 px-3 gap-2 text-xs font-bold ${portfolio.is_published ? 'text-amber-500' : 'text-emerald-500'}`}
                                  >
                                    {portfolio.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    {portfolio.is_published ? 'Hide' : 'Publish'}
                                  </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => openEditDialog(portfolio)} 
                                    className="rounded-xl h-10 w-10 hover:bg-primary/10 hover:text-primary transition-all"
                                  >
                                    <Edit2 className="w-4.5 h-4.5" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleDelete(portfolio.id)} 
                                    className="rounded-xl h-10 w-10 text-rose-500 hover:bg-rose-500/10 transition-all"
                                  >
                                    <Trash2 className="w-4.5 h-4.5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PortfolioManagement;