"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  MapPin,
  Clock,
  Compass,
  Download,
  CheckCircle2,
  Navigation,
  Fuel,
  TrendingDown,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { RouteMap } from "@/components/logistics/route-map";
import { useLanguage } from "@/components/site/language-context";

export default function LogisticsDashboardPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
              LOGISTICS FLEET OPERATIONS
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
              Coordinated Farm Pickup & Dispatch Hub
            </h1>
            <p className="text-xs text-[#687D6B]">
              Multi-stop route aggregation connecting farm gates directly to urban institutional buyers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/logistics/routes"
              className="flex items-center gap-1.5 rounded-full bg-[#16803A] px-4 py-2 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-2xs"
            >
              <Truck className="size-3.5" /> Dispatch Schedules
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">Active Vehicles</span>
            <p className="text-2xl font-bold text-[#172019] mt-1">12 Trucks</p>
            <p className="text-[11px] text-[#16803A]">GPS Telemetry Live</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">Today's Aggregated Volume</span>
            <p className="text-2xl font-bold text-[#172019] mt-1">18.4 Tonnes</p>
            <p className="text-[11px] text-[#16803A]">9 Farm Clusters</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">Distance Saved Today</span>
            <p className="text-2xl font-bold text-[#16803A] mt-1">216 km</p>
            <p className="text-[11px] text-[#687D6B]">−18 km per route avg</p>
          </div>

          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">Cold Chain Integrity</span>
            <p className="text-2xl font-bold text-[#172019] mt-1">100%</p>
            <p className="text-[11px] text-[#16803A]">Temp +12°C to +15°C</p>
          </div>
        </div>

        {/* Live Interactive Map */}
        <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-3">
            <div className="flex items-center gap-2">
              <Navigation className="size-4 text-[#16803A]" />
              <h3 className="font-serif text-base font-bold text-[#172019]">
                Live Coordinated Route Map & Cluster Stoppages
              </h3>
            </div>
            <span className="text-xs text-[#16803A] font-semibold">Live Telemetry</span>
          </div>

          <RouteMap />
        </div>
      </div>
    </AppShell>
  );
}
