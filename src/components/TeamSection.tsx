import React from 'react';
import { Link } from '@tanstack/react-router';
import { LinkedinIcon as Linkedin, FacebookIcon as Facebook, Globe, Users, Loader2 } from "lucide-react";
import { useTeamMembers } from "@/hooks/useTeamMembers";

const TeamSection = () => {
  const { teamMembers, loading } = useTeamMembers();
  const members = teamMembers.filter((m) => m.is_active).slice(0, 3);

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden" id="team">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
            Meet the <span className="text-primary">Experts</span> Behind NextOnline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            A collective of digital craftsmen dedicated to redefining innovation
            and delivering premium quality solutions.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {members.map((member) => (
              <div
                key={member.id}
                className="group relative bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
              >
                <div className="aspect-[4/5] overflow-hidden relative bg-secondary">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </div>
                  )}

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {[
                      { url: member.linkedin_url, Icon: Linkedin },
                      { url: member.facebook_url, Icon: Facebook },
                      { url: member.portfolio_url, Icon: Globe },
                    ]
                      .filter((l) => l.url)
                      .map(({ url, Icon }, i) => (
                        <a
                          key={i}
                          href={url!}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-primary transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      ))}
                  </div>
                </div>

                <div className="p-8 text-center bg-white/50 backdrop-blur-sm border-t border-border">
                  <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-3xl bg-secondary/50 border border-border">
            <Users className="w-6 h-6 text-primary" />
            <p className="font-medium">
              Meet the full team behind our work
              <Link to="/team" className="text-primary font-bold hover:underline ml-2">
                View Team
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/30 to-transparent -z-10" />
    </section>
  );
};

export { TeamSection };
