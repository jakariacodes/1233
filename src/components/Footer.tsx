import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Globe, Send, Heart, Sparkles, ArrowRight } from "lucide-react";
import logoFooter from "@/assets/logo-footer.png.asset.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Globe, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Send, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: Globe, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Globe, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
  ];

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#f8fafc] pt-20 pb-10 border-t border-border/50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        {/* Centered Logo Section */}
        <div className="flex flex-col items-center mb-12">
          <Link to="/" className="mb-6 block">
            <img 
              src={logoFooter.url} 
              alt="NextOnline Technology" 
              className="h-16 w-auto object-contain mx-auto"
            />
          </Link>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
            Revolutionizing the digital landscape with premium technology solutions. We build future-ready platforms that empower your business to scale and succeed globally.
          </p>
        </div>

        {/* Premium Navigation Pills */}
        <nav className="flex flex-wrap justify-center gap-3 mb-12">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href as any}
              className="px-6 py-2.5 rounded-full bg-white border border-border/50 text-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 shadow-sm text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social & Contact */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-16">
          <div className="flex flex-col items-center">
             <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-12 h-12 rounded-full bg-white border border-border/50 flex items-center justify-center text-muted-foreground ${social.color} hover:text-white transition-all duration-300 shadow-sm`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="h-px w-12 bg-border hidden md:block" />

          <div className="flex flex-col items-center text-center">
             <a href="mailto:info@nextonlinetechnology.com" className="text-xl font-display font-bold text-foreground hover:text-primary transition-colors mb-2">
                info@nextonlinetechnology.com
             </a>
             <p className="text-muted-foreground">Rangpur, Bangladesh</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">
            © {currentYear} <span className="font-semibold text-foreground">NextOnline Technology</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Created with <Heart className="w-3.5 h-3.5 text-teal-500 fill-teal-500" /> for excellence
          </p>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
    </footer>
  );
};

export { Footer };
