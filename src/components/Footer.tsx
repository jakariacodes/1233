import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Instagram, Twitter, Mail, Phone } from "lucide-react";
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
    <footer className="bg-[#051139] text-white pt-20 pb-10 overflow-hidden">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-12 mb-20">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-bold mb-8">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href as any}
                      className="text-[#94a3b8] hover:text-white transition-colors text-sm"
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
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Branding & Social */}
            <div className="lg:col-span-1">
              <Link to="/" className="mb-6 block">
                <img
                  src={logoFooter.url}
                  alt="NextOnline Technology"
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@nextonlinetechnology.com" className="hover:text-white transition-colors">info@nextonlinetechnology.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+8801731173992" className="hover:text-white transition-colors">09612223343</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
                <Phone className="w-4 h-4 text-primary" />
                <span>+880 1678-077198</span>
              </div>
            </div>

            {/* Office Locations */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🇺🇸</span>
                <h5 className="font-bold text-sm">USA Office</h5>
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                NextOnline Technology LLC<br />
                501 Silverside Road, Suit 105 #4987,<br />
                Wilmington, DE 19809, USA<br />
                <a href="#" className="hover:text-white">us.nextonline.com</a>
              </p>
            </div>

            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🇬🇧</span>
                <h5 className="font-bold text-sm">UK Office</h5>
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                NextOnline (UK) Ltd<br />
                71-75 Shelton St, Covent Garden,<br />
                London, WC2H 9JQ
              </p>
            </div>

            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🇧🇩</span>
                <h5 className="font-bold text-sm text-red-500">Bangladesh</h5>
              </div>
              <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                NextOnline Ltd.<br />
                27 Shaptak Square, Level-12, Plot-2 (Old-380),<br />
                Road-16 (Old-27), Dhanmondi, Dhaka - 1209<br />
                <a href="#" className="hover:text-white">nextonline.com</a>
              </p>
              <h5 className="font-bold text-xs mb-2">Branch Office</h5>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Shyamoli Square (Level-7), Plot #23/8-B, Block-B,<br />
                Bir Uttam A.N.M. Nuruzzaman Sharak, Mirpur Road,<br />
                Dhaka-1207
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-[#94a3b8] text-xs">
            Copyright © {currentYear} NextOnline Technology Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
