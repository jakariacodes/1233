import { Link } from "@tanstack/react-router";
import { Globe, Mail, Phone, MapPin } from "lucide-react";
import logoFooter from "@/assets/logo-footer.png.asset.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Help",
      links: [
        { name: "Payment", href: "/help/payment" },
        { name: "Delivery", href: "/help/delivery" },
        { name: "Chat with us", href: "/help/support" },
        { name: "Technical issue", href: "/help/technical-issue" },
        { name: "Offers & Campaigns", href: "/help/offers" },
        { name: "Next Online Support", href: "/help/support" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "Modulexa", href: "/products/modulexa" },
        { name: "Domain", href: "/products/domain" },
        { name: "Hosting", href: "/products/hosting" },
        { name: "Business Management", href: "/products/business-management" },
        { name: "Hospital Management", href: "/products/hospital-management" },
        { name: "Web Template", href: "/products/web-templates" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Custom Software", href: "/services" },
        { name: "Web Design & Development", href: "/services" },
        { name: "SEO Optimization", href: "/services" },
        { name: "Graphic Design", href: "/services" },
        { name: "Digital Marketing", href: "/services" },
      ],
    },
    {
      title: "Insights",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Case Studies", href: "/portfolio" },
        { name: "Career", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "News", href: "/blog" },
      ],
    },
  ];

  return (
    <footer className="py-16 bg-[#011612] text-white overflow-hidden relative border-t border-white/5">
      <div className="container-custom">
        {/* Top Info Bar (Integrated Address & Contact) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-20 pb-12 border-b border-white/10">
          <div className="flex flex-col space-y-6">
            <Link to="/" className="block">
              <img
                src={logoFooter.url}
                alt="NextOnline Technology"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61559869275150" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-primary">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <a href="mailto:info@thenextonline.com" className="text-sm font-medium hover:text-primary transition-colors block">info@thenextonline.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 text-primary">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <a href="tel:+14136281326" className="text-sm font-medium block hover:text-primary transition-colors">+1 (413) 628-1326</a>
                <a href="tel:+8801711392738" className="text-sm font-medium block hover:text-primary transition-colors">+88 01711-392738</a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base" role="img" aria-label="USA Flag">🇺🇸</span>
              <h5 className="text-sm font-bold tracking-wider uppercase text-white/90">USA Office</h5>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] text-white/70 font-bold">Next Online LLC</p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                1209 Mountain Road Pl NE, Ste N<br />
                Albuquerque, NM, 87110 USA
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base" role="img" aria-label="UK Flag">🇬🇧</span>
              <h5 className="text-sm font-bold tracking-wider uppercase text-white/90">UK Office</h5>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] text-white/70 font-bold">NEXT ONLINE GLOBAL LTD</p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                20-22 Wenlock Road, London,<br />
                England, N1 7GU UK
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base" role="img" aria-label="Bangladesh Flag">🇧🇩</span>
              <h5 className="text-sm font-bold tracking-wider uppercase text-white/90">Bangladesh</h5>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] text-white/70 font-bold">Next Online Technology</p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                1505/13, 37 Bir Uttam C R Dotto Road,<br />
                Nahar Plaza, Ramana, Dhaka-1000
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-12 mb-20">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm uppercase font-bold mb-8 tracking-[0.2em] text-white">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href as any}
                      className="text-white hover:text-primary transition-colors text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Lower Footer Area */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            {/* Tagline or Brief Description */}
            <div className="max-w-md">
              <p className="text-sm text-white/50 leading-relaxed italic">
                Empowering businesses globally with cutting-edge software solutions and digital innovation.
              </p>
            </div>

            {/* Copyright & Links */}
            <div className="text-left md:text-right space-y-4">
              <div className="flex flex-wrap md:justify-end gap-6 text-xs font-bold uppercase tracking-widest text-white/60">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>

              </div>
              <p className="text-white/50 text-xs font-medium uppercase tracking-[0.2em]">
                Copyright © {currentYear} NextOnline Technology. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };