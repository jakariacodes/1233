import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface PricingCardProps {
  pkg: {
    id: string;
    name: string;
    price: number;
    features: string[];
    is_popular?: boolean;
  };
  serviceId: string;
}

export const PricingCard = ({ pkg, serviceId }: PricingCardProps) => {
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate({
      to: '/checkout',
      search: {
        serviceId: serviceId,
        packageId: pkg.id
      }
    });
  };

  return (
    <div className={`group relative p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 flex flex-col ${
      pkg.is_popular 
        ? "border-primary bg-white shadow-2xl scale-[1.02] z-10" 
        : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"
    }`}>
      {pkg.is_popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] uppercase tracking-widest font-black px-4 py-1.5 rounded-full shadow-lg z-20">
          Most Popular
        </div>
      )}
      
      <div className="mb-6">
        <h3 className={`text-xl font-display font-bold mb-2 transition-colors ${pkg.is_popular ? "text-primary" : "text-slate-900"}`}>
          {pkg.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-medium text-slate-500">$</span>
          <span className="text-4xl font-display font-bold text-slate-900">{pkg.price.toLocaleString()}</span>
          <span className="text-xs text-slate-400 ml-1">/ project</span>
        </div>
      </div>

      <div className="h-px w-full bg-slate-100 mb-8" />

      <ul className="space-y-4 mb-10 flex-grow">
        {(pkg.features || []).map((f: string, idx: number) => (
          <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm group-hover:text-slate-900 transition-colors">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> 
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button 
        onClick={handleOrder}
        className={`w-full rounded-xl h-12 text-sm font-bold transition-all gap-2 ${
          pkg.is_popular 
            ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" 
            : "bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200"
        }`} 
      >
        Order Now
        <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
      </Button>
    </div>
  );
};