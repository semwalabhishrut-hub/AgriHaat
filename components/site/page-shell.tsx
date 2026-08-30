"use client";

import { Navbar } from "@/components/landing/navbar";
import { LanguageToggle, useLanguage, rupees } from "@/components/site/language-context";

export function PageShell({ children }: { children: React.ReactNode }) { return <main className="min-h-screen overflow-x-hidden bg-background"><Navbar />{children}</main>; }

export function PageSkeleton({ eyebrow, title, description, cards = 3 }: { eyebrow: string; title: string; description: string; cards?: number }) {
  const { lang } = useLanguage();
  const isHindi = lang === "hi";
  const labels = isHindi ? ["आने वाला फीचर", "डैशबोर्ड तैयारी में", "पारदर्शी कीमत", "स्थानीय मांग"] : ["Coming soon", "Workspace ready", "Price transparency", "Local demand"];
  return <><section className="mx-auto max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pb-20 lg:pt-36"><div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p><h1 className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p></div><LanguageToggle /></div><div className="mt-14 grid gap-5 md:grid-cols-3">{Array.from({ length: cards }).map((_, index) => <div key={index} className="min-h-64 rounded-2xl border border-border bg-card p-6 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wider text-primary">{labels[index % labels.length]}</p><h2 className="mt-8 font-serif text-2xl">{index === 0 ? (isHindi ? "आपकी जगह तैयार है" : "Your place is ready") : index === 1 ? `${rupees(32)} / kg` : (isHindi ? "मांग संकेत" : "Demand signals")}</h2><div className="mt-4 h-3 w-full rounded-full bg-muted" /><div className="mt-2 h-3 w-5/6 rounded-full bg-muted" /><div className="mt-10 h-20 rounded-xl border border-dashed border-border bg-background" /></div>)}</div></section><section className="border-t border-border bg-[#edf6ef] py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-5 md:grid-cols-2"><div className="h-52 rounded-2xl border border-border bg-card" /><div className="h-52 rounded-2xl border border-border bg-card" /></div></div></section></>;
}

export function PageLabel({ children }: { children: React.ReactNode }) { return <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">{children}</span>; }
