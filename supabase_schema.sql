-- ============================================================================
-- AgriHaat AI — Complete Supabase PostgreSQL Database Schema & Seed Data
-- Problem Statement 26033 (Direct Marketplace) & 26032 (Procurement Queue)
-- ============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Clean Existing Tables (Optional Drop in Reverse Dependency Order)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS demand_forecasts CASCADE;
DROP TABLE IF EXISTS logistics_routes CASCADE;
DROP TABLE IF EXISTS procurement_bookings CASCADE;
DROP TABLE IF EXISTS procurement_centres CASCADE;
DROP TABLE IF EXISTS order_allocations CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS produce_listings CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- ============================================================================
-- Table 1: Profiles (Farmers, Buyers, Logistics, Centre Operators, Admins)
-- ============================================================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('farmer', 'buyer', 'fpo', 'hub', 'admin')),
    phone TEXT,
    email TEXT,
    organization TEXT,
    location TEXT,
    pincode TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    avatar_letter TEXT DEFAULT 'C',
    verified BOOLEAN DEFAULT true,
    bank_account_masked TEXT,
    bank_ifsc TEXT,
    dbt_linked BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Table 2: Produce Listings (Farmer & FPO Harvest Batches)
-- ============================================================================
CREATE TABLE produce_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    product_name_hi TEXT,
    category TEXT NOT NULL,
    grade TEXT NOT NULL CHECK (grade IN ('A', 'B', 'Bulk')),
    price_per_kg NUMERIC(10, 2) NOT NULL,
    buyer_price_per_kg NUMERIC(10, 2) NOT NULL,
    farmer_realization_per_kg NUMERIC(10, 2) NOT NULL,
    estimated_logistics_per_kg NUMERIC(10, 2) DEFAULT 3.00,
    platform_fee_per_kg NUMERIC(10, 2) DEFAULT 1.00,
    available_quantity NUMERIC(10, 2) NOT NULL,
    total_quantity NUMERIC(10, 2) NOT NULL,
    unit TEXT DEFAULT 'kg',
    location TEXT NOT NULL,
    pincode TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    harvest_date DATE NOT NULL,
    available_until DATE,
    image_url TEXT,
    status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PENDING_QC', 'SOLD_OUT', 'CANCELLED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Table 3: Orders (Bulk & Aggregated Purchase Orders)
-- ============================================================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    buyer_id UUID REFERENCES profiles(id),
    buyer_name TEXT NOT NULL,
    buyer_organization TEXT NOT NULL,
    buyer_phone TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_city TEXT NOT NULL,
    delivery_pincode TEXT,
    delivery_lat DOUBLE PRECISION,
    delivery_lng DOUBLE PRECISION,
    total_quantity_kg NUMERIC(10, 2) NOT NULL,
    total_buyer_amount NUMERIC(12, 2) NOT NULL,
    total_logistics_fee NUMERIC(10, 2) NOT NULL,
    total_platform_fee NUMERIC(10, 2) NOT NULL,
    total_farmer_payable NUMERIC(12, 2) NOT NULL,
    payment_status TEXT DEFAULT 'PROCESSING' CHECK (payment_status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'DISBURSED')),
    payment_ref TEXT,
    status TEXT DEFAULT 'Confirmed' CHECK (status IN ('Placed', 'Confirmed', 'Aggregating', 'Pickup Scheduled', 'Picked Up', 'In Transit', 'Delivered', 'Payment Processing', 'Completed', 'Cancelled')),
    pickup_scheduled_at TIMESTAMPTZ,
    estimated_delivery_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Table 4: Order Allocations (Multi-Farm Supply Splits)
-- ============================================================================
CREATE TABLE order_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    listing_id UUID REFERENCES produce_listings(id),
    farmer_id UUID REFERENCES profiles(id),
    farmer_name TEXT NOT NULL,
    fpo_name TEXT,
    allocated_quantity_kg NUMERIC(10, 2) NOT NULL,
    rate_per_kg NUMERIC(10, 2) NOT NULL,
    farmer_realization NUMERIC(10, 2) NOT NULL,
    pickup_location TEXT NOT NULL,
    pickup_pincode TEXT,
    status TEXT DEFAULT 'Scheduled'
);

-- ============================================================================
-- Table 5: Procurement Centres (Government & FPO Mandi Hubs - PS 26032)
-- ============================================================================
CREATE TABLE procurement_centres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    centre_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_hi TEXT,
    district TEXT NOT NULL,
    address TEXT NOT NULL,
    pincode TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    operating_hours TEXT DEFAULT '08:00 AM – 04:00 PM',
    available_slots_today INT DEFAULT 24,
    current_queue_count INT DEFAULT 8,
    avg_wait_time_minutes INT DEFAULT 42,
    now_serving_token INT DEFAULT 34,
    status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'Crowded', 'Closed'))
);

