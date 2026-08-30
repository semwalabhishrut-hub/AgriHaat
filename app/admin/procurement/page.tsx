"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Search,
  CheckCircle2,
  Clock,
  QrCode,
  Download,
  AlertCircle,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage } from "@/components/site/language-context";

const CENTRES_DATA = [
  { id: "ctr-01", code: "PROC-CTR-KCH-01", name: "Kanchipuram District Procurement Centre", district: "Kanchipuram, TN", slotsTotal: 30, slotsBooked: 22, queueCount: 8, avgWait: 42, tokenNow: 34, status: "Open" },
  { id: "ctr-02", code: "PROC-CTR-WLJ-02", name: "Walajabad Regulated Market Hub", district: "Kanchipuram, TN", slotsTotal: 30, slotsBooked: 16, queueCount: 4, avgWait: 25, tokenNow: 19, status: "Open" },
  { id: "ctr-03", code: "PROC-CTR-NLR-03", name: "Nellore Agricultural Marketing Committee Hub", district: "Nellore, AP", slotsTotal: 40, slotsBooked: 38, queueCount: 14, avgWait: 58, tokenNow: 48, status: "Crowded" },
  { id: "ctr-04", code: "PROC-CTR-KLR-04", name: "Kolar APMC Mandi QC Centre", district: "Kolar, KA", slotsTotal: 35, slotsBooked: 20, queueCount: 6, avgWait: 30, tokenNow: 26, status: "Open" },
];

export default function AdminProcurementPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
              PROBLEM STATEMENT 26032 OVERSIGHT
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
              Procurement Centres & Digital Token Queues
            </h1>
            <p className="text-xs text-[#687D6B]">
              Government mandi hubs, slot availability tracking, wait-time analytics, and quality grading oversight.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/procurement"
              className="flex items-center gap-1.5 rounded-full bg-[#16803A] px-4 py-2 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-2xs"
            >
              Public Slot Portal →
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">Active Mandi Hubs</span>
            <p className="text-2xl font-bold text-[#172019] mt-1">4 Centres</p>
            <p className="text-[11px] text-[#16803A]">TN, AP, KA Network</p>
          </div>
          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">Tokens Issued Today</span>
            <p className="text-2xl font-bold text-[#172019] mt-1">96 Farmers</p>
            <p className="text-[11px] text-[#16803A]">QR passes generated</p>
          </div>
          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">Avg Queue Wait Time</span>
            <p className="text-2xl font-bold text-[#16803A] mt-1">38.7 Mins</p>
            <p className="text-[11px] text-[#687D6B]">−65% vs unmanaged mandis</p>
          </div>
          <div className="p-5 rounded-2xl border border-[#E2E7E2] bg-white shadow-xs">
            <span className="text-xs text-[#687D6B]">DBT Settlement Rate</span>
            <p className="text-2xl font-bold text-[#172019] mt-1">99.4%</p>
            <p className="text-[11px] text-[#16803A]">Direct to Aadhaar/bank</p>
          </div>
        </div>

        {/* Centres Table */}
        <div className="rounded-3xl border border-[#E2E7E2] bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAF7] border-b border-[#E2E7E2] text-[#687D6B]">
                <tr>
                  <th className="p-4 font-semibold">Centre Code & Name</th>
                  <th className="p-4 font-semibold">District</th>
                  <th className="p-4 font-semibold">Slots Booked / Total</th>
                  <th className="p-4 font-semibold">Queue Count</th>
                  <th className="p-4 font-semibold">Serving Token</th>
                  <th className="p-4 font-semibold">Est. Wait</th>
                  <th className="p-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7E2]">
                {CENTRES_DATA.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAFAF7] transition">
                    <td className="p-4">
                      <p className="font-bold text-[#172019]">{c.name}</p>
                      <p className="font-mono text-[11px] text-[#16803A]">{c.code}</p>
                    </td>
                    <td className="p-4 text-[#687D6B]">{c.district}</td>
                    <td className="p-4 font-bold text-[#172019]">
                      {c.slotsBooked} / {c.slotsTotal}
                    </td>
                    <td className="p-4 font-bold text-[#172019]">{c.queueCount} farmers</td>
                    <td className="p-4 font-mono font-bold text-[#16803A]">#{c.tokenNow}</td>
                    <td className="p-4 font-semibold text-[#172019]">~{c.avgWait} mins</td>
                    <td className="p-4 text-right">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        c.status === "Open"
                          ? "bg-[#EEF7EF] text-[#16803A]"
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {c.status}
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
