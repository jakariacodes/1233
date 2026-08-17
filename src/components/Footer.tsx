import { Link } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Sparkles,
  Globe,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Web Design", href: "/services/web-design" },
  { name: "Web Development", href: "/services/web-development" },
  { name: "Graphic Design", href: "/services/graphic-design" },
  { name: "Video Editing", href: "/services/video-editing" },
  { name: "Digital Marketing", href: "/services/digital-marketing" },
  { name: "SEO Optimization", href: "/services/seo" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
];

export const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-morph" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] animate-morph animation-delay-2000" />
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--background)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-background/10">
        <div className="container-custom py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient p-10 md:p-14">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-x-20 -translate-y-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -translate-x-10 translate-y-10" />
            <Sparkles className="absolute top-8 right-8 w-8 h-8 text-white/20 animate-pulse" />
            
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Newsletter</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-3 text-primary-foreground">
                  Stay Updated with Us
                </h3>
                <p className="text-primary-foreground/80 max-w-md">
                  Get the latest updates, tips, exclusive offers and industry insights delivered to your inbox.
                </p>
              </div>
              <div className="w-full lg:w-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full sm:w-80 px-6 py-4 pr-12 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-primary-foreground placeholder:text-white/60 focus:outline-none focus:border-white/50 focus:bg-white/30 transition-all"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  </div>
                  <Button variant="white" size="lg" className="gap-2 px-6 shadow-lg">
                    Subscribe
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-white/60 mt-3 text-center sm:text-left">
                  No spam, unsubscribe anytime. By subscribing you agree to our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative container-custom py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6 group">
              <img src={logo} alt="TechCrafterIT" className="h-14 brightness-0 invert transition-transform duration-300 group-hover:scale-105" />
            </Link>
            <p className="text-background/60 mb-6 leading-relaxed max-w-sm">
              Bangladesh's premium digital agency delivering cutting-edge solutions 
              that transform businesses and drive measurable growth worldwide.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-11 h-11 rounded-xl bg-background/10 flex items-center justify-center transition-all duration-500 ${social.color} hover:scale-110 hover:rotate-6 hover:shadow-lg`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Mini Stats */}
            <div className="flex items-center gap-6 pt-6 border-t border-background/10">
              <div className="group cursor-default">
                <p className="text-2xl font-display font-bold text-primary group-hover:scale-110 transition-transform duration-300">850+</p>
                <p className="text-xs text-background/50">Projects</p>
              </div>
              <div className="w-px h-10 bg-background/10" />
              <div className="group cursor-default">
                <p className="text-2xl font-display font-bold text-primary group-hover:scale-110 transition-transform duration-300">650+</p>
                <p className="text-xs text-background/50">Clients</p>
              </div>
              <div className="w-px h-10 bg-background/10" />
              <div className="group cursor-default">
                <p className="text-2xl font-display font-bold text-primary group-hover:scale-110 transition-transform duration-300">5+</p>
                <p className="text-xs text-background/50">Years</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="group text-background/60 hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className="group text-background/60 hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Get In Touch
            </h4>
            <ul className="space-y-5">
              <li className="group">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-background/40 uppercase tracking-wider mb-1">Address</p>
                    <p className="text-background/80">
                      Hatibandha, Lalmonirhat,<br />Rangpur, Bangladesh
                    </p>
                  </div>
                </div>
              </li>
              <li className="group">
                <a href="tel:+8801731173992" className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-background/40 uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-background/80 group-hover:text-primary transition-colors">
                      +880 1731-173992
                    </p>
                  </div>
                </a>
              </li>
              <li className="group">
                <a href="mailto:info@techcrafterit.com" className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-background/40 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-background/80 group-hover:text-primary transition-colors">
                      info@techcrafterit.com
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-background/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm flex items-center gap-2">
              © {new Date().getFullYear()} TechCrafterIT. Made with 
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> 
              in Bangladesh
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-background/50 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-background/50 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/refund"
                className="text-background/50 hover:text-primary transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
