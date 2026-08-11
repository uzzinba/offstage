"use client"

import { HeroPro } from "@/components/HeroPro"
import { Soluzione } from "@/components/Soluzione"
import { TeaserCalcolatore } from "@/components/TeaserCalcolatore"
import { ComeFunziona } from "@/components/ComeFunziona"
import { PercheNoi } from "@/components/PercheNoi"
import { Testimonianze } from "@/components/Testimonianze"
import { CTAFinale } from "@/components/CTAFinale"

export default function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <HeroPro />
      <Soluzione />
      <TeaserCalcolatore />
      <ComeFunziona />
      <PercheNoi />
      <Testimonianze />
      <CTAFinale />
    </main>
  )
}