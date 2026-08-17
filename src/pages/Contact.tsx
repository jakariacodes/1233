import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
             <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                   <Mail className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold">Email Us</h3>
                   <p className="text-muted-foreground">contact@techcrafterit.com</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                   <Phone className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold">Call Us</h3>
                   <p className="text-muted-foreground">+880 1234 567890</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                   <MapPin className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="font-bold">Visit Us</h3>
                   <p className="text-muted-foreground">Rangpur, Bangladesh</p>
                </div>
             </div>
          </div>

          <div className="bg-card p-8 rounded-2xl border border-border">
            <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="block mb-2 text-sm font-medium">Name</label>
                  <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
               </div>
               <div>
                  <label className="block mb-2 text-sm font-medium">Email</label>
                  <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
               </div>
               <div>
                  <label className="block mb-2 text-sm font-medium">Message</label>
                  <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required className="min-h-[150px]" />
               </div>
               <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="ml-2 w-4 h-4" />
               </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;