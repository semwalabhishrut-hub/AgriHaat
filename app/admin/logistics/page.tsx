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
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { RouteMap } from "@/components/logistics/route-map";
import { useLanguage } from "@/components/site/language-context";

const ROUTES_DATA = [
  { id: "rt-01", code: "ROUTE-TN-KCH-CHN-01", vehicle: "TN-21-CA-4891", driver: "Selvam Pillai (+91 94440 12890)", carrier: "Tamil Nadu Agri Reefer", distance: "124 km", saved: "18 km saved", weight: "500 kg (Tomatoes)", temp: "+14.2°C", status: "In Transit" },
  { id: "rt-02", code: "ROUTE-AP-NLR-CHN-02", vehicle: "AP-26-TG-1102", driver: "Raja Shekar (+91 98481 99001)", carrier: "Andhra Fresh Freight", distance: "178 km", saved: "24 km saved", weight: "2,000 kg (Onions)", temp: "+12.8°C", status: "Delivered" },
  { id: "rt-03", code: "ROUTE-KA-KLR-BLR-03", vehicle: "KA-04-MB-3391", driver: "Manjunath S (+91 98451 22334)", carrier: "Karnataka Cold Logistics", distance: "68 km", saved: "12 km saved", weight: "800 kg (Potatoes)", temp: "+15.0°C", status: "Scheduled" },
];

export default function AdminLogisticsPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
              LOGISTICS & FLEET TELEMETRY
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
              Multi-Stop Pickup Roster & Live Tracking
            </h1>
            <p className="text-xs text-[#687D6B]">
              Real-time GPS coordination of aggregated farm pickups, temperature reefer telematics, and route optimization.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Exporting Fleet Roster CSV...")}
            className="flex items-center gap-1.5 rounded-full border border-[#E2E7E2] bg-white px-4 py-2 text-xs font-bold text-[#172019] hover:bg-[#EEF7EF] transition shadow-2xs"
          >
            <Download className="size-3.5" /> Export Telemetry CSV
          </button>
        </div>

        {/* Live Interactive Map */}
        <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-3">
            <div className="flex items-center gap-2">
              <Navigation className="size-4 text-[#16803A]" />
              <h3 className="font-serif text-base font-bold text-[#172019]">
                Live Coordinated Route Map & Farm Cluster Pins
              </h3>
            </div>
            <span className="text-xs text-[#16803A] font-semibold">Active Telemetry</span>
          </div>

          <RouteMap />
        </div>

        {/* Routes Roster Table */}
        <div className="rounded-3xl border border-[#E2E7E2] bg-white overflow-hidden shadow-xs">
          <div className="p-4 border-b border-[#E2E7E2] bg-[#FAFAF7]">
            <h3 className="font-serif text-sm font-bold text-[#172019]">
              Active Multi-Stop Logistics Schedules
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAF7] border-b border-[#E2E7E2] text-[#687D6B]">
                <tr>
                  <th className="p-4 font-semibold">Route Code & Carrier</th>
                  <th className="p-4 font-semibold">Vehicle & Driver</th>
                  <th className="p-4 font-semibold">Total Distance & Saving</th>
                  <th className="p-4 font-semibold">Payload & Temp</th>
                  <th className="p-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7E2]">
                {ROUTES_DATA.map((r) => (
                  <tr key={r.id} className="hover:bg-[#FAFAF7] transition">
                    <td className="p-4">
                      <p className="font-mono font-bold text-[#172019]">{r.code}</p>
                      <p className="text-[11px] text-[#687D6B]">{r.carrier}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-mono font-bold text-[#16803A]">{r.vehicle}</p>
                      <p className="text-[11px] text-[#687D6B]">{r.driver}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-[#172019]">{r.distance}</p>
                      <span className="rounded bg-[#EEF7EF] px-1.5 py-0.5 text-[10px] font-bold text-[#16803A]">
                        {r.saved}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-[#172019]">{r.weight}</p>
                      <p className="font-mono text-[11px] text-blue-600">Reefer {r.temp}</p>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        r.status === "Delivered"
                          ? "bg-[#EEF7EF] text-[#16803A]"
                          : r.status === "In Transit"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
