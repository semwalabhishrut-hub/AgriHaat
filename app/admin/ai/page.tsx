"use client";

import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Cpu,
  Zap,
  CheckCircle2,
  BrainCircuit,
  BarChart3,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage } from "@/components/site/language-context";

const FORECASTS = [
  { crop: "Tomatoes", region: "Chennai Urban Kitchens", period: "Next 7 Days", demand: "18,400 kg", trend: "+12%", confidence: 87, factor: "Restaurant peak + Wedding season" },
  { crop: "Red Onions", region: "Bengaluru Retailers", period: "Next 7 Days", demand: "24,500 kg", trend: "+8.5%", confidence: 91, factor: "Stable retail consumption" },
  { crop: "Potatoes", region: "Hyderabad Food Processors", period: "Next 14 Days", demand: "32,000 kg", trend: "+5.2%", confidence: 89, factor: "Processing chips manufacturing" },
  { crop: "Basmati Rice", region: "Delhi NCR Institutions", period: "Next 30 Days", demand: "85,000 kg", trend: "+14%", confidence: 94, factor: "Catering contracts & hostel intake" },
];

export default function AdminAIPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
                AI & MACHINE LEARNING MODELS
              </span>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-[#16803A]">
                Gemini 2.5 Flash
              </span>
            </div>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
              Agricultural Demand Forecasting & Price Recommender
            </h1>
            <p className="text-xs text-[#687D6B]">
              Real-time mathematical factors, confidence intervals, and consumption trend modeling.
            </p>
          </div>
        </div>

        {/* AI System Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">Active AI Provider</span>
            <p className="text-xl font-bold text-[#172019] mt-1 flex items-center gap-2">
              <Sparkles className="size-4 text-[#16803A]" /> Google Gemini 2.5
            </p>
            <p className="text-[11px] text-[#16803A] mt-1 font-semibold">Grounded Mandi Context</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">Model Inference Latency</span>
            <p className="text-xl font-bold text-[#16803A] mt-1">240 ms</p>
            <p className="text-[11px] text-[#687D6B] mt-1">Edge Serverless Routes</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">Prediction Accuracy</span>
            <p className="text-xl font-bold text-[#172019] mt-1">89.4%</p>
            <p className="text-[11px] text-[#16803A] mt-1">Validated against APMC bids</p>
          </div>
        </div>

        {/* Forecast Table */}
        <div className="rounded-3xl border border-[#E2E7E2] bg-white overflow-hidden shadow-xs">
          <div className="p-4 border-b border-[#E2E7E2] bg-[#FAFAF7]">
            <h3 className="font-serif text-sm font-bold text-[#172019]">
              Regional Commodity Demand Projections
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAF7] border-b border-[#E2E7E2] text-[#687D6B]">
                <tr>
                  <th className="p-4 font-semibold">Commodity & Horizon</th>
                  <th className="p-4 font-semibold">Target Consumer Region</th>
                  <th className="p-4 font-semibold">Expected Volume</th>
                  <th className="p-4 font-semibold">Trend</th>
                  <th className="p-4 font-semibold">Confidence</th>
                  <th className="p-4 font-semibold">Primary Key Driver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7E2]">
                {FORECASTS.map((f, i) => (
                  <tr key={i} className="hover:bg-[#FAFAF7] transition">
                    <td className="p-4 font-bold text-[#172019]">
                      <p>{f.crop}</p>
                      <p className="text-[11px] font-normal text-[#687D6B]">{f.period}</p>
                    </td>
                    <td className="p-4 text-[#172019]">{f.region}</td>
                    <td className="p-4 font-bold text-[#172019]">{f.demand}</td>
                    <td className="p-4 font-bold text-[#16803A]">{f.trend}</td>
                    <td className="p-4">
                      <span className="rounded-md bg-[#EEF7EF] px-2 py-0.5 font-bold text-[#16803A]">
                        {f.confidence}%
                      </span>
                    </td>
                    <td className="p-4 text-[#687D6B]">{f.factor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
