import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Sparkles, Globe, Code2, Palette, Video, TrendingUp, Search, Briefcase, Zap, ArrowRight } from "lucide-react";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useHeroContent } from "@/hooks/useHeroContent";

const iconMap: Record<string, any> = {
  Globe, Code2, Palette, Video, TrendingUp, Search, Briefcase, Zap
};
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import infraTechLogo from "@/assets/infratech-logo.png.asset.json";

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
  const { user, isAdmin } = useAuth();
  const { data: heroData } = useHeroContent();
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
      "bg-white border-b border-border/10 py-5",
      isScrolled && "shadow-md py-3"
    )}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img 
            src={heroData?.header_logo_url || infraTechLogo.url}
            alt="InfraTech"
            className="h-11 w-auto max-w-[190px] object-contain"
          />
        </Link>

        {/* Desktop Menu - Pill Design */}
        <div className="hidden lg:flex items-center bg-slate-50/80 backdrop-blur-md border border-slate-200/50 rounded-full p-1.5 shadow-sm">
          {navLinks.map((link) => {
            const isContact = link.name === "Contact";
            return (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
              >
                {isContact ? (
                  <Link
                    to={link.href as any}
                    className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white text-sm font-bold h-9 px-6 rounded-full transition-all duration-300 shadow-sm"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    to={link.href as any}
                    className={cn(
                      "text-sm font-semibold transition-all duration-300 hover:text-primary flex items-center gap-1 text-slate-600 px-5 py-2 whitespace-nowrap"
                    )}
                    activeProps={{ 
                      className: "text-primary font-bold" 
                    }}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isServicesOpen && "rotate-180")} />}
                  </Link>
                )}

                {/* Mega Menu */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[750px] bg-white rounded-[2.5rem] shadow-[0_25px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden text-slate-900"
                      >
                        <div className="p-10 relative overflow-hidden bg-white">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                          <div className="flex items-center justify-between mb-10">
                            <div>
                              <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight">Our Services</h3>
                              <p className="text-sm text-slate-500 mt-1 font-normal">Enterprise-grade digital solutions</p>
                            </div>
                            <Link to="/services" className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={() => setIsServicesOpen(false)}>
                              View All Solutions <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
                            {(dynamicServices.length > 0 ? dynamicServices : services).map((service, idx) => (
                              <Link 
                                key={idx} 
                                to={"/services/$id" as any}
                                params={{ id: service.slug || service.id } as any}
                                className="group flex items-start gap-5 p-3 rounded-2xl hover:bg-slate-50 transition-all"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-primary bg-primary/10 shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500", service.color ? "group-hover:bg-primary" : "")}>
                                  {service.icon ? <service.icon className="w-6 h-6" /> : (iconMap[service.icon_name] ? React.createElement(iconMap[service.icon_name], { className: "w-6 h-6" }) : <Globe className="w-6 h-6" />)}
                                </div>
                                <div className="space-y-1">
                                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{service.title}</h4>
                                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal line-clamp-1">{service.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 p-8 flex items-center justify-between border-t border-slate-100">
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Transforming digital visions into reality.
                          </div>
                          <Link to="/services" onClick={() => setIsServicesOpen(false)}>
                            <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8 shadow-lg shadow-primary/20">
                              Get Started
                            </Button>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          {!user ? (
            <>
              <Link
                to="/auth"
                className="hidden md:block text-sm font-medium hover:text-primary transition-colors text-slate-600"
              >
                Login
              </Link>
              <Link to="/services" className="hidden md:block">
                <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-11 text-sm shadow-lg shadow-primary/25" variant="default">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <Link to={isAdmin ? "/admin" : "/dashboard"} className="hidden md:block">
              <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-11 text-sm shadow-lg shadow-primary/25" variant="default">
                {isAdmin ? "Admin Panel" : "Dashboard"}
              </Button>
            </Link>
          )}

          {/* Mobile Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground/70 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
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
                  className="text-lg font-semibold py-2 hover:text-primary transition-colors text-slate-700"
                  activeProps={{ className: "text-primary" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border/50 flex flex-col gap-4">
                {!user ? (
                  <>
                    <Link to={"/auth" as any} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2">
                      Login
                    </Link>
                    <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full rounded-full h-12 shadow-lg">Get Started</Button>
                    </Link>
                  </>
                ) : (
                  <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-full h-12 shadow-lg bg-primary">
                      {isAdmin ? "Admin Panel" : "Dashboard"}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export { Navbar };
