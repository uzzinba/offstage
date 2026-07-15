"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Animazione del logo che "carica"
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Dopo il 100%, aspetta 300ms poi esce
          setTimeout(() => {
            setIsVisible(false)
            onComplete()
          }, 500)
          return 100
        }
        return prev + 1
      })
    }, 30) // 100% in ~3 secondi

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center"
      initial={{ y: "100%" }}
      animate={{ y: isVisible ? "0%" : "-100%" }}
      transition={{ 
        type: "spring",
        damping: 30,
        stiffness: 100,
        mass: 1,
        duration: 0.8
      }}
    >
      <div className="text-center relative">
        {/* GLOW DI SFONDO */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* LOGO */}
        <motion.div
          className="relative z-10"
          animate={{
            scale: progress < 100 ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: progress < 100 ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-[200px] h-[200px] mx-auto">
            {/* Cerchio che si riempie */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#F2EDE4/10"
                strokeWidth="2"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E0A96D"
                strokeWidth="2"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(224, 169, 109, 0.3))",
                }}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Testo OFF STAGE */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.span
                  className="block font-display text-3xl font-bold text-[#F2EDE4] tracking-[0.3em]"
                  animate={{
                    opacity: progress > 20 ? 1 : 0,
                  }}
                >
                  OFF
                </motion.span>
                <motion.span
                  className="block font-display text-2xl font-light text-amber-400/60 tracking-[0.5em]"
                  animate={{
                    opacity: progress > 40 ? 1 : 0,
                  }}
                >
                  STAGE
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PERCENTUALE */}
        <motion.div
          className="relative z-10 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 10 ? 1 : 0 }}
        >
          <span className="font-display text-6xl font-light text-[#F2EDE4]">
            {progress}%
          </span>
        </motion.div>

        {/* SOTTOTITOLO */}
        <motion.p
          className="relative z-10 mt-4 text-[#F2EDE4]/30 text-sm tracking-[0.2em] uppercase font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 60 ? 1 : 0 }}
        >
          Caricamento in corso...
        </motion.p>
      </div>
    </motion.div>
  )
}