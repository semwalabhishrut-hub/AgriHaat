"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  stagger?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  stagger = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const totalDelay = delay + stagger * 100;

    const transforms: Record<string, string> = {
      up: "translateY(24px)",
      left: "translateX(24px)",
      right: "translateX(-24px)",
    };

    el.style.opacity = "0";
    el.style.transform = transforms[direction];
    el.style.transition = `opacity 0.6s ease ${totalDelay}ms, transform 0.6s ease ${totalDelay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