-- ============================================================================
-- Table 6: Procurement Bookings & Token Queue (PS 26032)
-- ============================================================================
CREATE TABLE procurement_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code TEXT UNIQUE NOT NULL,
    centre_id UUID REFERENCES procurement_centres(id),
    farmer_id UUID REFERENCES profiles(id),
    farmer_name TEXT NOT NULL,
    farmer_phone TEXT NOT NULL,
    token_number INT NOT NULL,
    booking_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    produce_name TEXT NOT NULL,
    expected_quantity_kg NUMERIC(10, 2) NOT NULL,
    accepted_quantity_kg NUMERIC(10, 2),
    rate_per_kg NUMERIC(10, 2) NOT NULL,
    payment_amount NUMERIC(12, 2),
    payment_status TEXT DEFAULT 'Processing' CHECK (payment_status IN ('Pending', 'Processing', 'Completed')),
    payment_ref TEXT,
    status TEXT DEFAULT 'In Queue' CHECK (status IN ('Slot Confirmed', 'Checked In', 'In Queue', 'Quality Check', 'Accepted', 'Payment Processing', 'Payment Completed')),
    estimated_wait_minutes INT DEFAULT 42,
    farmers_ahead INT DEFAULT 8,
    qr_code_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Table 7: Logistics Routes (Multi-Stop Pickups & Dispatches)
-- ============================================================================
CREATE TABLE logistics_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_code TEXT UNIQUE NOT NULL,
    carrier_name TEXT NOT NULL,
    vehicle_number TEXT NOT NULL,
    driver_name TEXT NOT NULL,
    driver_phone TEXT NOT NULL,
    total_distance_km NUMERIC(8, 2) NOT NULL,
    distance_saved_km NUMERIC(8, 2) DEFAULT 18.00,
    estimated_duration TEXT DEFAULT '4h 20m',
    total_weight_kg NUMERIC(10, 2) NOT NULL,
    capacity_kg NUMERIC(10, 2) DEFAULT 3000.00,
    status TEXT DEFAULT 'In Transit' CHECK (status IN ('Scheduled', 'In Transit', 'Delivered', 'Completed')),
    reefer_temperature_celsius NUMERIC(4, 1) DEFAULT 14.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Table 8: Demand Forecasts (Explainable AI Engine Output)
-- ============================================================================
CREATE TABLE demand_forecasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name TEXT NOT NULL,
    region TEXT NOT NULL,
    forecast_period TEXT NOT NULL,
    expected_demand_kg NUMERIC(12, 2) NOT NULL,
    change_percent NUMERIC(5, 2) NOT NULL,
    confidence_percent INT NOT NULL,
    recommendation TEXT NOT NULL,
    recommendation_hi TEXT,
    factors JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Table 9: Notifications
-- ============================================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    title TEXT NOT NULL,
    title_hi TEXT,
    message TEXT NOT NULL,
    message_hi TEXT,
    category TEXT NOT NULL CHECK (category IN ('ORDER', 'PROCUREMENT', 'PRICE', 'PAYMENT', 'SYSTEM')),
    read BOOLEAN DEFAULT false,
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Table 10: Platform Audit Logs
-- ============================================================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    actor_id TEXT,
    details JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE produce_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow public read of active listings & procurement centres
CREATE POLICY "Public read active produce listings" ON produce_listings FOR SELECT USING (true);
CREATE POLICY "Public read procurement centres" ON procurement_centres FOR SELECT USING (true);
CREATE POLICY "Public read demand forecasts" ON demand_forecasts FOR SELECT USING (true);

-- Allow authenticated users to manage their profiles & records
CREATE POLICY "Users can manage own profile" ON profiles FOR ALL USING (true);
CREATE POLICY "Farmers can manage own listings" ON produce_listings FOR ALL USING (true);
CREATE POLICY "Buyers and farmers can view own orders" ON orders FOR ALL USING (true);
CREATE POLICY "Farmers can manage procurement bookings" ON procurement_bookings FOR ALL USING (true);
CREATE POLICY "Users can view own notifications" ON notifications FOR ALL USING (true);

-- ============================================================================
-- Seed Initial Demo Records
-- ============================================================================

-- 1. Insert Farmer Profile
INSERT INTO profiles (id, full_name, role, phone, email, organization, location, pincode, lat, lng, bank_account_masked, bank_ifsc)
VALUES (
    'a1111111-1111-1111-1111-111111111111',
    'Ramesh Kumar',
    'farmer',
    '+91 98401 23456',
    'ramesh.k@abcfpo.in',
    'ABC Farmer Producer Organization',
    'Kanchipuram, Tamil Nadu',
    '631501',
    12.8342,
    79.7036,
    '•••• •••• •••• 4892',
    'SBIN0001234'
);

