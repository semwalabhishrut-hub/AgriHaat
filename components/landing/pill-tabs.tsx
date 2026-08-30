"use client";

interface PillTabsProps<T extends string> {
  tabs: { id: T; label: string }[];
  activeTab: T;
  onChange: (tab: T) => void;
  className?: string;
}

export function PillTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  className = "",
}: PillTabsProps<T>) {
  return (
    <div
      className={`inline-flex flex-wrap gap-2 rounded-full bg-white p-1.5 border border-[#E2E7E2] shadow-2xs ${className}`}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-[#16803A] text-white shadow-xs"
                : "text-[#687D6B] hover:text-[#172019] hover:bg-[#EEF7EF]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
