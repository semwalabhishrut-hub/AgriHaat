# 🌾 AgriHaat AI — Official Technical Architecture & SIH Round 1 Guide
**Smart India Hackathon (SIH) Presentation & System Dossier**  
*Problem Statement IDs: 26033 & 26032 | Ministry of Consumer Affairs, Food & Public Distribution*

---

## 📌 Executive Summary

**AgriHaat AI** is a production-ready, full-stack agricultural operating system engineered to solve the two biggest structural bottlenecks in India’s agricultural supply chain:
1. **Problem Statement #26033**: *Multiple intermediaries reduce farmers' earnings and inflate consumer prices.*  
   ➡️ **Our Solution**: Direct farm-to-buyer marketplace with transparent price realization breakdown, multi-farm supply aggregation, and automated multi-stop logistics routing.
2. **Problem Statement #26032**: *Procurement Centre Slot Booking, Queue Management & Wait-Time Minimization.*  
   ➡️ **Our Solution**: Dynamic digital token booking system with real-time queue wait-time estimation, QR check-in, automated QC grading, and direct DBT settlement verification.

---

## 🏗️ 1. Technical Stack & Architecture

| Layer | Technology | Rationale & Production Purpose |
|---|---|---|
| **Frontend Framework** | **Next.js 16 (App Router + Turbopack)** | Server-side rendering (SSR), high-performance static generation, micro-animations, and fast page loads across 36 responsive routes. |
| **Language** | **TypeScript 5.x** | End-to-end type safety, strict interface contracts for marketplace orders, route coordinates, and billing items. |
| **Styling & Design System** | **Tailwind CSS + Vanilla CSS Tokens** | Custom agricultural palette (`#16803A` Forest Green, `#FAFAF7` Warm White, `#172019` Deep Charcoal), mobile-first responsive bottom navigation, and accessible typography. |
| **Generative AI** | **Google Gemini 2.5 Flash API** | Grounded agricultural conversational AI, natural-language price insights, multilingual Hindi/English support, and mandi trend summarization. |
| **Mapping & Geospatial** | **Leaflet + OpenStreetMap** | Real-time GPS driver commute tracking, multi-stop pickup routing between farm clusters (Kanchipuram, Walajabad) and urban kitchens (Chennai). |
| **Database & Auth** | **Supabase (PostgreSQL 15)** | Relational data integrity, Row Level Security (RLS) policies, JSONB demand factor indexing, and sub-second query performance. |
| **Bilingual Localization** | **Native React Context Provider** | Instant 1-click toggle between English and Hindi across all navigation, cards, tables, and AI insights. |

---

## 🔄 2. End-to-End Workflow Architecture

```
[ Farmer / FPO ] ──( 1. Create Graded Batch )──> [ AgriHaat Marketplace ]
                                                            │
[ Institutional Buyer ] ──( 2. Place Bulk Order )──────────┤
                                                            ▼
[ AI Aggregation Engine ] ◄──( 3. Match 3+ Cluster Farms )──┘
        │
        ├──( 4. Multi-Stop Route Optimizer )──> [ Logistics Reefer Truck ]
        │                                                │
        │                                         ( 5. Live GPS Telemetry )
        │                                                ▼
        ├──( 6. Direct Delivery & Inspection )──> [ Buyer Kitchen ]
        │                                                │
        └──( 7. Instant DBT Escrow Settlement )──> [ Farmer Bank Account ]
```

---

## 💰 3. Mathematical Models & Price Transparency (PS 26033)

Traditional agricultural chains deduct 30%–45% across local brokers, loading agents, commission agents (*arhtiyas*), secondary wholesalers, and urban retailers.

### AgriHaat Direct Realization Formula:
$$\text{Farmer Net Realization} = \text{Buyer Gross Price} - (\text{Logistics Fee} + \text{Platform Fee})$$

#### Realistic Tomato Example:
- **Buyer Price**: ₹40.00 / kg
- **Coordinated Logistics**: −₹3.00 / kg
- **AgriHaat Platform Fee**: −₹1.00 / kg
- **Farmer Take-Home**: **₹36.00 / kg** (vs. ₹26.00–₹28.00 / kg in traditional APMC mandis = **+25% to +38% higher earnings**).

---

## ⏱️ 4. Procurement Centre Queue Management (PS 26032)

AgriHaat provides a structured digital queue for government procurement centres (*Kanchipuram, Walajabad, Nellore*):

