"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/site/language-context";
import { HeroProductCard } from "./hero-product-card";
import { ScrollReveal } from "./scroll-reveal";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Background agricultural visual with soft overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF7]/60 via-[#FAFAF7]/90 to-[#FAFAF7]" />
      </div>

      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-6 xl:col-span-7">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E7E2] bg-white/80 px-3.5 py-1.5 backdrop-blur-xs">
                <span className="size-2 rounded-full bg-[#16803A]" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#16803A]">
                  {t.heroEyebrow}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="mt-6 font-serif text-4xl font-normal leading-[1.15] tracking-tight text-[#172019] sm:text-5xl lg:text-6xl xl:text-[4rem]">
                {t.heroLine1}
                <br />
                <span className="font-medium text-[#16803A]">{t.heroLine2}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#687D6B] sm:text-lg">
                {t.heroSub}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Link
                  href="#marketplace"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#16803A] px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-[#16803A]/90"
                >
                  {t.exploreMarketplace}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#E2E7E2] bg-white px-7 text-sm font-semibold text-[#172019] transition hover:bg-[#EEF7EF]"
                >
                  {t.seeHowItWorks}
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="mt-10 flex flex-col gap-2.5 border-t border-[#E2E7E2] pt-6 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-2 text-xs font-medium text-[#172019]">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>{t.trustBuilt}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#172019]">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>{t.trustPricing}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#172019]">
                  <CheckCircle2 className="size-4 text-[#16803A]" />
                  <span>{t.trustLogistics}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Hero Product UI */}
          <div className="lg:col-span-6 xl:col-span-5">
            <ScrollReveal delay={200} direction="left">
              <HeroProductCard />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
