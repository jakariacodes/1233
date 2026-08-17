import { useState, useEffect, useCallback } from "react";
import { Facebook, Twitter, Linkedin, Globe, ChevronLeft, ChevronRight, MapPin, Award, Users, Briefcase } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";

const stats = [
  { value: "2+", label: "Years", icon: Award },
  { value: "150+", label: "Clients", icon: Users },
  { value: "850+", label: "Projects", icon: Briefcase },
];

const SocialIcon = ({ platform, href }: { platform: string; href: string }) => {
  const icons: Record<string, typeof Facebook> = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    portfolio: Globe,
  };
  const Icon = icons[platform];
  
  if (!Icon) return null;
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/20"
      aria-label={platform}
    >
      <Icon className="w-4 h-4" />
    </a>
  );
};

const colorPalette = [
  "from-primary to-blue-600",
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-green-500 to-teal-600",
  "from-orange-500 to-red-600",
];

export const TeamSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { teamMembers, loading } = useTeamMembers();

  // Filter active members
  const activeMembers = teamMembers.filter(m => m.is_active);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    
    // Auto-scroll every 4 seconds
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container-custom">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (activeMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-badge mb-4 animate-slide-up">Leadership Team</span>
          <h2 className="section-title mb-4 animate-slide-up animation-delay-100">
            Meet Our <span className="text-gradient">Founders</span>
          </h2>
          <p className="text-muted-foreground animate-slide-up animation-delay-200">
            The visionary leaders driving innovation and excellence at TechCrafterIT
          </p>
        </div>

        {/* Stats Cards */}
        <div className="flex justify-center gap-4 md:gap-8 mb-16 animate-slide-up animation-delay-300">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="group relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl px-6 py-5 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium mt-1">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            aria-label="Previous team member"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={scrollNext}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300"
            aria-label="Next team member"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div ref={emblaRef} className="overflow-hidden px-8 md:px-12">
            <div className="flex">
              {activeMembers.map((member, index) => (
                <div key={member.id} className="flex-[0_0_100%] min-w-0 p-4">
                  <div className="relative group">
                    {/* Animated outer glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-[32px] opacity-70 blur-lg group-hover:opacity-100 transition-all duration-700 animate-gradient-shift bg-[length:200%_auto]" />
                    
                    {/* Main Card */}
                    <div className={`relative bg-gradient-to-br ${colorPalette[index % colorPalette.length]} rounded-3xl overflow-hidden shadow-2xl`}>
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
                      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full blur-2xl animate-float-slow" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-rotate-slow" />
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      
                      <div className="relative p-10 md:p-12">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                          {/* Avatar with premium effects */}
                          <div className="relative">
                            {/* Orbiting ring */}
                            <div className="absolute -inset-6 rounded-full border-2 border-dashed border-white/30 animate-rotate-slow" />
                            <div className="absolute -inset-4 rounded-full border border-white/20 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
                            
                            {/* Glow effect */}
                            <div className="absolute inset-0 w-36 h-36 md:w-44 md:h-44 bg-white/30 rounded-full blur-2xl animate-pulse" />
                            
                            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-white/40 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                              {member.image_url ? (
                                <img
                                  src={member.image_url}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-white/30 to-white/5 flex items-center justify-center">
                                  <span className="text-5xl md:text-6xl font-display font-bold text-white drop-shadow-lg">
                                    {getInitials(member.name)}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            {/* Online Indicator with pulse ring */}
                            <div className="absolute bottom-3 right-3">
                              <div className="absolute inset-0 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-50" />
                              <div className="relative w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg" />
                            </div>
                          </div>
                          
                          {/* Info */}
                          <div className="flex-1 text-center md:text-left text-white">
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-4 shadow-lg border border-white/20">
                              <Award className="w-4 h-4 animate-pulse" />
                              {member.role}
                            </div>
                            <h3 className="font-display text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                              {member.name}
                            </h3>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-white/80 text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>Bangladesh</span>
                            </div>
                          </div>
                        </div>

                        {/* Bio */}
                        {member.bio && (
                          <div className="mt-10 pt-8 border-t border-white/20">
                            <p className="text-white/95 text-xl md:text-2xl italic leading-relaxed text-center max-w-2xl mx-auto font-light">
                              "{member.bio}"
                            </p>
                          </div>
                        )}

                        {/* Social Links with premium styling */}
                        <div className="flex justify-center gap-4 mt-10">
                          {member.linkedin_url && (
                            <a
                              href={member.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/social relative w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white hover:scale-110 transition-all duration-300 overflow-hidden"
                              aria-label="LinkedIn"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                              <Linkedin className="relative w-5 h-5 group-hover/social:text-white" />
                            </a>
                          )}
                          {member.twitter_url && (
                            <a
                              href={member.twitter_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/social relative w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white hover:scale-110 transition-all duration-300 overflow-hidden"
                              aria-label="Twitter"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                              <Twitter className="relative w-5 h-5 group-hover/social:text-white" />
                            </a>
                          )}
                          {member.facebook_url && (
                            <a
                              href={member.facebook_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/social relative w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white hover:scale-110 transition-all duration-300 overflow-hidden"
                              aria-label="Facebook"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                              <Facebook className="relative w-5 h-5 group-hover/social:text-white" />
                            </a>
                          )}
                          {member.portfolio_url && (
                            <a
                              href={member.portfolio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/social relative w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white hover:scale-110 transition-all duration-300 overflow-hidden"
                              aria-label="Portfolio"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                              <Globe className="relative w-5 h-5 group-hover/social:text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {activeMembers.map((member, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`relative h-3 rounded-full transition-all duration-500 overflow-hidden ${
                  index === selectedIndex 
                    ? 'w-12 bg-primary' 
                    : 'w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to ${member.name}`}
              >
                {index === selectedIndex && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Member Names Quick Nav */}
          <div className="flex justify-center gap-6 mt-6">
            {activeMembers.map((member, index) => (
              <button
                key={member.id}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`text-sm font-medium transition-all duration-300 ${
                  index === selectedIndex 
                    ? 'text-primary scale-105' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {member.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
