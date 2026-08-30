"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Sprout,
  ShoppingBag,
  Building2,
  TrendingUp,
  Download,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Search,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage, rupees } from "@/components/site/language-context";

export default function AdminDashboardPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            GOVERNMENT & CENTRAL OPERATIONS CONSOLE
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            AgriHaat Central Platform Operations
          </h1>
          <p className="text-xs text-[#687D6B]">
            System-wide oversight of verified farmers, FPO inventories, multi-stop logistics, and transparent realization audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Exporting Government Audit CSV Report...")}
            className="flex items-center gap-1.5 rounded-full border border-[#E2E7E2] bg-white px-4 py-2 text-xs font-bold text-[#172019] hover:bg-[#EEF7EF] transition shadow-2xs"
          >
            <Download className="size-3.5" /> Export Audit CSV
          </button>
        </div>
      </div>

      {/* ─── Top Operational Metrics ─── */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Verified Farmers & FPOs</span>
          <p className="mt-2 text-2xl font-bold text-[#172019]">14,280</p>
          <p className="mt-1 text-[11px] text-[#16803A]">Tamil Nadu & Andhra Clusters</p>
        </div>

        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Active Marketplace Supply</span>
          <p className="mt-2 text-2xl font-bold text-[#172019]">248.5 Tonnes</p>
          <p className="mt-1 text-[11px] text-[#16803A]">Grade A & B Verified</p>
        </div>

        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Cumulative Realization</span>
          <p className="mt-2 text-2xl font-bold text-[#16803A]">₹4.82 Crore</p>
          <p className="mt-1 text-[11px] text-[#687D6B]">Zero broker cuts</p>
        </div>

        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Procurement Slot Health</span>
          <p className="mt-2 text-2xl font-bold text-[#172019]">98.2% On-Time</p>
          <p className="mt-1 text-[11px] text-[#16803A]">Avg wait ~32 mins</p>
        </div>
      </div>

      {/* ─── Recent Platform Activity Table ─── */}
      <div className="mt-8 rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
          <h3 className="font-serif text-lg font-bold text-[#172019]">
            Live Platform Audit Stream (Listings, Dispatches & Token Passes)
          </h3>
          <span className="text-xs text-[#687D6B]">Immutable Audit Logs</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E7E2] text-[#687D6B]">
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold">Event Type</th>
                <th className="pb-3 font-semibold">Entity / Reference</th>
                <th className="pb-3 font-semibold">Details & Volume</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7E2]">
              <tr className="hover:bg-[#FAFAF7] transition">
                <td className="py-3 font-mono text-[#687D6B]">10:18 AM</td>
                <td>
                  <span className="rounded-md bg-[#EEF7EF] px-2 py-0.5 font-bold text-[#16803A]">
                    Procurement Queue
                  </span>
                </td>
                <td className="font-mono font-bold text-[#172019]">Token #42 (FM-PROC-00421)</td>
                <td>Ramesh Kumar checked in with 500 kg Tomatoes at Kanchipuram Centre</td>
                <td className="text-right">
                  <span className="text-[#16803A] font-bold">In Queue (~42 min)</span>
                </td>
              </tr>

              <tr className="hover:bg-[#FAFAF7] transition">
                <td className="py-3 font-mono text-[#687D6B]">09:15 AM</td>
                <td>
                  <span className="rounded-md bg-[#FAFAF7] px-2 py-0.5 font-bold text-[#172019] border border-[#E2E7E2]">
                    Order Aggregation
                  </span>
                </td>
                <td className="font-mono font-bold text-[#172019]">Order #FM-2026-00421</td>
                <td>ABC Restaurant matched 500 kg Tomatoes @ ₹40/kg (Realization ₹36/kg)</td>
                <td className="text-right">
                  <span className="text-[#16803A] font-bold">Confirmed</span>
                </td>
              </tr>

              <tr className="hover:bg-[#FAFAF7] transition">
                <td className="py-3 font-mono text-[#687D6B]">08:00 AM</td>
                <td>
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 font-bold text-blue-700">
                    Logistics Dispatch
                  </span>
                </td>
                <td className="font-mono font-bold text-[#172019]">Route #RT-KCH-CHN-001</td>
                <td>Vehicle TN-21-AX-9942 started multi-stop run (124 km, 4h 20m)</td>
                <td className="text-right">
                  <span className="text-blue-700 font-bold">In Transit</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
