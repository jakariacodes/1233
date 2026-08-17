import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield, Globe } from "lucide-react";
import { Facebook } from "lucide-react";
import ceoPhoto from "@/assets/ceo-photo.jpg";

const highlights = [
  { text: "ISO 27001 Certified Teams", icon: Shield },
  { text: "100% Client Satisfaction Rate", icon: Sparkles },
  { text: "On-Time Project Delivery", icon: Zap },
  { text: "24/7 Technical Support", icon: Globe },
];

const stats = [
  { value: "5+", label: "Years", suffix: "Experience" },
  { value: "650+", label: "Happy", suffix: "Clients" },
  { value: "850+", label: "Completed", suffix: "Projects" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-secondary/30" />
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-morph" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-morph animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full animate-glow-pulse" />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 hover:scale-105 transition-transform cursor-default animate-glow-pulse">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">About TechCrafterIT</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Crafting Digital{" "}
              <span className="relative">
                <span className="text-gradient-animated">Success</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" className="animate-draw" />
                </svg>
              </span>{" "}
              Stories
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-xl">
              TechCrafterIT is a modern, technology-driven digital service company 
              based in Rangpur, Bangladesh. With over 5 years of experience, we are 
              dedicated to delivering high-quality and professional digital solutions 
              that help businesses thrive in the digital age.
            </p>

            {/* Highlights - Enhanced */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className="group flex items-center gap-3 p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-500 hover:-translate-y-1 cursor-default overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <Link to="/about">
              <Button variant="gradient" size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover-glow group">
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right Content - Enhanced CEO Card */}
          <div className="relative animate-slide-in-right animation-delay-200">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-morph" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-morph animation-delay-1500" />

            {/* Floating Elements */}
            <div className="absolute -top-6 right-20 w-12 h-12 bg-primary/20 rounded-xl rotate-12 animate-float" style={{ animationDuration: '3s' }} />
            <div className="absolute top-1/4 -right-4 w-8 h-8 bg-purple-500/20 rounded-lg -rotate-12 animate-float-delayed" />

            {/* Main Card */}
            <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 group">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="group/stat relative text-center p-4 bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 cursor-default overflow-hidden"
                    >
                      {/* Shimmer */}
                      <div className="absolute inset-0 -translate-x-full group-hover/stat:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      <div className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent group-hover/stat:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                      <div className="text-[10px] text-muted-foreground/70">
                        {stat.suffix}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CEO Info - Enhanced */}
                <div className="relative p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden">
                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 rounded-full blur-2xl" />
                  </div>
                  
                  <div className="relative flex items-center gap-5">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-primary/50 shadow-xl">
                        <img
                          src={ceoPhoto}
                          alt="Md Jakaria Hasan - CEO & Founder"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Online Indicator */}
                      <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
                    </div>
                    
                    <div className="text-white">
                      <h3 className="font-display text-xl font-bold mb-1">
                        Md Jakaria Hasan
                      </h3>
                      <p className="text-primary font-medium text-sm mb-2">CEO & Founder</p>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span>Rangpur, Bangladesh</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote - Enhanced */}
                <div className="mt-6 p-5 bg-secondary/30 rounded-2xl border border-border/30">
                  <div className="flex gap-3">
                    <span className="text-4xl text-primary/30 font-serif leading-none">"</span>
                    <p className="text-muted-foreground text-sm leading-relaxed italic">
                      Our mission is to become Bangladesh's leading digital agency, 
                      delivering innovative solutions that help businesses succeed 
                      in the digital world.
                    </p>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    🏆 Top Rated Agency
                  </span>
                  <span className="px-3 py-1.5 bg-green-500/10 text-green-600 text-xs font-semibold rounded-full">
                    ✓ Verified Business
                  </span>
                  <span className="px-3 py-1.5 bg-purple-500/10 text-purple-600 text-xs font-semibold rounded-full">
                    ⭐ 5-Star Reviews
                  </span>
                </div>

                {/* Social Link */}
                <div className="mt-6 flex justify-center">
                  <a
                    href="https://www.facebook.com/web.jakaria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Facebook className="w-5 h-5" />
                    Follow on Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
