-- Create App Role Enum
DO $$ BEGIN
    CREATE TYPE public.app_role AS enum ('admin', 'moderator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. Profiles Table
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name text,
    last_name text,
    country text,
    phone text,
    address text,
    role public.app_role DEFAULT 'user'::public.app_role,
    status text DEFAULT 'pending',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Services Table
CREATE TABLE public.services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    subtitle text,
    description text,
    icon_name text,
    image_url text,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.services TO anon;
GRANT SELECT ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public services are viewable by everyone" ON public.services FOR SELECT USING (is_active = true);

-- 3. Service Packages Table
CREATE TABLE public.service_packages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id uuid REFERENCES public.services(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    price numeric NOT NULL,
    description text,
    features text[] DEFAULT '{}',
    is_popular boolean DEFAULT false,
    delivery_days integer,
    created_at timestamptz DEFAULT now()
);

GRANT SELECT ON public.service_packages TO anon;
GRANT SELECT ON public.service_packages TO authenticated;
GRANT ALL ON public.service_packages TO service_role;

ALTER TABLE public.service_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Packages are viewable by everyone" ON public.service_packages FOR SELECT USING (true);

-- 4. Orders Table
CREATE TABLE public.orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    package_id uuid REFERENCES public.service_packages(id) ON DELETE RESTRICT NOT NULL,
    status text DEFAULT 'pending',
    payment_status text DEFAULT 'unpaid',
    payment_method text,
    total_amount numeric NOT NULL,
    customer_details jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

GRANT SELECT, INSERT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. User Roles Table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 6. Role Check Function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Admin Policies
CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage packages" ON public.service_packages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage orders" ON public.orders FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage profiles" ON public.profiles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Initial Seed
INSERT INTO public.services (slug, title, subtitle, description, icon_name, sort_order)
VALUES 
('web-design', 'Web Design', 'Stunning, Responsive Websites That Captivate', 'We create modern, high-converting websites that perfectly represent your brand and drive results.', 'Globe', 1),
('web-development', 'Web Development', 'Scalable Web Applications Built for Performance', 'We build robust and secure web applications using cutting-edge technologies.', 'Code2', 2),
('video-editing', 'Video Editing', 'Tell Your Story With Cinematic Impact', 'We produce scroll-stopping videos that capture attention and drive engagement.', 'Video', 3)
ON CONFLICT (slug) DO NOTHING;
