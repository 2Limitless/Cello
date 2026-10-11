"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Award, CheckCircle2 } from "lucide-react";

export interface Testimonial {
  quote: string;
  author: string;
  signature?: string;
  role: string;
  credential: string;
  tag: string;
  year?: string;
}

interface VirtuosoFolioProps {
  testimonials: Testimonial[];
  reviewIndex: number;
  setReviewIndex: (index: number | ((prev: number) => number)) => void;
  handleTouchStart?: (e: React.TouchEvent) => void;
  handleTouchEnd?: (e: React.TouchEvent) => void;
}

export function VirtuosoFolio({
  testimonials,
  reviewIndex,
  setReviewIndex,
  handleTouchStart,
  handleTouchEnd,
}: VirtuosoFolioProps) {
  const current = testimonials[reviewIndex];

  return (
    <div
      className="w-full h-[400px] md:h-[524px] lg:sticky lg:top-24 select-text"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Outer Letterpress Folio Frame */}
      <div className="w-full h-full p-[3px] rounded-[26px] md:rounded-[32px] bg-gradient-to-br from-[#E6D9C8] via-[#CFBC9F] to-[#B3997A] shadow-[0_16px_40px_rgba(155,126,88,0.14),0_2px_8px_rgba(26,26,23,0.05)]">
        
        {/* Inner Parchment Certificate Canvas */}
        <div className="relative w-full h-full rounded-[23px] md:rounded-[29px] bg-[#FAF7F0] border border-[#9B7E58]/30 overflow-hidden flex flex-col justify-between p-5 md:p-7 lg:p-8">
          
          {/* Subtle Vintage Sheet Music Texture Watermark */}
          <Image
            src="/sheet_music.jpg"
            alt="Atelier Watermark"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover opacity-[0.05] mix-blend-multiply pointer-events-none select-none"
          />

          {/* Decorative Inner Certificate Hairline */}
          <div className="absolute inset-2.5 md:inset-3 rounded-[19px] md:rounded-[23px] border border-[#9B7E58]/20 pointer-events-none" />

          {/* Faint corner decorative flourishes */}
          <div className="absolute top-4 left-4 text-[#9B7E58]/35 font-serif text-[11px] pointer-events-none select-none">❧</div>
          <div className="absolute top-4 right-4 text-[#9B7E58]/35 font-serif text-[11px] pointer-events-none select-none">☙</div>

          {/* Top Section: Provenance Header & Embossed Wax Seal */}
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#9B7E58]/25">
              
              {/* Provenance Label */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9B7E58]" />
                  <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#8C6D3B] font-bold">
                    Patron Endorsements
                  </span>
                </div>
                <span className="font-serif text-xs md:text-[13px] text-[#1A1A17]/70 italic mt-0.5">
                  Archives of the St. Matthews Atelier
                </span>
              </div>

              {/* Embossed Brass / Wax Seal Medallion */}
              <div 
                className="relative shrink-0 flex items-center gap-2 group cursor-default"
                title="Verified Lane & Edwards Atelier Provenance"
              >
                <div className="hidden sm:flex flex-col text-right">
                  <span className="font-mono text-[9px] tracking-wider uppercase text-[#1A1A17]/45 font-medium">Registry</span>
                  <span className="font-serif text-[11px] text-[#8C6D3B] font-semibold">Verified</span>
                </div>

                <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#E4CB83] via-[#C59F4B] to-[#7D5C22] p-[1.5px] shadow-[0_2px_8px_rgba(155,126,88,0.35)] flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F5E29E] via-[#BA9340] to-[#73511B] flex flex-col items-center justify-center text-[#2A1E08] border border-white/30">
                    <span className="font-serif font-black text-[9px] md:text-[10px] leading-none tracking-tight">L&E</span>
                    <span className="font-mono text-[7px] leading-none tracking-tighter opacity-80 mt-0.5">1976</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Sub-header: Connoisseur Rating & Role Pill */}
            <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
              <div className="flex items-center gap-2 bg-[#9B7E58]/10 px-2.5 py-1 rounded-full border border-[#9B7E58]/25">
                <div className="flex text-[#B8860B] text-[12px] leading-none tracking-tight">
                  ★★★★★
                </div>
                <span className="font-mono text-[10px] md:text-[11px] font-bold tracking-wider uppercase text-[#73542E]">
                  Acoustic Integrity 5.0
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#8C6D3B] bg-white/70 px-2.5 py-0.5 rounded-full border border-[#9B7E58]/20 shadow-2xs font-semibold">
                  {current.tag}
                </span>
                {current.year && (
                  <span className="hidden md:inline font-mono text-[10px] text-[#1A1A17]/40 tracking-tight">
                    {current.year}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center Section: Letterpress Quote */}
          <div className="relative z-10 my-auto py-2 flex flex-col justify-center">
            <span className="font-serif text-4xl md:text-5xl text-[#9B7E58]/30 select-none leading-none -mb-3 pointer-events-none" aria-hidden="true">
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-center"
              >
                <p className="font-serif text-base md:text-[19px] lg:text-[20px] text-[#24211D] font-normal italic leading-relaxed md:leading-[1.45] tracking-tight mb-3 md:mb-4">
                  &quot;{current.quote}&quot;
                </p>

                {/* Author Signature & Accreditation Block */}
                <div className="border-t border-[#9B7E58]/25 pt-2.5 flex items-end justify-between gap-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <p className="font-sans font-bold text-sm md:text-base text-[#1A1A17] tracking-wide">
                        {current.author}
                      </p>
                      <CheckCircle2 size={13} className="text-[#9B7E58] shrink-0" />
                    </div>
                    <p className="font-sans text-[11px] md:text-xs tracking-wider uppercase text-[#8C6D3B] font-semibold mt-0.5">
                      {current.role}
                    </p>
                    <p className="font-mono text-[10px] md:text-[11px] text-[#1A1A17]/55 tracking-tight mt-0.5">
                      {current.credential}
                    </p>
                  </div>

                  {/* Handwritten Script Signature */}
                  <div className="flex flex-col items-end select-none shrink-0 pr-1">
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#9B7E58]/70">
                      Signature
                    </span>
                    <p 
                      className="font-script text-2xl md:text-3xl text-[#7A5B28] -rotate-3 origin-bottom-right leading-none pb-1"
                      style={{ mixBlendMode: 'multiply' }}
                    >
                      {current.signature || current.author}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Section: Folio Ledger Navigation */}
          <div className="relative z-10 pt-3 border-t border-[#9B7E58]/25 flex items-center justify-between gap-3 mt-auto">
            
            {/* Folio Counter & Progress hairline */}
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1 font-mono text-xs">
                <span className="font-bold text-[#8C6D3B]">Folio 0{reviewIndex + 1}</span>
                <span className="text-[#9B7E58]/40">/</span>
                <span className="text-[#1A1A17]/45 text-[11px]">0{testimonials.length}</span>
              </div>

              {/* Micro Progress Track */}
              <div className="w-12 md:w-16 h-[2px] bg-[#9B7E58]/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#8C6D3B]"
                  initial={false}
                  animate={{ width: `${((reviewIndex + 1) / testimonials.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Quick Patron Selector Chips */}
            <div className="hidden sm:flex items-center gap-1">
              {testimonials.map((t, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReviewIndex(idx);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                    idx === reviewIndex
                      ? 'bg-[#8C6D3B] text-white shadow-xs font-semibold scale-105'
                      : 'bg-[#9B7E58]/10 text-[#73542E] hover:bg-[#9B7E58]/20'
                  }`}
                  aria-label={`Switch to endorsement from ${t.author}`}
                >
                  {t.author.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Turned Brass Navigation Chevrons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                }}
                className="w-8 h-8 rounded-full border border-[#9B7E58]/35 bg-white/80 hover:bg-[#8C6D3B] text-[#73542E] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-2xs active:scale-95"
                title="Previous Folio"
                aria-label="Previous Review"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewIndex((prev) => (prev + 1) % testimonials.length);
                }}
                className="w-8 h-8 rounded-full border border-[#9B7E58]/35 bg-white/80 hover:bg-[#8C6D3B] text-[#73542E] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-2xs active:scale-95"
                title="Next Folio"
                aria-label="Next Review"
              >
                <ChevronRight size={14} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
