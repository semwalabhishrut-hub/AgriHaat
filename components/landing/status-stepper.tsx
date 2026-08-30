"use client";

import { Check } from "lucide-react";
import { orderSteps } from "@/lib/demo-data";
import { useLanguage } from "@/components/site/language-context";

export function StatusStepper({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();

  return (
    <div className={className} role="list" aria-label="Order fulfillment status">
      {orderSteps.map((step, i) => (
        <div key={step.label} className="flex items-start gap-3" role="listitem">
          {/* Icon */}
          <div className="flex flex-col items-center">
            <div
              className={`grid size-7 place-items-center rounded-full ${
                step.completed
                  ? "bg-primary text-white"
                  : "border-2 border-[#E2E7E2] bg-white text-[#E2E7E2]"
              }`}
            >
              {step.completed ? (
                <Check className="size-3.5" strokeWidth={3} />
              ) : (
                <div className="size-2 rounded-full bg-current" />
              )}
            </div>
            {i < orderSteps.length - 1 && (
              <div
                className={`my-1 h-6 w-0.5 ${
                  step.completed && orderSteps[i + 1]?.completed
                    ? "bg-primary"
                    : "bg-[#E2E7E2]"
                }`}
              />
            )}
          </div>
          {/* Label */}
          <span
            className={`pt-1 text-sm ${
              step.completed ? "font-medium text-foreground" : "text-muted-foreground"
            }`}
          >
            {lang === "hi" ? step.labelHi : step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
