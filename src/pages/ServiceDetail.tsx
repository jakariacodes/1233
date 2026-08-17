import { Button } from "@/components/ui/button";
import { useParams, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Star, Clock, CheckCircle2, Users, Zap, Shield, MessageCircle, Play, ChevronRight, Award, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Mock data based on premium service layout
const serviceData = {
  title: "Video Editing",
  subtitle: "Tell Your Story With Cinematic Impact",
  description: "We produce scroll-stopping videos that capture attention and drive engagement. From social media clips to corporate films, our editing adds cinematic polish that elevates your brand above the noise.",
  stats: { rating: "4.9", projects: "80+", clients: "60+" },
  packages: [
    { name: "Social Media Video", price: 79, features: ["Short form clips", "Transitions", "Subtitles", "Basic Color Grading"] },
    { name: "Promotional Video", price: 249, popular: true, features: ["Custom Motion Graphics", "VO", "Sound Design", "Thumbnails"] },
    { name: "Corporate Package", price: 599, features: ["Full Editing", "Advanced Effects", "Color Correction", "Multi-version"] }
  ],
  process: [
    { title: "Briefing", description: "Understanding your vision, brand, and target audience." },
    { title: "Rough Cut", description: "Initial assembly of footage and sound design." },
    { title: "Polish", description: "Color grading, advanced motion graphics, and effects." },
    { title: "Final Delivery", description: "Rendered in high-quality for your platform of choice." }
  ],
  faqs: [
    { q: "What video formats do you deliver?", a: "We provide high-quality MP4, MOV, and platform-specific formats (YouTube, TikTok, Instagram)." },
    { q: "Do you provide raw footage?", a: "Raw files can be provided upon request." },
    { q: "Can you add subtitles?", a: "Yes, we provide multi-language subtitles." }
  ]
};

const ServiceDetail = () => {
  const { id } = useParams({ from: '/services/$id' }) as { id: string };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase">Professional Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">{serviceData.title}</h1>
            <p className="text-xl text-primary font-semibold mb-6">{serviceData.subtitle}</p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">{serviceData.description}</p>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-1 text-orange-500 font-bold"><Star className="fill-orange-500" /> {serviceData.stats.rating}</div>
              <div className="text-muted-foreground">{serviceData.stats.projects} Projects</div>
              <div className="text-muted-foreground">{serviceData.stats.clients} Clients</div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="rounded-2xl">View Pricing</Button>
              <Button size="lg" variant="outline" className="rounded-2xl gap-2">Free Consultation <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200">
            <div className="relative aspect-video bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-primary text-primary ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section (Moved Top) */}
        <section className="mb-24">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Choose Your Package</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {serviceData.packages.map((pkg, i) => (
                    <div key={i} className={`p-8 rounded-3xl border ${pkg.popular ? "border-primary bg-white shadow-2xl scale-105" : "bg-white border-slate-200"}`}>
                        {pkg.popular && <div className="text-xs font-bold text-primary mb-2">MOST POPULAR</div>}
                        <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                        <div className="text-4xl font-bold mb-6">${pkg.price}<span className="text-lg text-muted-foreground font-normal">/project</span></div>
                        <ul className="space-y-4 mb-8">
                            {pkg.features.map(f => <li key={f} className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> {f}</li>)}
                        </ul>
                        <Button className="w-full rounded-xl" variant={pkg.popular ? "default" : "outline"}>Order Now</Button>
                    </div>
                ))}
            </div>
        </section>

        {/* Process Section */}
        <section className="mb-24">
            <h2 className="text-3xl font-display font-bold text-center mb-16">How We Deliver Excellence</h2>
            <div className="grid md:grid-cols-4 gap-8">
                {serviceData.process.map((step, i) => (
                    <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 font-bold text-primary">0{i+1}</div>
                        <h3 className="font-bold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl font-display font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible>
                {serviceData.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="text-left font-bold">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetail;
