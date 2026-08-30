"use client";

import { useState } from "react";
import { User, ShieldCheck, MapPin, Phone, Mail, Building2, Check, Banknote } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useAuth } from "@/components/auth/auth-context";
import { useLanguage } from "@/components/site/language-context";

export default function FarmerProfilePage() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const [saved, setSaved] = useState(false);

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            FARMER CREDENTIALS
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            Profile & Direct Bank Account Settings
          </h1>
          <p className="text-xs text-[#687D6B]">
            Manage your verified farmer producer identity, farm coordinates, and DBT bank account.
          </p>
        </div>
      </div>

      <div className="mt-8 max-w-3xl space-y-6">
        {/* Profile Card */}
        <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-[#16803A] text-white font-serif text-2xl font-bold">
              {user?.avatarLetter || "R"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-[#172019]">{user?.name || "Ramesh Kumar"}</h3>
                <span className="rounded-full bg-[#EEF7EF] px-2.5 py-0.5 text-xs font-bold text-[#16803A]">
                  ✓ Verified FPO Member
                </span>
              </div>
              <p className="text-xs text-[#687D6B] mt-0.5">{user?.organization || "ABC Farmer Producer Organization"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#172019]">Primary Mobile (SMS / OTP Verified)</label>
              <input
                type="text"
                defaultValue={user?.phone || "+91 98401 23456"}
                className="w-full rounded-xl border border-[#E2E7E2] p-2.5 outline-none focus:border-[#16803A]"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#172019]">Registered Email</label>
              <input
                type="email"
                defaultValue={user?.email || "ramesh.k@abcfpo.in"}
                className="w-full rounded-xl border border-[#E2E7E2] p-2.5 outline-none focus:border-[#16803A]"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-[#172019]">Farm Gate Pickup Address</label>
              <input
                type="text"
                defaultValue={user?.location || "Kanchipuram, Tamil Nadu - 631501"}
                className="w-full rounded-xl border border-[#E2E7E2] p-2.5 outline-none focus:border-[#16803A]"
              />
            </div>
          </div>
        </div>

        {/* Linked Bank Account */}
        <div className="rounded-3xl border border-[#16803A]/30 bg-[#EEF7EF] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#16803A]">
            <Banknote className="size-5" />
            <h3 className="font-serif text-lg font-bold text-[#172019]">
              Linked Bank Account (DBT Direct Settlement)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl bg-white p-3 border border-[#E2E7E2]">
              <span className="text-[#687D6B]">Bank Name:</span>
              <p className="font-bold text-[#172019]">State Bank of India (Kanchipuram Branch)</p>
            </div>
            <div className="rounded-xl bg-white p-3 border border-[#E2E7E2]">
              <span className="text-[#687D6B]">Account Number:</span>
              <p className="font-mono font-bold text-[#172019]">•••• •••• •••• 4892</p>
            </div>
            <div className="rounded-xl bg-white p-3 border border-[#E2E7E2]">
              <span className="text-[#687D6B]">IFSC Code:</span>
              <p className="font-mono font-bold text-[#172019]">SBIN0001234</p>
            </div>
            <div className="rounded-xl bg-white p-3 border border-[#E2E7E2]">
              <span className="text-[#687D6B]">Aadhaar Seeding Status:</span>
              <p className="font-bold text-[#16803A]">✓ Active DBT Linked</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
