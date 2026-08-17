import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, LayoutDashboard, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 py-2"
          : "bg-white/90 backdrop-blur-lg py-4"
      }`}
    >
      {/* Premium Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/[0.02] via-transparent to-accent/[0.02]" />
      </div>

      <div className="container-custom relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-10">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg" />
            <div className="relative p-1 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300">
              <img 
                src={logo} 
                alt="TechCrafterIT" 
                className="h-10 md:h-12 transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-gray-100/80 backdrop-blur-sm border border-gray-200/50 shadow-inner">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    location.pathname === link.href
                      ? "text-white bg-gradient-to-r from-primary to-primary/90 shadow-md shadow-primary/25"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/80"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.href && (
                    <span className="absolute inset-0 rounded-full bg-primary/20 blur-md -z-10 animate-pulse" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                      <LayoutDashboard className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={() => signOut()} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                  Login
                </Button>
              </Link>
            )}
            <Link to="/contact">
              <Button className="group/btn gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/25 rounded-full px-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 relative overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Sparkles className="w-4 h-4 relative z-10 group-hover/btn:animate-spin" />
                <span className="relative z-10">Get Started</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 animate-scale-in" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 animate-scale-in" />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-2xl shadow-black/5">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-5 py-3.5 rounded-2xl font-medium transition-all duration-300 animate-fade-in ${
                    location.pathname === link.href
                      ? "text-white bg-gradient-to-r from-primary to-primary/90 shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3 pt-5 mt-5 border-t border-gray-200">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="outline" className="w-full h-12 rounded-xl gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => signOut()}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/auth" className="flex-1">
                  <Button variant="outline" className="w-full h-12 rounded-xl">
                    Login
                  </Button>
                </Link>
              )}
              <Link to="/contact" className="flex-1">
                <Button className="w-full h-12 rounded-xl gap-2 bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
