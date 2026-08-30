"use client";

import { useState } from "react";
import { Search, Filter, ArrowRight, TrendingUp, Sparkles, MapPin, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage, rupees } from "@/components/site/language-context";
import { PillTabs } from "./pill-tabs";
import { ScrollReveal } from "./scroll-reveal";
import { demandForecast, farmerRealization, routeData } from "@/lib/demo-data";

type TabId = "listings" | "forecast" | "prices" | "logistics";

export function ProductTabs() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>("listings");

  const tabs: { id: TabId; label: string }[] = [
    { id: "listings", label: t.listings },
    { id: "forecast", label: t.demand },
    { id: "prices", label: t.prices },
    { id: "logistics", label: t.logisticsTab },
  ];

  return (
    <section id="how-it-works" className="border-t border-[#E2E7E2] bg-[#FAFAF7] py-20 lg:py-28">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16803A]">
              PRODUCT SHOWCASE
            </span>
            <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#172019] sm:text-4xl">
              One unified platform across the entire supply chain.
            </h2>
            <p className="mt-3 text-sm text-[#687D6B] sm:text-base">
              Explore how farmers list produce, track demand outlook, inspect fair pricing, and coordinate aggregated pickups.
            </p>
          </ScrollReveal>

          {/* Interactive Pill Tabs */}
          <div className="mt-8 flex justify-center">
            <PillTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        {/* Tab Content Box */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-sm sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left: UI Simulation */}
            <div className="lg:col-span-7">
              {activeTab === "listings" && <ListingsTabPreview />}
              {activeTab === "forecast" && <ForecastTabPreview />}
              {activeTab === "prices" && <PricesTabPreview />}
              {activeTab === "logistics" && <LogisticsTabPreview />}
            </div>

            {/* Right: Editorial Description */}
            <div className="lg:col-span-5">
              {activeTab === "listings" && (
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16803A]">
                    PRODUCE DISCOVERY
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#172019]">
                    Verified farm listings, filtered for your exact need.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#687D6B]">
                    Buyers can filter by harvest date, grade, location and batch quantity. All farm listings are verified to avoid stockouts and quality disputes.
                  </p>
                  <ul className="space-y-2 pt-2 text-xs text-[#172019]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Direct farm gate price without trading markups
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Batch quality grades A, B, Bulk verified
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Full FPO origin transparency
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "forecast" && (
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16803A]">
                    DEMAND INTELLIGENCE
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#172019]">
                    Plan harvests based on actual regional consumption.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#687D6B]">
                    Farm2Market analyzes regional buyer order patterns to project demand 7–14 days ahead, guiding farmers on when to harvest and aggregate.
                  </p>
                  <ul className="space-y-2 pt-2 text-xs text-[#172019]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Regional 7-day demand forecasts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Actionable harvest & aggregation tips
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Clear prototype confidence metrics
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "prices" && (
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16803A]">
                    PRICE TRANSPARENCY
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#172019]">
                    Every rupee accounted for, before you accept.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#687D6B]">
                    No hidden deductions. Farmers see the full arithmetic: buyer offer minus explicit logistics and minimal platform fee.
                  </p>
                  <ul className="space-y-2 pt-2 text-xs text-[#172019]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Transparent fee breakdown
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Comparison with nearby mandi benchmarks
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Guaranteed direct payout to farmer account
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === "logistics" && (
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16803A]">
                    COORDINATED LOGISTICS
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#172019]">
                    Multi-farm pickup in a single optimized route.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#687D6B]">
                    Instead of sending three half-empty trucks, our routing engine clusters nearby pickups and routes directly to the buyer or collection hub.
                  </p>
                  <ul className="space-y-2 pt-2 text-xs text-[#172019]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Multi-stop route optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Reduced transport cost per kilogram
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-[#16803A]" /> Real-time order dispatch tracking
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tab Sub-Views ───

function ListingsTabPreview() {
  const { t } = useLanguage();
  return (
    <div className="rounded-2xl border border-[#E2E7E2] bg-[#FAFAF7] p-5 shadow-xs">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-[#E2E7E2] bg-white px-3 py-2 text-xs text-[#687D6B]">
          <Search className="size-3.5" />
          <span>{t.searchProduce}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-lg border border-[#E2E7E2] bg-white px-2.5 py-1.5 font-medium text-[#172019]">
            📍 Kanchipuram
          </span>
          <span className="rounded-lg border border-[#E2E7E2] bg-white px-2.5 py-1.5 font-medium text-[#172019]">
            Grade A
          </span>
        </div>
      </div>

      {/* Listing Rows */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-[#E2E7E2] bg-white p-3.5">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[#EEF7EF] p-1">
              <img src="/tomatoes-market.png" alt="" className="h-full w-full object-cover rounded" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#172019]">Tomatoes · Grade A</p>
              <p className="text-[11px] text-[#687D6B]">ABC FPO · 500 kg available</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-[#16803A]">₹32/kg</p>
            <span className="text-[10px] text-[#687D6B]">Kanchipuram</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#E2E7E2] bg-white p-3.5">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-[#EEF7EF] p-1">
              <img src="/onion.jpg" alt="" className="h-full w-full object-cover rounded" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#172019]">Red Onions · Grade A</p>
              <p className="text-[11px] text-[#687D6B]">GreenFields FPO · 1,000 kg</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-[#16803A]">₹28/kg</p>
            <span className="text-[10px] text-[#687D6B]">Nellore</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForecastTabPreview() {
  const { t } = useLanguage();
  return (
    <div className="rounded-2xl border border-[#E2E7E2] bg-[#FAFAF7] p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#16803A]">
          {t.demandOutlook}
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold text-[#16803A]">
          <TrendingUp className="size-3.5" /> +12% next 7 days
        </span>
      </div>
      <div className="mt-4">
        <p className="text-xs text-[#687D6B]">Tomato · Chennai Metro</p>
        <p className="text-2xl font-bold text-[#172019]">18,400 kg</p>
      </div>
      <div className="mt-4 rounded-xl border border-[#16803A]/20 bg-[#EEF7EF] p-3 text-xs text-[#172019]">
        <span className="font-semibold text-[#16803A]">Recommendation:</span> Increase tomato aggregation from nearby FPOs before weekend peak demand.
      </div>
      <p className="mt-3 text-[10px] text-right text-[#687D6B]">Confidence: 87% · Prototype forecast</p>
    </div>
  );
}

function PricesTabPreview() {
  return (
    <div className="rounded-2xl border border-[#E2E7E2] bg-[#FAFAF7] p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-3 text-xs">
        <span className="font-bold text-[#172019]">Fair Price Breakdown</span>
        <span className="text-[#687D6B]">Illustrative demo data</span>
      </div>
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-[#687D6B]">Buyer price</span>
          <span className="font-semibold text-[#172019]">₹40/kg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#687D6B]">Logistics</span>
          <span className="font-medium text-[#dc2626]">−₹3/kg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#687D6B]">Platform fee</span>
          <span className="font-medium text-[#dc2626]">−₹1/kg</span>
        </div>
        <div className="flex justify-between border-t border-[#E2E7E2] pt-2 text-sm font-bold text-[#16803A]">
          <span>Farmer realization</span>
          <span>₹36/kg</span>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-white p-2.5 border border-[#E2E7E2] text-[11px] text-[#687D6B] text-center">
        Nearby listing range: <strong className="text-[#172019]">₹30 – ₹34/kg</strong>
      </div>
    </div>
  );
}

function LogisticsTabPreview() {
  return (
    <div className="rounded-2xl border border-[#E2E7E2] bg-[#FAFAF7] p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-3 text-xs">
        <span className="font-bold text-[#172019]">Aggregated Route Planner</span>
        <span className="font-semibold text-[#16803A]">124 km · 4h 20m</span>
      </div>
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center gap-2 rounded-lg bg-white p-2 border border-[#E2E7E2]">
          <span className="size-2 rounded-full bg-[#16803A]" />
          <span className="flex-1 font-medium text-[#172019]">Farmer A (Kanchipuram)</span>
          <span className="text-[#687D6B]">250 kg</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white p-2 border border-[#E2E7E2]">
          <span className="size-2 rounded-full bg-[#16803A]" />
          <span className="flex-1 font-medium text-[#172019]">Farmer B (Walajabad)</span>
          <span className="text-[#687D6B]">180 kg</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[#EEF7EF] p-2 border border-[#16803A]/20">
          <Truck className="size-3.5 text-[#16803A]" />
          <span className="flex-1 font-medium text-[#16803A]">Collection Hub (430 kg combined)</span>
          <span className="font-semibold text-[#16803A]">Aggregated</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white p-2 border border-[#E2E7E2]">
          <MapPin className="size-3.5 text-[#172019]" />
          <span className="flex-1 font-medium text-[#172019]">Chennai Buyer Delivery</span>
          <span className="text-[#172019] font-semibold">430 kg</span>
        </div>
      </div>
    </div>
  );
}
