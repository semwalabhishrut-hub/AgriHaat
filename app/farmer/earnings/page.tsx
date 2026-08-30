"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  DollarSign,
  Building2,
  Download,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage, rupees } from "@/components/site/language-context";

export default function FarmerEarningsPage() {
  const { lang } = useLanguage();
  const [payoutRequested, setPayoutRequested] = useState(false);

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            {lang === "hi" ? "पारदर्शी आय व लेजर" : "TRANSPARENT FARMER REALIZATION & PAYOUTS"}
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            {lang === "hi" ? "किसान आय और भुगतान खाता" : "Farmer Realization & Earnings"}
          </h1>
          <p className="text-xs text-[#687D6B]">
            {lang === "hi"
              ? "प्रत्येक किलो का सटीक हिसाब — बिचौलियों के बिना प्रत्यक्ष बैंक भुगतान।"
              : "Exact rupee-by-rupee breakdown of buyer receipts minus logistics and transparent platform fees."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPayoutRequested(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#16803A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
        >
          <ArrowUpRight className="size-4" />
          {lang === "hi" ? "तुरंत निकासी का अनुरोध करें" : "Withdraw / Request Payout"}
        </button>
      </div>

      {payoutRequested && (
        <div className="mt-6 rounded-3xl border border-[#16803A]/30 bg-[#EEF7EF] p-5 sm:p-6 text-center animate-in zoom-in-95 duration-200">
          <div className="grid size-12 place-items-center rounded-full bg-[#16803A] text-white mx-auto mb-2">
            <CheckCircle2 className="size-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#172019]">
            Instant DBT Payout Initiated!
          </h3>
          <p className="text-xs text-[#687D6B] max-w-md mx-auto mt-0.5">
            ₹15,360 has been sent for immediate NEFT/DBT clearance to SBI A/c •••• 4892 (IFSC: SBIN0001234).
          </p>
        </div>
      )}

      {/* KPI Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs">
          <span className="text-xs text-[#687D6B]">Total Realized (Lifetime)</span>
          <p className="mt-2 text-3xl font-bold text-[#172019]">{rupees(142600)}</p>
          <p className="mt-1 text-[11px] text-[#16803A] font-semibold">Across 8 completed harvest batches</p>
        </div>

        <div className="rounded-3xl border border-[#16803A]/30 bg-[#EEF7EF] p-6 shadow-xs">
          <span className="text-xs text-[#687D6B]">Available for Immediate Disbursal</span>
          <p className="mt-2 text-3xl font-bold text-[#16803A]">{rupees(15360)}</p>
          <p className="mt-1 text-[11px] text-[#16803A] font-semibold">Procurement Token #42 (Accepted)</p>
        </div>

        <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs">
          <span className="text-xs text-[#687D6B]">Pending Order Delivery Clearance</span>
          <p className="mt-2 text-3xl font-bold text-[#172019]">{rupees(18000)}</p>
          <p className="mt-1 text-[11px] text-[#687D6B]">Order FM-2026-00421 (Tomorrow)</p>
        </div>
      </div>

      {/* Itemized Payout Ledger Table */}
      <div className="mt-8 rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
          <h3 className="font-serif text-lg font-bold text-[#172019]">
            Transparent Transaction & Realization Ledger
          </h3>
          <span className="text-[11px] text-[#687D6B]">Zero Hidden Mandi Deductions</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E7E2] text-[#687D6B]">
                <th className="pb-3 font-semibold">Date & Reference</th>
                <th className="pb-3 font-semibold">Channel</th>
                <th className="pb-3 font-semibold">Produce & Batch</th>
                <th className="pb-3 font-semibold">Gross Buyer Value</th>
                <th className="pb-3 font-semibold">Logistics & Platform</th>
                <th className="pb-3 font-semibold text-right">Net Farmer Realization</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7E2]">
              <tr>
                <td className="py-3.5 font-bold text-[#172019]">
                  28 Aug 2026<br />
                  <span className="font-mono font-normal text-[11px] text-[#687D6B]">FM-2026-00421</span>
                </td>
                <td>
                  <span className="rounded-md bg-[#FAFAF7] px-2 py-0.5 font-bold text-[#172019] border border-[#E2E7E2]">
                    Direct Buyer
                  </span>
                </td>
                <td>Tomatoes (500 kg @ ₹40/kg)</td>
                <td>{rupees(20000)}</td>
                <td className="text-red-600">−{rupees(2000)}</td>
                <td className="text-right font-bold text-[#16803A] text-sm">{rupees(18000)}</td>
                <td className="text-right">
                  <span className="rounded-full bg-[#EEF7EF] px-2.5 py-1 text-[10px] font-bold text-[#16803A]">
                    T+1 Pending
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3.5 font-bold text-[#172019]">
                  30 Aug 2026<br />
                  <span className="font-mono font-normal text-[11px] text-[#687D6B]">FM-PROC-00421</span>
                </td>
                <td>
                  <span className="rounded-md bg-[#EEF7EF] px-2 py-0.5 font-bold text-[#16803A] border border-[#16803A]/20">
                    Procurement Centre
                  </span>
                </td>
                <td>Tomatoes (480 kg @ ₹32/kg)</td>
                <td>{rupees(15360)}</td>
                <td>₹0 (Direct MSP/Gov)</td>
                <td className="text-right font-bold text-[#16803A] text-sm">{rupees(15360)}</td>
                <td className="text-right">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                    Processing
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
