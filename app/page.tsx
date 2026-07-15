"use client"

import { Navbar } from "@/components/Navbar"
import { HeroPro } from "@/components/HeroPro"
import { Soluzione } from "@/components/Soluzione"
import { TeaserCalcolatore } from "@/components/TeaserCalcolatore"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0A0A0A] min-h-screen">
        <HeroPro />
        <Soluzione />
        <TeaserCalcolatore />
      </main>
    </>
  )
}