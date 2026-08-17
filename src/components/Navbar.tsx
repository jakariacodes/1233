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
      "w-full transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2 border-b" : "bg-white/80 backdrop-blur-sm py-4 border-b border-border/40"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img 
            src={logoAsset.url} 
            alt="TechCrafterIT" 
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu - Standard Layout */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href as any}
              className="text-sm font-semibold transition-all duration-300 hover:text-primary flex items-center gap-1"
              activeProps={{ className: "text-primary border-b-2 border-primary" }}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-50" />}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <Link 
            to={"/auth" as any} 

            className="hidden md:block text-sm font-medium hover:text-primary transition-colors px-4"
          >
            Login
          </Link>
          <Link to="/contact">
            <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold h-11" variant="default">
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
              <Link to={"/auth" as any} onClick={() => setIsMobileMenuOpen(false)}>
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