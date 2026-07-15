"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// Costanti editabili
const WORDS = ["Agibilità.", "Contributi.", "INPS.", "INAIL.", "Fatture.", "Buste paga.", "Scadenze."]
const FINAL_TEXT = "Al resto pensiamo noi."

export function ScrollTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Fase 1: hero fade out (0-25%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.05])

  // Fase 2: wipe panna (15-85%)
  const wipeOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1])
  const wipeProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])

  // Fase 3: contenuto che emerge (70-100%)
  const contentOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      
      {/* HERO - pinned in alto */}
      <motion.div 
        className="sticky top-0 h-screen overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="relative w-full h-full bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/DJ_with_hands_raised_crowd_202607131933.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8">
              <div className="max-w-3xl">
                <span className="text-amber-500/70 text-xs tracking-[0.3em] uppercase font-body">
                  DAL 1991
                </span>
                <h2 className="font-display italic text-amber-400 text-[clamp(2rem,4.5vw,4rem)] font-light mt-2">
                  Tu suoni.
                </h2>
                <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] font-bold text-[#F2EDE4] leading-[1.05]">
                  <span className="block">Al resto</span>
                  <span className="block">pensiamo noi.</span>
                </h1>
                <p className="text-[#F2EDE4]/60 text-base md:text-lg max-w-[42ch] leading-relaxed mt-6 font-body">
                  Agibilità, contributi, fatture, buste paga. Al resto pensiamo noi — e a rispondere c'è sempre una persona vera.
                </p>
                <button className="mt-8 px-8 py-4 border border-[#F2EDE4]/30 text-[#F2EDE4] hover:bg-[#F2EDE4]/10 hover:border-[#F2EDE4] transition-all duration-300 rounded-full text-sm tracking-wider font-body">
                  CALCOLA QUANTO TI RESTA
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* PANNELLO PANNA - il wipe */}
      <motion.div 
        className="sticky top-0 h-screen bg-[#F2EDE4] flex items-center justify-center overflow-hidden"
        style={{ opacity: wipeOpacity }}
      >
        <div className="text-center px-4 max-w-4xl mx-auto">
          
          {/* Parole che compaiono in sequenza */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
            {WORDS.map((word, i) => {
              const delay = i / WORDS.length
              const wordOpacity = useTransform(
                wipeProgress, 
                [delay, delay + 0.15], 
                [0, 1]
              )
              return (
                <motion.span
                  key={i}
                  className="text-3xl md:text-5xl font-body font-light text-black/20"
                  style={{ opacity: wordOpacity }}
                >
                  {word}
                </motion.span>
              )
            })}
          </div>

          {/* Testo finale */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-black"
            style={{ 
              opacity: useTransform(wipeProgress, [0.7, 0.85], [0, 1]),
              y: useTransform(wipeProgress, [0.7, 0.85], [20, 0])
            }}
          >
            {FINAL_TEXT}
          </motion.h2>
        </div>
      </motion.div>

      {/* CONTENUTO SOTTO */}
      <div className="relative z-10 bg-[#F2EDE4]">
        <motion.div style={{ opacity: contentOpacity }}>
          <div className="min-h-screen bg-[#F2EDE4] py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-display text-black text-center">
                I nostri servizi
              </h2>
              <p className="text-center text-black/60 mt-4">
                (Qui metterai la sezione servizi, calcolatore, etc.)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}