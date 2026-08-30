"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage, rupees } from "@/components/site/language-context";
import { farmerRealization } from "@/lib/demo-data";
import { ScrollReveal } from "./scroll-reveal";

export function EarningsSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="for-farmers" className="border-t border-[#E2E7E2] bg-[#FAFAF7] py-20 lg:py-28">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Editorial copy */}
          <div className="lg:col-span-6 xl:col-span-5">
            <ScrollReveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16803A]">
                {t.forFarmers}
              </span>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-[#172019] sm:text-4xl">
                {t.knowWhatReaches}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mt-4 text-base leading-relaxed text-[#687D6B]">
                Traditional supply chains hide fees behind complex commission deductions. AgriHaat gives farmers a clear, itemized realization statement before every truck leaves the gate.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-6 space-y-3 text-sm text-[#172019]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>Up to 25–30% higher net realization vs typical mandis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>Direct bank transfer upon delivery confirmation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>Zero hidden mandi cess, weighing cuts, or broker cuts</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="mt-8">
                <Link
                  href="#get-started"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#16803A] px-6 text-sm font-semibold text-white shadow-xs transition hover:bg-[#16803A]/90"
                >
                  {t.viewEarnings}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Earnings breakdown UI card */}
          <div className="lg:col-span-6 xl:col-span-7">
            <ScrollReveal delay={200} direction="left">
              <div className="overflow-hidden rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#172019]">
                      Farmer Payout Statement
                    </h3>
                    <p className="text-xs text-[#687D6B]">Order #F2M-84920 · 500 kg Tomatoes</p>
                  </div>
                  <span className="rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-semibold text-[#16803A]">
                    Verified Payout
                  </span>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#687D6B]">Buyer pays</span>
                    <span className="font-semibold text-[#172019]">{rupees(farmerRealization.buyerPrice)}/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#687D6B]">Transport & Logistics</span>
                    <span className="font-medium text-[#dc2626]">−{rupees(farmerRealization.logistics)}/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#687D6B]">Platform fee (2.5%)</span>
                    <span className="font-medium text-[#dc2626]">−{rupees(farmerRealization.platformFee)}/kg</span>
                  </div>
                  <div className="flex justify-between border-t border-[#E2E7E2] pt-3 text-base font-bold">
                    <span className="text-[#172019]">Estimated Realization</span>
                    <span className="text-[#16803A]">{rupees(farmerRealization.realization)}/kg</span>
                  </div>
                </div>

                {/* Total Payout Highlight Box */}
                <div className="mt-6 rounded-2xl bg-[#EEF7EF] p-5 border border-[#16803A]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-[#687D6B]">
                        {t.expectedPayout} (500 kg)
                      </p>
                      <p className="mt-1 text-3xl font-bold tracking-tight text-[#16803A]">
                        {rupees(farmerRealization.expectedPayout)}
                      </p>
                    </div>
                    <div className="text-right text-xs text-[#687D6B]">
                      <p>Payout schedule:</p>
                      <p className="font-semibold text-[#172019]">T+1 on delivery</p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-center text-[11px] text-[#687D6B]">
                  {lang === "hi" ? farmerRealization.labelHi : farmerRealization.label}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
