import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Globe, 
  CheckCircle2, 
  Star,
  Award,
  Users,
  Zap,
  Clock,
  MessageSquare
} from "lucide-react";

const AboutSection = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden" id="about">
      {/* Background Decor from Demo */}
      <div className="absolute inset-0 pointer-events-none">
        {/* The large circular shape/glow from the demo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-[65%] -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-50/50 rounded-full border border-blue-100/20 shadow-[inset_0_0_100px_rgba(59,130,246,0.03)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full shadow-2xl border border-slate-100" />
        
        {/* Additional accent glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Content */}
          <div className="animate-fade-in order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6 group cursor-default">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">About NextOnline</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-[1.1] tracking-tight text-slate-900">
              Expert Web Development & <br />
              <span className="text-primary relative inline-block">
                Digital Service
                <svg className="absolute -bottom-2 left-0 w-full" width="200" height="8" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                  <path d="M1 5.89286C34.1667 2.39286 100.5 -1.10714 200 6.89286" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span> <br />
              Company
            </h2>
            
            <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-xl">
              NextOnline Technology is a premier global software development and digital strategy agency. 
              Serving enterprise clients across the UK, USA, Europe, and the Middle East, we specialize in 
              high-performance web architecture, bespoke software engineering, and innovative digital solutions 
              that scale businesses globally.
            </p>

            
            {/* 2x2 Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                { icon: Shield, title: "ISO 27001 Certified Teams", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: Sparkles, title: "100% Client Satisfaction Rate", color: "text-primary", bg: "bg-primary/5" },
                { icon: Zap, title: "On-Time Project Delivery", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: Globe, title: "24/7 Technical Support", color: "text-blue-500", bg: "bg-blue-50" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 leading-snug">{item.title}</span>
                </div>
              ))}
            </div>
            
            <Link to="/about">
              <Button className="h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-md shadow-lg shadow-blue-200 transition-all hover:-translate-y-1">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          
          {/* Right Column: Visual Dashboard */}
          <div className="relative order-1 lg:order-2">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group">
              {/* Top Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { value: "5+", label: "Years", sub: "Experience" },
                  { value: "650+", label: "Happy", sub: "Clients" },
                  { value: "850+", label: "Completed", sub: "Projects" }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl bg-slate-50/50 border border-slate-100 transition-colors hover:bg-white hover:shadow-sm">
                    <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    <div className="text-[10px] md:text-xs text-slate-400">{stat.sub}</div>
                  </div>
                ))}
              </div>
              
              {/* Core Excellence Highlight */}
              <div className="bg-[#0f172a] rounded-3xl p-8 mb-8 relative overflow-hidden group/highlight">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover/highlight:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-xl" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Our Core Vision</span>
                  </div>
                  <h4 className="text-white font-display font-bold text-2xl mb-3 leading-tight">
                    Driving the Future of <span className="text-primary">Digital Innovation</span> in Bangladesh
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We combine creative strategy with technical expertise to build scalable solutions that solve complex business challenges and create meaningful impact.
                  </p>
                </div>
              </div>
              
              {/* Quote Section */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mb-8 relative">
                <MessageSquare className="absolute top-4 left-4 w-5 h-5 text-primary opacity-20" />
                <p className="text-slate-600 text-sm leading-relaxed pl-6 italic">
                  "Our mission is to become Bangladesh's leading digital agency, delivering innovative solutions that help businesses succeed in the digital world."
                </p>
              </div>
              
              {/* Badges & Social */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                    🏆 Top Rated Agency
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider border border-green-100">
                    ✓ Verified Business
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider border border-purple-100">
                    ⭐ 5-Star Reviews
                  </div>
                </div>
                
                <Button variant="ghost" className="h-10 px-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2 text-xs font-bold transition-transform hover:scale-105">
                  Follow on Facebook
                </Button>
              </div>
            </div>
            
            {/* Decorative Glows */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export { AboutSection };