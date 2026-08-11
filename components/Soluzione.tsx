"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Users, Shield, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"

const serviziData = [
  {
    id: 1,
    title: "Apriamo la tua agibilità (ex ENPALS)",
    description: "Pratiche INPS e INAIL. Gestiamo tutto noi.",
    icon: <FileText className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
  {
    id: 2,
    title: "Emettiamo le tue fatture",
    description: "Fatturazione elettronica e invio telematico presso l'agenzia delle entrate.",
    icon: <FileText className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
  {
    id: 3,
    title: "Prepariamo buste paga e CU",
    description: "Emissione buste paghe e certificazione unica per te e per i tuoi collaboratori.",
    icon: <Users className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
  {
    id: 4,
    title: "Ti assistiamo nei controlli",
    description: "In caso di necessità, ti inviamo la documentazione necessaria.",
    icon: <HelpCircle className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
  {
    id: 5,
    title: "Recupero crediti",
    description: "In caso di mancati pagamenti possiamo inviare noi una PEC con valenza legale.",
    icon: <Shield className="w-5 h-5" style={{ color: "#E0A96D" }} />,
  },
]

export function Soluzione() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % serviziData.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + serviziData.length) % serviziData.length)
  }

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] text-[#F2EDE4] flex items-center pt-24 pb-20 overflow-hidden">
      
      {/* GLOW DI PROFONDITÀ AMBIENTALE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px]"
             style={{ background: "rgba(224, 169, 109, 0.03)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* PARTE SINISTRA: Testo Fisso */}
        <div>
          <span className="font-sans text-[#E0A96D]/60 text-[11px] tracking-[0.3em] uppercase font-medium">
            I NOSTRI SERVIZI
          </span>

          <h2 
            className="font-sans font-bold leading-[1.15] tracking-tight mt-4 mb-2 text-[#F2EDE4]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
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

          {/* FRASE RIMOSSA: "Ecco tutto quello che succede off stage..." */}
        </div>

        {/* PARTE DESTRA: Zona Card con Navigazione */}
        <div className="relative h-[280px] w-full flex items-center justify-center">
          
          {/* Card corrente */}
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
                  <p className="font-sans font-light text-[#F2EDE4]/80 text-sm md:text-base leading-relaxed">
                    {serviziData[activeIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* FRECCE DI NAVIGAZIONE */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#0D0D0D] border border-white/10 hover:border-[#E0A96D]/40 text-[#F2EDE4]/50 hover:text-[#E0A96D] transition-all duration-300 flex items-center justify-center"
            aria-label="Precedente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#0D0D0D] border border-white/10 hover:border-[#E0A96D]/40 text-[#F2EDE4]/50 hover:text-[#E0A96D] transition-all duration-300 flex items-center justify-center"
            aria-label="Successivo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* PALLINI — sotto la card (a destra) */}
      <div className="absolute bottom-10 right-0 left-0 md:left-auto md:right-[10%] flex justify-center md:justify-start gap-2.5 items-center">
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
    </section>
  )
}