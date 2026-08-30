"use client";

import { useState } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sprout,
  ShoppingBag,
  Filter,
  Download,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage } from "@/components/site/language-context";

const USERS_DATA = [
  { id: "usr-01", name: "Ramesh Kumar", role: "Farmer", org: "ABC FPO", location: "Kanchipuram, TN", phone: "+91 98401 23456", verified: true, joined: "12 May 2026", status: "Active" },
  { id: "usr-02", name: "Venkatesh Naidu", role: "Farmer", org: "GreenFields FPO", location: "Nellore, AP", phone: "+91 98480 11223", verified: true, joined: "18 May 2026", status: "Active" },
  { id: "usr-03", name: "Anita Rao", role: "Buyer", org: "ABC Grand Hotels", location: "Thousand Lights, Chennai", phone: "+91 97100 88990", verified: true, joined: "02 Jun 2026", status: "Active" },
  { id: "usr-04", name: "Rajesh Mehra", role: "Buyer", org: "FreshChoice Hypermarkets", location: "T Nagar, Chennai", phone: "+91 98110 33441", verified: true, joined: "10 Jun 2026", status: "Active" },
  { id: "usr-05", name: "Murugan Swaminathan", role: "Logistics Hub", org: "Kanchi Logistics Fleet", location: "Walajabad, TN", phone: "+91 98410 44332", verified: true, joined: "14 Jun 2026", status: "Active" },
  { id: "usr-06", name: "Gurpreet Singh", role: "Farmer", org: "Punjab Agri FPO", location: "Karnal, HR", phone: "+91 98140 55667", verified: true, joined: "20 Jun 2026", status: "Active" },
  { id: "usr-07", name: "Siddharth Varma", role: "Buyer", org: "CureFoods Kitchens", location: "Bengaluru, KA", phone: "+91 98860 11992", verified: true, joined: "24 Jun 2026", status: "Active" },
];

export default function AdminUsersPage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = USERS_DATA.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.org.toLowerCase().includes(search.toLowerCase()) || u.location.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role.toLowerCase().includes(roleFilter.toLowerCase());
    return matchSearch && matchRole;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
              ADMIN USER MANAGEMENT
            </span>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
              Verified Platform Users & Organizations
            </h1>
            <p className="text-xs text-[#687D6B]">
              Direct management of authenticated farmers, FPOs, buyers, and logistics partners.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Exporting Users Roster CSV...")}
            className="flex items-center gap-1.5 rounded-full border border-[#E2E7E2] bg-white px-4 py-2 text-xs font-bold text-[#172019] hover:bg-[#EEF7EF] transition shadow-2xs"
          >
            <Download className="size-3.5" /> Export Roster
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#687D6B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, organization, phone, or location..."
              className="w-full rounded-xl border border-[#E2E7E2] bg-white pl-10 pr-4 py-2.5 text-xs outline-none focus:border-[#16803A]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {["All", "Farmer", "Buyer", "Logistics"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRoleFilter(r)}
                className={`flex-1 sm:flex-initial rounded-xl px-4 py-2 text-xs font-bold transition ${
                  roleFilter === r
                    ? "bg-[#16803A] text-white"
                    : "border border-[#E2E7E2] bg-white text-[#687D6B] hover:bg-[#FAFAF7]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-3xl border border-[#E2E7E2] bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFAF7] border-b border-[#E2E7E2] text-[#687D6B]">
                <tr>
                  <th className="p-4 font-semibold">User / Org</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Contact</th>
                  <th className="p-4 font-semibold">Verification</th>
                  <th className="p-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7E2]">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FAFAF7] transition">
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="grid size-8 place-items-center rounded-full bg-[#EEF7EF] text-[#16803A] font-bold text-xs">
                          {u.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-[#172019]">{u.name}</p>
                          <p className="text-[11px] text-[#687D6B]">{u.org}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="rounded-md bg-gray-100 px-2 py-0.5 font-semibold text-[#172019]">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-[#687D6B]">{u.location}</td>
                    <td className="p-4 font-mono text-[#687D6B]">{u.phone}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-[#16803A] font-bold">
                        <CheckCircle2 className="size-3.5" /> Verified
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className="rounded-full bg-[#EEF7EF] px-2.5 py-1 text-[10px] font-bold text-[#16803A]">
                        {u.status}
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
