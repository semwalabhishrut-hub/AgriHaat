"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Sprout,
  ShoppingBag,
  TrendingUp,
  Layers,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Plus,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage, rupees } from "@/components/site/language-context";

export default function FPODashboardPage() {
  const { lang } = useLanguage();

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            FARMER PRODUCER ORGANIZATION PORTAL
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            ABC Farmer Producer Organization (Kanchipuram)
          </h1>
          <p className="text-xs text-[#687D6B]">
            Collective member management, aggregated crop pools, and institutional bulk contracts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/farmer/produce/new"
            className="flex items-center gap-1.5 rounded-full bg-[#16803A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
          >
            <Plus className="size-4" /> Create Aggregated Listing
          </Link>
        </div>
      </div>

      {/* ─── FPO Key Metrics ─── */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Member Farmers</span>
          <p className="mt-2 text-2xl font-bold text-[#172019]">42 Farmers</p>
          <p className="mt-1 text-[11px] text-[#16803A]">100% KYC Verified</p>
        </div>

        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Collective Inventory Pool</span>
          <p className="mt-2 text-2xl font-bold text-[#172019]">4,800 kg</p>
          <p className="mt-1 text-[11px] text-[#687D6B]">3,200 kg available</p>
        </div>

        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Committed to Bulk Orders</span>
          <p className="mt-2 text-2xl font-bold text-[#16803A]">1,600 kg</p>
          <p className="mt-1 text-[11px] text-[#687D6B]">Scheduled for dispatch</p>
        </div>

        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Total FPO Realization</span>
          <p className="mt-2 text-2xl font-bold text-[#172019]">{rupees(172800)}</p>
          <p className="mt-1 text-[11px] text-[#16803A]">Direct DBT Disbursal</p>
        </div>
      </div>

      {/* ─── Member Farmers Supply Breakdown ─── */}
      <div className="mt-8 rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
          <h3 className="font-serif text-lg font-bold text-[#172019]">
            Aggregated Member Crop Pools (Tomatoes · Kanchipuram Cluster)
          </h3>
          <span className="text-xs font-bold text-[#16803A]">12 Member Farmers Contributing</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E7E2] text-[#687D6B]">
                <th className="pb-3 font-semibold">Farmer Member</th>
                <th className="pb-3 font-semibold">Village / Survey #</th>
                <th className="pb-3 font-semibold">Harvest Lot</th>
                <th className="pb-3 font-semibold">Total Quantity</th>
                <th className="pb-3 font-semibold">Committed Qty</th>
                <th className="pb-3 font-semibold text-right">Estimated Realization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7E2]">
              <tr className="hover:bg-[#FAFAF7]">
                <td className="py-3 font-bold text-[#172019]">Ramesh Kumar</td>
                <td className="text-[#687D6B]">Walajabad Taluk (Sy #142)</td>
                <td>Grade A Tomatoes</td>
                <td>800 kg</td>
                <td className="text-[#16803A] font-bold">500 kg (Order FM-00421)</td>
                <td className="text-right font-bold text-[#16803A]">{rupees(18000)}</td>
              </tr>
              <tr className="hover:bg-[#FAFAF7]">
                <td className="py-3 font-bold text-[#172019]">K. Murugan</td>
                <td className="text-[#687D6B]">Kanchipuram North (Sy #88)</td>
                <td>Grade A Tomatoes</td>
                <td>1,200 kg</td>
                <td className="text-[#16803A] font-bold">700 kg (Order FM-00422)</td>
                <td className="text-right font-bold text-[#16803A]">{rupees(25200)}</td>
              </tr>
              <tr className="hover:bg-[#FAFAF7]">
                <td className="py-3 font-bold text-[#172019]">S. Venkatesh</td>
                <td className="text-[#687D6B]">Chengalpattu Rural (Sy #210)</td>
                <td>Grade A Tomatoes</td>
                <td>600 kg</td>
                <td className="text-[#16803A] font-bold">400 kg (Order FM-00423)</td>
                <td className="text-right font-bold text-[#16803A]">{rupees(14400)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
