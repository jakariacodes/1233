import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, Clock, ArrowRight, Star, Sparkles, Heart, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Careers = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    resume: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted successfully!");
    setFormData({ name: "", email: "", position: "", resume: "", message: "" });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Join Our Team</h1>
        <div className="max-w-2xl mx-auto bg-card p-8 rounded-2xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block mb-2">Full Name</label>
                <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
             </div>
             <div>
                <label className="block mb-2">Email</label>
                <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
             </div>
             <div>
                <label className="block mb-2">Position</label>
                <Input value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} required />
             </div>
             <div>
                <label className="block mb-2">Message</label>
                <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required />
             </div>
             <Button type="submit" className="w-full">Apply Now</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Careers;
