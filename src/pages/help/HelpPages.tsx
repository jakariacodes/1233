import { Link } from "@tanstack/react-router";
import { CreditCard, ArrowLeft, ShieldCheck, Globe, Landmark, Zap } from "lucide-react";
import { motion } from "framer-motion";

const HelpPageTemplate = ({ title, subtitle, icon: Icon, children }: any) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24">
        <section className="py-16 bg-secondary/30 border-b border-border">
          <div className="container-custom">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
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

export const PaymentHelp = () => (
  <HelpPageTemplate 
    title="Payment Information" 
    subtitle="Global payment methods for international clients"
    icon={CreditCard}
  >
    <h2>Accepted Payment Methods</h2>
    <p>We provide multiple secure payment options to accommodate our international clients. All transactions are encrypted and processed through industry-standard gateways.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-12">
      {[
        { icon: CreditCard, title: "Stripe / Credit Card", desc: "Secure card processing globally." },
        { icon: Globe, title: "PayPal", desc: "Fast and secure online payments." },
        { icon: Landmark, title: "Bank Transfer", desc: "Direct wire transfers for large projects." },
        { icon: Zap, title: "Crypto", desc: "Alternative decentralized payments." }
      ].map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-2xl bg-secondary/50 border border-border flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <item.icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-foreground m-0">{item.title}</h4>
            <p className="text-sm text-muted-foreground m-0">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>

    <h2>Currency & Invoicing</h2>
    <p>We primarily bill in USD for international projects. For clients in specific regions like Bangladesh or the UK, local currency billing may be available upon request. Detailed invoices are provided for every milestone or monthly cycle.</p>
  </HelpPageTemplate>
);

export const DeliveryHelp = () => (
  <HelpPageTemplate 
    title="Delivery & Handover" 
    subtitle="How we deliver your digital assets"
    icon={Zap}
  >
    <h2>Project Delivery Process</h2>
    <p>At NextOnline Technology, we ensure a transparent and efficient delivery process for all our digital solutions.</p>
    
    <h3>1. Development Phases</h3>
    <p>Projects are delivered in stages defined during the strategy phase. Each stage includes quality assurance and client review before final handover.</p>
    
    <h3>2. Digital Handovers</h3>
    <p>Upon completion, you will receive:</p>
    <ul>
      <li>Source code (via GitHub/GitLab or zip)</li>
      <li>Design assets (Figma files, graphics)</li>
      <li>Documentation (User manuals, API docs)</li>
      <li>Deployment credentials and hosting setup</li>
    </ul>

    <h3>3. Post-Launch Support</h3>
    <p>We provide a standard support period (usually 30-90 days) after launch to ensure smooth operation and address any initial issues.</p>
  </HelpPageTemplate>
);
