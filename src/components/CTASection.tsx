import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Mail, MapPin, MessageCircle, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#061e24]">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 tech-grid opacity-10 -z-20" />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-xl relative overflow-hidden">
            {/* Inner glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight tracking-tight">
                  Build Your <span className="text-primary">Digital Future</span> With Us
                </h2>
                <p className="text-white/60 text-xl mb-10 leading-relaxed">
                  Join hundreds of forward-thinking brands who trust NextOnline Technology 
                  to deliver premium digital experiences that scale.
                </p>
                
                <div className="flex flex-wrap gap-6">
                  <Link to="/contact">
                    <Button size="xl" className="h-16 px-10 rounded-2xl gap-3 shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all font-bold text-lg">
                      Start Your Journey
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <a href="tel:+8801731173992" className="flex items-center gap-4 text-white group">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Call Now</p>
                      <p className="font-display font-bold">+880 1731-173992</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    icon: Mail,
                    label: "Email Inquiry",
                    value: "info@nextonlinetechnology.com",
                    href: "mailto:info@nextonlinetechnology.com"
                  },
                  {
                    icon: MapPin,
                    label: "Headquarters",
                    value: "Hatibandha, Lalmonirhat, Rangpur",
                    href: null
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white font-display font-bold text-lg hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-display font-bold text-lg">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Availability card */}
                <div className="p-6 rounded-3xl bg-primary border border-primary/20 flex items-center justify-between text-white">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
                    <p className="font-display font-bold text-xl">24/7 Premium Support</p>
                  </div>
                  <div className="relative">
                    <div className="w-3 h-3 bg-white rounded-full animate-ping absolute" />
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
