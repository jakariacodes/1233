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
