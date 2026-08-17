import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/button";
import { Textarea } from "@/components/ui/button";
import { 
  Phone, Mail, MapPin, Clock, Send, MessageCircle, 
  ArrowRight, Sparkles, Globe, CheckCircle2 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/components/ui/button";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
  subject: z.string().trim().max(200, "Subject must be less than 200 characters").optional(),
});

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    value: "+880 1731-173992",
    action: "tel:+8801731173992",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    value: "info@techcrafterit.com",
    action: "mailto:info@techcrafterit.com",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us instantly",
    value: "+880 1731-173992",
    action: "https://wa.me/8801731173992",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come say hello",
    value: "Hatibandha, Lalmonirhat",
    action: null,
    gradient: "from-purple-500 to-pink-500",
  },
];

const reasons = [
  "Free consultation & project quote",
  "Response within 24 hours",
  "Dedicated project manager",
  "100% satisfaction guarantee",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    
    try {
      // Build subject from service and budget
      const subject = formData.service 
        ? `${formData.service}${formData.budget ? ` - Budget: ${formData.budget}` : ''}${formData.company ? ` - Company: ${formData.company}` : ''}`
        : undefined;

      // Validate input
      const validationResult = contactSchema.safeParse({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
        subject: subject,
      });

      if (!validationResult.success) {
        const fieldErrors: Record<string, string> = {};
        validationResult.error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        setIsSubmitting(false);
        return;
      }

      // Save to database
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: validationResult.data.name,
          email: validationResult.data.email,
          phone: validationResult.data.phone || null,
          subject: validationResult.data.subject || null,
          message: validationResult.data.message,
        });

      if (error) {
        console.error('Error saving message:', error);
        toast.error("Failed to send message. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Send email notification (don't await, fire and forget)
      supabase.functions.invoke('send-notification', {
        body: {
          type: 'contact',
          data: {
            name: validationResult.data.name,
            email: validationResult.data.email,
            phone: validationResult.data.phone,
            subject: validationResult.data.subject,
            message: validationResult.data.message,
          }
        }
      }).catch(err => console.error('Email notification error:', err));
      
      toast.success("Thank you! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", company: "", budget: "", service: "", message: "" });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>

      <div className="min-h-screen bg-background">

        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 relative overflow-hidden">
            {/* Premium Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-float-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/30 rounded-full animate-rotate-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-border/40 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-primary/20 rounded-full animate-rotate-slow" style={{ animationDuration: '20s' }} />
              
              {/* Morphing gradient background */}
              <div className="absolute inset-0 opacity-30 animate-morph" style={{
                background: 'radial-gradient(ellipse at 20% 80%, hsl(var(--primary) / 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, hsl(var(--accent) / 0.3) 0%, transparent 50%)'
              }} />
              
              {/* Tech grid pattern */}
              <div className="absolute inset-0 tech-grid opacity-20" />
              
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/40 rounded-full animate-particle"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i * 0.5}s`
                  }}
                />
              ))}
            </div>

            <div className="container-custom relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-slide-up group hover:bg-primary/20 hover:border-primary/40 transition-all duration-500 cursor-default">
                  <Sparkles className="w-4 h-4 text-primary group-hover:animate-spin" />
                  <span className="text-sm font-semibold text-primary">Let's Create Something Amazing</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up animation-delay-100">
                  Get in Touch & Start Your{" "}
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">Digital Journey</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed animate-slide-up animation-delay-200">
                  Ready to transform your business? Let's discuss your project and discover how we can help you achieve your goals.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Methods Grid */}
          <section className="py-12 border-y border-border bg-secondary/30 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="container-custom relative z-10">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 animate-slide-up overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl" />
                    
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}>
                      <method.icon className="w-7 h-7 text-white group-hover:animate-bounce-gentle" />
                    </div>
                    <h3 className="relative font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-300">{method.title}</h3>
                    <p className="relative text-muted-foreground text-sm mb-3">{method.description}</p>
                    {method.action ? (
                      <a
                        href={method.action}
                        className="relative text-primary font-semibold text-sm hover:underline inline-flex items-center gap-1 group/link"
                        target={method.action.startsWith('http') ? '_blank' : undefined}
                        rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {method.value}
                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                      </a>
                    ) : (
                      <p className="relative text-foreground font-semibold text-sm">{method.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Main Contact Section */}
          <section className="py-20">
            <div className="container-custom">
              <div className="grid lg:grid-cols-12 gap-16">
                {/* Left Content */}
                <div className="lg:col-span-5">
                  <span className="section-badge mb-4 animate-slide-up">Why Choose Us</span>
                  <h2 className="section-title mb-6 animate-slide-up animation-delay-100">
                    Let's Build Something <span className="text-gradient">Extraordinary</span>
                  </h2>
                  <p className="text-muted-foreground text-lg mb-10 animate-slide-up animation-delay-200">
                    From concept to launch, we're with you every step of the way. Our team of experts is ready to turn your vision into reality.
                  </p>

                  {/* Reasons List */}
                  <div className="space-y-4 mb-10">
                    {reasons.map((reason, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 animate-slide-up"
                        style={{ animationDelay: `${200 + index * 100}ms` }}
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{reason}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl bg-card border border-border animate-slide-up animation-delay-600">
                    {[
                      { value: "850+", label: "Projects" },
                      { value: "650+", label: "Clients" },
                      { value: "100%", label: "Satisfaction" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-display font-bold text-gradient">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Business Hours */}
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary to-accent animate-slide-up animation-delay-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">We're Available</p>
                        <p className="text-white font-bold text-lg">24/7 Online Support</p>
                      </div>
                      <div className="ml-auto w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-7">
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
                    
                    <div className="relative bg-card rounded-3xl p-8 md:p-10 border border-border shadow-xl">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Send className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-bold">Send Us a Message</h3>
                          <p className="text-muted-foreground text-sm">Fill out the form and we'll respond within 24 hours</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                            <Input
                              type="text"
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                              maxLength={100}
                              className={`bg-secondary/50 border-border h-12 ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Email Address *</label>
                            <Input
                              type="email"
                              placeholder="john@company.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              maxLength={255}
                              className={`bg-secondary/50 border-border h-12 ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                            <Input
                              type="tel"
                              placeholder="+880 1XXX-XXXXXX"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              maxLength={20}
                              className="bg-secondary/50 border-border h-12"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Company Name</label>
                            <Input
                              type="text"
                              placeholder="Your Company"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              maxLength={100}
                              className="bg-secondary/50 border-border h-12"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Service Required *</label>
                            <select
                              value={formData.service}
                              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                              required
                              className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            >
                              <option value="">Select a service</option>
                              <option value="Web Design">Web Design</option>
                              <option value="Web Development">Web Development</option>
                              <option value="Graphic Design">Graphic Design</option>
                              <option value="Digital Marketing">Digital Marketing</option>
                              <option value="SEO Optimization">SEO Optimization</option>
                              <option value="Video Editing">Video Editing</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Budget Range</label>
                            <select
                              value={formData.budget}
                              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                              className="w-full h-12 px-4 rounded-lg bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            >
                              <option value="">Select budget</option>
                              <option value="$500 - $1,000">$500 - $1,000</option>
                              <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                              <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                              <option value="$5,000+">$5,000+</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Project Details *</label>
                          <Textarea
                            placeholder="Tell us about your project, goals, and timeline..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            rows={5}
                            maxLength={2000}
                            className={`bg-secondary/50 border-border resize-none ${errors.message ? 'border-red-500' : ''}`}
                          />
                          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                        </div>

                        <Button
                          type="submit"
                          variant="gradient"
                          size="xl"
                          className="w-full gap-2"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-20 bg-secondary/30">
            <div className="container-custom">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="section-badge mb-4">Our Location</span>
                <h2 className="section-title mb-6">
                  Find Us on the <span className="text-gradient">Map</span>
                </h2>
              </div>

              <div className="relative rounded-3xl overflow-hidden border border-border h-[400px] bg-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Hatibandha, Lalmonirhat, Rangpur, Bangladesh
                    </p>
                    <a
                      href="https://maps.google.com/?q=Hatibandha,Lalmonirhat,Bangladesh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
                    >
                      <MapPin className="w-4 h-4" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
};

export default Contact;
