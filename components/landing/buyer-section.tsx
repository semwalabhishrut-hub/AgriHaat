"use client";

import { ArrowRight, CheckCircle2, Building2, Clock, Check } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/site/language-context";
import { buyerOrder } from "@/lib/demo-data";
import { ScrollReveal } from "./scroll-reveal";

export function BuyerSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="for-buyers" className="py-20 lg:py-28">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Buyer Sourcing UI Card */}
          <div className="lg:col-span-6 xl:col-span-7">
            <ScrollReveal direction="right">
              <div className="overflow-hidden rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-9 place-items-center rounded-xl bg-[#EEF7EF] text-[#16803A]">
                      <Building2 className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#172019]">
                        {buyerOrder.buyer}
                      </h3>
                      <p className="text-xs text-[#687D6B]">Bulk Procurement Match</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-semibold text-[#16803A]">
                    <Check className="size-3.5" /> 100% Matched
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                  <div className="rounded-xl bg-[#FAFAF7] p-3.5 border border-[#E2E7E2]">
                    <span className="text-[#687D6B]">Requirement</span>
                    <p className="mt-1 text-lg font-bold text-[#172019]">
                      {buyerOrder.requirement.toLocaleString("en-IN")} kg
                    </p>
                    <p className="text-[#687D6B]">{lang === "hi" ? buyerOrder.productHi : buyerOrder.product} · Grade {buyerOrder.grade}</p>
                  </div>
                  <div className="rounded-xl bg-[#FAFAF7] p-3.5 border border-[#E2E7E2]">
                    <span className="text-[#687D6B]">{t.availableNearby}</span>
                    <p className="mt-1 text-lg font-bold text-[#16803A]">
                      {buyerOrder.availableNearby.toLocaleString("en-IN")} kg
                    </p>
                    <p className="text-[#687D6B]">Across 4 nearby FPOs</p>
                  </div>
                </div>

                {/* Sourcing summary */}
                <div className="mt-5 space-y-2.5 rounded-xl border border-[#E2E7E2] p-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#687D6B]">Delivery Destination:</span>
                    <span className="font-semibold text-[#172019]">{buyerOrder.deliveryCity} Central Kitchen</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#687D6B]">{t.matched} Quantity:</span>
                    <span className="font-semibold text-[#16803A]">{buyerOrder.matched.toLocaleString("en-IN")} kg</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#E2E7E2] pt-2">
                    <span className="text-[#687D6B] flex items-center gap-1">
                      <Clock className="size-3 text-[#16803A]" /> {t.estimatedDelivery}:
                    </span>
                    <span className="font-bold text-[#172019]">
                      {lang === "hi" ? buyerOrder.estimatedDeliveryHi : buyerOrder.estimatedDelivery}, 6:00 AM
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="h-11 flex-1 rounded-full bg-[#16803A] text-xs font-semibold text-white transition hover:bg-[#16803A]/90"
                  >
                    {t.reviewSupply}
                  </button>
                  <button
                    type="button"
                    className="h-11 rounded-full border border-[#E2E7E2] px-5 text-xs font-semibold text-[#172019] hover:bg-[#EEF7EF]"
                  >
                    Download Invoice
                  </button>
                </div>

                <p className="mt-3 text-center text-[10px] text-[#687D6B]">
                  Illustrative buyer workflow · demo data
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Editorial content */}
          <div className="lg:col-span-6 xl:col-span-5">
            <ScrollReveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16803A]">
                {t.forBuyers}
              </span>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-[#172019] sm:text-4xl">
                Direct farm sourcing at commercial scale.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mt-4 text-base leading-relaxed text-[#687D6B]">
                Restaurants, retail chains, and institutional caterers can source ton-scale fresh produce aggregated directly from farmer clusters with verified grading and on-time delivery guarantees.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-6 space-y-3 text-sm text-[#172019]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>10–18% lower purchase costs vs city wholesale mandis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>Farm-level batch traceability and standardized QA grades</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>Predictable supply schedules with multi-farm fallback</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="mt-8">
                <Link
                  href="#get-started"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#16803A] px-6 text-sm font-semibold text-white shadow-xs transition hover:bg-[#16803A]/90"
                >
                  Start Sourcing Direct
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
