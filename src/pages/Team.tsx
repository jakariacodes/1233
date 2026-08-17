import { useTeamMembers } from "@/hooks/useTeamMembers";
import { Globe, Send, Mail, Phone, MapPin, Award, Users, Briefcase, Sparkles, Heart } from "lucide-react";
import { Loader2 } from "lucide-react";

const Team = () => {
  const { teamMembers, loading } = useTeamMembers();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>
        <div className="grid md:grid-cols-3 gap-8">
           {teamMembers.map((member) => (
             <div key={member.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="aspect-square bg-muted">
                   {member.image_url && <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />}
                </div>
                <div className="p-6 text-center">
                   <h3 className="text-xl font-bold">{member.name}</h3>
                   <p className="text-muted-foreground">{member.role}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Team;