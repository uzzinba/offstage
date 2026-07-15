"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring, MotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";

// ============================================================================
// MOTORE DI CALCOLO REALE
// ============================================================================
interface CalcoloResult {
  giornate: number;
  quotaCoop: number;
  contributi: number;
  bustaPaga: number;
  netto: number;
  fatturato: number;
}

const calcolaDiretto = (cachet: number, esente: boolean): CalcoloResult => {
  const quotaCoop = cachet * 0.10;
  const bustaPaga = 12.0;
  const giornateRaw = (cachet / 3) / 58.13;
  const giornate = Math.max(1, Math.round(giornateRaw));
  const tariffa = esente ? 6.60 : 29.35;
  const contributi = giornate * tariffa;
  const netto = Math.max(0, cachet - quotaCoop - contributi - bustaPaga);
  return { giornate, quotaCoop, contributi, bustaPaga, netto, fatturato: cachet };
};

const calcolaInverso = (nettoDesiderato: number, esente: boolean): CalcoloResult => {
  const tariffa = esente ? 6.60 : 29.35;
  const bustaPaga = 12.0;
  let stimatoFatturato = (nettoDesiderato + bustaPaga) / 0.90;
  let risultato = calcolaDiretto(stimatoFatturato, esente);
  for (let i = 0; i < 5; i++) {
    stimatoFatturato = (nettoDesiderato + risultato.contributi + bustaPaga) / 0.90;
    risultato = calcolaDiretto(stimatoFatturato, esente);
  }
  return { ...risultato, netto: nettoDesiderato, fatturato: stimatoFatturato };
};

// ============================================================================
// CONTAINER SCROLL — DEFINITO INTERNAMENTE
// ============================================================================
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20 bg-transparent"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => (
  <motion.div style={{ translateY: translate }} className="max-w-5xl mx-auto text-center z-10 relative">
    {titleComponent}
  </motion.div>
);

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow: "0 0 #0000004d, 0 20px 40px #0000006a, 0 50px 50px #00000042",
    }}
    className="max-w-4xl -mt-12 mx-auto w-full p-0 bg-transparent rounded-[30px]"
  >
    <div className="h-full w-full overflow-hidden rounded-[30px]">{children}</div>
  </motion.div>
);

