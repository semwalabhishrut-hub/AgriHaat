"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Clock,
  Download,
  CheckCircle2,
  Navigation,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage } from "@/components/site/language-context";

const ROUTES = [
  { id: "rt-01", code: "ROUTE-TN-KCH-CHN-01", vehicle: "TN-21-CA-4891", driver: "Selvam Pillai (+91 94440 12890)", pickup1: "Farmer A (Kanchipuram, 250 kg)", pickup2: "Farmer B (Walajabad, 180 kg)", hub: "Walajabad Aggregation Hub", dest: "ABC Grand Hotels (Chennai)", distance: "124 km", saved: "18 km saved", status: "In Transit" },
  { id: "rt-02", code: "ROUTE-AP-NLR-CHN-02", vehicle: "AP-26-TG-1102", driver: "Raja Shekar (+91 98481 99001)", pickup1: "GreenFields FPO (Nellore, 1000 kg)", pickup2: "Kavali Farm Cluster (1000 kg)", hub: "Nellore Dispatch Yard", dest: "FreshChoice Hypermarkets (Chennai)", distance: "178 km", saved: "24 km saved", status: "Delivered" },
  { id: "rt-03", code: "ROUTE-KA-KLR-BLR-03", vehicle: "KA-04-MB-3391", driver: "Manjunath S (+91 98451 22334)", pickup1: "Kolar Tomato Federation (800 kg)", pickup2: "Bangarapet Farmers (400 kg)", hub: "Kolar Mandi Hub", dest: "CureFoods Central Kitchen (Bengaluru)", distance: "68 km", saved: "12 km saved", status: "Scheduled" },
];

export default function LogisticsRoutesPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
              DISPATCH ROUTE ROSTER
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
              Multi-Stop Pickups & Transport Schedules
            </h1>
            <p className="text-xs text-[#687D6B]">
              Optimal multi-stop routes combining produce from multiple farmers into single consolidated runs.
            </p>
          </div>
        </div>

        {/* Routes Cards */}
        <div className="space-y-4">
          {ROUTES.map((r) => (
            <div key={r.id} className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E7E2] pb-3">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-xl bg-[#EEF7EF] text-[#16803A]">
                    <Truck className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#172019]">{r.code}</h3>
                    <p className="text-[11px] font-mono text-[#687D6B]">{r.vehicle} · {r.driver}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#EEF7EF] px-2 py-0.5 text-xs font-bold text-[#16803A]">
                    {r.saved}
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    r.status === "Delivered" ? "bg-[#EEF7EF] text-[#16803A]" : "bg-blue-50 text-blue-700"
                  }`}>
                    {r.status}
                  </span>
                </div>
              </div>

              {/* Waypoints */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-[#FAFAF7] p-4 rounded-2xl border border-[#E2E7E2]">
                <div>
                  <span className="text-[#687D6B] text-[10px] uppercase font-bold">Stop 1 (Pickup)</span>
                  <p className="font-semibold text-[#172019] mt-0.5">{r.pickup1}</p>
                </div>
                <div>
                  <span className="text-[#687D6B] text-[10px] uppercase font-bold">Stop 2 (Pickup)</span>
                  <p className="font-semibold text-[#172019] mt-0.5">{r.pickup2}</p>
                </div>
                <div>
                  <span className="text-[#687D6B] text-[10px] uppercase font-bold">Stop 3 (QC Hub)</span>
                  <p className="font-semibold text-[#172019] mt-0.5">{r.hub}</p>
                </div>
                <div>
                  <span className="text-[#16803A] text-[10px] uppercase font-bold">Destination (Drop)</span>
                  <p className="font-bold text-[#16803A] mt-0.5">{r.dest}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
