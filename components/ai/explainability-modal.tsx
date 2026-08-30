"use client";

import { X, Sparkles, TrendingUp, Info, ArrowRight, ShieldCheck, Database, Calendar } from "lucide-react";
import { type DemandForecastData } from "@/lib/store";
import { useLanguage } from "@/components/site/language-context";

interface ExplainabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  forecast: DemandForecastData;
}

export function ExplainabilityModal({ isOpen, onClose, forecast }: ExplainabilityModalProps) {
  const { lang } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl border border-[#E2E7E2] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E2E7E2] px-6 py-5 bg-[#EEF7EF]">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-xl bg-[#16803A] text-white">
              <Sparkles className="size-4.5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#172019]">
                {lang === "hi" ? "AI सिफारिश और पूर्वानुमान का कारण" : "Explainable AI Forecast Breakdown"}
              </h3>
              <p className="text-xs text-[#687D6B]">
                {forecast.productName} · {forecast.region} · {forecast.forecastPeriod}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-[#687D6B] hover:bg-white/80 transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Summary Box */}
          <div className="rounded-2xl border border-[#16803A]/20 bg-[#EEF7EF]/60 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
              Recommended Strategy
            </span>
            <p className="mt-1 text-sm font-semibold text-[#172019]">
              {lang === "hi" ? forecast.recommendationHi : forecast.recommendation}
            </p>
            <p className="mt-1 text-xs text-[#687D6B]">
              {lang === "hi" ? forecast.suggestedActionHi : forecast.suggestedAction}
            </p>
          </div>

          {/* Model Statistics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-[#E2E7E2] bg-[#FAFAF7] p-3 text-center">
              <span className="text-[11px] text-[#687D6B]">Forecast Demand</span>
              <p className="mt-1 text-lg font-bold text-[#172019]">
                {forecast.expectedDemandKg.toLocaleString("en-IN")} kg
              </p>
            </div>
            <div className="rounded-xl border border-[#E2E7E2] bg-[#FAFAF7] p-3 text-center">
              <span className="text-[11px] text-[#687D6B]">Projected Change</span>
              <p className="mt-1 text-lg font-bold text-[#16803A]">
                +{forecast.changePercent}%
              </p>
            </div>
            <div className="rounded-xl border border-[#E2E7E2] bg-[#FAFAF7] p-3 text-center">
              <span className="text-[11px] text-[#687D6B]">Confidence Score</span>
              <p className="mt-1 text-lg font-bold text-[#172019]">
                {forecast.confidencePercent}%
              </p>
            </div>
          </div>

          {/* Contributing Factors Breakdown */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#172019] mb-3 flex items-center gap-1.5">
              <TrendingUp className="size-4 text-[#16803A]" />
              {lang === "hi" ? "पूर्वानुमान में योगदान देने वाले कारक" : "Why? Contributing Factors to the Model"}
            </h4>
            <div className="space-y-2.5">
              {forecast.factors.map((f, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#E2E7E2] p-3.5 bg-white flex items-start justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#172019]">
                      {lang === "hi" ? f.nameHi : f.name}
                    </p>
                    <p className="mt-0.5 text-xs text-[#687D6B] leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                  <span
                    className={`font-mono text-sm font-bold shrink-0 px-2 py-0.5 rounded-md ${
                      f.contributionPercent > 0
                        ? "bg-[#EEF7EF] text-[#16803A]"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {f.contributionPercent > 0 ? `+${f.contributionPercent}%` : `${f.contributionPercent}%`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology & Data Window */}
          <div className="rounded-xl border border-[#E2E7E2] bg-[#FAFAF7] p-4 text-xs text-[#687D6B] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#172019]">
              <Database className="size-3.5 text-[#16803A]" /> Data Window & Methodology
            </div>
            <p>
              Calculated using historical APMC market arrivals, trailing 30-day verified bulk orders, active buyer requisition feeds, and regional FPO crop calendar projections. The LLM explainability layer contextualizes deterministic time-series outputs without hallucinating figures.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-[#172019]">
              <span className="flex items-center gap-1">
                <Calendar className="size-3 text-[#16803A]" /> Data Window: Last {forecast.dataWindowDays} Days
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3 text-[#16803A]" /> Grounded Deterministic Pipeline
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E2E7E2] p-4 bg-[#FAFAF7] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#16803A] px-6 py-2 text-xs font-semibold text-white hover:bg-[#16803A]/90 transition"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
}
