-- Update services to have larger dollar prices for demo purposes
UPDATE public.service_packages SET price = 2000 WHERE name LIKE '%Basic%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-design');
UPDATE public.service_packages SET price = 3500 WHERE name LIKE '%Standard%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-design');
UPDATE public.service_packages SET price = 5000 WHERE name LIKE '%Premium%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-design');

UPDATE public.service_packages SET price = 2500 WHERE name LIKE '%Basic%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-development');
UPDATE public.service_packages SET price = 4500 WHERE name LIKE '%Standard%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-development');
UPDATE public.service_packages SET price = 6500 WHERE name LIKE '%Premium%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-development');

-- Update any other packages to clear dollar values
UPDATE public.service_packages SET price = price / 100 WHERE price > 10000; -- If they were in BDT, convert to approx USD for demo
CREATE TABLE IF NOT EXISTS public.hero_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge_text TEXT NOT NULL DEFAULT 'NextOnline LLC — Driving Global Innovation',
    badge_subtext TEXT NOT NULL DEFAULT 'Est. 2021',
    top_label TEXT NOT NULL DEFAULT 'Innovate. Scale. Succeed.',
    heading_line1 TEXT NOT NULL DEFAULT 'Driving the Future of',
    heading_accent TEXT NOT NULL DEFAULT 'Digital Innovation',
    heading_line2 TEXT NOT NULL DEFAULT 'Worldwide',
    description TEXT NOT NULL DEFAULT 'We empower businesses globally with next-generation software solutions, cutting-edge technology, and creative digital strategies designed for the modern era.',
    primary_btn_text TEXT NOT NULL DEFAULT 'Get Started',
    primary_btn_link TEXT NOT NULL DEFAULT '/contact',
    secondary_btn_text TEXT NOT NULL DEFAULT 'View Solutions',
    secondary_btn_link TEXT NOT NULL DEFAULT '/services',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT ON public.hero_content TO anon, authenticated;
GRANT ALL ON public.hero_content TO service_role;

ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for hero content" ON public.hero_content
    FOR SELECT TO public USING (true);

CREATE POLICY "Admin write access for hero content" ON public.hero_content
    FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed with one row if empty
INSERT INTO public.hero_content (id)
SELECT gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM public.hero_content)
LIMIT 1;
