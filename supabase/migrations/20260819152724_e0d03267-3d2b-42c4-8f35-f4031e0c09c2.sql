-- Clear existing services to avoid duplicates
TRUNCATE public.service_packages CASCADE;
TRUNCATE public.services CASCADE;

-- Insert Services
INSERT INTO public.services (id, slug, title, subtitle, description, icon_name, is_active, sort_order) VALUES
(gen_random_uuid(), 'web-design', 'Web Design', 'Stunning responsive websites', 'Get a professional, high-converting website designed specifically for your brand. We focus on user experience and modern aesthetics.', 'Globe', true, 1),
(gen_random_uuid(), 'web-development', 'Web Development', 'Scalable web applications', 'Custom web applications built with modern technologies. We provide robust backend solutions and interactive frontends.', 'Code2', true, 2),
(gen_random_uuid(), 'graphic-design', 'Graphic Design', 'Eye-catching brand visuals', 'Professional visual identities, logos, and marketing materials that make your brand stand out from the competition.', 'Palette', true, 3),
(gen_random_uuid(), 'video-editing', 'Video Editing', 'Cinematic video production', 'High-quality video editing for social media, advertisements, and corporate presentations with professional color grading.', 'Video', true, 4),
(gen_random_uuid(), 'digital-marketing', 'Digital Marketing', 'ROI-driven campaigns', 'Scale your business with targeted digital marketing strategies, social media management, and paid advertising.', 'TrendingUp', true, 5),
(gen_random_uuid(), 'seo-optimization', 'SEO Optimization', 'Dominate search rankings', 'Improve your visibility on Google and other search engines with our comprehensive SEO audits and implementation.', 'Search', true, 6),
(gen_random_uuid(), 'business-strategy', 'Business Strategy', 'Expert digital consulting', 'Growth-focused strategy and consulting to help your business navigate the digital landscape and increase efficiency.', 'Briefcase', true, 7),
(gen_random_uuid(), 'ai-solutions', 'AI Solutions', 'AI-powered automation', 'Leverage the power of Artificial Intelligence to automate your workflows and gain deeper insights from your data.', 'Zap', true, 8);

-- Insert Packages for Web Design
INSERT INTO public.service_packages (service_id, name, price, description, features, is_popular, delivery_days)
SELECT id, 'Basic', 15000, 'Simple landing page', ARRAY['Landing Page', 'Responsive Design', '3 Sections', 'Basic SEO', '3 Days Support'], false, 5 FROM public.services WHERE slug = 'web-design'
UNION ALL
SELECT id, 'Standard', 35000, 'Complete Business Website', ARRAY['Up to 5 Pages', 'Custom Design', 'SEO Optimized', 'Contact Form', '30 Days Support'], true, 10 FROM public.services WHERE slug = 'web-design'
UNION ALL
SELECT id, 'Premium', 65000, 'E-commerce / Advanced Site', ARRAY['Unlimited Pages', 'E-commerce Integration', 'Premium UI/UX', 'Speed Optimization', '6 Months Support'], false, 20 FROM public.services WHERE slug = 'web-design';

-- Insert Packages for Web Development
INSERT INTO public.service_packages (service_id, name, price, description, features, is_popular, delivery_days)
SELECT id, 'Basic', 25000, 'Frontend Task', ARRAY['Single Page App', 'React/Next.js', 'API Integration', 'Basic UI', '7 Days Support'], false, 7 FROM public.services WHERE slug = 'web-development'
UNION ALL
SELECT id, 'Standard', 80000, 'Full Stack Web App', ARRAY['Admin Dashboard', 'User Authentication', 'Database Integration', 'Complex UI', '3 Months Support'], true, 30 FROM public.services WHERE slug = 'web-development'
UNION ALL
SELECT id, 'Premium', 150000, 'Enterprise Solution', ARRAY['Scalable Architecture', 'Microservices', 'Advanced Security', 'Performance Tuning', '1 Year Support'], false, 60 FROM public.services WHERE slug = 'web-development';

-- Insert Packages for Graphic Design
INSERT INTO public.service_packages (service_id, name, price, description, features, is_popular, delivery_days)
SELECT id, 'Basic', 5000, 'Logo Design', ARRAY['3 Logo Concepts', 'High Resolution', 'Vector Files', '2 Revisions', 'Basic Branding'], false, 3 FROM public.services WHERE slug = 'graphic-design'
UNION ALL
SELECT id, 'Standard', 15000, 'Brand Identity', ARRAY['Complete Brand Book', 'Social Media Kit', 'Business Cards', 'Unlimited Revisions', 'Full Source Files'], true, 7 FROM public.services WHERE slug = 'graphic-design'
UNION ALL
SELECT id, 'Premium', 30000, 'Full Marketing Pack', ARRAY['Logo + Identity', 'Banner Ads', 'Motion Graphics', 'Presentation Templates', 'Priority Support'], false, 14 FROM public.services WHERE slug = 'graphic-design';

