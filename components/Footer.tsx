"use client"

import Link from "next/link"
import { Mail, MessageCircle, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* COLONNA 1 — BRAND + TAGLINE */}
          <div className="md:col-span-4">
            <span className="font-sans font-bold text-[#F2EDE4] text-xl tracking-tight">
              OFF<span className="text-[#E0A96D]">.</span>STAGE
            </span>
            <p className="font-sans text-[#F2EDE4]/30 text-sm mt-2 max-w-[30ch] leading-relaxed">
              La scelta giusta per l&apos;esibizione in regola, dal 1991.
            </p>
          </div>

          {/* COLONNA 2 — NAVIGAZIONE */}
          <div className="md:col-span-3">
            <span className="font-sans text-[#F2EDE4]/20 text-[10px] tracking-[0.2em] uppercase font-medium">
              Naviga
            </span>
            <ul className="mt-3 space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Calcolatore", href: "/calcolatore" },
                { label: "FAQ", href: "/faq" }, // ← Aggiornato da "Esenzione" a "FAQ"
                { label: "Contatti", href: "/contatti" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-[#F2EDE4]/50 text-sm hover:text-[#E0A96D] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNA 3 — CONTATTI (Sede di Viadana + Sede di Milano) */}
          <div className="md:col-span-5">
            <span className="font-sans text-[#F2EDE4]/20 text-[10px] tracking-[0.2em] uppercase font-medium">
              Contatti
            </span>

            <div className="mt-3 flex flex-col gap-3">
              {/* Sede di Viadana */}
              <span className="font-sans text-[#F2EDE4]/45 text-xs font-medium">
                Sede di Viadana
              </span>
              {/* Email */}
              <a
                href="mailto:offstagecoop.nicole@gmail.com"
                className="inline-flex items-center gap-2.5 font-sans text-[#F2EDE4] hover:text-[#E0A96D] transition-colors duration-300 group"
              >
                <Mail className="w-5 h-5 text-[#E0A96D] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">offstagecoop.nicole@gmail.com</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/393280052104"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-sans text-[#F2EDE4] hover:text-[#E0A96D] transition-colors duration-300 group"
              >
                <MessageCircle className="w-5 h-5 text-[#E0A96D] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">WhatsApp</span>
              </a>

              {/* Sede di Milano */}
              <span className="font-sans text-[#F2EDE4]/45 text-xs font-medium mt-3">
                Sede di Milano
              </span>
              <a
                href="mailto:offstage.coop@gmail.com"
                className="inline-flex items-center gap-2.5 font-sans text-[#F2EDE4] hover:text-[#E0A96D] transition-colors duration-300 group"
              >
                <Mail className="w-5 h-5 text-[#E0A96D] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">offstage.coop@gmail.com</span>
              </a>
              <a
                href="tel:+393284736241"
                className="inline-flex items-center gap-2.5 font-sans text-[#F2EDE4] hover:text-[#E0A96D] transition-colors duration-300 group"
              >
                <Phone className="w-5 h-5 text-[#E0A96D] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">+39 328 473 6241</span>
              </a>
            </div>
          </div>
        </div>

        {/* BARRA LEGALE */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[#F2EDE4]/15 text-xs text-center md:text-left leading-relaxed">
            OFF STAGE Società Cooperativa — P.IVA 02294070202 — Sede legale: Via Puttina 11, 46019 Viadana (MN)
          </p>

          <div className="flex items-center gap-4 text-[#F2EDE4]/15 text-xs">
            <span>© {currentYear} OFF STAGE</span>
            <span className="w-px h-3 bg-white/5" />
            <Link href="#" className="hover:text-[#F2EDE4]/30 transition-colors duration-300">
              Privacy
            </Link>
            <span className="w-px h-3 bg-white/5" />
            <Link href="#" className="hover:text-[#F2EDE4]/30 transition-colors duration-300">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}