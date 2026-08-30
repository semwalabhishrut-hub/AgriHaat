# AgriHaat AI — External API & Services Setup Guide

This document provides exact instructions and environment variables to connect real third-party backend and AI services to **AgriHaat AI**.

> [!NOTE]
> The application is completely functional out-of-the-box using the built-in **Service Abstraction Layer** (`lib/services/`). Adding external API keys will automatically promote mock providers to production services without requiring any UI changes.

---

## 1. Environment Variables Overview (`.env.local`)

Create a `.env.local` file in the root of the project:

```bash
# ─── 1. SUPABASE (PostgreSQL + Auth + Storage) ───
NEXT_PUBLIC_SUPABASE_URL=https://oukoidwiwtdckkatmpbv.supabase.co
DATABASE_URL=postgresql://postgres.oukoidwiwtdckkatmpbv:[YOUR-PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres
SUPABASE_HOST=aws-0-ap-northeast-2.pooler.supabase.com
SUPABASE_PORT=5432
SUPABASE_DB=postgres
SUPABASE_USER=postgres.oukoidwiwtdckkatmpbv

# ─── 2. GOOGLE GEMINI API (Generative AI Market Insights) ───
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash-lite

# ─── 3. PAYMENT GATEWAY (DEMO SANDBOX) ───
NEXT_PUBLIC_PAYMENT_MODE=demo
```

---

## 2. Supabase Database Schema Execution (1-Click Setup)

To create all tables, columns, relations, and demo records in Supabase:

1. Log in to your [Supabase Project Dashboard](https://supabase.com/dashboard/project/oukoidwiwtdckkatmpbv).
2. On the left navigation sidebar, click on **SQL Editor** (icon with `>_`).
3. Click **+ New query**.
4. Open the provided file [`supabase_schema.sql`](file:///E:/SIH/FARM2MARKET%20AI/supabase_schema.sql), copy the entire SQL script, and paste it into the editor.
5. Click **Run** (or press `Ctrl+Enter`).
6. Supabase will immediately create all 10 core tables:
   - `profiles`
   - `produce_listings`
   - `orders`
   - `order_allocations`
   - `procurement_centres`
   - `procurement_bookings`
   - `logistics_routes`
   - `demand_forecasts`
   - `notifications`
   - `audit_logs`
   along with all Row Level Security (RLS) policies and seed records!

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
