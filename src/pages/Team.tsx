import { Link } from '@tanstack/react-router';
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { Globe, Users, MapPin, Loader2, ArrowUpRight, Sparkles } from "lucide-react";

const stats = [
  { value: "30+", label: "Team Members" },
  { value: "5+", label: "Years Combined Experience" },
  { value: "15+", label: "Specializations" },
  { value: "100%", label: "Remote-First" },
];

const SocialLinks = ({ member, dark = false }: { member: any; dark?: boolean }) => {
  const links = [
    { url: member.linkedin_url, Icon: Globe },
    { url: member.facebook_url, Icon: Globe },
    { url: member.portfolio_url || member.twitter_url, Icon: Globe },
  ].filter((l) => l.url);

  if (links.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {links.map(({ url, Icon }, i) => (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noreferrer"
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 ${
            dark
              ? "bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
};

const Team = () => {
  const { teamMembers, loading } = useTeamMembers();
  const active = teamMembers.filter((m) => m.is_active);
  const leader = active[0];
  const rest = active.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-36 pb-20 bg-gradient-to-b from-secondary/40 to-background">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-10" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl -z-10" />
        <div className="container-custom text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
            <Users className="w-3.5 h-3.5" />
            Our Team
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight max-w-4xl mx-auto">
            Meet the <span className="text-primary">Experts</span> Behind Your Success
          </h1>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            A dedicated team of creative minds, technical wizards, and strategic thinkers working
            together to deliver exceptional digital solutions.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-background">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership spotlight */}
      {leader && (
        <section className="py-20 bg-background">
          <div className="container-custom grid lg:grid-cols-[minmax(0,380px)_1fr] gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl" />
              <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-border shadow-[0_24px_60px_rgba(0,0,0,0.10)] bg-secondary">
                {leader.image_url && (
                  <img
                    src={leader.image_url}
                    alt={leader.name}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                )}
                <span className="absolute bottom-5 left-5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-lg">
                  Founder &amp; CEO
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Leadership</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold">{leader.name}</h2>
              <p className="text-primary font-semibold mt-1">{leader.role}</p>
              {leader.bio && (
                <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">{leader.bio}</p>
              )}
              <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Global — UK · USA · Bangladesh
              </div>
              <div className="mt-6 flex justify-start">
                <SocialLinks member={leader} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              The Team
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
              Our <span className="text-primary">Talented</span> Professionals
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Every member brings unique skills and perspectives to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((member) => (
              <div
                key={member.id}
                className="group bg-background rounded-3xl border border-border p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              >
                <div className="relative w-28 h-28 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 group-hover:rotate-45 transition-transform duration-700" />
                  <div className="absolute inset-1.5 rounded-full overflow-hidden bg-secondary">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        width={1024}
                        height={1280}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-primary">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold mb-3">
                  {member.role}
                </span>
                <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                {member.bio && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                )}
                <div className="mt-5">
                  <SocialLinks member={member} />
                </div>
              </div>
            ))}
          </div>

          {active.length === 0 && (
            <p className="text-center text-muted-foreground">Team members will appear here soon.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-primary to-accent px-8 py-16 text-center">
            <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-primary-foreground/10 blur-2xl" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
              Want to Join Our Team?
            </h2>
            <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
              We're always looking for talented individuals who share our passion for digital excellence.
            </p>
            <Link
              to="/careers"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-background text-foreground font-semibold transition-transform hover:-translate-y-0.5"
            >
              View Open Positions
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