-- Insert Packages for Video Editing
INSERT INTO public.service_packages (service_id, name, price, description, features, is_popular, delivery_days)
SELECT id, 'Basic', 8000, 'Social Media Edit', ARRAY['Short-form Video', 'Color Grading', 'Subtitles', 'Copyright-free Music', '2 Days Delivery'], false, 2 FROM public.services WHERE slug = 'video-editing'
UNION ALL
SELECT id, 'Standard', 25000, 'Commercial Edit', ARRAY['Up to 5 Minutes', 'Sound Design', 'Advanced Effects', 'Professional Grading', 'Unlimited Revisions'], true, 7 FROM public.services WHERE slug = 'video-editing'
UNION ALL
SELECT id, 'Premium', 60000, 'Cinematic Production', ARRAY['High-end Editing', 'Custom Transitions', '4K Rendering', 'VFX Elements', 'Full Storyboarding'], false, 15 FROM public.services WHERE slug = 'video-editing';

-- Insert Packages for Digital Marketing
INSERT INTO public.service_packages (service_id, name, price, description, features, is_popular, delivery_days)
SELECT id, 'Basic', 12000, 'Ads Management', ARRAY['FB/IG Ads', 'Keyword Research', 'Weekly Reports', 'Ad Copywriting', '30 Days Support'], false, 7 FROM public.services WHERE slug = 'digital-marketing'
UNION ALL
SELECT id, 'Standard', 35000, 'Growth Pack', ARRAY['Social Media Management', 'Content Strategy', 'SEO Included', 'Competitor Analysis', 'Monthly Meetings'], true, 30 FROM public.services WHERE slug = 'digital-marketing'
UNION ALL
SELECT id, 'Premium', 80000, 'Full Digital Presence', ARRAY['Omni-channel Strategy', 'Email Marketing', 'Influencer Outreach', 'Advanced Analytics', 'Dedicated Manager'], false, 30 FROM public.services WHERE slug = 'digital-marketing';

-- Insert Packages for SEO Optimization
INSERT INTO public.service_packages (service_id, name, price, description, features, is_popular, delivery_days)
SELECT id, 'Basic', 10000, 'Local SEO', ARRAY['Google My Business', 'Keyword Tracking', 'On-page Audit', 'Meta Optimization', 'Monthly Report'], false, 14 FROM public.services WHERE slug = 'seo-optimization'
UNION ALL
SELECT id, 'Standard', 25000, 'Organic Growth', ARRAY['Competitor Analysis', 'Backlink Strategy', 'Technical SEO', 'Content Optimization', 'Keyword Research'], true, 30 FROM public.services WHERE slug = 'seo-optimization'
UNION ALL
SELECT id, 'Premium', 55000, 'Global Authority', ARRAY['High DA Backlinks', 'Technical Overhaul', 'Multilingual SEO', 'E-A-T Strategy', 'Quarterly Planning'], false, 60 FROM public.services WHERE slug = 'seo-optimization';

-- Insert Packages for Business Strategy
INSERT INTO public.service_packages (service_id, name, price, description, features, is_popular, delivery_days)
SELECT id, 'Basic', 15000, 'Consultation', ARRAY['Business Audit', 'SWOT Analysis', 'Gap Identification', '1 Hour Strategy Call', 'Roadmap Document'], false, 3 FROM public.services WHERE slug = 'business-strategy'
UNION ALL
SELECT id, 'Standard', 45000, 'Growth Strategy', ARRAY['Market Research', 'Process Automation', 'Sales Funnel Design', 'Bi-weekly Consulting', 'Performance KPIs'], true, 30 FROM public.services WHERE slug = 'business-strategy'
UNION ALL
SELECT id, 'Premium', 100000, 'Executive Advisory', ARRAY['Dedicated Consultant', 'Operational Overhaul', 'Financial Planning', 'Scaling Roadmap', '24/7 Priority Support'], false, 90 FROM public.services WHERE slug = 'business-strategy';

-- Insert Packages for AI Solutions
INSERT INTO public.service_packages (service_id, name, price, description, features, is_popular, delivery_days)
SELECT id, 'Basic', 20000, 'AI Chatbot', ARRAY['Custom Knowledge Base', 'Website Integration', 'Lead Generation', 'Basic Logic', '7 Days Support'], false, 7 FROM public.services WHERE slug = 'ai-solutions'
UNION ALL
SELECT id, 'Standard', 60000, 'Workflow Automation', ARRAY['Zapier/Make Workflows', 'Custom AI Models', 'Data Integration', 'Process Automation', 'Monthly Maintenance'], true, 21 FROM public.services WHERE slug = 'ai-solutions'
UNION ALL
SELECT id, 'Premium', 150000, 'Custom AI Integration', ARRAY['Custom LLM Tuning', 'Deep Data Analysis', 'Enterprise API', 'High-security AI', 'Full Training & Support'], false, 45 FROM public.services WHERE slug = 'ai-solutions';