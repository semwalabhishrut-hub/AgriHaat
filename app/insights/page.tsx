"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  Info,
  Database,
  Calendar,
  ShieldCheck,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { INITIAL_DEMAND_FORECAST } from "@/lib/store";
import { ExplainabilityModal } from "@/components/ai/explainability-modal";
import { AIAssistantModal } from "@/components/ai/ai-assistant-modal";
import { useLanguage, rupees } from "@/components/site/language-context";

export default function InsightsPage() {
  const { lang } = useLanguage();
  const [explainOpen, setExplainOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  const forecast = INITIAL_DEMAND_FORECAST;

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            {lang === "hi" ? "AI मांग पूर्वानुमान व अंतर्दृष्टि" : "AI DEMAND INTELLIGENCE & FORECASTING"}
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            {lang === "hi" ? "व्याख्यात्मक AI मांग दृष्टिकोण" : "Explainable Demand Outlook"}
          </h1>
          <p className="text-xs text-[#687D6B]">
            {lang === "hi"
              ? "मंडी आवक, खरीदार मांगों और मौसमी रुझानों पर आधारित स्पष्ट मांग पूर्वानुमान।"
              : "Transparent mathematical forecast tied to verified buyer requisitions, historical cycles, and mandi inflows."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAiAssistantOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-[#16803A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
          >
            <Sparkles className="size-3.5" />
            {lang === "hi" ? "AI से सवाल पूछें" : "Ask Market Questions"}
          </button>
        </div>
      </div>

      {/* Main Forecast Hero Card */}
      <div className="mt-8 rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E2E7E2] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#16803A] animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
                ACTIVE PROTOTYPE FORECAST ENGINE
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#172019] mt-1">
              {forecast.productName} · {forecast.region}
            </h2>
            <p className="text-xs text-[#687D6B] mt-0.5">
              Forecast Period: {forecast.forecastPeriod} · Evaluated: 28 Aug 2026
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-2xl border border-[#16803A]/20 bg-[#EEF7EF] px-4 py-2.5 text-xs font-bold text-[#16803A]">
              <TrendingUp className="size-4 inline mr-1" /> +{forecast.changePercent}% Expected Inflow
            </span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-[#FAFAF7] p-4 border border-[#E2E7E2]">
            <span className="text-xs text-[#687D6B]">Expected Metro Demand</span>
            <p className="mt-1 text-3xl font-bold text-[#172019]">
              {forecast.expectedDemandKg.toLocaleString("en-IN")}{" "}
              <span className="text-sm font-normal text-[#687D6B]">kg</span>
            </p>
            <p className="mt-1 text-[11px] text-[#16803A] font-semibold">+1,950 kg vs last week</p>
          </div>

          <div className="rounded-2xl bg-[#FAFAF7] p-4 border border-[#E2E7E2]">
            <span className="text-xs text-[#687D6B]">Model Confidence Score</span>
            <p className="mt-1 text-3xl font-bold text-[#16803A]">
              {forecast.confidencePercent}%
            </p>
            <p className="mt-1 text-[11px] text-[#687D6B]">Grounded time-series rules</p>
          </div>

          <div className="rounded-2xl bg-[#FAFAF7] p-4 border border-[#E2E7E2]">
            <span className="text-xs text-[#687D6B]">Suggested Listing Benchmark</span>
            <p className="mt-1 text-3xl font-bold text-[#172019]">
              ₹{forecast.nearbyListingRange.min} – ₹{forecast.nearbyListingRange.max}
              <span className="text-sm font-normal text-[#687D6B]">/kg</span>
            </p>
            <p className="mt-1 text-[11px] text-[#687D6B]">Net farmer realization: ₹36/kg</p>
          </div>
        </div>

        {/* Actionable Strategy Recommendation */}
        <div className="rounded-2xl border border-[#16803A]/20 bg-[#EEF7EF] p-5 space-y-2">
          <div className="flex items-center gap-2 text-[#16803A]">
            <Sparkles className="size-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              OPERATIONAL RECOMMENDATION
            </span>
          </div>
          <p className="text-sm font-bold text-[#172019]">
            {lang === "hi" ? forecast.recommendationHi : forecast.recommendation}
          </p>
          <p className="text-xs text-[#687D6B]">
            {lang === "hi" ? forecast.suggestedActionHi : forecast.suggestedAction}
          </p>
        </div>

        {/* Explainability Breakdown Panel */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#172019]">
              {lang === "hi" ? "पूर्वानुमान का गणितीय विश्लेषण (Why?)" : "Why? Contributing Factors to the Model"}
            </h3>
            <button
              type="button"
              onClick={() => setExplainOpen(true)}
              className="text-xs font-bold text-[#16803A] hover:underline"
            >
              View Full Methodology →
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {forecast.factors.map((f, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-[#E2E7E2] bg-white flex items-start justify-between gap-3 shadow-2xs"
              >
                <div>
                  <p className="font-bold text-xs text-[#172019]">
                    {lang === "hi" ? f.nameHi : f.name}
                  </p>
                  <p className="text-xs text-[#687D6B] mt-0.5 leading-relaxed">{f.description}</p>
                </div>
                <span
                  className={`font-mono text-sm font-bold px-2 py-0.5 rounded-md shrink-0 ${
                    f.contributionPercent > 0 ? "bg-[#EEF7EF] text-[#16803A]" : "bg-red-50 text-red-600"
                  }`}
                >
                  {f.contributionPercent > 0 ? `+${f.contributionPercent}%` : `${f.contributionPercent}%`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ExplainabilityModal
        isOpen={explainOpen}
        onClose={() => setExplainOpen(false)}
        forecast={forecast}
      />
      <AIAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />
    </AppShell>
  );
}
