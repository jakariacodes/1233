import { Link } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Globe, Send, Camera, ArrowRight, ArrowUpRight, Heart, Sparkles } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Globe, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Send, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: Camera, href: "#", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500" },
    { icon: Globe, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Latest News", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  const services = [
    { name: "Web Development", href: "/services/web-development" },
    { name: "UI/UX Design", href: "/services/ui-ux-design" },
    { name: "Digital Marketing", href: "/services/digital-marketing" },
    { name: "App Development", href: "/services/app-development" },
    { name: "IT Consulting", href: "/services/it-consulting" },
  ];

  return (
    <footer className="bg-secondary/30 pt-20 pb-10 border-t border-border/50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg transform group-hover:rotate-12 transition-all duration-500">
                T
              </div>
              <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                TechCrafter<span className="text-primary">IT</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Empowering businesses through innovative technology solutions. We craft digital experiences that drive growth and inspire success.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground ${social.color} hover:text-white hover:border-transparent hover:-translate-y-1 transition-all duration-300 shadow-sm`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Our Services
            </h4>
            <ul className="space-y-4">
              {services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Contact Us
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground mb-1">Office Location</span>
                  <address className="not-italic font-medium">Rangpur, Bangladesh</address>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex-shrink-0 flex items-center justify-center text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground mb-1">Email Address</span>
                  <a href="mailto:contact@techcrafterit.com" className="font-medium hover:text-primary transition-colors">
                    contact@techcrafterit.com
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground mb-1">Phone Number</span>
                  <a href="tel:+8801234567890" className="font-medium hover:text-primary transition-colors">
                    +880 1234 567890
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">
            © {currentYear} TechCrafterIT. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/refund" className="text-sm text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 animate-pulse" /> by TechCrafterIT
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
