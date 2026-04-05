-- Run this in your Supabase SQL Editor to allow public access to categories and products

-- For categories table
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable public access for all categories" ON public.categories;
CREATE POLICY "Enable public access for all categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

-- For products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable public access for all products" ON public.products;
CREATE POLICY "Enable public access for all products" ON public.products FOR ALL USING (true) WITH CHECK (true);