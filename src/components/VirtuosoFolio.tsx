"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

  return (
    <div
      className="w-full h-auto min-h-[340px] md:min-h-[380px] lg:h-[524px] lg:sticky lg:top-24 select-text flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Minimalist Swiss-Luxury Architectural Card */}
      <div className="w-full h-full bg-white rounded-[22px] md:rounded-[30px] border border-[#1A1A17]/15 shadow-[0_8px_30px_rgba(26,26,23,0.04)] p-5 sm:p-7 md:p-9 lg:p-11 flex flex-col justify-between relative overflow-hidden">
        
        {/* Top Header: Pure Editorial Tracking */}
        <div className="relative z-10 flex items-center justify-between gap-4 border-b border-[#1A1A17]/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#9B7E58] font-bold">
              01 // Critique & Acclaim
            </span>
            <span className="hidden sm:inline text-[#1A1A17]/20">/</span>
            <span className="hidden sm:inline font-sans text-[11px] text-[#1A1A17]/50 tracking-wider">
              St. Matthews Atelier
            </span>
          </div>

          <div className="flex items-baseline gap-1 font-mono text-[11px] text-[#1A1A17]/40 tracking-widest uppercase">
            <span className="text-[#1A1A17] font-bold">0{reviewIndex + 1}</span>
            <span>/</span>
            <span>0{testimonials.length}</span>
          </div>
        </div>

        {/* Center: Hero Typographic Quote */}
        <div className="relative z-10 my-auto py-3 md:py-4 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center"
            >
              <p className="font-serif text-lg md:text-[22px] lg:text-[25px] xl:text-[26px] text-[#1A1A17] font-light leading-[1.42] md:leading-[1.4] tracking-tight mb-5 md:mb-6">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Author & Verification Hairline Grid */}
              <div className="border-t border-[#1A1A17]/10 pt-4 flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h4 className="font-serif text-base md:text-lg lg:text-xl text-[#1A1A17] font-medium tracking-tight">
                    {current.author}
                  </h4>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9B7E58] font-bold">
                    {current.tag}
                  </span>
                </div>

                <p className="font-sans text-xs tracking-wider uppercase text-[#1A1A17]/70 font-medium mt-0.5">
                  {current.role}
                </p>
                <p className="font-mono text-[11px] text-[#1A1A17]/40 tracking-tight">
                  {current.credential}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Minimalist Swiss Index Selector & Hairline Chevrons */}
        <div className="relative z-10 border-t border-[#1A1A17]/10 pt-4 flex items-center justify-between gap-4 mt-auto">
          
          {/* Index Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {testimonials.map((t, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setReviewIndex(idx);
                }}
                className={`py-1 px-2 text-[11px] font-mono tracking-widest transition-all cursor-pointer ${
                  idx === reviewIndex
                    ? 'text-[#1A1A17] font-bold border-b-2 border-[#1A1A17]'
                    : 'text-[#1A1A17]/35 hover:text-[#1A1A17] border-b-2 border-transparent'
                }`}
                aria-label={`Jump to review ${idx + 1}`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Minimalist Stark Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              }}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#1A1A17]/20 hover:border-[#1A1A17] hover:bg-[#1A1A17] text-[#1A1A17] hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
              title="Previous Review"
              aria-label="Previous Review"
            >
              <ArrowLeft size={13} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev + 1) % testimonials.length);
              }}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#1A1A17]/20 hover:border-[#1A1A17] hover:bg-[#1A1A17] text-[#1A1A17] hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
              title="Next Review"
              aria-label="Next Review"
            >
              <ArrowRight size={13} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
