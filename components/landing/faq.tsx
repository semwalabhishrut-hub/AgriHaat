"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/components/site/language-context";
import { faqItems } from "@/lib/demo-data";
import { ScrollReveal } from "./scroll-reveal";

export function FAQ() {
  const { t, lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="border-t border-[#E2E7E2] bg-[#FAFAF7] py-20 lg:py-28">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Heading */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16803A]">
                FREQUENTLY ASKED
              </span>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-[#172019] sm:text-4xl">
                {t.faqHeading}
              </h2>
              <p className="mt-4 text-sm text-[#687D6B]">
                Everything you need to know about our farmer payouts, logistics aggregation, and AI market forecasts.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-[#E2E7E2] border-y border-[#E2E7E2]">
              {faqItems.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="flex w-full items-center justify-between gap-4 text-left cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`text-base font-medium transition-colors ${
                          isOpen
                            ? "text-[#16803A]"
                            : "text-[#172019] group-hover:text-[#16803A]"
                        }`}
                      >
                        {lang === "hi" ? item.qHi : item.q}
                      </span>
                      <div
                        className={`grid size-7 shrink-0 place-items-center rounded-full border transition-colors ${
                          isOpen
                            ? "border-[#16803A] bg-[#EEF7EF] text-[#16803A]"
                            : "border-[#E2E7E2] bg-white text-[#687D6B] group-hover:border-[#16803A]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="size-3.5" />
                        ) : (
                          <Plus className="size-3.5" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-3 pr-8 text-sm leading-relaxed text-[#687D6B] animate-in fade-in slide-in-from-top-1 duration-200">
                        {lang === "hi" ? item.aHi : item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
