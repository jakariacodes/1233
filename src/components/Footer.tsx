import { Link } from "@tanstack/react-router";
import { Globe, Mail, Phone, MapPin } from "lucide-react";
import logoFooter from "@/assets/logo-footer.png.asset.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Custom Software", href: "/services" },
        { name: "Mobile App Development", href: "/services" },
        { name: "Web Design & Development", href: "/services" },
        { name: "MVPs & Product Design", href: "/services" },
        { name: "Cybersecurity", href: "/services" },
        { name: "Web & Search Experience", href: "/services" },
      ],
    },
    {
      title: "Industries",
      links: [
        { name: "E-Gov Solutions", href: "/services" },
        { name: "EdTech", href: "/services" },
        { name: "Maritime & PorTech", href: "/services" },
        { name: "FinTech", href: "/services" },
        { name: "HealthTech", href: "/services" },
        { name: "Telecom & Media", href: "/services" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "Modulexa", href: "#" },
        { name: "Educator LMS", href: "#" },
        { name: "Fintracko", href: "#" },
        { name: "EduFano University", href: "#" },
        { name: "EduFano School", href: "#" },
        { name: "HRworkout", href: "#" },
      ],
    },
    {
      title: "Insights",
      links: [
        { name: "Company Overview", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Career", href: "/contact" },
        { name: "Case Studies", href: "/portfolio" },
        { name: "Blog", href: "/blog" },
        { name: "News", href: "/blog" },
      ],
    },
  ];

  return (
    <footer className="py-16 bg-[#011612] text-white overflow-hidden relative border-t border-white/5">
      <div className="container-custom">
        {/* Top Info Bar (Integrated Address & Contact) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 pb-12 border-b border-white/10">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="mb-4 block">
              <img
                src={logoFooter.url}
                alt="NextOnline Technology"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61559869275150" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-primary/20 p-2 rounded-lg text-primary">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">Email Address</p>
                <a href="mailto:info@thenextonline.com" className="text-sm hover:text-primary transition-colors">info@thenextonline.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-primary/20 p-2 rounded-lg text-primary">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">Contact Phone</p>
                <a href="tel:+15055241559" className="text-sm block hover:text-primary transition-colors">USA: +15055241559</a>
                <a href="tel:+8801711392738" className="text-sm block hover:text-primary transition-colors">BD: +88 01711392738</a>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 lg:col-span-2">
            <div className="mt-1 bg-primary/20 p-2 rounded-lg text-primary">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <div>
                <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">USA Office</p>
                <p className="text-sm text-white/90 leading-relaxed font-medium">
                  9169 W STATE ST<br />
                  GARDEN CITY, ID 83714
                </p>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">UK Office</p>
                <p className="text-sm text-white/90 leading-relaxed font-medium">
                  20-22 Wenlock Road,<br />
                  London, England, N1 7GU
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-12 mb-20">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm uppercase font-bold mb-8 tracking-[0.2em] text-white/60">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href as any}
                      className="text-white/80 hover:text-primary transition-colors text-sm font-medium"
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
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            {/* Bangladesh Location (Special Highlight) */}
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🇧🇩</span>
                <h5 className="font-bold text-sm tracking-wider uppercase text-white">Bangladesh Headquarters</h5>
              </div>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                1505/13, 37 Bir Uttam C R Dotto Road, Nahar Plaza,<br />
                Ramana, Dhaka-1000, Bangladesh.
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
                Copyright © {currentYear} NextOnline Technology Ltd. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };