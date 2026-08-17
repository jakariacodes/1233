import React from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="section-padding bg-[#051139] relative overflow-hidden" id="contact">
      <div className="container-custom relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0a1b52] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
            <div className="grid lg:grid-cols-2">
              
              {/* Form Side */}
              <div className="p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact us</h2>
                <p className="text-blue-200/60 mb-12">Fill out the form below and we'll get back to you once we've processed your request.</p>
                
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                    <div className="relative group">
                      <input 
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-colors peer placeholder:text-transparent"
                        placeholder="Name"
                        id="name"
                      />
                      <label 
                        htmlFor="name"
                        className="absolute left-0 top-0 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary pointer-events-none"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                    </div>
                    
                    <div className="relative group">
                      <input 
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-colors peer placeholder:text-transparent"
                        placeholder="Company"
                        id="company"
                      />
                      <label 
                        htmlFor="company"
                        className="absolute left-0 top-0 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary pointer-events-none"
                      >
                        Company <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <div className="relative group">
                      <input 
                        type="email"
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-colors peer placeholder:text-transparent"
                        placeholder="Email"
                        id="email"
                      />
                      <label 
                        htmlFor="email"
                        className="absolute left-0 top-0 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary pointer-events-none"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <div className="relative group">
                      <input 
                        type="tel"
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-colors peer placeholder:text-transparent"
                        placeholder="Phone"
                        id="phone"
                      />
                      <label 
                        htmlFor="phone"
                        className="absolute left-0 top-0 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary pointer-events-none"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <div className="relative group">
                      <select className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                        <option className="bg-[#0a1b52]">Select Industry</option>
                        <option className="bg-[#0a1b52]">E-Gov Solutions</option>
                        <option className="bg-[#0a1b52]">EdTech</option>
                        <option className="bg-[#0a1b52]">FinTech</option>
                        <option className="bg-[#0a1b52]">HealthTech</option>
                      </select>
                      <label className="absolute left-0 -top-4 text-white/40 text-xs">
                        Industry <span className="text-red-500">*</span>
                      </label>
                      <div className="absolute right-0 top-2 pointer-events-none text-white/40">▼</div>
                    </div>

                    <div className="relative group">
                      <select className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                        <option className="bg-[#0a1b52]">Select Budget</option>
                        <option className="bg-[#0a1b52]">$1,000 - $5,000</option>
                        <option className="bg-[#0a1b52]">$5,000 - $10,000</option>
                        <option className="bg-[#0a1b52]">$10,000+</option>
                      </select>
                      <label className="absolute left-0 -top-4 text-white/40 text-xs">
                        Budget <span className="text-red-500">*</span>
                      </label>
                      <div className="absolute right-0 top-2 pointer-events-none text-white/40">▼</div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <textarea 
                      className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-colors peer placeholder:text-transparent min-h-[100px] resize-none"
                      placeholder="Your Message"
                      id="message"
                    />
                    <label 
                      htmlFor="message"
                      className="absolute left-0 top-0 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary pointer-events-none"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white px-8 h-12 rounded-full gap-2 text-base font-semibold group shadow-lg shadow-blue-500/20 transition-all">
                      Submit
                      <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                        <Send className="w-4 h-4 fill-white" />
                      </div>
                    </Button>
                  </div>
                </form>
              </div>

              {/* Image Side */}
              <div className="relative hidden lg:block p-8">
                <div className="h-full w-full rounded-[1.5rem] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-152207182399e-4480e726b8c0?q=80&w=2070&auto=format&fit=crop" 
                    alt="Contact Us"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ContactSection };
