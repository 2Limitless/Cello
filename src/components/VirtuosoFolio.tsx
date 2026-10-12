"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Quote } from "lucide-react";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  credential: string;
  tag: string;
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

  const getInitials = (name: string) => {
    return name
      .replace(/^(Prof\.|Dr\.|Mr\.|Ms\.)\s+/, "")
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("");
  };

  return (
    <div
      className="w-full h-auto min-h-[360px] md:min-h-[400px] lg:h-[524px] lg:sticky lg:top-24 select-text flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Editorial Luxury Atelier Review Card */}
      <div className="w-full h-full bg-[#FCFBF8] text-[#1A1A17] rounded-[28px] md:rounded-[32px] border border-[#1A1A17]/10 hover:border-[#9B7E58]/35 shadow-[0_20px_50px_rgba(26,26,23,0.06)] hover:shadow-[0_25px_60px_rgba(26,26,23,0.1)] transition-all duration-500 p-6 sm:p-8 md:p-10 lg:p-11 flex flex-col justify-between relative overflow-hidden group">
        
        {/* Top Header: 5 Gold Stars, 5.0 Rating, and Verified Patron Pill */}
        <div className="flex items-center justify-between pb-5 border-b border-[#1A1A17]/8">
          <div className="flex items-center gap-2.5">
            <div className="flex text-[#D4AF37] gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" className="text-[#D4AF37]" />
              ))}
            </div>
            <span className="font-mono text-xs font-bold text-[#1A1A17] ml-0.5">5.0</span>
            <span className="hidden sm:inline-block text-[11px] font-sans text-[#1A1A17]/40 tracking-wider">
              · Patron Acclaim
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9B7E58]/10 text-[#9B7E58] border border-[#9B7E58]/20">
            <ShieldCheck size={13} className="shrink-0" />
            <span className="text-[10px] md:text-[11px] font-sans font-semibold tracking-wider uppercase">
              Verified Review
            </span>
          </div>
        </div>

        {/* Center: The Quote with Editorial Bronze Quote Mark */}
        <div className="my-auto py-4 md:py-6 relative min-h-[140px] flex items-center">
          <Quote 
            size={52} 
            className="text-[#9B7E58]/12 absolute -top-3 -left-2 -z-0 pointer-events-none" 
          />
          <AnimatePresence mode="sync">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10 w-full"
            >
              <p className="font-serif text-lg sm:text-xl md:text-2xl lg:text-[23px] xl:text-[25px] text-[#1A1A17] font-normal italic leading-relaxed md:leading-[1.55] tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Patron Monogram Medallion, Title & Endless Circular Controls */}
        <div className="pt-5 border-t border-[#1A1A17]/8 flex items-end justify-between gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3.5"
            >
              {/* Circular Gold Monogram Medallion */}
              <div className="w-11 h-11 rounded-full bg-[#1A1A17] text-[#D4AF37] font-serif font-bold text-sm tracking-wider flex items-center justify-center border-2 border-[#D4AF37]/40 shadow-sm shrink-0 select-none">
                {getInitials(current.author)}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif font-bold text-base md:text-lg text-[#1A1A17] tracking-wide">
                    {current.author}
                  </h4>
                  <CheckCircle2 size={14} className="text-[#9B7E58]" />
                </div>
                <p className="font-sans text-xs tracking-wider uppercase text-[#9B7E58] font-semibold mt-0.5">
                  {current.role}
                </p>
                {current.credential && (
                  <p className="font-sans text-[11px] text-[#1A1A17]/50 mt-0.5 hidden sm:block">
                    {current.credential}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Minimalist Endless Arrow Controls (No Numbers) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              }}
              className="w-10 h-10 rounded-full border border-[#1A1A17]/15 bg-white hover:border-[#1A1A17] hover:bg-[#1A1A17] text-[#1A1A17] hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
              title="Previous Review"
              aria-label="Previous Review"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev + 1) % testimonials.length);
              }}
              className="w-10 h-10 rounded-full border border-[#1A1A17]/15 bg-white hover:border-[#1A1A17] hover:bg-[#1A1A17] text-[#1A1A17] hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
              title="Next Review"
              aria-label="Next Review"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Endless Loop Progress Accent Line at the very bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9B7E58]/15 overflow-hidden">
          <motion.div
            key={reviewIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className="h-full bg-[#9B7E58]/70"
          />
        </div>

      </div>
    </div>
  );
}
