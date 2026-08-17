const clients = [
  "SANOFI",
  "Telenor",
  "ShareBike",
  "Syngenta",
  "VEON",
  "Tennant",
  "GRAMEENPHONE",
  "BRAC",
];

export const ClientsSection = () => {
  return (
    <section className="py-20 bg-secondary/50 border-y border-border relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      <div className="absolute inset-0 tech-grid opacity-20" />
      
      {/* Animated orbs */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float-delayed" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <span className="section-badge mb-4 hover:scale-105 transition-transform cursor-default">
            Our Partners
          </span>
          <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">
            Trusted by Fast-Moving Tech Teams From Startups to Enterprises
          </p>
        </div>

        {/* Clients Logos - Infinite Scroll */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/50 to-transparent z-10" />
          
          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee hover:[animation-play-state:paused]">
              {/* First set */}
              {clients.map((client, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 text-2xl md:text-3xl font-display font-bold text-muted-foreground/30 hover:text-primary transition-all duration-500 cursor-default hover:scale-110 select-none"
                >
                  {client}
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {clients.map((client, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 text-2xl md:text-3xl font-display font-bold text-muted-foreground/30 hover:text-primary transition-all duration-500 cursor-default hover:scale-110 select-none"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-border">
          {[
            { value: "100+", label: "Global Partners" },
            { value: "15+", label: "Countries Served" },
            { value: "99%", label: "Client Retention" },
            { value: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center animate-slide-up group cursor-default"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl md:text-3xl font-display font-bold text-gradient mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};