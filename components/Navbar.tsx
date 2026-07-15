"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

const links = [
  { label: "Home", href: "/" },
  { label: "Calcolatore", href: "/calcolatore" },
  { label: "Esenzione", href: "/esenzione" },
  { label: "Contatti", href: "/contatti" },
]

export function Navbar() {
  const [active, setActive] = useState("Home")
  const [scrolled, setScrolled] = useState(false)
  const [mouseX, setMouseX] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const navRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  // Effetto scroll per far sparire/comparire la navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Aggiorna lo stato "scrolled" per lo sfondo
      setScrolled(currentScrollY > 40)
      
      // Logica hide/show
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrollando verso il basso → nasconde
        setIsVisible(false)
      } else {
        // Scrollando verso l'alto → mostra
        setIsVisible(true)
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = navRef.current?.getBoundingClientRect()
    if (rect) {
      setMouseX(e.clientX - rect.left)
    }
  }

  const handleMouseLeave = () => {
    setMouseX(null)
  }

  return (
    <header
      className={`fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
      }`}
    >
      <nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`pointer-events-auto relative flex items-center justify-center gap-8 px-8 h-14 rounded-full border transition-all duration-500 backdrop-blur-xl overflow-hidden ${
          scrolled
            ? "border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            : "border-white/5"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(24,24,24,0.92) 0%, rgba(10,10,10,0.88) 100%)",
        }}
      >
        {/* ============================================================
            SPOTLIGHT CINEMATOGRAFICO — luce che segue il mouse
            ============================================================ */}
        {mouseX !== null && (
          <div
            className="absolute top-0 bottom-0 w-[200px] pointer-events-none"
            style={{
              left: mouseX - 100,
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(224,169,109,0.12) 0%, transparent 70%)",
            }}
          />
        )}

        {/* GLOW PULSANTE SUL BORDO INFERIORE — effetto "wow" */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#E0A96D]/20 to-transparent animate-pulse" />

        {/* VOCI MENU — CENTRATE */}
        <ul className="flex items-center gap-8 relative z-10">
          {links.map((link) => {
            const isActive = active === link.label
            return (
              <li key={link.label} className="relative">
                {/* SPOTLIGHT DA PALCO — solo per la voce attiva */}
                {isActive && (
                  <>
                    <span className="absolute -top-[19px] left-1/2 -translate-x-1/2 w-6 h-[3px] rounded-full bg-[#E0A96D] shadow-[0_0_10px_2px_rgba(224,169,109,0.9)]" />
                    <span
                      className="absolute -top-[19px] left-1/2 -translate-x-1/2 w-20 h-14 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse 45% 100% at 50% 0%, rgba(224,169,109,0.30) 0%, rgba(224,169,109,0.06) 45%, transparent 72%)",
                      }}
                    />
                  </>
                )}

                <Link
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  className={`relative text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-[#F2EDE4]"
                      : "text-[#F2EDE4]/40 hover:text-[#F2EDE4]/70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* SEPARATORE RIMOSSO — WhatsApp rimosso */}
      </nav>
    </header>
  )
}