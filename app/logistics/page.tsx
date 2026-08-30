"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  ShieldCheck,
  Phone,
  Layers,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { RouteMapCanvas } from "@/components/logistics/route-map";
import { useLanguage } from "@/components/site/language-context";

export default function LogisticsPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            {lang === "hi" ? "स्मार्ट लॉजिस्टिक्स व रूट रोस्टर" : "COORDINATED LOGISTICS & DISPATCH ROSTER"}
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            {lang === "hi" ? "मल्टी-स्टॉप एग्रीगेशन रूट" : "Multi-Farm Pickup & Delivery Router"}
          </h1>
          <p className="text-xs text-[#687D6B]">
            {lang === "hi"
              ? "कई नजदीकी खेतों से एक ही वाहन में उपज लोड कर शहर के खरीदार तक पहुंचाने का अनुकूलित मार्ग।"
              : "Optimized route clustering aggregating multiple farm pickups into a single coordinated city delivery run."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#EEF7EF] px-3.5 py-1.5 text-xs font-bold text-[#16803A] border border-[#16803A]/20">
            Route Code: #RT-KCH-CHN-001
          </span>
        </div>
      </div>

      {/* ─── Interactive Map Visualizer ─── */}
      <div className="mt-8">
        <RouteMapCanvas className="w-full" />
      </div>

      {/* ─── 2-Column Route Details & Vehicle Telemetry ─── */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Left: Stops Sequence (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
            <h3 className="font-serif text-lg font-bold text-[#172019]">
              Sequential Stopover Dispatch Schedule
            </h3>
            <span className="text-xs font-bold text-[#16803A]">124 km · 4h 20m</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Stop 1 */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#E2E7E2]">
              <div className="grid size-7 place-items-center rounded-full bg-[#16803A] text-white font-bold text-xs">
                1
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-sm text-[#172019]">Farmer A: Ramesh Kumar (ABC FPO)</p>
                  <span className="rounded bg-[#EEF7EF] px-2 py-0.5 text-[10px] font-bold text-[#16803A]">05:30 AM</span>
                </div>
                <p className="text-[#687D6B] mt-0.5">Kanchipuram · 250 kg Grade A Tomatoes Loaded</p>
              </div>
            </div>

            {/* Stop 2 */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#E2E7E2]">
              <div className="grid size-7 place-items-center rounded-full bg-[#16803A] text-white font-bold text-xs">
                2
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-sm text-[#172019]">Farmer B: Suresh Reddy (GreenFields)</p>
                  <span className="rounded bg-[#EEF7EF] px-2 py-0.5 text-[10px] font-bold text-[#16803A]">06:15 AM</span>
                </div>
                <p className="text-[#687D6B] mt-0.5">Walajabad · 180 kg Grade A Tomatoes Loaded</p>
              </div>
            </div>

            {/* Stop 3 (Hub) */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#EEF7EF] border border-[#16803A]/20">
              <div className="grid size-7 place-items-center rounded-full bg-blue-600 text-white font-bold text-xs">
                3
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-sm text-[#172019]">Walajabad Collection & QC Hub</p>
                  <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold text-blue-700">07:30 AM</span>
                </div>
                <p className="text-[#687D6B] mt-0.5">Consolidated 430 kg Total · Quality Inspection Passed</p>
              </div>
            </div>

            {/* Stop 4 (Delivery) */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#E2E7E2]">
              <div className="grid size-7 place-items-center rounded-full bg-[#172019] text-white font-bold text-xs">
                4
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-sm text-[#172019]">ABC Grand Kitchens (Chennai)</p>
                  <span className="rounded bg-[#FAFAF7] px-2 py-0.5 text-[10px] font-bold text-[#172019] border border-[#E2E7E2]">08:45 AM (ETA)</span>
                </div>
                <p className="text-[#687D6B] mt-0.5">Final Buyer Unloading & Digital Proof of Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Assigned Vehicle & Driver (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-[#172019]">
              Assigned Logistics Partner & Vehicle
            </h3>

            <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#E2E7E2] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#687D6B]">Carrier:</span>
                <span className="font-bold text-[#172019]">AgriFast Cold Transport TN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#687D6B]">Vehicle Number:</span>
                <span className="font-mono font-bold text-[#172019]">TN-21-AX-9942</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#687D6B]">Driver:</span>
                <span className="font-semibold text-[#172019]">M. Kumar (+91 98409 11223)</span>
              </div>
              <div className="flex justify-between border-t border-[#E2E7E2] pt-2">
                <span className="text-[#687D6B]">Reefer Temperature:</span>
                <span className="font-bold text-[#16803A]">14°C Optimal</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#16803A]/20 bg-[#EEF7EF] p-4 text-xs space-y-1">
              <div className="flex justify-between font-bold text-[#16803A]">
                <span>Route Optimization Impact:</span>
                <span>−18 km Saved</span>
              </div>
              <p className="text-[#687D6B]">
                Clustering 2 farm pickups reduced transport costs from ₹5.5/kg to ₹3.0/kg.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
