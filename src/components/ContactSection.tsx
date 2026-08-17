import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, Sparkles, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="contact">
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            
            {/* Contact Info - 2 Columns */}
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 uppercase tracking-widest">
                <MessageCircle className="w-4 h-4" />
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-[1.1]">
                Let's Build Something <span className="text-primary">Extraordinary</span> Together
              </h2>
              <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
                Ready to take your business to the next level? Our experts are here to 
                help you navigate the digital landscape with custom-tailored solutions.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/50 border border-border flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg mb-1">Email Our Team</h4>
                    <a href="mailto:info@nextonlinetechnology.com" className="text-muted-foreground hover:text-primary transition-colors text-lg font-medium">
                      info@nextonlinetechnology.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/50 border border-border flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg mb-1">Call for Consultation</h4>
                    <a href="tel:+8801731173992" className="text-muted-foreground hover:text-primary transition-colors text-lg font-medium">
                      +880 1731-173992
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/50 border border-border flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg mb-1">Visit Our Office</h4>
                    <p className="text-muted-foreground text-lg font-medium">
                      Hatibandha, Lalmonirhat, Rangpur, Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              {/* Trusted Badge */}
              <div className="mt-16 p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Sparkles className="w-6 h-6" />
                 </div>
                 <p className="text-sm font-medium text-foreground/80">
                    Trusted by 650+ companies worldwide for premium digital innovation.
                 </p>
              </div>
            </div>

            {/* Contact Form - 3 Columns */}
            <div className="lg:col-span-3">
              <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
                
                <h3 className="text-3xl font-display font-bold mb-8">Send Us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70 ml-1">Full Name</label>
                      <input 
                        className="w-full h-14 px-6 rounded-2xl border border-border bg-secondary/30 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground/70 ml-1">Email Address</label>
                      <input 
                        type="email"
                        className="w-full h-14 px-6 rounded-2xl border border-border bg-secondary/30 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all" 
                        placeholder="john@company.com" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/70 ml-1">Subject</label>
                    <select className="w-full h-14 px-6 rounded-2xl border border-border bg-secondary/30 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                      <option>Web Development</option>
                      <option>Graphic Design</option>
                      <option>Digital Marketing</option>
                      <option>AI Solutions</option>
                      <option>Other Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/70 ml-1">Message</label>
                    <textarea 
                      className="w-full p-6 rounded-2xl border border-border bg-secondary/30 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all min-h-[160px] resize-none" 
                      placeholder="Tell us about your goals and how we can help..." 
                    />
                  </div>
                  
                  <Button className="w-full h-16 text-lg font-bold rounded-2xl gap-3 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98]">
                    Launch Conversation
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground mt-6">
                    We typically respond within 2-4 business hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background blobs */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 -translate-y-1/2" />
    </section>
  );
};

export { ContactSection };
