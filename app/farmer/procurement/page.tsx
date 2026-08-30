"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  ShieldCheck,
  Plus,
  QrCode,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { ProcurementService } from "@/lib/services";
import { type ProcurementCentre, type ProcurementBooking } from "@/lib/store";
import { useLanguage, rupees } from "@/components/site/language-context";

export default function FarmerProcurementPage() {
  const { lang } = useLanguage();
  const [centres, setCentres] = useState<ProcurementCentre[]>([]);
  const [bookings, setBookings] = useState<ProcurementBooking[]>([]);

  useEffect(() => {
    ProcurementService.getCentres().then(setCentres);
    ProcurementService.getBookings().then(setBookings);
  }, []);

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            {lang === "hi" ? "सरकारी व संरचित खरीद केंद्र" : "STRUCTURED PROCUREMENT CENTRES"}
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            {lang === "hi" ? "खरीद केंद्र स्लॉट व कतार प्रबंधन" : "Procurement Slot & Queue Manager"}
          </h1>
          <p className="text-xs text-[#687D6B]">
            {lang === "hi"
              ? "नजदीकी खरीद केंद्र खोजें, स्लॉट बुक करें, लाइव टोकन कतार देखें और भुगतान ट्रैक करें।"
              : "Book procurement slots, avoid physical waiting lines with digital tokens, and track payment status."}
          </p>
        </div>

        <Link
          href="/farmer/procurement/book"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#16803A] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
        >
          <Plus className="size-4" />
          {lang === "hi" ? "नया स्लॉट बुक करें" : "Book Procurement Slot"}
        </Link>
      </div>

      {/* Active Booking Banner (if any) */}
      {bookings.length > 0 && (
        <div className="mt-8 rounded-3xl border border-[#16803A]/30 bg-[#EEF7EF] p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="grid size-12 place-items-center rounded-2xl bg-[#16803A] text-white font-bold text-lg">
                #{bookings[0].tokenNumber}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
                  ACTIVE TOKEN PASS
                </span>
                <h3 className="font-serif text-lg font-bold text-[#172019]">
                  {bookings[0].centreName}
                </h3>
                <p className="text-xs text-[#687D6B]">
                  Slot: <strong>{bookings[0].date} ({bookings[0].timeSlot})</strong> · {bookings[0].produceName} ({bookings[0].expectedQuantityKg} kg)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:text-right">
              <div className="rounded-xl bg-white px-3 py-2 border border-[#E2E7E2] text-xs">
                <span className="text-[10px] text-[#687D6B]">Queue Ahead</span>
                <p className="font-bold text-[#16803A]">{bookings[0].farmersAhead} farmers</p>
              </div>
              <Link
                href={`/farmer/procurement/${bookings[0].id}`}
                className="inline-flex items-center gap-1 rounded-full bg-[#172019] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#172019]/90 transition"
              >
                Live Queue Pass <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Nearby Centres Section */}
      <div className="mt-10">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#687D6B] mb-4">
          {lang === "hi" ? "नजदीकी खरीद केंद्र (दूरी व प्रतीक्षा समय)" : "NEARBY PARTICIPATING PROCUREMENT CENTRES"}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {centres.map((c) => (
            <div
              key={c.id}
              className="rounded-3xl border border-[#E2E7E2] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#172019]">
                      {lang === "hi" ? c.nameHi : c.name}
                    </h3>
                    <p className="text-xs text-[#687D6B] flex items-center gap-1 mt-1">
                      <MapPin className="size-3 text-[#16803A]" /> {c.distanceKm} km away · {c.district}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#EEF7EF] px-2.5 py-0.5 text-xs font-bold text-[#16803A]">
                    {c.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-[#FAFAF7] p-2.5 border border-[#E2E7E2]">
                    <span className="text-[#687D6B]">Slots Today:</span>
                    <p className="font-bold text-[#172019] text-sm">{c.availableSlotsToday} available</p>
                  </div>
                  <div className="rounded-xl bg-[#FAFAF7] p-2.5 border border-[#E2E7E2]">
                    <span className="text-[#687D6B]">Avg Wait Time:</span>
                    <p className="font-bold text-[#16803A] text-sm">~{c.avgWaitTimeMinutes} mins</p>
                  </div>
                </div>

                <div className="text-xs text-[#687D6B] space-y-1 border-t border-[#E2E7E2] pt-3">
                  <p>Operating: <strong className="text-[#172019]">{c.operatingHours}</strong></p>
                  <p>Serving Token: <strong className="text-[#16803A]">#{c.nowServingToken}</strong> (Queue: {c.currentQueueCount} waiting)</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E2E7E2]">
                <Link
                  href={`/farmer/procurement/book?centreId=${c.id}`}
                  className="flex w-full items-center justify-center gap-1 rounded-full bg-[#16803A] py-2 text-xs font-bold text-white hover:bg-[#16803A]/90 transition"
                >
                  Book Slot at this Centre <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
