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
      "fixed top-4 left-0 right-0 z-50 transition-all duration-300 pointer-events-none",
      isScrolled ? "top-2" : "top-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "pointer-events-auto transition-all duration-300 flex items-center justify-between px-6 py-2.5 rounded-full border border-white/20",
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-white/40" 
            : "bg-white/90 backdrop-blur-md shadow-md"
        )}>
          {/* Logo - Text instead of Image */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-xl font-bold tracking-tight text-primary">
              TechCrafter<span className="text-foreground">IT</span>
            </span>
          </Link>

          {/* Desktop Menu - Pill Style */}
          <div className="hidden lg:flex items-center bg-secondary/50 rounded-full px-2 py-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href as any}
                className={cn(
                  "text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:text-primary flex items-center gap-1",
                  "text-muted-foreground"
                )}
                activeProps={{ 
                  className: "bg-primary text-white hover:text-white shadow-sm" 
                }}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-50" />}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link 
              to={"/auth" as any} 
              className="hidden md:block text-xs font-semibold hover:text-primary transition-colors px-4"
            >
              Login
            </Link>
            <Link to="/contact">
              <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white font-bold h-10 text-xs shadow-md shadow-primary/20" variant="default">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Get Started
              </Button>
            </Link>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-foreground/70 hover:text-primary transition-colors" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 bg-white/95 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 pointer-events-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href as any}
                className="block text-base font-medium py-3 px-4 rounded-2xl hover:bg-secondary/50 transition-colors"
                activeProps={{ className: "bg-primary text-white px-4" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-border/50 flex flex-col gap-3">
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