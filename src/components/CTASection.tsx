import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-foreground" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-morph" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[150px] animate-morph animation-delay-2000" />
      
      {/* Orbiting circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary-foreground/5 rounded-full animate-rotate-slow" style={{ animationDuration: '40s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary-foreground/5 rounded-full animate-rotate-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/10 rounded-full animate-rotate-slow" style={{ animationDuration: '25s' }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold mb-8 hover:scale-105 transition-transform cursor-default animate-glow-pulse">
              <MessageCircle className="w-4 h-4" />
              Ready to Transform?
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-8 leading-tight">
              Let's Build Something{" "}
              <span className="text-gradient-animated">Extraordinary</span> Together
            </h2>
            <p className="text-primary-foreground/70 text-xl mb-10 max-w-lg leading-relaxed">
              Partner with Bangladesh's premium digital agency and take your 
              business to new heights. Your success story starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button variant="gradient" size="xl" className="gap-3 w-full sm:w-auto group shadow-glow hover:shadow-glow-lg transition-all duration-500 relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_100%] animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <a href="tel:+8801731173992">
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="gap-3 w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground group"
                >
                  <Phone className="w-5 h-5 group-hover:animate-bounce" />
                  <span className="group-hover:tracking-wide transition-all duration-300">Call Now</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Content - Contact Cards */}
          <div className="space-y-5 animate-slide-in-right animation-delay-200">
            {[
              {
                icon: Phone,
                label: "Call Us",
                value: "+880 1731-173992",
                href: "tel:+8801731173992",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Mail,
                label: "Email Us",
                value: "info@techcrafterit.com",
                href: "mailto:info@techcrafterit.com",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Hatibandha, Lalmonirhat, Rangpur",
                href: null,
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="group relative bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10 hover:border-primary/30 hover:bg-primary-foreground/10 transition-all duration-500 animate-slide-up overflow-hidden cursor-pointer"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                
                <div className="flex items-center gap-5 relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <contact.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-primary-foreground/50 text-sm mb-1 group-hover:text-primary-foreground/70 transition-colors">{contact.label}</p>
                    {contact.href ? (
                      <a 
                        href={contact.href} 
                        className="text-primary-foreground font-semibold text-lg hover:text-primary transition-colors"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-primary-foreground font-semibold text-lg">
                        {contact.value}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Working Hours Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-primary to-accent animate-slide-up animation-delay-600 relative overflow-hidden group hover:shadow-glow transition-all duration-500">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-accent bg-[length:200%_100%] animate-gradient-shift opacity-50" />
              
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm mb-1">Working Hours</p>
                  <p className="text-primary-foreground font-bold text-lg">24/7 Available</p>
                </div>
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
