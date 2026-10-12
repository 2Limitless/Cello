"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck } from "lucide-react";

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
      {/* Clean, Solid Concert Navy Card — Zero Fuzz, Zero Blur Blobs */}
      <div className="w-full h-full bg-[#16212D] text-white rounded-[28px] md:rounded-[32px] border border-white/10 shadow-xl p-6 sm:p-8 md:p-10 lg:p-11 flex flex-col justify-between relative overflow-hidden group">

        {/* Top Header: 5 Gold Stars, 5.0 Rating, and Verified Patron Pill */}
        <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex text-[#F5C84C] gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" className="text-[#F5C84C]" />
              ))}
            </div>
            <span className="font-mono text-xs font-bold text-white ml-0.5">5.0</span>
            <span className="hidden sm:inline-block text-[11px] font-sans text-white/50 tracking-wider">
              · Patron Acclaim
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[#F5C84C] border border-[#F5C84C]/30 shadow-xs">
            <ShieldCheck size={13} className="shrink-0" />
            <span className="text-[10px] md:text-[11px] font-sans font-bold tracking-wider uppercase">
              Verified Review
            </span>
          </div>
        </div>

        {/* Center: The Quote (Fixed Height & PopLayout = Zero Layout Jump Glitch) */}
        <div className="relative z-10 my-auto py-2 w-full min-h-[160px] sm:min-h-[140px] md:min-h-[160px] flex items-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={reviewIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full"
            >
              <p className="font-serif text-lg sm:text-xl md:text-2xl lg:text-[23px] xl:text-[25px] text-white font-normal italic leading-relaxed md:leading-[1.55] tracking-tight">
                &ldquo;{current.quote}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Patron Monogram Medallion, Title & Endless Circular Controls */}
        <div className="relative z-10 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
          <div className="relative flex-1 h-12 flex items-center overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center gap-3.5 w-full"
              >
                {/* Circular Gold Monogram Medallion */}
                <div className="w-11 h-11 rounded-full bg-[#0F1720] text-[#F5C84C] font-serif font-bold text-sm tracking-wider flex items-center justify-center border-2 border-[#D4AF37]/50 shadow-md shrink-0 select-none">
                  {getInitials(current.author)}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif font-bold text-base md:text-lg text-white tracking-wide truncate">
                      {current.author}
                    </h4>
                    <CheckCircle2 size={14} className="text-[#F5C84C] shrink-0" />
                  </div>
                  <p className="font-sans text-xs tracking-wider uppercase text-[#F5C84C] font-semibold mt-0.5 truncate">
                    {current.role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimalist Endless Arrow Controls (No Numbers, Fully Stable) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              }}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:border-white hover:bg-white text-white hover:text-[#16212D] transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
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
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:border-white hover:bg-white text-white hover:text-[#16212D] transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-sm"
              title="Next Review"
              aria-label="Next Review"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Endless Loop Progress Accent Line (Synchronized with 7s Timer) */}
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
