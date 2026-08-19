import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useServices, Service, ServicePackage } from '@/hooks/useServices';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, Loader2, Search, Settings, Package, X, Check } from 'lucide-react';
import { serviceSchema, servicePackageSchema, validateForm } from '@/lib/validation';
import { motion, AnimatePresence } from 'framer-motion';


const ServiceManagement = () => {
  const { services, loading, refetch } = useServices(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    description: '',
    icon_name: 'Globe',
    image_url: '',
    is_active: true,
    sort_order: 0,
  });

  const [packages, setPackages] = useState<Partial<ServicePackage>[]>([]);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Partial<ServicePackage> | null>(null);
  const [packageFormData, setPackageFormData] = useState({
    name: '',
    price: 0,
    description: '',
    features: '',
    is_popular: false,
    delivery_days: 7,
  });


  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      subtitle: '',
      description: '',
      icon_name: 'Globe',
      image_url: '',
      is_active: true,
      sort_order: 0,
    });
    setPackages([]);
    setEditingService(null);
  };

  const handlePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm(servicePackageSchema, {
      ...packageFormData,
      features: packageFormData.features.split('\n').filter(f => f.trim())
    });

    if (!validation.success) {
      toast.error(Object.values(validation.errors || {})[0]);
      return;
    }

    if (editingPackage) {
      setPackages(packages.map(p => p === editingPackage ? { ...packageFormData, features: packageFormData.features.split('\n').filter(f => f.trim()) } : p));
    } else {
      setPackages([...packages, { ...packageFormData, id: crypto.randomUUID(), features: packageFormData.features.split('\n').filter(f => f.trim()) }]);
    }
    setIsPackageDialogOpen(false);
    setPackageFormData({ name: '', price: 0, description: '', features: '', is_popular: false, delivery_days: 7 });
    setEditingPackage(null);
  };


  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm(serviceSchema, {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      subtitle: formData.subtitle || undefined,
      description: formData.description || undefined,
      icon_name: formData.icon_name || undefined,
      image_url: formData.image_url || undefined,
      is_active: formData.is_active,
      sort_order: formData.sort_order,
    });

    if (!validation.success) {
      const firstError = Object.values(validation.errors || {})[0];
      toast.error(firstError || 'Please fix validation errors');
      return;
    }

    setIsSubmitting(true);
    try {
      const serviceData = {
        title: formData.title.trim(),
        slug: (formData.slug || generateSlug(formData.title)).trim(),
        subtitle: formData.subtitle?.trim() || null,
        description: formData.description?.trim() || null,
        icon_name: formData.icon_name?.trim() || 'Globe',
        image_url: formData.image_url?.trim() || null,
        is_active: formData.is_active,
        sort_order: formData.sort_order,
      };

      let serviceId = editingService?.id;

      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('services')
          .insert(serviceData)
          .select()
          .single();
        if (error) throw error;
        serviceId = data.id;
      }

      // Sync Packages
      if (serviceId) {
        // Simple approach: delete existing and re-insert for update, or just insert for new
        if (editingService) {
          await supabase.from('service_packages').delete().eq('service_id', serviceId);
        }
        
        if (packages.length > 0) {
          const packagesToInsert = packages.map(pkg => ({
            service_id: serviceId as string,
            name: pkg.name || 'Standard',
            price: pkg.price || 0,
            description: pkg.description || null,
            features: pkg.features || [],
            is_popular: pkg.is_popular || false,
            delivery_days: pkg.delivery_days || null,
          }));
          const { error: pkgError } = await supabase.from('service_packages').insert(packagesToInsert as any);
          if (pkgError) throw pkgError;
        }

      }

      toast.success(editingService ? 'Service updated successfully' : 'Service created successfully');
      setIsDialogOpen(false);
      resetForm();
      refetch();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };


  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      toast.success('Service deleted');
      refetch();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <Input value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder={generateSlug(formData.title)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subtitle</label>
                  <Input value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Icon Name</label>
                    <Input value={formData.icon_name} onChange={(e) => setFormData({...formData, icon_name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort Order</label>
                    <Input type="number" value={formData.sort_order} onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value)})} />
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Service'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search services..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>
        ) : (
          <div className="grid gap-4">
            {filteredServices.map((service) => (
              <Card key={service.id} className="flex items-center justify-between p-4 glass-card hover:bg-secondary/20 transition-colors">
                <div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => { 
                    setEditingService(service); 
                    setFormData({
                      title: service.title,
                      slug: service.slug,
                      subtitle: service.subtitle || '',
                      description: service.description || '',
                      icon_name: service.icon_name || '',
                      image_url: service.image_url || '',
                      is_active: service.is_active,
                      sort_order: service.sort_order,
                    }); 
                    setIsDialogOpen(true); 
                  }}>
                    <Edit2 className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="icon" onClick={() => deleteService(service.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ServiceManagement;
