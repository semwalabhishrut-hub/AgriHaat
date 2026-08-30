"use client";

import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  percentage: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ percentage, label, className = "" }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {label && <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground"><span>{label}</span><span className="font-medium text-foreground">{percentage}%</span></div>}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2E7E2]">
        <div
          className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: visible ? `${percentage}%` : "0%" }}
        />
      </div>
    </div>
  );
}
