"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

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

  return (
    <div
      className="w-full h-auto min-h-[340px] md:min-h-[380px] lg:h-[524px] lg:sticky lg:top-24 select-text flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Clean, Minimal Luxury Review Card */}
      <div className="w-full h-full bg-[#1A1A17] text-white rounded-[24px] md:rounded-[30px] border border-white/10 shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between relative">
        
        {/* Top: 5 Stars & Minimal Verified Label */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex text-[#D4AF37] gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <span className="font-mono text-xs font-semibold text-white/90 ml-1">5.0</span>
          </div>

          <span className="text-[10px] md:text-[11px] font-sans tracking-[0.2em] uppercase text-white/40">
            Verified Patron
          </span>
        </div>

        {/* Center: The Quote (Spacious, Elegant, Breathing Room) */}
        <div className="my-auto py-6 md:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="font-serif text-lg sm:text-xl md:text-2xl lg:text-[24px] xl:text-[26px] text-white/95 font-light italic leading-relaxed md:leading-[1.5] tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom: Author & Endless Looping Controls (Zero Numbers) */}
        <div className="pt-5 border-t border-white/10 flex items-end justify-between gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-1.5">
                <h4 className="font-serif font-bold text-base md:text-lg text-white tracking-wide">
                  {current.author}
                </h4>
                <CheckCircle2 size={14} className="text-[#9B7E58]" />
              </div>
              <p className="font-sans text-xs tracking-wider uppercase text-[#D4AF37] mt-0.5 font-medium">
                {current.role}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Minimal Endless Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              }}
              className="w-9 h-9 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-white/70 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
              title="Previous Review"
              aria-label="Previous Review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev + 1) % testimonials.length);
              }}
              className="w-9 h-9 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-white/70 hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
              title="Next Review"
              aria-label="Next Review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
