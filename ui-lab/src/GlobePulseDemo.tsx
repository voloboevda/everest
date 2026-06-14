"use client";

import { GlobePulse } from "@/components/ui/cobe-globe-pulse";

export default function GlobePulseDemo() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center overflow-hidden bg-black p-8">
      <div className="w-full max-w-lg">
        <p className="mb-6 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/35">
          [05] Geography — UI Lab
        </p>
        <GlobePulse />
      </div>
    </div>
  );
}
