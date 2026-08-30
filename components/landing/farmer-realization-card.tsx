"use client";

import { useLanguage, rupees } from "@/components/site/language-context";
import { farmerRealization } from "@/lib/demo-data";
import { ProgressBar } from "./progress-bar";

export function FarmerRealizationCard() {
  const { t, lang } = useLanguage();

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E2E7E2] bg-white p-6 shadow-sm sm:p-8">
      <div>
        <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
          <div>
            <h4 className="font-serif text-xl font-semibold text-[#172019]">
              {t.farmerRealization}
            </h4>
            <p className="text-xs text-[#687D6B]">{t.perKg}</p>
          </div>
          <span className="rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-semibold text-[#16803A]">
            Direct Payout
          </span>
        </div>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#687D6B]">{t.buyerPrice}</span>
            <span className="font-semibold text-[#172019]">{rupees(farmerRealization.buyerPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#687D6B]">{t.logistics}</span>
            <span className="font-medium text-[#dc2626]">−{rupees(farmerRealization.logistics)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#687D6B]">{t.platformFee}</span>
            <span className="font-medium text-[#dc2626]">−{rupees(farmerRealization.platformFee)}</span>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-[#16803A]/20 bg-[#EEF7EF] p-4">
          <p className="text-xs font-medium text-[#687D6B]">{t.estimatedRealization}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-[#16803A]">
            {rupees(farmerRealization.realization)}
            <span className="text-sm font-normal text-[#687D6B]">/kg</span>
          </p>
        </div>

        <div className="mt-5">
          <ProgressBar percentage={90} label="Realization Rate (90% of buyer price)" />
        </div>
      </div>

      <div className="mt-6 border-t border-[#E2E7E2] pt-3 text-center">
        <span className="text-[11px] text-[#687D6B]">
          {lang === "hi" ? farmerRealization.labelHi : farmerRealization.label}
        </span>
      </div>
    </div>
  );
}
