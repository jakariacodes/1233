import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, CheckCircle2, Sparkles, Users, Award, Zap, Code, Palette, TrendingUp, Globe, Star, Shield, Terminal, Database, Cpu, Wifi } from "lucide-react";

const stats = [
  { value: "850+", label: "Projects Done", icon: Zap, color: "from-blue-500 to-cyan-500" },
  { value: "650+", label: "Happy Clients", icon: Users, color: "from-pink-500 to-rose-500" },
  { value: "5+", label: "Years Experience", icon: Award, color: "from-orange-500 to-amber-500" },
  { value: "99%", label: "Client Satisfaction", icon: Star, color: "from-green-500 to-emerald-500" },
];

const services = [
  { icon: Code, label: "Web Development" },
  { icon: Palette, label: "Graphic Design" },
  { icon: TrendingUp, label: "Digital Marketing" },
  { icon: Globe, label: "SEO Optimization" },
];

const trustedBy = ["Startups", "Agencies", "Enterprises", "E-commerce"];

// Floating tech icons for background animation
const floatingIcons = [
  { Icon: Terminal, delay: "0s", x: "10%", y: "20%" },
  { Icon: Database, delay: "2s", x: "85%", y: "15%" },
  { Icon: Code, delay: "1s", x: "75%", y: "75%" },
  { Icon: Cpu, delay: "3s", x: "15%", y: "80%" },
  { Icon: Wifi, delay: "1.5s", x: "90%", y: "45%" },
  { Icon: Globe, delay: "2.5s", x: "5%", y: "50%" },
];

