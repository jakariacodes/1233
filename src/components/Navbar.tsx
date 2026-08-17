import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo.png.asset.json";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      "fixed top-4 left-0 right-0 z-50 transition-all duration-300",
      "flex justify-center px-4"
    )}>
      <div className={cn(
        "w-full max-w-7xl flex items-center justify-between rounded-full px-6 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg py-3 border border-border/50" 
          : "bg-background/40 backdrop-blur-sm py-4 border border-white/10 shadow-sm"
      )}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-white/90 p-1.5 rounded-lg shadow-sm border border-border/20 group-hover:scale-105 transition-transform duration-300">
            <img 
              src={logoAsset.url} 
              alt="TechCrafterIT" 
              className="h-8 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Menu - Centered Pill */}
        <div className="hidden lg:flex items-center bg-white/70 dark:bg-black/20 rounded-full px-2 py-1 border border-border/30 shadow-inner scale-95 xl:scale-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href as any}
              className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:text-primary flex items-center gap-1"
              activeProps={{ className: "bg-primary text-white shadow-md hover:text-white" }}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-50" />}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <Link 
            to="/login" 
            className="hidden md:block text-sm font-medium hover:text-primary transition-colors px-4"
          >
            Login
          </Link>
          <Link to="/contact">
            <Button className="rounded-full px-6 shadow-blue-500/20 shadow-lg hover:shadow-blue-500/40" variant="default">
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
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-24 z-50 bg-background/95 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href as any}
                className="block text-lg font-medium py-3 px-4 rounded-2xl hover:bg-secondary/50 transition-colors"
                activeProps={{ className: "bg-primary/10 text-primary px-4" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-border flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start rounded-2xl h-12">Login</Button>
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full rounded-2xl h-12 shadow-lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export { Navbar };