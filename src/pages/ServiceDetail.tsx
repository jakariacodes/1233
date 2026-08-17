import { Button } from "@/components/ui/button";
import { Link, useLoaderData, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Star, CheckCircle2, Users, Zap, Shield, Play, Award, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ServiceDetail = () => {
  const service = useLoaderData({ from: '/services/$id' });
  const navigate = useNavigate();

  if (!service) return null;

  const packages = service.service_packages || [];

  const handleOrder = (pkg: any) => {
    navigate({
      to: '/checkout',
      search: {
        serviceId: service.id,
        packageId: pkg.id
      }
    });
  };

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
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{service.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-1.5 text-orange-500 font-bold">
                <Star className="fill-orange-500 w-5 h-5" /> 4.9
              </div>
              <div className="w-px h-6 bg-slate-200 hidden sm:block" />
              <div className="text-muted-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="font-medium text-slate-900">Premium Quality</span>
              </div>
              <div className="w-px h-6 bg-slate-200 hidden sm:block" />
              <div className="text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-medium text-slate-900">Expert Team</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#pricing">
                <Button size="lg" className="rounded-2xl h-14 px-8 text-base shadow-xl shadow-primary/20">View Pricing</Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 text-base gap-2 border-2">Free Consultation <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
            <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100">
              <div className="relative aspect-[4/3] bg-slate-950 rounded-[2rem] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60')] bg-cover bg-center" />
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 z-10 group/play">
                  <Play className="w-8 h-8 fill-primary text-primary ml-1 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <section className="mb-24 scroll-mt-32" id="pricing">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">Pricing</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Choose Your <span className="text-primary">Package</span></h2>
              <p className="text-muted-foreground">Transparent pricing with no hidden fees. Pick the plan that matches your needs.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {packages.map((pkg: any, i: number) => (
                    <div key={pkg.id} className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 ${i === 1 ? "border-primary bg-white shadow-2xl scale-105 z-10" : "bg-white border-slate-100 shadow-sm"}`}>
                        {i === 1 && (
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg">
                            MOST POPULAR
                          </div>
                        )}
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{pkg.name}</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                          <span className="text-4xl font-bold text-slate-900">৳{pkg.price.toLocaleString()}</span>
                        </div>
                        <ul className="space-y-4 mb-10 min-h-[200px]">
                            {(pkg.features || []).map((f: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm group-hover:text-slate-900 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /> 
                                {f}
                              </li>
                            ))}
                        </ul>
                        <Button 
                          onClick={() => handleOrder(pkg)}
                          className="w-full rounded-2xl h-12 text-sm font-bold shadow-lg shadow-primary/10 group-hover:shadow-primary/20 transition-all" 
                          variant={i === 1 ? "default" : "outline"}
                        >
                          Order Now
                        </Button>
                    </div>
                ))}
            </div>
        </section>

        {/* Deliver Excellence Section */}
        <section className="mb-24 py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative">
            <div className="relative z-10 container mx-auto px-8">
              <div className="text-center max-w-2xl mx-auto mb-20">
                <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">Our Process</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">How We Deliver <span className="text-primary">Excellence</span></h2>
              </div>
              
              <div className="grid md:grid-cols-4 gap-12 relative">
                  <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-slate-200 hidden md:block" />
                  {[
                    { title: "Planning", desc: "Defining scope and goals." },
                    { title: "Design", desc: "Creating UI/UX mockups." },
                    { title: "Development", desc: "Building with modern code." },
                    { title: "Launch", desc: "Testing and deployment." }
                  ].map((step, i) => (
                      <div key={i} className="text-center group">
                          <div className="relative z-10 w-20 h-20 rounded-3xl bg-white border border-slate-100 shadow-lg flex items-center justify-center mx-auto mb-8 group-hover:border-primary group-hover:shadow-primary/10 transition-all duration-500 group-hover:-translate-y-2">
                              <span className="text-3xl font-display font-bold text-slate-200 group-hover:text-primary transition-colors">0{i+1}</span>
                          </div>
                          <h3 className="text-xl font-display font-bold mb-4">{step.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
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
                {[
                  { q: "How long does it take?", a: "Timeline depends on project scope, typically 2-4 weeks." },
                  { q: "Do you offer support?", a: "Yes, we provide 30 days of free post-launch support." }
                ].map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-200 rounded-3xl bg-white px-8 overflow-hidden transition-all duration-300 shadow-sm">
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
      </div>
    </div>
  );
};

export default ServiceDetail;
