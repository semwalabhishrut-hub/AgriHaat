"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function HelpWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-20 z-40">
      {open && (
        <div className="mb-3 w-72 overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
          <div className="flex items-center justify-between bg-primary px-4 py-3">
            <span className="text-sm font-medium text-white">Need help?</span>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white" aria-label="Close help widget">
              <X className="size-4" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              Ask Farm2Market AI anything about our marketplace, listings, or logistics.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                aria-label="Type your question"
              />
              <button className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary/90">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="grid size-12 place-items-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-0.5"
        aria-label="Open help chat"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>
    </div>
  );
}
