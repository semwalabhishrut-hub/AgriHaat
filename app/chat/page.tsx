"use client";

import { useState } from "react";
import { MessageSquare, Send, User, Building2, Truck, ShieldCheck, CheckCheck, Paperclip } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { useLanguage } from "@/components/site/language-context";
import { useAuth } from "@/components/auth/auth-context";

interface ChatChannel {
  id: string;
  name: string;
  role: string;
  contextTag: string;
  unread: number;
  lastMessage: string;
  messages: { sender: string; isSelf: boolean; text: string; time: string }[];
}

const INITIAL_CHANNELS: ChatChannel[] = [
  {
    id: "channel-1",
    name: "ABC Restaurant (Anita Rao)",
    role: "Buyer ↔ Farmer",
    contextTag: "Order #FM-2026-00421 · 500 kg Tomatoes",
    unread: 0,
    lastMessage: "Please ensure the crates are packed with organic cushioning.",
    messages: [
      { sender: "Anita Rao (Buyer)", isSelf: false, text: "Namaste Ramesh ji! We confirmed the 500 kg tomato order.", time: "09:30 AM" },
      { sender: "Ramesh Kumar (Farmer)", isSelf: true, text: "Namaste! Harvest is complete. Grade A tomatoes are sorted and crated.", time: "09:35 AM" },
      { sender: "Anita Rao (Buyer)", isSelf: false, text: "Wonderful. Please ensure the crates are packed with organic cushioning.", time: "09:40 AM" },
    ],
  },
  {
    id: "channel-2",
    name: "Walajabad Logistics Hub (Murugan S.)",
    role: "Logistics ↔ Farmer",
    contextTag: "Pickup Route #RT-KCH-CHN-001",
    unread: 1,
    lastMessage: "Driver M. Kumar will reach your gate at 08:30 AM tomorrow.",
    messages: [
      { sender: "Murugan S. (Hub)", isSelf: false, text: "Ramesh ji, reefer truck TN-21-AX-9942 is assigned.", time: "10:10 AM" },
      { sender: "Murugan S. (Hub)", isSelf: false, text: "Driver M. Kumar will reach your gate at 08:30 AM tomorrow.", time: "10:12 AM" },
    ],
  },
  {
    id: "channel-3",
    name: "ABC Restaurant ↔ Logistics Hub",
    role: "Buyer ↔ Logistics",
    contextTag: "Delivery Gate #4 · Thousand Lights",
    unread: 0,
    lastMessage: "Gate 4 delivery window confirmed for 08:45 AM.",
    messages: [
      { sender: "Murugan S. (Hub)", isSelf: false, text: "Delivery vehicle ETA is 08:45 AM at Anna Salai gate.", time: "11:00 AM" },
      { sender: "Anita Rao (Buyer)", isSelf: true, text: "Gate 4 delivery window confirmed for 08:45 AM.", time: "11:05 AM" },
    ],
  },
];

export default function TriPartyChatPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [channels, setChannels] = useState<ChatChannel[]>(INITIAL_CHANNELS);
  const [activeChannelId, setActiveChannelId] = useState<string>("channel-1");
  const [inputText, setInputText] = useState("");

  const activeChannel = channels.find((c) => c.id === activeChannelId) || channels[0];

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      sender: user?.name || "Ramesh Kumar",
      isSelf: true,
      text: inputText,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    };

    setChannels((prev) =>
      prev.map((c) => {
        if (c.id === activeChannelId) {
          return {
            ...c,
            lastMessage: inputText,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
    setInputText("");
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E7E2]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16803A]">
            TRI-PARTY DIRECT COMMUNICATIONS
          </span>
          <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-semibold text-[#172019]">
            Order & Dispatch Messaging Hub
          </h1>
          <p className="text-xs text-[#687D6B]">
            Real-time direct communication between Buyer, Farmer, and Logistics Hub Partners.
          </p>
        </div>
      </div>

      {/* 2-Column Chat Box */}
      <div className="mt-8 rounded-3xl border border-[#E2E7E2] bg-white shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[640px]">
        {/* Left: Channels List (4 cols) */}
        <div className="md:col-span-4 border-r border-[#E2E7E2] flex flex-col h-full bg-[#FAFAF7]">
          <div className="p-4 border-b border-[#E2E7E2] bg-white">
            <h3 className="font-serif text-base font-bold text-[#172019]">Active Channels</h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#E2E7E2]">
            {channels.map((c) => {
              const isSelected = c.id === activeChannelId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveChannelId(c.id)}
                  className={`w-full p-4 text-left transition flex flex-col gap-1 ${
                    isSelected ? "bg-[#EEF7EF] border-l-4 border-[#16803A]" : "hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#172019] truncate">{c.name}</span>
                    <span className="text-[10px] font-bold text-[#16803A] bg-white px-1.5 py-0.5 rounded border border-[#16803A]/20">
                      {c.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#16803A] font-medium">{c.contextTag}</p>
                  <p className="text-xs text-[#687D6B] truncate">{c.lastMessage}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Stream (8 cols) */}
        <div className="md:col-span-8 flex flex-col h-full bg-white">
          {/* Thread Header */}
          <div className="p-4 border-b border-[#E2E7E2] bg-white flex items-center justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-[#172019]">{activeChannel.name}</h3>
              <p className="text-xs text-[#16803A] font-semibold">{activeChannel.contextTag}</p>
            </div>
            <span className="rounded-full bg-[#EEF7EF] px-3 py-1 text-xs font-bold text-[#16803A]">
              ✓ Verified Channel
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            {activeChannel.messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.isSelf ? "items-end" : "items-start"}`}
              >
                <span className="text-[10px] text-[#687D6B] mb-1 font-semibold">{m.sender}</span>
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 leading-relaxed ${
                    m.isSelf
                      ? "bg-[#16803A] text-white rounded-br-xs"
                      : "bg-[#FAFAF7] text-[#172019] border border-[#E2E7E2] rounded-bl-xs"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-[#687D6B] mt-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="p-4 border-t border-[#E2E7E2] bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type order confirmation, gate instruction, or packaging note..."
                className="flex-1 rounded-xl border border-[#E2E7E2] px-4 py-2.5 text-xs outline-none focus:border-[#16803A] bg-[#FAFAF7]"
              />
              <button
                type="submit"
                className="grid size-10 place-items-center rounded-xl bg-[#16803A] text-white hover:bg-[#16803A]/90 transition"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
