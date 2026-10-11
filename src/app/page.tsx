"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Music, PenTool, Wrench, ShieldCheck, ArrowRight, X, Clock, MapPin, Star, GraduationCap, History, BookOpen, ShoppingBag, Sparkles } from "lucide-react";
import { getModalContent } from "./modalContent";
import { CartProvider, useCart } from "@/context/CartContext";
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

  const { totalItems, setIsCartOpen, setIsLedgerOpen } = useCart();

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
      image: null,
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
      quote: "The only luthier I trust with my 1734 Guarneri.",
      author: "Elena Rostova",
      role: "Principal Cellist, LSO"
    },
    {
      quote: "They found a voice in the wood I never knew existed.",
      author: "Marcus Chen",
      role: "Concertmaster"
    },
    {
      quote: "Simply unmatched craftsmanship.",
      author: "Sarah Jenkins",
      role: "Soloist & Educator"
    },
    {
      quote: "I shipped my viola across the world just to have Mark set the soundpost.",
      author: "David Alessi",
      role: "Recording Artist"
    },
    {
      quote: "My students only play Lane & Edwards. The absolute pinnacle of modern lutherie.",
      author: "Prof. E. Lin",
      role: "Conservatory Chair"
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
        
        <div className="text-left md:text-center mb-8 md:mb-12 pl-2 md:pl-0">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A1A17] tracking-tight">How may we assist you today?</h1>
        </div>

        {/* 70/30 Split Layout */}
        <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* 70% LEFT: Scrollable Navigation Sections */}
          <div className="w-full lg:w-[70%] flex flex-col gap-16 lg:gap-24 pb-12">
            
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

          {/* 30% RIGHT: Interactive Reviews Carousel (Sticky) */}
          <div 
            className="w-full lg:w-[30%] lg:sticky lg:top-32 h-[400px] lg:h-[calc(100vh-160px)] min-h-[400px] lg:min-h-[600px] relative overflow-hidden rounded-[24px] md:rounded-[30px] border border-[#1A1A17]/20 shadow-2xl group cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Dark background image overlay for the reviews */}
            <Image src="/sheet_music.jpg" alt="Legacy" fill className="object-cover opacity-60 grayscale mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A17] via-[#1A1A17]/90 to-[#1A1A17]/70 pointer-events-none" />
            
            <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between">
              
              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-[#9B7E58]" />
                <h3 className="font-serif text-[#9B7E58] text-lg lg:text-xl tracking-wide">A Legacy of Trust</h3>
              </div>

              {/* Swipeable Content Area */}
              <div className="flex-1 relative mt-8 flex flex-col justify-center min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={reviewIndex}
                    initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="flex gap-1 text-[#9B7E58] mb-4 md:mb-6">
                      {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                    </div>
                    <p className="font-serif text-xl md:text-2xl lg:text-3xl text-white/95 italic mb-6 md:mb-8 leading-snug">
                      &quot;{testimonials[reviewIndex].quote}&quot;
                    </p>
                    <div>
                      <p className="font-sans font-bold text-xs md:text-sm text-white tracking-wide">{testimonials[reviewIndex].author}</p>
                      <p className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1">{testimonials[reviewIndex].role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Dots */}
              <div className="flex gap-2 mt-8 z-20">
                {testimonials.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setReviewIndex(i);
                    }} 
                    className={`h-[3px] transition-all duration-500 rounded-full ${i === reviewIndex ? 'w-8 bg-[#9B7E58]' : 'w-3 bg-white/20 hover:bg-white/40'}`} 
                  />
                ))}
              </div>
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
