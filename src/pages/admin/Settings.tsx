import { Shield, Globe, Save, Loader2, Layout, Type, AlignLeft, MousePointer2, Image as ImageIcon, Upload, MessageSquare, Bot, Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useHeroContent, HeroContent } from "@/hooks/useHeroContent";

const Settings = () => {
  const { toast } = useToast();
  const { data: heroContent, refetch } = useHeroContent();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<HeroContent>({
    badge_text: "",
    badge_subtext: "",
    top_label: "",
    heading_line1: "",
    heading_accent: "",
    heading_line2: "",
    description: "",
    primary_btn_text: "",
    primary_btn_link: "",
    secondary_btn_text: "",
    secondary_btn_link: "",
    header_logo_url: "",
  });
  const [chatSettings, setChatSettings] = useState<any>({
    ai_chat_enabled: true,
    live_chat_enabled: true,
    welcome_message: "",
    whatsapp_number: "",
  });

  useEffect(() => {
    if (heroContent) {
      setFormData(heroContent);
    }
    fetchChatSettings();
  }, [heroContent]);

  const fetchChatSettings = async () => {
    const { data } = await (supabase.from('chat_settings' as any).select('*') as any).single();
    if (data) setChatSettings(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("hero_content" as any)
        .update(formData)
        .eq("id", (heroContent as any).id);

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Hero section content updated successfully.",
      });
      refetch();
    } catch (error: any) {
      console.error("Error updating hero content:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update hero content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChatSave = async () => {
    setLoading(true);
    try {
      const { error } = await (supabase
        .from("chat_settings" as any)
        .update(chatSettings)
        .eq("id", chatSettings.id) as any);

      if (error) throw error;

      toast({
        title: "Chat settings saved",
        description: "AI and Live Chat configuration updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update chat settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('branding')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('branding')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, header_logo_url: publicUrl }));
      
      toast({
        title: "Logo uploaded",
        description: "New logo uploaded successfully. Save changes to apply.",
      });
    } catch (error: any) {
      console.error("Error uploading logo:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload logo.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2 text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your site settings and hero section content.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Site Branding Section */}
          <div className="bg-card p-6 rounded-2xl border border-border space-y-6">
            <div className="flex items-center gap-2 text-lg font-semibold border-b border-border pb-4 text-foreground">
              <ImageIcon className="w-5 h-5 text-primary" />
              Site Branding
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 aspect-video bg-secondary/30 rounded-2xl border border-dashed border-border flex items-center justify-center overflow-hidden">
                {formData.header_logo_url ? (
                  <img src={formData.header_logo_url} alt="Site Logo" className="max-h-full object-contain p-4" />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">No custom logo uploaded</p>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label>Header Logo</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload} 
                      ref={fileInputRef}
                      className="hidden" 
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full h-12 rounded-xl gap-2"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {formData.header_logo_url ? "Change Logo" : "Upload Logo"}
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Recommended: Transparent PNG, 200x50px</p>
                </div>
                {formData.header_logo_url && (
                  <div className="space-y-2">
                    <Label htmlFor="header_logo_url">Logo URL</Label>
                    <Input id="header_logo_url" value={formData.header_logo_url} readOnly className="bg-secondary/50" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border space-y-6">
            <div className="flex items-center gap-2 text-lg font-semibold border-b border-border pb-4 text-foreground">
              <Layout className="w-5 h-5 text-primary" />
              Hero Section Management
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider mb-2">
                  <Shield className="w-4 h-4" />
                  Badge & Top Label
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badge_text">Badge Text</Label>
                  <Input id="badge_text" value={formData.badge_text} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badge_subtext">Badge Sub-text</Label>
                  <Input id="badge_subtext" value={formData.badge_subtext} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="top_label">Top Label (Small Title)</Label>
                  <Input id="top_label" value={formData.top_label} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider mb-2">
                  <Type className="w-4 h-4" />
                  Main Heading
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heading_line1">Heading Line 1</Label>
                  <Input id="heading_line1" value={formData.heading_line1} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heading_accent">Accent Heading (Colored)</Label>
                  <Input id="heading_accent" value={formData.heading_accent} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heading_line2">Heading Line 2</Label>
                  <Input id="heading_line2" value={formData.heading_line2} onChange={handleChange} />
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider mb-2">
                  <AlignLeft className="w-4 h-4" />
                  Description
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Hero Description</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider mb-2">
                  <MousePointer2 className="w-4 h-4" />
                  Primary Button
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary_btn_text">Button Text</Label>
                  <Input id="primary_btn_text" value={formData.primary_btn_text} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary_btn_link">Button Link</Label>
                  <Input id="primary_btn_link" value={formData.primary_btn_link} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider mb-2">
                  <MousePointer2 className="w-4 h-4" />
                  Secondary Button
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary_btn_text">Button Text</Label>
                  <Input id="secondary_btn_text" value={formData.secondary_btn_text} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary_btn_link">Button Link</Label>
                  <Input id="secondary_btn_link" value={formData.secondary_btn_link} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="px-8 h-12 rounded-xl">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Hero Content
            </Button>
          </div>
        </form>

        <div className="bg-card p-6 rounded-2xl border border-border space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold border-b border-border pb-4 text-foreground">
            <MessageSquare className="w-5 h-5 text-primary" />
            Chat & AI Assistant Settings
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold">AI Assistant</p>
                    <p className="text-[10px] text-muted-foreground">Automated AI responses for users</p>
                  </div>
                </div>
                <Switch 
                  checked={chatSettings.ai_chat_enabled} 
                  onCheckedChange={(checked) => setChatSettings({...chatSettings, ai_chat_enabled: checked})} 
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold">Live Support Chat</p>
                    <p className="text-[10px] text-muted-foreground">Allow users to message for support</p>
                  </div>
                </div>
                <Switch 
                  checked={chatSettings.live_chat_enabled} 
                  onCheckedChange={(checked) => setChatSettings({...chatSettings, live_chat_enabled: checked})} 
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome_message">Welcome Message</Label>
                <Textarea 
                  id="welcome_message" 
                  value={chatSettings.welcome_message} 
                  onChange={(e) => setChatSettings({...chatSettings, welcome_message: e.target.value})}
                  placeholder="Example: Hello! How can we help you today?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp_number">WhatsApp Number (Optional)</Label>
                <div className="flex gap-2">
                  <div className="h-12 w-12 rounded-xl bg-secondary/50 flex items-center justify-center border border-border">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <Input 
                    id="whatsapp_number" 
                    value={chatSettings.whatsapp_number} 
                    onChange={(e) => setChatSettings({...chatSettings, whatsapp_number: e.target.value})}
                    placeholder="+880 1XXX-XXXXXX"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleChatSave} disabled={loading} className="px-8 h-12 rounded-xl bg-primary text-white">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Chat Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
