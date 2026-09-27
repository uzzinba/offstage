"use client"

import { useRef, useState } from "react"
import { motion, useInView, Variants } from "framer-motion"
import { Building2, Mail, MapPin, MessageCircle, Phone, Send, CheckCircle } from "lucide-react"

export default function Contatti() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 4000)
  }

  // Un riquadro per sede. Ogni riga con href diventa un link a sé
  // (se un riquadro ha una sola riga con href, diventa cliccabile tutto il riquadro).
  const contatti: {
    icon: React.ReactNode
    title: string
    righe: { testo: string; href?: string; icona?: React.ReactNode }[]
  }[] = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Sede di Viadana",
      righe: [
        { icona: <MapPin className="w-4 h-4" />, testo: "Via Puttina 11, 46019 Viadana (MN)", href: "https://maps.google.com/?q=Via+Puttina+11+46019+Viadana" },
        { icona: <Mail className="w-4 h-4" />, testo: "offstagecoop.nicole@gmail.com", href: "mailto:offstagecoop.nicole@gmail.com" },
        { icona: <MessageCircle className="w-4 h-4" />, testo: "WhatsApp +39 328 005 2104", href: "https://wa.me/393280052104" },
      ],
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Sede di Milano",
      // DA COMPLETARE: sostituire i segnaposto con i dati reali e aggiungere gli href ("mailto:..." e "tel:...")
      righe: [
        { icona: <Mail className="w-4 h-4" />, testo: "[mail Milano]" },
        { icona: <Phone className="w-4 h-4" />, testo: "[nr di telefono Milano]" },
      ],
    },
  ]

  const linkEsterno = (href?: string) =>
    href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen py-24 md:py-32 overflow-hidden bg-[#0A0A0A]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-400/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12">
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
              CONTATTACI
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-sans font-bold text-[#F2EDE4] leading-[1.05] tracking-tight mt-3"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Parliamo di{" "}
              <span className="font-serif italic" style={{ color: "#E0A96D" }}>
                musica e burocrazia.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-sans font-light text-[#F2EDE4]/60 text-base md:text-lg mt-4 max-w-[50ch] mx-auto leading-relaxed"
            >
              Un messaggio, una chiamata, un'email. Siamo qui per toglierti ogni pensiero amministrativo.
            </motion.p>
          </div>

          {/* GRIGLIA CONTATTI — SENZA SOTTOTITOLI */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full"
          >
            {contatti.map((contatto, index) => {
              const linkRiquadro = contatto.righe.length === 1 ? contatto.righe[0].href : undefined
              const classi = `relative p-6 md:p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-[#E0A96D]/30 transition-all duration-500 group ${
                contatti.length % 2 === 1 && index === contatti.length - 1 ? "md:col-span-2" : ""
              }`
              const contenuto = (
                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5">
                  <div className="p-3 rounded-xl bg-[#E0A96D]/10 border border-[#E0A96D]/20 text-[#E0A96D] shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {contatto.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-sans font-bold text-[#F2EDE4] text-lg">
                      {contatto.title}
                    </h3>
                    {contatto.righe.map((riga) => {
                      const interno = (
                        <>
                          {riga.icona && <span className="shrink-0 mt-0.5 md:mt-1 text-[#E0A96D]/70">{riga.icona}</span>}
                          <span className="min-w-0 [overflow-wrap:anywhere]">{riga.testo}</span>
                        </>
                      )
                      const classeRiga = "flex items-start gap-2 font-sans text-[#E0A96D] text-sm md:text-base font-medium mt-1.5"
                      return riga.href && !linkRiquadro ? (
                        <a key={riga.testo} href={riga.href} {...linkEsterno(riga.href)} className={`${classeRiga} hover:underline`}>
                          {interno}
                        </a>
                      ) : (
                        <p key={riga.testo} className={`${classeRiga} ${linkRiquadro ? "group-hover:underline" : ""}`}>
                          {interno}
                        </p>
                      )
                    })}
                  </div>
                </div>
              )
              return linkRiquadro ? (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={linkRiquadro}
                  {...linkEsterno(linkRiquadro)}
                  className={classi}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  {contenuto}
                </motion.a>
              ) : (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={classi}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  {contenuto}
                </motion.div>
              )
            })}
          </motion.div>

          {/* FORM */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-2xl mx-auto w-full mt-8"
          >
            <div className="absolute -inset-8 bg-[#E0A96D]/10 blur-3xl rounded-3xl opacity-40" />

            <div className="relative p-8 md:p-12 rounded-3xl border border-[#E0A96D]/25 bg-[#0A0A0A] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E0A96D]/40 to-transparent" />

              <div className="relative z-10">
                <h3 className="font-sans font-bold text-[#F2EDE4] text-2xl text-center">
                  Scrivici un messaggio
                </h3>
                <p className="font-sans font-light text-[#F2EDE4]/50 text-sm text-center mt-1">
                  Ti rispondiamo entro poche ore.
                </p>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 gap-3"
                  >
                    <CheckCircle className="w-16 h-16 text-[#E0A96D]" />
                    <p className="font-sans font-bold text-[#F2EDE4] text-xl">Messaggio inviato!</p>
                    <p className="font-sans font-light text-[#F2EDE4]/50 text-sm">Ti risponderemo al più presto.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="font-sans text-[#F2EDE4]/50 text-xs tracking-[0.1em] uppercase font-medium block mb-1.5">
                          Nome
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F2EDE4] placeholder:text-[#F2EDE4]/30 focus:outline-none focus:border-[#E0A96D]/40 transition-colors font-sans text-sm"
                          placeholder="Il tuo nome"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-[#F2EDE4]/50 text-xs tracking-[0.1em] uppercase font-medium block mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F2EDE4] placeholder:text-[#F2EDE4]/30 focus:outline-none focus:border-[#E0A96D]/40 transition-colors font-sans text-sm"
                          placeholder="tuo@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-sans text-[#F2EDE4]/50 text-xs tracking-[0.1em] uppercase font-medium block mb-1.5">
                        Oggetto
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F2EDE4] placeholder:text-[#F2EDE4]/30 focus:outline-none focus:border-[#E0A96D]/40 transition-colors font-sans text-sm"
                        placeholder="Di cosa vuoi parlare?"
                      />
                    </div>

                    <div>
                      <label className="font-sans text-[#F2EDE4]/50 text-xs tracking-[0.1em] uppercase font-medium block mb-1.5">
                        Messaggio
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F2EDE4] placeholder:text-[#F2EDE4]/30 focus:outline-none focus:border-[#E0A96D]/40 transition-colors font-sans text-sm resize-none"
                        placeholder="Scrivici tutto ciò che vuoi sapere..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#F2EDE4] text-black rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(224,169,109,0.3)] hover:scale-[1.01] font-sans font-medium text-sm tracking-[0.15em] uppercase"
                    >
                      <span>Invia messaggio</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* NOTA LEGALE RIMOSSA — non serve più */}
        </motion.div>
      </div>
    </section>
  )
}