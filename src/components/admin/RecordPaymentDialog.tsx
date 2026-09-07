import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, DollarSign } from 'lucide-react';

interface Props {
  orderId: string;
  orderNumber: string;
  amount: number;
  onSaved?: () => void;
}

export const RecordPaymentDialog = ({ orderId, orderNumber, amount, onSaved }: Props) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ amount: String(amount), method: 'bank_transfer', reference: '' });

  const save = async () => {
    const value = parseFloat(form.amount);
    if (!value || value <= 0) {
      toast.error('Enter a valid payment amount');
      return;
    }
    setSaving(true);
    try {
      const { data: invoice } = await supabase
        .from('invoices' as any)
        .select('id')
        .eq('order_id', orderId)
        .maybeSingle();

      const { error } = await supabase.from('order_payments' as any).insert([{
        order_id: orderId,
        invoice_id: (invoice as any)?.id ?? null,
        amount: value,
        method: form.method,
        reference: form.reference.trim() || null,
      }] as any);
      if (error) throw error;

      toast.success('Payment recorded — invoice updated');
      setOpen(false);
      onSaved?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to record payment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-xl px-4 gap-1">
          <DollarSign className="w-4 h-4" /> Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-display font-bold">Record payment · {orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Amount</label>
            <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="rounded-xl h-12" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Method</label>
            <Input value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className="rounded-xl h-12" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Reference (optional)</label>
            <Input value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} className="rounded-xl h-12" />
          </div>
          <Button onClick={save} disabled={saving} className="w-full h-12 rounded-xl font-bold">
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
