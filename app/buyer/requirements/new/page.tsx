"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Layers,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { OrderService } from "@/lib/services";
import { useLanguage, rupees } from "@/components/site/language-context";
import { useAuth } from "@/components/auth/auth-context";

export default function NewBuyerRequirementPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const { user } = useAuth();

  const [produce, setProduce] = useState("Tomatoes");
  const [quantityKg, setQuantityKg] = useState(2000);
  const [grade, setGrade] = useState("A");
  const [deliveryLocation, setDeliveryLocation] = useState("Chennai Central Facility");
  const [requiredBy, setRequiredBy] = useState("2026-09-02");
  const [budgetPerKg, setBudgetPerKg] = useState(34);

  const [matchingDone, setMatchingDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  const handleMatch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMatchingDone(true);
    }, 600);
  };

  const handleConfirmOrder = async () => {
    setLoading(true);
    await OrderService.createBulkOrder({
      buyerId: user?.id || "buyer-01",
      buyerName: user?.name || "Anita Rao",
      buyerOrg: user?.organization || "ABC Grand Restaurants",
      buyerPhone: user?.phone || "+91 97100 88990",
      deliveryAddress: deliveryLocation,
      deliveryCity: "Chennai",
      productName: produce,
      requiredQuantityKg: quantityKg,
      targetPricePerKg: budgetPerKg,
    });
    setLoading(false);
    setOrderCreated(true);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#687D6B] mb-4">
          <Link href="/buyer/dashboard" className="hover:underline">
            Buyer Dashboard
          </Link>
          <ChevronRight className="size-3" />
          <span className="font-semibold text-[#172019]">Post Bulk Requirement</span>
        </div>

        <div className="border-b border-[#E2E7E2] pb-4 mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            {lang === "hi" ? "थोक खरीद मांग और आपूर्ति मिलान" : "Bulk Procurement Matching Engine"}
          </h1>
          <p className="text-xs text-[#687D6B] mt-1">
            Specify your ton-scale requirement to aggregate supply across verified regional farmer clusters.
          </p>
        </div>

        {orderCreated ? (
          <div className="rounded-3xl border border-[#16803A]/30 bg-white p-8 text-center space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
            <div className="grid size-16 place-items-center rounded-full bg-[#EEF7EF] text-[#16803A] mx-auto">
              <CheckCircle2 className="size-8 stroke-[2.5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#172019]">
              Bulk Order Confirmed & Dispatched to Roster!
            </h2>
            <p className="text-xs text-[#687D6B] max-w-md mx-auto leading-relaxed">
              Your {quantityKg.toLocaleString("en-IN")} kg requirement of {produce} has been successfully aggregated across 3 verified farms. The multi-stop pickup vehicle has been scheduled for tomorrow morning.
            </p>
            <div className="pt-3 flex justify-center gap-3">
              <Link
                href="/buyer/orders"
                className="rounded-full bg-[#16803A] px-7 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition"
              >
                Track Active Order Stepper →
              </Link>
            </div>
          </div>
        ) : !matchingDone ? (
          /* Form Screen */
          <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172019]">1. Produce Category</label>
                <select
                  value={produce}
                  onChange={(e) => setProduce(e.target.value)}
                  className="w-full rounded-xl border border-[#E2E7E2] p-2.5 text-xs font-semibold text-[#172019] outline-none focus:border-[#16803A]"
                >
                  <option value="Tomatoes">Tomatoes</option>
                  <option value="Red Onions">Red Onions</option>
                  <option value="Potatoes">Potatoes</option>
                  <option value="Basmati Rice">Basmati Rice</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172019]">2. Required Quantity (kg)</label>
                <input
                  type="number"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E2E7E2] p-2.5 text-xs font-bold text-[#172019] outline-none focus:border-[#16803A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172019]">3. Quality Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full rounded-xl border border-[#E2E7E2] p-2.5 text-xs font-semibold text-[#172019] outline-none focus:border-[#16803A]"
                >
                  <option value="A">Grade A (Premium Hotel Quality)</option>
                  <option value="B">Grade B (Retail Standard)</option>
                  <option value="Bulk">Bulk Processing</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172019]">4. Target Budget (₹/kg)</label>
                <input
                  type="number"
                  value={budgetPerKg}
                  onChange={(e) => setBudgetPerKg(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E2E7E2] p-2.5 text-xs font-bold text-[#172019] outline-none focus:border-[#16803A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172019]">5. Delivery Destination</label>
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full rounded-xl border border-[#E2E7E2] p-2.5 text-xs text-[#172019] outline-none focus:border-[#16803A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172019]">6. Required By Date</label>
                <input
                  type="date"
                  value={requiredBy}
                  onChange={(e) => setRequiredBy(e.target.value)}
                  className="w-full rounded-xl border border-[#E2E7E2] p-2.5 text-xs text-[#172019] outline-none focus:border-[#16803A]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleMatch}
                disabled={loading}
                className="flex items-center gap-2 rounded-full bg-[#16803A] px-8 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
              >
                <Sparkles className="size-3.5" />
                {loading ? "Matching Regional Supply..." : "Run AI Supply Match"}
              </button>
            </div>
          </div>
        ) : (
          /* Matching Output Screen */
          <div className="rounded-3xl border border-[#16803A]/30 bg-white p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
                  MATCHING RESULT
                </span>
                <h3 className="font-serif text-xl font-bold text-[#172019]">
                  Requirement: {quantityKg.toLocaleString("en-IN")} kg {produce}
                </h3>
              </div>
              <span className="rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-bold text-[#16803A]">
                100% Matched (3 Sellers)
              </span>
            </div>

            {/* Matched Clusters */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-[#172019]">Allocated Supply Clusters:</p>
              <div className="rounded-2xl border border-[#E2E7E2] divide-y divide-[#E2E7E2] overflow-hidden bg-[#FAFAF7] text-xs">
                <div className="p-3.5 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#172019]">ABC FPO (Ramesh Kumar)</p>
                    <p className="text-[11px] text-[#687D6B]">📍 Kanchipuram · Grade {grade} · Harvest 28 Aug</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#16803A]">800 kg</p>
                    <span className="text-[10px] text-[#687D6B]">₹31/kg</span>
                  </div>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#172019]">GreenFields FPO (Suresh Reddy)</p>
                    <p className="text-[11px] text-[#687D6B]">📍 Walajabad · Grade {grade} · Harvest 29 Aug</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#16803A]">700 kg</p>
                    <span className="text-[10px] text-[#687D6B]">₹32/kg</span>
                  </div>
                </div>
                <div className="p-3.5 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#172019]">Ramesh Farm (Venkatesh Babu)</p>
                    <p className="text-[11px] text-[#687D6B]">📍 Chengalpattu · Grade {grade} · Harvest 29 Aug</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#16803A]">500 kg</p>
                    <span className="text-[10px] text-[#687D6B]">₹31/kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Route & Delivery Summary */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-[#FAFAF7] p-3 border border-[#E2E7E2]">
                <span className="text-[#687D6B]">Estimated Coordinated Route:</span>
                <p className="font-bold text-[#172019]">124 km (4h 20m)</p>
              </div>
              <div className="rounded-xl bg-[#FAFAF7] p-3 border border-[#E2E7E2]">
                <span className="text-[#687D6B]">Estimated Delivery Window:</span>
                <p className="font-bold text-[#16803A]">Tomorrow, 08:45 AM</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setMatchingDone(false)}
                className="rounded-full border border-[#E2E7E2] px-6 py-2 text-xs font-semibold text-[#172019] hover:bg-[#FAFAF7]"
              >
                Modify Requirement
              </button>
              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={loading}
                className="rounded-full bg-[#16803A] px-8 py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
              >
                {loading ? "Confirming..." : "Confirm & Schedule Multi-Stop Pickup"}
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
