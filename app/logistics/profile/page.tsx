"use client";

import { useState } from "react";
import {
  User,
  Truck,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Save,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useAuth } from "@/components/auth/auth-context";
import { useLanguage } from "@/components/site/language-context";

export default function LogisticsProfilePage() {
  const { user } = useAuth();
  const { lang } = useLanguage();

  const [name, setName] = useState(user?.name || "Murugan Swaminathan");
  const [org, setOrg] = useState(user?.organization || "Kanchipuram Coordinated Dispatch Hub");
  const [phone, setPhone] = useState(user?.phone || "+91 98410 44332");
  const [fleetSize, setFleetSize] = useState("12 Reefer Trucks (3T – 5T)");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="pb-6 border-b border-[#E2E7E2]">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            PARTNER PROFILE
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            Logistics Fleet Partner Account
          </h1>
          <p className="text-xs text-[#687D6B]">
            Manage fleet operations, vehicle registration details, and route coordination settings.
          </p>
        </div>

        <form onSubmit={handleSave} className="rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl bg-[#EEF7EF] text-[#16803A] text-2xl font-bold">
              {name[0]}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#172019]">{name}</h3>
              <p className="text-xs text-[#687D6B]">{org}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-[#16803A]">
                <CheckCircle2 className="size-3.5" /> Verified Logistics Fleet Partner
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#172019]">Fleet Manager Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[#E2E7E2] px-3.5 py-2.5 outline-none focus:border-[#16803A]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#172019]">Fleet / Logistics Organization</label>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full rounded-xl border border-[#E2E7E2] px-3.5 py-2.5 outline-none focus:border-[#16803A]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#172019]">Dispatch Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-[#E2E7E2] px-3.5 py-2.5 outline-none focus:border-[#16803A]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#172019]">Registered Vehicles & Capacity</label>
              <input
                type="text"
                value={fleetSize}
                onChange={(e) => setFleetSize(e.target.value)}
                className="w-full rounded-xl border border-[#E2E7E2] px-3.5 py-2.5 outline-none focus:border-[#16803A]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E7E2] flex items-center justify-between">
            {saved ? (
              <span className="text-xs text-[#16803A] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="size-4" /> Profile Updated Successfully
              </span>
            ) : (
              <span className="text-xs text-[#687D6B]">All fleet dispatches are authenticated</span>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-[#16803A] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
            >
              <Save className="size-3.5" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
