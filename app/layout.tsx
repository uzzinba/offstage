import type { Metadata } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "OFF STAGE — Al resto pensiamo noi.",
  description: "Cooperativa per musicisti dal 1991. Gestiamo la burocrazia, tu suoni.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="bg-[#0A0A0A] antialiased">
  <Navbar />
  {children}
  <Footer />
</body>
    </html>
  )
}