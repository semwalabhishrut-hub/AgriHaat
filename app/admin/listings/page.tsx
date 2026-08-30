"use client";

import { useState } from "react";
import {
  Sprout,
  Search,
  CheckCircle2,
  Filter,
  Download,
  Tag,
  ArrowUpDown,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage, rupees } from "@/components/site/language-context";

const LISTINGS_DATA = [
  { id: "lst-01", crop: "Tomatoes", grade: "A", qty: 500, price: 32, buyerPrice: 40, realization: 36, seller: "ABC FPO", location: "Kanchipuram, TN", harvest: "28 Aug 2026", status: "Active" },
  { id: "lst-02", crop: "Red Onions", grade: "A", qty: 1000, price: 28, buyerPrice: 35, realization: 31.5, seller: "GreenFields FPO", location: "Nellore, AP", harvest: "01 Sep 2026", status: "Active" },
  { id: "lst-03", crop: "Potatoes", grade: "A", qty: 800, price: 26, buyerPrice: 32, realization: 29, seller: "Rayalaseema FPO", location: "Chittoor, AP", harvest: "30 Aug 2026", status: "Active" },
  { id: "lst-04", crop: "Basmati Rice", grade: "A", qty: 2000, price: 62, buyerPrice: 72, realization: 67, seller: "Punjab Agri FPO", location: "Karnal, HR", harvest: "15 Sep 2026", status: "Active" },
  { id: "lst-05", crop: "Nashik Onions", grade: "A", qty: 3000, price: 30, buyerPrice: 38, realization: 34, seller: "Nashik FPO", location: "Nashik, MH", harvest: "26 Aug 2026", status: "Active" },
  { id: "lst-06", crop: "Kolar Tomatoes", grade: "A", qty: 1500, price: 31, buyerPrice: 39, realization: 35, seller: "Kolar FPO", location: "Kolar, KA", harvest: "29 Aug 2026", status: "Active" },
];

export default function AdminListingsPage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = LISTINGS_DATA.filter((l) =>
    l.crop.toLowerCase().includes(search.toLowerCase()) ||
    l.seller.toLowerCase().includes(search.toLowerCase()) ||
    l.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
              MARKETPLACE OVERSIGHT
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
              Active Produce Listings & Inventory
            </h1>
            <p className="text-xs text-[#687D6B]">
              Real-time audit of available harvest batches, price realization breakdowns, and quality grades.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Exporting Listings CSV...")}
            className="flex items-center gap-1.5 rounded-full border border-[#E2E7E2] bg-white px-4 py-2 text-xs font-bold text-[#172019] hover:bg-[#EEF7EF] transition shadow-2xs"
          >
            <Download className="size-3.5" /> Export Listings
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#687D6B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop, seller, or region..."
            className="w-full rounded-xl border border-[#E2E7E2] bg-white pl-10 pr-4 py-2.5 text-xs outline-none focus:border-[#16803A]"
          />
        </div>

        {/* Table */}
        <div className="rounded-3xl border border-[#E2E7E2] bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAF7] border-b border-[#E2E7E2] text-[#687D6B]">
                <tr>
                  <th className="p-4 font-semibold">Crop / Variety</th>
                  <th className="p-4 font-semibold">Seller / Location</th>
                  <th className="p-4 font-semibold">Grade</th>
                  <th className="p-4 font-semibold">Available Quantity</th>
                  <th className="p-4 font-semibold">Buyer Price</th>
                  <th className="p-4 font-semibold">Farmer Realization</th>
                  <th className="p-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7E2]">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-[#FAFAF7] transition">
                    <td className="p-4 font-bold text-[#172019]">{l.crop}</td>
                    <td className="p-4">
                      <p className="font-semibold text-[#172019]">{l.seller}</p>
                      <p className="text-[11px] text-[#687D6B]">{l.location}</p>
                    </td>
                    <td className="p-4">
                      <span className="rounded-md bg-[#EEF7EF] px-2 py-0.5 font-bold text-[#16803A]">
                        Grade {l.grade}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-[#172019]">{l.qty} kg</td>
                    <td className="p-4 text-[#687D6B]">₹{l.buyerPrice}/kg</td>
                    <td className="p-4 font-bold text-[#16803A]">₹{l.realization}/kg</td>
                    <td className="p-4 text-right">
                      <span className="rounded-full bg-[#EEF7EF] px-2.5 py-1 text-[10px] font-bold text-[#16803A]">
                        {l.status}
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
