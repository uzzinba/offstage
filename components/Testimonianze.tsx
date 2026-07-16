"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, Variants } from "framer-motion"

const testimonianze = [
  {
    id: 1,
    citazione: "Prima passavo ore a compilare moduli e ricordare scadenze. Ora mando un messaggio e suono. Fine.",
    nome: "Marco",
  },
  {
    id: 2,
    citazione: "L'agibilità era un incubo. Ogni data era ansia. Da quando ci pensano loro, ho smesso di preoccuparmi.",
    nome: "Sara",
  },
  {
    id: 3,
    citazione: "Non sapevo cosa fosse la Certificazione Unica. Ora la ricevo puntuale e non devo pensarci io.",
    nome: "Luca",
  },
  {
    id: 4,
    citazione: "L'IVA era un rebus. Ora la recuperano loro. Io faccio solo musica, e funziona.",
    nome: "Elena",
  },
  {
    id: 5,
    citazione: "Aprire una pratica INPS mi faceva venire l'ansia. Ora la apro in due minuti e nessuno mi rompe.",
    nome: "Paolo",
  },
  {
    id: 6,
    citazione: "Le scadenze mi mangiavano la testa. Ora non so nemmeno quando cadono — e va benissimo così.",
    nome: "Giulia",
  },
  {
    id: 7,
    citazione: "Ero terrorizzata dai controlli. Ora so che se arriva qualcosa, ci sono loro al mio fianco.",
    nome: "Anna",
  },
  {
    id: 8,
    citazione: "Fatturare era una tortura. Ora lo fanno loro in 5 minuti. Io penso solo agli accordi.",
    nome: "Davide",
  },
]

export function Testimonianze() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const duplicated = [...testimonianze, ...testimonianze, ...testimonianze]

  const colonne = [
    duplicated.filter((_, i) => i % 3 === 0),
    duplicated.filter((_, i) => i % 3 === 1),
    duplicated.filter((_, i) => i % 3 === 2),
  ]

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-24 md:py-32 overflow-hidden bg-[#0A0A0A]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-12"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.span
              variants={itemVariants}
              className="font-sans text-[#E0A96D]/60 text-xs tracking-[0.3em] uppercase font-medium"
            >
              TESTIMONIANZE
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-sans font-bold text-[#F2EDE4] leading-[1.05] tracking-tight mt-3"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Cosa dicono{" "}
              <span className="font-serif italic" style={{ color: "#E0A96D" }}>
                i nostri artisti.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="font-sans font-light text-[#F2EDE4]/50 text-base md:text-lg mt-4 max-w-[50ch] mx-auto"
            >
              Storie vere di chi ha scelto di suonare senza pensieri.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative h-[500px] md:h-[600px] overflow-hidden">
            {colonne.map((colonna, colIndex) => (
              <ScrollableColumn
                key={colIndex}
                items={colonna}
                direction={colIndex % 2 === 0 ? 1 : -1}
                speed={colIndex % 2 === 0 ? 0.15 : 0.1} // ← PIÙ LENTE
              />
            ))}

            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#0A0A0A] to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ScrollableColumn({
  items,
  direction,
  speed,
}: {
  items: typeof testimonianze
  direction: 1 | -1
  speed: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return

    let animFrame: number
    let paused = false
    let scrollPos = 0

    const totalHeight = content.scrollHeight

    const step = () => {
      if (!paused) {
        scrollPos += direction * speed
        if (scrollPos >= totalHeight / 2) {
          scrollPos = 0
        }
        if (scrollPos < 0) {
          scrollPos = totalHeight / 2
        }
        container.scrollTop = scrollPos
      }
      animFrame = requestAnimationFrame(step)
    }

    const onMouseEnter = () => { paused = true }
    const onMouseLeave = () => { paused = false }

    container.addEventListener("mouseenter", onMouseEnter)
    container.addEventListener("mouseleave", onMouseLeave)

    animFrame = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animFrame)
      container.removeEventListener("mouseenter", onMouseEnter)
      container.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [direction, speed])

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-hidden rounded-2xl"
    >
      <div ref={contentRef} className="flex flex-col gap-4 p-2">
        {items.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="p-5 md:p-6 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-[#E0A96D]/30 transition-all duration-300 group"
          >
            <p className="font-serif italic text-[#F2EDE4]/70 text-sm md:text-base leading-relaxed">
              "{item.citazione}"
            </p>
            <p className="font-sans text-[#F2EDE4]/30 text-xs tracking-[0.1em] uppercase mt-3">
              {item.nome}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}