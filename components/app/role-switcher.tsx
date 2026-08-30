"use client";

import { useState } from "react";
import { UserCheck, Shield, ChevronDown, Check } from "lucide-react";
import { useAuth, type UserRole } from "@/components/auth/auth-context";
import { useLanguage } from "@/components/site/language-context";
import { useRouter } from "next/navigation";

const ROLE_CONFIG: Record<
  UserRole,
  { label: string; labelHi: string; desc: string; route: string; color: string }
> = {
  farmer: {
    label: "Farmer / Seller",
    labelHi: "किसान / विक्रेता",
    desc: "List produce, view expected realization, book procurement slots",
    route: "/farmer/dashboard",
    color: "bg-[#16803A] text-white",
  },
  buyer: {
    label: "Buyer / Restaurant",
    labelHi: "खरीदार / रेस्तरां",
    desc: "Bulk procurement, demand aggregation, direct sourcing",
    route: "/buyer/dashboard",
    color: "bg-[#172019] text-white",
  },
  hub: {
    label: "Logistics Partner",
    labelHi: "लॉजिस्टिक्स पार्टनर",
    desc: "Multi-stop routes, vehicle capacity, dispatch tracking",
    route: "/logistics/dashboard",
    color: "bg-[#16A34A] text-white",
  },
  admin: {
    label: "Central Admin",
    labelHi: "केंद्रीय व्यवस्थापक",
    desc: "Platform health, user & listing audits, AI oversight",
    route: "/admin/dashboard",
    color: "bg-[#07110B] text-white",
  },
};

export function RoleSwitcherBadge() {
  const { user, loginAs } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const currentRole = user?.role || "farmer";
  const config = ROLE_CONFIG[currentRole];

  const handleSelect = (role: UserRole) => {
    loginAs(role);
    setOpen(false);
    router.push(ROLE_CONFIG[role].route);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-[#E2E7E2] bg-white px-3 py-1.5 text-xs font-semibold text-[#172019] shadow-2xs hover:bg-[#EEF7EF] transition"
        aria-label="Switch active user role"
      >
        <span className="size-2 rounded-full bg-[#16803A] animate-pulse" />
        <span>{lang === "hi" ? config.labelHi : config.label}</span>
        <ChevronDown className="size-3.5 text-[#687D6B]" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-72 overflow-hidden rounded-2xl border border-[#E2E7E2] bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-3 py-2 border-b border-[#E2E7E2] text-xs">
              <p className="font-bold text-[#172019]">Switch Role / Perspective</p>
              <p className="text-[11px] text-[#687D6B]">1-Click Demo Sandbox Switching</p>
            </div>
            <div className="mt-1 space-y-1">
              {(Object.keys(ROLE_CONFIG) as UserRole[]).map((r) => {
                const isSelected = r === currentRole;
                const rConf = ROLE_CONFIG[r];
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleSelect(r)}
                    className={`flex w-full items-start gap-2.5 rounded-xl p-2.5 text-left text-xs transition ${
                      isSelected ? "bg-[#EEF7EF] text-[#16803A]" : "hover:bg-[#FAFAF7] text-[#172019]"
                    }`}
                  >
                    <div className="mt-0.5 grid size-5 place-items-center rounded-full bg-[#16803A]/10 text-[#16803A]">
                      {isSelected ? <Check className="size-3.5" /> : <UserCheck className="size-3" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">{lang === "hi" ? rConf.labelHi : rConf.label}</p>
                      <p className="text-[10px] text-[#687D6B] line-clamp-1">{rConf.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
