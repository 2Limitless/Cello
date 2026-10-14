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

// Official Google Multi-color G Icon
function GoogleGIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

const googleMeta = [
  {
    avatarBg: "bg-[#4285F4]", // Google Blue
    badge: "Local Guide · 14 reviews",
    timeAgo: "2 weeks ago",
  },
  {
    avatarBg: "bg-[#34A853]", // Google Green
    badge: "Local Guide · 28 reviews",
    timeAgo: "a month ago",
  },
  {
    avatarBg: "bg-[#E37400]", // Google Orange/Amber
    badge: "Local Guide · 11 reviews",
    timeAgo: "3 months ago",
  },
  {
    avatarBg: "bg-[#8E24AA]", // Google Purple
    badge: "Local Guide · 9 reviews",
    timeAgo: "4 months ago",
  },
  {
    avatarBg: "bg-[#EA4335]", // Google Red
    badge: "Local Guide · 32 reviews",
    timeAgo: "5 months ago",
  },
];

export function VirtuosoFolio({
  testimonials,
  reviewIndex,
  setReviewIndex,
  handleTouchStart,
  handleTouchEnd,
}: VirtuosoFolioProps) {
  const current = testimonials[reviewIndex];
  const meta = googleMeta[reviewIndex % googleMeta.length];

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
      className="w-full h-auto min-h-[200px] sm:min-h-[240px] lg:h-[524px] lg:sticky lg:top-24 select-text flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
    <div
      className="w-full h-auto min-h-[200px] sm:min-h-[240px] lg:h-[524px] lg:sticky lg:top-24 select-text flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Warm Craftsman Atelier Guestbook & Google Reviews Widget */}
      <div className="w-full h-full bg-[#FCF9F2] text-[#2A190E] rounded-[22px] sm:rounded-[26px] md:rounded-[30px] border-2 border-[#8C6239]/25 shadow-[0_14px_40px_rgba(60,35,15,0.08),_0_2px_8px_rgba(60,35,15,0.04)] hover:shadow-[0_20px_50px_rgba(60,35,15,0.12)] transition-all duration-300 p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden">
        
        {/* Subtle Warm Parchment Watermark & Grain */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,134,40,0.06),transparent_60%)] pointer-events-none" />

        {/* Top: Workshop Guestbook & Google Verified Header */}
        <div className="flex items-center justify-between pb-3.5 sm:pb-4 lg:pb-5 border-b border-[#8C6239]/15 relative z-10">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FAF5EA] border border-[#8C6239]/30 shadow-xs flex items-center justify-center shrink-0">
              <GoogleGIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-serif font-bold text-sm sm:text-base lg:text-lg text-[#1E120A] tracking-tight">
                  Lane &amp; Edwards Violins
                </span>
                <CheckCircle2 size={14} className="text-[#8C6239] shrink-0" />
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                <span className="font-serif font-bold text-xs sm:text-sm text-[#7C542A]">5.0</span>
                <div className="flex text-[#C68628] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} fill="currentColor" className="text-[#C68628]" />
                  ))}
                </div>
                <span className="font-serif text-[11px] sm:text-xs text-[#7C542A]/70">
                  (48 Patron Reviews)
                </span>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#8C6239]/10 text-[#7C542A] border border-[#8C6239]/20 text-[10px] sm:text-[11px] font-medium tracking-wide">
            ✦ Guestbook
          </span>
        </div>

        {/* Middle: Active Reviewer Info & Content */}
        <div className="my-auto py-3 sm:py-5 lg:py-6 flex flex-col justify-center relative z-10">
          
          {/* Reviewer Profile Row */}
          <div className="relative h-10 sm:h-11 lg:h-12 w-full flex items-center overflow-hidden mb-2 sm:mb-3">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center gap-2.5 sm:gap-3.5 w-full"
              >
                {/* Avatar Stamp Circle */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full ${meta.avatarBg} text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-sm border border-white/30`}
                >
                  {getInitials(current.author)}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif font-bold text-sm sm:text-base lg:text-lg text-[#1E120A] truncate">
                      {current.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-xs text-[#7C542A]/80 font-serif">
                    <span className="text-[#A35D22] font-medium truncate">{meta.badge}</span>
                    <span>·</span>
                    <span className="shrink-0">{meta.timeAgo}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 5 Stars Rating & Patron Credential Pill */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="flex text-[#C68628] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" className="text-[#C68628]" />
              ))}
            </div>
            <span className="text-[10px] sm:text-[11px] font-serif italic px-2.5 py-0.5 rounded-md bg-[#FAF4E6] text-[#7C542A] border border-[#8C6239]/20 truncate max-w-[220px] sm:max-w-[280px]">
              {current.role}
            </span>
          </div>

          {/* Review Body (Warm Bookish Serif) */}
          <div className="relative w-full min-h-[64px] sm:min-h-[85px] lg:min-h-[135px] flex items-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full"
              >
                <p className="font-book text-sm sm:text-base lg:text-lg text-[#2A190E] leading-relaxed italic font-normal">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Bar: Google Footer & Warm Craft Arrows */}
        <div className="pt-3 sm:pt-4 border-t border-[#8C6239]/15 flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#7C542A]/80 font-serif">
            <GoogleGIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Verified Google Review · Louisville, KY</span>
          </div>

          {/* Antique Ivory & Brass Navigation Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full border border-[#8C6239]/30 bg-[#FAF4E6] hover:bg-[#8C6239] hover:text-white text-[#7C542A] transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-xs"
              title="Previous Review"
              aria-label="Previous Review"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev + 1) % testimonials.length);
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full border border-[#8C6239]/30 bg-[#FAF4E6] hover:bg-[#8C6239] hover:text-white text-[#7C542A] transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-xs"
              title="Next Review"
              aria-label="Next Review"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Warm Amber Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#8C6239]/10 overflow-hidden">
          <motion.div
            key={reviewIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className="h-full bg-gradient-to-r from-[#8C6239] to-[#C68628]"
          />
        </div>

      </div>
    </div>
    </div>
  );
}
