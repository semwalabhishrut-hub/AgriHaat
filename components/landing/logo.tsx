"use client";

// ─── Farm2Market AI Logo ───
// Leaf + sun + field + road/flow lines motif

interface LogoProps {
  className?: string;
  size?: number;
}

function LogoIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Sun circle */}
      <circle cx="24" cy="14" r="6" fill="#16A34A" opacity="0.3" />
      {/* Field / ground */}
      <path d="M4 36 C12 28, 20 30, 24 26 C28 30, 36 28, 44 36" stroke="#16803A" strokeWidth="2" fill="none" />
      <path d="M4 40 C14 34, 22 36, 24 32 C26 36, 34 34, 44 40" stroke="#16803A" strokeWidth="1.5" fill="none" opacity="0.5" />
      {/* Main leaf */}
      <path d="M24 8 C18 14, 14 22, 24 32 C34 22, 30 14, 24 8Z" fill="#16803A" />
      {/* Leaf vein / road line */}
      <path d="M24 12 L24 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 18 L20 15" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <path d="M24 22 L28 19" stroke="white" strokeWidth="1" strokeLinecap="round" />
      {/* Sun rays */}
      <circle cx="24" cy="14" r="3" fill="#16A34A" />
    </svg>
  );
}

export function Logo({ className = "", size = 36 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon size={size} />
      <span className="text-xl font-semibold tracking-tight">
        <span className="text-[#172019]">Farm2Market </span>
        <span className="text-[#16803A]">AI</span>
      </span>
    </div>
  );
}

export function LogoMark({ size = 36 }: { size?: number }) {
  return <LogoIcon size={size} />;
}

export function LogoWithTagline({ className = "", size = 36 }: LogoProps) {
  return (
    <div className={className}>
      <Logo size={size} />
      <p className="mt-1 ml-[calc(36px+10px)] text-[11px] font-medium tracking-wide text-[#687D6B]">
        Direct Roots. Stronger Tomorrow.
      </p>
    </div>
  );
}
