import { Link } from "@tanstack/react-router";
import { Package, Globe, ShieldCheck, Layout, Database, Server, ArrowLeft, CheckCircle2, Cpu, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ProductPageTemplate = ({ title, subtitle, icon: Icon, color, children }: any) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24">
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]`} />
          </div>
          <div className="container-custom relative">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2">
                <div className={`w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8`}>
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {title}
                </h1>
                <p className="text-muted-foreground text-xl leading-relaxed mb-10">
                  {subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="h-14 px-8 rounded-2xl font-bold shadow-xl shadow-primary/20">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl font-bold border-primary/20 text-primary">
                    View Demo
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="aspect-video rounded-[2.5rem] bg-secondary/50 border border-border flex items-center justify-center p-12 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Icon className="w-32 h-32 text-primary/20 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-2xl">
                    <p className="text-sm font-bold text-foreground">Interactive Showcase</p>
                    <p className="text-xs text-muted-foreground mt-1">Explore the core features and interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-border">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto prose prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-li:text-muted-foreground">
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export const ModulexaPage = () => (
  <ProductPageTemplate 
    title="Modulexa" 
    subtitle="The ultimate modular ERP for modern enterprises."
    icon={Cpu}
  >
    <h2>Transform Your Operations</h2>
    <p>Modulexa is our flagship enterprise resource planning solution, designed to scale with your business. It brings all your departments together in one unified, high-performance platform.</p>
    
    <h3>Key Features</h3>
    <ul>
      <li>Modular Architecture: Only pay for what you need.</li>
      <li>AI-Powered Analytics: Real-time insights for better decision making.</li>
      <li>Seamless Integrations: Connect with your existing tech stack easily.</li>
      <li>Enterprise-Grade Security: End-to-end encryption and robust access controls.</li>
    </ul>

    <h3>Why Modulexa?</h3>
    <p>Unlike traditional, rigid ERP systems, Modulexa is built on a modern stack that prioritizes speed, usability, and flexibility. It adapts to your workflows, not the other way around.</p>
  </ProductPageTemplate>
);

export const DomainPage = () => (
  <ProductPageTemplate 
    title="Premium Domains" 
    subtitle="Secure your global identity with the perfect domain name."
    icon={Globe}
  >
    <h2>Your Brand Starts Here</h2>
    <p>Find and register the perfect domain name for your business. We offer a wide range of TLDs, including .com, .net, .io, .tech, and many more.</p>
    
    <div className="not-prose my-12 p-8 rounded-[2rem] bg-secondary/30 border border-border">
      <h3 className="text-xl font-display font-bold mb-6">Domain Search</h3>
      <div className="flex gap-2">
        <input className="flex-grow h-12 rounded-xl bg-white border border-border px-4 font-medium" placeholder="yourbrand.com" />
        <Button className="h-12 px-6 rounded-xl font-bold">Search</Button>
      </div>
    </div>

    <h3>Included Benefits</h3>
    <ul>
      <li>Free WHOIS Privacy Protection</li>
      <li>Managed DNS with 100% Uptime</li>
      <li>Easy Domain Transfers</li>
      <li>24/7 Support</li>
    </ul>
  </ProductPageTemplate>
);

export const HostingPage = () => (
  <ProductPageTemplate 
    title="Managed Hosting" 
    subtitle="Blazing fast infrastructure for your digital assets."
    icon={Server}
  >
    <h2>Next-Gen Web Infrastructure</h2>
    <p>Our hosting solutions are built on top-tier cloud providers, optimized for performance, security, and scalability.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 not-prose my-12">
      {[
        { name: "Cloud Starter", price: "$29", features: ["10GB NVMe Storage", "Unmetered Bandwidth", "Free SSL", "1 Website"] },
        { name: "Business Pro", price: "$99", features: ["50GB NVMe Storage", "Priority Support", "Daily Backups", "10 Websites"] },
        { name: "Enterprise", price: "$299", features: ["Dedicated Resources", "Advanced Security", "Custom Config", "Unlimited"] }
      ].map((plan, i) => (
        <div key={i} className="p-8 rounded-3xl bg-white border border-border hover:border-primary transition-colors shadow-sm">
          <h4 className="font-display font-bold text-xl mb-1">{plan.name}</h4>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-3xl font-bold">{plan.price}</span>
            <span className="text-muted-foreground text-sm">/mo</span>
          </div>
          <ul className="space-y-3 mb-8">
            {plan.features.map((f, j) => (
              <li key={j} className="text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          <Button variant="outline" className="w-full rounded-xl font-bold border-primary/20 text-primary">Select Plan</Button>
        </div>
      ))}
    </div>
  </ProductPageTemplate>
);

export const BusinessManagementPage = () => (
  <ProductPageTemplate 
    title="Business Manager" 
    subtitle="Complete ERP & CRM solutions for growing businesses."
    icon={Database}
  >
    <h2>Manage Everything in One Place</h2>
    <p>Our Business Management software provides a holistic view of your operations, from sales and marketing to inventory and finance.</p>
    
    <h3>Core Modules</h3>
    <ul>
      <li>CRM: Manage leads, customers, and sales pipelines.</li>
      <li>Inventory: Real-time tracking and automated reordering.</li>
      <li>Finance: Automated invoicing, expense tracking, and reporting.</li>
      <li>HR: Employee management, payroll, and attendance.</li>
    </ul>
  </ProductPageTemplate>
);

export const HospitalManagementPage = () => (
  <ProductPageTemplate 
    title="MedTrack Pro" 
    subtitle="Integrated healthcare management systems."
    icon={ShieldCheck}
  >
    <h2>Elevate Patient Care</h2>
    <p>MedTrack Pro is a specialized hospital management system (HMS) designed to streamline clinical and administrative workflows.</p>
    
    <h3>HMS Solutions</h3>
    <ul>
      <li>Patient Records (EMR): Secure, digital medical history.</li>
      <li>Appointment Scheduling: Online booking and automated reminders.</li>
      <li>Billing & Insurance: Integrated claims processing and billing.</li>
      <li>Pharmacy & Lab: Unified inventory and result management.</li>
    </ul>
  </ProductPageTemplate>
);

export const WebTemplatesPage = () => (
  <ProductPageTemplate 
    title="Web Templates" 
    subtitle="Premium, ready-to-launch website skeletons."
    icon={Layout}
  >
    <h2>Launch Faster with Templates</h2>
    <p>Browse our collection of high-quality, conversion-optimized web templates designed for various industries.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose my-12">
      {[
        { title: "SaaS Starter", type: "Next.js + Tailwind", img: "bg-blue-500/10" },
        { title: "Corporate Portfolio", type: "React + Framer Motion", img: "bg-emerald-500/10" },
        { title: "E-Commerce Suite", type: "Shopify / Custom", img: "bg-purple-500/10" },
        { title: "LMS Platform", type: "Next.js + Supabase", img: "bg-amber-500/10" }
      ].map((tpl, i) => (
        <div key={i} className="group rounded-3xl border border-border overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all">
          <div className={`aspect-video ${tpl.img} flex items-center justify-center`}>
            <Layout className="w-16 h-16 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg">{tpl.title}</h4>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{tpl.type}</p>
            </div>
            <Button size="sm" variant="ghost" className="h-10 w-10 rounded-full bg-secondary">
              <Rocket className="w-4 h-4 text-primary" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </ProductPageTemplate>
);
