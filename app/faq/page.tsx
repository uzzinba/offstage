"use client"

import { useState, useRef } from "react"
import { motion, useInView, Variants, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

const faqData = [
  {
    id: "faq-1",
    question: "Cos'è OFF STAGE?",
    answer: "OFF STAGE è una cooperativa che gestisce la burocrazia per musicisti e insegnanti di musica. Ci occupiamo di agibilità INPS, fatture, buste paga, contributi e tutto ciò che serve per essere in regola. Tu suoni, al resto pensiamo noi.",
  },
  {
    id: "faq-2",
    question: "Come funziona l'iscrizione?",
    answer: "Ti iscrivi in pochi minuti: compili il modulo online, scegli il piano e sei operativo dal giorno dopo. Nessuna burocrazia iniziale, nessun costo nascosto. Noi ci occupiamo di tutto.",
  },
  {
    id: "faq-3",
    question: "Cosa significa esenzione contributiva?",
    answer: "L'esenzione contributiva è una riduzione della quota INPS per i lavoratori dello spettacolo che hanno determinate caratteristiche. Con la gestione OFF STAGE, se sei esente paghi contributi ridotti (6,60€/giornata invece di 29,35€).",
  },
  {
    id: "faq-4",
    question: "Quali sono i costi esatti di OFF STAGE?",
    answer: "La quota annuale parte da 75 € all'anno, che ti dà accesso a un ufficio amministrativo dedicato. Possono applicarsi costi aggiuntivi in base alle tue esigenze specifiche (es. numero di pratiche, collaboratori, ecc.). Ti faremo sempre un preventivo chiaro prima di iniziare.",
  },
  {
    id: "faq-5",
    question: "Come funziona il calcolatore del netto?",
    answer: "Il calcolatore ti permette di stimare quanto ti resta di una serata. Inserisci il cachet, scegli se sei esente o meno, e vedi in tempo reale il netto stimato (contributi, quota coop, busta paga). È uno strumento indicativo — il netto reale può essere più alto grazie al recupero IVA e alle spese deducibili.",
  },
  {
    id: "faq-6",
    question: "Chi c'è dietro OFF STAGE?",
    answer: "Dietro OFF STAGE ci sono persone vere che lavorano nel mondo della musica. Conosciamo le esigenze di chi suona e lavora nello spettacolo. Quando ci scrivi, ti risponde qualcuno che c'è davvero — da oltre trent'anni.",
  },
  {
    id: "faq-7",
    question: "Come faccio a contattarvi?",
    answer: "Puoi scriverci su WhatsApp, inviarci un'email o compilare il modulo nella pagina contatti. Siamo sempre raggiungibili e ti rispondiamo entro poche ore.",
  },
  {
    id: "faq-8",
    question: "Cosa succede dopo che mi iscrivo?",
    answer: "Dopo l'iscrizione, sei operativo dal giorno dopo. Ogni volta che hai un concerto o un ingaggio, ci scrivi su WhatsApp, noi apriamo agibilità e pratichiamo il resto. Fatture, contributi e buste paga li gestiamo noi. Tu suoni e basta.",
  },
]

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen py-24 md:py-32 overflow-hidden bg-[#0A0A0A]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-400/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-12"
        >
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              variants={itemVariants}
              className="font-sans text-[#E0A96D]/60 text-[11px] tracking-[0.3em] uppercase font-medium"
            >
              FAQ
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-sans font-bold text-[#F2EDE4] leading-[1.05] tracking-tight mt-3"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Domande{" "}
              <span className="font-serif italic" style={{ color: "#E0A96D" }}>
                frequenti.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-sans font-light text-[#F2EDE4]/60 text-base md:text-lg mt-4 max-w-[50ch] mx-auto leading-relaxed"
            >
              Tutto quello che vuoi sapere su OFF STAGE, in un unico posto.
            </motion.p>
          </div>

          {/* FAQ ACCORDION */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-3"
          >
            {faqData.map((faq) => {
              const isOpen = openId === faq.id
              return (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                  className="rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left cursor-pointer select-none hover:bg-white/5 transition-colors duration-300"
                  >
                    <span className="font-sans font-medium text-[#F2EDE4] text-base md:text-lg">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="shrink-0 text-[#E0A96D]"
                    >
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-white/5">
                          <p className="font-sans font-light text-[#F2EDE4]/70 text-sm md:text-base leading-relaxed">
                            {faq.answer}
                          </p>
                          {/* LINK RIMOSSI */}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA FINALE */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-8"
          >
            <p className="font-sans font-light text-[#F2EDE4]/40 text-sm mb-4">
              Non hai trovato quello che cercavi?
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#F2EDE4] text-black rounded-full hover:bg-[#E0A96D] hover:text-black transition-all duration-500 font-sans font-medium text-sm tracking-[0.15em] uppercase"
            >
              Contattaci
              <span className="text-xs">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}