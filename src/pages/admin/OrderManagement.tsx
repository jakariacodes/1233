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
import { Plus, Edit2, Trash2, ShoppingCart, Loader2, Search, Clock, DollarSign, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';
import { orderSchema, validateForm } from '@/lib/validation';

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { value: 'approved', label: 'Approved', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { value: 'review', label: 'Review', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { value: 'revision', label: 'Revision', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
];

const paymentStatusOptions = [
  { value: 'unpaid', label: 'Unpaid', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  { value: 'partial', label: 'Partial', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  { value: 'paid', label: 'Paid', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  { value: 'refunded', label: 'Refunded', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400' },
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

    // Validate form data
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

        // Send email notification for new order
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

  const getStatusColor = (status: string) => {
    return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-700';
  };

  const getPaymentStatusColor = (status: string) => {
    return paymentStatusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-700';
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
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inProgressCount}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">৳{totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Orders</h1>
            <p className="text-muted-foreground mt-1">
              Manage customer orders
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingOrder ? `Edit Order ${editingOrder.order_number}` : 'Create New Order'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Customer Name *</label>
                    <Input
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Customer Email *</label>
                    <Input
                      type="email"
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Type *</label>
                    <Input
                      value={formData.service_type}
                      onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                      placeholder="Web Design, Development, etc."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Package</label>
                    <Input
                      value={formData.package_name}
                      onChange={(e) => setFormData({ ...formData, package_name: e.target.value })}
                      placeholder="Basic, Standard, Premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Deadline</label>
                    <Input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Details</label>
                  <Textarea
                    value={formData.service_details}
                    onChange={(e) => setFormData({ ...formData, service_details: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount *</label>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <Select value={formData.currency} onValueChange={(v) => setFormData({ ...formData, currency: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BDT">BDT (৳)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <Input
                      value={formData.payment_method}
                      onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                      placeholder="bKash, Bank, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Order Status</label>
                    <Select value={formData.status} onValueChange={(v: Order['status']) => setFormData({ ...formData, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Status</label>
                    <Select value={formData.payment_status} onValueChange={(v: Order['payment_status']) => setFormData({ ...formData, payment_status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {paymentStatusOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Admin Notes</label>
                  <Textarea
                    value={formData.admin_notes}
                    onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                    placeholder="Internal notes..."
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => { resetForm(); setIsDialogOpen(false); }}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {editingOrder ? 'Update' : 'Create'} Order
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statusOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">Create your first order</p>
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                New Order
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold font-mono">{order.order_number}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {statusOptions.find(s => s.value === order.status)?.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${getPaymentStatusColor(order.payment_status)}`}>
                          {paymentStatusOptions.find(s => s.value === order.payment_status)?.label}
                        </span>
                      </div>
                      <p className="font-medium mt-1">{order.customer_name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="font-semibold">{order.service_type}</span>
                        {order.package_name && <span className="text-muted-foreground">• {order.package_name}</span>}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {order.currency === 'BDT' ? '৳' : '$'}{order.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(order.created_at)}
                      </div>
                      {order.deadline && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Deadline: {formatDate(order.deadline)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {order.status === 'pending' && (
                        <Button size="sm" onClick={() => updateStatus(order.id, 'approved')}>
                          Approve
                        </Button>
                      )}
                      {order.status === 'approved' && (
                        <Button size="sm" onClick={() => updateStatus(order.id, 'in_progress')}>
                          Start
                        </Button>
                      )}
                      {order.status === 'in_progress' && (
                        <Button size="sm" onClick={() => updateStatus(order.id, 'completed')}>
                          Complete
                        </Button>
                      )}
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(order)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-destructive" onClick={() => handleDelete(order.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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

export default OrderManagement;