import React from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import officeTeam from "@/assets/office-team.jpg.asset.json";

const ContactSection = () => {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24" id="contact">
      {/* Background split: top half white, bottom half dark (same as footer) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#011612] z-0" />

      <div className="container-custom relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#061839] via-[#022822] to-[#011612] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5 relative group/container transition-all duration-500">
            {/* Added shadow/premium glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-primary/5 opacity-0 group-hover/container:opacity-100 transition-opacity duration-500" />
            
            <div className="grid lg:grid-cols-2 relative z-10">
              
              {/* Form Side */}
              <div className="p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact us</h2>
                <p className="text-white/60 mb-12">Fill out the form below and we'll get back to you once we've processed your request.</p>
                
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                    <div className="relative group">
                      <input 
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-all peer placeholder:text-transparent group-hover:border-white/40"
                        placeholder="Name"
                        id="name"
                        autoComplete="off"
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
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-all peer placeholder:text-transparent group-hover:border-white/40"
                        placeholder="Company"
                        id="company"
                        autoComplete="off"
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
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-all peer placeholder:text-transparent group-hover:border-white/40"
                        placeholder="Email"
                        id="email"
                        autoComplete="off"
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
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-all peer placeholder:text-transparent group-hover:border-white/40"
                        placeholder="Phone"
                        id="phone"
                        autoComplete="off"
                      />
                      <label 
                        htmlFor="phone"
                        className="absolute left-0 top-0 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:top-0 peer-focus:text-sm peer-focus:text-primary pointer-events-none"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <div className="relative group">
                      <select className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-all appearance-none cursor-pointer group-hover:border-white/40">
                        <option className="bg-[#022822]">Select Industry</option>
                        <option className="bg-[#022822]">E-Gov Solutions</option>
                        <option className="bg-[#022822]">EdTech</option>
                        <option className="bg-[#022822]">FinTech</option>
                        <option className="bg-[#022822]">HealthTech</option>
                      </select>
                      <label className="absolute left-0 -top-4 text-white/40 text-xs">
                        Industry <span className="text-red-500">*</span>
                      </label>
                      <div className="absolute right-0 top-2 pointer-events-none text-white/40">▼</div>
                    </div>

                    <div className="relative group">
                      <select className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-all appearance-none cursor-pointer group-hover:border-white/40">
                        <option className="bg-[#022822]">Select Budget</option>
                        <option className="bg-[#022822]">$1,000 - $5,000</option>
                        <option className="bg-[#022822]">$5,000 - $10,000</option>
                        <option className="bg-[#022822]">$10,000+</option>
                      </select>
                      <label className="absolute left-0 -top-4 text-white/40 text-xs">
                        Budget <span className="text-red-500">*</span>
                      </label>
                      <div className="absolute right-0 top-2 pointer-events-none text-white/40">▼</div>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <textarea 
                      className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-primary transition-all peer placeholder:text-transparent min-h-[100px] resize-none group-hover:border-white/40"
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
                    <Button className="bg-[#78b3ff] hover:bg-[#5da0f5] text-white px-8 h-12 rounded-full gap-3 text-base font-bold group shadow-lg shadow-blue-500/20 transition-all">
                      Submit
                      <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                        <Send className="w-4 h-4 text-white" />
                      </div>
                    </Button>
                  </div>
                </form>
              </div>

              {/* Image Side */}
              <div className="relative hidden lg:flex items-center justify-center p-8 md:p-12">
                <div className="h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                  <img 
                    src={officeTeam.url} 
                    alt="Our Team"
                    className="h-full w-full object-cover relative z-10"
                  />
                  <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay z-20" />
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