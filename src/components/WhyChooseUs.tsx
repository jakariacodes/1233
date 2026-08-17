import { Shield, Clock, Headphones, Award, Users, TrendingUp, CheckCircle2 } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee for all our solutions.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Agile development methodology ensures on-time delivery without compromising quality.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock technical support to keep your business running smoothly.",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Rigorous testing and quality assurance for bug-free, polished products.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled professionals with expertise in the latest technologies and trends.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: TrendingUp,
    title: "Growth Focused",
    description: "Solutions designed to scale with your business and drive sustainable growth.",
    color: "from-cyan-500 to-blue-500",
  },
];

const highlights = [
  "100% Client Satisfaction Guarantee",
  "Transparent Pricing & Communication",
  "Industry-Leading Technologies",
  "Dedicated Project Manager",
];

export const WhyChooseUs = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-secondary/30" />
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-morph animation-delay-2000" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5">
            <span className="section-badge mb-4 animate-slide-up hover:scale-105 transition-transform cursor-default">
              Why Choose Us
            </span>
            <h2 className="section-title mb-6 animate-slide-up animation-delay-100">
              The <span className="text-gradient-animated">TechCrafterIT</span> Advantage
            </h2>
            <p className="section-subtitle mb-10 animate-slide-up animation-delay-200">
              We combine technical expertise with business acumen to deliver 
              solutions that truly make a difference.
            </p>

            {/* Highlights */}
            <div className="space-y-4 animate-slide-up animation-delay-300">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 group cursor-default"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-125 transition-all duration-300">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12 p-6 rounded-2xl bg-card border border-border animate-slide-up animation-delay-400 hover:border-primary/20 transition-all duration-500 group">
              <div className="text-center p-4 group-hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-display font-bold text-gradient mb-1">650+</div>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="text-center p-4 border-l border-border group-hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-display font-bold text-gradient mb-1">98%</div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-slide-up overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  <div className="relative flex gap-5">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <reason.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                        {reason.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};