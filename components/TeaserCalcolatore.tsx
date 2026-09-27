"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring, MotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// ============================================================================
// MOTORE DI CALCOLO — allineato a public/calcolatore/index.html
// ============================================================================
interface CalcoloResult {
  giornate: number;
  quotaCoop: number;
  contributi: number;
  bustaPaga: number;
  netto: number;
  fatturato: number;
}

const MIN_CONTRIB = 58.13;
const MAX_GIORNATE = 27;
const BUSTA_PAGA = 12.0;

const calcolaGiornate = (imponibile: number) => {
  const g = Math.floor(imponibile / 3 / MIN_CONTRIB);
  return Math.min(MAX_GIORNATE, Math.max(1, g));
};

const calcolaDiretto = (cachet: number, esente: boolean): CalcoloResult => {
  const giornate = calcolaGiornate(cachet);
  const contributi = giornate * (esente ? 6.6 : 29.35);
  const quotaCoop = cachet * 0.1;
  const netto = Math.max(0, cachet - quotaCoop - contributi - BUSTA_PAGA);
  return { giornate, quotaCoop, contributi, bustaPaga: BUSTA_PAGA, netto, fatturato: cachet };
};

const calcolaInverso = (nettoDesiderato: number, esente: boolean): CalcoloResult => {
  let stima = (nettoDesiderato + BUSTA_PAGA) / 0.9;
  let res = calcolaDiretto(stima, esente);
  for (let i = 0; i < 5; i++) {
    stima = (nettoDesiderato + res.contributi + BUSTA_PAGA) / 0.9;
    res = calcolaDiretto(stima, esente);
  }
  return { ...res, netto: nettoDesiderato, fatturato: Math.round(stima * 100) / 100 };
};

const fmt = (n: number) => n.toFixed(2).replace(".", ",");

