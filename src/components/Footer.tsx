import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Globe, Sparkles, Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import infraTechLogo from "@/assets/infratech-logo.png.asset.json";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Team", href: "/team" },
  { name: "All License", href: "/license" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const services = [
  "Web Design",
  "Web Development",
  "Graphic Design",
  "Video Editing",
  "Digital Marketing",
  "SEO Optimization",
];

const socials = [
  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61559869275150" },
  { Icon: Twitter, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Linkedin, href: "#" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#0b1426] text-white pt-12 sm:pt-16 overflow-hidden">
      <div className="container-custom px-4">
        {/* Newsletter */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-6 sm:p-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <Sparkles className="absolute top-5 right-5 w-6 h-6 text-white/40" />
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              <Mail className="w-3.5 h-3.5" /> Newsletter
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-bold">Stay Updated with Us</h3>
            <p className="mt-2 text-sm text-white/85">
              Get the latest updates, tips, exclusive offers and industry insights delivered to your inbox.
            </p>
          </div>
          <div className="w-full lg:max-w-md">
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 rounded-xl bg-white/15 border border-white/30 px-4 py-3 text-sm placeholder:text-white/70 outline-none focus:border-white"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 hover:bg-white/90">
                Subscribe <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-2 text-[11px] text-white/75">No spam, unsubscribe anytime.</p>
          </div>
        </div>

        {/* Main */}
        <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link to="/"><img src={infraTechLogo.url} alt="InfraTech" className="h-11 w-auto brightness-0 invert" /></Link>
            <p className="mt-5 text-sm text-white/70 leading-relaxed">
              Empowering businesses globally with cutting-edge software solutions, web development and digital services.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 flex gap-6">
              {[["850+", "Projects"], ["650+", "Clients"], ["5+", "Years"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-xl font-bold text-blue-400">{n}</div>
                  <div className="text-xs text-white/60">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="flex items-center gap-2 font-bold mb-5"><Globe className="w-4 h-4 text-blue-400" /> Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.name}><Link to={l.href as any} className="text-sm text-white/70 hover:text-white">{l.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="flex items-center gap-2 font-bold mb-5"><Sparkles className="w-4 h-4 text-blue-400" /> Our Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}><Link to="/services" className="text-sm text-white/70 hover:text-white">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="flex items-center gap-2 font-bold mb-5"><Phone className="w-4 h-4 text-blue-400" /> Get In Touch</h4>
            <div className="space-y-5">
              {[
                { Icon: MapPin, label: "Bangladesh Office", body: <>1505/13, 37 Bir Uttam C R Dotto Road,<br />Nahar Plaza, Ramana, Dhaka-1000</> },
                { Icon: MapPin, label: "New York Office", body: <>89-15 PARSONS BLVD #10K<br />JAMAICA, NEW YORK 11432 USA</> },
                { Icon: Phone, label: "Phone", body: <a href="tel:+17602865194" className="hover:text-blue-300">+17602865194</a> },
                { Icon: Mail, label: "Email", body: <a href="mailto:info@InfraGlobalTech.com" className="hover:text-blue-300 break-all">info@InfraGlobalTech.com</a> },
              ].map(({ Icon, label, body }) => (
                <div key={label} className="flex gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-blue-500/15 flex items-center justify-center"><Icon className="w-4 h-4 text-blue-400" /></div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-white/50">{label}</div>
                    <div className="text-sm text-white/90 leading-relaxed">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10">
        <div className="container-custom px-4 py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/60 text-center">
          <p className="flex items-center gap-1">© {year} InfraTech. Made with <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" /> globally. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/refund" className="hover:text-white">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
