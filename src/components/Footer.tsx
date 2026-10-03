import { Link } from "@tanstack/react-router";
import { Globe, Mail, Phone, MapPin } from "lucide-react";
import infraTechLogo from "@/assets/infratech-logo.png.asset.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
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
      title: "Insights",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "All License", href: "/license" },
        { name: "Career", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "News", href: "/blog" },
      ],
    },
  ];

  return (
    <footer className="py-16 bg-[#071b3d] text-white overflow-hidden relative border-t border-white/5">
      <div className="container-custom">
        {/* Top Info Bar (Integrated Address & Contact) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-20 pb-12 border-b border-white/10">
          <div className="flex flex-col space-y-6">
            <Link to="/" className="block">
              <img
                src={infraTechLogo.url}
                alt="InfraTech"
                className="h-11 w-auto max-w-full object-contain brightness-0 invert"
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
                <a href="mailto:info@InfraGlobalTech.com" className="text-sm font-medium hover:text-primary transition-colors block">info@InfraGlobalTech.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 text-primary">
                <Phone className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <a href="tel:+17602865194" className="text-sm font-medium block hover:text-primary transition-colors">+1 (760) 286-5194</a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base" role="img" aria-label="USA Flag">🇺🇸</span>
              <h5 className="text-sm font-bold tracking-wider uppercase text-white/90">USA Office</h5>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] text-white/70 font-bold">InfraTech</p>
              <p className="text-[13px] text-white/60 leading-relaxed">United States</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base" role="img" aria-label="USA Flag">🇺🇸</span>
              <h5 className="text-sm font-bold tracking-wider uppercase text-white/90">New York Office</h5>
            </div>
            <div className="space-y-1">
              <p className="text-[13px] text-white/70 font-bold">InfraTech</p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                89-15 PARSONS BLVD #10K<br />
                JAMAICA, NEW YORK 11432 USA
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
              <p className="text-[13px] text-white/70 font-bold">InfraTech</p>
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
            {/* Copyright area (Left side) */}
            <div className="text-left">
              <p className="text-white/70 text-xs font-medium uppercase tracking-[0.2em]">
                Copyright © {currentYear} InfraTech. All rights reserved.
              </p>
            </div>

            {/* Links area (Right side) */}
            <div className="text-left md:text-right space-y-4">
              <div className="flex flex-wrap md:justify-end gap-6 text-xs font-bold uppercase tracking-widest text-white/80">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms & Condition</Link>
                <Link to="/refund" className="hover:text-white transition-colors">Payment & Refund Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };