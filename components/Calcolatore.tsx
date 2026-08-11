"use client";

import { useState, useEffect } from "react";

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

export function Calcolatore() {
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
    if (modalita === "diretta") {
      setDatiCalcolati(calcolaDiretto(valoreInput, esente));
    } else {
      setDatiCalcolati(calcolaInverso(valoreInput, esente));
    }
  }, [modalita, esente, valoreInput]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#0D0D0D] rounded-2xl border border-white/5">
      {/* Logo e titolo */}
      <div className="flex items-center gap-3 mb-6">
        <img src="/logo-chiaro.png" alt="Off Stage" className="h-8 w-auto" />
        <span className="text-[#F2EDE4] text-sm font-medium">Calcolatore</span>
      </div>

      {/* Segmented Control */}
      <div className="flex rounded-xl bg-white/5 p-1 mb-4">
        {["diretta", "inversa"].map((mod) => (
          <button
            key={mod}
            onClick={() => setModalita(mod as typeof modalita)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition ${
              modalita === mod ? "bg-[#F2EDE4] text-black" : "text-white/50 hover:text-white"
            }`}
          >
            {mod === "diretta" ? "So quanto fatturo" : "So quanto voglio netto"}
          </button>
        ))}
      </div>

      {/* Toggle Esenzione */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-white/70 text-sm">Esenzione Contributiva</span>
        <button
          onClick={() => setEsente(!esente)}
          className={`w-10 h-6 rounded-full transition ${
            esente ? "bg-[#E0A96D]" : "bg-white/20"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow transform transition ${
              esente ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="text-white/40 text-xs uppercase tracking-wider">
          {modalita === "diretta" ? "Fatturato Lordo (€)" : "Netto Desiderato (€)"}
        </label>
        <input
          type="number"
          value={valoreInput}
          onChange={(e) => setValoreInput(Number(e.target.value))}
          className="w-full mt-1 px-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white text-lg focus:outline-none focus:border-[#E0A96D]/40"
        />
      </div>

      {/* Risultato */}
      <div className="p-4 bg-white/5 rounded-xl border border-white/5">
        <div className="flex justify-between items-center">
          <span className="text-white/40 text-xs uppercase tracking-wider">
            Netto finale in tasca
          </span>
          <span className="text-[#E0A96D] text-2xl font-bold">
            € {datiCalcolati.netto.toFixed(2)}
          </span>
        </div>
        <div className="mt-2 text-white/30 text-xs">
          {datiCalcolati.giornate} giornat{datiCalcolati.giornate > 1 ? "e" : "a"}
        </div>
      </div>

      {/* Dettaglio trattenute */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-white/40">
        <div>
          <span>Contributi</span>
          <span className="block text-white/60">-€ {datiCalcolati.contributi.toFixed(2)}</span>
        </div>
        <div>
          <span>Quota Coop</span>
          <span className="block text-white/60">-€ {datiCalcolati.quotaCoop.toFixed(2)}</span>
        </div>
        <div>
          <span>Busta Paga</span>
          <span className="block text-white/60">-€ 12.00</span>
        </div>
      </div>
    </div>
  );
}