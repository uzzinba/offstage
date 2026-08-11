"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/DJ_with_hands_raised_crowd_202607131933.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 z-1 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[150px] mix-blend-screen" />
      <div className="absolute bottom-1/3 right-1/3 z-1 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          <motion.span
            className="inline-block text-amber-500/70 text-xs tracking-[0.3em] uppercase font-body mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            DAL 1991
          </motion.span>

          <motion.h2
            className="font-display italic text-amber-400 text-[clamp(2rem,4.5vw,4rem)] font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Tu suoni.
          </motion.h2>

          <motion.h1
            className="font-display text-[clamp(3.5rem,8vw,7rem)] font-bold text-[#F2EDE4] leading-[1.05] mt-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block">Al resto</span>
            <span className="block">pensiamo noi.</span>
          </motion.h1>

          <motion.p
            className="text-[#F2EDE4]/60 text-base md:text-lg max-w-[42ch] leading-relaxed mt-6 font-body"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Agibilità, contributi, fatture, buste paga. Al resto pensiamo noi — e a rispondere c'è sempre una persona vera.
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              href="/contatti"
              className="inline-flex items-center gap-3 border border-[#F2EDE4]/30 text-[#F2EDE4] hover:bg-[#F2EDE4]/10 hover:border-[#F2EDE4] px-8 py-6 text-sm tracking-wider rounded-full transition-all duration-300"
            >
              SCOPRI DI PIÙ
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 border border-[#F2EDE4]/20 rounded-full flex justify-center pt-2">
          <div className="w-0.5 h-1.5 bg-[#F2EDE4]/40 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}