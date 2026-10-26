"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Music, PenTool, Wrench, ShieldCheck, ArrowRight, ArrowUp, X, Clock, MapPin, GraduationCap, History, BookOpen, ShoppingBag, Sparkles, Phone, Flame, Quote, CheckCircle2, Shield } from "lucide-react";
import { getModalContent } from "./modalContent";
import { CartProvider, useCart } from "@/context/CartContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { PRODUCTS } from "@/data/products";
import { DEFAULT_SITE_CONTENT } from "@/data/defaultSiteContent";
import { AtelierBoutique } from "@/components/AtelierBoutique";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { VIPBookingModal } from "@/components/VIPBookingModal";
import { VirtuosoFolio } from "@/components/VirtuosoFolio";
import { BrandLogo } from "@/components/BrandLogo";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Music,
  ShoppingBag,
  GraduationCap,
  ShieldCheck,
  Wrench,
  PenTool,
  BookOpen,
  History,
  MapPin,
  Sparkles,
  Flame,
  Shield,
  Clock,
};

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

  const { content } = useSiteContent();
  const { setBookingProduct, setIsBookingModalOpen } = useCart();

  const bentoItems = content.bentoItems || [];
  const testimonials = content.testimonials || [];

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    updateTime();
    const clockTimer = setInterval(updateTime, 60000);

    // Shortcut for Matthew: Ctrl+Shift+A or Cmd+Shift+A opens the portal
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        window.location.href = '/portal';
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(clockTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Auto-advance reviews smoothly
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
        setIsBookingModalOpen(true);
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
    <main className="bg-gradient-to-b from-[#FAF7F0] via-[#F4EFE6] to-[#ECE5D8] min-h-screen w-full flex flex-col text-[#1c2024] selection:bg-[#003152] selection:text-[#FAF7F0] relative">
      
      {/* Global Noise Texture */}
      <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* Header featuring official business logo */}
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 md:px-12 py-3 sm:py-5 md:py-6 z-40 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-[#1c2024]">
        <div className="flex items-center gap-3">
          <BrandLogo size="md" />
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button 
            onClick={() => {
              const el = document.getElementById('the-story');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 border border-[#c2a15a]/50 bg-white/90 hover:bg-[#003152] hover:text-[#FAF7F0] hover:border-[#003152] text-[#003152] transition-all cursor-pointer shadow-xs rounded-full text-[9px] sm:text-[10px] font-serif font-bold"
          >
            <BookOpen size={11} className="text-[#c2a15a] group-hover:text-white shrink-0" />
            <span>Our Story</span>
          </button>

          <button 
            onClick={() => {
              const el = document.getElementById('boutique');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 border border-[#003152]/30 bg-white/90 text-[#003152] hover:bg-[#003152] hover:text-white transition-all cursor-pointer shadow-xs rounded-full text-[9px] sm:text-[10px] font-serif font-bold"
          >
            <Sparkles size={11} className="text-[#c2a15a] shrink-0" />
            <span>Supplies</span>
          </button>
          
          <a
            href={`tel:${content.workshop.phone}`}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-[#003152] text-[#FAF7F0] hover:bg-[#00223a] transition-colors cursor-pointer shadow-sm rounded-full text-[9px] sm:text-[10px] font-serif font-bold"
          >
            <Phone size={11} className="text-[#dfc88a] shrink-0" />
            <span className="hidden sm:inline font-mono">{content.workshop.phoneFormatted}</span>
            <span className="sm:hidden font-mono">Call Shop</span>
          </a>

          <span className="hidden lg:flex items-center gap-1.5 text-[#3e444b] text-[10.5px] font-serif font-medium"><MapPin size={11} className="text-[#c2a15a]" /> {content.workshop.cityState}</span>
          <span className="hidden md:flex items-center gap-1.5 text-[#3e444b] text-[10.5px] font-serif font-medium"><Clock size={11} className="text-[#c2a15a]" /> {currentTime || "..."}</span>
        </div>
      </header>

      {/* The Asymmetric Split Hub */}
      <section className={`w-full flex-1 flex flex-col pt-24 sm:pt-28 md:pt-36 px-3 sm:px-6 md:px-12 pb-16 md:pb-24 transition-all duration-700 relative ${selectedIntent ? 'opacity-0 scale-95 pointer-events-none blur-md' : 'opacity-100 scale-100 blur-0'}`}>
        
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_15%,rgba(194,161,90,0.12),transparent_75%)] pointer-events-none" />
        
        {/* HERO SHOWCASE: Full-width photograph of the front of the historic building */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 max-w-5xl mx-auto px-2">
          
          {/* Heritage Hallmark Badge */}
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-1.5 mb-5 rounded-full border border-[#c2a15a]/45 bg-white/90 shadow-[0_2px_12px_rgba(0,49,82,0.06)]">
            <span className="text-[#c2a15a] text-[9px] sm:text-[11px] leading-none">✦</span>
            <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-serif font-bold text-[#003152]">
              Fine Violins, Violas, Cellos, and Basses · Since 2016
            </span>
            <span className="text-[#c2a15a] text-[9px] sm:text-[11px] leading-none">✦</span>
          </div>

          {/* Full-width Photograph of the Historic Building */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.4/1] rounded-[22px] sm:rounded-[30px] md:rounded-[36px] overflow-hidden border-2 border-[#c2a15a]/45 shadow-[0_16px_50px_rgba(0,49,82,0.12)] group mb-6">
            <Image
              src="/atelier/historic_jeffersontown_storefront.jpg"
              alt="Lane & Edwards Violins - Historic Home at 3606 College Drive, Jeffersontown, KY"
              fill
              priority
              className="object-cover object-center group-hover:scale-102 transition-transform duration-1000 ease-out"
            />
            {/* Subtle Neutral Vignette & Lighting Gradient - True Photo Colors */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            
            {/* Architectural & Registry Plaque Overlay */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 text-white">
              <div className="text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#c2a15a]/50 text-[#dfc88a] text-[9px] sm:text-[10px] font-serif uppercase tracking-widest font-bold mb-2">
                  <MapPin size={11} className="text-[#c2a15a]" />
                  <span>National Register of Historic Places · Jeffersontown, KY</span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white drop-shadow-md">
                  Lane &amp; Edwards Violins
                </h1>
                <p className="font-book text-xs sm:text-sm md:text-base text-white/90 italic font-light drop-shadow-sm mt-1">
                  A historic Kentucky home devoted to fine string instruments, acoustic setup, and friendly service.
                </p>
              </div>

              <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-[11px] font-serif uppercase tracking-widest text-[#dfc88a] font-bold">
                  3606 College Dr · Louisville Metro
                </span>
                <span className="text-[10px] text-white/75 font-serif italic">
                  Acoustic Trials &amp; Consultations by Appointment
                </span>
              </div>
            </div>
          </div>

          {/* Intimate Craftsman's Welcome Parchment Note from Matthew Lane */}
          <div className="max-w-3xl mx-auto p-5 sm:p-7 rounded-[22px] bg-white/90 border border-[#c2a15a]/40 shadow-[0_8px_30px_rgba(0,49,82,0.06)] relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle_at_top_right,rgba(194,161,90,0.15),transparent_70%)] pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2.5 mb-3.5 border-b border-[#c2a15a]/25 relative z-10">
              <div className="flex items-center gap-2 text-[#003152] text-xs font-serif tracking-widest uppercase">
                <span className="text-[#c2a15a]">❦</span>
                <span className="font-bold">A Personal Note From Matthew Lane</span>
                <span className="text-[#c2a15a]">❦</span>
              </div>
              <span className="text-[11px] font-serif italic text-[#3e444b]">3606 College Dr · Jeffersontown, KY</span>
            </div>

            <p className="font-book text-sm sm:text-base text-[#1c2024] leading-relaxed italic mb-4 relative z-10 font-normal">
              &ldquo;When you walk through the doors of our historic home on College Drive, you step into a space dedicated to the timeless art of string playing. We believe a violin, viola, cello, or bass is never mere merchandise—it is an authentic voice waiting to be found. Whether we are sizing your child for their first rental, carrying out a delicate soundpost adjustment, or guiding you toward the master instrument of your life, you will always receive our patient, honest, and unhurried care. We are honored to serve Kentucky&apos;s musical community.&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 relative z-10">
              <div className="flex items-baseline gap-2">
                <span className="font-script text-2xl sm:text-3xl text-[#003152] font-bold">Matthew Lane</span>
                <span className="text-[12px] font-serif font-bold text-[#c2a15a]">· Owner &amp; Luthier</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-serif text-[#3e444b]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c2a15a]" />
                <span>100% Equity Trade-In · Lifelong Friendship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Featured Review */}
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
          
          {/* 60% LEFT: Scrollable Navigation Sections (Section numbering removed) */}
          <div className="w-full lg:w-[62%] xl:w-[60%] flex flex-col gap-10 sm:gap-14 lg:gap-20 pb-12">
            
            {[
              { category: 'Instruments & Sales', subtitle: 'Curated Selection & Acoustic Trials' },
              { category: 'Luthier Services', subtitle: 'Hand-Graduated Setups & Restorations' },
              { category: 'The Workshop', subtitle: 'Historic Jeffersontown Heritage' }
            ].map(({ category, subtitle }) => (
              <div key={category} className="flex flex-col relative">
                
                <div className="flex flex-col mb-3 sm:mb-5 md:mb-6 pl-1 sm:pl-2">
                  <div className="flex items-center gap-3 sm:gap-4 text-[#003152] mb-1 sm:mb-1.5">
                    <div className="h-[1.5px] w-12 sm:w-16 bg-gradient-to-r from-[#c2a15a] to-transparent"></div>
                    <span className="text-[10px] sm:text-[11px] font-serif uppercase tracking-widest text-[#c2a15a] font-bold">{subtitle}</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#003152] tracking-tight font-medium">{category}</h2>
                </div>
                
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 auto-rows-[135px] sm:auto-rows-[160px] md:auto-rows-[250px]`}>
                  {bentoItems.filter(i => i.category === category).map((item) => {
                    const Icon = ICON_MAP[item.iconName] || Music;
                    const isLarge = item.rowSpan.includes('row-span-2');
                    return (
                      <motion.button
                        layoutId={`card-${item.id}`}
                        key={item.id}
                        onClick={() => setSelectedIntent(item.id)}
                        className={`group overflow-hidden rounded-[24px] md:rounded-[30px] text-left flex flex-col justify-between border border-[#c2a15a]/30 bg-white shadow-md shadow-[#003152]/5 hover:shadow-xl hover:border-[#c2a15a] transition-all duration-500 relative cursor-pointer ${
                          isLarge ? 'p-5 md:p-8 lg:p-9' : 'p-4 md:p-5 lg:p-6'
                        } ${item.colSpan} ${item.rowSpan}`}
                      >
                        {item.image && (
                          <motion.div layoutId={`image-container-${item.id}`} className="absolute inset-0">
                            <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-all duration-700 ease-out" />
                            {/* Natural Neutral Photographic Gradient for Text Readability - True Colors with Zero Blue Tint */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 group-hover:from-black/90 transition-all duration-500" />
                          </motion.div>
                        )}
                        
                        {!item.image && (
                          <motion.div layoutId={`image-container-${item.id}`} className="absolute inset-0 bg-gradient-to-br from-white via-[#FAF7F0] to-[#F4EFE6] group-hover:from-white group-hover:to-[#EDE6D8] transition-colors duration-700" />
                        )}

                        <motion.div layoutId={`content-container-${item.id}`} className="relative z-10 w-full flex flex-col justify-between h-full">
                          <div className="flex justify-end items-center w-full">
                            <motion.div 
                              layoutId={`icon-${item.id}`} 
                              className={`rounded-full flex items-center justify-center backdrop-blur-md border ${
                                isLarge ? 'w-10 h-10 md:w-12 md:h-12' : 'w-8 h-8 md:w-10 md:h-10'
                              } ${item.image ? 'bg-[#001f35]/70 border-[#c2a15a]/40 text-[#dfc88a] shadow-md' : 'bg-[#003152]/10 border-[#003152]/20 text-[#003152]'}`}
                            >
                              <Icon size={isLarge ? 17 : 15} />
                            </motion.div>
                          </div>

                          <div className="mt-auto pt-2">
                            <motion.h3 
                              layoutId={`title-${item.id}`} 
                              className={`font-serif leading-tight font-medium ${
                                isLarge 
                                    ? 'text-2xl md:text-3xl xl:text-4xl mb-2 md:mb-3' 
                                    : 'text-lg md:text-xl xl:text-2xl mb-1.5 md:mb-2'
                              } ${item.image ? 'text-[#FAF7F0] drop-shadow-md' : 'text-[#003152]'}`}
                            >
                              {item.title}
                            </motion.h3>

                            <div className="flex justify-between items-end w-full gap-2">
                              <motion.p 
                                layoutId={`subtitle-${item.id}`} 
                                className={`font-serif italic text-xs md:text-sm tracking-wide truncate max-w-[75%] ${
                                  item.image ? 'text-[#dfc88a] drop-shadow-xs font-normal' : 'text-[#3e444b]'
                                }`}
                              >
                                {item.subtitle}
                              </motion.p>
                              
                              <div className={`p-1.5 md:p-2 rounded-full backdrop-blur-sm transition-all duration-500 shrink-0 ${
                                item.image 
                                  ? 'bg-[#c2a15a]/25 border border-[#c2a15a]/40 group-hover:bg-[#c2a15a] text-[#FAF7F0] group-hover:text-[#001f35]' 
                                  : 'bg-[#003152]/10 border border-[#003152]/20 group-hover:bg-[#003152] text-[#003152] group-hover:text-white'
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
            
            {/* Desktop spacer: matches the header height */}
            <div className="flex flex-col mb-10 pl-2 invisible pointer-events-none select-none" aria-hidden="true">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-[1px] w-16"></div>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl tracking-tight">Instruments &amp; Sales</h2>
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

      {/* Workshop Supplies & Gear (Boutique) */}
      <AtelierBoutique />

      {/* The Story & Heritage Section */}
      <section id="the-story" className="w-full bg-[#001f35] text-[#FAF7F0] py-20 lg:py-28 border-y-2 border-[#c2a15a]/40 relative overflow-hidden">
        {/* Subtle background ambient texture */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#c2a15a_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 pb-10 border-b border-[#c2a15a]/25">
            <div>
              <div className="flex items-center gap-3 text-[#dfc88a] mb-3">
                <span className="text-[11px] tracking-[0.3em] font-serif font-bold uppercase">{content.story.volumeTag}</span>
                <div className="h-[1.5px] w-20 bg-gradient-to-r from-[#c2a15a] to-transparent" />
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight font-medium">
                {content.story.headline}
              </h2>
            </div>
            <p className="font-book italic text-lg sm:text-xl text-[#FAF7F0]/80 max-w-xl font-light">
              {content.story.subtitle}
            </p>
          </div>

          {/* Main Grid: Story Feature + The Three Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
            
            {/* Left 7 cols: The True Story & Matthew Lane at the Bench */}
            <div className="lg:col-span-7 flex flex-col bg-[#002845] border border-[#c2a15a]/35 p-8 lg:p-10 shadow-2xl relative rounded-[20px]">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3.5 py-1 bg-[#c2a15a]/20 border border-[#c2a15a]/40 text-[#dfc88a] text-[10.5px] uppercase tracking-widest font-serif font-bold rounded-full">
                  {content.story.benchBadge}
                </span>
                <span className="text-xs text-[#FAF7F0]/70 uppercase tracking-wider font-serif italic">
                  {content.story.benchSubtext}
                </span>
              </div>

              {/* Bench Image with Badge */}
              <div className="relative w-full h-[320px] sm:h-[380px] border border-[#c2a15a]/30 rounded-[14px] overflow-hidden mb-8 group">
                <Image
                  src={content.story.benchImage}
                  alt={content.story.benchTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-white">
                  <div>
                    <p className="font-serif text-lg font-bold">{content.story.benchTitle}</p>
                    <p className="font-book italic text-xs text-white/80">{content.story.benchSubtitle}</p>
                  </div>
                  <span className="text-[10px] uppercase font-serif tracking-widest px-3 py-1 bg-black/60 border border-white/20 backdrop-blur-sm rounded-full">
                    {content.story.benchPill}
                  </span>
                </div>
              </div>

              {/* Story Narrative */}
              <div className="space-y-4 font-book text-[#FAF7F0]/90 text-base sm:text-lg leading-relaxed">
                {content.story.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? "font-serif italic text-lg sm:text-xl text-[#FAF7F0] leading-relaxed" : "text-sm sm:text-base font-book text-[#FAF7F0]/80 leading-relaxed"}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#c2a15a]/25 flex flex-wrap gap-4">
                <button
                  onClick={() => setSelectedIntent('legacy')}
                  className="px-6 py-3 bg-[#c2a15a] hover:bg-[#b3924a] text-[#001f35] font-serif font-bold text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer rounded-lg"
                >
                  Read Heritage Archive
                </button>
                <button
                  onClick={() => setSelectedIntent('repair')}
                  className="px-6 py-3 bg-transparent hover:bg-white/10 text-[#FAF7F0] border border-[#c2a15a]/50 font-serif font-bold text-xs uppercase tracking-widest transition-all cursor-pointer rounded-lg"
                >
                  Consult Matthew Lane
                </button>
              </div>
            </div>

            {/* Right 5 cols: The 3 Tenets */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              
              {/* Tenet 1 */}
              <div className="bg-[#002845] border border-[#c2a15a]/35 rounded-[18px] p-6 sm:p-8 flex flex-col gap-3 shadow-md">
                <div className="flex items-center gap-3 text-[#dfc88a]">
                  <Flame size={18} />
                  <span className="text-[11px] font-serif uppercase tracking-[0.2em] font-bold">Tenet 01</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-medium">
                  {content.story.tenet1.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F0]/75 leading-relaxed font-book">
                  {content.story.tenet1.text}
                </p>
              </div>

              {/* Tenet 2 */}
              <div className="bg-[#002845] border border-[#c2a15a]/35 rounded-[18px] p-6 sm:p-8 flex flex-col gap-3 shadow-md">
                <div className="flex items-center gap-3 text-[#dfc88a]">
                  <Shield size={18} />
                  <span className="text-[11px] font-serif uppercase tracking-[0.2em] font-bold">Tenet 02</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-medium">
                  {content.story.tenet2.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F0]/75 leading-relaxed font-book">
                  {content.story.tenet2.text}
                </p>
              </div>

              {/* Tenet 3 with Historic Home Photo */}
              <div className="bg-[#002845] border border-[#c2a15a]/35 rounded-[18px] p-6 sm:p-8 flex flex-col gap-4 shadow-md">
                <div className="flex items-center gap-3 text-[#dfc88a]">
                  <CheckCircle2 size={18} />
                  <span className="text-[11px] font-serif uppercase tracking-[0.2em] font-bold">Tenet 03</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-medium">
                  {content.story.tenet3.title}
                </h3>
                <div className="relative w-full h-44 border border-[#c2a15a]/30 rounded-[10px] overflow-hidden my-1">
                  <Image
                    src={content?.story?.tenet3?.image || "/atelier/historic_jeffersontown_storefront.jpg"}
                    alt={content?.story?.tenet3?.caption || "3606 College Dr · National Register of Historic Places"}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] font-serif uppercase tracking-widest text-[#dfc88a]">
                    {content?.story?.tenet3?.caption || "3606 College Dr · National Register of Historic Places"}
                  </span>
                </div>
                <p className="text-xs text-[#FAF7F0]/75 leading-relaxed font-book">
                  {content?.story?.tenet3?.text || DEFAULT_SITE_CONTENT.story.tenet3.text}
                </p>
              </div>

            </div>

          </div>

          {/* Master Quote Banner */}
          <div className="bg-[#00243e] border border-[#c2a15a]/45 p-8 sm:p-12 relative overflow-hidden rounded-[20px] shadow-xl">
            <Quote className="absolute right-6 top-6 text-[#c2a15a]/10 w-24 h-24 pointer-events-none" />
            <div className="max-w-4xl relative z-10">
              <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-white leading-relaxed mb-6 font-light">
                &ldquo;{content.story.masterQuote.quote}&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#c2a15a]/25">
                <div>
                  <p className="font-serif text-base font-bold text-[#dfc88a] tracking-wider uppercase">{content.story.masterQuote.author}</p>
                  <p className="text-xs text-[#FAF7F0]/70 font-serif italic">{content.story.masterQuote.role}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById('boutique');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-serif font-bold uppercase tracking-widest text-white hover:text-[#dfc88a] transition-colors cursor-pointer"
                  >
                    <span>Back to Top</span>
                    <ArrowUp size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Discreet Footer */}
      <footer className="w-full bg-[#001728] text-[#FAF7F0] py-12 px-6 border-t-2 border-[#c2a15a]/30">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#FAF7F0]/65 font-serif">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start">
            <span className="font-serif text-base tracking-widest text-white font-bold">{content.workshop.shopName}</span>
            <span>·</span>
            <span>{content.workshop.address}</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">{content.workshop.tagline}</span>
          </div>

          <div className="flex items-center gap-4 text-[#FAF7F0]/60">
            <span>© 2016 – 2026 Lane &amp; Edwards Violins. All rights reserved.</span>
            <Link
              href="/portal"
              className="text-[#FAF7F0]/20 hover:text-[#dfc88a] transition-colors text-[9px] font-mono tracking-widest uppercase hover:underline ml-1"
              title="Shop Management Portal"
            >
              [portal]
            </Link>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductDetailModal />
      <VIPBookingModal />

      {/* Expanded Modal (Full Screen Layout Animation) */}
      <AnimatePresence>
        {selectedIntent && selectedItem && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12 bg-black/60 backdrop-blur-md">
            
            <motion.button 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.2 }}
              onClick={() => setSelectedIntent(null)}
              className="absolute top-6 left-6 md:top-8 md:left-8 z-[110] group flex items-center gap-4 cursor-pointer"
            >
              <div className="p-3 rounded-full backdrop-blur-md transition-colors bg-black/40 text-white group-hover:bg-[#003152]">
                <X size={18} />
              </div>
              <h1 className="font-serif text-xl md:text-2xl tracking-widest drop-shadow-lg text-white">
                LANE &amp; EDWARDS VIOLINS
              </h1>
            </motion.button>

            <motion.div 
              layoutId={`card-${selectedItem.id}`}
              className="relative w-full h-full md:rounded-[40px] lg:rounded-[50px] overflow-hidden flex flex-col lg:flex-row bg-[#FAF7F0] border-2 border-[#c2a15a]/45 shadow-2xl"
            >
              {/* IMAGE SECTION */}
              <motion.div layoutId={`image-container-${selectedItem.id}`} className="relative w-full lg:w-[45%] h-[30vh] lg:h-full shrink-0 bg-[#1c2024]">
                {selectedItem.image ? (
                  <>
                    <Image src={selectedItem.image} alt={selectedItem.title} fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1c2024]/10 to-[#1c2024]/20" />
                )}
              </motion.div>

              {/* CONTENT SECTION */}
              <motion.div layoutId={`content-container-${selectedItem.id}`} className="relative z-10 flex-1 p-8 md:p-12 lg:p-16 flex flex-col overflow-y-auto no-scrollbar bg-[#FAF7F0] text-[#1c2024]">
                
                <div className="flex items-center gap-4 mb-6">
                  <motion.div layoutId={`icon-${selectedItem.id}`} className="w-12 h-12 rounded-full flex items-center justify-center border shrink-0 bg-[#003152]/10 border-[#003152]/20 text-[#003152]">
                    {(() => {
                      const ModalIcon = ICON_MAP[selectedItem.iconName] || Music;
                      return <ModalIcon size={24} />;
                    })()}
                  </motion.div>
                </div>
                
                <motion.h3 layoutId={`title-${selectedItem.id}`} className="font-serif text-3xl md:text-4xl lg:text-5xl mb-3 tracking-tight text-[#003152] font-medium">
                  {selectedItem.title}
                </motion.h3>
                
                <motion.p layoutId={`subtitle-${selectedItem.id}`} className="font-serif italic text-sm md:text-base tracking-wide mb-8 text-[#c2a15a] font-bold">
                  {selectedItem.subtitle}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="space-y-8 md:space-y-10"
                >
                  <p className="font-book text-lg md:text-xl leading-relaxed max-w-3xl italic text-[#3e444b]">
                    &quot;{selectedItem.description}&quot;
                  </p>
                  
                  <div className="max-w-3xl">
                    {getModalContent(selectedItem.id, {
                      onNavigateToBoutique: (category = 'all', instrumentType = 'all') => {
                        setSelectedIntent(null);
                        window.dispatchEvent(new CustomEvent('filter-boutique', { detail: { category, instrumentType } }));
                        setTimeout(() => {
                          const el = document.getElementById('boutique');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }, 250);
                      },
                      onOpenBooking: () => {
                        setSelectedIntent(null);
                        setIsBookingModalOpen(true);
                      },
                      onClose: () => setSelectedIntent(null)
                    })}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pb-8">
                    <button 
                      onClick={() => handleModalAction(selectedItem.id, 1)}
                      className="uppercase font-serif tracking-[0.2em] text-xs px-8 py-4 transition-colors shadow-md bg-[#003152] text-[#FAF7F0] hover:bg-[#00223a] cursor-pointer rounded-full font-bold"
                    >
                      {selectedItem.action1}
                    </button>
                    <button 
                      onClick={() => handleModalAction(selectedItem.id, 2)}
                      className="uppercase font-serif tracking-[0.2em] text-xs px-8 py-4 transition-colors border border-[#003152] text-[#003152] hover:bg-[#003152] hover:text-white cursor-pointer rounded-full font-bold"
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
