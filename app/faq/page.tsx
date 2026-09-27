"use client"

import { useState, useRef } from "react"
import { motion, useInView, Variants, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

type FaqItem = {
  id: string
  question: string
  answer: React.ReactNode
}

// Aliquote IVA per tipo di esibizione — dal documento "Aliquote IVA spettacoli" della cooperativa
// (Agenzia delle Entrate, risoluzione n. 257/E del 20/06/2008)
const aliquoteIva = [
  { tipo: "Teatro", nota: "Qualsiasi spettacolo: concerti, danza, commedie, cabaret, magia…", iva: "10%" },
  { tipo: "Concerto in piazza", nota: "Di solito organizzato da Comune o Pro Loco; eventuali chioschi sono solo di servizio", iva: "10%" },
  { tipo: "Concerto in rock club o sala concerti", nota: "Il locale è strutturato per i concerti, il bar è solo di servizio al pubblico", iva: "10%" },
  { tipo: "Concerto in pub, bar, ristorante o hotel", nota: "L'esibizione serve a intrattenere i clienti del locale", iva: "22%" },
  { tipo: "DJ set", nota: "Sempre, in qualsiasi location", iva: "22%" },
  { tipo: "Karaoke", nota: "Sempre, in qualsiasi location", iva: "22%" },
  { tipo: "Orchestra di liscio", nota: "È considerata intrattenimento danzante", iva: "22%" },
  { tipo: "Pianobar", nota: "Anche a matrimoni e feste private", iva: "22%" },
  { tipo: "Prestigiatore o cabaret in pub, bar, ristorante o hotel", nota: null, iva: "22%" },
  { tipo: "Presentatore", nota: null, iva: "22%" },
]

function RispostaIVA() {
  return (
    <>
      <p>
        Dipende dal ruolo che l&apos;esibizione ha per il pubblico. L&apos;Agenzia delle Entrate
        (risoluzione n. 257/E del 20 giugno 2008) distingue tra{" "}
        <strong className="font-medium text-[#F2EDE4]">spettacolo</strong>, quando l&apos;esibizione è
        l&apos;attrazione principale, e <strong className="font-medium text-[#F2EDE4]">intrattenimento</strong>,
        quando fa da contorno, accompagnamento o sottofondo a un&apos;altra attività.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#E0A96D]/25 bg-[#E0A96D]/[0.06] p-4">
          <p className="font-medium text-[#E0A96D]">IVA al 10% · Spettacolo</p>
          <p className="mt-1 text-sm">
            Concerti e altre esibizioni artistiche in spazi dedicati a concerti e spettacoli: teatri,
            sale concerto, auditorium, ma anche piazze, stadi e aree allestite per l&apos;occasione.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-medium text-[#F2EDE4]">IVA al 22% · Intrattenimento</p>
          <p className="mt-1 text-sm">
            Esibizioni legate alla ristorazione o all&apos;intrattenimento dei clienti. Si applica
            sempre in bar, pub, ristoranti e hotel.
          </p>
        </div>
      </div>

      <div>
        <p className="font-medium text-[#F2EDE4]">Aliquota per tipo di esibizione</p>
        <ul className="mt-2 divide-y divide-white/5">
          {aliquoteIva.map(({ tipo, nota, iva }) => (
            <li key={tipo} className="flex items-start justify-between gap-4 py-2.5">
              <span>
                <span className="text-[#F2EDE4]/85">{tipo}</span>
                {nota && <span className="block text-xs md:text-sm text-[#F2EDE4]/45">{nota}</span>}
              </span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums ${
                  iva === "10%" ? "bg-[#E0A96D]/15 text-[#E0A96D]" : "bg-white/10 text-[#F2EDE4]/80"
                }`}
              >
                IVA {iva}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-medium text-[#F2EDE4]">Sagre e feste di paese</p>
        <p className="mt-1">
          DJ set, karaoke, orchestre di liscio e pianobar restano sempre al 22%. Concerti (rock, pop,
          musica leggera), cabaret, magia e arte varia dipendono invece da come l&apos;esibizione si
          inserisce nella festa:
        </p>
        <ul className="mt-2 space-y-1.5 list-disc pl-5 marker:text-[#E0A96D]">
          <li>
            <strong className="font-medium text-[#F2EDE4]">10%</strong> se si svolge su un palco con uno
            spazio davanti riservato al pubblico, seduto o in piedi, e non è legata alla zona dove si mangia;
          </li>
          <li>
            <strong className="font-medium text-[#F2EDE4]">22%</strong> se è legata alla zona ristorazione
            e diventa intrattenimento per chi mangia e beve.
          </li>
        </ul>
      </div>
    </>
  )
}

const faqData: FaqItem[] = [
  {
    id: "faq-1",
    question: "Cos'è OFF STAGE?",
    answer: "OFF STAGE è una cooperativa che gestisce la burocrazia per i lavoratori dello spettacolo e gli insegnanti di musica. Ci occupiamo di agibilità, fatture, buste paga, contributi e tutto ciò che serve per essere in regola. Tu suoni, al resto pensiamo noi.",
  },
  {
    id: "faq-2",
    question: "Come funziona l'iscrizione?",
    answer: "Ti iscrivi in pochi minuti: compili il modulo online, scegli il piano e sei operativo dal giorno dopo. Nessuna burocrazia iniziale, nessun costo nascosto. Noi ci occupiamo di tutto.",
  },
  {
    id: "faq-3",
    question: "Cosa significa esenzione contributiva?",
    answer: "L'esenzione consiste in una riduzione della quota contributiva, riservata ai lavoratori dello spettacolo che hanno determinati requisiti.",
  },
  {
    id: "faq-iva",
    question: "Quale IVA si applica alle esibizioni: 10% o 22%?",
    answer: <RispostaIVA />,
  },
  {
    id: "faq-5",
    question: "Come funziona il calcolatore del netto?",
    answer: "Il calcolatore ti permette di stimare quanto ti resta di una serata. Inserisci il cachet, scegli se sei esente o meno, e vedi in tempo reale il netto stimato (contributi, quota coop, busta paga). È uno strumento indicativo — il netto reale può essere più alto grazie alle spese deducibili.",
  },
  {
    id: "faq-6",
    question: "Chi siamo?",
    answer: (
      <>
        <p>
          OFF STAGE è una cooperativa musicale attiva dal 1991. Da oltre trent&apos;anni affianchiamo i
          lavoratori dello spettacolo in agibilità, fatture, buste paga e contributi: un&apos;esperienza
          maturata sul campo, serata dopo serata.
        </p>
        <p>
          Dietro OFF STAGE ci sono persone vere che lavorano nel mondo della musica. Conosciamo le esigenze
          di chi suona e lavora nello spettacolo. Quando ci scrivi, ti risponde qualcuno che c&apos;è davvero.
        </p>
      </>
    ),
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
                        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-white/5 space-y-4 font-sans font-light text-[#F2EDE4]/70 text-sm md:text-base leading-relaxed">
                          {typeof faq.answer === "string" ? <p>{faq.answer}</p> : faq.answer}
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