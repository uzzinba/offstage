"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CalcolatorePage() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <Link
        href="/"
        className="fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#F2EDE4] backdrop-blur-md transition-colors hover:border-[#E0A96D]/40 hover:text-[#E0A96D]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Torna al sito
      </Link>

      <iframe src="/calcolatore/index.html" className="h-screen w-full border-0" />
    </div>
  );
}