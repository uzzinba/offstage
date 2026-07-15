"use client"

import { useRef, useEffect, useState } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion"
import { ArrowRight } from "lucide-react"
import ParticlesBackground from "./Particles"

export function HeroPro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((prev) => [...prev, { id, x, y }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)
  }

  const [isBouncing, setIsBouncing] = useState(false)

  const handleBounce = () => {
    setIsBouncing(true)
    setTimeout(() => setIsBouncing(false), 400)
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [2.5, -2.5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-2.5, 2.5]), springConfig)

  const videoProgress = useMotionValue(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const updateProgress = () => {
      if (video.duration) {
        videoProgress.set(video.currentTime / video.duration)
      }
      requestAnimationFrame(updateProgress)
    }
    updateProgress()
  }, [videoProgress])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x * 2)
    mouseY.set(y * 2)
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]"
      onMouseMove={handleMouseMove}
    >
      {/* VIDEO SFONDO */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/Guitarist_on_stage_animation_202607110000.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-[#0A0A0A]/20 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-transparent z-[1]" />
      </div>

      {/* PARTICELLE */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* LUCI DA PALCO */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 z-[1] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[200px] mix-blend-screen" />
      <div className="absolute bottom-1/3 right-1/3 z-[1] w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[150px] mix-blend-screen" />

      {/* SCRITTA "OFF STAGE" IN HERO */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pointer-events-none translate-y-1/2 select-none">
        <span
          className="font-sans font-black text-[clamp(6rem,22vw,19rem)] tracking-[-0.04em] leading-none uppercase text-transparent"
          style={{ WebkitTextStroke: "1px rgba(242, 237, 228, 0.25)" }}
        >
          OFF STAGE
        </span>
      </div>

      {/* CONTENUTO PRINCIPALE — CORRETTO */}
      <div className="relative z-10 h-full flex items-center" style={{ perspective: "1000px" }}>
        <motion.div
          className="max-w-7xl mx-auto w-full px-4 md:px-8"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="max-w-6xl">
            <motion.h1
              className="font-sans font-bold text-[clamp(4rem,12vw,9rem)] text-[#F2EDE4] leading-[0.9] tracking-[-0.03em]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Tu suoni.
            </motion.h1>

            <motion.h2
              className="font-serif italic text-[clamp(4rem,12vw,9rem)] leading-[0.9] tracking-[-0.02em] mt-0 shimmer-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Al resto pensiamo noi.
            </motion.h2>

            <motion.p
              className="font-sans font-light text-[#F2EDE4]/40 text-sm md:text-base max-w-[50ch] leading-relaxed mt-4 tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Gestiamo tutta la parte amministrativa dei tuoi concerti. Tu continui a fare musica, noi ci occupiamo del resto.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="relative group">
                <motion.button
                  ref={buttonRef}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  onClick={(e) => {
                    handleRipple(e)
                    handleBounce()
                  }}
                  animate={isBouncing ? { scale: [1, 0.95, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative flex items-center gap-4 px-8 py-4 bg-[#F2EDE4] rounded-full overflow-hidden glow-pulse transition-all duration-300 hover:shadow-[0_0_40px_rgba(224,169,109,0.5)] hover:scale-[1.02] cursor-pointer select-none"
                  style={{
                    transform: `translate(${buttonX.get()}px, ${buttonY.get()}px)`,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  />
                  <div
                    className="absolute top-0 left-[10%] right-[10%] h-[45%] rounded-t-full pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)",
                    }}
                  />
                  <span className="relative z-10 text-black text-[11px] tracking-[0.2em] uppercase font-sans font-medium">
                    CALCOLA QUANTO TI RESTA
                  </span>
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/10">
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>

                  <AnimatePresence>
                    {ripples.map((ripple) => (
                      <motion.span
                        key={ripple.id}
                        className="absolute rounded-full bg-amber-400/30 pointer-events-none"
                        style={{
                          left: ripple.x - 50,
                          top: ripple.y - 50,
                          width: 100,
                          height: 100,
                        }}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    ))}
                  </AnimatePresence>
                </motion.button>
              </div>

              <div className="relative group">
                <button className="relative flex items-center justify-center px-8 py-4 bg-transparent border border-[#F2EDE4]/30 rounded-full overflow-hidden transition-all duration-300 hover:border-[#E0A96D] hover:text-[#E0A96D] hover:shadow-[0_0_30px_rgba(224,169,109,0.25)] text-[#F2EDE4] text-xs tracking-widest uppercase font-medium cursor-pointer select-none">
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(224, 169, 109, 0.08) 0%, rgba(224, 169, 109, 0) 80%)",
                      border: "1px solid rgba(224, 169, 109, 0.15)",
                    }}
                  />
                  <div
                    className="absolute top-0 left-[15%] right-[15%] h-[30%] rounded-t-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(224, 169, 109, 0.15) 0%, rgba(224, 169, 109, 0) 100%)",
                    }}
                  />
                  <span className="relative z-10 text-[#F2EDE4] group-hover:text-amber-400 transition-colors duration-500 text-[11px] tracking-[0.2em] uppercase font-sans font-light">
                    Scrivici su WhatsApp
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}