-- 2. Insert Buyer Profile
INSERT INTO profiles (id, full_name, role, phone, email, organization, location, pincode, lat, lng)
VALUES (
    'b2222222-2222-2222-2222-222222222222',
    'Anita Rao',
    'buyer',
    '+91 97100 88990',
    'anita.r@abcgrand.com',
    'ABC Grand Hotels & Restaurants',
    'Thousand Lights, Chennai',
    '600006',
    13.0604,
    80.2496
);

-- 3. Insert Produce Listings
INSERT INTO produce_listings (id, farmer_id, product_name, product_name_hi, category, grade, price_per_kg, buyer_price_per_kg, farmer_realization_per_kg, available_quantity, total_quantity, location, pincode, lat, lng, harvest_date, image_url)
VALUES 
(
    'c3333333-3333-3333-3333-333333333331',
    'a1111111-1111-1111-1111-111111111111',
    'Tomatoes (Grade A)',
    'टमाटर (ग्रेड A)',
    'Vegetables',
    'A',
    32.00,
    40.00,
    36.00,
    500.00,
    800.00,
    'Kanchipuram, Tamil Nadu',
    '631501',
    12.8342,
    79.7036,
    '2026-08-28',
    '/tomatoes-market.png'
),
(
    'c3333333-3333-3333-3333-333333333332',
    'a1111111-1111-1111-1111-111111111111',
    'Red Onions (Grade A)',
    'लाल प्याज (ग्रेड A)',
    'Vegetables',
    'A',
    28.00,
    35.00,
    31.50,
    700.00,
    1000.00,
    'Nellore, Andhra Pradesh',
    '524001',
    14.4426,
    79.9865,
    '2026-08-27',
    '/onion.jpg'
);

-- 4. Insert Procurement Centres
INSERT INTO procurement_centres (id, centre_code, name, name_hi, district, address, pincode, lat, lng, available_slots_today, current_queue_count, avg_wait_time_minutes, now_serving_token)
VALUES 
(
    'd4444444-4444-4444-4444-444444444441',
    'PROC-CTR-KCH-01',
    'Kanchipuram District Procurement Centre',
    'कांचीपुरम जिला खरीद केंद्र',
    'Kanchipuram',
    'State Highway 58, Near Agricultural Marketing Complex, Kanchipuram',
    '631501',
    12.8342,
    79.7036,
    18,
    8,
    42,
    34
),
(
    'd4444444-4444-4444-4444-444444444442',
    'PROC-CTR-WLJ-02',
    'Walajabad Regulated Market & QC Centre',
    'वालाजाबाद विनियमित मंडी खरीद केंद्र',
    'Kanchipuram',
    'Mandi Road, Walajabad Taluk',
    '631605',
    12.8120,
    79.8240,
    24,
    4,
    25,
    19
);

-- 5. Insert Procurement Booking & Token #42
INSERT INTO procurement_bookings (id, booking_code, centre_id, farmer_id, farmer_name, farmer_phone, token_number, booking_date, time_slot, produce_name, expected_quantity_kg, accepted_quantity_kg, rate_per_kg, payment_amount, payment_status, payment_ref, status, estimated_wait_minutes, farmers_ahead, qr_code_url)
VALUES (
    'e5555555-5555-5555-5555-555555555551',
    'FM-PROC-00421',
    'd4444444-4444-4444-4444-444444444441',
    'a1111111-1111-1111-1111-111111111111',
    'Ramesh Kumar',
    '+91 98401 23456',
    42,
    '2026-08-30',
    '10:30 AM – 11:00 AM',
    'Tomatoes',
    500.00,
    480.00,
    32.00,
    15360.00,
    'Processing',
    'PAY-DEMO-38291',
    'In Queue',
    42,
    8,
    'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=CROPMESH-PROC-TOKEN-42'
);

-- 6. Insert Order & Allocations
INSERT INTO orders (id, order_number, buyer_id, buyer_name, buyer_organization, buyer_phone, delivery_address, delivery_city, delivery_pincode, delivery_lat, delivery_lng, total_quantity_kg, total_buyer_amount, total_logistics_fee, total_platform_fee, total_farmer_payable, payment_status, payment_ref, status, pickup_scheduled_at, estimated_delivery_at)
VALUES (
    'f6666666-6666-6666-6666-666666666661',
    'FM-2026-00421',
    'b2222222-2222-2222-2222-222222222222',
    'Anita Rao',
    'ABC Grand Hotels & Restaurants',
    '+91 97100 88990',
    'No. 42 Anna Salai, Thousand Lights',
    'Chennai',
    '600006',
    13.0604,
    80.2496,
    500.00,
    20000.00,
    1500.00,
    500.00,
    18000.00,
    'PROCESSING',
    'PAY-2026-00421',
    'Confirmed',
    '2026-08-31 08:30:00+05:30',
    '2026-08-31 11:30:00+05:30'
);
