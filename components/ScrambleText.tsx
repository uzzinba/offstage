"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><"

interface ScrambleTextProps {
  text: string
  delay?: number
  triggered?: boolean
  className?: string
}

export function ScrambleText({ text, delay = 0, triggered = true, className = "" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)

  useEffect(() => {
    if (!triggered) return

    const timer = setTimeout(() => {
      setIsScrambling(true)
      const chars = text.split("")
      const total = chars.length
      let revealed = 0
      let iterations = 0

      const interval = setInterval(() => {
        // Rivela progressivamente
        const revealCount = Math.min(Math.floor(iterations * 0.5), total)
        
        const newChars = chars.map((char, i) => {
          if (i < revealCount) return char
          if (char === " ") return " "
          if (i < revealCount + 3) return CHARS[Math.floor(Math.random() * CHARS.length)]
          return " "
        })

        setDisplayText(newChars.join(""))
        iterations++

        if (revealCount >= total) {
          clearInterval(interval)
          setDisplayText(text)
          setIsScrambling(false)
        }
      }, 25)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay, triggered])

  return (
    <span className={className}>
      {isScrambling || !triggered ? displayText : text}
    </span>
  )
}