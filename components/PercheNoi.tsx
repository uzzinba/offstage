"use client"

import { useRef } from "react"
import { motion, useInView, Variants } from "framer-motion"
import { X, Check } from "lucide-react"

export function PercheNoi() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 4,
    opacity: 0.05 + Math.random() * 0.12,
  }))

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const itemVariantsRight: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const contrastItems = [
    {
      portal: "Compili moduli senza fine",
      offstage: "Iscrizione rapida e guidata da noi",
    },
    {
      portal: "Apri ticket e aspetti",
      offstage: "Trovi sempre qualcuno per risolvere i problemi",
    },
    {
      portal: "Non sai mai chi ti segue",
      offstage: "Sai chi ti segue e come lavora",
    },
    {
      portal: "Sei solo un numero",
      offstage: "Sei uno dei nostri artisti",
    },
  ]

  return (
    <section
      ref={ref}
      className="relative w-full py-24 md:py-32 overflow-hidden bg-[#0A0A0A]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-16"
        >
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              variants={itemVariants}
              className="font-sans text-[#E0A96D]/60 text-[11px] tracking-[0.3em] uppercase font-medium"
            >
              PERCHÉ NOI
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-sans font-bold text-[#F2EDE4] leading-[1.05] tracking-tight mt-3"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Non siamo un portale.
              <br />
              <span className="font-serif italic shimmer-text">
                Siamo persone.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-sans font-light text-[#F2EDE4]/60 text-base md:text-lg mt-4 max-w-[50ch] mx-auto"
            >
              La differenza tra un portale automatico e un team di persone che ti segue davvero.
            </motion.p>
          </div>

          {/* CONTRASTO */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            <motion.div
              variants={itemVariants}
              className="relative p-8 md:p-10 rounded-2xl bg-white/5 border border-white/5 hover:border-red-500/20 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <X className="w-5 h-5 text-red-400/60" />
                </div>
                <span className="font-sans font-bold text-[#F2EDE4]/40 text-sm tracking-[0.1em] uppercase">
                  Portale automatico
                </span>
              </div>
              <ul className="space-y-4">
                {contrastItems.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3 text-[#F2EDE4]/30"
                  >
                    <X className="w-4 h-4 shrink-0 mt-0.5 text-red-400/30" />
                    <span className="font-sans font-light text-sm md:text-base">
                      {item.portal}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariantsRight}
              className="relative p-8 md:p-10 rounded-2xl bg-[#E0A96D]/5 border border-[#E0A96D]/20 hover:border-[#E0A96D]/40 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#E0A96D]/10 border border-[#E0A96D]/20">
                  <Check className="w-5 h-5 text-[#E0A96D]" />
                </div>
                <span className="font-sans font-bold text-[#E0A96D] text-sm tracking-[0.1em] uppercase">
                  OFF STAGE
                </span>
              </div>
              <ul className="space-y-4">
                {contrastItems.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariantsRight}
                    className="flex items-start gap-3 text-[#F2EDE4]/80"
                  >
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-[#E0A96D]" />
                    <span className="font-sans font-light text-sm md:text-base">
                      {item.offstage}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* CARD DI NICOLE — TESTO MODIFICATO */}
          <motion.div
            variants={itemVariants}
            className="relative p-8 md:p-12 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {particles.map((p) => (
                <div
                  key={p.id}
                  className="absolute rounded-full bg-[#E0A96D]"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: p.size,
                    height: p.size,
                    opacity: p.opacity,
                    animation: `floatParticle ${4 + p.delay}s ease-in-out infinite`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              ))}
            </div>

            <style jsx>{`
              @keyframes floatParticle {
                0%, 100% { transform: translateY(0); opacity: 0.03; }
                50% { transform: translateY(-20px); opacity: 0.12; }
              }
            `}</style>

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E0A96D]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#E0A96D]/5 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-12">
              <div className="shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#E0A96D]/20 to-[#E0A96D]/5 border-2 border-[#E0A96D]/20 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(224,169,109,0.15)]">
                  <img
                    src="/owners.webp"
                    alt="Nicole Bocchi"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 5%" }}
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                  <span className="font-sans font-bold text-[#F2EDE4] text-xl">
                    Nicole Bocchi
                  </span>
                </div>

                <blockquote className="font-serif italic text-[#F2EDE4]/70 text-lg md:text-xl leading-relaxed max-w-[50ch]">
                  "Dietro OFF STAGE ci sono persone vere. Conosciamo le esigenze di chi suona e lavora nel mondo della musica."
                </blockquote>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}