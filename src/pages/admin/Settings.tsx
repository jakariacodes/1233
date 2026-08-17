import { Shield, User, Bell, Globe, Save, Loader2, Send, Camera, Link as LinkIcon, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2 text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your site settings and configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-card p-6 rounded-2xl border border-border space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold border-b border-border pb-4">
                <Globe className="w-5 h-5 text-primary" />
                General Settings
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" defaultValue="NextOnline Technology" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteEmail">Contact Email</Label>
                  <Input id="siteEmail" type="email" defaultValue="contact@techcrafterit.com" />
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold border-b border-border pb-4">
                <Shield className="w-5 h-5 text-primary" />
                Social Media Links
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="facebook" className="pl-10" placeholder="https://facebook.com/..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <div className="relative">
                    <Send className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="twitter" className="pl-10" placeholder="https://twitter.com/..." />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading} className="px-8">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-card p-6 rounded-2xl border border-border">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 w-4 h-4" />
                Notification Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 w-4 h-4" />
                Account Security
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;