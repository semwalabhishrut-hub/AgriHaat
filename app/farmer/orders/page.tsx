"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  FileText,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { OrderService } from "@/lib/services";
import { type Order } from "@/lib/store";
import { useLanguage, rupees } from "@/components/site/language-context";

export default function FarmerOrdersPage() {
  const { lang } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    OrderService.getOrders().then(setOrders);
  }, []);

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            {lang === "hi" ? "ऑर्डर प्रबंधन" : "FARMER ORDER MANAGEMENT"}
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            {lang === "hi" ? "प्राप्त खरीदार ऑर्डर्स" : "Fulfillment Orders"}
          </h1>
          <p className="text-xs text-[#687D6B]">
            {lang === "hi"
              ? "सत्यापित खरीदारों से प्राप्त ऑर्डर्स, पिकअप समय और पारदर्शी भुगतान की स्थिति।"
              : "Track incoming bulk buyer purchase orders, scheduled gate pickups, and direct realization payouts."}
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border border-[#E2E7E2] bg-white p-5 sm:p-7 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-sm font-bold text-[#172019]">{order.orderNumber}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    order.status === "Delivered" || order.status === "Completed"
                      ? "bg-[#EEF7EF] text-[#16803A]"
                      : order.status === "In Transit"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-[#EEF7EF] text-[#16803A]"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div>
                <p className="font-serif text-lg font-bold text-[#172019]">
                  {order.items[0]?.productName} · {order.totalQuantityKg} kg
                </p>
                <p className="text-xs text-[#687D6B]">
                  Buyer: <strong className="text-[#172019]">{order.buyerOrganization}</strong> ({order.deliveryCity})
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-[#687D6B] pt-1">
                <span>Pickup: <strong className="text-[#172019]">{order.pickupScheduledAt || "Tomorrow, 8:30 AM"}</strong></span>
                <span>Payment Ref: <strong className="font-mono text-[#172019]">{order.paymentRef}</strong></span>
              </div>
            </div>

            <div className="flex sm:flex-col sm:items-end justify-between items-center gap-2 border-t sm:border-t-0 border-[#E2E7E2] pt-3 sm:pt-0">
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-[#687D6B]">Your Net Realization</span>
                <p className="text-xl font-bold text-[#16803A]">{rupees(order.totalFarmerPayable)}</p>
              </div>

              <Link
                href={`/farmer/orders/${order.id}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#16803A] px-5 py-2 text-xs font-bold text-white hover:bg-[#16803A]/90 transition"
              >
                Order Stepper <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
