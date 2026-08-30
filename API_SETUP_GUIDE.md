# Farm2Market AI — External API & Services Setup Guide

This document provides exact instructions and environment variables to connect real third-party backend and AI services to **Farm2Market AI**.

> [!NOTE]
> The application is completely functional out-of-the-box using the built-in **Service Abstraction Layer** (`lib/services/`). Adding external API keys will automatically promote mock providers to production services without requiring any UI changes.

---

## 1. Environment Variables Overview (`.env.local`)

Create a `.env.local` file in the root of the project:

```bash
# ─── 1. SUPABASE (PostgreSQL + Auth + Storage) ───
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# ─── 2. GOOGLE GEMINI API (Generative AI Market Insights) ───
GEMINI_API_KEY=AIzaSy...

# ─── 3. GOOGLE MAPS PLATFORM (Routing & Geocoding) ───
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
GOOGLE_MAPS_SERVER_KEY=AIzaSy...

# ─── 4. PAYMENT GATEWAY SANDBOX (Razorpay / Stripe) ───
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

---

## 2. Supabase Integration (Database & Auth)

1. Go to [https://supabase.com](https://supabase.com) and create a free project.
2. Under **Project Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`
3. Under **SQL Editor**, run the database schema defined in `ARCHITECTURE.md` (§3 Core Tables):
   - Tables: `profiles`, `produce_listings`, `orders`, `order_allocations`, `procurement_centres`, `procurement_bookings`, `logistics_routes`, `demand_forecasts`, `notifications`, `audit_logs`.
4. Enable **Row Level Security (RLS)**:
   - Farmers can read/write their own listings.
   - Buyers can read active listings and manage their own orders.

---

## 3. Google Gemini API (AI Copilot & Natural Language Explanations)

1. Go to [https://aistudio.google.com](https://aistudio.google.com) and create an API Key.
2. Add the key to `.env.local`:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. The API route in `app/api/ai/chat/route.ts` will automatically use Gemini 1.5 Flash / Gemini 2.0 Flash for natural-language contextualization over structured mathematical forecast outputs.

---

## 4. Google Maps Platform (Routing & Live Geocoding)

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the following APIs:
   - **Maps JavaScript API**
   - **Directions API**
   - **Distance Matrix API**
   - **Geocoding API**
3. Generate an API Key, restrict it to your domain or HTTP referrers, and add to `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key_here
   ```
4. `components/logistics/route-map.tsx` will switch from `MockMapProvider` to `GoogleMapProvider` with real dynamic polyline rendering.

---

## 5. Payment Gateway Sandbox (DBT & Direct Disbursals)

1. For Indian rupee transactions and simulated DBT disbursal, sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Switch to **Test Mode** and copy your Key ID and Key Secret.
3. Order checkout and DBT payout triggers will execute against test webhook endpoints.
