import { Button } from "@/components/ui/button";
import { useParams, Link } from "@tanstack/react-router";
import { 
  ArrowLeft, ArrowRight, Star, Clock, CheckCircle2, Users, 
  Zap, Shield, RefreshCw, MessageCircle, ChevronRight,
  Globe, Code2, Palette, Video, TrendingUp, Search, Briefcase
} from "lucide-react";

// Placeholder images
const serviceWeb = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60";
const serviceMarketing = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60";
const serviceCreative = "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=60";

const servicesData: Record<string, any> = {
  "web-design": {
    id: "web-design",
    icon: Globe,
    title: "Web Design",
    description: "Stunning, responsive websites that captivate visitors and drive conversions.",
    image: serviceWeb,
    gradient: "from-blue-500 to-cyan-500",
    stats: { projects: "120+", rating: "4.9", clients: "85+" },
    features: ["Responsive Design", "UI/UX Excellence", "Brand Integration"],
    gigs: [
       { id: "1", title: "Landing Page", price: 99, deliveryDays: 3, features: ["1 Page", "Responsive"] }
    ],
    faqs: []
  },
  "web-development": {
    id: "web-development",
    icon: Code2,
    title: "Web Development",
    description: "Robust, scalable web applications built with cutting-edge technologies.",
    image: serviceWeb,
    gradient: "from-violet-500 to-purple-500",
    stats: { projects: "200+", rating: "4.9", clients: "150+" },
    features: ["Custom Dev", "E-commerce", "API Integration"],
    gigs: [],
    faqs: []
  }
};

const ServiceDetail = () => {
  const { id } = useParams({ from: '/services/$id' }) as { id: string };
  const service = servicesData[id];

  if (!service) return <div>Service not found</div>;

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Link to="/services" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
        <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">{service.description}</p>
        <img src={service.image} alt={service.title} className="w-full h-96 object-cover rounded-3xl mb-12" />
      </div>
    </div>
  );
};

export default ServiceDetail;
