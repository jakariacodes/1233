import { CreditCard, ShieldCheck, Zap, Star } from "lucide-react";

interface PackageSummaryProps {
  service: any;
  package: any;
}

export default function PackageSummary({ service, package: pkg }: PackageSummaryProps) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 sticky top-32 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem] -mr-16 -mt-16" />
      
      <h2 className="text-2xl font-bold mb-8 text-slate-900">Order Summary</h2>
      
      <div className="flex gap-5 mb-8 pb-8 border-b border-slate-50 relative z-10">
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center shrink-0 shadow-inner">
          <Zap className="w-10 h-10 text-primary" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-[10px] text-white font-bold uppercase tracking-tighter mb-2">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Premium Service
          </div>
          <h3 className="font-bold text-xl text-slate-900 leading-tight">{service.title}</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">{pkg.name} Package</p>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Standard Price</span>
          <span className="font-bold text-slate-900">${pkg.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Processing Fee</span>
          <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">FREE</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Service Tax</span>
          <span className="font-bold text-slate-900">Included</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-slate-50 mb-8">
        <span className="text-lg font-bold text-slate-400 uppercase tracking-widest text-[12px]">Total Payable</span>
        <div className="text-right">
          <span className="text-3xl font-display font-bold text-primary block">${pkg.price.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase">All Taxes Included</span>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-6 space-y-4 border border-slate-100/50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Buyer Protection</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-medium">
              Your transaction is 100% secure. We use high-level SSL encryption to safeguard your payment info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}