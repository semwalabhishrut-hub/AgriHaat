"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Info,
  DollarSign,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage, rupees } from "@/components/site/language-context";

const PRICE_BENCHMARKS = [
  {
    crop: "Tomatoes",
    cropHi: "टमाटर",
    location: "Kanchipuram & Chengalpattu",
    mandiRange: "₹30 – ₹34/kg",
    demandLevel: "High (+12%)",
    supplyLevel: "Moderate",
    suggestedListing: "₹32/kg",
    farmerRealization: "₹36/kg",
    recommendation: "List Grade A lots before Friday morning",
  },
  {
    crop: "Red Onions",
    cropHi: "लाल प्याज",
    location: "Nellore, AP",
    mandiRange: "₹26 – ₹30/kg",
    demandLevel: "Steady (+4%)",
    supplyLevel: "High Inflow",
    suggestedListing: "₹28/kg",
    farmerRealization: "₹31.5/kg",
    recommendation: "Consolidate into 1000 kg FPO batches",
  },
  {
    crop: "Potatoes",
    cropHi: "आलू",
    location: "Chittoor, AP",
    mandiRange: "₹24 – ₹28/kg",
    demandLevel: "Moderate (+2%)",
    supplyLevel: "Steady",
    suggestedListing: "₹26/kg",
    farmerRealization: "₹28.5/kg",
    recommendation: "Hold Grade B inventory in cold store",
  },
  {
    crop: "Basmati Rice",
    cropHi: "बासमती चावल",
    location: "Karnal, Haryana",
    mandiRange: "₹58 – ₹66/kg",
    demandLevel: "High Export (+8%)",
    supplyLevel: "Moderate",
    suggestedListing: "₹62/kg",
    farmerRealization: "₹69/kg",
    recommendation: "Target commercial hotel bulk procurements",
  },
];

export default function PriceIntelligencePage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            {lang === "hi" ? "मूल्य बुद्धिमत्ता व मंडी तुलना" : "REAL-TIME PRICE INTELLIGENCE"}
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            {lang === "hi" ? "मंडी मूल्य व किसान प्राप्ति गाइड" : "Fair Price Intelligence & Mandi Benchmarks"}
          </h1>
          <p className="text-xs text-[#687D6B]">
            {lang === "hi"
              ? "पारदर्शी मूल्य निर्धारण — मंडी बिचौलियों की तुलना में 18–25% अधिक किसान प्राप्ति।"
              : "Compare live regional mandi bids against direct buyer realization with zero broker cuts."}
          </p>
        </div>
      </div>

      {/* Price Table */}
      <div className="mt-8 rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
          <h3 className="font-serif text-lg font-bold text-[#172019]">
            Regional Crop Pricing Benchmarks (Direct vs Mandi)
          </h3>
          <span className="text-[11px] italic text-[#687D6B]">Illustrative prototype benchmarks</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E7E2] text-[#687D6B]">
                <th className="pb-3 font-semibold">Crop Variety</th>
                <th className="pb-3 font-semibold">Production Region</th>
                <th className="pb-3 font-semibold">Current Mandi Bid</th>
                <th className="pb-3 font-semibold">Demand / Supply</th>
                <th className="pb-3 font-semibold">Suggested Farm Gate</th>
                <th className="pb-3 font-semibold text-right">Farmer Net Realization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7E2]">
              {PRICE_BENCHMARKS.map((b, i) => (
                <tr key={i} className="hover:bg-[#FAFAF7] transition">
                  <td className="py-3.5 font-bold text-[#172019]">
                    {lang === "hi" ? b.cropHi : b.crop}
                  </td>
                  <td className="text-[#687D6B]">{b.location}</td>
                  <td className="font-mono text-[#172019]">{b.mandiRange}</td>
                  <td>
                    <span className="rounded bg-[#EEF7EF] px-2 py-0.5 text-[11px] font-bold text-[#16803A]">
                      {b.demandLevel}
                    </span>
                  </td>
                  <td className="font-bold text-[#172019]">{b.suggestedListing}</td>
                  <td className="text-right font-bold text-sm text-[#16803A]">
                    {b.farmerRealization}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