1. **Digital Slot Booking**: Farmer reserves a 30-minute time window via mobile web app.
2. **Instant QR Token (#42)**: System generates a cryptographically signed QR code.
3. **Queue Wait-Time Formula**:
   $$\text{Estimated Wait (minutes)} = (\text{Tokens Ahead}) \times (\text{Avg QC Duration per Farmer}) = 8 \times 5.25\text{ min} = 42\text{ minutes}$$
4. **Automated Weighing & QC**: Direct digital capture of accepted quantity (e.g., 480 kg out of 500 kg).
5. **Direct Benefit Transfer (DBT)**: Instant payment processing trigger directly to linked Aadhaar/bank account (`Ref: DBT-TN-2026-98122`).

---

## 🤖 5. Google Gemini AI Integration Architecture

### Endpoint: `/api/ai/chat` (POST)
- **Model**: `gemini-2.5-flash-lite`
- **System Grounding**: Grounded platform context containing live regional demand trends, price benchmarks, logistics routes, and procurement queue statistics.
- **Multilingual Support**: Detects Hindi/Hinglish queries and returns natural, culturally resonant agricultural advice.

```json
{
  "message": "Chennai mein agle 7 din mein tomato demand kaisi hai?",
  "lang": "hi"
}
```
**AI Response**:
> *"चेन्नई में अगले 7 दिनों में टमाटर की अपेक्षित मांग 18,400 किलो है (+12% वृद्धि)। रेस्टोरेंट मांग के अनुसार ₹32–34/किलो लिस्टिंग रेट पर शुक्रवार सुबह से पहले डिस्पैच करने की सलाह दी जाती है।"*

---

## 🗺️ 6. Interactive Multi-Stop Map & GPS Telemetry

- **Route**: Kanchipuram (Farmer A: 250 kg) ➔ Walajabad (Farmer B: 180 kg) ➔ Collection Hub (430 kg) ➔ Chennai Buyer Kitchen.
- **Telemetry**: Live 48 km/h simulated speed, live temperature reefer monitoring (+14.2°C), distance savings calculation (18 km / 14.5% fuel saved).
- **Pincode Engine**: Instant lookup for agricultural clusters (`631501`, `631605`, `600006`, `524001`).

---

## 🗄️ 7. Database Schema (Supabase PostgreSQL)

The platform is backed by 10 normalized relational tables with Row Level Security (RLS):
1. `profiles` (UUID, role, organization, bank details, DBT link status)
2. `produce_listings` (crop, grade, price arithmetic, harvest date, location coordinates, custom photos)
3. `orders` (order number, buyer details, delivery coordinates, pricing breakdown, status)
4. `order_allocations` (multi-farm supply matching splits)
5. `procurement_centres` (centre code, district, slots today, current token, wait times)
6. `procurement_bookings` (token #42, QR code URL, QC status, DBT reference)
7. `logistics_routes` (vehicle number, driver phone, distance saved, reefer temperature)
8. `demand_forecasts` (expected demand kg, confidence %, JSONB factors)
9. `notifications` (multilingual alerts for orders, slots, and DBT payments)
10. `audit_logs` (immutable event log for government & central admin oversight)

---

## 🎤 8. SIH Round 1 Live Demo Script (3-Minute Pitch)

| Time | Action | What to Say / Show |
|---|---|---|
| **0:00 – 0:45** | Landing Page (`/`) | Introduce **AgriHaat AI**. Highlight PS 26033 problem: intermediaries taking 40% margin. Show transparent price breakdown card and bilingual Hindi toggle. |
| **0:45 – 1:30** | Farmer Portal (`/farmer/produce/new` & `/marketplace`) | Demonstrate listing 500 kg Tomatoes with live camera capture. Show how 3 nearby farmers are automatically aggregated to fulfill a 2,000 kg order. |
| **1:30 – 2:15** | Logistics & Live GPS Map (`/logistics`) | Show the Leaflet map with custom status pins (Farmer A, Farmer B, Hub, Buyer) and live moving driver telemetry saving 18 km. |
| **2:15 – 2:45** | Procurement Queue (`/farmer/procurement`) | Demonstrate PS 26032 solution: Token #42 QR code pass, live queue wait-time countdown (42 mins), and automated DBT payment settlement. |
| **2:45 – 3:00** | Gemini AI Copilot (Floating Modal) | Click "Ask AI", ask mandi demand in Hindi, show instant Google Gemini intelligence response. Conclude with impact metrics. |

---
*AgriHaat AI — Direct Roots. Stronger Tomorrow.*
