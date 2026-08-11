"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Home", href: "/" },
  { label: "Calcolatore", href: "/calcolatore" },
  { label: "FAQ", href: "/faq" },
  { label: "Contatti", href: "/contatti" },
]

export function Navbar() {
  const [active, setActive] = useState("Home")
  const [scrolled, setScrolled] = useState(false)
  const [mouseX, setMouseX] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 40)
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false)
        setIsMenuOpen(false)
      } else {
        setIsVisible(true)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isMenuOpen])

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
        className={`pointer-events-auto relative flex items-center justify-between md:justify-center gap-2 md:gap-8 px-4 md:px-8 h-14 w-full md:w-auto rounded-full border transition-all duration-500 backdrop-blur-xl ${
          scrolled
            ? "border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            : "border-white/15"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(8,8,8,0.95) 100%)",
        }}
      >
        {mouseX !== null && (
          <div
            className="absolute top-0 bottom-0 w-[200px] pointer-events-none hidden md:block"
            style={{
              left: mouseX - 100,
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(224,169,109,0.12) 0%, transparent 70%)",
            }}
          />
        )}

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#E0A96D]/20 to-transparent animate-pulse" />

        <span className="md:hidden font-sans font-bold text-[#F2EDE4] text-sm tracking-tight z-10">
          OFF<span className="text-[#E0A96D]">.</span>STAGE
        </span>

        <ul className="hidden md:flex items-center gap-8 relative z-10">
          {links.map((link) => {
            const isActive = active === link.label
            return (
              <li key={link.label} className="relative">
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

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-20 text-[#F2EDE4] hover:text-[#E0A96D] transition-colors p-1"
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[calc(100vw-2rem)] max-w-sm p-6 rounded-2xl border border-white/10 bg-[#0A0A0A]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] max-h-[80vh] overflow-y-auto">
            <ul className="flex flex-col items-center gap-6">
              {links.map((link) => {
                const isActive = active === link.label
                return (
                  <li key={link.label} className="w-full">
                    <Link
                      href={link.href}
                      onClick={() => {
                        setActive(link.label)
                        setIsMenuOpen(false)
                      }}
                      className={`block w-full text-center text-[15px] tracking-[0.15em] uppercase font-medium transition-colors duration-300 py-2 px-4 rounded-lg break-words ${
                        isActive
                          ? "text-[#F2EDE4] bg-[#E0A96D]/10"
                          : "text-[#F2EDE4]/60 hover:text-[#F2EDE4] hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}