import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Code2, Palette, Video, TrendingUp, Search, Sparkles, Zap, Shield, Heart, CheckCircle2, Star, Clock } from "lucide-react";

const services = [
  {
    id: "web-design",
    icon: Globe,
    title: "Web Design",
    description: "Stunning, responsive websites that captivate visitors and drive conversions.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "web-development",
    icon: Code2,
    title: "Web Development",
    description: "Robust, scalable web applications built with cutting-edge technologies.",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "graphic-design",
    icon: Palette,
    title: "Graphic Design",
    description: "Eye-catching visuals that communicate your brand's unique identity.",
    color: "from-orange-500 to-red-500",
  },
];

const Services = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">We offer a wide range of digital solutions to help your business grow and succeed.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-card rounded-2xl border border-border p-8 transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-8">{service.description}</p>
              <Link to={`/services/$id`} params={{ id: service.id }}>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  View Details <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;