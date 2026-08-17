import React from 'react';
import { Globe, Send, Sparkles, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Mahbubur Rahman",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    socials: { linkedin: "#", twitter: "#", facebook: "#" }
  },
  {
    name: "Abdullah Al Mamun",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    socials: { linkedin: "#", twitter: "#", facebook: "#" }
  },
  {
    name: "Nusrat Jahan",
    role: "Lead UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    socials: { instagram: "#", linkedin: "#", facebook: "#" }
  }
];

const TeamSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="team">
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 uppercase tracking-widest border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Our Visionaries
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Meet the <span className="text-primary">Experts</span> Behind NextOnline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            A collective of digital craftsmen dedicated to redefining innovation 
            and delivering premium quality solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
           {teamMembers.map((member, index) => (
             <div 
              key={index} 
              className="group relative bg-secondary/30 rounded-[3rem] border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl"
             >
                <div className="aspect-[4/5] overflow-hidden relative">
                   <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100" 
                   />
                   
                   {/* Social Floating Menu */}
                   <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                         <Linkedin className="w-4 h-4" />
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                         <Facebook className="w-4 h-4" />
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-primary transition-colors cursor-pointer">
                         <Globe className="w-4 h-4" />
                      </div>
                   </div>
                </div>
                
                <div className="p-8 text-center bg-white/50 backdrop-blur-sm border-t border-border">
                   <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                   <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">{member.role}</p>
                </div>
             </div>
           ))}
        </div>
        
        {/* Join our team badge */}
        <div className="mt-20 text-center">
           <div className="inline-flex items-center gap-6 px-8 py-4 rounded-3xl bg-secondary/50 border border-border">
              <Users className="w-6 h-6 text-primary" />
              <p className="font-medium">
                Want to join our amazing team? <a href="/careers" className="text-primary font-bold hover:underline ml-1">View Openings</a>
              </p>
           </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/30 to-transparent -z-10" />
    </section>
  );
};

export { TeamSection };
