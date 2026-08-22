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
        ? "border-primary bg-primary/5 shadow-2xl scale-[1.02] z-10" 
        : "bg-white/5 border-white/10 hover:border-white/20 shadow-sm"
    }`}>
      {pkg.is_popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] uppercase tracking-widest font-black px-4 py-1.5 rounded-full shadow-lg z-20">
          Recommended
        </div>
      )}
      
      <div className="mb-6">
        <h3 className={`text-xl font-display font-bold mb-2 transition-colors ${pkg.is_popular ? "text-primary" : "text-white"}`}>
          {pkg.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-medium text-white/50">$</span>
          <span className="text-4xl font-display font-bold text-white">{pkg.price.toLocaleString()}</span>
          <span className="text-xs text-white/40 ml-1">/ project</span>
        </div>
      </div>

      <div className="h-px w-full bg-white/5 mb-8" />

      <ul className="space-y-4 mb-10 flex-grow">
        {(pkg.features || []).map((f: string, idx: number) => (
          <li key={idx} className="flex items-start gap-3 text-white/70 text-sm group-hover:text-white transition-colors">
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
            : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
        }`} 
      >
        Order Now
        <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
      </Button>
    </div>
  );
};