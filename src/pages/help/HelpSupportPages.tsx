import { Link } from "@tanstack/react-router";
import { HeadphonesIcon, AlertCircle, Sparkles, MessageSquare, ShieldCheck, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

export const SupportHub = () => (
  <HelpPageTemplate 
    title="Support Hub" 
    subtitle="We're here to help you succeed"
    icon={HeadphonesIcon}
  >
    <h2>Get in Touch</h2>
    <p>Whether you have a question about a project, need technical assistance, or just want to say hello, our team is ready to assist you.</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose my-12">
      <div className="p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20">
        <MessageSquare className="w-10 h-10 mb-6" />
        <h3 className="text-2xl font-display font-bold mb-4">Live Chat</h3>
        <p className="text-white/80 mb-8">Speak with our support team in real-time for immediate assistance.</p>
        <Button variant="secondary" className="w-full h-12 rounded-xl font-bold">Start Chatting</Button>
      </div>
      
      <div className="p-8 rounded-3xl bg-secondary border border-border">
        <Send className="w-10 h-10 mb-6 text-primary" />
        <h3 className="text-2xl font-display font-bold mb-4">Email Support</h3>
        <p className="text-muted-foreground mb-8">Send us an email and we'll get back to you within 24 hours.</p>
        <a href="mailto:info@InfraGlobalTech.com" className="block">
          <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-primary/20 text-primary">info@InfraGlobalTech.com</Button>
        </a>
      </div>
    </div>
  </HelpPageTemplate>
);

export const TechnicalIssue = () => (
  <HelpPageTemplate 
    title="Report an Issue" 
    subtitle="Help us fix technical problems quickly"
    icon={AlertCircle}
  >
    <h2>Report Technical Issues</h2>
    <p>If you're experiencing bugs, performance issues, or security concerns with any of our delivered products, please use the form below.</p>

    <div className="not-prose max-w-2xl bg-secondary/30 p-8 rounded-3xl border border-border my-12">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Name</label>
            <Input placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Email</label>
            <Input type="email" placeholder="Your email" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Subject</label>
          <Input placeholder="Brief description of the issue" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Details</label>
          <Textarea placeholder="Please describe the issue in detail, including steps to reproduce it." className="min-h-[150px]" />
        </div>
        <Button className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20">Submit Report</Button>
      </form>
    </div>
  </HelpPageTemplate>
);

export const OffersCampaigns = () => (
  <HelpPageTemplate 
    title="Offers & Campaigns" 
    subtitle="Latest promotions and innovation grants"
    icon={Sparkles}
  >
    <h2>Current Promotions</h2>
    <p>We periodically offer special packages and discounts for startups and non-profit organizations.</p>

    <div className="not-prose my-12 space-y-6">
      {[
        { title: "Startup Innovation Grant", desc: "Up to 20% off for verified seed-stage startups building their first MVP.", tag: "Limited Time" },
        { title: "Annual Hosting Bundle", desc: "Get 2 months of premium managed hosting free when you pay annually.", tag: "Ongoing" }
      ].map((offer, i) => (
        <div key={i} className="p-6 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden group">
          <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest bg-primary text-white px-2 py-1 rounded">
            {offer.tag}
          </div>
          <h4 className="text-xl font-display font-bold mb-2">{offer.title}</h4>
          <p className="text-muted-foreground">{offer.desc}</p>
          <Button variant="link" className="p-0 text-primary font-bold mt-4 flex items-center gap-2">
            Claim Offer <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  </HelpPageTemplate>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
