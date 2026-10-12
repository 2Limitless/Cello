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
      {/* Editorial Luxury Review Card in Rich Concert Navy / Prussian Blue */}
      <div className="w-full h-full bg-[#1C2836] text-white rounded-[28px] md:rounded-[32px] border border-[#D4AF37]/35 hover:border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(28,40,54,0.22)] hover:shadow-[0_25px_60px_rgba(28,40,54,0.3)] transition-all duration-500 p-6 sm:p-8 md:p-10 lg:p-11 flex flex-col justify-between relative overflow-hidden group">
        
        {/* Ambient Gradient for Luminous Prussian Depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#243447]/60 via-transparent to-[#141E28]/80 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Top Header: 5 Gold Stars, 5.0 Rating, and Verified Patron Pill */}
        <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/12">
          <div className="flex items-center gap-2.5">
            <div className="flex text-[#F5C84C] gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" className="text-[#F5C84C]" />
              ))}
            </div>
            <span className="font-mono text-xs font-bold text-white ml-0.5">5.0</span>
            <span className="hidden sm:inline-block text-[11px] font-sans text-white/60 tracking-wider">
              · Patron Acclaim
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#F5C84C] border border-[#D4AF37]/40 shadow-xs">
            <ShieldCheck size={13} className="shrink-0" />
            <span className="text-[10px] md:text-[11px] font-sans font-bold tracking-wider uppercase">
              Verified Review
            </span>
          </div>
        </div>

        {/* Center: The Quote with Editorial Bronze Quote Mark */}
        <div className="relative z-10 my-auto py-4 md:py-6 min-h-[140px] flex items-center">
          <Quote 
            size={52} 
            className="text-[#D4AF37]/15 absolute -top-3 -left-2 -z-0 pointer-events-none" 
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
              <p className="font-serif text-lg sm:text-xl md:text-2xl lg:text-[23px] xl:text-[25px] text-white font-normal italic leading-relaxed md:leading-[1.55] tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Patron Monogram Medallion, Title & Endless Circular Controls */}
        <div className="relative z-10 pt-5 border-t border-white/12 flex items-end justify-between gap-4">
          <AnimatePresence mode="sync">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3.5"
            >
              {/* Circular Gold Monogram Medallion */}
              <div className="w-11 h-11 rounded-full bg-[#121B24] text-[#F5C84C] font-serif font-bold text-sm tracking-wider flex items-center justify-center border-2 border-[#D4AF37]/60 shadow-md shrink-0 select-none">
                {getInitials(current.author)}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif font-bold text-base md:text-lg text-white tracking-wide">
                    {current.author}
                  </h4>
                  <CheckCircle2 size={14} className="text-[#F5C84C]" />
                </div>
                <p className="font-sans text-xs tracking-wider uppercase text-[#F5C84C] font-semibold mt-0.5">
                  {current.role}
                </p>
                {current.credential && (
                  <p className="font-sans text-[11px] text-white/60 mt-0.5 hidden sm:block">
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
              className="w-10 h-10 rounded-full border border-white/25 bg-white/10 hover:border-white hover:bg-white text-white hover:text-[#1C2836] transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
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
              className="w-10 h-10 rounded-full border border-white/25 bg-white/10 hover:border-white hover:bg-white text-white hover:text-[#1C2836] transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
              title="Next Review"
              aria-label="Next Review"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Endless Loop Progress Accent Line at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
          <motion.div
            key={reviewIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className="h-full bg-[#F5C84C]"
          />
        </div>

      </div>
    </div>
  );
}
