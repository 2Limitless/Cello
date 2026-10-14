-- ============================================================
-- LANE & EDWARDS VIOLINS — SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor (SQL Editor -> New Query)
-- ============================================================

-- 1. Create Atelier Settings & Content Table
CREATE TABLE IF NOT EXISTS public.atelier_settings (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- 2. Create VIP Instrument Bookings Table
CREATE TABLE IF NOT EXISTS public.vip_bookings (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  musician_level TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  notes TEXT,
  product_id TEXT,
  product_name TEXT,
  product_price NUMERIC DEFAULT 0,
  commission_rate NUMERIC DEFAULT 0,
  commission_amount NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.atelier_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_bookings ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for Public Reading & Service Role Full Access
DROP POLICY IF EXISTS "Allow public read atelier_settings" ON public.atelier_settings;
CREATE POLICY "Allow public read atelier_settings"
  ON public.atelier_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow service role all on atelier_settings" ON public.atelier_settings;
CREATE POLICY "Allow service role all on atelier_settings"
  ON public.atelier_settings FOR ALL
  USING (true);

DROP POLICY IF EXISTS "Allow public read vip_bookings" ON public.vip_bookings;
CREATE POLICY "Allow public read vip_bookings"
  ON public.vip_bookings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public insert vip_bookings" ON public.vip_bookings;
CREATE POLICY "Allow public insert vip_bookings"
  ON public.vip_bookings FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow service role all on vip_bookings" ON public.vip_bookings;
CREATE POLICY "Allow service role all on vip_bookings"
  ON public.vip_bookings FOR ALL
  USING (true);
