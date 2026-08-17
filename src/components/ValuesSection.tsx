import { Award, Users, Target, Rocket, Sparkles } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Focused on delivering measurable results that matter for your business growth.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your success is our ultimate priority. We treat your project as our own.",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to the highest quality standards in every project we deliver.",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Embracing cutting-edge technologies to keep you ahead of the competition.",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
  },
];

export const ValuesSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="absolute top-10 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-morph animation-delay-2000" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-slide-up hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Our Core Values</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 animate-slide-up animation-delay-100">
            What Makes Us <span className="text-gradient-animated">Different</span>
          </h2>
          <p className="text-muted-foreground text-lg animate-slide-up animation-delay-200">
            Our values define who we are and guide every decision we make
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Card */}
              <div className="relative h-full p-6 md:p-8 rounded-3xl bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:border-primary/30">
                {/* Hover Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                {/* Decorative Circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
