"use client"

import { motion } from "framer-motion"

export function Landing() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  }

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <motion.div
      className="min-h-screen bg-[#F2EDE4] py-24"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <div className="container mx-auto px-4 md:px-8">
        
        {/* HEADER */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="text-black/30 text-xs tracking-[0.4em] uppercase font-body">
            I nostri servizi
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-black mt-2">
            Tutto ciò di cui hai bisogno
          </h2>
          <p className="text-black/50 max-w-xl mx-auto mt-4 font-body">
            Gestiamo la burocrazia per te. Così puoi fare solo quello che sai fare meglio: suonare.
          </p>
        </motion.div>

        {/* GRIGLIA SERVIZI - esempio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            "Agibilità INPS",
            "Posizione INAIL",
            "Fatturazione elettronica",
            "Buste paga e CU",
            "Calcolo contributi",
            "Recupero IVA",
            "Assistenza controlli",
            "Recupero crediti",
          ].map((service, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-black/5 hover:border-amber-400/30 transition-all duration-500 hover:shadow-xl hover:shadow-amber-400/5 group"
            >
              <span className="text-amber-400 font-display text-2xl font-light">{(i + 1).toString().padStart(2, '0')}</span>
              <h3 className="font-display text-lg text-black mt-2">{service}</h3>
              <p className="text-black/40 text-sm mt-1 font-body">Gestito da noi</p>
            </motion.div>
          ))}
        </div>

        {/* CTA FINALE */}
        <motion.div variants={fadeInUp} className="text-center mt-16">
          <button className="px-12 py-5 bg-black text-[#F2EDE4] hover:bg-amber-400 hover:text-black transition-all duration-500 rounded-full text-sm tracking-[0.2em] uppercase font-body">
            Inizia ora
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}