// ============================================================================
// CONTAINER SCROLL — invariato
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
// TEASER
// ============================================================================
export function TeaserCalcolatore() {
  const [modalita, setModalita] = useState<"diretta" | "inversa">("diretta");
  const [esente, setEsente] = useState(false);
  const [valoreInput, setValoreInput] = useState(400);
  const [pop, setPop] = useState(false);
  const [dati, setDati] = useState<CalcoloResult>(calcolaDiretto(400, false));

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
      const t = scenari[index];
      setModalita(t.modalita);
      setEsente(t.esente);
      setValoreInput(t.valore);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDati(
      modalita === "diretta"
        ? calcolaDiretto(valoreInput, esente)
        : calcolaInverso(valoreInput, esente)
    );
    setPop(true);
    const t = setTimeout(() => setPop(false), 200);
    return () => clearTimeout(t);
  }, [modalita, esente, valoreInput]);

  const buttonRef = useRef<HTMLAnchorElement>(null);
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const buttonX = useSpring(0, springConfig);
  const buttonY = useSpring(0, springConfig);

  const handleMagneticMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    buttonX.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    buttonY.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const handleMagneticLeave = () => {
    buttonX.set(0);
    buttonY.set(0);
  };

  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  const cifra = modalita === "diretta" ? dati.netto : dati.fatturato;

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] text-[#F2EDE4] overflow-hidden flex items-center justify-center">
      {/* SFONDO */}
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
                <span className="font-sans text-[#E0A96D]/60 text-[11px] tracking-[0.3em] uppercase font-medium">IL CALCOLATORE</span>
              </div>
              <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] text-[#F2EDE4] leading-[1.08] tracking-tight">
                <span className="font-serif italic text-[#E0A96D]">Quanto ti resta</span>
                <span className="font-sans font-bold block mt-1 sm:inline sm:mt-0"> davvero di una serata?</span>
              </h2>
              <p className="font-sans font-light text-[#F2EDE4]/80 text-sm md:text-base mt-4 max-w-[50ch] mx-auto leading-relaxed">
                La risposta alla domanda che riceviamo più spesso. Inserisci il compenso e scopri il tuo netto in meno di 10 secondi.
              </p>
              <div className="flex justify-center mt-8">
                <div className="relative group">
                  <motion.a
                    ref={buttonRef}
                    href="/calcolatore"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    onClick={handleRipple}
                    style={{ x: buttonX, y: buttonY }}
                    className="relative flex items-center gap-4 px-8 py-4 bg-[#F2EDE4] rounded-full overflow-hidden glow-pulse transition-all duration-300 hover:shadow-[0_0_40px_rgba(224,169,109,0.5)] hover:scale-[1.02] cursor-pointer select-none text-black"
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
                  </motion.a>
                </div>
              </div>
            </div>
          }
        >
          {/* ============================================================
              CALCOLATORE — design identico a public/calcolatore/index.html
              ============================================================ */}
          <Link
            href="/calcolatore"
            aria-label="Apri il calcolatore"
            className="flex w-full items-center justify-center bg-[#0A0A0A]/60 px-4 py-10 md:py-14"
          >
            <div
              className="relative w-full max-w-[550px] overflow-hidden rounded-[20px] md:rounded-[30px] border border-white/5 px-5 py-8 md:p-8 select-none font-sans shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.03)]"
              style={{ background: "linear-gradient(145deg,#121212,#0a0a0a)" }}
            >
              {/* alone */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-[200px] w-[200px] rounded-full bg-[#E0A96D] opacity-[0.03] blur-[40px]" />

              {/* LOGO */}
              <div className="mb-5 flex items-center justify-center">
                <img
                  src="/IMG_7418.PNG"
                  alt="Off Stage"
                  className="h-[90px] md:h-[140px] w-auto object-contain drop-shadow-[0_0_12px_rgba(224,169,109,0.3)]"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>

              {/* MODE TOGGLE */}
              <div className="mb-4 grid grid-cols-2 items-stretch gap-1.5 rounded-2xl border border-white/5 bg-white/[0.03] p-1.5">
                <div className={`flex items-center justify-center rounded-xl px-2.5 py-3 md:py-4 text-center text-[11px] md:text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 ${modalita === "diretta" ? "bg-[#F2EDE4] text-black shadow-[0_2px_8px_rgba(0,0,0,0.3)]" : "text-white/30"}`}>
                  So quanto fatturo
                </div>
                <div className={`flex items-center justify-center rounded-xl px-2.5 py-3 md:py-4 text-center text-[11px] md:text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 ${modalita === "inversa" ? "bg-[#F2EDE4] text-black shadow-[0_2px_8px_rgba(0,0,0,0.3)]" : "text-white/30"}`}>
                  So quanto voglio netto
                </div>
              </div>

              {/* ESENZIONE */}
              <div className="mb-4 flex items-center justify-between px-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm md:text-base font-semibold text-[#F2EDE4]/90">Esenzione contributiva</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-xs font-semibold text-white/50">i</span>
                </div>
                <div className={`flex h-[26px] md:h-[30px] w-[46px] md:w-[54px] items-center rounded-full border p-0.5 transition-colors duration-500 ${esente ? "border-[#E0A96D]/30 bg-[#E0A96D]/20" : "border-white/10 bg-white/5"}`}>
                  <span className={`h-[22px] w-[22px] md:h-[26px] md:w-[26px] rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.2)] transition-transform duration-500 ${esente ? "translate-x-5 md:translate-x-6 bg-[#E0A96D]" : "translate-x-0 bg-white"}`} />
                </div>
              </div>

              {/* INPUT */}
              <div className="mb-5">
                <span className="mb-2 block text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#F2EDE4]/30">
                  {modalita === "diretta" ? "Fatturato lordo" : "Netto desiderato"}
                </span>
                <div className="relative flex items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] py-4 md:py-5 pl-11 md:pl-14 pr-5 md:pr-6">
                  <span className="pointer-events-none absolute left-[18px] md:left-6 text-[1.3rem] md:text-2xl font-light text-[#F2EDE4]/40">€</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={valoreInput}
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[1.3rem] md:text-[1.6rem] font-light text-[#F2EDE4]"
                    >
                      {valoreInput}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* RESULT BOX */}
              <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div className="pointer-events-none absolute -top-10 -right-10 h-[140px] w-[140px] rounded-full bg-[#E0A96D] opacity-[0.05] blur-[30px]" />

                <div className="relative z-10 mb-5 flex items-center justify-between gap-3">
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#F2EDE4]/30">
                    {modalita === "diretta" ? "Netto finale in tasca" : "Fattura da emettere"}
                  </span>
                </div>

                <div className={`relative z-10 text-[2.5rem] md:text-[4rem] font-semibold leading-none tracking-[-0.02em] text-[#F2EDE4] transition-transform duration-200 ${pop ? "scale-[1.06]" : "scale-100"}`}>
                  <span className="mr-1.5 text-[1.4rem] md:text-[1.8rem] font-light text-[#F2EDE4]/40">≈</span>
                  {fmt(cifra)}
                </div>
              </div>

              <p className="mt-6 text-center text-xs md:text-[15px] leading-relaxed text-[#F2EDE4]/70">
                Stima indicativa (IRPEF esclusa).
              </p>
            </div>
          </Link>
        </ContainerScroll>
      </div>
    </section>
  );
}