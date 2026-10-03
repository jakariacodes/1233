import { useParams, Link } from '@tanstack/react-router';
import { Printer, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInvoice } from '@/hooks/useInvoice';
import infraTechLogo from '@/assets/infratech-logo.png.asset.json';

const money = (value: number, currency: string) =>
  `${currency === 'BDT' ? '৳' : '$'}${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatDate = (value: string | null | undefined) =>
  value ? new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

export default function InvoicePage() {
  const { invoiceNumber } = useParams({ from: '/invoice/$invoiceNumber' });
  const { invoice, order, payments, loading, error } = useInvoice(invoiceNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500" />
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Invoice not available</h1>
          <p className="text-slate-500 mt-2">We couldn't find this invoice, or you don't have access to it.</p>
        </div>
        <Button asChild className="rounded-xl">
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    );
  }

  const currency = invoice.currency || 'USD';
  const isPaid = invoice.status === 'paid';
  const statusStyles = isPaid
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : invoice.status === 'partial'
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-rose-50 text-rose-700 border-rose-200';

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 print:pt-0 print:pb-0 print:bg-white">
      <div className="container-custom max-w-4xl">
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Button variant="ghost" asChild className="rounded-xl text-slate-600">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to dashboard
            </Link>
          </Button>
          <Button onClick={() => window.print()} className="rounded-xl font-bold">
            <Printer className="w-4 h-4 mr-2" /> Print / Download PDF
          </Button>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden print:shadow-none print:border-0 print:rounded-none">
          {/* Header */}
          <div className="p-10 border-b border-slate-100 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <img src={infraTechLogo.url} alt="InfraTech" className="h-10 w-auto mb-4" />
              <p className="text-sm text-slate-500 leading-relaxed">
                InfraTech<br />
                89-15 Parsons Blvd #10K<br />
                Jamaica, New York 11432, USA<br />
                info@InfraGlobalTech.com<br />
                +1 (760) 286-5194
              </p>
            </div>
            <div className="sm:text-right">
              <h1 className="text-3xl font-display font-bold text-slate-900">Invoice</h1>
              <p className="text-slate-500 font-medium mt-1">{invoice.invoice_number}</p>
              <span className={`inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${statusStyles}`}>
                {isPaid ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                {isPaid ? 'Paid' : invoice.status === 'partial' ? 'Partially Paid' : 'Due'}
              </span>
            </div>
          </div>

          {/* Meta */}
          <div className="grid sm:grid-cols-3 gap-8 p-10 border-b border-slate-100">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Billed To</p>
              <p className="font-bold text-slate-900">{invoice.customer_name}</p>
              <p className="text-sm text-slate-500">{invoice.customer_email}</p>
              {order?.customer_phone && <p className="text-sm text-slate-500">{order.customer_phone}</p>}
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Invoice Date</p>
              <p className="font-semibold text-slate-900">{formatDate(invoice.issue_date)}</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-4 mb-2">Due Date</p>
              <p className="font-semibold text-slate-900">{formatDate(invoice.due_date)}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Order</p>
              <p className="font-semibold text-slate-900">#{order?.order_number}</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-4 mb-2">Payment Method</p>
              <p className="font-semibold text-slate-900 capitalize">{(order?.payment_method || 'Not selected').replace(/_/g, ' ')}</p>
            </div>
          </div>

          {/* Items */}
          <div className="p-10 border-b border-slate-100">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  <th className="pb-3 font-bold">Description</th>
                  <th className="pb-3 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-5">
                    <p className="font-bold text-slate-900">{order?.service_type}</p>
                    <p className="text-sm text-slate-500">{order?.package_name || 'Custom package'}</p>
                  </td>
                  <td className="py-5 text-right font-bold text-slate-900">{money(invoice.amount, currency)}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 ml-auto w-full sm:w-72 space-y-3">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{money(invoice.amount, currency)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Paid</span>
                <span className="font-semibold text-emerald-600">−{money(invoice.amount_paid, currency)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <span className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  {isPaid ? 'Total Paid' : 'Amount Due'}
                </span>
                <span className={`text-2xl font-black font-display ${isPaid ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {money(isPaid ? invoice.amount_paid : invoice.amount_due, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Payments */}
          <div className="p-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Payment History</h2>
            {payments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                <p className="font-bold text-rose-600">No payment received yet — this invoice is due.</p>
                <p className="text-sm text-slate-500 mt-1">
                  Once your payment is confirmed by our team it will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
                      <th className="pb-3 font-bold">Date</th>
                      <th className="pb-3 font-bold">Method</th>
                      <th className="pb-3 font-bold">Reference</th>
                      <th className="pb-3 font-bold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {payments.map((p) => (
                      <tr key={p.id}>
                        <td className="py-4 text-sm text-slate-600">{formatDate(p.paid_at)}</td>
                        <td className="py-4 text-sm text-slate-600 capitalize">{(p.method || '—').replace(/_/g, ' ')}</td>
                        <td className="py-4 text-sm text-slate-500">{p.reference || '—'}</td>
                        <td className="py-4 text-right font-bold text-slate-900">{money(p.amount, currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="px-10 py-6 bg-slate-50 text-center text-xs text-slate-400 font-medium print:bg-white">
            Thank you for your business — InfraTech
          </div>
        </div>
      </div>
    </div>
  );
}
