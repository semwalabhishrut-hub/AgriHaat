"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserCheck,
  Shield,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  Sprout,
  ShoppingBag,
  Truck,
  Building2,
} from "lucide-react";
import { Logo } from "@/components/landing/logo";
import { useAuth, type UserRole } from "@/components/auth/auth-context";
import { useLanguage } from "@/components/site/language-context";

export default function LoginPage() {
  const router = useRouter();
  const { loginAs } = useAuth();
  const { lang } = useLanguage();

  const [email, setEmail] = useState("ramesh.k@abcfpo.in");
  const [password, setPassword] = useState("••••••••");

  const handleDemoLogin = (role: UserRole) => {
    loginAs(role);
    if (role === "farmer") router.push("/farmer/dashboard");
    else if (role === "buyer") router.push("/buyer/dashboard");
    else if (role === "hub") router.push("/logistics/dashboard");
    else if (role === "admin") router.push("/admin/dashboard");
    else router.push("/farmer/dashboard");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDemoLogin("farmer");
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#172019] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Brand Bar */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link href="/">
          <Logo size={32} />
        </Link>
        <Link href="/" className="text-xs font-semibold text-[#687D6B] hover:text-[#172019]">
          Back to Home
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-8 bg-white rounded-3xl border border-[#E2E7E2] p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
            FARM2MARKET SECURE LOGIN
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#172019] mt-1">
            {lang === "hi" ? "प्लेटफ़ॉर्म में प्रवेश करें" : "Sign In to Your Workspace"}
          </h1>
          <p className="text-xs text-[#687D6B] mt-0.5">
            Select a role to test the live agricultural platform instantly.
          </p>
        </div>

        {/* 1-Click Quick Demo Sandbox Selectors */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-[#172019]">1-Click Quick Demo Login:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("farmer")}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#16803A]/30 bg-[#EEF7EF] text-left hover:bg-[#16803A] hover:text-white transition group"
            >
              <Sprout className="size-4 text-[#16803A] group-hover:text-white" />
              <div>
                <p className="font-bold text-xs">Demo Farmer</p>
                <p className="text-[10px] text-[#687D6B] group-hover:text-white/80">Ramesh (500 kg)</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("buyer")}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E2E7E2] bg-[#FAFAF7] text-left hover:bg-[#172019] hover:text-white transition group"
            >
              <ShoppingBag className="size-4 text-[#172019] group-hover:text-white" />
              <div>
                <p className="font-bold text-xs">Demo Buyer</p>
                <p className="text-[10px] text-[#687D6B] group-hover:text-white/80">Anita (2,000 kg)</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("hub")}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E2E7E2] bg-[#FAFAF7] text-left hover:bg-[#16A34A] hover:text-white transition group"
            >
              <Truck className="size-4 text-[#16803A] group-hover:text-white" />
              <div>
                <p className="font-bold text-xs">Demo Logistics</p>
                <p className="text-[10px] text-[#687D6B] group-hover:text-white/80">Hub Route (124 km)</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E2E7E2] bg-[#FAFAF7] text-left hover:bg-[#07110B] hover:text-white transition group"
            >
              <Building2 className="size-4 text-[#172019] group-hover:text-white" />
              <div>
                <p className="font-bold text-xs">Demo Admin</p>
                <p className="text-[10px] text-[#687D6B] group-hover:text-white/80">Government Ops</p>
              </div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#E2E7E2] w-full" />
          <span className="bg-white px-3 text-[11px] text-[#687D6B] uppercase font-semibold">Or Email Login</span>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleFormSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#172019]">Registered Email / Phone</label>
            <div className="flex items-center gap-2 rounded-xl border border-[#E2E7E2] px-3.5 py-2.5 text-xs">
              <Mail className="size-4 text-[#687D6B]" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 outline-none text-[#172019]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#172019]">Password</label>
            <div className="flex items-center gap-2 rounded-xl border border-[#E2E7E2] px-3.5 py-2.5 text-xs">
              <Lock className="size-4 text-[#687D6B]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 outline-none text-[#172019]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#16803A] py-3 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
          >
            Enter Platform <ArrowRight className="size-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-[#687D6B]">
          Don't have an account?{" "}
          <Link href="/auth/register" className="font-bold text-[#16803A] hover:underline">
            Register New Farm / Business
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#687D6B]">
        Farm2Market AI · Ministry of Consumer Affairs Problem Statement 26033/26032
      </div>
    </div>
  );
}