// Code snippets for animated background
const codeSnippets = [
  "const app = create();",
  "<div className='hero'>",
  "function build() {}",
  "npm run deploy",
  "git push origin main",
  "export default App;",
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#011612] py-20 lg:py-0">
      {/* Animated Tech Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-50" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-morph" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] animate-morph animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] animate-float-slow" />
      </div>

      {/* Floating Tech Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className="absolute hidden lg:flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm animate-float opacity-40"
          style={{ 
            left: item.x, 
            top: item.y,
            animationDelay: item.delay,
            animationDuration: `${6 + index}s`
          }}
        >
          <item.Icon className="w-5 h-5 text-primary/60" />
        </div>
      ))}

      {/* Animated Code Rain Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((snippet, index) => (
          <div
            key={index}
            className="absolute text-primary/10 font-mono text-xs whitespace-nowrap animate-code-rain"
            style={{
              left: `${10 + index * 15}%`,
              animationDelay: `${index * 1.5}s`,
              animationDuration: `${8 + index * 2}s`
            }}
          >
            {snippet}
          </div>
        ))}
      </div>

      {/* Orbiting Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] hidden lg:block">
        <div className="absolute inset-0 border border-white/5 rounded-full animate-rotate-slow" />
        <div className="absolute inset-8 border border-white/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
        <div className="absolute inset-16 border border-primary/10 rounded-full animate-rotate-slow" style={{ animationDuration: '30s' }} />
        
        {/* Orbiting dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full animate-glow-pulse" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full animate-glow-pulse animation-delay-500" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary/60 rounded-full animate-glow-pulse animation-delay-1000" />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-primary/20 mb-8 animate-slide-up hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group cursor-default shadow-[0_0_15px_rgba(0,168,132,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                NextOnline Technology — Bangladesh's Leading Agency
              </span>
              <span className="text-xs text-white/50 border-l border-white/20 pl-3">Est. 2021</span>
            </div>

            {/* Heading with animated gradient */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.05] mb-8 animate-slide-up animation-delay-100 tracking-tight">
              <span className="text-white">Empowering Your</span>
              <br />
              <span className="text-primary">Digital Future</span>
              <br />
              <span className="text-white inline-flex items-center gap-4">
                With Precision
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary animate-glow-pulse hover:scale-110 transition-transform duration-300 shadow-xl shadow-primary/20">
                  <Sparkles className="w-7 h-7 text-white animate-pulse" />
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed animate-slide-up animation-delay-200">
              We craft <span className="text-primary font-bold">next-gen technology solutions</span> that drive measurable growth and transform businesses globally.
            </p>

            {/* Services Pills with hover effects */}
            <div className="flex flex-wrap gap-3 mb-8 animate-slide-up animation-delay-300">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer hover-lift"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{service.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons with enhanced animations */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-slide-up animation-delay-400">
              <Link to="/contact">
                <Button className="gap-2 h-14 px-8 text-base bg-primary hover:bg-primary/90 rounded-xl group relative overflow-hidden hover-glow">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-teal-500 to-primary bg-[length:200%_100%] animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button 
                  variant="outline" 
                  className="gap-3 h-14 px-8 text-base border-white/20 text-white hover:bg-white/10 rounded-xl group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <span className="group-hover:tracking-wide transition-all duration-300">View Our Work</span>
                </Button>
              </Link>
            </div>

            {/* Trusted By with stagger animation */}
            <div className="animate-slide-up animation-delay-500">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Trusted By</p>
              <div className="flex flex-wrap items-center gap-5">
                {trustedBy.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors duration-300 group cursor-pointer"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Stats Dashboard */}
          <div className="order-1 lg:order-2">
            <div className="relative animate-scale-in animation-delay-200">
              {/* Animated Glow */}
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 to-teal-500/20 rounded-[2.5rem] blur-3xl animate-glow-pulse" />
              
              {/* Pulse rings */}
              <div className="absolute -inset-4 rounded-[2.5rem] border border-primary/20 animate-pulse-ring opacity-50" />
              <div className="absolute -inset-8 rounded-[3rem] border border-primary/10 animate-pulse-ring opacity-30 animation-delay-500" />
              
              {/* Main Card */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/10 hover:border-primary/30 transition-all duration-500 group">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-teal-700 flex items-center justify-center animate-bounce-gentle">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Performance Stats</p>
                      <p className="text-white/50 text-xs">Updated in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400 font-medium">Live</span>
                  </div>
                </div>

                {/* Stats Grid with stagger animation */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="group/stat relative overflow-hidden rounded-2xl p-4 md:p-5 bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover/stat:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      
                      <div className="relative flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover/stat:scale-110 transition-transform duration-300`}>
                          <stat.icon className="w-4 h-4 text-white" />
                        </div>
                        <TrendingUp className="w-4 h-4 text-green-400 group-hover/stat:animate-bounce" />
                      </div>
                      <div className="relative text-2xl md:text-3xl font-display font-bold text-white mb-0.5 group-hover/stat:text-gradient-animated transition-all">
                        {stat.value}
                      </div>
                      <div className="relative text-xs text-white/50 group-hover/stat:text-white/70 transition-colors">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA with gradient animation */}
                <div className="rounded-2xl p-5 bg-gradient-to-r from-primary to-teal-700 relative overflow-hidden group/cta hover:shadow-glow transition-all duration-500">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-teal-500 to-primary bg-[length:200%_100%] animate-gradient-shift opacity-50" />
                  
                  <div className="relative flex items-center justify-between gap-4">
                    <div>
                      <p className="text-white font-bold mb-0.5">Ready to grow?</p>
                      <p className="text-white/80 text-sm">Free consultation available</p>
                    </div>
                    <Link to="/contact">
                      <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90 shrink-0 hover:scale-105 transition-transform duration-300">
                        Let's Talk
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Left */}
              <div className="absolute -left-4 top-1/3 bg-[#011612]/80 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/10 hidden lg:flex items-center gap-3 animate-slide-up hover:scale-105 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:animate-bounce-gentle">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">100% Secure</p>
                  <p className="text-green-400 text-xs font-medium">Data Protected</p>
                </div>
              </div>

              {/* Floating Badge - Right */}
              <div className="absolute -right-2 bottom-1/4 bg-[#011612]/80 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/10 hidden lg:flex items-center gap-3 animate-slide-up hover:scale-105 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                <div className="w-11 h-11 bg-gradient-to-br from-primary to-teal-700 rounded-xl flex items-center justify-center group-hover:animate-bounce-gentle">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">30+ Experts</p>
                  <p className="text-primary text-xs font-medium">Team Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-fade-in animation-delay-1500">
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2 hover:border-primary/50 transition-colors duration-300">
          <div className="w-1 h-2.5 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};