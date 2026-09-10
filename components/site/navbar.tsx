"use client";

import Link from "next/link";
import { useAuth } from "@/components/site/auth-context"; // Or your current user state/store hook
import { User, LogIn } from "lucide-react";

export function Navbar() {
  // Replace direct hardcoded mock user with conditional auth state
  const { user, isAuthenticated } = useAuth(); // or check if logged in

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E2E7E2]">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#172019]">
        <img src="/agrihaat-logo.jpeg" alt="AgriHaat" className="h-8 w-8 rounded-md object-cover" />
        <span>AgriHaat AI</span>
      </Link>

      <nav className="flex items-center gap-4">
        {isAuthenticated && user ? (
          /* Profile view for logged-in user */
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEF7EF] text-xs font-semibold text-[#16803A]">
            <User className="h-4 w-4" />
            <span>{user.name}</span>
          </div>
        ) : (
          /* Generalized view for public landing page visitors */
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-xs font-bold text-[#16803A] border border-[#16803A] px-4 py-2 rounded-lg hover:bg-[#EEF7EF] transition"
            >
              <LogIn className="h-4 w-4" />
              <span>Login / Register</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}