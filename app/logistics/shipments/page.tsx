"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Download,
  Thermometer,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage } from "@/components/site/language-context";

const SHIPMENTS = [
  { id: "shp-01", trackingNo: "TRK-2026-99120", orderNo: "FM-2026-00421", buyer: "ABC Grand Hotels (Chennai)", produce: "Tomatoes (Grade A)", weight: "500 kg", driver: "Selvam Pillai", temp: "+14.2°C", eta: "11:30 AM", status: "In Transit" },
  { id: "shp-02", trackingNo: "TRK-2026-99121", orderNo: "FM-2026-00422", buyer: "FreshChoice Hypermarket", produce: "Red Onions (Grade A)", weight: "2,000 kg", driver: "Raja Shekar", temp: "+12.8°C", eta: "Delivered", status: "Delivered" },
  { id: "shp-03", trackingNo: "TRK-2026-99122", orderNo: "FM-2026-00423", buyer: "CureFoods Central Kitchen", produce: "Potatoes (Grade A)", weight: "800 kg", driver: "Manjunath S", temp: "+15.0°C", eta: "02:15 PM", status: "Aggregating" },
];

export default function LogisticsShipmentsPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
              ACTIVE SHIPMENT TRACKING
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
              Consolidated Agricultural Shipments
            </h1>
            <p className="text-xs text-[#687D6B]">
              Real-time monitoring of in-transit cargo, reefer temperature telemetry, and estimated arrival times.
            </p>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="rounded-3xl border border-[#E2E7E2] bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAF7] border-b border-[#E2E7E2] text-[#687D6B]">
                <tr>
                  <th className="p-4 font-semibold">Tracking # & Order</th>
                  <th className="p-4 font-semibold">Destination Buyer</th>
                  <th className="p-4 font-semibold">Produce & Weight</th>
                  <th className="p-4 font-semibold">Assigned Driver</th>
                  <th className="p-4 font-semibold">Reefer Temp</th>
                  <th className="p-4 font-semibold">ETA</th>
                  <th className="p-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7E2]">
                {SHIPMENTS.map((s) => (
                  <tr key={s.id} className="hover:bg-[#FAFAF7] transition">
                    <td className="p-4 font-mono">
                      <p className="font-bold text-[#16803A]">{s.trackingNo}</p>
                      <p className="text-[11px] text-[#687D6B]">{s.orderNo}</p>
                    </td>
                    <td className="p-4 font-bold text-[#172019]">{s.buyer}</td>
                    <td className="p-4">
                      <p className="font-semibold text-[#172019]">{s.produce}</p>
                      <p className="text-[11px] text-[#687D6B]">{s.weight}</p>
                    </td>
                    <td className="p-4 text-[#172019]">{s.driver}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 font-mono text-blue-600 font-bold">
                        <Thermometer className="size-3.5" /> {s.temp}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-[#172019]">{s.eta}</td>
                    <td className="p-4 text-right">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        s.status === "Delivered"
                          ? "bg-[#EEF7EF] text-[#16803A]"
                          : "bg-blue-50 text-blue-700"
                      }`}>
                        {s.status}
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
