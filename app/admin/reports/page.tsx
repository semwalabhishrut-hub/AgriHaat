"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage } from "@/components/site/language-context";

const REPORTS = [
  { title: "Monthly Intermediary Commission Reduction Audit", desc: "Detailed comparison of farmer realization vs APMC traditional mandis across 14,280 transactions.", date: "August 2026", size: "2.4 MB", type: "PDF Audit" },
  { title: "Procurement Centre Token Wait-Time Compliance Report", desc: "Performance report for PS 26032 covering Kanchipuram, Walajabad, and Nellore centres.", date: "August 2026", size: "1.8 MB", type: "Gov Compliance" },
  { title: "Multi-Stop Logistics Fuel & Emission Savings Report", desc: "Telemetry breakdown of 124 km route aggregation saving 18 km per dispatch run.", date: "August 2026", size: "1.2 MB", type: "Logistics Analytics" },
  { title: "Direct Benefit Transfer (DBT) Disbursement Ledger", desc: "Reconciliation report of ₹4.82 Cr transferred directly to Aadhaar-linked farmer bank accounts.", date: "August 2026", size: "3.1 MB", type: "Financial Ledger" },
];

export default function AdminReportsPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
              GOVERNMENT COMPLIANCE & AUDIT REPORTS
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
              System Reports & Official Documentation
            </h1>
            <p className="text-xs text-[#687D6B]">
              Downloadable audit trails, price transparency studies, and DBT disbursement summaries.
            </p>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REPORTS.map((r, idx) => (
            <div key={idx} className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#16803A]/50 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-[#EEF7EF] px-2 py-0.5 text-[10px] font-bold text-[#16803A]">
                    {r.type}
                  </span>
                  <span className="text-xs text-[#687D6B]">{r.date}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#172019]">
                  {r.title}
                </h3>
                <p className="text-xs text-[#687D6B] leading-relaxed">
                  {r.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E7E2] flex items-center justify-between">
                <span className="text-[11px] text-[#687D6B]">File size: {r.size}</span>
                <button
                  type="button"
                  onClick={() => alert(`Downloading ${r.title}...`)}
                  className="flex items-center gap-1.5 rounded-full bg-[#16803A] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition"
                >
                  <Download className="size-3.5" /> Download Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
