import { Button } from "@/components/ui/button";
import { useParams, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Star, Clock, CheckCircle2, Users, Zap, Shield, MessageCircle, Play, ChevronRight, Award, MapPin, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Enhanced mock data for all services
const servicesData: Record<string, any> = {
  "web-design": {
    title: "Web Design",
    subtitle: "Stunning, Responsive Websites That Captivate",
    description: "We create modern, high-converting websites that perfectly represent your brand and drive results. From landing pages to complex corporate sites, we ensure a premium user experience.",
    stats: { rating: "4.9", projects: "120+", clients: "85+" },
    packages: [
      { name: "Starter", price: 299, features: ["5 Pages", "Responsive Design", "Basic SEO", "Contact Form"] },
      { name: "Business", price: 599, popular: true, features: ["10 Pages", "Advanced SEO", "Content Management", "Performance Optimization"] },
      { name: "Enterprise", price: 1299, features: ["Custom Features", "E-commerce Ready", "Dedicated Support", "Full Integration"] }
    ],
    process: [
      { title: "Planning", description: "Defining scope, goals, and user journeys." },
      { title: "Design", description: "Creating pixel-perfect UI/UX mockups." },
      { title: "Development", description: "Building with modern, scalable code." },
      { title: "Launch", description: "Rigorous testing and final deployment." }
    ],
    faqs: [
      { q: "Is the website mobile-friendly?", a: "Yes, every site we build is fully responsive across all devices." },
      { q: "Do you offer maintenance?", a: "Yes, we provide ongoing support and updates." }
    ]
  },
  "web-development": {
    title: "Web Development",
    subtitle: "Scalable Web Applications Built for Performance",
    description: "We build robust and secure web applications using cutting-edge technologies. Our solutions are designed to scale with your business and provide seamless performance under heavy loads.",
    stats: { rating: "5.0", projects: "200+", clients: "150+" },
    packages: [
      { name: "MVP Package", price: 999, features: ["Core Features", "Database Integration", "User Auth", "API Design"] },
      { name: "Standard App", price: 2499, popular: true, features: ["Full Scale Features", "Third-party APIs", "Admin Dashboard", "Security Hardening"] },
      { name: "Enterprise App", price: 4999, features: ["Microservices", "Advanced Analytics", "High Availability", "Custom Architecture"] }
    ],
    process: [
      { title: "Architecture", description: "Designing the system and database schema." },
      { title: "API Development", description: "Building secure and efficient backend APIs." },
      { title: "Frontend", description: "Crafting a highly interactive user interface." },
      { title: "QA & Deployment", description: "Extensive testing and cloud deployment." }
    ],
    faqs: [
      { q: "What technologies do you use?", a: "We specialize in React, Node.js, and modern cloud infrastructures." }
    ]
  },
  "video-editing": {
    title: "Video Editing",
    subtitle: "Tell Your Story With Cinematic Impact",
    description: "We produce scroll-stopping videos that capture attention and drive engagement. From social media clips to corporate films, our editing adds cinematic polish that elevates your brand.",
    stats: { rating: "4.9", projects: "80+", clients: "60+" },
    packages: [
      { name: "Social Media Video", price: 79, features: ["Short form clips", "Transitions", "Subtitles", "Basic Color Grading"] },
      { name: "Promotional Video", price: 249, popular: true, features: ["Custom Motion Graphics", "VO", "Sound Design", "Thumbnails"] },
      { name: "Corporate Package", price: 599, features: ["Full Editing", "Advanced Effects", "Color Correction", "Multi-version"] }
    ],
    process: [
      { title: "Briefing", description: "Understanding your vision, brand, and audience." },
      { title: "Rough Cut", description: "Initial assembly of footage and sound." },
      { title: "Polish", description: "Color grading and advanced motion graphics." },
      { title: "Final Delivery", description: "Rendered in high-quality for your platform." }
    ],
    faqs: [
      { q: "What formats do you deliver?", a: "We provide MP4, MOV, and platform-specific formats." }
    ]
  },
  "graphic-design": {
    title: "Graphic Design",
    subtitle: "Eye-Catching Visuals for Your Brand",
    description: "Creative design solutions that speak louder than words. We craft visual identities that leave a lasting impression on your target audience.",
    stats: { rating: "4.8", projects: "400+", clients: "200+" },
    packages: [
        { name: "Logo Design", price: 149, features: ["3 Concepts", "Vector Files", "Brand Guide"] },
        { name: "Social Kit", price: 299, popular: true, features: ["Posts & Stories", "Banners", "Icons", "Custom Graphics"] },
        { name: "Full Branding", price: 799, features: ["Logo + Brand Kit", "Stationery", "Style Guide", "Unlimited Revisions"] }
    ],
    process: [
        { title: "Concept", description: "Brainstorming and initial sketching." },
        { title: "Drafting", description: "Creating digital drafts for review." },
        { title: "Refining", description: "Fine-tuning based on your feedback." },
        { title: "Delivery", description: "Providing all source files and assets." }
    ],
    faqs: [
        { q: "Do I own the copyrights?", a: "Yes, you have full ownership of the final designs." }
    ]
  },
  "digital-marketing": {
    title: "Digital Marketing",
    subtitle: "ROI-Driven Campaigns to Grow Your Business",
    description: "Strategic marketing campaigns that amplify your reach and maximize ROI across search engines and social platforms.",
    stats: { rating: "4.8", projects: "150+", clients: "100+" },
    packages: [
        { name: "Starter Kit", price: 499, features: ["Social Media Ads", "Basic Targeting", "Weekly Reports"] },
        { name: "Growth Plan", price: 999, popular: true, features: ["Multi-Channel Strategy", "Advanced Tracking", "Monthly Consulting"] },
        { name: "Scale Plan", price: 1999, features: ["Full Funnel Strategy", "CRO", "Daily Optimization", "Custom Dashboards"] }
    ],
    process: [
        { title: "Audit", description: "Analyzing current performance and competitors." },
        { title: "Strategy", description: "Building a data-driven marketing plan." },
        { title: "Campaigns", description: "Launching and managing targeted ads." },
        { title: "Reporting", description: "In-depth analysis and optimization." }
    ],
    faqs: [
        { q: "How soon can I see results?", a: "While some ads show immediate results, long-term growth typically takes 2-3 months." }
    ]
  }
};

const ServiceDetail = () => {
  const { id } = useParams({ from: '/services/$id' }) as { id: string };
  const service = servicesData[id] || servicesData["video-editing"];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="container-custom">
        {/* Back Link */}
        <Link to="/services" className="inline-flex items-center gap-2 mb-12 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Services
        </Link>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="flex items-center gap-2 mb-6 text-primary">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Professional Digital Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-primary font-semibold mb-6">{service.subtitle}</p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{service.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-1.5 text-orange-500 font-bold">
                <Star className="fill-orange-500 w-5 h-5" /> 
                {service.stats.rating}
              </div>
              <div className="w-px h-6 bg-slate-200 hidden sm:block" />
              <div className="text-muted-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-medium text-slate-900">{service.stats.projects}</span> Projects
              </div>
              <div className="w-px h-6 bg-slate-200 hidden sm:block" />
              <div className="text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium text-slate-900">{service.stats.clients}</span> Clients
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-2xl h-14 px-8 text-base shadow-xl shadow-primary/20">View Pricing</Button>
              <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 text-base gap-2 border-2">Free Consultation <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
            <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100">
              <div className="relative aspect-[4/3] bg-slate-950 rounded-[2rem] overflow-hidden flex items-center justify-center">
                {/* Visual placeholder for service video/image */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60')] bg-cover bg-center" />
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 z-10 group/play">
                  <Play className="w-8 h-8 fill-primary text-primary ml-1 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white z-10">
                  <span className="text-sm font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">Watch Demo</span>
                  <div className="flex items-center gap-2 text-sm font-medium bg-primary px-4 py-2 rounded-full shadow-lg">
                    <Zap className="w-4 h-4" /> 100% Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section (Moved Top as requested) */}
        <section className="mb-24 scroll-mt-32" id="pricing">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">Pricing</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Choose Your <span className="text-primary">Package</span></h2>
              <p className="text-muted-foreground">Transparent pricing with no hidden fees. Pick the plan that matches your needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {service.packages.map((pkg: any, i: number) => (
                    <div key={i} className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 ${pkg.popular ? "border-primary bg-white shadow-2xl scale-105 z-10" : "bg-white border-slate-100 shadow-sm"}`}>
                        {pkg.popular && (
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg">
                            MOST POPULAR
                          </div>
                        )}
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{pkg.name}</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                          <span className="text-4xl font-bold text-slate-900">${pkg.price}</span>
                          <span className="text-muted-foreground">/project</span>
                        </div>
                        <ul className="space-y-4 mb-10 min-h-[200px]">
                            {pkg.features.map((f: string) => (
                              <li key={f} className="flex items-start gap-3 text-muted-foreground text-sm group-hover:text-slate-900 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /> 
                                {f}
                              </li>
                            ))}
                        </ul>
                        <Button className="w-full rounded-2xl h-12 text-sm font-bold shadow-lg shadow-primary/10 group-hover:shadow-primary/20 transition-all" variant={pkg.popular ? "default" : "outline"}>Order Now</Button>
                    </div>
                ))}
            </div>
        </section>

        {/* Deliver Excellence Section */}
        <section className="mb-24 py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 container mx-auto px-8">
              <div className="text-center max-w-2xl mx-auto mb-20">
                <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">Our Process</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">How We Deliver <span className="text-primary">Excellence</span></h2>
                <p className="text-muted-foreground">A proven 4-step process designed for maximum results and complete transparency.</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-12 relative">
                  {/* Dotted Connection Line (Desktop) */}
                  <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-slate-200 hidden md:block" />
                  
                  {service.process.map((step: any, i: number) => (
                      <div key={i} className="text-center group">
                          <div className="relative z-10 w-20 h-20 rounded-3xl bg-white border border-slate-100 shadow-lg flex items-center justify-center mx-auto mb-8 group-hover:border-primary group-hover:shadow-primary/10 transition-all duration-500 group-hover:-translate-y-2">
                              <span className="text-3xl font-display font-bold text-slate-200 group-hover:text-primary transition-colors">0{i+1}</span>
                          </div>
                          <h3 className="text-xl font-display font-bold mb-4">{step.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                  ))}
              </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-16">
              <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">Support</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Frequently Asked <span className="text-primary">Questions</span></h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
                {service.faqs.map((faq: any, i: number) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-200 rounded-3xl bg-white px-8 overflow-hidden transition-all duration-300 hover:border-primary/30 shadow-sm data-[state=open]:shadow-xl data-[state=open]:border-primary/30">
                        <AccordionTrigger className="text-left font-bold text-lg hover:text-primary transition-colors py-6 no-underline">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                          {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>

        {/* Ready to Start Banner */}
        <section>
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-primary via-accent to-primary p-12 md:p-20 text-center animate-gradient bg-[length:200%_auto]">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                Ready to Start Your <br /> {service.title} Project?
              </h2>
              <p className="text-white/80 text-lg md:text-xl mb-12">
                Choose a package above or contact us for a custom solution. Free consultation — no commitment required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact">
                  <Button size="xl" className="bg-white text-primary hover:bg-slate-50 font-bold px-10 h-16 rounded-2xl group transition-all shadow-xl">
                    Get Free Quote
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold px-10 h-16 rounded-2xl group transition-all backdrop-blur-sm">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetail;
