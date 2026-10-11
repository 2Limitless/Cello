"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

export interface Testimonial {
  quote: string;
  author: string;
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

  // Marquee review ticker items
  const marqueeItems = [
    { name: "Elena Rostova", stars: "★★★★★", snippet: "1734 Guarneri Cello Calibration" },
    { name: "Marcus Chen", stars: "★★★★★", snippet: "Master French Bridge Optimization" },
    { name: "Prof. Edward Lin", stars: "★★★★★", snippet: "100% Equity Trade-In Peace of Mind" },
    { name: "Sarah Jenkins", stars: "★★★★★", snippet: "Custom Carved Soundpost Resonance" },
    { name: "David Alessi", stars: "★★★★★", snippet: "Pernambuco Bow Hair Calibration" },
  ];

  return (
    <div
      className="w-full h-auto min-h-[380px] md:min-h-[420px] lg:h-[524px] lg:sticky lg:top-24 select-text flex flex-col group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* High-Impact Obsidian & Gold Luxury Review Card */}
      <div className="w-full h-full bg-[#141412] text-white rounded-[24px] md:rounded-[30px] border border-[#D4AF37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_35px_rgba(212,175,55,0.08)] p-5 sm:p-7 md:p-8 lg:p-9 flex flex-col justify-between relative overflow-hidden">
        
        {/* Top Hairline Amber Glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-20" />
        
        {/* Ambient Subtle Radial Glow in corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#9B7E58]/10 rounded-full blur-2xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

        {/* 1. TOP BAR: Instant Review Signifiers */}
        <div className="relative z-10 flex flex-col gap-2.5 border-b border-white/10 pb-3">
          
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {/* 5 Bright Gold Stars + Score */}
            <div className="flex items-center gap-2">
              <div className="flex text-[#F5C542] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" className="text-[#F5C542] drop-shadow-[0_1px_4px_rgba(245,197,66,0.5)]" />
                ))}
              </div>
              <span className="font-mono text-xs font-bold text-white tracking-wider">5.0 / 5.0</span>
            </div>

            {/* Verified Patron Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#E6C665] text-[10px] font-mono uppercase tracking-wider font-semibold">
              <CheckCircle2 size={11} className="text-[#D4AF37]" />
              <span>Verified Patron Acclaim</span>
            </div>
          </div>

          {/* Endless Marquee Ticker Strip */}
          <div className="w-full overflow-hidden py-1 border-t border-white/5 relative flex items-center">
            <motion.div
              className="flex items-center gap-6 whitespace-nowrap text-[10px] font-mono text-white/55"
              animate={{ x: [0, -600] }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            >
              {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[#F5C542]">★</span>
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-white/40">· {item.snippet}</span>
                  <span className="text-[#D4AF37]/50 ml-2">✦</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* 2. CENTER: The Spotlight Review Quote */}
        <div className="relative z-10 my-auto py-2 md:py-3 flex flex-col justify-center">
          <Quote className="text-[#D4AF37]/20 absolute -top-4 -right-1 w-14 h-14 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col justify-center"
            >
              {/* The Quote */}
              <p className="font-serif text-base sm:text-lg md:text-[21px] lg:text-[23px] text-white/95 font-light italic leading-relaxed md:leading-[1.42] tracking-tight mb-4 md:mb-5">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Author Profile with Monogram Avatar & Verification */}
              <div className="border-t border-white/10 pt-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  {/* Monogram Avatar Circle */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E6C665] via-[#B8923E] to-[#6E501D] p-[1.5px] shrink-0 shadow-md">
                    <div className="w-full h-full rounded-full bg-[#1A1A17] flex items-center justify-center text-[#E6C665] font-serif font-bold text-xs">
                      {current.author.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>

                  {/* Author Name and Roles */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-white tracking-wide">
                        {current.author}
                      </h4>
                      <CheckCircle2 size={13} className="text-[#D4AF37] shrink-0" />
                    </div>
                    <p className="font-sans text-[11px] sm:text-xs tracking-wider uppercase text-[#D4AF37] font-medium">
                      {current.role}
                    </p>
                    <p className="font-mono text-[10px] sm:text-[11px] text-white/50 tracking-tight">
                      {current.credential}
                    </p>
                  </div>
                </div>

                {/* Instrument / Accreditation Tag */}
                <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                  <Sparkles size={11} className="text-[#D4AF37]" />
                  <span>{current.tag}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. BOTTOM: Endless Stream Progress Bar & Loop Controls (NO NUMBERS) */}
        <div className="relative z-10 border-t border-white/10 pt-3 flex items-center justify-between gap-3 mt-auto">
          
          {/* Endless Stream Looping Indicator */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              Endless Acclaim
            </span>

            {/* Continuous animated progress rail */}
            <div className="hidden sm:block w-20 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Endless Navigation Chevrons */}
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
