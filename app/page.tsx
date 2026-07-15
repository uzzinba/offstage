"use client"

import { useState, useEffect } from "react" // 1. Aggiungi questo import
import { HeroPro } from "@/components/HeroPro"
import { Soluzione } from "@/components/Soluzione"
import { TeaserCalcolatore } from "@/components/TeaserCalcolatore"

export default function Home() {
  // 2. L'unico blocco di codice che sbugga l'idratazione della pagina
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-[#0A0A0A]" /> // Sfondo nero di caricamento
  }

  return (
    <main className="bg-[#0A0A0A]">
      <HeroPro />
      <Soluzione />
      <TeaserCalcolatore />
    </main>
  )
}