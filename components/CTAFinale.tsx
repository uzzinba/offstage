"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, Variants } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"

export function CTAFinale() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Bagliore che pulsa
  const [glowIntensity, setGlowIntensity] = useState(0.3)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity((prev) => {
        const next = prev + (Math.random() - 0.5) * 0.1
        return Math.max(0.15, Math.min(0.6, next))
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[70vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* ============================================================
          SFONDO — BUIO CALDO CON BAGLIORE PULSANTE
          ============================================================ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Gradiente radiale che simula le luci da palco che si spengono */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at center, rgba(224,169,109,${glowIntensity * 0.15}) 0%, rgba(224,169,109,0.02) 60%, transparent 90%)`,
          }}
        />

        {/* Secondo bagliore più ampio e sottile */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] rounded-full blur-[200px] transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at center, rgba(224,169,109,${glowIntensity * 0.06}) 0%, transparent 70%)`,
          }}
        />

        {/* Particelle sottili (polvere di palco) */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const size = 1 + Math.random() * 3
            const x = Math.random() * 100
            const y = Math.random() * 100
            const duration = 8 + Math.random() * 12
            const delay = Math.random() * 6
            return (
              <div
                key={i}
                className="absolute rounded-full bg-[#E0A96D]"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: size,
                  height: size,
                  opacity: 0.03 + Math.random() * 0.05,
                  animation: `floatParticle ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            )
          })}
        </div>

        {/* Gradiente di chiusura verso il footer */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.03; }
          25% { transform: translateY(-15px) translateX(5px); opacity: 0.08; }
          50% { transform: translateY(-30px) translateX(-5px); opacity: 0.05; }
          75% { transform: translateY(-15px) translateX(3px); opacity: 0.08; }
        }
      `}</style>

      {/* ============================================================
          CONTENUTO — PULITO, FOCALIZZATO
          ============================================================ */}
      <div className="relative z-10 max-w-4xl mx-auto w-full px-6 md:px-12 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-8 md:gap-10"
        >
          {/* TITOLO — richiama l'hero, chiude il cerchio */}
          <motion.div variants={itemVariants} className="space-y-3">
            <span className="font-sans text-[#E0A96D]/40 text-xs tracking-[0.3em] uppercase font-medium">
              Pronto a suonare?
            </span>

            <h2
              className="font-sans font-bold text-[#F2EDE4] leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Tu suoni.
              <br />
              <span className="font-serif italic" style={{ color: "#E0A96D" }}>
                Al resto pensiamo noi.
              </span>
            </h2>

            <p className="font-sans font-light text-[#F2EDE4]/40 text-sm md:text-base max-w-[45ch] mx-auto leading-relaxed">
              Nessuna pressione. Solo la certezza che qualcuno si occupa di tutto il resto.
            </p>
          </motion.div>

          {/* CTA DOPPI — identici alla Hero */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            {/* Pulsante primario — calcolatore */}
            <button className="group relative flex items-center gap-3 px-8 py-4 bg-[#F2EDE4] text-black rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(224,169,109,0.3)] hover:scale-[1.02] font-sans font-medium text-sm tracking-[0.15em] uppercase cursor-pointer select-none">
              <span className="relative z-10">Calcola quanto ti resta</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Pulsante secondario — WhatsApp */}
            <button className="group relative flex items-center gap-3 px-8 py-4 bg-transparent border border-[#F2EDE4]/30 text-[#F2EDE4] rounded-full overflow-hidden transition-all duration-300 hover:border-[#E0A96D] hover:text-[#E0A96D] hover:shadow-[0_0_30px_rgba(224,169,109,0.15)] font-sans font-light text-sm tracking-[0.15em] uppercase cursor-pointer select-none">
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10">Scrivici su WhatsApp</span>
            </button>
          </motion.div>

          {/* Piccolo payoff emotivo — quasi invisibile, ma rassicurante */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-[#F2EDE4]/15 text-[10px] tracking-[0.2em] uppercase mt-2"
          >
            Una cooperativa. Persone vere. Da oltre 30 anni.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}