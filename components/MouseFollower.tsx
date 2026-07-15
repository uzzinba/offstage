"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function MouseFollower() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [cursorX, cursorY])

  return (
    <>
      {/* Glow principale */}
      <motion.div
        className="fixed pointer-events-none z-50 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[120px]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      
      {/* Punto centrale */}
      <motion.div
        className="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-amber-400/80"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      
      {/* Anello esterno */}
      <motion.div
        className="fixed pointer-events-none z-50 w-10 h-10 rounded-full border border-amber-400/30"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  )
}