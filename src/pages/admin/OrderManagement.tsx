import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useOrders, Order } from '@/hooks/useOrders';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, ShoppingCart, Loader2, Search, Clock, DollarSign, CheckCircle, AlertCircle, PlayCircle, Filter } from 'lucide-react';
import { orderSchema, validateForm } from '@/lib/validation';
import { motion } from 'framer-motion';

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  { value: 'approved', label: 'Approved', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { value: 'review', label: 'Review', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { value: 'revision', label: 'Revision', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  { value: 'completed', label: 'Completed', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' },
];

const paymentStatusOptions = [
  { value: 'unpaid', label: 'Unpaid', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' },
  { value: 'partial', label: 'Partial', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  { value: 'paid', label: 'Paid', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { value: 'refunded', label: 'Refunded', color: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400' },
];

const OrderManagement = () => {
  const { orders, loading, refetch, pendingCount, inProgressCount, completedCount } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    service_type: '',
    service_details: '',
    package_name: '',
    amount: 0,
    currency: 'BDT',
    status: 'pending' as Order['status'],
    payment_status: 'unpaid' as Order['payment_status'],
    payment_method: '',
    notes: '',
    admin_notes: '',
    deadline: '',
  });

  const generateOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TCI-${year}${month}-${random}`;
  };

  const resetForm = () => {
    setFormData({
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      service_type: '',
      service_details: '',
      package_name: '',
      amount: 0,
      currency: 'BDT',
      status: 'pending',
      payment_status: 'unpaid',
      payment_method: '',
      notes: '',
      admin_notes: '',
      deadline: '',
    });
    setEditingOrder(null);
  };

  const openEditDialog = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      customer_phone: order.customer_phone || '',
      service_type: order.service_type,
      service_details: order.service_details || '',
      package_name: order.package_name || '',
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      payment_status: order.payment_status,
      payment_method: order.payment_method || '',
      notes: order.notes || '',
      admin_notes: order.admin_notes || '',
      deadline: order.deadline || '',
    });
    setIsDialogOpen(true);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.service_type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm(orderSchema, {
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      service_type: formData.service_type,
      service_details: formData.service_details,
      package_name: formData.package_name,
      amount: formData.amount,
      payment_method: formData.payment_method,
      notes: formData.notes,
      admin_notes: formData.admin_notes,
    });

    if (!validation.success) {
      const firstError = Object.values(validation.errors || {})[0];
      toast.error(firstError || 'Please fix validation errors');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer_name: formData.customer_name.trim(),
        customer_email: formData.customer_email.trim(),
        customer_phone: formData.customer_phone?.trim() || null,
        service_type: formData.service_type.trim(),
        service_details: formData.service_details?.trim() || null,
        package_name: formData.package_name?.trim() || null,
        amount: formData.amount,
        currency: formData.currency,
        status: formData.status,
        payment_status: formData.payment_status,
        payment_method: formData.payment_method?.trim() || null,
        notes: formData.notes?.trim() || null,
        admin_notes: formData.admin_notes?.trim() || null,
        deadline: formData.deadline || null,
        started_at: formData.status === 'in_progress' && !editingOrder?.started_at ? new Date().toISOString() : editingOrder?.started_at,
        completed_at: formData.status === 'completed' && !editingOrder?.completed_at ? new Date().toISOString() : editingOrder?.completed_at,
      };

      if (editingOrder) {
        const { error } = await supabase
          .from('orders')
          .update(orderData as any)
          .eq('id', editingOrder.id);

        if (error) throw error;
        toast.success('Order updated successfully');
      } else {
        const orderNumber = generateOrderNumber();
        const { error } = await supabase
          .from('orders')
          .insert([{ ...orderData, order_number: orderNumber } as any]);

        if (error) throw error;

        supabase.functions.invoke('send-notification', {
          body: {
            type: 'order',
            data: {
              name: formData.customer_name,
              email: formData.customer_email,
              phone: formData.customer_phone,
              service_type: formData.service_type,
              package_name: formData.package_name,
              amount: formData.amount,
              order_number: orderNumber,
            }
          }
        }).catch(err => console.error('Email notification error:', err));

        toast.success('Order created successfully');
      }

      resetForm();
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Order deleted');
      refetch();
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const updateStatus = async (orderId: string, status: Order['status']) => {
    try {
      const updateData: any = { status };
      if (status === 'in_progress') updateData['started_at'] = new Date().toISOString();
      if (status === 'completed') updateData['completed_at'] = new Date().toISOString();

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) throw error;
      toast.success(`Order ${status.replace('_', ' ')}`);
      refetch();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const totalRevenue = orders.filter(o => o.payment_status === 'paid').reduce((sum, o) => sum + o.amount, 0);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground mt-2 text-lg">Manage your customer transactions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button size="lg" className="rounded-2xl gap-2 shadow-xl shadow-primary/20">
                <Plus className="w-5 h-5" />
                Create New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl glass-card border-none shadow-2xl p-8 rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">
                  {editingOrder ? `Edit Order ${editingOrder.order_number}` : 'Create New Order'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Customer Name</label>
                    <Input value={formData.customer_name} onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })} required className="rounded-xl h-12" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Customer Email</label>
                    <Input type="email" value={formData.customer_email} onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })} required className="rounded-xl h-12" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Phone</label>
                    <Input value={formData.customer_phone} onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })} className="rounded-xl h-12" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Service Type</label>
                    <Input value={formData.service_type} onChange={(e) => setFormData({ ...formData, service_type: e.target.value })} required className="rounded-xl h-12" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Amount</label>
                    <Input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })} required className="rounded-xl h-12" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Deadline</label>
                    <Input type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} className="rounded-xl h-12" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="ghost" onClick={() => { resetForm(); setIsDialogOpen(false); }} className="rounded-xl px-8 h-12">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="rounded-xl px-8 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg">
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingOrder ? 'Update Order' : 'Create Order'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Pending', value: pendingCount, icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { label: 'In Progress', value: inProgressCount, icon: PlayCircle, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { label: 'Completed', value: completedCount, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'Total Revenue', value: `৳${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          ].map((stat) => (
            <Card key={stat.label} className="glass-card border-none shadow-lg">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-3xl font-black font-display">{stat.value}</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Table */}
        <Card className="glass-card border-none shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search orders, clients, services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-14 rounded-2xl border-border/50" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px] h-14 rounded-2xl border-border/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="py-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" /></div>
            ) : (
              <div className="grid gap-4">
                {filteredOrders.map((order) => (
                  <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className={`hover:shadow-lg transition-all duration-300 border-l-4 ${order.status === 'pending' ? 'border-l-amber-500' : 'border-l-transparent'}`}>
                      <CardContent className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                             <h3 className="font-bold font-display text-lg tracking-tight">{order.order_number}</h3>
                             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusOptions.find(s => s.value === order.status)?.color}`}>
                               {statusOptions.find(s => s.value === order.status)?.label}
                             </span>
                             {order.payment_status === 'unpaid' && (
                               <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-rose-100 text-rose-700">
                                 Awaiting Payment
                               </span>
                             )}
                          </div>
                          <p className="font-bold text-xl">{order.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                          {order.payment_method && (
                            <p className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-1">
                              Method: <span className="text-slate-900">{order.payment_method}</span>
                            </p>
                          )}
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-3xl font-black font-display text-primary">${order.amount.toLocaleString()}</p>
                          <p className="text-xs font-bold text-muted-foreground uppercase">{order.service_type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {order.status === 'pending' && (
                            <Button 
                              size="sm" 
                              onClick={() => updateStatus(order.id, 'approved')}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
                            >
                              Approve
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(order)} className="rounded-xl px-4">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-rose-500 rounded-xl" onClick={() => handleDelete(order.id)}>Delete</Button>
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

export default OrderManagement;
