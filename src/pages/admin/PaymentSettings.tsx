import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { usePaymentSettings } from "@/hooks/usePaymentSettings";
import { Loader2, Save, CreditCard, ShieldCheck, Landmark } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PaymentSettings = () => {
  const { settings, loading, updateSetting } = usePaymentSettings();
  const { toast } = useToast();
  const [saving, setSaving] = useState<string | null>(null);

  // Local state for form inputs
  const [configs, setConfigs] = useState<Record<string, any>>({});

  useEffect(() => {
    if (settings.length > 0) {
      const newConfigs: Record<string, any> = {};
      settings.forEach(s => {
        newConfigs[s.provider] = { ...s.config, is_active: s.is_active };
      });
      setConfigs(newConfigs);
    }
  }, [settings]);

  const handleConfigChange = (provider: string, key: string, value: any) => {
    setConfigs(prev => ({
      ...prev,
      [provider]: {
        ...prev[provider],
        [key]: value
      }
    }));
  };

  const handleSave = async (provider: string) => {
    setSaving(provider);
    const { is_active, ...config } = configs[provider];
    const result = await updateSetting(provider, config, is_active);
    setSaving(null);

    if (result.success) {
      toast({
        title: "Settings Saved",
        description: `${provider.charAt(0).toUpperCase() + provider.slice(1)} configuration updated successfully.`,
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  if (loading && settings.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 pb-10">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight">Payment Gateways</h1>
          <p className="text-muted-foreground mt-2">Configure international payment methods for your checkout flow.</p>
        </div>

        <Tabs defaultValue="stripe" className="w-full">
          <TabsList className="bg-secondary/50 p-1 rounded-2xl mb-8">
            <TabsTrigger value="stripe" className="rounded-xl px-8 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-primary data-[state=active]:shadow-lg">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Stripe
            </TabsTrigger>
            <TabsTrigger value="paypal" className="rounded-xl px-8 py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-primary data-[state=active]:shadow-lg">
              <CreditCard className="w-4 h-4 mr-2" />
              PayPal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stripe" className="mt-0">
            <Card className="glass-card border-none shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Stripe Integration</CardTitle>
                      <CardDescription>Configure Stripe API keys for card payments.</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/50 px-4 py-2 rounded-xl">
                    <Label htmlFor="stripe-active" className="text-xs font-bold uppercase tracking-wider cursor-pointer">Status</Label>
                    <Switch 
                      id="stripe-active" 
                      checked={configs['stripe']?.is_active || false}
                      onCheckedChange={(val) => handleConfigChange('stripe', 'is_active', val)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold ml-1">Publishable Key</Label>
                    <Input 
                      placeholder="pk_test_..." 
                      className="h-12 rounded-xl bg-secondary/30 border-none"
                      value={configs['stripe']?.publishableKey || ''}
                      onChange={(e) => handleConfigChange('stripe', 'publishableKey', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold ml-1">Secret Key</Label>
                    <Input 
                      type="password"
                      placeholder="sk_test_..." 
                      className="h-12 rounded-xl bg-secondary/30 border-none"
                      value={configs['stripe']?.secretKey || ''}
                      onChange={(e) => handleConfigChange('stripe', 'secretKey', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-bold ml-1">Webhook Secret</Label>
                    <Input 
                      type="password"
                      placeholder="whsec_..." 
                      className="h-12 rounded-xl bg-secondary/30 border-none"
                      value={configs['stripe']?.webhookSecret || ''}
                      onChange={(e) => handleConfigChange('stripe', 'webhookSecret', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={() => handleSave('stripe')}
                    disabled={saving === 'stripe'}
                    className="h-12 px-8 rounded-xl gap-2 font-bold shadow-lg shadow-primary/20"
                  >
                    {saving === 'stripe' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Stripe Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paypal" className="mt-0">
            <Card className="glass-card border-none shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">PayPal Integration</CardTitle>
                      <CardDescription>Configure PayPal Client ID and Credentials.</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/50 px-4 py-2 rounded-xl">
                    <Label htmlFor="paypal-active" className="text-xs font-bold uppercase tracking-wider cursor-pointer">Status</Label>
                    <Switch 
                      id="paypal-active" 
                      checked={configs['paypal']?.is_active || false}
                      onCheckedChange={(val) => handleConfigChange('paypal', 'is_active', val)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold ml-1">Client ID</Label>
                    <Input 
                      placeholder="PayPal Client ID" 
                      className="h-12 rounded-xl bg-secondary/30 border-none"
                      value={configs['paypal']?.clientId || ''}
                      onChange={(e) => handleConfigChange('paypal', 'clientId', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold ml-1">Client Secret</Label>
                    <Input 
                      type="password"
                      placeholder="PayPal Client Secret" 
                      className="h-12 rounded-xl bg-secondary/30 border-none"
                      value={configs['paypal']?.clientSecret || ''}
                      onChange={(e) => handleConfigChange('paypal', 'clientSecret', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold ml-1">Environment Mode</Label>
                    <select 
                      className="w-full h-12 rounded-xl bg-secondary/30 border-none px-4 text-sm font-medium focus:ring-2 focus:ring-primary outline-none appearance-none"
                      value={configs['paypal']?.mode || 'sandbox'}
                      onChange={(e) => handleConfigChange('paypal', 'mode', e.target.value)}
                    >
                      <option value="sandbox">Sandbox (Testing)</option>
                      <option value="live">Live (Production)</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={() => handleSave('paypal')}
                    disabled={saving === 'paypal'}
                    className="h-12 px-8 rounded-xl gap-2 font-bold shadow-lg shadow-primary/20"
                  >
                    {saving === 'paypal' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save PayPal Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="border-dashed bg-transparent border-border/50">
          <CardContent className="p-8 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
              <Landmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Bank Transfer Configuration</h3>
              <p className="text-sm text-muted-foreground mt-1">Direct bank transfer details can be configured here in the next update. Currently handled through manual verification.</p>
            </div>
            <Button variant="outline" className="ml-auto rounded-xl" disabled>Coming Soon</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PaymentSettings;
