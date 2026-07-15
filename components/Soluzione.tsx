"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, ClipboardCheck, Users, Shield, Receipt, HelpCircle } from "lucide-react"

const serviziData = [
  {
    id: 1,
    title: "Apriamo la tua agibilità",
    description: "Pratiche INPS ex ENPALS e scadenza tassativa per ogni ingaggio, in Italia e all'estero. La gestiamo noi.",
    icon: <FileText className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
  {
    id: 2,
    title: "Emettiamo le tue fatture",
    description: "Fatturazione elettronica corretta, invio allo SDI e conservazione. Puntuale, senza che tu ti perda.",
    icon: <Receipt className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
  {
    id: 3,
    title: "Prepariamo buste paga e CU",
    description: "Buste paga e Certificazione Unica pronte quando servono, per te e per i tuoi collaboratori.",
    icon: <Users className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
  {
    id: 4,
    title: "Versiamo i tuoi contributi",
    description: "Calcoli, F24 e adempimenti INAIL a ogni scadenza. Ti assicuriamo di essere sempre in regola.",
    icon: <ClipboardCheck className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
  {
    id: 5,
    title: "Recuperiamo l'IVA",
    description: "Ti aiutiamo a recuperare l'IVA sugli acquisti inerenti alla tua attività.",
    icon: <Shield className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
  {
    id: 6,
    title: "Ti assistiamo nei controlli",
    description: "In caso di verifiche fiscali o ispettive, ci siamo noi al tuo fianco.",
    icon: <HelpCircle className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
]

export function Soluzione() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHoveringSlides, setIsHoveringSlides] = useState(false)
  const slideZoneRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(0)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isHoveringSlides) return

      const now = performance.now()
      if (now - lastScrollTime.current < 500) {
        e.preventDefault()
        return
      }

      if (e.deltaY > 0 && activeIndex < serviziData.length - 1) {
        e.preventDefault()
        setActiveIndex((prev) => prev + 1)
        lastScrollTime.current = now
      } else if (e.deltaY < 0 && activeIndex > 0) {
        e.preventDefault()
        setActiveIndex((prev) => prev - 1)
        lastScrollTime.current = now
      }
    }

    const element = slideZoneRef.current
    if (element) {
      element.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel)
      }
    }
  }, [isHoveringSlides, activeIndex])

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex items-center pt-24 pb-20 overflow-hidden">
      
      {/* ============================================================
          SCRITTA "OFF STAGE" — RIMOSSA (era qui)
          ============================================================ */}

      {/* GLOW DI PROFONDITÀ AMBIENTALE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px]"
             style={{ background: "rgba(224, 169, 109, 0.03)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* PARTE SINISTRA: Testo Fisso */}
        <div>
          <span className="font-sans text-[#E0A96D]/60 text-xs tracking-[0.3em] uppercase font-medium">
            I NOSTRI SERVIZI
          </span>

          <h2 
            className="font-sans font-bold leading-[1.15] tracking-tight mt-4 mb-2 text-[#F2EDE4]"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
          >
            Agibilità, contributi, scadenze.
            <br />
            Ogni esibizione è anche questo.
          </h2>

          <h3 
            className="font-serif italic leading-[1.15] tracking-tight mb-4"
            style={{ 
              fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
              color: "#E0A96D"
            }}
          >
            Per questo ci siamo noi.
          </h3>

          <p className="font-sans font-light text-[#F2EDE4]/50 text-sm md:text-base max-w-[45ch] mb-8">
            Ecco tutto quello che succede off stage. Esplora i servizi passando sulle card.
          </p>

          {/* Indicatori */}
          <div className="flex gap-2.5 items-center">
            {serviziData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  index === activeIndex 
                    ? "w-8" 
                    : "w-2 bg-[#F2EDE4]/20 hover:bg-[#F2EDE4]/40"
                }`}
                style={index === activeIndex ? { backgroundColor: "#E0A96D" } : {}}
              />
            ))}
          </div>
        </div>

        {/* PARTE DESTRA: Zona Attivazione Slide */}
        <div 
          ref={slideZoneRef}
          onMouseEnter={() => setIsHoveringSlides(true)}
          onMouseLeave={() => setIsHoveringSlides(false)}
          className={`relative h-[280px] w-full flex items-center justify-center rounded-2xl p-2 transition-all duration-300 ${
            isHoveringSlides 
              ? "border border-[#E0A96D]/10" 
              : "border border-transparent"
          }`}
          style={isHoveringSlides ? { background: "rgba(224, 169, 109, 0.02)" } : {}}
        >
          <div className={`absolute -top-3 right-6 bg-[#121212] border border-white/10 px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider transition-opacity duration-300 ${
            isHoveringSlides ? "opacity-100" : "opacity-0"
          }`}
          style={{ color: "#E0A96D" }}>
            Scorri qui
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full p-8 rounded-xl border border-white/5 bg-[#0D0D0D] backdrop-blur-md relative"
              style={{
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255,255,255,0.05)"
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#E0A96D]/20 to-transparent" />

              <div className="flex gap-5 items-start">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 shrink-0">
                  {serviziData[activeIndex].icon}
                </div>
                <div>
                  <span className="text-[#E0A96D]/40 text-[10px] tracking-widest uppercase font-mono block mb-1">
                    0{activeIndex + 1} / 0{serviziData.length}
                  </span>
                  <h3 className="font-sans font-semibold text-xl text-[#F2EDE4] mb-3">
                    {serviziData[activeIndex].title}
                  </h3>
                  <p className="font-sans font-light text-[#F2EDE4]/70 text-sm md:text-base leading-relaxed">
                    {serviziData[activeIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}