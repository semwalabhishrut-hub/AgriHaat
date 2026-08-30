"use client";

import Link from "next/link";
import { Layers, Plus, ArrowRight, CheckCircle2, MapPin, Calendar } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage } from "@/components/site/language-context";

export default function BuyerRequirementsListPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            BULK REQUISITION FEED
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            Active Procurement Requirements
          </h1>
          <p className="text-xs text-[#687D6B]">
            Broadcast your bulk vegetable, fruit, and grain demand to regional farmer clusters.
          </p>
        </div>

        <Link
          href="/buyer/requirements/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#16803A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
        >
          <Plus className="size-4" /> Post New Bulk Requirement
        </Link>
      </div>

      <div className="mt-8 space-y-4 max-w-4xl">
        <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-[#172019]">2,000 kg Tomatoes (Grade A)</span>
              <span className="rounded-full bg-[#EEF7EF] px-2.5 py-0.5 text-xs font-bold text-[#16803A]">
                100% Sourced
              </span>
            </div>
            <p className="text-xs text-[#687D6B]">
              Destination: Chennai Central Kitchen · Required by: 2 Sep 2026 · Target Budget: ₹34/kg
            </p>
            <p className="text-xs text-[#16803A] font-semibold">
              Matched across 3 farms (ABC FPO, GreenFields, Ramesh Farm) · Dispatch scheduled
            </p>
          </div>

          <Link
            href="/buyer/orders/ord-00421"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#16803A] px-5 py-2 text-xs font-bold text-white hover:bg-[#16803A]/90 transition"
          >
            Track Delivery <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
