"use client";

import { useAuth } from "@/components/auth/auth-context";
import { useLanguage } from "@/components/site/language-context";
import { AppShell } from "@/components/app/app-shell";
import { Building2, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";

export default function BuyerProfilePage() {
  const { user } = useAuth();
  const { lang } = useLanguage();

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            BUYER BUSINESS PROFILE
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            Procurement Organization & Delivery Gates
          </h1>
          <p className="text-xs text-[#687D6B]">
            Manage institutional purchasing credentials, GST verification, and central kitchen gate coordinates.
          </p>
        </div>
      </div>

      <div className="mt-8 max-w-3xl space-y-6">
        <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-[#172019] text-white font-serif text-2xl font-bold">
              {user?.avatarLetter || "A"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-[#172019]">{user?.organization || "ABC Grand Hotels & Restaurants"}</h3>
                <span className="rounded-full bg-[#EEF7EF] px-2.5 py-0.5 text-xs font-bold text-[#16803A]">
                  ✓ Verified Commercial Buyer
                </span>
              </div>
              <p className="text-xs text-[#687D6B] mt-0.5">Primary Contact: {user?.name || "Anita Rao"} (Procurement Head)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#172019]">Business GSTIN</label>
              <input
                type="text"
                defaultValue="33AAACA9821R1Z8"
                className="w-full rounded-xl border border-[#E2E7E2] p-2.5 outline-none focus:border-[#16803A]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#172019]">Contact Number</label>
              <input
                type="text"
                defaultValue={user?.phone || "+91 97100 88990"}
                className="w-full rounded-xl border border-[#E2E7E2] p-2.5 outline-none focus:border-[#16803A]"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-[#172019]">Central Receiving Facility Address</label>
              <input
                type="text"
                defaultValue="No. 42 Anna Salai, Thousand Lights, Chennai - 600006"
                className="w-full rounded-xl border border-[#E2E7E2] p-2.5 outline-none focus:border-[#16803A]"
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
