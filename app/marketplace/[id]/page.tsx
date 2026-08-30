"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  Calendar,
  MessageSquare,
  Layers,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { MarketplaceService, OrderService } from "@/lib/services";
import { type ProduceListing } from "@/lib/store";
import { useLanguage, rupees } from "@/components/site/language-context";
import { useAuth } from "@/components/auth/auth-context";

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { lang, t } = useLanguage();
  const { user } = useAuth();

  const [listing, setListing] = useState<ProduceListing | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(200);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    MarketplaceService.getListingById(resolvedParams.id).then((l) => {
      if (l) {
        setListing(l);
        setOrderQuantity(Math.min(200, l.availableQuantity));
      }
    });
  }, [resolvedParams.id]);

  if (!listing) {
    return (
      <AppShell>
        <div className="p-12 text-center text-xs text-[#687D6B]">
          Loading harvest listing...
        </div>
      </AppShell>
    );
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    await OrderService.createBulkOrder({
      buyerId: user?.id || "buyer-01",
      buyerName: user?.name || "Anita Rao",
      buyerOrg: user?.organization || "ABC Grand Restaurants",
      buyerPhone: user?.phone || "+91 97100 88990",
      deliveryAddress: "No. 42 Anna Salai, Thousand Lights",
      deliveryCity: "Chennai",
      productName: listing.productName,
      requiredQuantityKg: orderQuantity,
      targetPricePerKg: listing.pricePerKg,
    });
    setLoading(false);
    setOrderPlaced(true);
    setIsBulkModalOpen(false);
  };

  return (
    <AppShell>
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687D6B] hover:text-[#172019]"
        >
          <ArrowLeft className="size-3.5" /> Back to Marketplace
        </Link>
      </div>

      {orderPlaced && (
        <div className="mb-6 rounded-3xl border border-[#16803A]/30 bg-[#EEF7EF] p-6 text-center animate-in zoom-in-95 duration-200">
          <div className="grid size-12 place-items-center rounded-full bg-[#16803A] text-white mx-auto mb-3">
            <CheckCircle2 className="size-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#172019]">
            Order Placed & Aggregation Scheduled!
          </h3>
          <p className="text-xs text-[#687D6B] max-w-md mx-auto mt-1">
            Your {orderQuantity} kg order of {listing.productName} has been routed to 3 nearby farms with pickup scheduled for tomorrow.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link
              href="/buyer/orders"
              className="rounded-full bg-[#16803A] px-6 py-2 text-xs font-bold text-white hover:bg-[#16803A]/90"
            >
              Track Active Order →
            </Link>
          </div>
        </div>
      )}

      {/* Main 2-Column Product Layout */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Image & Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="overflow-hidden rounded-3xl border border-[#E2E7E2] bg-white p-4 shadow-sm">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#EEF7EF]">
              <img
                src={listing.image}
                alt={listing.productName}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#172019] shadow-sm backdrop-blur-xs">
                Grade {listing.grade}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-bold text-[#16803A] shadow-sm backdrop-blur-xs">
                ✓ Verified Seller
              </span>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
                    {listing.category}
                  </span>
                  <h1 className="font-serif text-3xl font-bold text-[#172019]">
                    {lang === "hi" ? listing.productNameHi : listing.productName}
                  </h1>
                </div>
                <div className="sm:text-right">
                  <span className="text-xs text-[#687D6B]">Buyer Price</span>
                  <p className="text-3xl font-bold text-[#172019]">
                    {rupees(listing.buyerPricePerKg)}
                    <span className="text-sm font-normal text-[#687D6B]">/{listing.unit}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-[#E2E7E2] py-4 text-xs text-[#687D6B]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-[#16803A]" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-4 text-[#16803A]" />
                  <span>Harvest: {listing.harvestDate}</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                  <ShieldCheck className="size-4 text-[#16803A]" />
                  <span>{listing.farmerName} ({listing.fpoName || "Direct"})</span>
                </div>
              </div>

              <div className="text-xs text-[#687D6B] leading-relaxed">
                Direct harvest listing verified by regional agricultural extension officers. Standard batch grading adheres to national FSSAI quality parameters with moisture content tested under 12%.
              </div>
            </div>
          </div>

          {/* Regional Demand Outlook Card */}
          <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-[#16803A]" />
                <h3 className="font-serif text-base font-bold text-[#172019]">
                  Regional Demand Outlook · Chennai
                </h3>
              </div>
              <span className="rounded-full bg-[#EEF7EF] px-2.5 py-0.5 text-xs font-bold text-[#16803A]">
                ↑ 12% Next 7 Days
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#687D6B]">Expected Regional Demand:</span>
                <p className="text-xl font-bold text-[#172019]">18,400 kg</p>
              </div>
              <div>
                <span className="text-[#687D6B]">Model Confidence:</span>
                <p className="text-xl font-bold text-[#16803A]">87% High</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Price Breakdown & Order Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Transparent Price Breakdown */}
          <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#172019]">
              Transparent Price Breakdown
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#687D6B]">Buyer Price (Delivered):</span>
                <span className="font-bold text-[#172019]">{rupees(listing.buyerPricePerKg)}/kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#687D6B]">Estimated Logistics Fee:</span>
                <span className="font-medium text-red-600">−{rupees(listing.estimatedLogisticsPerKg)}/kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#687D6B]">Platform Facilitation Fee:</span>
                <span className="font-medium text-red-600">−{rupees(listing.platformFeePerKg)}/kg</span>
              </div>
              <div className="flex justify-between border-t border-[#E2E7E2] pt-3 text-sm font-bold text-[#16803A]">
                <span>Guaranteed Farmer Realization:</span>
                <span>{rupees(listing.farmerRealizationPerKg)}/kg</span>
              </div>
            </div>

            <p className="text-[10px] text-center text-[#687D6B] pt-2">
              Illustrative demo calculation · Zero broker cuts
            </p>
          </div>

          {/* Order Placement Box */}
          <div className="rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-xs space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#172019]">
              Purchase & Quantity Selection
            </h3>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between rounded-2xl border border-[#E2E7E2] p-2">
              <button
                type="button"
                onClick={() => setOrderQuantity((q) => Math.max(50, q - 50))}
                className="grid size-9 place-items-center rounded-xl bg-[#FAFAF7] text-[#172019] hover:bg-[#EEF7EF]"
              >
                <Minus className="size-4" />
              </button>
              <div className="text-center">
                <span className="text-lg font-bold text-[#172019]">{orderQuantity}</span>
                <span className="text-xs text-[#687D6B] ml-1">kg</span>
              </div>
              <button
                type="button"
                onClick={() => setOrderQuantity((q) => Math.min(2000, q + 50))}
                className="grid size-9 place-items-center rounded-xl bg-[#FAFAF7] text-[#172019] hover:bg-[#EEF7EF]"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <div className="rounded-xl bg-[#FAFAF7] p-3 text-xs space-y-1.5 border border-[#E2E7E2]">
              <div className="flex justify-between">
                <span className="text-[#687D6B]">Total Order Value:</span>
                <span className="font-bold text-[#172019]">{rupees(orderQuantity * listing.buyerPricePerKg)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#687D6B]">Farmer Payout Amount:</span>
                <span className="font-bold text-[#16803A]">{rupees(orderQuantity * listing.farmerRealizationPerKg)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#16803A] py-3 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
              >
                <ShoppingBag className="size-4" />
                {loading ? "Routing..." : `Place Order (${orderQuantity} kg)`}
              </button>

              <button
                type="button"
                onClick={() => setIsBulkModalOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#172019] py-2.5 text-xs font-bold text-[#172019] hover:bg-[#EEF7EF] transition"
              >
                <Layers className="size-4" />
                Multi-Farm Bulk Aggregation (2,000 kg)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bulk Aggregation Modal ─── */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-xl bg-white rounded-3xl border border-[#E2E7E2] shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
                  AGGREGATION MATCHING ENGINE
                </span>
                <h3 className="font-serif text-xl font-bold text-[#172019]">
                  Fulfill 2,000 kg Bulk Order
                </h3>
              </div>
              <span className="rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-bold text-[#16803A]">
                100% Matched
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#687D6B]">
                Available nearby supply is <strong>2,450 kg</strong>. AgriHaat coordinates supply from 3 verified farmers into a single consolidated pickup run:
              </p>

              <div className="rounded-2xl border border-[#E2E7E2] divide-y divide-[#E2E7E2] overflow-hidden bg-[#FAFAF7]">
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#172019]">Farmer A: Ramesh Kumar (ABC FPO)</p>
                    <p className="text-[11px] text-[#687D6B]">Kanchipuram · Grade A @ ₹32/kg</p>
                  </div>
                  <span className="font-bold text-[#16803A]">800 kg (40%)</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#172019]">Farmer B: Suresh Reddy (GreenFields FPO)</p>
                    <p className="text-[11px] text-[#687D6B]">Walajabad · Grade A @ ₹31/kg</p>
                  </div>
                  <span className="font-bold text-[#16803A]">700 kg (35%)</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#172019]">Farmer C: Venkatesh Babu (Rayalaseema FPO)</p>
                    <p className="text-[11px] text-[#687D6B]">Chengalpattu · Grade A @ ₹33/kg</p>
                  </div>
                  <span className="font-bold text-[#16803A]">500 kg (25%)</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#EEF7EF] p-3 text-xs text-[#172019] flex justify-between items-center">
                <span>3 Farms → 1 Single Coordinated Delivery</span>
                <span className="font-bold text-[#16803A]">124 km · 4h 20m</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(false)}
                className="flex-1 rounded-full border border-[#E2E7E2] py-2.5 text-xs font-semibold text-[#172019] hover:bg-[#FAFAF7]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="flex-1 rounded-full bg-[#16803A] py-2.5 text-xs font-bold text-white hover:bg-[#16803A]/90 transition"
              >
                Confirm 2,000 kg Order
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
