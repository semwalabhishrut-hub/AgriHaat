"use client";

import { TrendingUp, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/site/language-context";
import { demandForecast } from "@/lib/demo-data";

export function DemandCard() {
  const { t, lang } = useLanguage();

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E2E7E2] bg-white p-6 shadow-sm sm:p-8">
      <div>
        <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
          <div>
            <h4 className="font-serif text-xl font-semibold text-[#172019]">
              {t.demandOutlook}
            </h4>
            <p className="text-xs text-[#687D6B]">
              {lang === "hi" ? demandForecast.productHi : demandForecast.product} · {demandForecast.region}
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-semibold text-[#16803A]">
            <TrendingUp className="size-3.5" /> +{demandForecast.trend}%
          </span>
        </div>

        <div className="mt-5">
          <p className="text-xs text-[#687D6B]">{t.expectedDemand}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-[#172019]">
            {demandForecast.expectedDemand.toLocaleString("en-IN")}{" "}
            <span className="text-lg font-normal text-[#687D6B]">kg</span>
          </p>
        </div>

        {/* Mini demand chart visual */}
        <div className="mt-6 flex h-20 items-end gap-1.5 rounded-xl bg-[#FAFAF7] p-3 border border-[#E2E7E2]">
          {[35, 42, 50, 48, 65, 78, 88, 92, 100].map((val, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t transition-all ${
                i >= 6 ? "bg-[#16803A]" : "bg-[#16803A]/30"
              }`}
              style={{ height: `${val}%` }}
              title={`Day ${i + 1}: ${val}%`}
            />
          ))}
        </div>

        {/* Recommendation box */}
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#16803A]/20 bg-[#EEF7EF] p-3.5">
          <Sparkles className="size-4 shrink-0 text-[#16803A] mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-[#172019]">{t.recommendation}: </span>
            <span className="text-[#687D6B]">
              {lang === "hi" ? demandForecast.recommendationHi : demandForecast.recommendation}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#E2E7E2] pt-3 text-[11px] text-[#687D6B]">
        <span>{t.confidence}: {demandForecast.confidence}%</span>
        <span>{lang === "hi" ? demandForecast.labelHi : demandForecast.label}</span>
      </div>
    </div>
  );
}
