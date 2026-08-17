import { Link } from "@tanstack/react-router";
import { Globe, Mail, Phone, MapPin } from "lucide-react";
import logoFooter from "@/assets/logo-footer.png.asset.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-padding bg-[#011612] text-white overflow-hidden relative border-t border-white/5">
      <div className="container-custom">
        {/* Call to Action Bar */}
        <div className="mb-20">
          <div className="bg-primary/10 border border-primary/20 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Build Your <span className="text-primary">Digital Future</span> With Us
                </h2>
                <p className="text-white/60">Ready to transform your business with premium digital solutions?</p>
              </div>
              <Link to="/contact">
                <button className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-lg shadow-primary/20">
                  Start Your Journey
                </button>
              </Link>
            </div>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="flex flex-col space-y-6 max-w-sm">
            <Link to="/" className="block">
              <img
                src={logoFooter.url}
                alt="NextOnline Technology"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Bangladesh's premium digital agency delivering cutting-edge solutions that transform businesses through technology and innovation.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61559869275150" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/10">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/10">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-white/10">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full md:w-auto">
            {/* Quick Contact */}
            <div className="space-y-6">
              <h3 className="text-sm uppercase font-bold tracking-widest text-white/40">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:info@thenextonline.com" className="text-sm text-white/80 hover:text-primary transition-colors">info@thenextonline.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div className="space-y-1">
                    <a href="tel:+15055241559" className="text-sm text-white/80 block hover:text-primary transition-colors">USA: +1 505-524-1559</a>
                    <a href="tel:+8801711392738" className="text-sm text-white/80 block hover:text-primary transition-colors">BD: +88 01711-392738</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Offices */}
            <div className="space-y-6 lg:col-span-2">
              <h3 className="text-sm uppercase font-bold tracking-widest text-white/40">Our Offices</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇺🇸</span>
                    <p className="text-xs font-bold text-white/80 uppercase tracking-wider">USA Office</p>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    9169 W STATE ST<br />
                    GARDEN CITY, ID 83714
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇧🇩</span>
                    <p className="text-xs font-bold text-white/80 uppercase tracking-wider">Bangladesh HQ</p>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    1505/13, Nahar Plaza, Bir Uttam C R Dotto Road, Ramana, Dhaka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Footer Area */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
            Copyright © {currentYear} NextOnline Technology Ltd. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };