"use client";

import { useState } from "react";
import { CheckCircle2, MapPin, Truck } from "lucide-react";
import { useLanguage } from "@/components/site/language-context";
import { ScrollReveal } from "./scroll-reveal";

interface RouteNode {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  coords: { x: number; y: number };
  details: { label: string; value: string }[];
}

export function InteractiveRoute() {
  const { t } = useLanguage();
  const [activeNode, setActiveNode] = useState<string>("farmer-a");

  const nodes: RouteNode[] = [
    {
      id: "farmer-a",
      title: "Farmer A (Kanchipuram)",
      subtitle: "First Pickup Point",
      badge: "250 kg Grade A",
      coords: { x: 15, y: 35 },
      details: [
        { label: "Quantity", value: "250 kg" },
        { label: "Grade", value: "Grade A (Organic)" },
        { label: "Gate Price", value: "₹31/kg" },
        { label: "Pickup Time", value: "05:30 AM" },
      ],
    },
    {
      id: "farmer-b",
      title: "Farmer B (Walajabad)",
      subtitle: "Second Pickup Point",
      badge: "180 kg Grade A",
      coords: { x: 40, y: 25 },
      details: [
        { label: "Quantity", value: "180 kg" },
        { label: "Grade", value: "Grade A" },
        { label: "Gate Price", value: "₹33/kg" },
        { label: "Pickup Time", value: "06:15 AM" },
      ],
    },
    {
      id: "hub",
      title: "Regional Collection Hub",
      subtitle: "Quality Check & Aggregation",
      badge: "430 kg Pooled",
      coords: { x: 65, y: 55 },
      details: [
        { label: "Total Pooled", value: "430 kg" },
        { label: "Consolidation", value: "1 Single Truck" },
        { label: "Quality Audit", value: "Passed 100%" },
        { label: "Departure", value: "07:30 AM" },
      ],
    },
    {
      id: "buyer",
      title: "ABC Restaurant (Chennai)",
      subtitle: "Final Delivery Destination",
      badge: "430 kg Fulfilled",
      coords: { x: 90, y: 40 },
      details: [
        { label: "Delivered", value: "430 kg Fresh" },
        { label: "Order Status", value: "Completed" },
        { label: "ETA Met", value: "08:45 AM" },
        { label: "Payment Status", value: "Initiated T+1" },
      ],
    },
  ];

  const currentNode = nodes.find((n) => n.id === activeNode) || nodes[0];

  return (
    <section className="border-t border-[#E2E7E2] bg-[#FAFAF7] py-20 lg:py-28">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16803A]">
              INTERACTIVE PIPELINE
            </span>
            <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#172019] sm:text-4xl">
              {t.seeHowOneOrder}
            </h2>
            <p className="mt-2 text-sm text-[#687D6B]">
              {t.moveMouseRoute} Explore each checkpoint to see live aggregation arithmetic.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Schematic Diagram */}
        <div className="mt-12 rounded-3xl border border-[#E2E7E2] bg-white p-6 shadow-sm sm:p-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
            {/* Left: Interactive Canvas Map */}
            <div className="lg:col-span-8">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl bg-[#FAFAF7] p-6 border border-[#E2E7E2]">
                {/* SVG Route Line */}
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path
                    d="M 15 35 Q 30 15, 40 25 T 65 55 T 90 40"
                    fill="none"
                    stroke="#16803A"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    className="animate-pulse"
                  />
                </svg>

                {/* Nodes on the map */}
                {nodes.map((node) => {
                  const isSelected = node.id === activeNode;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onMouseEnter={() => setActiveNode(node.id)}
                      onClick={() => setActiveNode(node.id)}
                      style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                        isSelected ? "scale-125 z-20" : "scale-100 z-10 hover:scale-110"
                      }`}
                      aria-label={`Inspect ${node.title}`}
                    >
                      <div
                        className={`grid size-9 place-items-center rounded-full shadow-md border-2 transition-colors ${
                          isSelected
                            ? "bg-[#16803A] text-white border-white ring-4 ring-[#16803A]/20"
                            : "bg-white text-[#16803A] border-[#16803A]"
                        }`}
                      >
                        {node.id === "hub" ? (
                          <Truck className="size-4" />
                        ) : node.id === "buyer" ? (
                          <CheckCircle2 className="size-4" />
                        ) : (
                          <MapPin className="size-4" />
                        )}
                      </div>
                      <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[#172019] shadow-xs border border-[#E2E7E2] backdrop-blur-xs">
                        {node.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Live Inspect Card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-[#16803A]/30 bg-[#EEF7EF] p-5 shadow-xs transition-all duration-300">
                <div className="flex items-center justify-between border-b border-[#16803A]/20 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#16803A]">
                      Node Inspector
                    </span>
                    <h4 className="font-serif text-lg font-semibold text-[#172019]">
                      {currentNode.title}
                    </h4>
                    <p className="text-xs text-[#687D6B]">{currentNode.subtitle}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 text-xs">
                  {currentNode.details.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-[#687D6B]">{item.label}:</span>
                      <span className="font-semibold text-[#172019]">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-lg bg-white p-2.5 text-center text-[11px] text-[#687D6B] border border-[#E2E7E2]">
                  Hover nodes above to inspect live checkpoint logistics
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
