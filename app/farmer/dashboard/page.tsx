"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sprout,
  ShoppingBag,
  Wallet,
  CalendarCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Info,
  Clock,
  MapPin,
  Plus,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Volume2,
  Square,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useAuth } from "@/components/auth/auth-context";
import { useLanguage, rupees } from "@/components/site/language-context";
import { INITIAL_DEMAND_FORECAST } from "@/lib/store";
import { ExplainabilityModal } from "@/components/ai/explainability-modal";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

export default function FarmerDashboardPage() {
  const { user } = useAuth();
  const { lang, t } = useLanguage();
  const [explainModalOpen, setExplainModalOpen] = useState(false);

  const { speak, stop, isSpeaking } = useTextToSpeech();

  const farmerName = user?.name?.split(" ")[0] || "Ramesh";

  // Dynamic text content for TTS reading
  const summaryText =
    lang === "hi"
      ? `नमस्ते ${farmerName}! आपकी 500 किलोग्राम टमाटर लिस्टेड हैं। आपके 3 सक्रिय ऑर्डर्स हैं। अपेक्षित कमाई 18,000 रुपये है। आपका खरीद केंद्र स्लॉट कल सुबह 10:30 बजे टोकन नंबर 42 के साथ निर्धारित है।`
      : `Good morning ${farmerName}! You have 500 kilograms of tomatoes listed. You have 3 active orders. Your expected earnings are 18,000 rupees. Your procurement slot is tomorrow at 10:30 AM with token number 42.`;

  return (
    <AppShell>
      {/* ─── Top Greeting Bar ─── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            {lang === "hi" ? "किसान डैशबोर्ड" : "FARMER PORTAL"}
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            {lang === "hi" ? `नमस्ते, ${farmerName}!` : `Good morning, ${farmerName}!`}
          </h1>
          <p className="text-xs text-[#687D6B]">
            {lang === "hi"
              ? "आपकी उपज, ऑर्डर्स, खरीद केंद्र टोकन और AI मांग पूर्वानुमान का लाइव अवलोकन।"
              : "Live overview of your produce, buyer orders, procurement tokens, and demand intelligence."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Voiceover Button */}
          <button
            type="button"
            onClick={() => (isSpeaking ? stop() : speak(summaryText, lang))}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition shadow-2xs border ${
              isSpeaking
                ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                : "bg-white text-[#172019] border-[#E2E7E2] hover:bg-[#FAFAF7]"
            }`}
          >
            {isSpeaking ? (
              <>
                <Square className="size-3.5 fill-current" />
                {lang === "hi" ? "आवाज बंद करें" : "Stop Audio"}
              </>
            ) : (
              <>
                <Volume2 className="size-3.5 text-[#16803A]" />
                {lang === "hi" ? "सुनिए (Audio)" : "Listen Summary"}
              </>
            )}
          </button>

          <Link
            href="/farmer/produce/new"
            className="flex items-center gap-1.5 rounded-full bg-[#16803A] px-4 py-2 text-xs font-bold text-white hover:bg-[#16803A]/90 transition shadow-xs"
          >
            <Plus className="size-3.5" />
            {lang === "hi" ? "नई उपज लिस्ट करें" : "List New Produce"}
          </Link>
        </div>
      </div>

      {/* ─── Section A: Today's Snapshot ─── */}
      <div className="mt-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#687D6B] mb-3">
          {lang === "hi" ? "आज का संक्षिप्त विवरण" : "TODAY'S SNAPSHOT"}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[#E2E7E2] bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#687D6B]">
              <span className="text-xs">{lang === "hi" ? "उपज लिस्टेड" : "Produce Listed"}</span>
              <Sprout className="size-4 text-[#16803A]" />
            </div>
            <p className="mt-3 text-2xl font-bold text-[#172019]">{lang === "hi" ? "५०० किग्रा" : "500 kg"}</p>
            <p className="mt-1 text-[11px] text-[#687D6B]">{lang === "hi" ? "टमाटर · ग्रेड A" : "Tomatoes · Grade A"}</p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[#E2E7E2] bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#687D6B]">
              <span className="text-xs">{lang === "hi" ? "सक्रिय ऑर्डर्स" : "Active Orders"}</span>
              <ShoppingBag className="size-4 text-[#16803A]" />
            </div>
            <p className="mt-3 text-2xl font-bold text-[#172019]">{lang === "hi" ? "३ सक्रिय" : "3 Active"}</p>
            <p className="mt-1 text-[11px] text-[#16803A] font-semibold">{lang === "hi" ? "१ पिकअप कल" : "1 pickup tomorrow"}</p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-[#E2E7E2] bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#687D6B]">
              <span className="text-xs">{lang === "hi" ? "अपेक्षित कमाई" : "Expected Earnings"}</span>
              <Wallet className="size-4 text-[#16803A]" />
            </div>
            <p className="mt-3 text-2xl font-bold text-[#16803A]">{rupees(18000)}</p>
            <p className="mt-1 text-[11px] text-[#687D6B]">{lang === "hi" ? "डिलीवरी पर T+1 भुगतान" : "T+1 payout on delivery"}</p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-[#E2E7E2] bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between text-[#687D6B]">
              <span className="text-xs">{lang === "hi" ? "खरीद केंद्र स्लॉट" : "Procurement Slot"}</span>
              <CalendarCheck className="size-4 text-[#16803A]" />
            </div>
            <p className="mt-3 text-lg font-bold text-[#172019] truncate">{lang === "hi" ? "कल" : "Tomorrow"}</p>
            <p className="mt-1 text-[11px] text-[#16803A] font-semibold">{lang === "hi" ? "१०:३० AM (टोकन #४२)" : "10:30 AM (Token #42)"}</p>
          </div>
        </div>
      </div>

      {/* ─── 2-Column Main Content ─── */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols): Market Opportunity + Active Orders */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section B: Market Opportunity Card */}
          <div className="rounded-3xl border border-[#E2E7E2] bg-white p-5 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
                  MARKET OPPORTUNITY
                </span>
                <h3 className="mt-1 font-serif text-xl font-semibold text-[#172019]">
                  {lang === "hi" ? "टमाटर की मांग में उछाल (चेन्नई)" : "Tomato Demand Outlook · Chennai Metro"}
                </h3>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-bold text-[#16803A]">
                <TrendingUp className="size-3.5" /> {lang === "hi" ? "+१२% अगले ७ दिन" : "+12% Next 7 Days"}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-[#FAFAF7] p-3 border border-[#E2E7E2]">
                <span className="text-[#687D6B]">{lang === "hi" ? "नजदीकी खरीदार सीमा" : "Nearby Buyer Range"}</span>
                <p className="mt-1 text-base font-bold text-[#172019]">{lang === "hi" ? "₹३० – ₹३४/kg" : "₹30 – ₹34/kg"}</p>
              </div>
              <div className="rounded-xl bg-[#FAFAF7] p-3 border border-[#E2E7E2]">
                <span className="text-[#687D6B]">{lang === "hi" ? "अपेक्षित मांग" : "Expected Demand"}</span>
                <p className="mt-1 text-base font-bold text-[#172019]">{lang === "hi" ? "१८,४०० kg" : "18,400 kg"}</p>
              </div>
              <div className="rounded-xl bg-[#FAFAF7] p-3 border border-[#E2E7E2] col-span-2 sm:col-span-1">
                <span className="text-[#687D6B]">{lang === "hi" ? "मॉडल विश्वसनीयता" : "Model Confidence"}</span>
                <p className="mt-1 text-base font-bold text-[#16803A]">{lang === "hi" ? "८७% उच्च" : "87% High"}</p>
              </div>
            </div>

            {/* AI Recommendation Box */}
            <div className="mt-4 rounded-2xl border border-[#16803A]/20 bg-[#EEF7EF] p-4 flex items-start gap-3">
              <Sparkles className="size-4.5 shrink-0 text-[#16803A] mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-[#172019]">
                  {lang === "hi"
                    ? "सिफारिश: चेन्नई में होटल और रेस्तरां मांग बढ़ रही है। शुक्रवार से पहले अतिरिक्त ग्रेड A टमाटर लिस्ट करने पर विचार करें।"
                    : "Demand is expected to increase in Chennai. Consider listing additional Grade A tomatoes before Friday."}
                </p>
                <p className="mt-1 text-[11px] text-[#687D6B]">
                  {lang === "hi"
                    ? "सुझाई गई दर: ₹३२-३३/किलो (अनुमानित शुद्ध प्राप्ति ₹३६/किलो)"
                    : "Suggested target rate: ₹32–33/kg with estimated net realization of ₹36/kg."}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#E2E7E2] pt-4">
              <button
                type="button"
                onClick={() => setExplainModalOpen(true)}
                className="text-xs font-semibold text-[#16803A] hover:underline flex items-center gap-1"
              >
                <Info className="size-3.5" /> {lang === "hi" ? "यह सिफारिश क्यों?" : "Why this recommendation?"}
              </button>
              <Link
                href="/farmer/insights"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#16803A] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#16803A]/90 transition"
              >
                {lang === "hi" ? "बाज़ार अवसर देखें" : "View Market Opportunity"}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Section C: Active Orders */}
          <div className="rounded-3xl border border-[#E2E7E2] bg-white p-5 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
                  FULFILLMENT QUEUE
                </span>
                <h3 className="mt-1 font-serif text-xl font-semibold text-[#172019]">
                  {lang === "hi" ? "सक्रिय ऑर्डर्स (पिकअप निर्धारित)" : "Active Order · Scheduled Pickup"}
                </h3>
              </div>
              <span className="rounded-full bg-[#EEF7EF] px-2.5 py-1 text-xs font-bold text-[#16803A]">
                {lang === "hi" ? "ऑर्डर #FM-2026-00421" : "Order #FM-2026-00421"}
              </span>
            </div>

            <div className="mt-5 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3.5 rounded-2xl bg-[#FAFAF7] border border-[#E2E7E2] gap-2">
                <div>
                  <p className="font-bold text-sm text-[#172019]">{lang === "hi" ? "टमाटर · ५०० kg (ग्रेड A)" : "Tomatoes · 500 kg (Grade A)"}</p>
                  <p className="text-[#687D6B]">{lang === "hi" ? "खरीदार: ABC Grand Hotels" : "Buyer: ABC Grand Hotels & Restaurants"}</p>
                </div>
                <div className="sm:text-right">
                  <span className="rounded-md bg-[#EEF7EF] px-2 py-0.5 text-[11px] font-bold text-[#16803A]">
                    {lang === "hi" ? "स्थिति: पुष्टि हुई" : "Status: Confirmed"}
                  </span>
                  <p className="mt-1 text-[#687D6B]">{lang === "hi" ? "पिकअप: २९ अगस्त · ८:३० AM" : "Pickup: 29 Aug · 8:30 AM"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-[#E2E7E2] p-3">
                  <span className="text-[#687D6B]">{lang === "hi" ? "खरीदार मूल्य:" : "Buyer Price:"}</span>
                  <p className="font-bold text-[#172019]">{lang === "hi" ? "₹४०/kg (कुल ₹२०,०००)" : "₹40/kg (Total ₹20,000)"}</p>
                </div>
                <div className="rounded-xl border border-[#16803A]/20 bg-[#EEF7EF] p-3">
                  <span className="text-[#687D6B]">{lang === "hi" ? "आपकी अनुमानित प्राप्ति:" : "Your Estimated Realization:"}</span>
                  <p className="font-bold text-[#16803A]">{lang === "hi" ? "₹३६/kg (कुल ₹१८,०००)" : "₹36/kg (Total ₹18,000)"}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end border-t border-[#E2E7E2] pt-4">
              <Link
                href="/farmer/orders/ord-00421"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#16803A] hover:underline"
              >
                {lang === "hi" ? "इस ऑर्डर को ट्रैक करें" : "Track this order"} <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Procurement Status + AI Insight Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Section D: Procurement Status */}
          <div className="rounded-3xl border border-[#E2E7E2] bg-white p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2E7E2] pb-3">
              <div className="flex items-center gap-2">
                <CalendarCheck className="size-4.5 text-[#16803A]" />
                <h3 className="font-serif text-base font-bold text-[#172019]">
                  {lang === "hi" ? "खरीद केंद्र स्थिति" : "Procurement Status"}
                </h3>
              </div>
              <span className="rounded-full bg-[#16803A] text-white text-[10px] font-bold px-2 py-0.5">
                {lang === "hi" ? "टोकन #४२" : "Token #42"}
              </span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <p className="font-bold text-[#172019]">{lang === "hi" ? "कांचीपुरम जिला केंद्र" : "Kanchipuram District Centre"}</p>
                <p className="text-[11px] text-[#687D6B]">APMC Yard, Near Railway Goods Shed</p>
              </div>

              <div className="rounded-2xl bg-[#FAFAF7] p-3.5 border border-[#E2E7E2] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#687D6B]">{lang === "hi" ? "बुक किया गया स्लॉट:" : "Booked Slot:"}</span>
                  <span className="font-semibold text-[#172019]">{lang === "hi" ? "कल · १०:३० AM" : "Tomorrow · 10:30 AM"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#687D6B]">{lang === "hi" ? "कतार की स्थिति:" : "Queue Position:"}</span>
                  <span className="font-bold text-[#16803A]">{lang === "hi" ? "८ किसान आगे" : "8 farmers ahead"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#687D6B]">{lang === "hi" ? "अनुमानित प्रतीक्षा:" : "Estimated Wait:"}</span>
                  <span className="font-semibold text-[#172019]">{lang === "hi" ? "~४२ मिनट" : "~42 min"}</span>
                </div>
                <div className="flex justify-between border-t border-[#E2E7E2] pt-2">
                  <span className="text-[#687D6B]">{lang === "hi" ? "स्थिति:" : "Status:"}</span>
                  <span className="font-bold text-[#16803A]">{lang === "hi" ? "स्लॉट की पुष्टि हुई" : "Slot Confirmed"}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="/farmer/procurement/proc-book-00421"
                className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#172019] py-2 text-xs font-semibold text-white hover:bg-[#172019]/90 transition"
              >
                {lang === "hi" ? "खरीद पास देखें" : "View Procurement Pass"} <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Section E: AI Insight Card */}
          <div className="rounded-3xl border border-[#16803A]/30 bg-[#EEF7EF] p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 text-[#16803A]">
              <Sparkles className="size-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                COGNITIVE PRICE ALERT
              </span>
            </div>

            <h4 className="mt-2 font-serif text-base font-bold text-[#172019]">
              {lang === "hi"
                ? "आपकी टमाटर लिस्टिंग वर्तमान खरीदार रेंज से ₹२/किलो नीचे है।"
                : "Your tomato listing is ₹2/kg below the current nearby buyer range."}
            </h4>

            <p className="mt-2 text-xs text-[#687D6B] leading-relaxed">
              {lang === "hi"
                ? "सुझाव: अगला बल्क ऑर्डर स्वीकार करने से पहले अपनी लिस्टिंग दर की समीक्षा करें।"
                : "Suggested action: Review your listing price before accepting the next bulk procurement order."}
            </p>

            <div className="mt-4 pt-3 border-t border-[#16803A]/20 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setExplainModalOpen(true)}
                className="text-xs font-semibold text-[#16803A] hover:underline"
              >
                {lang === "hi" ? "यह सिफारिश क्यों?" : "Why this recommendation?"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Modals ─── */}
      <ExplainabilityModal
        isOpen={explainModalOpen}
        onClose={() => setExplainModalOpen(false)}
        forecast={INITIAL_DEMAND_FORECAST}
      />
    </AppShell>
  );
}