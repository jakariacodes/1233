import { Linkedin, Twitter, Facebook, Globe, MapPin, ArrowUpRight, Loader2, Users } from "lucide-react";
import { useTeamMembers } from "@;

const stats = [
  { value: "30+", label: "Team Members" },
  { value: "5+", label: "Years Combined Experience" },
  { value: "15+", label: "Specializations" },
  { value: "100%", label: "Remote-First" },
];

const Team = () => {
  const { teamMembers, loading, error } = useTeamMembers();

  // Filter only active members
  const activeMembers = teamMembers.filter(m => m.is_active);
  const featuredMember = activeMembers.find((m) => m.display_order === 1);
  const otherMembers = activeMembers.filter((m) => m.display_order !== 1);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>

      <div className="min-h-screen bg-background">

        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-20 relative overflow-hidden">
            {/* Premium animated background */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-[100px] animate-float" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-float-slow" />
              
              {/* Animated circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/20 rounded-full animate-rotate-slow" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/15 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
              
              {/* Tech grid */}
              <div className="absolute inset-0 tech-grid opacity-15" />
              
              {/* Morphing background */}
              <div className="absolute inset-0 opacity-20 animate-morph" style={{
                background: 'radial-gradient(ellipse at 70% 30%, hsl(var(--primary) / 0.25) 0%, transparent 50%)'
              }} />
              
              {/* Floating particles */}
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/40 rounded-full animate-particle"
                  style={{
                    left: `${25 + i * 18}%`,
                    top: `${25 + (i % 2) * 35}%`,
                    animationDelay: `${i * 0.6}s`
                  }}
                />
              ))}
            </div>

            <div className="container-custom relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <span className="section-badge mb-4 animate-slide-up group hover:bg-primary/20 transition-all duration-300 cursor-default">
                  <Users className="w-3.5 h-3.5 text-primary group-hover:animate-bounce" />
                  <span>Our Team</span>
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up animation-delay-100">
                  Meet the <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">Experts</span> Behind Your Success
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed animate-slide-up animation-delay-200">
                  A dedicated team of creative minds, technical wizards, and strategic thinkers working together to deliver exceptional digital solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 border-y border-border bg-secondary/30">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Loading State */}
          {loading && (
            <section className="py-20">
              <div className="container-custom">
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              </div>
            </section>
          )}

          {/* Error State */}
          {error && (
            <section className="py-20">
              <div className="container-custom">
                <div className="text-center py-20">
                  <p className="text-muted-foreground">Failed to load team members.</p>
                </div>
              </div>
            </section>
          )}

          {/* Empty State */}
          {!loading && !error && activeMembers.length === 0 && (
            <section className="py-20">
              <div className="container-custom">
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No team members available yet.</p>
                </div>
              </div>
            </section>
          )}

          {/* Featured Leader */}
          {!loading && featuredMember && (
            <section className="py-20">
              <div className="container-custom">
                <div className="max-w-5xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="relative animate-slide-in-left">
                      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                      <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-primary/20">
                        {featuredMember.image_url ? (
                          <img
                            src={featuredMember.image_url}
                            alt={featuredMember.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <span className="text-8xl font-display font-bold text-primary-foreground">
                              {getInitials(featuredMember.name)}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-3">
                            Founder & Leader
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="animate-slide-in-right animation-delay-200">
                      <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-2 block">
                        Leadership
                      </span>
                      <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                        {featuredMember.name}
                      </h2>
                      <p className="text-primary font-semibold text-lg mb-4">
                        {featuredMember.role}
                      </p>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        {featuredMember.bio || "Leading our team with vision and expertise."}
                      </p>
                      <div className="flex items-center gap-2 text-muted-foreground mb-8">
                        <MapPin className="w-4 h-4" />
                        <span>Bangladesh</span>
                      </div>

                      {/* Social Links */}
                      <div className="flex gap-3">
                        {featuredMember.linkedin_url && (
                          <a
                            href={featuredMember.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {featuredMember.twitter_url && (
                          <a
                            href={featuredMember.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}
                        {featuredMember.facebook_url && (
                          <a
                            href={featuredMember.facebook_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                          >
                            <Facebook className="w-5 h-5" />
                          </a>
                        )}
                        {featuredMember.portfolio_url && (
                          <a
                            href={featuredMember.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                          >
                            <Globe className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Team Grid */}
          {!loading && otherMembers.length > 0 && (
            <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
              <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="section-badge mb-4 animate-slide-up">The Team</span>
                  <h2 className="section-title mb-6 animate-slide-up animation-delay-100">
                    Our <span className="text-gradient">Talented</span> Professionals
                  </h2>
                  <p className="text-muted-foreground text-lg animate-slide-up animation-delay-200">
                    Every member brings unique skills and perspectives to deliver exceptional results.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {otherMembers.map((member, index) => (
                    <div
                      key={member.id}
                      className="group relative animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Animated border glow */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-[28px] opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700 animate-gradient-shift bg-[length:200%_auto]" />
                      
                      {/* Main card */}
                      <div className="relative bg-card/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-border/50 group-hover:border-transparent transition-all duration-500">
                        {/* Top gradient accent */}
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent" />
                        
                        {/* Animated background patterns */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div className="absolute top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                          <div className="absolute bottom-10 left-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                        </div>
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative p-8 pt-10">
                          {/* Avatar with 3D effect */}
                          <div className="relative w-28 h-28 mx-auto mb-6">
                            {/* Rotating ring */}
                            <div className="absolute -inset-3 rounded-full border-2 border-dashed border-primary/30 animate-rotate-slow" />
                            
                            {/* Glow backdrop */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse" />
                            
                            {/* Avatar container */}
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl group-hover:scale-110 transition-transform duration-500">
                              {member.image_url ? (
                                <img
                                  src={member.image_url}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-3xl">
                                  {getInitials(member.name)}
                                </div>
                              )}
                            </div>
                            
                            {/* Online status */}
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-card border-4 border-background flex items-center justify-center shadow-lg">
                              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                            </div>
                            
                            {/* Floating badge */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-[10px] font-bold text-primary-foreground shadow-lg opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                              ✨ PRO
                            </div>
                          </div>

                          {/* Content */}
                          <div className="text-center">
                            {/* Role badge */}
                            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full text-xs font-semibold text-primary mb-3 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                              <ArrowUpRight className="w-3 h-3" />
                              {member.role}
                            </div>
                            
                            <h3 className="font-display text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground group-hover:from-primary group-hover:to-accent bg-clip-text text-transparent transition-all duration-500">
                              {member.name}
                            </h3>
                            
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-300">
                              {member.bio || "Expert team member delivering exceptional results."}
                            </p>
                            
                            <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs mb-6 opacity-70">
                              <MapPin className="w-3 h-3 text-primary" />
                              <span>Bangladesh</span>
                            </div>

                            {/* Social Links with premium styling */}
                            <div className="flex justify-center gap-3 pt-4 border-t border-border/50">
                              {member.linkedin_url && (
                                <a
                                  href={member.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/social relative w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                                  <Linkedin className="relative w-4 h-4 group-hover/social:text-primary-foreground group-hover/social:scale-110 transition-all duration-300" />
                                </a>
                              )}
                              {member.twitter_url && (
                                <a
                                  href={member.twitter_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/social relative w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                                  <Twitter className="relative w-4 h-4 group-hover/social:text-primary-foreground group-hover/social:scale-110 transition-all duration-300" />
                                </a>
                              )}
                              {member.facebook_url && (
                                <a
                                  href={member.facebook_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/social relative w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                                  <Facebook className="relative w-4 h-4 group-hover/social:text-primary-foreground group-hover/social:scale-110 transition-all duration-300" />
                                </a>
                              )}
                              {member.portfolio_url && (
                                <a
                                  href={member.portfolio_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/social relative w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/social:opacity-100 transition-opacity duration-300" />
                                  <Globe className="relative w-4 h-4 group-hover/social:text-primary-foreground group-hover/social:scale-110 transition-all duration-300" />
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
            </section>
          )}

          {/* Join Us CTA */}
          <section className="py-20">
            <div className="container-custom">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-12 md:p-16">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
                
                <div className="relative max-w-2xl mx-auto text-center">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                    Want to Join Our Team?
                  </h2>
                  <p className="text-primary-foreground/80 text-lg mb-8">
                    We're always looking for talented individuals who share our passion for digital excellence.
                  </p>
                  <a
                    href="/careers"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors group"
                  >
                    View Open Positions
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
};

export default Team;
