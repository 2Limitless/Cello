"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  credential: string;
  tag: string;
  year?: string;
  instrument?: string;
  timbre?: string[];
  venue?: string;
}

interface VirtuosoFolioProps {
  testimonials: Testimonial[];
  reviewIndex: number;
  setReviewIndex: (index: number | ((prev: number) => number)) => void;
  handleTouchStart?: (e: React.TouchEvent) => void;
  handleTouchEnd?: (e: React.TouchEvent) => void;
}

const defaultAcousticData: Record<string, { instrument: string; timbre: string[]; venue: string }> = {
  "Elena Rostova": {
    instrument: "1734 Guarneri del Gesù Cello",
    timbre: ["Deep Velvet Tone", "Concert Hall Projection", "French Bridge Cut"],
    venue: "Whitney Hall · Louisville Orchestra"
  },
  "Marcus Chen": {
    instrument: "1716 Master Cremonese Violin",
    timbre: ["Radiant Tonewood Response", "Dressed Fingerboard", "Rapid Bow Articulation"],
    venue: "International Soloist Stage"
  },
  "Prof. Edward Lin": {
    instrument: "Conservatory Master Cellos",
    timbre: ["100% Equity Trade-In", "Acoustically Optimized", "Complete Peace of Mind"],
    venue: "Conservatory String Department"
  },
  "Sarah Jenkins": {
    instrument: "1920 French Atelier Viola",
    timbre: ["Custom Carved Soundpost", "Velvet C-String Balance", "Rich Resonator"],
    venue: "Chamber Recital Hall"
  },
  "David Alessi": {
    instrument: "Pernambuco Master Bow",
    timbre: ["Mongolian Stallion Hair", "Artisan Camber", "Supple Hair Tension"],
    venue: "Juilliard Recording Studio"
  }
};

export function VirtuosoFolio({
  testimonials,
  reviewIndex,
  setReviewIndex,
  handleTouchStart,
  handleTouchEnd,
}: VirtuosoFolioProps) {
  const current = testimonials[reviewIndex];
  const acoustic = defaultAcousticData[current.author] || {
    instrument: current.credential.split("·")[1]?.trim() || "Master Atelier Instrument",
    timbre: ["Optimized Acoustics", "Artisan Setup", "Harmonic Richness"],
    venue: "St. Matthews Atelier"
  };

  return (
    <div
      className="w-full h-auto min-h-[380px] md:min-h-[430px] lg:h-[524px] lg:sticky lg:top-24 select-text flex flex-col group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pristine Obsidian & 24k Gold Acoustic Stage (Zero cloudy textures or artifacts) */}
      <div className="w-full h-full bg-[#121210] text-white rounded-[24px] md:rounded-[30px] border border-[#D4AF37]/35 shadow-[0_22px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(212,175,55,0.06)] p-5 sm:p-7 md:p-8 flex flex-col justify-between relative overflow-hidden">
        
        {/* Top Razor Hairline Gold Border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-20" />

        {/* 1. TOP HEADER: 5 Stars + Acoustic Timbre Waveform */}
        <div className="relative z-10 flex flex-col gap-3 pb-3 border-b border-white/10">
          
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {/* 5 Bright Gold Stars + Score */}
            <div className="flex items-center gap-2">
              <div className="flex text-[#F5C542] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" className="text-[#F5C542] drop-shadow-[0_1px_4px_rgba(245,197,66,0.6)]" />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-white tracking-wider">5.0</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded-full border border-[#D4AF37]/30 font-semibold">
                Verified Soloist
              </span>
            </div>

            {/* Live Animated Acoustic Soundwave */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="flex items-end gap-[3px] h-3.5">
                {[40, 90, 60, 100, 75, 45, 85, 50].map((height, i) => (
                  <motion.span
                    key={i}
                    className="w-[2px] bg-[#D4AF37] rounded-full"
                    animate={{ height: [`${height}%`, `${(height * 0.4) + 20}%`, `${height}%`] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2 + (i * 0.15),
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                Acoustic Proof
              </span>
            </div>
          </div>

          {/* Quick Patron Selector Ribbon (Endless feel, no numbers) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {testimonials.map((t, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewIndex(idx);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-sans tracking-wide transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                  idx === reviewIndex
                    ? 'bg-[#D4AF37] text-[#121210] font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                }`}
                aria-label={`Show review from ${t.author}`}
              >
                {idx === reviewIndex && <span className="w-1.5 h-1.5 rounded-full bg-[#121210]" />}
                <span>{t.author.split(' ')[0]}</span>
              </button>
            ))}
          </div>

        </div>

        {/* 2. CENTER: The Spotlight Review & Acoustic Data */}
        <div className="relative z-10 my-auto py-3 md:py-4 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center"
            >
              {/* Instrument & Venue Tag */}
              <div className="flex items-center gap-2 mb-3 text-[10px] md:text-[11px] font-mono tracking-wider uppercase text-[#D4AF37]">
                <span className="font-semibold">{acoustic.instrument}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/60 truncate">{acoustic.venue}</span>
              </div>

              {/* The Quote */}
              <p className="font-serif text-base sm:text-lg md:text-[21px] lg:text-[23px] text-white/95 font-light italic leading-relaxed md:leading-[1.44] tracking-tight mb-4">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Acoustic Timbre Badges */}
              <div className="flex items-center gap-1.5 flex-wrap mb-4">
                {acoustic.timbre.map((trait, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono tracking-wide px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70"
                  >
                    ✦ {trait}
                  </span>
                ))}
              </div>

              {/* Soloist Profile & Credentials */}
              <div className="border-t border-white/10 pt-3 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif font-bold text-base md:text-lg text-white tracking-wide">
                      {current.author}
                    </h4>
                    <CheckCircle2 size={14} className="text-[#D4AF37] shrink-0" />
                  </div>
                  <p className="font-sans text-[11px] sm:text-xs tracking-wider uppercase text-[#D4AF37] font-medium mt-0.5">
                    {current.role}
                  </p>
                  <p className="font-mono text-[10px] sm:text-[11px] text-white/50 tracking-tight">
                    {current.credential}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. BOTTOM: Endless Looping Timeline & Chevrons (NO NUMBERS) */}
        <div className="relative z-10 border-t border-white/10 pt-3 flex items-center justify-between gap-3 mt-auto">
          
          {/* Endless Looping Timeline */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Endless Acclaim
            </span>

            {/* Glowing sweep bar */}
            <div className="hidden sm:block w-24 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Minimalist Prev / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              }}
              className="px-3 py-1.5 rounded-full border border-white/20 hover:border-[#D4AF37] bg-white/5 hover:bg-[#D4AF37]/20 text-white/80 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono tracking-wider cursor-pointer active:scale-95"
              title="Previous Review"
              aria-label="Previous Review"
            >
              <ChevronLeft size={14} />
              <span className="hidden sm:inline text-[11px]">Prev</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev + 1) % testimonials.length);
              }}
              className="px-3 py-1.5 rounded-full border border-white/20 hover:border-[#D4AF37] bg-white/5 hover:bg-[#D4AF37]/20 text-white/80 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono tracking-wider cursor-pointer active:scale-95"
              title="Next Review"
              aria-label="Next Review"
            >
              <span className="hidden sm:inline text-[11px]">Next</span>
              <ChevronRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