// ============================================================================
// TEASER CALCOLATORE — COMPONENTE PRINCIPALE
// ============================================================================
export function TeaserCalcolatore() {
  const [modalita, setModalita] = useState<"diretta" | "inversa">("diretta");
  const [esente, setEsente] = useState<boolean>(false);
  const [valoreInput, setValoreInput] = useState<number>(400);
  const [datiCalcolati, setDatiCalcolati] = useState<CalcoloResult>({
    giornate: 2,
    quotaCoop: 40,
    contributi: 58.7,
    bustaPaga: 12,
    netto: 289.3,
    fatturato: 400,
  });

  useEffect(() => {
    const scenari = [
      { modalita: "diretta" as const, esente: false, valore: 400 },
      { modalita: "diretta" as const, esente: true, valore: 600 },
      { modalita: "inversa" as const, esente: false, valore: 300 },
      { modalita: "inversa" as const, esente: true, valore: 500 },
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % scenari.length;
      const target = scenari[index];
      setModalita(target.modalita);
      setEsente(target.esente);
      setValoreInput(target.valore);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (modalita === "diretta") {
      setDatiCalcolati(calcolaDiretto(valoreInput, esente));
    } else {
      setDatiCalcolati(calcolaInverso(valoreInput, esente));
    }
  }, [modalita, esente, valoreInput]);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const buttonX = useSpring(0, springConfig);
  const buttonY = useSpring(0, springConfig);

  const handleMagneticMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    buttonX.set(x);
    buttonY.set(y);
  };
  const handleMagneticLeave = () => {
    buttonX.set(0);
    buttonY.set(0);
  };

  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  const [isBouncing, setIsBouncing] = useState(false);
  const handleBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] text-[#F2EDE4] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/DJ_playing_music_in_club_202607131913.jpeg"
          alt="DJ Club Background"
          className="w-full h-full object-cover opacity-25"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.endsWith(".jpeg")) target.src = "/DJ_playing_music_in_club_202607131913.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1.5px]" />
      </div>

      <div className="relative z-10 w-full">
        <ContainerScroll
          titleComponent={
            <div className="max-w-3xl mx-auto mb-4 text-center px-4">
              <div className="flex items-center justify-center mb-4">
                <span className="font-sans text-[#E0A96D]/60 text-xs tracking-[0.3em] uppercase font-medium">IL CALCOLATORE</span>
              </div>
              <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] text-[#F2EDE4] leading-[1.08] tracking-tight">
                <span className="font-serif italic text-[#E0A96D]">Quanto ti resta</span>
                <span className="font-sans font-bold block mt-1 sm:inline sm:mt-0"> davvero di una serata?</span>
              </h2>
              <p className="font-sans font-light text-[#F2EDE4]/60 text-sm md:text-base mt-4 max-w-[50ch] mx-auto leading-relaxed">
                La risposta alla domanda che riceviamo più spesso. Inserisci il compenso e scopri il tuo netto in meno di 10 secondi.
              </p>
              <div className="flex justify-center mt-8">
                <div className="relative group">
                  <motion.button
                    ref={buttonRef}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    onClick={(e) => { handleRipple(e); handleBounce(); }}
                    animate={isBouncing ? { scale: [1, 0.95, 1.05, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative flex items-center gap-4 px-8 py-4 bg-[#F2EDE4] rounded-full overflow-hidden glow-pulse transition-all duration-300 hover:shadow-[0_0_40px_rgba(224,169,109,0.5)] hover:scale-[1.02] cursor-pointer select-none text-black"
                    style={{ transform: `translate(${buttonX.get()}px, ${buttonY.get()}px)` }}
                  >
                    <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)", border: "1px solid rgba(255,255,255,0.2)" }} />
                    <div className="absolute top-0 left-[10%] right-[10%] h-[45%] rounded-t-full pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)" }} />
                    <span className="relative z-10 text-[11px] tracking-[0.2em] uppercase font-sans font-medium">Calcola il tuo netto</span>
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/10">
                      <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                    <AnimatePresence>
                      {ripples.map((ripple) => (
                        <motion.span key={ripple.id} className="absolute rounded-full bg-amber-400/30 pointer-events-none" style={{ left: ripple.x - 50, top: ripple.y - 50, width: 100, height: 100 }} initial={{ scale: 0, opacity: 1 }} animate={{ scale: 3, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} />
                      ))}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          }
        >
          <div className="w-full h-full bg-gradient-to-br from-[#121212] to-[#0a0a0a] backdrop-blur-2xl p-6 md:p-8 flex flex-col justify-between text-white font-sans relative border border-white/5 select-none pointer-events-none overflow-hidden rounded-3xl">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#E0A96D]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#E0A96D]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <img src="/IMG_7418.PNG" alt="Off Stage Logo" className="h-11 w-auto object-contain brightness-100 drop-shadow-[0_0_12px_rgba(224,169,109,0.15)]" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E0A96D] animate-pulse" />
                <span className="text-[9px] text-[#F2EDE4]/40 font-mono tracking-wider uppercase">Demo Live</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-5 relative z-10 py-6">
              <div className="w-full max-w-xs mx-auto p-1 bg-white/5 rounded-xl border border-white/5">
                <div className="grid grid-cols-2 gap-0.5 relative">
                  <div className={`py-2 text-center text-[10px] uppercase tracking-wider font-semibold rounded-lg transition-all duration-500 ${modalita === "diretta" ? "bg-[#F2EDE4] text-black shadow-sm" : "text-white/30"}`}>So quanto fatturo</div>
                  <div className={`py-2 text-center text-[10px] uppercase tracking-wider font-semibold rounded-lg transition-all duration-500 ${modalita === "inversa" ? "bg-[#F2EDE4] text-black shadow-sm" : "text-white/30"}`}>So quanto voglio netto</div>
                </div>
              </div>

              <div className="flex items-center justify-between max-w-xs mx-auto w-full px-2">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white/90">Esenzione Contributiva</span>
                  <span className="text-[10px] text-white/40">{esente ? "Dipendente (6,60€/g)" : "Autonomo (29,35€/g)"}</span>
                </div>
                <div className="w-10 h-6 bg-white/5 rounded-full p-0.5 flex items-center transition-all duration-500 border border-white/10" style={{ justifyContent: esente ? "flex-start" : "flex-end" }}>
                  <motion.div layout className={`w-5 h-5 rounded-full shadow-md ${esente ? "bg-white/40" : "bg-[#E0A96D]"}`} />
                </div>
              </div>

              <div className="max-w-xs mx-auto w-full">
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl border border-white/5 transition-all duration-300">
                  <span className="text-[9px] text-[#F2EDE4]/30 font-mono tracking-widest uppercase">{modalita === "diretta" ? "FATTURATO LORDO" : "NETTO DESIDERATO"}</span>
                  <AnimatePresence mode="wait">
                    <motion.span key={valoreInput} initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ duration: 0.2 }} className="text-lg font-light text-[#F2EDE4] font-mono">€ {valoreInput.toFixed(2)}</motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <div className="max-w-sm mx-auto w-full bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)] relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#E0A96D]/5 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10 text-left">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] text-[#F2EDE4]/30 tracking-[0.15em] uppercase font-semibold">{modalita === "diretta" ? "Netto finale in tasca" : "Fattura da emettere"}</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#E0A96D]/10 border border-[#E0A96D]/20">
                      <Layers className="w-2.5 h-2.5 text-[#E0A96D]" />
                      <span className="text-[8px] text-[#E0A96D] font-mono font-medium uppercase tracking-wider">{datiCalcolati.giornate} {datiCalcolati.giornate === 1 ? "giornata" : "giornate"}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-sm text-[#F2EDE4]/40 font-light mr-1">≈</span>
                    <AnimatePresence mode="wait">
                      <motion.span key={modalita === "diretta" ? datiCalcolati.netto : datiCalcolati.fatturato} initial={{ opacity: 0, filter: "blur(2px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(2px)" }} transition={{ duration: 0.2 }} className="text-4xl md:text-5xl font-semibold text-[#F2EDE4] tracking-tight leading-none">€ {(modalita === "diretta" ? datiCalcolati.netto : datiCalcolati.fatturato).toFixed(2)}</motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 text-left">
                    <div><p className="text-[8px] text-[#F2EDE4]/30 uppercase tracking-wider font-semibold">Contributi</p><AnimatePresence mode="wait"><motion.p key={datiCalcolati.contributi} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[#F2EDE4]/80 text-xs font-mono mt-1">-€ {datiCalcolati.contributi.toFixed(2)}</motion.p></AnimatePresence></div>
                    <div><p className="text-[8px] text-[#F2EDE4]/30 uppercase tracking-wider font-semibold">Quota Coop</p><AnimatePresence mode="wait"><motion.p key={datiCalcolati.quotaCoop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[#F2EDE4]/80 text-xs font-mono mt-1">-€ {datiCalcolati.quotaCoop.toFixed(2)}</motion.p></AnimatePresence></div>
                    <div><p className="text-[8px] text-[#F2EDE4]/30 uppercase tracking-wider font-semibold">Busta Paga</p><p className="text-[#F2EDE4]/80 text-xs font-mono mt-1">-€ 12.00</p></div>
                  </div>
                </div>
              </div>
              <p className="text-center text-[9px] text-[#F2EDE4]/30 font-light tracking-wide max-w-sm mx-auto leading-relaxed">Stima indicativa (IRPEF esclusa). <span className="text-[#E0A96D] font-medium">Nota:</span> registrando le tue spese e fatture d'acquisto professionali, il tuo netto finale reale sarà ancora più alto.</p>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}