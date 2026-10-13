"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Music, PenTool, Wrench, ShieldCheck, ArrowRight, ArrowUp, X, Clock, MapPin, GraduationCap, History, BookOpen, ShoppingBag, Sparkles, Phone, Flame, Quote, CheckCircle2, Shield } from "lucide-react";
import { getModalContent } from "./modalContent";
import { CartProvider, useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { AtelierBoutique } from "@/components/AtelierBoutique";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { VIPBookingModal } from "@/components/VIPBookingModal";
import { VirtuosoFolio } from "@/components/VirtuosoFolio";

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

  const { setBookingProduct, setIsBookingModalOpen } = useCart();

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const clockTimer = setInterval(updateTime, 60000);
    return () => clearInterval(clockTimer);
  }, []);

  const bentoItems = [
    {
      id: "purchase",
      category: "Instruments & Sales",
      title: "Find Your Instrument",
      subtitle: "Master Luthier Bench Setup",
      icon: Music,
      image: "/atelier/violin_sch_flamed.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-2",
      description: "Discover master-crafted violins, violas, cellos, and basses. While corporate chains ship factory-pressed plywood in cardboard boxes, every instrument at our independent Louisville shop is personally inspected, carved, and acoustically tuned by hand for rich, effortless projection.",
      action1: "View Collection",
      action2: "Speak to Matt"
    },
    {
      id: "accessories",
      category: "Instruments & Sales",
      title: "Strings & Cases",
      subtitle: "Concert Protection",
      icon: ShoppingBag,
      image: "/atelier/case_cc430_luxury_green.png",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "Protect and optimize your voice. Hand-selected luxury suspension cases, Pirastro, Larsen, and Thomastik-Infeld strings, and bespoke carved tonewood fittings.",
      action1: "Browse Catalog",
      action2: "Fittings"
    },
    {
      id: "rental",
      category: "Instruments & Sales",
      title: "Student Rentals",
      subtitle: "The 100% Equity Promise",
      icon: GraduationCap,
      image: "/atelier/workshop_bench_tools.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "We reject the disposable rental racket. Area students receive genuine, shop-graduated tonewood instruments with all setup work done in-house. 100% of first-year rental equity applies toward owning a master instrument.",
      action1: "Start Rental",
      action2: "School Programs"
    },
    {
      id: "guarantee",
      category: "Instruments & Sales",
      title: "The Guarantee",
      subtitle: "The Craftsman's Guarantee · 100% Equity",
      icon: ShieldCheck,
      image: "/atelier/antique_maker_signature.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "The big-box conglomerates profit off student depreciation. We stake our livelihood on your growth: 100% of your investment follows you forever when you step up to your next master instrument.",
      action1: "Read Policies",
      action2: "Appraisals"
    },
    {
      id: "repair",
      category: "Luthier Services",
      title: "Restoration & Repair",
      subtitle: "Purist Benchwork · Since 1976",
      icon: Wrench,
      image: "/atelier/matt_luthier_bench.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "No factory assembly lines. No outsourced regional depots. Complete restoration, precision soundpost adjustment, and acoustic bench setup executed directly by Matthew Lane at our Wallace Ave workbench.",
      action1: "Schedule Consult",
      action2: "Pricing Guide"
    },
    {
      id: "rehair",
      category: "Luthier Services",
      title: "Bow Services",
      subtitle: "Master Rehairs & Balance",
      icon: PenTool,
      image: "/atelier/shop_bows_display.jpg",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      description: "Precision bow rehairs using select unbleached Mongolian stallion hair. Hand-tied, individually combed, and balanced for lightning bite, seamless string crossing, and acoustic clarity.",
      action1: "Drop-off Info",
      action2: "Hair Selection"
    },
    {
      id: "instruction",
      category: "Luthier Services",
      title: "Private Instruction",
      subtitle: "The Oral Tradition",
      icon: BookOpen,
      image: "/atelier/instruction_pedagogy.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "Connect with Louisville's foremost pedagogues, concertmasters, and Suzuki specialists. Mentoring young artists from their first posture to youth orchestra auditions and conservatory stages.",
      action1: "Meet the Faculty",
      action2: "Rates & Schedules"
    },
    {
      id: "legacy",
      category: "The Workshop",
      title: "Our Story",
      subtitle: "Two Generations · One Unbroken Line",
      icon: History,
      image: "/atelier/matt_and_mark_legacy.jpg",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "Founded by Mark Edwards (1952-2026), our shop was built on fifty years of pure devotion to tone. Fit for his first violin here as a young boy in 1988, Matthew Lane worked twenty years at Mark's bench. Today, Matt holds the line: an independent luthier whose hand-carved plates and acoustic truth prove that real craftsmanship outlives every corporate trend.",
      action1: "Read The Story",
      action2: "Meet the Luthiers"
    },
    {
      id: "contact",
      category: "The Workshop",
      title: "Visit Us",
      subtitle: "Historic St. Matthews · Louisville, KY",
      icon: MapPin,
      image: "/atelier/storefront_wallace.png",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      description: "Located at 315 Wallace Ave, Louisville, KY 40207. Step into the scent of seasoned spruce, maple shavings, and rosin. Book an in-person acoustic audition or consult directly with Matthew Lane.",
      action1: "Book on Vagaro",
      action2: "Call Us"
    }
  ];

  const testimonials = [
    {
      quote: "The only luthier in the region I trust with my 1734 Guarneri. Matthew's bridge calibration unlocked acoustic richness and projection that fills Whitney Hall effortlessly.",
      author: "Elena Rostova",
      signature: "Elena Rostova",
      role: "Principal Cellist, Louisville Orchestra",
      credential: "Verified Patron · 1734 Guarneri Cello Calibration",
      tag: "Principal Soloist",
      year: "Patron Since 2018"
    },
    {
      quote: "They found a radiant voice in the tonewood I never knew existed. After Lane & Edwards dressed the fingerboard and cut a French bridge, tonal response increased tenfold.",
      author: "Marcus Chen",
      signature: "Marcus Chen",
      role: "Concertmaster & International Soloist",
      credential: "Verified Patron · Master Violin Setup",
      tag: "Concertmaster",
      year: "Patron Since 2014"
    },
    {
      quote: "Every serious cello and violin student in my studio acquires their instrument through Lane & Edwards. Their 100% equity trade-in policy gives families complete peace of mind.",
      author: "Prof. Edward Lin",
      signature: "Edward Lin",
      role: "String Department Chair, Conservatory",
      credential: "Verified Educator · Juilliard & Eastman Repertoire",
      tag: "Conservatory Chair",
      year: "Patron Since 2008"
    },
    {
      quote: "I shipped my 1920 French viola across the country specifically for Matthew to carve a custom soundpost. The balance across the C and A strings is now pure velvet.",
      author: "Sarah Jenkins",
      signature: "Sarah Jenkins",
      role: "Grammy-Nominated Chamber Musician",
      credential: "Verified Patron · Soundpost Optimization",
      tag: "Chamber Soloist",
      year: "Patron Since 2021"
    },
    {
      quote: "Simply unmatched craftsmanship, integrity, and warmth. Finding this level of Parisian and Cremonese atelier standards in St. Matthews is an extraordinary treasure for Kentucky.",
      author: "David Alessi",
      signature: "David Alessi",
      role: "Juilliard Alumnus & Principal Violist",
      credential: "Verified Patron · Pernambuco Bow Calibration",
      tag: "Recording Artist",
      year: "Patron Since 2016"
    }
  ];

  // Auto-advance reviews (resets timer smoothly on interaction)
  useEffect(() => {
    if (selectedIntent) return;
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [selectedIntent, reviewIndex, testimonials.length]);

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

    if (intentId === 'legacy' && actionNumber === 1) {
      setSelectedIntent(null);
      setTimeout(() => {
        const el = document.getElementById('the-story');
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
    <main className="bg-gradient-to-b from-[#EBE5DA] via-[#F6F4ED] to-[#E9E3D6] min-h-screen w-full flex flex-col text-[#1A1A17] selection:bg-[#9B7E58] selection:text-[#FAF9F5] relative">
      
      {/* Global Noise Texture */}
      <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.03] mix-blend-difference" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-8 md:px-12 z-40 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-[#1A1A17]">
        <span className="font-bold tracking-widest text-[#1A1A17] text-xs">LANE & EDWARDS</span>
        
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <button 
            onClick={() => {
              const el = document.getElementById('the-story');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#1A1A17] text-[#1A1A17] hover:bg-[#1A1A17] hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <BookOpen size={13} className="text-[#9B7E58]" />
            <span className="font-bold">The Story</span>
          </button>

          <button 
            onClick={() => {
              const el = document.getElementById('boutique');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#9B7E58] text-[#1A1A17] hover:bg-[#9B7E58] hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <Sparkles size={13} className="text-[#9B7E58]" />
            <span className="font-bold">Collection</span>
          </button>
          
          <a
            href="tel:5026905908"
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1A17] text-white hover:bg-[#9B7E58] transition-colors cursor-pointer shadow-md"
          >
            <Phone size={13} className="text-[#9B7E58]" />
            <span className="hidden sm:inline font-mono">(502) 690-5908</span>
            <span className="sm:hidden font-mono">Call</span>
          </a>

          <span className="hidden lg:flex items-center gap-2 text-[#1A1A17]/50"><MapPin size={12} /> Louisville, KY</span>
          <span className="hidden md:flex items-center gap-2 text-[#1A1A17]/50"><Clock size={12} /> {currentTime || "..."}</span>
        </div>
      </header>

      {/* The Asymmetric Split Hub */}
      <section className={`w-full flex-1 flex flex-col pt-14 sm:pt-20 md:pt-32 px-3 sm:px-6 md:px-12 pb-16 md:pb-24 transition-all duration-700 relative ${selectedIntent ? 'opacity-0 scale-95 pointer-events-none blur-md' : 'opacity-100 scale-100 blur-0'}`}>
        
        {/* Subtle Ambient Radial Highlight to enrich tonewood and contrast against white cards */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(155,126,88,0.07),transparent_70%)] pointer-events-none" />
        
        <div className="text-left md:text-center mb-4 sm:mb-6 md:mb-12 pl-1 md:pl-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[#9B7E58]/10 border border-[#9B7E58]/30 text-[#9B7E58] text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9B7E58] animate-pulse" />
            <span>Independent Luthier Workshop · Handcrafted Tone Since 1976</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1A1A17] tracking-tight">How may we assist your sound today?</h1>
          <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#1A1A17]/70 mt-2 max-w-2xl mx-auto font-light">
            Every bridge carved by hand. Every plate graduated for acoustic truth. Built with devotion no factory can buy.
          </p>
        </div>

        {/* Mobile Featured Review: Prominently displayed Google Review that fits alongside Bento boxes on screen */}
        <div className="lg:hidden w-full max-w-[1600px] mx-auto mb-3.5 sm:mb-6 md:mb-8">
          <VirtuosoFolio
            testimonials={testimonials}
            reviewIndex={reviewIndex}
            setReviewIndex={setReviewIndex}
            handleTouchStart={handleTouchStart}
            handleTouchEnd={handleTouchEnd}
          />
        </div>

        {/* 70/30 Split Layout */}
        <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6 md:gap-10 items-start">
          
          {/* 60% LEFT: Scrollable Navigation Sections */}
          <div className="w-full lg:w-[62%] xl:w-[60%] flex flex-col gap-10 sm:gap-16 lg:gap-24 pb-12">
            
            {['Instruments & Sales', 'Luthier Services', 'The Workshop'].map((category, index) => (
              <div key={category} className="flex flex-col relative">
                
                <div className="flex flex-col mb-2.5 sm:mb-6 md:mb-10 pl-1 sm:pl-2">
                  <div className="flex items-center gap-3 sm:gap-4 text-[#9B7E58] mb-1 sm:mb-3">
                    <span className="text-[9px] sm:text-[10px] tracking-[0.3em] font-bold uppercase">Volume {String(index + 1).padStart(2, '0')}</span>
                    <div className="h-[1px] w-12 sm:w-16 bg-[#9B7E58]/50"></div>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1A1A17] tracking-tight">{category}</h2>
                </div>
                
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 auto-rows-[135px] sm:auto-rows-[160px] md:auto-rows-[250px]`}>
                  {bentoItems.filter(i => i.category === category).map((item) => {
                    const Icon = item.icon;
                    const isLarge = item.rowSpan.includes('row-span-2');
                    return (
                      <motion.button
                        layoutId={`card-${item.id}`}
                        key={item.id}
                        onClick={() => setSelectedIntent(item.id)}
                        className={`group overflow-hidden rounded-[24px] md:rounded-[30px] text-left flex flex-col justify-between border border-[#1A1A17]/10 bg-white shadow-lg shadow-[#1A1A17]/5 relative cursor-pointer ${
                          isLarge ? 'p-5 md:p-8 lg:p-9' : 'p-4 md:p-5 lg:p-6'
                        } ${item.colSpan} ${item.rowSpan}`}
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

                        <motion.div layoutId={`content-container-${item.id}`} className="relative z-10 w-full flex flex-col justify-between h-full">
                          <div className="flex justify-end items-center w-full">
                            <motion.div 
                              layoutId={`icon-${item.id}`} 
                              className={`rounded-full flex items-center justify-center backdrop-blur-md border ${
                                isLarge ? 'w-10 h-10 md:w-12 md:h-12' : 'w-8 h-8 md:w-10 md:h-10'
                              } ${item.image ? 'bg-black/40 border-white/20 text-white shadow-xl' : 'bg-[#1A1A17]/5 border-[#1A1A17]/10 text-[#9B7E58]'}`}
                            >
                              <Icon size={isLarge ? 16 : 14} />
                            </motion.div>
                          </div>

                          <div className="mt-auto pt-2">
                            <motion.h3 
                              layoutId={`title-${item.id}`} 
                              className={`font-serif leading-tight ${
                                isLarge 
                                  ? 'text-2xl md:text-3xl xl:text-4xl mb-2 md:mb-3' 
                                  : 'text-lg md:text-xl xl:text-2xl mb-1.5 md:mb-2'
                              } ${item.image ? 'text-white drop-shadow-lg' : 'text-[#1A1A17]'}`}
                            >
                              {item.title}
                            </motion.h3>

                            <div className="flex justify-between items-end w-full gap-2">
                              <motion.p 
                                layoutId={`subtitle-${item.id}`} 
                                className={`font-sans text-[9px] md:text-[11px] tracking-[0.2em] uppercase truncate max-w-[70%] ${
                                  item.image ? 'text-white/80 font-medium drop-shadow-md' : 'text-[#1A1A17]/60'
                                }`}
                              >
                                {item.subtitle}
                              </motion.p>
                              
                              <div className={`p-1.5 md:p-2 rounded-full backdrop-blur-sm transition-all duration-500 shrink-0 ${
                                item.image 
                                  ? 'bg-white/10 group-hover:bg-white text-white group-hover:text-[#1A1A17]' 
                                  : 'bg-[#1A1A17]/5 group-hover:bg-[#9B7E58] text-[#9B7E58] group-hover:text-white'
                              }`}>
                                <ArrowRight size={13} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
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

          {/* 40% RIGHT: Virtuoso Review Showcase (Desktop sticky column) */}
          <div className="hidden lg:flex w-full lg:w-[38%] xl:w-[40%] self-stretch flex-col">
            
            {/* Desktop spacer: perfectly matches the Volume 01 header so the Review Box starts flush with 'Find Your Instrument' */}
            <div className="flex flex-col mb-10 pl-2 invisible pointer-events-none select-none" aria-hidden="true">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-[10px] tracking-[0.3em] uppercase">Volume 01</span>
                <div className="h-[1px] w-16"></div>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl tracking-tight">Instruments & Sales</h2>
            </div>

            {/* The Virtuoso Letterpress Folio */}
            <VirtuosoFolio
              testimonials={testimonials}
              reviewIndex={reviewIndex}
              setReviewIndex={setReviewIndex}
              handleTouchStart={handleTouchStart}
              handleTouchEnd={handleTouchEnd}
            />

          </div>

        </div>
      </section>

      {/* Volume 04: The E-Commerce Atelier Boutique */}
      <AtelierBoutique />

      {/* Volume 05: The Wallace Avenue Chronicle // The Craft That Refused to Yield */}
      <section id="the-story" className="w-full bg-[#131311] text-[#FAF9F5] py-20 lg:py-28 border-y-4 border-[#1A1A17] relative overflow-hidden">
        {/* Subtle background ambient texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 pb-10 border-b border-[#FAF9F5]/10">
            <div>
              <div className="flex items-center gap-4 text-[#D4AF37] mb-3">
                <span className="text-[11px] tracking-[0.35em] font-bold uppercase">Volume 05 // The Wallace Avenue Chronicle</span>
                <div className="h-[1px] w-20 bg-[#D4AF37]" />
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF9F5] tracking-tight">
                The Craft That Refused to Yield
              </h2>
            </div>
            <p className="font-serif italic text-lg sm:text-xl text-[#FAF9F5]/70 max-w-xl font-light">
              How a boy fitted for a rental in 1988 grew into a master luthier who held his ground when conglomerates circled—preserving what automated factories can never replicate: acoustic truth.
            </p>
          </div>

          {/* Main Grid: Story Feature + The Three Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
            
            {/* Left 7 cols: The True Story & Matthew Lane at the Bench */}
            <div className="lg:col-span-7 flex flex-col bg-[#1A1A17] border-2 border-[#FAF9F5]/15 p-8 lg:p-10 shadow-2xl relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">
                  The Louisville Chronicle
                </span>
                <span className="text-xs text-[#FAF9F5]/40 uppercase tracking-wider font-mono">
                  315 Wallace Ave · 1988 — Today
                </span>
              </div>

              {/* Bench Image with Badge */}
              <div className="relative w-full h-[320px] sm:h-[400px] border border-[#FAF9F5]/20 overflow-hidden mb-8 group">
                <Image
                  src="/atelier/matt_repair_work.jpg"
                  alt="Matthew Lane graduating an instrument plate at the bench"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-white">
                  <div>
                    <p className="font-serif text-lg font-bold">Matthew Lane at the Bench</p>
                    <p className="text-xs text-white/70">Hand-graduating plate thickness to 0.1mm acoustic tolerance</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-black/60 border border-white/20 backdrop-blur-sm">
                    No CNC Machines
                  </span>
                </div>
              </div>

              {/* Story Narrative */}
              <div className="space-y-4 font-serif text-[#FAF9F5]/85 text-base sm:text-lg leading-relaxed">
                <p>
                  In <strong className="text-white font-sans font-semibold">1988</strong>, a nine-year-old boy stepped into Mark Edwards Violins on Wallace Avenue. Mark carefully fitted him for his very first rental violin. That boy was <strong className="text-[#D4AF37] font-sans font-semibold">Matthew Lane</strong>.
                </p>
                <p className="text-sm sm:text-base font-sans text-[#FAF9F5]/70 leading-relaxed">
                  Most students eventually set their instruments down. Matt never did. In 2005, he returned to the shop not as a customer, but as Mark&apos;s dedicated apprentice. For over two decades, the two worked shoulder-to-shoulder, preserving the exact hand-carving, varnishing, and acoustic arching disciplines handed down through Cremona and Paris.
                </p>
                <p className="text-sm sm:text-base font-sans text-[#FAF9F5]/70 leading-relaxed">
                  When Mark Edwards passed in early 2026, corporate music chains and private-equity retail aggregators circled with acquisition offers. Matt refused every inquiry. Instead, he renewed the craftsman&apos;s sacred promise: <em className="text-white">every violin, viola, and cello that leaves this door will be personally tuned and set up by hand, backed by 100% lifetime equity, and built with an integrity no assembly line could ever buy.</em>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#FAF9F5]/10 flex flex-wrap gap-4">
                <button
                  onClick={() => setSelectedIntent('legacy')}
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#c49f2e] text-[#1A1A17] font-bold text-xs uppercase tracking-widest transition-all shadow-[4px_4px_0px_#FAF9F5]"
                >
                  Read Workshop Archive
                </button>
                <button
                  onClick={() => setSelectedIntent('repair')}
                  className="px-6 py-3 bg-transparent hover:bg-white/10 text-[#FAF9F5] border border-[#FAF9F5]/40 font-bold text-xs uppercase tracking-widest transition-all"
                >
                  Consult Master Luthier
                </button>
              </div>
            </div>

            {/* Right 5 cols: The 3 Uncompromising Tenets */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              
              {/* Tenet 1 */}
              <div className="bg-[#1A1A17] border-2 border-[#FAF9F5]/15 p-6 sm:p-8 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <Flame size={20} />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">Tenet 01</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-medium">
                  The Hand vs. The 10,000-Box Factory
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF9F5]/70 leading-relaxed font-sans">
                  Corporate distributors order shipping containers of mass-pressed plywood instruments drowned in thick polyurethane that suffocates resonance. At Lane &amp; Edwards, every bridge is carved by hand, every soundpost is positioned to 0.1mm, and every spruce plate is graduated with micro finger planes until the wood breathes like a cathedral.
                </p>
              </div>

              {/* Tenet 2 */}
              <div className="bg-[#1A1A17] border-2 border-[#FAF9F5]/15 p-6 sm:p-8 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <Shield size={20} />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">Tenet 02</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-medium">
                  The 100% Equity Shield
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF9F5]/70 leading-relaxed font-sans">
                  The mass-retail model thrives on planned obsolescence and steep depreciation—where families lose 80% of their investment on disposable student instruments. At Lane &amp; Edwards, 100% of your rental and instrument payments transfer directly toward future master acquisitions. We protect your family&apos;s musical journey for life.
                </p>
              </div>

              {/* Tenet 3 with Photo */}
              <div className="bg-[#1A1A17] border-2 border-[#FAF9F5]/15 p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <CheckCircle2 size={20} />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">Tenet 03</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-medium">
                  Two Decades of Master Mentorship
                </h3>
                <div className="relative w-full h-44 border border-[#FAF9F5]/20 overflow-hidden my-1">
                  <Image
                    src="/atelier/matt_and_mark_portrait.jpg"
                    alt="Mark Edwards and Matthew Lane in the Louisville workshop"
                    fill
                    className="object-cover filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                    Mark Edwards (1952–2026) &amp; Matthew Lane
                  </span>
                </div>
                <p className="text-xs text-[#FAF9F5]/70 leading-relaxed font-sans">
                  Conglomerates have automated factories, quarterly investor calls, and overseas assembly lines. This workshop has razor-sharp French gouges, Balkan maple seasoned across generations, and an ear tuned over forty years of devotion. When the bow meets the string, true tone speaks for itself.
                </p>
              </div>

            </div>

          </div>

          {/* Purist Quote Banner */}
          <div className="bg-[#181816] border-2 border-[#D4AF37]/40 p-8 sm:p-12 relative overflow-hidden">
            <Quote className="absolute right-6 top-6 text-[#D4AF37]/10 w-24 h-24 pointer-events-none" />
            <div className="max-w-4xl relative z-10">
              <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-white leading-relaxed mb-6 font-light">
                &ldquo;A violin is not a commodity SKU in a corporate distribution center. It is three hundred years of living geometry held under sixty pounds of string tension, waiting for a human hand to awaken its voice. We answer only to the player, the teacher, and the music.&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#FAF9F5]/15">
                <div>
                  <p className="font-serif text-base font-bold text-[#D4AF37] tracking-wider uppercase">Matthew Lane</p>
                  <p className="text-xs text-[#FAF9F5]/60 font-mono">Master Luthier &amp; Proprietor · Lane &amp; Edwards Violins</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById('boutique');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <span>Back to Collection</span>
                    <ArrowUp size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Discreet Footer */}
      <footer className="w-full bg-[#1A1A17] text-white py-12 px-6 border-t-2 border-[#9B7E58]/30">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/50">
          <div className="flex items-center gap-4">
            <span className="font-serif text-base tracking-widest text-white">LANE & EDWARDS</span>
            <span>·</span>
            <span>315 Wallace Ave, Louisville, KY</span>
          </div>

          <div className="flex items-center gap-4 text-white/50">
            <span>© 1976 – 2026 Lane &amp; Edwards Violins. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Atelier Modals */}
      <ProductDetailModal />
      <VIPBookingModal />

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
