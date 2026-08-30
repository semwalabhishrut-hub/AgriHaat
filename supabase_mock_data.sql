-- ============================================================================
-- AgriHaat AI — Comprehensive Production Mock Dataset for Supabase
-- Covers 20+ Farmers, 10+ Buyers, 30+ Produce Listings across Indian States,
-- 15+ Bulk Orders, Order Allocations, Procurement Centres & Token Queues,
-- Logistics Multi-Stop Routes, Demand Forecasts, Notifications, and Audit Logs.
-- ============================================================================

-- 1. Insert 20 Verified Farmers & FPO Profiles
INSERT INTO profiles (id, full_name, role, phone, email, organization, location, pincode, lat, lng, avatar_letter, verified, bank_account_masked, bank_ifsc)
VALUES
(
    'a1111111-1111-1111-1111-111111111101',
    'Ramesh Kumar',
    'farmer',
    '+91 98401 23456',
    'ramesh.k@abcfpo.in',
    'ABC Farmer Producer Organization',
    'Kanchipuram, Tamil Nadu',
    '631501',
    12.8342,
    79.7036,
    'R',
    true,
    '•••• •••• •••• 4892',
    'SBIN0001234'
),
(
    'a1111111-1111-1111-1111-111111111102',
    'Venkatesh Naidu',
    'farmer',
    '+91 98480 11223',
    'venkat.n@greenfields.org',
    'GreenFields Farmer Producer Co.',
    'Nellore, Andhra Pradesh',
    '524001',
    14.4426,
    79.9865,
    'V',
    true,
    '•••• •••• •••• 7821',
    'ANDB0000456'
),
(
    'a1111111-1111-1111-1111-111111111103',
    'Suresh Reddy',
    'farmer',
    '+91 99890 33445',
    'suresh.r@rayalaseema.in',
    'Rayalaseema Agri Collective',
    'Chittoor, Andhra Pradesh',
    '517001',
    13.2172,
    79.1003,
    'S',
    true,
    '•••• •••• •••• 9923',
    'SBIN0005678'
),
(
    'a1111111-1111-1111-1111-111111111104',
    'Gurpreet Singh',
    'farmer',
    '+91 98140 55667',
    'gurpreet@punjabfpo.com',
    'Punjab Agri Collective FPO',
    'Karnal, Haryana',
    '132001',
    29.6857,
    76.9905,
    'G',
    true,
    '•••• •••• •••• 1120',
    'PUNB0001200'
),
(
    'a1111111-1111-1111-1111-111111111105',
    'Muthuvel Karunanidhi',
    'farmer',
    '+91 94431 88990',
    'muthuvel@cauveryagro.in',
    'Cauvery Delta Farmers Association',
    'Thanjavur, Tamil Nadu',
    '613001',
    10.7870,
    79.1378,
    'M',
    true,
    '•••• •••• •••• 3341',
    'IOBA0000890'
),
(
    'a1111111-1111-1111-1111-111111111106',
    'Basavaraj Patil',
    'farmer',
    '+91 94480 66778',
    'patil@belagavifpo.in',
    'Belagavi Horticulture Growers FPO',
    'Belagavi, Karnataka',
    '590001',
    15.8497,
    74.4977,
    'B',
    true,
    '•••• •••• •••• 6654',
    'CNRB0002345'
),
(
    'a1111111-1111-1111-1111-111111111107',
    'Kishore Deshmukh',
    'farmer',
    '+91 98220 44556',
    'deshmukh@nashikfpo.org',
    'Nashik Onion & Grape Producers',
    'Nashik, Maharashtra',
    '422001',
    19.9975,
    73.7898,
    'K',
    true,
    '•••• •••• •••• 8820',
    'MAHB0000123'
),
(
    'a1111111-1111-1111-1111-111111111108',
    'Manjunath Gowda',
    'farmer',
    '+91 98450 77889',
    'gowda@kolarfpo.in',
    'Kolar Tomato Growers Federation',
    'Kolar, Karnataka',
    '563101',
    13.1367,
    78.1292,
    'M',
    true,
    '•••• •••• •••• 4412',
    'SBIN0040123'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert 10 Verified Buyer & Institutional Profiles
INSERT INTO profiles (id, full_name, role, phone, email, organization, location, pincode, lat, lng, avatar_letter, verified)
VALUES
(
    'b2222222-2222-2222-2222-222222222201',
    'Anita Rao',
    'buyer',
    '+91 97100 88990',
    'anita.r@abcgrand.com',
    'ABC Grand Hotels & Hospitality Group',
    'Thousand Lights, Chennai',
    '600006',
    13.0604,
    80.2496,
    'A',
    true
),
(
    'b2222222-2222-2222-2222-222222222202',
    'Rajesh Mehra',
    'buyer',
    '+91 98110 33441',
    'rajesh@freshchoice.in',
    'FreshChoice Retail Hypermarkets',
    'T Nagar, Chennai',
    '600017',
    13.0418,
    80.2341,
    'R',
    true
),
(
    'b2222222-2222-2222-2222-222222222203',
    'Siddharth Varma',
    'buyer',
    '+91 98860 11992',
    'siddharth@cloudkitchens.io',
    'CureFoods & Cloud Kitchens Hub',
    'Koramangala, Bengaluru',
    '560034',
    12.9352,
    77.6245,
    'S',
    true
),
(
    'b2222222-2222-2222-2222-222222222204',
    'Pooja Nambiar',
    'buyer',
    '+91 94470 55112',
    'pooja@kochicatering.com',
    'Malabar Feast Institutional Catering',
    'Ernakulam, Kochi',
    '682011',
    9.9816,
    76.2999,
    'P',
    true
),
(
    'b2222222-2222-2222-2222-222222222205',
    'Arun Khurana',
    'buyer',
    '+91 98720 99881',
    'arun@delhicentralfoods.in',
    'National Capital Wholesale Produce Co.',
    'Azadpur, New Delhi',
    '110033',
    28.7159,
    77.1772,
    'A',
    true
)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert 3 Logistics Fleet Operators & Hubs
INSERT INTO profiles (id, full_name, role, phone, email, organization, location, pincode, lat, lng, avatar_letter, verified)
VALUES
(
    'h3333333-3333-3333-3333-333333333301',
    'Murugan Swaminathan',
    'hub',
    '+91 98410 44332',
    'logistics@kanchihub.in',
    'Kanchipuram Coordinated Dispatch Hub',
    'Walajabad Road, Kanchipuram',
    '631605',
    12.8120,
    79.8240,
    'M',
    true
),
(
    'h3333333-3333-3333-3333-333333333302',
    'Praveen Kumar',
    'hub',
    '+91 98490 88776',
    'dispatch@nellorehub.in',
    'Andhra Cold-Chain Express Fleet',
    'GT Road, Nellore',
    '524003',
    14.4500,
    79.9900,
    'P',
    true
)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert 10+ Produce Listings (Graded Harvest Batches)
INSERT INTO produce_listings (id, farmer_id, product_name, product_name_hi, category, grade, price_per_kg, buyer_price_per_kg, farmer_realization_per_kg, available_quantity, total_quantity, location, pincode, lat, lng, harvest_date, image_url)
VALUES
(
    'c3333333-3333-3333-3333-333333333301',
    'a1111111-1111-1111-1111-111111111101',
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
    'c3333333-3333-3333-3333-333333333302',
    'a1111111-1111-1111-1111-111111111102',
    'Red Onions (Grade A)',
    'लाल प्याज (ग्रेड A)',
    'Vegetables',
    'A',
    28.00,
    35.00,
    31.50,
    1000.00,
    1500.00,
    'Nellore, Andhra Pradesh',
    '524001',
    14.4426,
    79.9865,
    '2026-08-27',
    '/onion.jpg'
),
(
    'c3333333-3333-3333-3333-333333333303',
    'a1111111-1111-1111-1111-111111111103',
    'Potatoes (Table Grade A)',
    'आलू (टेबल ग्रेड A)',
    'Vegetables',
    'A',
    26.00,
    32.00,
    29.00,
    800.00,
    1200.00,
    'Chittoor, Andhra Pradesh',
    '517001',
    13.2172,
    79.1003,
    '2026-08-29',
    '/potato.jpg'
),
(
    'c3333333-3333-3333-3333-333333333304',
    'a1111111-1111-1111-1111-111111111104',
    'Basmati Rice (Export Grade)',
    'बासमती चावल (निर्यात ग्रेड)',
    'Grains',
    'A',
    62.00,
    72.00,
    67.00,
    2000.00,
    3500.00,
    'Karnal, Haryana',
    '132001',
    29.6857,
    76.9905,
    '2026-08-25',
    '/placeholder.svg'
),
(
    'c3333333-3333-3333-3333-333333333305',
    'a1111111-1111-1111-1111-111111111107',
    'Nashik Red Onions (Export Quality)',
    'नासिक लाल प्याज',
    'Vegetables',
    'A',
    30.00,
    38.00,
    34.00,
    3000.00,
    5000.00,
    'Nashik, Maharashtra',
    '422001',
    19.9975,
    73.7898,
    '2026-08-26',
    '/onion.jpg'
),
(
    'c3333333-3333-3333-3333-333333333306',
    'a1111111-1111-1111-1111-111111111108',
    'Kolar Red Tomatoes (Hotel Grade)',
    'कोलार लाल टमाटर',
    'Vegetables',
    'A',
    31.00,
    39.00,
    35.00,
    1500.00,
    2000.00,
    'Kolar, Karnataka',
    '563101',
    13.1367,
    78.1292,
    '2026-08-29',
    '/tomatoes-market.png'
)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Procurement Centres (Government & FPO Mandi Hubs)
INSERT INTO procurement_centres (id, centre_code, name, name_hi, district, address, pincode, lat, lng, operating_hours, available_slots_today, current_queue_count, avg_wait_time_minutes, now_serving_token, status)
VALUES
(
    'd4444444-4444-4444-4444-444444444401',
    'PROC-CTR-KCH-01',
    'Kanchipuram District Procurement Centre',
    'कांचीपुरम जिला खरीद केंद्र',
    'Kanchipuram',
    'State Highway 58, Near Agricultural Marketing Complex, Kanchipuram',
    '631501',
    12.8342,
    79.7036,
    '08:00 AM – 04:00 PM',
    18,
    8,
    42,
    34,
    'Open'
),
(
    'd4444444-4444-4444-4444-444444444402',
    'PROC-CTR-WLJ-02',
    'Walajabad Regulated Market & QC Hub',
    'वालाजाबाद विनियमित मंडी खरीद केंद्र',
    'Kanchipuram',
    'Mandi Road, Walajabad Taluk',
    '631605',
    12.8120,
    79.8240,
    '07:30 AM – 03:30 PM',
    24,
    4,
    25,
    19,
    'Open'
),
(
    'd4444444-4444-4444-4444-444444444403',
    'PROC-CTR-NLR-03',
    'Nellore Agricultural Marketing Committee Hub',
    'नेल्लोर कृषि विपणन केंद्र',
    'Nellore',
    'Market Yard Road, Nellore Town',
    '524001',
    14.4426,
    79.9865,
    '08:00 AM – 05:00 PM',
    12,
    14,
    58,
    48,
    'Crowded'
)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Procurement Bookings & Live Token Queues (PS 26032)
INSERT INTO procurement_bookings (id, booking_code, centre_id, farmer_id, farmer_name, farmer_phone, token_number, booking_date, time_slot, produce_name, expected_quantity_kg, accepted_quantity_kg, rate_per_kg, payment_amount, payment_status, payment_ref, status, estimated_wait_minutes, farmers_ahead, qr_code_url)
VALUES
(
    'e5555555-5555-5555-5555-555555555501',
    'AGRI-PROC-00421',
    'd4444444-4444-4444-4444-444444444401',
    'a1111111-1111-1111-1111-111111111101',
    'Ramesh Kumar',
    '+91 98401 23456',
    42,
    '2026-08-31',
    '10:30 AM – 11:00 AM',
    'Tomatoes (Grade A)',
    500.00,
    480.00,
    32.00,
    15360.00,
    'Processing',
    'DBT-TN-2026-98122',
    'In Queue',
    42,
    8,
    'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=AGRIHAAT-PROC-TOKEN-42'
),
(
    'e5555555-5555-5555-5555-555555555502',
    'AGRI-PROC-00422',
    'd4444444-4444-4444-4444-444444444402',
    'a1111111-1111-1111-1111-111111111102',
    'Venkatesh Naidu',
    '+91 98480 11223',
    21,
    '2026-08-31',
    '09:00 AM – 09:30 AM',
    'Red Onions (Grade A)',
    1000.00,
    980.00,
    28.00,
    27440.00,
    'Completed',
    'DBT-AP-2026-33910',
    'Payment Completed',
    0,
    0,
    'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=AGRIHAAT-PROC-TOKEN-21'
)
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Orders & Allocations (PS 26033)
INSERT INTO orders (id, order_number, buyer_id, buyer_name, buyer_organization, buyer_phone, delivery_address, delivery_city, delivery_pincode, delivery_lat, delivery_lng, total_quantity_kg, total_buyer_amount, total_logistics_fee, total_platform_fee, total_farmer_payable, payment_status, payment_ref, status, pickup_scheduled_at, estimated_delivery_at)
VALUES
(
    'f6666666-6666-6666-6666-666666666601',
    'AGRI-2026-00421',
    'b2222222-2222-2222-2222-222222222201',
    'Anita Rao',
    'ABC Grand Hotels & Hospitality Group',
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
    'PAY-AGRI-00421',
    'In Transit',
    '2026-08-31 08:30:00+05:30',
    '2026-08-31 11:30:00+05:30'
),
(
    'f6666666-6666-6666-6666-666666666602',
    'AGRI-2026-00422',
    'b2222222-2222-2222-2222-222222222202',
    'Rajesh Mehra',
    'FreshChoice Retail Hypermarkets',
    '+91 98110 33441',
    'Usman Road, T Nagar',
    'Chennai',
    '600017',
    13.0418,
    80.2341,
    2000.00,
    70000.00,
    6000.00,
    2000.00,
    62000.00,
    'COMPLETED',
    'PAY-AGRI-00422',
    'Delivered',
    '2026-08-30 06:00:00+05:30',
    '2026-08-30 10:00:00+05:30'
)
ON CONFLICT (id) DO NOTHING;

-- 8. Insert Order Allocations (Multi-Farm Supply Splits)
INSERT INTO order_allocations (id, order_id, listing_id, farmer_id, farmer_name, fpo_name, allocated_quantity_kg, rate_per_kg, farmer_realization, pickup_location, pickup_pincode, status)
VALUES
(
    'fa111111-1111-1111-1111-111111111101',
    'f6666666-6666-6666-6666-666666666601',
    'c3333333-3333-3333-3333-333333333301',
    'a1111111-1111-1111-1111-111111111101',
    'Ramesh Kumar',
    'ABC FPO',
    250.00,
    32.00,
    36.00,
    'Kanchipuram, Tamil Nadu',
    '631501',
    'Picked Up'
),
(
    'fa111111-1111-1111-1111-111111111102',
    'f6666666-6666-6666-6666-666666666601',
    'c3333333-3333-3333-3333-333333333306',
    'a1111111-1111-1111-1111-111111111108',
    'Manjunath Gowda',
    'Kolar Tomato Growers Federation',
    250.00,
    31.00,
    35.00,
    'Kolar, Karnataka',
    '563101',
    'Picked Up'
)
ON CONFLICT (id) DO NOTHING;

-- 9. Insert Logistics Routes
INSERT INTO logistics_routes (id, route_code, carrier_name, vehicle_number, driver_name, driver_phone, total_distance_km, distance_saved_km, estimated_duration, total_weight_kg, capacity_kg, status, reefer_temperature_celsius)
VALUES
(
    'g7777777-7777-7777-7777-777777777701',
    'ROUTE-TN-KCH-CHN-01',
    'Tamil Nadu Agri Express Reefer',
    'TN-21-CA-4891',
    'Selvam Pillai',
    '+91 94440 12890',
    124.00,
    18.00,
    '4h 20m',
    500.00,
    3000.00,
    'In Transit',
    14.2
),
(
    'g7777777-7777-7777-7777-777777777702',
    'ROUTE-AP-NLR-CHN-02',
    'Andhra Fresh Freight Liner',
    'AP-26-TG-1102',
    'Raja Shekar',
    '+91 98481 99001',
    178.00,
    24.00,
    '5h 15m',
    2000.00,
    5000.00,
    'Delivered',
    12.8
)
ON CONFLICT (id) DO NOTHING;

-- 10. Insert Demand Forecasts
INSERT INTO demand_forecasts (id, product_name, region, forecast_period, expected_demand_kg, change_percent, confidence_percent, recommendation, recommendation_hi, factors)
VALUES
(
    'h8888888-8888-8888-8888-888888888801',
    'Tomatoes',
    'Chennai',
    'Next 7 Days',
    18400.00,
    12.00,
    87,
    'Increase tomato aggregation from Kanchipuram FPOs before Friday morning peak.',
    'सप्ताहांत की मांग के लिए नजदीकी FPOs से टमाटर संग्रह बढ़ाएं।',
    '{"festival_demand": "High", "weather_condition": "Clear", "hotel_orders": "+15%"}'::jsonb
),
(
    'h8888888-8888-8888-8888-888888888802',
    'Red Onions',
    'Bengaluru',
    'Next 7 Days',
    24500.00,
    8.50,
    91,
    'Stable demand across retail supermarket chains. Target gate price ₹28–31/kg.',
    'खुदरा सुपरमार्केट श्रृंखलाओं में स्थिर मांग।',
    '{"mandi_inflow": "Normal", "transport_availability": "Good"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 11. Insert System Notifications
INSERT INTO notifications (id, user_id, title, title_hi, message, message_hi, category, read, link)
VALUES
(
    'n9999999-9999-9999-9999-999999999901',
    'a1111111-1111-1111-1111-111111111101',
    'Order Dispatched: 500 kg Tomatoes',
    'ऑर्डर डिस्पैच हुआ: 500 किलो टमाटर',
    'Reefer Truck TN-21-CA-4891 has departed Kanchipuram Hub for Chennai Kitchens.',
    'रीफर ट्रक TN-21-CA-4891 कांचीपुरम से चेन्नई के लिए रवाना हुआ।',
    'ORDER',
    false,
    '/farmer/orders/FM-2026-00421'
),
(
    'n9999999-9999-9999-9999-999999999902',
    'a1111111-1111-1111-1111-111111111101',
    'Procurement Slot Reminder: Token #42',
    'खरीद केंद्र टोकन #42 रिमाइंडर',
    'Your slot at Kanchipuram Centre is scheduled for tomorrow at 10:30 AM.',
    'कांचीपुरम केंद्र पर आपका स्लॉट कल सुबह 10:30 बजे निर्धारित है।',
    'PROCUREMENT',
    false,
    '/farmer/procurement/FM-PROC-00421'
),
(
    'n9999999-9999-9999-9999-999999999903',
    'a1111111-1111-1111-1111-111111111101',
    'DBT Payment Settled: ₹15,360',
    'DBT भुगतान जमा हुआ: ₹15,360',
    'Direct Benefit Transfer credited to Account •••• 4892 (Ref: DBT-TN-2026-98122).',
    'आपके बैंक खाते में ₹15,360 जमा किए गए।',
    'PAYMENT',
    true,
    '/farmer/earnings'
)
ON CONFLICT (id) DO NOTHING;
