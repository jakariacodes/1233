import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe, Zap, Users, Award, Star, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const stats = [
    { value: "850+", label: "Projects Done", icon: Zap, color: "text-blue-500" },
    { value: "650+", label: "Happy Clients", icon: Users, color: "text-pink-500" },
    { value: "100%", label: "Satisfaction", icon: Star, color: "text-green-500" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Company: ${formData.company}\nService: ${formData.service}\n\n${formData.message}`,
          subject: `New Inquiry: ${formData.service}`
        }]);

      if (error) throw error;

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 overflow-hidden relative">
      {/* Background blobs for premium feel */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-50/50 rounded-full blur-[100px] -z-10" />

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Let's Create Something Amazing
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#0F172A] mb-6 leading-tight"
          >
            Get in Touch & Start Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Digital Journey</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed"
          >
            Ready to transform your business? Let's discuss your project and discover how we can help you achieve your goals.
          </motion.p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20 max-w-6xl mx-auto">
          {[
            { icon: Phone, title: "Call Us", desc: "Speak directly with our team", info: "+1 (413) 628-1326", color: "bg-green-50 text-green-600" },
            { icon: Mail, title: "Email Us", desc: "Get a response within 24 hours", info: "info@thenextonline.com", color: "bg-blue-50 text-blue-600" },
            { icon: MapPin, title: "Visit 🇺🇸", desc: "New York Office", info: "Next Online LLC\n89-15 PARSONS BLVD #10K\nJAMAICA, NEW YORK 11432 USA", color: "bg-purple-50 text-purple-600" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{item.desc}</p>
              <div className="font-semibold text-[#0F172A] whitespace-pre-line">{item.info}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Section: Text + Form */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-start mb-20">
          {/* Left Side: Why Choose Us */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-10"
          >
            <div>
              <div className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">Why Choose Us</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0F172A] mb-6 leading-tight">
                Let's Build <br /> Something <br />
                <span className="text-blue-600">Extraordinary</span>
              </h2>
              <p className="text-slate-500 leading-relaxed max-w-md">
                From concept to launch, we're with you every step of the way. Our team of experts is ready to turn your vision into reality.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Free consultation & project quote",
                "Response within 24 hours",
                "Dedicated project manager",
                "100% satisfaction guarantee"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-slate-200">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-bold text-[#0F172A] mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-blue-600 rounded-2xl p-6 flex items-center gap-4 text-white shadow-lg shadow-blue-200">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest">We're Available</p>
                <p className="text-lg font-bold">24/7 Online Support</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Send className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A]">Send Us a Message</h3>
                <p className="text-slate-400 text-sm">Fill out the form and we'll respond within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A]">Full Name *</label>
                  <Input 
                    placeholder="John Doe" 
                    className="bg-slate-50 border-slate-100 focus:bg-white h-12 rounded-xl"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A]">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="john@company.com (optional)" 
                    className="bg-slate-50 border-slate-100 focus:bg-white h-12 rounded-xl"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A]">Mobile / WhatsApp *</label>
                  <Input 
                    placeholder="+880 1XXX-XXXXXX" 
                    className="bg-slate-50 border-slate-100 focus:bg-white h-12 rounded-xl"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#0F172A]">Company Name</label>
                  <Input 
                    placeholder="Your Company" 
                    className="bg-slate-50 border-slate-100 focus:bg-white h-12 rounded-xl"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A]">Service Required *</label>
                <select 
                  className="w-full bg-slate-50 border-slate-100 focus:bg-white h-12 rounded-xl px-4 outline-none text-sm appearance-none cursor-pointer"
                  value={formData.service}
                  onChange={e => setFormData({...formData, service: e.target.value})}
                  required
                >
                  <option value="">Select a service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Cloud Solutions">Cloud Solutions</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F172A]">Project Details *</label>
                <Textarea 
                  placeholder="Tell us about your project, goals, and timeline..." 
                  className="bg-slate-50 border-slate-100 focus:bg-white min-h-[120px] rounded-xl"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  required 
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all text-lg group" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="text-center mb-10">
          <div className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">Our Location</div>
          <h2 className="text-4xl font-display font-bold text-[#0F172A]">Find Us on the <span className="text-blue-600">Map</span></h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto h-[400px] bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center p-8 relative"
        >
          {/* Placeholder for real map */}
          <div className="text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-300 animate-spin-slow" />
             </div>
             <p className="text-[#0F172A] font-medium italic">89-15 PARSONS BLVD #10K, JAMAICA, NEW YORK 11432 USA</p>
             <a 
              href="https://maps.google.com" 
              target="_blank" 
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
             >
               <MapPin className="w-4 h-4" />
               Open in Google Maps
             </a>
          </div>
        </motion.div>
      </div>

      {/* Newsletter Section Integrated */}
      <div className="container-custom mt-20">
        <div className="bg-[#0F172A] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider mb-6">
                <Mail className="w-3 h-3" />
                Newsletter
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Stay Updated with Us</h2>
              <p className="text-white/60">Get the latest updates, tips, exclusive offers and industry insights delivered to your inbox.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="Enter your email address" 
                className="bg-white/5 border-white/10 text-white h-14 rounded-2xl placeholder:text-white/20"
              />
              <Button className="bg-white text-[#0F172A] hover:bg-white/90 h-14 px-8 rounded-2xl font-bold transition-all shrink-0">
                Subscribe <Send className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-[10px] text-white/30 mt-6">No spam, unsubscribe anytime. By subscribing you agree to our Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
