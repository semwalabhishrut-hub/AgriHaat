"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, ShoppingBag, Calendar, TrendingUp, DollarSign, CheckCheck, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { NotificationService } from "@/lib/services";
import { type AppNotification } from "@/lib/store";
import { useLanguage } from "@/components/site/language-context";

export default function FarmerNotificationsPage() {
  const { lang } = useLanguage();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    NotificationService.getNotifications().then(setNotifications);
  }, []);

  const handleMarkAllRead = async () => {
    await NotificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (cat: AppNotification["category"]) => {
    switch (cat) {
      case "ORDER": return <ShoppingBag className="size-4 text-[#16803A]" />;
      case "PROCUREMENT": return <Calendar className="size-4 text-[#16803A]" />;
      case "PRICE": return <TrendingUp className="size-4 text-[#16803A]" />;
      case "PAYMENT": return <DollarSign className="size-4 text-[#16803A]" />;
      default: return <Bell className="size-4 text-[#16803A]" />;
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            NOTIFICATION FEED
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            Alerts & Activity Stream
          </h1>
          <p className="text-xs text-[#687D6B]">
            Real-time updates regarding your buyer orders, queue tokens, and demand shifts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleMarkAllRead}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E7E2] bg-white px-4 py-2 text-xs font-bold text-[#172019] hover:bg-[#EEF7EF] transition shadow-2xs"
        >
          <CheckCheck className="size-3.5 text-[#16803A]" /> Mark All as Read
        </button>
      </div>

      <div className="mt-8 max-w-3xl space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-3xl border transition flex items-start gap-4 ${
              !n.read ? "bg-white border-[#16803A]/30 shadow-xs" : "bg-white border-[#E2E7E2]"
            }`}
          >
            <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#EEF7EF]">
              {getIcon(n.category)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-[#172019]">
                  {lang === "hi" ? n.titleHi : n.title}
                </h3>
                <span className="text-[11px] text-[#687D6B]">{n.timestamp}</span>
              </div>
              <p className="text-xs text-[#687D6B] mt-1 leading-relaxed">
                {lang === "hi" ? n.messageHi : n.message}
              </p>
              {n.link && (
                <div className="mt-3">
                  <Link
                    href={n.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#16803A] hover:underline"
                  >
                    View Details <ExternalLink className="size-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
