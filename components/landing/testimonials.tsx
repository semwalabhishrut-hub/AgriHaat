"use client";

import { Star } from "lucide-react";
import { useLanguage } from "@/components/site/language-context";
import { testimonials } from "@/lib/demo-data";
import { ScrollReveal } from "./scroll-reveal";

export function Testimonials() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-20 lg:py-28">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16803A]">
              USER EXPERIENCES
            </span>
            <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#172019] sm:text-4xl">
              Trusted by farmers, FPOs, and commercial buyers.
            </h2>
            <p className="mt-3 text-sm text-[#687D6B]">
              Discover how direct aggregation and market transparency simplify agricultural trade.
            </p>
          </ScrollReveal>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 150}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E2E7E2] bg-white p-6 shadow-xs transition hover:shadow-md sm:p-7">
                <div>
                  {/* 5-star rating */}
                  <div className="flex items-center gap-1 text-[#16A34A]">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-4 text-sm leading-relaxed text-[#172019]">
                    &ldquo;{lang === "hi" ? item.quoteHi : item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 border-t border-[#E2E7E2] pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#172019]">{item.name}</h4>
                      <p className="text-xs text-[#687D6B]">
                        {lang === "hi" ? item.roleHi : item.role}
                      </p>
                    </div>
                    <span className="rounded bg-[#FAFAF7] px-2 py-0.5 text-[10px] font-medium text-[#687D6B] border border-[#E2E7E2]">
                      {lang === "hi" ? item.labelHi : item.label}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
