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
      className="w-full h-auto min-h-[360px] md:min-h-[400px] lg:h-[524px] lg:sticky lg:top-24 select-text flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Clean, Modern Google Reviews Card Widget */}
      <div className="w-full h-full bg-white text-gray-900 rounded-[24px] md:rounded-[28px] border border-[#1A1A17]/12 shadow-[0_16px_45px_rgba(26,26,23,0.08),_0_2px_8px_rgba(26,26,23,0.04)] hover:shadow-[0_22px_55px_rgba(26,26,23,0.12)] transition-all duration-300 p-6 sm:p-7 md:p-8 flex flex-col justify-between relative overflow-hidden">

        {/* Top: Google Business Profile Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xs flex items-center justify-center shrink-0">
              <GoogleGIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-semibold text-sm sm:text-base text-gray-900 leading-tight">
                  Lane & Edwards Violins
                </span>
                <CheckCircle2 size={15} className="text-[#1A73E8] shrink-0" />
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-sans font-bold text-xs text-gray-900">5.0</span>
                <div className="flex text-[#FBBC04] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" className="text-[#FBBC04]" />
                  ))}
                </div>
                <span className="font-sans text-xs text-gray-500">
                  (48 Google reviews)
                </span>
              </div>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-[#1A73E8] border border-blue-100 text-[11px] font-medium tracking-tight">
            Verified Business
          </span>
        </div>

        {/* Middle: Active Reviewer Info & Content */}
        <div className="my-auto py-5 flex flex-col justify-center">
          
          {/* Reviewer Google Profile Row */}
          <div className="relative h-12 w-full flex items-center overflow-hidden mb-3">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex items-center gap-3 w-full"
              >
                {/* Google Avatar Circle */}
                <div
                  className={`w-10 h-10 rounded-full ${meta.avatarBg} text-white font-sans font-semibold text-sm flex items-center justify-center shrink-0 shadow-xs`}
                >
                  {getInitials(current.author)}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans font-semibold text-sm sm:text-base text-gray-900 truncate">
                      {current.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-[#E37400] font-medium truncate">{meta.badge}</span>
                    <span>·</span>
                    <span className="shrink-0">{meta.timeAgo}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 5 Stars Rating & Patron Role Pill */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex text-[#FBBC04] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" className="text-[#FBBC04]" />
              ))}
            </div>
            <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 truncate max-w-[260px]">
              {current.role}
            </span>
          </div>

          {/* Review Body (PopLayout = 100% Zero Layout Jumps) */}
          <div className="relative w-full min-h-[130px] sm:min-h-[115px] md:min-h-[130px] flex items-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full"
              >
                <p className="font-sans text-[15px] sm:text-base text-gray-800 leading-relaxed font-normal">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Bar: Google Footer & Material Arrow Navigation */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <GoogleGIcon className="w-4 h-4 shrink-0" />
            <span className="font-sans">Posted on Google Maps</span>
          </div>

          {/* Minimalist Google Material Circular Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
              }}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-100 hover:border-gray-300 text-gray-700 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-xs"
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
              className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-100 hover:border-gray-300 text-gray-700 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-xs"
              title="Next Review"
              aria-label="Next Review"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Subtle Google Blue Live Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gray-100 overflow-hidden">
          <motion.div
            key={reviewIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className="h-full bg-[#1A73E8]"
          />
        </div>

      </div>
    </div>
  );
}
