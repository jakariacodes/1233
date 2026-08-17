import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
      "bg-white border-b border-border/10 py-4",
      isScrolled && "shadow-md py-3"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <span className={cn(
            "text-2xl font-bold tracking-tight transition-colors duration-300",
            isScrolled ? "text-primary" : "text-primary"
          )}>
            TechCrafter<span className={cn(
              "transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-foreground"
            )}>IT</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href as any}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-primary flex items-center gap-1",
                isScrolled ? "text-muted-foreground" : "text-muted-foreground"
              )}
              activeProps={{ 
                className: "text-primary font-semibold" 
              }}
            >
              {link.name}
              {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-50" />}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          <Link 
            to={"/auth" as any} 
            className={cn(
              "hidden md:block text-sm font-medium hover:text-primary transition-colors",
              isScrolled ? "text-muted-foreground" : "text-muted-foreground"
            )}
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
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-border/50 shadow-xl animate-in slide-in-from-top duration-300">
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
        </div>
      )}
    </nav>
  );
};

export { Navbar };
