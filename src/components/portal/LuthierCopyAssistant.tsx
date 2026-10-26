"use client";

import React, { useState } from 'react';
import { Sparkles, Copy, Check, ChevronDown, Feather } from 'lucide-react';

interface LuthierCopyAssistantProps {
  onInsertText: (text: string) => void;
  category?: string;
}

const COPY_TEMPLATES = [
  {
    title: "Soloist Masterwork (Violin/Cello)",
    text: "Acoustically thicknessed by hand in our Louisville workshop, this instrument pairs a thunderous, resonant lower register with a luminous, singing upper voice. Designed for demanding soloists who require immediate dynamic flexibility and effortless hall-filling projection.",
  },
  {
    title: "Tonewood & Arching Details",
    text: "Carved from select 15-year seasoned Bosnian flamed maple and fine-grained Val di Fiemme spruce. Every arching curve has been calibrated to 0.1mm acoustic tolerance with traditional micro finger planes to allow the plates to breathe with uninhibited resonance.",
  },
  {
    title: "100% Equity & Independent Promise",
    text: "Artisan-calibrated for expressive nuance. Personally set up, acoustic-tested, and tonally optimized by master luthier Matthew Lane. Every dollar invested follows you forward with 100% lifetime trade-in equity toward your next master acquisition.",
  },
  {
    title: "Bespoke French & Belgian Setup",
    text: "Fitted with a hand-carved Despiau Superieur maple bridge, custom soundpost tuned for harmonic nodal balance, and select Pirastro strings. Effortless left-hand tactile response across all four registers.",
  },
  {
    title: "Fine Bow Rehair & Pernambuco",
    text: "Handcrafted from seasoned pernambuco with silver-mounted ebony frog and unbleached Mongolian stallion hair. Impeccably balanced camber delivers crisp spiccato articulation and a warm, velvety legato string connection.",
  },
];

export function LuthierCopyAssistant({ onInsertText }: LuthierCopyAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    onInsertText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="border border-[#9B7E58]/30 rounded-xl bg-[#FAF8F2] overflow-hidden my-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold text-[#7A5B32] hover:bg-[#9B7E58]/10 transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Feather size={14} className="text-[#9B7E58]" />
          <span>Atelier Copy Assistant · Master Luthier Phrasing</span>
        </span>
        <ChevronDown size={14} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="p-4 pt-2 border-t border-[#9B7E58]/20 space-y-3 bg-white">
          <p className="text-[11px] text-[#1A1A17]/70">
            Click any artisanal paragraph below to automatically insert authentic workshop wording into your description:
          </p>
          <div className="space-y-2">
            {COPY_TEMPLATES.map((tmpl, idx) => (
              <div
                key={tmpl.title}
                className="p-3 rounded-lg border border-[#1A1A17]/10 hover:border-[#9B7E58] bg-[#FAF9F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-[#1A1A17] block mb-0.5">{tmpl.title}</span>
                  <p className="text-[11px] text-[#1A1A17]/70 italic line-clamp-2">{tmpl.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(tmpl.text, idx)}
                  className="shrink-0 px-3 py-1.5 bg-[#1A1A17] hover:bg-[#9B7E58] text-white rounded text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check size={12} />
                      <span>Inserted!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={12} className="text-[#D4AF37]" />
                      <span>Use Text</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
