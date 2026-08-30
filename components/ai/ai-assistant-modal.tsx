"use client";

import { useState } from "react";
import { MessageSquare, Sparkles, X, Send, Bot, User, CornerDownRight } from "lucide-react";
import { useLanguage } from "@/components/site/language-context";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const SAMPLE_QUERIES = [
  { q: "Chennai mein tomato demand kaisi hai?", role: "farmer" },
  { q: "Mujhe ₹32/kg par list karna chahiye?", role: "farmer" },
  { q: "2,000 kg tomato kaha se milega?", role: "buyer" },
  { q: "Kanchipuram centre par next slot kab milega?", role: "farmer" },
];

export function AIAssistantModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text:
        lang === "hi"
          ? "नमस्ते! मैं AgriHaat AI सहायक हूँ। आप मुझसे मंडी भाव, मांग का पूर्वानुमान, लॉजिस्टिक्स रूट, या खरीद केंद्र स्लॉट के बारे में कुछ भी पूछ सकते हैं।"
          : "Namaste! I am the AgriHaat AI Copilot. Ask me about mandi trends, demand forecasts, supply aggregation, or procurement centre slots.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput("");
    setLoading(true);

    // Realistic Agricultural AI reasoning response
    setTimeout(() => {
      let reply = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes("demand") || lower.includes("maang") || lower.includes("kaisi hai") || lower.includes("kaisa")) {
        reply =
          lang === "hi"
            ? "डेमो पूर्वानुमान मॉडल के अनुसार, चेन्नई में अगले 7 दिनों में टमाटर की अपेक्षित मांग लगभग 18,400 किलो है, जो पिछली अवधि से 12% अधिक है। 87% विश्वसनीयता के साथ नजदीकी FPOs से संग्रह बढ़ाने की सिफारिश की गई है। (डेमो डेटा)"
            : "According to the demo forecast model, Chennai tomato demand over the next 7 days is projected at 18,400 kg (+12% vs last week). AI suggests listing Grade A tomatoes before Friday morning to capture restaurant peak demand. (Illustrative demo data)";
      } else if (lower.includes("32") || lower.includes("list") || lower.includes("rate") || lower.includes("price") || lower.includes("bhav")) {
        reply =
          lang === "hi"
            ? "वर्तमान डेमो लिस्टिंग ₹30–34/किलो रेंज में हैं। आपका ₹32/किलो का रेट प्रतिस्पर्धी है और मॉडल नजदीकी मांग के आधार पर ₹32–33/किलो का सुझाव देता है, जिससे ₹3/किलो लॉजिस्टिक्स शुल्क के बाद ₹36/किलो की अनुमानित प्राप्ति होगी। (डेमो डेटा)"
            : "Current nearby listings range between ₹30–34/kg. Your target of ₹32/kg is well within range. The price model suggests ₹32–33/kg with an estimated net farmer realization of ₹36/kg after logistics. (Illustrative calculation)";
      } else if (lower.includes("2000") || lower.includes("2,000") || lower.includes("kaha se") || lower.includes("procure") || lower.includes("source")) {
        reply =
          lang === "hi"
            ? "वर्तमान डेमो इन्वेंट्री में 3 नजदीकी विक्रेताओं के पास 2,450 किलो टमाटर उपलब्ध हैं (ABC FPO: 800 kg, GreenFields: 700 kg, Ramesh Farm: 500 kg)। AgriHaat इन्हें एक ही वाहन से 124 किमी के समन्वित रूट में जोड़कर डिलीवरी कर सकता है।"
            : "Current demo inventory has 2,450 kg across 3 verified sellers (ABC FPO 800kg, GreenFields 700kg, Ramesh Farm 500kg). AgriHaat can aggregate 2,000 kg into a single 124 km multi-stop route with delivery scheduled for tomorrow morning.";
      } else if (lower.includes("slot") || lower.includes("procurement") || lower.includes("centre") || lower.includes("kendra")) {
        reply =
          lang === "hi"
            ? "कांचीपुरम जिला खरीद केंद्र पर आज 18 स्लॉट उपलब्ध हैं। अगला स्लॉट कल सुबह 10:30 AM पर उपलब्ध है। औसत प्रतीक्षा समय ~42 मिनट (लगभग 8 किसान कतार में) है।"
            : "Kanchipuram District Procurement Centre has 18 slots remaining today. The next recommended booking is tomorrow at 10:30 AM with an estimated queue wait time of ~42 minutes (Token queue ~8 farmers ahead).";
      } else {
        reply =
          lang === "hi"
            ? `आपके प्रश्न "${textToSend}" के संदर्भ में: AgriHaat सीधे किसानों को खरीदारों से जोड़ता है। टमाटर की वर्तमान मांग मजबूत है और खरीद केंद्र स्लॉट खुले हैं। (डेमो संदर्भ)`
            : `Regarding "${textToSend}": AgriHaat's live matching engine currently tracks verified listings and procurement slots in Tamil Nadu & Andhra Pradesh. Average realization remains 18% higher than conventional intermediaries. (Demo data)`;
      }

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-[#E2E7E2] shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[620px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E2E7E2] px-5 py-4 bg-[#172019] text-white">
          <div className="flex items-center gap-2.5">
            <div className="grid size-8 place-items-center rounded-lg bg-[#16803A] text-white">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-semibold">AgriHaat Copilot</h3>
              <p className="text-[11px] text-gray-300">Grounded Agricultural AI</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div className="grid size-6.5 shrink-0 place-items-center rounded-full bg-[#16803A] text-white text-[10px]">
                  AI
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#16803A] text-white rounded-br-xs"
                    : "bg-[#FAFAF7] text-[#172019] border border-[#E2E7E2] rounded-bl-xs"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#687D6B] pl-9">
              <div className="size-2 rounded-full bg-[#16803A] animate-ping" />
              <span>Analyzing market data & demand factors...</span>
            </div>
          )}
        </div>

        {/* Preset Suggestions */}
        <div className="px-4 py-2 border-t border-[#E2E7E2] bg-[#FAFAF7] overflow-x-auto no-scrollbar flex gap-2">
          {SAMPLE_QUERIES.map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(sq.q)}
              className="shrink-0 rounded-full border border-[#E2E7E2] bg-white px-3 py-1 text-[11px] font-medium text-[#172019] hover:bg-[#EEF7EF] hover:border-[#16803A] transition"
            >
              <CornerDownRight className="size-2.5 inline mr-1 text-[#16803A]" />
              {sq.q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-[#E2E7E2] bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === "hi" ? "कृषि, मांग, भाव या स्लॉट के बारे में पूछें..." : "Ask about prices, demand, routes, or slots..."}
              className="flex-1 rounded-xl border border-[#E2E7E2] px-3.5 py-2.5 text-xs outline-none focus:border-[#16803A] bg-[#FAFAF7]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="grid size-9 place-items-center rounded-xl bg-[#16803A] text-white disabled:opacity-40 hover:bg-[#16803A]/90 transition"
              aria-label="Send message"
            >
              <Send className="size-3.5" />
            </button>
          </form>
          <p className="mt-1.5 text-center text-[10px] text-[#687D6B]">
            Prototype agricultural intelligence · Grounded deterministic estimates
          </p>
        </div>
      </div>
    </div>
  );
}
