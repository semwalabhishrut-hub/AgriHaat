"use client";

import { ArrowRight, CheckCircle2, MapPin, Truck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/site/language-context";
import { routeData } from "@/lib/demo-data";
import { ScrollReveal } from "./scroll-reveal";

export function LogisticsSection() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Schematic Map & Route UI */}
          <div className="lg:col-span-6 xl:col-span-7">
            <ScrollReveal direction="right">
              <div className="overflow-hidden rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
                  <div className="flex items-center gap-2">
                    <Truck className="size-5 text-[#16803A]" />
                    <span className="font-serif text-lg font-semibold text-[#172019]">
                      Supply Aggregation & Route
                    </span>
                  </div>
                  <span className="rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-semibold text-[#16803A]">
                    {routeData.totalDistance} km · {routeData.totalTime}
                  </span>
                </div>

                {/* Schematic Visual Path */}
                <div className="relative mt-8 space-y-6 pl-6 before:absolute before:bottom-3 before:left-2.5 before:top-3 before:w-0.5 before:bg-gradient-to-b before:from-[#16803A] before:via-[#16803A]/60 before:to-[#16803A]">
                  {routeData.stops.map((stop, idx) => (
                    <div key={idx} className="relative flex items-center justify-between">
                      {/* Node point */}
                      <div className="absolute -left-[19px] grid size-4 place-items-center rounded-full bg-white border-2 border-[#16803A]">
                        <div className="size-1.5 rounded-full bg-[#16803A]" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#172019]">{stop.name}</p>
                        <p className="text-xs text-[#687D6B]">
                          {stop.type === "pickup" && `Pickup · ${stop.weight} kg Grade ${stop.grade} @ ₹${stop.price}/kg`}
                          {stop.type === "hub" && `Aggregation Hub · ${stop.weight} kg pooled`}
                          {stop.type === "delivery" && `Final Delivery · ${stop.weight} kg fulfilled`}
                        </p>
                      </div>

                      <span className="text-xs font-bold text-[#16803A]">
                        {stop.weight} kg
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between rounded-xl bg-[#FAFAF7] p-3.5 border border-[#E2E7E2] text-xs">
                  <span className="text-[#687D6B]">Vehicle capacity utilization</span>
                  <span className="font-semibold text-[#16803A]">94% Optimal</span>
                </div>

                <p className="mt-3 text-center text-[11px] text-[#687D6B]">
                  {lang === "hi" ? routeData.labelHi : routeData.label}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Editorial Content */}
          <div className="lg:col-span-6 xl:col-span-5">
            <ScrollReveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16803A]">
                {t.smartLogistics}
              </span>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-[#172019] sm:text-4xl">
                {t.oneOrder}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mt-4 text-base leading-relaxed text-[#687D6B]">
                {t.oneOrderSub}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-6 space-y-3 text-sm text-[#172019]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>Cuts transport overhead by up to 35% per kg</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>Direct GPS tracking and digital proof of delivery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>Automated load clustering for nearby regional FPOs</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="mt-8">
                <Link
                  href="#how-it-works"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#16803A] px-6 text-sm font-semibold text-white shadow-xs transition hover:bg-[#16803A]/90"
                >
                  {t.seeExampleRoute}
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
