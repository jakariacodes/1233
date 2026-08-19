CREATE TABLE public.payment_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider TEXT NOT NULL UNIQUE,
    config JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_settings TO authenticated;
GRANT ALL ON public.payment_settings TO service_role;

ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage payment settings"
ON public.payment_settings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.payment_settings (provider, config, is_active)
VALUES 
('paypal', '{"clientId": "", "clientSecret": "", "mode": "sandbox"}', false),
('stripe', '{"publishableKey": "", "secretKey": "", "webhookSecret": ""}', false);
