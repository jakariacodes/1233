import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Shield, 
  User, 
  Bell, 
  Globe, 
  Save, 
  Loader2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { settings, loading, updateSetting } = useSiteSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Initialize form data from settings
  const getFieldValue = (key: string) => {
    return formData[key] ?? settings[key] ?? '';
  };

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      for (const [key, value] of Object.entries(formData)) {
        if (value !== settings[key]) {
          await updateSetting(key, value);
        }
      }
      toast.success('Settings saved successfully');
      setFormData({});
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = Object.keys(formData).some(key => formData[key] !== settings[key]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and site settings
            </p>
          </div>
          {hasChanges && (
            <Button onClick={handleSaveSettings} disabled={isSaving}>
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Manage your profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input value={user?.email || ''} disabled className="bg-secondary/50" />
              <p className="text-sm text-muted-foreground mt-1">
                Your email cannot be changed
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Site Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Site Information
            </CardTitle>
            <CardDescription>
              General website configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <Input
                  value={getFieldValue('site_name')}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Site Description</label>
                <Input
                  value={getFieldValue('site_description')}
                  onChange={(e) => handleChange('site_description', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </CardTitle>
            <CardDescription>
              Your business contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <Input
                  type="email"
                  value={getFieldValue('site_email')}
                  onChange={(e) => handleChange('site_email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                <Input
                  value={getFieldValue('site_phone')}
                  onChange={(e) => handleChange('site_phone', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </label>
              <Input
                value={getFieldValue('site_address')}
                onChange={(e) => handleChange('site_address', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Social Media Links
            </CardTitle>
            <CardDescription>
              Connect your social media profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Facebook
                </label>
                <Input
                  value={getFieldValue('facebook_url')}
                  onChange={(e) => handleChange('facebook_url', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-sky-500" />
                  Twitter / X
                </label>
                <Input
                  value={getFieldValue('twitter_url')}
                  onChange={(e) => handleChange('twitter_url', e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  Instagram
                </label>
                <Input
                  value={getFieldValue('instagram_url')}
                  onChange={(e) => handleChange('instagram_url', e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  LinkedIn
                </label>
                <Input
                  value={getFieldValue('linkedin_url')}
                  onChange={(e) => handleChange('linkedin_url', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-red-600" />
                  YouTube
                </label>
                <Input
                  value={getFieldValue('youtube_url')}
                  onChange={(e) => handleChange('youtube_url', e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-muted-foreground">
                  Update your password regularly for security
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" disabled>Coming Soon</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Receive updates about new orders and messages
                </p>
              </div>
              <input type="checkbox" defaultChecked className="rounded h-5 w-5" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div>
                <h4 className="font-medium">New Order Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified when a new order is placed
                </p>
              </div>
              <input type="checkbox" defaultChecked className="rounded h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        {hasChanges && (
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isSaving} size="lg">
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Settings;
