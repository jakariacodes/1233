import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Sparkles, Globe, Code2, Palette, Video, TrendingUp, Search, Briefcase, Zap, ArrowRight } from "lucide-react";
import React from "react";

const iconMap: Record<string, any> = {
  Globe, Code2, Palette, Video, TrendingUp, Search, Briefcase, Zap
};
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import logoHeader from "@/assets/logo-header.png.asset.json";

const services = [
  {
    icon: Globe,
    title: "Web Design",
    description: "Stunning responsive websites",
    href: "/services/web-design",
    color: "bg-blue-500"
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Scalable web applications",
    href: "/services/web-development",
    color: "bg-purple-500"
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Eye-catching brand visuals",
    href: "/services/graphic-design",
    color: "bg-orange-500"
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Cinematic video production",
    href: "/services/video-editing",
    color: "bg-emerald-500"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "ROI-driven campaigns",
    href: "/services/digital-marketing",
    color: "bg-pink-500"
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Dominate search rankings",
    href: "/services/seo-optimization",
    color: "bg-sky-500"
  },
  {
    icon: Briefcase,
    title: "Business Strategy",
    description: "Expert digital consulting",
    href: "/services/business-strategy",
    color: "bg-amber-500"
  },
  {
    icon: Zap,
    title: "AI Solutions",
    description: "AI-powered automation",
    href: "/services/ai-solutions",
    color: "bg-indigo-500"
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [dynamicServices, setDynamicServices] = useState<any[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Fetch dynamic services
    import("@/integrations/supabase/client").then(m => {
      m.supabase.from("services").select("*").order("sort_order").then(({ data }) => {
        if (data) setDynamicServices(data);
      });
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Team", href: "/team" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
      "bg-white/80 backdrop-blur-xl border-b border-border/10 py-5",
      isScrolled && "shadow-sm py-3"
    )}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img 
            src={logoHeader.url} 
            alt="NextOnline Technology" 
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative py-2"
              onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
              onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
            >
              <Link
                to={link.href as any}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-primary flex items-center gap-1 text-muted-foreground"
                )}
                activeProps={{ 
                  className: "text-primary font-semibold" 
                }}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isServicesOpen && "rotate-180")} />}
              </Link>

              {/* Mega Menu */}
              {link.hasDropdown && (
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden"
                    >
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <h3 className="text-xl font-display font-bold text-slate-900">Our Services</h3>
                            <p className="text-sm text-muted-foreground mt-1">Premium digital solutions for your business</p>
                          </div>
                          <Link to="/services" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
                            View All <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                          {(dynamicServices.length > 0 ? dynamicServices : services).map((service, idx) => (
                            <Link 
                              key={idx} 
                              to={(service.href || `/services/${service.id}`) as any} 
                              className="group flex items-start gap-4 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform", service.color || "bg-primary")}>
                                {service.icon ? <service.icon className="w-5 h-5" /> : (iconMap[service.icon_name] ? React.createElement(iconMap[service.icon_name], { className: "w-5 h-5" }) : <Globe className="w-5 h-5" />)}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{service.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{service.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 p-6 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Need something custom?</span>
                        <Link to="/contact">
                          <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-white gap-2 h-10 px-6">
                            <Sparkles className="w-4 h-4" />
                            Get Free Quote
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          <Link 
            to={"/auth" as any} 
            className="hidden md:block text-sm font-medium hover:text-primary transition-colors text-muted-foreground"
          >
            Login
          </Link>
          <Link to="/contact">
            <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-11 text-sm shadow-lg shadow-primary/25" variant="default">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-foreground/70 hover:text-primary transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-border/50 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href as any}
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  activeProps={{ className: "text-primary" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border/50 flex flex-col gap-4">
                <Link to={"/auth" as any} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2">
                  Login
                </Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full h-12 shadow-lg">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export { Navbar };
