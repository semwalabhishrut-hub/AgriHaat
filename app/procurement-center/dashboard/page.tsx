"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  CheckCircle2,
  Clock,
  QrCode,
  ShieldCheck,
  Scale,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage, rupees } from "@/components/site/language-context";

interface QueueItem {
  token: number;
  farmerName: string;
  phone: string;
  produce: string;
  expectedKg: number;
  acceptedKg?: number;
  status: "Checked In" | "In Queue" | "Quality Check" | "Accepted" | "Payment Completed";
  timeSlot: string;
}

const INITIAL_QUEUE: QueueItem[] = [
  { token: 39, farmerName: "K. Murugan", phone: "+91 94440 11223", produce: "Paddy", expectedKg: 1200, acceptedKg: 1180, status: "Payment Completed", timeSlot: "09:30 AM" },
  { token: 40, farmerName: "A. Balaji", phone: "+91 98402 33445", produce: "Tomatoes", expectedKg: 400, acceptedKg: 400, status: "Accepted", timeSlot: "10:00 AM" },
  { token: 41, farmerName: "S. Venkatesh", phone: "+91 97100 55667", produce: "Paddy", expectedKg: 800, status: "Quality Check", timeSlot: "10:15 AM" },
  { token: 42, farmerName: "Ramesh Kumar", phone: "+91 98401 23456", produce: "Tomatoes", expectedKg: 500, acceptedKg: 480, status: "In Queue", timeSlot: "10:30 AM" },
];

export default function ProcurementCenterOperatorDashboard() {
  const { lang } = useLanguage();
  const [queue, setQueue] = useState<QueueItem[]>(INITIAL_QUEUE);

  const handleAdvanceStatus = (tokenNum: number) => {
    setQueue((prev) =>
      prev.map((q) => {
        if (q.token === tokenNum) {
          if (q.status === "In Queue") return { ...q, status: "Quality Check" };
          if (q.status === "Quality Check") return { ...q, status: "Accepted", acceptedKg: q.expectedKg - 20 };
          if (q.status === "Accepted") return { ...q, status: "Payment Completed" };
        }
        return q;
      })
    );
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            CENTRE OPERATOR PORTAL
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            Kanchipuram Procurement Centre Console
          </h1>
          <p className="text-xs text-[#687D6B]">
            Manage physical gate arrivals, electronic weighing scale inputs, quality acceptance, and DBT payment approvals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-bold text-[#16803A] border border-[#16803A]/20">
            Centre Status: Open (Serving #40)
          </span>
        </div>
      </div>

      {/* ─── Today's Operational KPIs ─── */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Total Bookings Today</span>
          <p className="mt-2 text-2xl font-bold text-[#172019]">86 Farmers</p>
          <p className="mt-1 text-[11px] text-[#16803A]">18 slots still open</p>
        </div>

        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Gate Checked In</span>
          <p className="mt-2 text-2xl font-bold text-[#172019]">42 Arrived</p>
          <p className="mt-1 text-[11px] text-[#687D6B]">QR verified arrivals</p>
        </div>

        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Processed & Weighed</span>
          <p className="mt-2 text-2xl font-bold text-[#16803A]">28 Batches</p>
          <p className="mt-1 text-[11px] text-[#687D6B]">14,200 kg accepted</p>
        </div>

        <div className="rounded-2xl border border-[#E2E7E2] bg-white p-5 shadow-xs">
          <span className="text-xs text-[#687D6B]">Currently in Queue</span>
          <p className="mt-2 text-2xl font-bold text-[#172019]">14 Waiting</p>
          <p className="mt-1 text-[11px] text-[#687D6B]">Avg wait ~28 min</p>
        </div>
      </div>

      {/* ─── Live Queue Manager Table ─── */}
      <div className="mt-8 rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
          <h3 className="font-serif text-lg font-bold text-[#172019]">
            Live Farmer Token Queue (Gate Arrival & Inspection Console)
          </h3>
          <span className="text-xs text-[#687D6B]">Operator Quick Action Station</span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E7E2] text-[#687D6B]">
                <th className="pb-3 font-semibold">Token</th>
                <th className="pb-3 font-semibold">Farmer & Contact</th>
                <th className="pb-3 font-semibold">Crop & Quantity</th>
                <th className="pb-3 font-semibold">Booked Slot</th>
                <th className="pb-3 font-semibold">Current State</th>
                <th className="pb-3 font-semibold text-right">Operator Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7E2]">
              {queue.map((item) => (
                <tr key={item.token} className="hover:bg-[#FAFAF7] transition">
                  <td className="py-3.5">
                    <span className="font-serif font-bold text-sm text-[#16803A] bg-[#EEF7EF] px-2.5 py-1 rounded-lg">
                      #{item.token}
                    </span>
                  </td>
                  <td>
                    <p className="font-bold text-[#172019]">{item.farmerName}</p>
                    <p className="text-[11px] text-[#687D6B]">{item.phone}</p>
                  </td>
                  <td>
                    <p className="font-semibold text-[#172019]">{item.produce}</p>
                    <p className="text-[11px] text-[#687D6B]">
                      {item.acceptedKg ? `${item.acceptedKg} kg accepted` : `Exp: ${item.expectedKg} kg`}
                    </p>
                  </td>
                  <td className="text-[#687D6B]">{item.timeSlot}</td>
                  <td>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        item.status === "Payment Completed"
                          ? "bg-[#EEF7EF] text-[#16803A]"
                          : item.status === "Accepted"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "Quality Check"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="text-right">
                    {item.status !== "Payment Completed" && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus(item.token)}
                        className="rounded-full bg-[#16803A] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition"
                      >
                        {item.status === "In Queue"
                          ? "Start Quality Check"
                          : item.status === "Quality Check"
                          ? "Accept 480 kg & Weigh"
                          : "Approve DBT Payment"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
