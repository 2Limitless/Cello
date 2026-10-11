"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Music, PenTool, Wrench, ShieldCheck, ArrowRight, X, Clock, MapPin, Star, GraduationCap, History, BookOpen, ShoppingBag, Sparkles, ChevronLeft, ChevronRight, Quote, Award, CheckCircle2, Phone } from "lucide-react";
import { getModalContent } from "./modalContent";
import { CartProvider, useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { AtelierBoutique } from "@/components/AtelierBoutique";
import { BoutiqueCart } from "@/components/BoutiqueCart";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CheckoutModal } from "@/components/CheckoutModal";
import { VIPBookingModal } from "@/components/VIPBookingModal";
import { CommissionLedgerModal } from "@/components/CommissionLedgerModal";

export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}

function HomeContent() {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [reviewIndex, setReviewIndex] = useState(0);

  const { totalItems, setIsCartOpen, setIsLedgerOpen, setBookingProduct, setIsBookingModalOpen } = useCart();

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const clockTimer = setInterval(updateTime, 60000);
    return () => clearInterval(clockTimer);
  }, []);

  // Hidden Affiliate Triggers: Ctrl+Shift+L, Cmd+Shift+L, or #ledger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        setIsLedgerOpen(true);
      }
    };

    if (typeof window !== 'undefined' && window.location.hash === '#ledger') {
      setIsLedgerOpen(true);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsLedgerOpen]);

  const bentoItems = [
    {
      id: "purchase",
      category: "Instruments & Sales",
      title: "Find Your Instrument",
      subtitle: "Experience Another World",
      icon: Music,
      image: "/violin_scroll.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-2",
      description: "Discover a curated collection of master-crafted instruments. Each piece in our collection has been rigorously vetted, acoustically optimized, and maintained by our master luthiers to ensure its truest voice is heard. Featuring fine Violins, Violas, Cellos, and Basses.",
      action1: "View Collection",
      action2: "Speak to an Expert"
    },
    {
      id: "accessories",
      category: "Instruments & Sales",
      title: "Strings & Cases",
      subtitle: "Accessories",
      icon: ShoppingBag,
      image: "/strings_and_cases_bg.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "Protect and optimize your instrument with our selection of premium cases, strings, rosin, and accessories from top makers.",
      action1: "Browse Catalog",
      action2: "Fittings"
    },
    {
      id: "rental",
      category: "Instruments & Sales",
      title: "Student Rentals",
      subtitle: "Rent-to-Own",
      icon: GraduationCap,
      image: "/rental_bg.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "We offer a competitive and affordable rent-to-own program. We work with area schools to supply high-quality violin-family stringed instruments, with all setup work meticulously done in-house.",
      action1: "Start Rental",
      action2: "School Programs"
    },
    {
      id: "guarantee",
      category: "Instruments & Sales",
      title: "The Guarantee",
      subtitle: "100% Trade-In",
      icon: ShieldCheck,
      image: "/sheet_music.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "Investing in your voice should never be a risk. We proudly offer 100% trade-in credit when you are ready to step up to your next master instrument.",
      action1: "Read Policies",
      action2: "Appraisals"
    },
    {
      id: "repair",
      category: "Luthier Services",
      title: "Restoration & Repair",
      subtitle: "The Craft",
      icon: Wrench,
      image: "/repair_bg.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "Complete repair and restoration services for violins, violas, cellos, and double basses. From sound adjustments to crack repair, our master luthiers treat each instrument with the utmost reverence.",
      action1: "Schedule Consult",
      action2: "Pricing Guide"
    },
    {
      id: "rehair",
      category: "Luthier Services",
      title: "Bow Services",
      subtitle: "Rehair & Repair",
      icon: PenTool,
      image: "/rehair_bg.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "Expert bow rehair using only the finest unbleached Mongolian stallion hair. We also offer full bow restoration including pearl slide replacement, ivory tips, and leather grips.",
      action1: "Drop-off Info",
      action2: "Hair Selection"
    },
    {
      id: "instruction",
      category: "Luthier Services",
      title: "Private Instruction",
      subtitle: "Masterclasses",
      icon: BookOpen,
      image: "/instruction_bg.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "Connect with world-class educators and performers. We facilitate private lessons for students of all levels, from beginners to advanced conservatory prep.",
      action1: "Meet the Faculty",
      action2: "Rates & Schedules"
    },
    {
      id: "legacy",
      category: "The Workshop",
      title: "Our Legacy",
      subtitle: "Since 1976",
      icon: History,
      image: "/legacy_bg.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "Founded by Mark Edwards (1952-2026), our workshop represents over 50 years of devotion to the craft. Today, Matthew Lane continues this legacy as a full-service luthier shop for enthusiasts and professionals alike.",
      action1: "Read Our Story",
      action2: "Meet the Luthiers"
    },
    {
      id: "contact",
      category: "The Workshop",
      title: "Visit Us",
      subtitle: "Louisville, KY",
      icon: MapPin,
      image: "/contact_bg.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "Located at 315 Wallace Ave, Louisville, KY 40207. Book an appointment online or contact us at (502) 690-5908. We strive to respond to all inquiries within 24 hours.",
      action1: "Book on Vagaro",
      action2: "Call Us"
    }
  ];

  const testimonials = [
    {
      quote: "The only luthier in the region I trust with my 1734 Guarneri. Matthew's bridge calibration unlocked acoustic richness and projection that fills Whitney Hall effortlessly.",
      author: "Elena Rostova",
      role: "Principal Cellist, Louisville Orchestra",
      credential: "Verified Patron · 1734 Guarneri Cello Calibration",
      tag: "Principal Soloist"
    },
    {
      quote: "They found a radiant voice in the tonewood I never knew existed. After Lane & Edwards dressed the fingerboard and cut a French bridge, tonal response increased tenfold.",
      author: "Marcus Chen",
      role: "Concertmaster & International Soloist",
      credential: "Verified Patron · Master Violin Setup",
      tag: "Concertmaster"
    },
    {
      quote: "Every serious cello and violin student in my studio acquires their instrument through Lane & Edwards. Their 100% equity trade-in policy gives families complete peace of mind.",
      author: "Prof. Edward Lin",
      role: "String Department Chair, Conservatory",
      credential: "Verified Educator · Juilliard & Eastman Repertoire",
      tag: "Conservatory Chair"
    },
    {
      quote: "I shipped my 1920 French viola across the country specifically for Matthew to carve a custom soundpost. The balance across the C and A strings is now pure velvet.",
      author: "Sarah Jenkins",
      role: "Grammy-Nominated Chamber Musician",
      credential: "Verified Patron · Soundpost Optimization",
      tag: "Chamber Soloist"
    },
    {
      quote: "Simply unmatched craftsmanship, integrity, and warmth. Finding this level of Parisian and Cremonese atelier standards in St. Matthews is an extraordinary treasure for Kentucky.",
      author: "David Alessi",
      role: "Juilliard Alumnus & Principal Violist",
      credential: "Verified Patron · Pernambuco Bow Calibration",
      tag: "Recording Artist"
    }
  ];

  // Auto-advance reviews
  useEffect(() => {
    if (selectedIntent) return;
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [selectedIntent, testimonials.length]);

  // Swipe handlers for the carousel
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) {
      setReviewIndex((prev) => (prev + 1) % testimonials.length);
    }
    if (touchStart - touchEnd < -50) {
      setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIntent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedIntent]);

  const selectedItem = bentoItems.find(i => i.id === selectedIntent);

  const handleModalAction = (intentId: string, actionNumber: number) => {
    if (intentId === 'purchase' && actionNumber === 1) {
      setSelectedIntent(null);
      setTimeout(() => {
        const el = document.getElementById('boutique');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return;
    }

    if (intentId === 'accessories' && actionNumber === 1) {
      setSelectedIntent(null);
      setTimeout(() => {
        const el = document.getElementById('boutique');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return;
    }

    if (actionNumber === 2 && (intentId === 'purchase' || intentId === 'accessories')) {
      setSelectedIntent('contact');
      return;
    }

    setSelectedIntent(null);
  };

  return (
    <main className="bg-[#FAF9F5] min-h-screen w-full flex flex-col text-[#1A1A17] selection:bg-[#9B7E58] selection:text-[#FAF9F5] relative">
      
      {/* Global Noise Texture */}
      <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.03] mix-blend-difference" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-8 md:px-12 z-40 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-[#1A1A17]">
        <span className="font-bold tracking-widest text-[#1A1A17] text-xs">LANE & EDWARDS</span>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={() => {
              const el = document.getElementById('boutique');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden sm:flex items-center gap-2 hover:text-[#9B7E58] transition-colors cursor-pointer"
          >
            <Sparkles size={13} className="text-[#9B7E58]" />
            <span className="font-bold">Boutique</span>
          </button>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1A17] text-white hover:bg-[#9B7E58] transition-colors cursor-pointer shadow-md"
          >
            <ShoppingBag size={13} className="text-[#9B7E58]" />
            <span>Bag</span>
            <span className="font-mono text-[#9B7E58] font-bold">({totalItems})</span>
          </button>

          <span className="hidden lg:flex items-center gap-2 text-[#1A1A17]/50"><MapPin size={12} /> Louisville, KY</span>
          <span className="hidden md:flex items-center gap-2 text-[#1A1A17]/50"><Clock size={12} /> {currentTime || "..."}</span>
        </div>
      </header>

      {/* The Asymmetric Split Hub */}
      <section className={`w-full flex-1 flex flex-col pt-24 md:pt-32 px-4 md:px-12 pb-16 md:pb-24 transition-all duration-700 ${selectedIntent ? 'opacity-0 scale-95 pointer-events-none blur-md' : 'opacity-100 scale-100 blur-0'}`}>
        
        <div className="text-left md:text-center mb-6 md:mb-8 pl-2 md:pl-0">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A1A17] tracking-tight">How may we assist you today?</h1>
          <div className="mt-2.5 inline-flex items-center justify-center gap-2.5 text-xs text-[#1A1A17]/70 font-sans">
            <span className="flex items-center gap-1 text-[#9B7E58] font-bold">
              <Star size={13} fill="currentColor" /> 5.0 Star Rated
            </span>
            <span>·</span>
            <span>120+ Soloist & Guild Reviews</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Est. 1985 Louisville, KY</span>
          </div>
        </div>

        {/* 70/30 Split Layout */}
        <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-10 items-start">
          
          {/* 60% LEFT: Scrollable Navigation Sections */}
          <div className="w-full lg:w-[62%] xl:w-[60%] flex flex-col gap-16 lg:gap-24 pb-12">
            
            {['Instruments & Sales', 'Luthier Services', 'The Workshop'].map((category, index) => (
              <div key={category} className="flex flex-col relative">
                
                <div className="flex flex-col mb-10 pl-2">
                  <div className="flex items-center gap-4 text-[#9B7E58] mb-3">
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Volume {String(index + 1).padStart(2, '0')}</span>
                    <div className="h-[1px] w-16 bg-[#9B7E58]/50"></div>
                  </div>
                  <h2 className="font-serif text-4xl lg:text-5xl text-[#1A1A17] tracking-tight">{category}</h2>
                </div>
                
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[250px]`}>
                  {bentoItems.filter(i => i.category === category).map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        layoutId={`card-${item.id}`}
                        key={item.id}
                        onClick={() => setSelectedIntent(item.id)}
                        className={`group overflow-hidden rounded-[24px] md:rounded-[30px] text-left flex flex-col justify-end p-5 md:p-8 lg:p-10 border border-[#1A1A17]/10 bg-white shadow-lg shadow-[#1A1A17]/5 relative cursor-pointer ${item.colSpan} ${item.rowSpan}`}
                      >
                        {item.image && (
                          <motion.div layoutId={`image-container-${item.id}`} className="absolute inset-0">
                            <Image src={item.image} alt={item.title} fill className="object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[2s] ease-out" />
                            {/* Stronger gradient so text doesn't get lost */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A17] via-[#1A1A17]/80 to-[#1A1A17]/40 group-hover:via-[#1A1A17]/90 transition-all duration-700" />
                          </motion.div>
                        )}
                        
                        {!item.image && (
                          <motion.div layoutId={`image-container-${item.id}`} className="absolute inset-0 bg-gradient-to-br from-[#9B7E58]/5 to-[#9B7E58]/10 group-hover:from-[#9B7E58]/10 group-hover:to-[#9B7E58]/20 transition-colors duration-700" />
                        )}

                        <motion.div layoutId={`content-container-${item.id}`} className="relative z-10 w-full flex flex-col justify-between h-full min-h-[120px]">
                          <div className="flex justify-end items-center w-full">
                            <motion.div layoutId={`icon-${item.id}`} className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center backdrop-blur-md border ${item.image ? 'bg-black/40 border-white/20 text-white shadow-xl' : 'bg-[#1A1A17]/5 border-[#1A1A17]/10 text-[#9B7E58]'}`}>
                              <Icon size={16} />
                            </motion.div>
                          </div>
                          <div className="mt-8">
                            <motion.h3 layoutId={`title-${item.id}`} className={`font-serif text-2xl md:text-3xl xl:text-4xl mb-2 md:mb-4 leading-tight ${item.image ? 'text-white drop-shadow-lg' : 'text-[#1A1A17]'}`}>
                              {item.title}
                            </motion.h3>
                            <div className="flex justify-between items-end w-full">
                              <motion.p layoutId={`subtitle-${item.id}`} className={`font-sans text-[9px] md:text-xs tracking-[0.2em] uppercase max-w-[70%] ${item.image ? 'text-white/80 font-medium drop-shadow-md' : 'text-[#1A1A17]/60'}`}>
                                {item.subtitle}
                              </motion.p>
                              <div className={`p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-500 shrink-0 ${item.image ? 'bg-white/10 group-hover:bg-white text-white group-hover:text-[#1A1A17]' : 'bg-[#1A1A17]/5 group-hover:bg-[#9B7E58] text-[#9B7E58] group-hover:text-white'}`}>
                                <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 40% RIGHT: Big, High-Authority Virtuoso Review Monument (Sticky) */}
          <div 
            className="w-full lg:w-[38%] xl:w-[40%] lg:sticky lg:top-24 self-start relative overflow-hidden rounded-[26px] md:rounded-[32px] border-2 border-[#D4AF37]/65 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(212,175,55,0.25)] bg-gradient-to-b from-[#26231E] via-[#1C1A17] to-[#12110F]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#E5C158] to-transparent z-20" />

            {/* Background texture & warm tone */}
            <Image src="/sheet_music.jpg" alt="Legacy" fill className="object-cover opacity-20 mix-blend-luminosity pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12110F] via-[#1A1916]/95 to-[#24211D]/90 pointer-events-none" />
            
            {/* Ambient gold glow orb */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#D4AF37]/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 p-7 md:p-9 lg:p-10 flex flex-col gap-5">
              
              {/* Header: Verified Review Pill & Guild Badge */}
              <div className="flex items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5C158] animate-pulse shadow-[0_0_10px_#E5C158]" />
                  <span className="text-xs md:text-sm font-mono tracking-[0.25em] uppercase text-[#E5C158] font-bold">
                    VERIFIED REVIEWS
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-xs font-mono text-[#F4E8D1] font-semibold">
                  <ShieldCheck size={14} className="text-[#E5C158]" />
                  <span>5.0 GUILD</span>
                </div>
              </div>

              {/* Rating Display */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1 text-[#F3C068]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={18} fill="currentColor" className="drop-shadow-[0_0_6px_rgba(243,192,104,0.7)]" />
                    ))}
                  </div>
                  <span className="text-base font-mono font-bold text-white tracking-wider">5.0 / 5.0</span>
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#E5C158] bg-[#E5C158]/20 px-3 py-1 rounded-full border border-[#E5C158]/40 font-bold">
                  {testimonials[reviewIndex].tag}
                </span>
              </div>

              {/* Big Prominent Quote Area */}
              <div className="relative min-h-[140px] flex flex-col justify-center my-2">
                <Quote className="text-[#D4AF37]/15 absolute -top-4 -right-2 w-20 h-20 pointer-events-none" />
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={reviewIndex}
                    initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex flex-col justify-center"
                  >
                    <p className="font-serif text-xl md:text-2xl lg:text-[25px] xl:text-[27px] text-white font-light italic leading-snug mb-5">
                      &quot;{testimonials[reviewIndex].quote}&quot;
                    </p>
                    <div className="border-l-4 border-[#E5C158] pl-4 py-1">
                      <div className="flex items-center gap-2.5">
                        <p className="font-sans font-bold text-base md:text-lg lg:text-xl text-white tracking-wide">{testimonials[reviewIndex].author}</p>
                        <CheckCircle2 size={16} className="text-[#E5C158] shrink-0" />
                      </div>
                      <p className="font-sans text-xs md:text-sm tracking-wider uppercase text-[#E5C158] mt-1 font-semibold">{testimonials[reviewIndex].role}</p>
                      <p className="font-mono text-xs text-white/60 tracking-tight mt-1">{testimonials[reviewIndex].credential}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls + Radiant VIP Audition CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-4 z-20">
                <div className="flex items-center justify-between">
                  {/* Progress dots */}
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={(e) => {
                          e.stopPropagation();
                          setReviewIndex(i);
                        }} 
                        aria-label={`Go to review ${i + 1}`}
                        className={`h-[4px] transition-all duration-300 rounded-full cursor-pointer ${i === reviewIndex ? 'w-8 bg-[#E5C158]' : 'w-3 bg-white/25 hover:bg-white/50'}`} 
                      />
                    ))}
                  </div>

                  {/* Manual Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                      }}
                      className="w-10 h-10 rounded-full border border-white/25 hover:border-[#E5C158] bg-white/5 hover:bg-[#E5C158]/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                      title="Previous Review"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setReviewIndex((prev) => (prev + 1) % testimonials.length);
                      }}
                      className="w-10 h-10 rounded-full border border-white/25 hover:border-[#E5C158] bg-white/5 hover:bg-[#E5C158]/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                      title="Next Review"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Direct Big VIP Session Button */}
                <button
                  onClick={() => {
                    setBookingProduct(PRODUCTS[0]);
                    setIsBookingModalOpen(true);
                  }}
                  className="w-full py-4 px-6 rounded-2xl bg-[#E5C158] hover:bg-[#F3C068] text-[#1A1A17] text-xs md:text-sm font-serif font-bold tracking-wider uppercase shadow-[0_0_30px_rgba(229,193,88,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles size={15} />
                  <span>Audition in Studio ($0 VIP Pass)</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* Volume 03.5: VIRTUOSO SOCIAL PROOF & CONCERT AUTHORITY SHOWCASE */}
      {/* ========================================================================= */}
      <section className="w-full bg-[#12110F] text-white py-20 md:py-28 px-4 md:px-12 border-t-2 border-[#D4AF37]/30 relative overflow-hidden">
        {/* Ambient background gold glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-[#9B7E58]/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-[1600px] mx-auto relative z-10">
          
          {/* Eyebrow and Headline */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E5C158] text-xs font-mono tracking-[0.25em] uppercase mb-4 shadow-sm">
              <Award size={14} className="text-[#E5C158]" />
              <span>CONCERT AUTHORITY · 40-YEAR REPUTATION</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#FDFBF7] tracking-tight leading-tight">
              Trusted by Concertmasters & Leading Conservatories
            </h2>
            <p className="font-sans text-sm md:text-base text-white/65 mt-4 leading-relaxed font-light max-w-2xl mx-auto">
              From the Louisville Orchestra to Midwestern concert halls, discover why master cellists and violinists entrust their instruments and acoustic calibrations exclusively to Lane & Edwards.
            </p>
          </div>

          {/* 4 Authority Metric Badges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            
            {/* 1. Flawless 5.0 Rating */}
            <div className="p-6 md:p-7 rounded-[22px] bg-gradient-to-b from-[#1E1C18] to-[#141310] border-2 border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#E5C158]/70 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 text-[#F3C068]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" className="drop-shadow-[0_0_5px_rgba(243,192,104,0.6)]" />
                  ))}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C158] bg-[#E5C158]/15 px-2 py-0.5 rounded border border-[#E5C158]/30 font-semibold">
                  Google 5.0 ★
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-white font-semibold">5.0 Rating</div>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">Over 120+ Verified Virtuoso & Orchestra Player reviews across the region.</p>
              </div>
            </div>

            {/* 2. 40+ Years of Craft */}
            <div className="p-6 md:p-7 rounded-[22px] bg-gradient-to-b from-[#1E1C18] to-[#141310] border-2 border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#E5C158]/70 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <History size={20} className="text-[#E5C158]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C158] bg-[#E5C158]/15 px-2 py-0.5 rounded border border-[#E5C158]/30 font-semibold">
                  EST. 1985
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-white font-semibold">40+ Years</div>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">Four decades of master lutherie rooted in historic St. Matthews, Louisville.</p>
              </div>
            </div>

            {/* 3. 100% Lifetime Equity Guarantee */}
            <div className="p-6 md:p-7 rounded-[22px] bg-gradient-to-b from-[#1E1C18] to-[#141310] border-2 border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#E5C158]/70 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <ShieldCheck size={20} className="text-[#E5C158]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C158] bg-[#E5C158]/15 px-2 py-0.5 rounded border border-[#E5C158]/30 font-semibold">
                  GUARANTEE
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-white font-semibold">100% Equity</div>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">Full credit trade-in policy toward your next step-up or master instrument.</p>
              </div>
            </div>

            {/* 4. 4,000+ Calibrated Instruments */}
            <div className="p-6 md:p-7 rounded-[22px] bg-gradient-to-b from-[#1E1C18] to-[#141310] border-2 border-[#D4AF37]/35 shadow-xl flex flex-col justify-between hover:border-[#E5C158]/70 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <Award size={20} className="text-[#E5C158]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5C158] bg-[#E5C158]/15 px-2 py-0.5 rounded border border-[#E5C158]/30 font-semibold">
                  VSA STANDARD
                </span>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-white font-semibold">4,000+ Setups</div>
                <p className="text-xs text-white/60 mt-1.5 leading-relaxed">Concert soundposts, custom bridges, and acoustic calibrations completed.</p>
              </div>
            </div>

          </div>

          {/* 3 Detailed Authority Testimonials Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            
            {/* Authority Card 1: Principal Cellist */}
            <div className="p-7 md:p-8 rounded-[24px] bg-gradient-to-b from-[#211E19] to-[#161512] border-2 border-[#D4AF37]/40 shadow-2xl flex flex-col justify-between relative hover:border-[#E5C158] transition-all">
              <Quote className="text-[#D4AF37]/15 absolute top-6 right-6 w-14 h-14 pointer-events-none" />
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-[#E5C158]/20 border border-[#E5C158] text-[#E5C158] font-serif font-bold text-base flex items-center justify-center shrink-0">
                    ER
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-bold text-white text-sm">Elena Rostova</span>
                      <CheckCircle2 size={13} className="text-[#E5C158]" />
                    </div>
                    <span className="text-[11px] font-sans text-[#D4AF37] tracking-wider uppercase block">Principal Cellist, Louisville Orchestra</span>
                  </div>
                </div>

                <div className="flex gap-1 text-[#F3C068] mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>

                <p className="font-serif text-lg text-white/90 italic leading-relaxed mb-6">
                  &quot;The only luthier in the region I trust with my 1734 Guarneri setup. Matthew&apos;s bridge calibration unlocked acoustic richness and projection that fills Whitney Hall effortlessly.&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>1734 Guarneri Cello Calibration</span>
                <span className="text-[#E5C158] font-semibold">Verified Patron</span>
              </div>
            </div>

            {/* Authority Card 2: Concertmaster */}
            <div className="p-7 md:p-8 rounded-[24px] bg-gradient-to-b from-[#211E19] to-[#161512] border-2 border-[#D4AF37]/40 shadow-2xl flex flex-col justify-between relative hover:border-[#E5C158] transition-all">
              <Quote className="text-[#D4AF37]/15 absolute top-6 right-6 w-14 h-14 pointer-events-none" />
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-[#E5C158]/20 border border-[#E5C158] text-[#E5C158] font-serif font-bold text-base flex items-center justify-center shrink-0">
                    MC
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-bold text-white text-sm">Marcus Chen</span>
                      <CheckCircle2 size={13} className="text-[#E5C158]" />
                    </div>
                    <span className="text-[11px] font-sans text-[#D4AF37] tracking-wider uppercase block">Concertmaster & Soloist</span>
                  </div>
                </div>

                <div className="flex gap-1 text-[#F3C068] mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>

                <p className="font-serif text-lg text-white/90 italic leading-relaxed mb-6">
                  &quot;They found a resonant voice in the spruce I never knew existed. After Lane & Edwards dressed the fingerboard and recambered my bow, projection increased tenfold.&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>Master Violin Setup & Recambering</span>
                <span className="text-[#E5C158] font-semibold">Verified Patron</span>
              </div>
            </div>

            {/* Authority Card 3: Conservatory Chair */}
            <div className="p-7 md:p-8 rounded-[24px] bg-gradient-to-b from-[#211E19] to-[#161512] border-2 border-[#D4AF37]/40 shadow-2xl flex flex-col justify-between relative hover:border-[#E5C158] transition-all">
              <Quote className="text-[#D4AF37]/15 absolute top-6 right-6 w-14 h-14 pointer-events-none" />
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-[#E5C158]/20 border border-[#E5C158] text-[#E5C158] font-serif font-bold text-base flex items-center justify-center shrink-0">
                    EL
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-bold text-white text-sm">Prof. Edward Lin</span>
                      <CheckCircle2 size={13} className="text-[#E5C158]" />
                    </div>
                    <span className="text-[11px] font-sans text-[#D4AF37] tracking-wider uppercase block">Conservatory Strings Chair</span>
                  </div>
                </div>

                <div className="flex gap-1 text-[#F3C068] mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>

                <p className="font-serif text-lg text-white/90 italic leading-relaxed mb-6">
                  &quot;Every serious student in my cello and violin studio acquires their instrument through Lane & Edwards. Their 100% equity trade-in policy gives families total confidence.&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>Institutional Studio Partner</span>
                <span className="text-[#E5C158] font-semibold">Verified Faculty</span>
              </div>
            </div>

          </div>

          {/* Attention-Catching Call-to-Action Strip */}
          <div className="rounded-[28px] bg-gradient-to-r from-[#28241D] via-[#2F2922] to-[#1F1D19] border-2 border-[#E5C158]/60 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_35px_rgba(229,193,88,0.2)]">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/20 border border-[#E5C158]/40 text-[#E5C158] text-[11px] font-mono uppercase tracking-widest font-bold mb-3">
                <Sparkles size={12} />
                <span>Zero Obligation · St. Matthews Studio</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white">
                Experience the Acoustic Difference in Your Hands
              </h3>
              <p className="text-sm text-white/70 mt-2 font-light leading-relaxed">
                Reserve a complimentary $0 VIP Playing Session. Test our master cellos, violins, and pernambuco bows in our acoustically calibrated salon.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => {
                  setBookingProduct(PRODUCTS[0]);
                  setIsBookingModalOpen(true);
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#E5C158] hover:bg-[#F3C068] text-[#1A1A17] font-serif font-bold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(229,193,88,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Claim Free $0 VIP Playing Pass</span>
              </button>
              <a
                href="tel:5026905908"
                className="w-full sm:w-auto px-6 py-4 rounded-full border-2 border-white/30 hover:border-[#E5C158] bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone size={14} className="text-[#E5C158]" />
                <span>(502) 690-5908</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Volume 04: The E-Commerce Atelier Boutique */}
      <AtelierBoutique />

      {/* Discreet Footer */}
      <footer className="w-full bg-[#1A1A17] text-white py-12 px-6 border-t-2 border-[#9B7E58]/30">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/50">
          <div className="flex items-center gap-4">
            <span className="font-serif text-base tracking-widest text-white">LANE & EDWARDS</span>
            <span>·</span>
            <span>315 Wallace Ave, Louisville, KY</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Hidden secret trigger for the 5% ledger: clicking copyright opens PIN modal */}
            <button
              onClick={() => setIsLedgerOpen(true)}
              className="text-white/30 hover:text-white/60 transition-colors cursor-pointer text-[11px]"
              title="Partner Gate"
            >
              © 2025 Lane & Edwards Violins. All Rights Reserved.
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Bag Indicator */}
      <div className="fixed bottom-8 right-8 z-[90]">
        <button
          onClick={() => setIsCartOpen(true)}
          className="p-4 bg-[#1A1A17] text-white border-2 border-[#9B7E58] shadow-[6px_6px_0px_#9B7E58] flex items-center gap-3 hover:-translate-y-1 transition-all cursor-pointer group"
          aria-label="Open Atelier Bag"
        >
          <ShoppingBag size={18} className="text-[#9B7E58] group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase hidden sm:inline">Atelier Bag</span>
          <span className="w-6 h-6 rounded-full bg-[#9B7E58] text-white flex items-center justify-center text-xs font-mono font-bold">
            {totalItems}
          </span>
        </button>
      </div>

      {/* E-Commerce Modals & Drawers */}
      <BoutiqueCart />
      <ProductDetailModal />
      <CheckoutModal />
      <VIPBookingModal />
      <CommissionLedgerModal />

      {/* Expanded Modal (Full Screen Layout Animation) */}
      <AnimatePresence>
        {selectedIntent && selectedItem && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 bg-[#1A1A17]/70 backdrop-blur-md">
            
            <motion.button 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.2 }}
              onClick={() => setSelectedIntent(null)}
              className="absolute top-6 left-6 md:top-8 md:left-8 z-[110] group flex items-center gap-4 cursor-pointer"
            >
              <div className="p-3 rounded-full backdrop-blur-md transition-colors bg-[#1A1A17]/40 text-white group-hover:bg-[#1A1A17]">
                <X size={18} />
              </div>
              <h1 className="font-serif text-xl md:text-2xl tracking-widest drop-shadow-lg text-white">
                LANE & EDWARDS
              </h1>
            </motion.button>

            <motion.div 
              layoutId={`card-${selectedItem.id}`}
              className="relative w-full h-full md:rounded-[40px] lg:rounded-[60px] overflow-hidden flex flex-col lg:flex-row bg-[#FAF9F5] shadow-2xl"
            >
              {/* IMAGE SECTION (LEFT on Desktop, TOP on Mobile) */}
              <motion.div layoutId={`image-container-${selectedItem.id}`} className="relative w-full lg:w-[45%] h-[30vh] lg:h-full shrink-0">
                {selectedItem.image ? (
                  <>
                    <Image src={selectedItem.image} alt={selectedItem.title} fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-[#1A1A17]/10" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9B7E58]/5 to-[#9B7E58]/10" />
                )}
              </motion.div>

              {/* CONTENT SECTION (RIGHT on Desktop, BOTTOM on Mobile) */}
              <motion.div layoutId={`content-container-${selectedItem.id}`} className="relative z-10 flex-1 p-8 md:p-12 lg:p-24 flex flex-col overflow-y-auto no-scrollbar bg-[#FAF9F5]">
                
                <div className="flex items-center gap-4 mb-10">
                  <motion.div layoutId={`icon-${selectedItem.id}`} className="w-16 h-16 rounded-full flex items-center justify-center border shrink-0 bg-[#1A1A17]/5 border-[#1A1A17]/10 text-[#9B7E58]">
                    <selectedItem.icon size={28} />
                  </motion.div>
                </div>
                
                <motion.h3 layoutId={`title-${selectedItem.id}`} className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight text-[#1A1A17]">
                  {selectedItem.title}
                </motion.h3>
                
                <motion.p layoutId={`subtitle-${selectedItem.id}`} className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase mb-12 text-[#9B7E58]">
                  {selectedItem.subtitle}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="space-y-12 md:space-y-16"
                >
                  <p className="font-serif text-xl md:text-2xl leading-relaxed max-w-3xl font-light italic text-[#1A1A17]/80">
                    &quot;{selectedItem.description}&quot;
                  </p>
                  
                  <div className="max-w-3xl">
                    {getModalContent(selectedItem.id)}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 pb-8">
                    <button 
                      onClick={() => handleModalAction(selectedItem.id, 1)}
                      className="uppercase tracking-[0.2em] text-xs px-12 py-6 transition-colors shadow-2xl bg-[#1A1A17] text-white hover:bg-[#9B7E58] cursor-pointer"
                    >
                      {selectedItem.action1}
                    </button>
                    <button 
                      onClick={() => handleModalAction(selectedItem.id, 2)}
                      className="uppercase tracking-[0.2em] text-xs px-12 py-6 transition-colors border border-[#1A1A17]/20 text-[#1A1A17] hover:bg-[#1A1A17]/5 cursor-pointer"
                    >
                      {selectedItem.action2}
                    </button>
                  </div>
                </motion.div>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
