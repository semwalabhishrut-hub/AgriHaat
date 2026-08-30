"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CalendarCheck,
  MapPin,
  Clock,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  QrCode,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { ProcurementService } from "@/lib/services";
import { type ProcurementCentre } from "@/lib/store";
import { useLanguage, rupees } from "@/components/site/language-context";
import { useAuth } from "@/components/auth/auth-context";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCentreId = searchParams.get("centreId") || "proc-centre-01";

  const { lang } = useLanguage();
  const { user } = useAuth();

  const [centres, setCentres] = useState<ProcurementCentre[]>([]);
  const [selectedCentreId, setSelectedCentreId] = useState<string>(initialCentreId);
  const [bookingDate, setBookingDate] = useState<string>("2026-08-30");
  const [timeSlot, setTimeSlot] = useState<string>("10:30 AM – 11:00 AM");
  const [produceName, setProduceName] = useState<string>("Tomatoes");
  const [quantityKg, setQuantityKg] = useState<number>(500);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingResult, setBookingResult] = useState<any>(null);

  useEffect(() => {
    ProcurementService.getCentres().then(setCentres);
  }, []);

  const selectedCentre = centres.find((c) => c.id === selectedCentreId) || centres[0];

  const handleBook = async () => {
    setLoading(true);
    const booking = await ProcurementService.bookSlot({
      farmerId: user?.id || "farmer-01",
      farmerName: user?.name || "Ramesh Kumar",
      farmerPhone: user?.phone || "+91 98401 23456",
      centreId: selectedCentreId,
      date: bookingDate,
      timeSlot,
      produceName,
      expectedQuantityKg: quantityKg,
      ratePerKg: 32,
    });
    setLoading(false);
    setBookingResult(booking);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#687D6B] mb-4">
        <Link href="/farmer/procurement" className="hover:underline">
          Procurement Centres
        </Link>
        <ChevronRight className="size-3" />
        <span className="font-semibold text-[#172019]">Book Procurement Slot</span>
      </div>

      {bookingResult ? (
        /* Booking Confirmation Pass */
        <div className="rounded-3xl border border-[#16803A]/30 bg-white p-6 sm:p-8 shadow-lg text-center space-y-5 animate-in zoom-in-95 duration-200">
          <div className="grid size-16 place-items-center rounded-2xl bg-[#16803A] text-white mx-auto font-serif text-2xl font-bold">
            #{bookingResult.tokenNumber}
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
              SLOT CONFIRMED · TOKEN ALLOCATED
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#172019] mt-1">
              Booking Ref: {bookingResult.bookingCode}
            </h2>
            <p className="text-xs text-[#687D6B] mt-1">
              {bookingResult.centreName}
            </p>
          </div>

          {/* QR Code demo */}
          <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#E2E7E2] inline-block mx-auto">
            <img
              src={bookingResult.qrCodeUrl}
              alt="Procurement Check-in QR"
              className="size-36 object-contain mx-auto"
            />
            <p className="mt-2 text-[10px] text-[#687D6B]">Show at Centre Gate for Fast Check-In</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-left max-w-md mx-auto">
            <div className="rounded-xl bg-[#FAFAF7] p-3 border border-[#E2E7E2]">
              <span className="text-[#687D6B]">Slot Time:</span>
              <p className="font-bold text-[#172019]">{bookingResult.date} ({bookingResult.timeSlot})</p>
            </div>
            <div className="rounded-xl bg-[#FAFAF7] p-3 border border-[#E2E7E2]">
              <span className="text-[#687D6B]">Estimated Wait:</span>
              <p className="font-bold text-[#16803A]">~{bookingResult.estimatedWaitMinutes} mins ({bookingResult.farmersAhead} ahead)</p>
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Link
              href={`/farmer/procurement/${bookingResult.id}`}
              className="rounded-full bg-[#16803A] px-7 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition"
            >
              Open Live Queue Tracker →
            </Link>
          </div>
        </div>
      ) : (
        /* Form */
        <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#172019]">
              {lang === "hi" ? "खरीद केंद्र स्लॉट बुक करें" : "Book Structured Procurement Slot"}
            </h1>
            <p className="text-xs text-[#687D6B] mt-1">
              Avoid mandi congestion with scheduled arrival tokens and queue time estimates.
            </p>
          </div>

          {/* 1. Centre Select */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#172019]">1. Select Procurement Centre</label>
            <select
              value={selectedCentreId}
              onChange={(e) => setSelectedCentreId(e.target.value)}
              className="w-full rounded-xl border border-[#E2E7E2] bg-white p-3 text-xs font-semibold text-[#172019] outline-none focus:border-[#16803A]"
            >
              {centres.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.distanceKm} km · {c.availableSlotsToday} slots open)
                </option>
              ))}
            </select>
            {selectedCentre && (
              <p className="text-[11px] text-[#687D6B]">📍 {selectedCentre.address}</p>
            )}
          </div>

          {/* 2. Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#172019]">2. Appointment Date</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2E7E2] p-2.5 text-xs text-[#172019] outline-none focus:border-[#16803A]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#172019]">3. Preferred Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full rounded-xl border border-[#E2E7E2] p-2.5 text-xs text-[#172019] outline-none focus:border-[#16803A]"
              >
                <option value="09:00 AM – 09:30 AM">09:00 AM – 09:30 AM</option>
                <option value="10:30 AM – 11:00 AM">10:30 AM – 11:00 AM (Recommended)</option>
                <option value="11:30 AM – 12:00 PM">11:30 AM – 12:00 PM</option>
                <option value="02:30 PM – 03:00 PM">02:30 PM – 03:00 PM</option>
              </select>
            </div>
          </div>

          {/* 3. Produce and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#172019]">4. Produce Variety</label>
              <select
                value={produceName}
                onChange={(e) => setProduceName(e.target.value)}
                className="w-full rounded-xl border border-[#E2E7E2] p-2.5 text-xs text-[#172019] outline-none focus:border-[#16803A]"
              >
                <option value="Tomatoes">Tomatoes</option>
                <option value="Paddy / Rice">Paddy / Rice</option>
                <option value="Red Onions">Red Onions</option>
                <option value="Millets">Millets</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#172019]">5. Est. Quantity (kg)</label>
              <input
                type="number"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full rounded-xl border border-[#E2E7E2] p-2.5 text-xs text-[#172019] outline-none focus:border-[#16803A]"
              />
            </div>
          </div>

          {/* Estimated Payout Info */}
          <div className="rounded-2xl border border-[#16803A]/20 bg-[#EEF7EF] p-4 space-y-1 text-xs">
            <div className="flex justify-between font-bold text-[#172019]">
              <span>Government Benchmark Procurement Rate:</span>
              <span className="text-[#16803A]">₹32/kg</span>
            </div>
            <div className="flex justify-between text-[#687D6B]">
              <span>Estimated Direct Bank Payout:</span>
              <span>{rupees(quantityKg * 32)} (Subject to weighing & quality test)</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/farmer/procurement"
              className="rounded-full border border-[#E2E7E2] px-6 py-2.5 text-xs font-semibold text-[#172019] hover:bg-[#FAFAF7]"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={handleBook}
              disabled={loading}
              className="rounded-full bg-[#16803A] px-8 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
            >
              {loading ? "Generating Token..." : "Confirm & Generate Token Pass"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProcurementBookingPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-12 text-center text-xs text-[#687D6B]">Loading booking form...</div>}>
        <BookingForm />
      </Suspense>
    </AppShell>
  );
}
