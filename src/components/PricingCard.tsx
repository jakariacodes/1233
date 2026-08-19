import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
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
    <div className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 ${pkg.is_popular ? "border-primary bg-white shadow-2xl scale-105 z-10" : "bg-white border-slate-100 shadow-sm"}`}>
      {pkg.is_popular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg">
          MOST POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{pkg.name}</h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-bold text-slate-900">৳{pkg.price.toLocaleString()}</span>
      </div>
      <ul className="space-y-4 mb-10 min-h-[200px]">
        {(pkg.features || []).map((f: string, idx: number) => (
          <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm group-hover:text-slate-900 transition-colors">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /> 
            {f}
          </li>
        ))}
      </ul>
      <Button 
        onClick={handleOrder}
        className="w-full rounded-2xl h-12 text-sm font-bold shadow-lg shadow-primary/10 group-hover:shadow-primary/20 transition-all" 
        variant={pkg.is_popular ? "default" : "outline"}
      >
        Order Now
      </Button>
    </div>
  );
};
