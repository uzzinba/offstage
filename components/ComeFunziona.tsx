"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useSpring, useTransform, Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    number: "01",
    title: "Ti iscrivi",
    description: "Entri nella cooperativa e siamo subito operativi per te.",
    slug: "iscrizione",
  },
  {
    number: "02",
    title: "Ci scrivi prima di ogni data",
    description: "Ci comunichi la data e a tutto il resto pensiamo noi.",
    slug: "comunicazione",
  },
  {
    number: "03",
    title: "Sali sul palco",
    description: "Tu suoni. Fatture, contributi e buste paga li gestiamo noi.",
    slug: "palco",
  },
]

export function ComeFunziona() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const [priceCount, setPriceCount] = useState(0)
  const priceRef = useRef<HTMLDivElement>(null)
  const priceInView = useInView(priceRef, { once: true, amount: 0.5 })

  const [progress, setProgress] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!progressRef.current) return
      const rect = progressRef.current.getBoundingClientRect()
      const totalHeight = rect.height
      const visibleHeight = Math.max(0, Math.min(window.innerHeight - rect.top, totalHeight))
      setProgress(Math.min(1, visibleHeight / totalHeight))
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (priceInView) {
      let start = 0
      const end = 75
      const duration = 1500
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setPriceCount(end)
          clearInterval(timer)
        } else {
          setPriceCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [priceInView])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
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

  const buttonRef = useRef<HTMLButtonElement>(null)
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const buttonX = useSpring(0, springConfig)
  const buttonY = useSpring(0, springConfig)

  const handleMagneticMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    buttonX.set(x)
    buttonY.set(y)
  }

  const handleMagneticLeave = () => {
    buttonX.set(0)
    buttonY.set(0)
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-24 md:py-32 overflow-hidden bg-[#0A0A0A]"
    >
      {/* SFONDO — GLOW DOLCE */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-400/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[150px]" />
      </div>

      <div ref={progressRef} className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12">
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
              IL PERCORSO
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-sans font-bold leading-[1.05] tracking-tight shimmer-text"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                background: "linear-gradient(135deg, #F2EDE4 20%, #E0A96D 50%, #F2EDE4 80%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 6s ease-in-out infinite",
              }}
            >
              Semplice come dovrebbe essere.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-sans font-light text-[#F2EDE4]/60 text-base md:text-lg mt-3"
            >
              Il tuo percorso verso il palco.
            </motion.p>
          </div>

          {/* TIMELINE VERTICALE */}
          <div className="relative max-w-3xl mx-auto w-full pt-8 pb-4">
            <div className="absolute left-[30px] top-0 bottom-0 w-[3px] bg-[#F2EDE4]/10 rounded-full" />

            <motion.div
              className="absolute left-[30px] top-0 w-[3px] bg-[#E0A96D] rounded-full shadow-[0_0_20px_rgba(224,169,109,0.4)]"
              style={{
                height: `${progress * 100}%`,
                opacity: progress > 0.05 ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="absolute left-[30px] top-0 w-[12px] -translate-x-1/2 rounded-full blur-xl"
              style={{
                height: `${progress * 100}%`,
                background: "rgba(224,169,109,0.15)",
                opacity: progress > 0.05 ? 0.8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            {steps.map((step, index) => {
              const stepRef = useRef<HTMLDivElement>(null)
              const isStepInView = useInView(stepRef, { once: true, amount: 0.6 })
              const stepProgress = Math.max(0, Math.min(1, (progress - index * 0.3) / 0.3))

              return (
                <motion.div
                  key={index}
                  ref={stepRef}
                  variants={itemVariants}
                  className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                    index === 0 ? "" : "pt-4"
                  }`}
                >
                  <motion.div
                    className="relative z-10 w-3 h-3 rounded-full bg-[#0A0A0A] border-2 transition-colors duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                    style={{
                      borderColor: stepProgress > 0.5 ? "#E0A96D" : "#F2EDE4/20",
                      boxShadow: stepProgress > 0.5
                        ? "0 0 30px rgba(224,169,109,0.2)"
                        : "0 4px 20px rgba(0,0,0,0.04)",
                    }}
                  />

                  <motion.div
                    className="flex-1 pt-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: isStepInView || stepProgress > 0.3 ? 1 : 0,
                      x: isStepInView || stepProgress > 0.3 ? 0 : 20,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span
                      className="font-serif italic font-black text-7xl md:text-8xl leading-none tracking-tight transition-colors duration-700"
                      style={{
                        color: stepProgress > 0.7
                          ? "#E0A96D"
                          : stepProgress > 0.3
                            ? "#F2EDE4/60"
                            : "#F2EDE4/20",
                        opacity: stepProgress > 0.1 ? 1 : 0.3,
                      }}
                    >
                      {step.number}
                    </span>

                    <h3 className="font-sans font-bold text-[#F2EDE4] text-2xl mt-2">
                      {step.title}
                    </h3>

                    <p className="font-sans font-light text-[#F2EDE4]/70 text-sm md:text-base mt-1 max-w-[40ch] leading-relaxed">
                      {step.description}
                    </p>

                    <Link
                      href={`/approfondisci/${step.slug}`}
                      className="inline-flex items-center gap-1 text-[#E0A96D] text-sm font-medium mt-3 hover:underline transition-colors"
                    >
                      Approfondisci
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <motion.div
                      className="w-16 h-0.5 rounded-full mt-4 transition-colors duration-700"
                      style={{
                        background: stepProgress > 0.7
                          ? "linear-gradient(to right, #E0A96D, #E0A96D/40)"
                          : "linear-gradient(to right, #F2EDE4/20, #F2EDE4/5)",
                      }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* ============================================================
              BLOCCO PREZZO — DEFINITIVO (PLUG-AND-PLAY)
              ============================================================ */}
          <motion.div
            ref={priceRef}
            variants={itemVariants}
            className="relative max-w-3xl mx-auto w-full mt-8"
          >
            <motion.div
              className="absolute -inset-8 bg-[#E0A96D]/10 blur-3xl rounded-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: priceInView ? 0.8 : 0 }}
              transition={{ duration: 1 }}
            />

            <div className="relative p-8 md:p-12 rounded-3xl border border-[#E0A96D]/25 bg-[#0A0A0A] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E0A96D]/40 to-transparent" />
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#E0A96D]/8 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#E0A96D]/8 rounded-full blur-3xl" />

              <div className="relative z-10 text-center space-y-4 md:space-y-6">
                <span className="font-sans text-[#F2EDE4]/30 text-[10px] tracking-[0.25em] uppercase font-medium">
                  Quota annuale
                </span>

                <div className="flex items-center justify-center gap-3">
                  <motion.span
                    className="font-sans font-bold text-[#F2EDE4] leading-none tracking-tight"
                    style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  >
                    a partire da € {priceCount}
                  </motion.span>
                  <span className="font-sans font-light text-[#F2EDE4]/30 text-xl mt-2">
                    / anno
                  </span>
                </div>

                <motion.p
                  className="font-sans font-light text-[#F2EDE4]/60 text-sm md:text-base max-w-[45ch] mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: priceInView ? 1 : 0, y: priceInView ? 0 : 10 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Con <span className="text-[#E0A96D] font-medium">75 € all'anno</span> hai un ufficio amministrativo dedicato.
                  <br />
                  <span className="text-[#F2EDE4]/40 text-xs">
                    * Potrebbero applicarsi costi aggiuntivi in base alle tue esigenze specifiche.
                  </span>
                </motion.p>

                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: priceInView ? 1 : 0, y: priceInView ? 0 : 10 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <motion.button
                    ref={buttonRef}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#F2EDE4] text-black rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(224,169,109,0.3)] font-sans font-medium text-sm tracking-[0.15em] uppercase"
                    style={{
                      transform: `translate(${buttonX.get()}px, ${buttonY.get()}px)`,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Calcola quanto ti resta</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}