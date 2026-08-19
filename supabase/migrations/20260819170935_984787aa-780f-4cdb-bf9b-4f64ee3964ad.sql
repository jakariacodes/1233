-- Update services to have larger dollar prices for demo purposes
UPDATE public.service_packages SET price = 2000 WHERE name LIKE '%Basic%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-design');
UPDATE public.service_packages SET price = 3500 WHERE name LIKE '%Standard%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-design');
UPDATE public.service_packages SET price = 5000 WHERE name LIKE '%Premium%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-design');

UPDATE public.service_packages SET price = 2500 WHERE name LIKE '%Basic%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-development');
UPDATE public.service_packages SET price = 4500 WHERE name LIKE '%Standard%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-development');
UPDATE public.service_packages SET price = 6500 WHERE name LIKE '%Premium%' AND service_id IN (SELECT id FROM services WHERE slug = 'web-development');

-- Update any other packages to clear dollar values
UPDATE public.service_packages SET price = price / 100 WHERE price > 10000; -- If they were in BDT, convert to approx USD for demo