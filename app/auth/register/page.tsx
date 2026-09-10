"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, UserRole } from "@/components/auth/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAuth();
  const [role, setRole] = useState<UserRole>("farmer");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    organization: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerUser({
      name: formData.name,
      phone: formData.phone,
      password: formData.password,
      email: `${formData.phone}@agrihaat.user`,
      role,
      organization: formData.organization,
      location: formData.location,
    });

    if (role === "farmer") router.push("/farmer/dashboard");
    else if (role === "buyer") router.push("/buyer/dashboard");
    else if (role === "hub") router.push("/logistics/dashboard");
    else router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-6 rounded-2xl border border-[#E2E7E2] shadow-sm space-y-4">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl text-[#172019]">
            <img src="/agrihaat-logo.jpeg" alt="AgriHaat" className="h-9 w-9 rounded-lg object-cover" />
            <span>AgriHaat AI</span>
          </Link>
          <h2 className="mt-3 text-xl font-bold text-[#172019]">Create Your Account</h2>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold text-[#172019] mb-1">Select Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(["farmer", "buyer", "hub"] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 text-[11px] font-bold rounded-xl border capitalize ${
                    role === r ? "bg-[#16803A] text-white border-[#16803A]" : "bg-white text-[#687D6B] border-[#E2E7E2]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#172019]">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Kumar"
              className="w-full mt-1 p-2.5 text-xs border border-[#E2E7E2] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#172019]">Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98401 23456"
              className="w-full mt-1 p-2.5 text-xs border border-[#E2E7E2] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#172019]">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create password"
              className="w-full mt-1 p-2.5 text-xs border border-[#E2E7E2] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#172019]">Organization / Farm</label>
            <input
              type="text"
              required
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              placeholder="Farm or Business Name"
              className="w-full mt-1 p-2.5 text-xs border border-[#E2E7E2] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#172019]">Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="District, State"
              className="w-full mt-1 p-2.5 text-xs border border-[#E2E7E2] rounded-lg"
            />
          </div>

          <button type="submit" className="w-full py-2.5 bg-[#16803A] text-white text-xs font-bold rounded-full mt-2 hover:bg-[#12682F]">
            Sign Up & Complete Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-[11px] text-[#687D6B]">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-bold text-[#16803A] hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}