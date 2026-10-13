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
import { AtelierBoutique } from "@/components/AtelierBoutique";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { VIPBookingModal } from "@/components/VIPBookingModal";
import { VirtuosoFolio } from "@/components/VirtuosoFolio";

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
    return () => clearInterval(clockTimer);
  }, []);

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
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 md:px-12 py-3.5 sm:py-5 md:py-8 z-40 flex justify-between items-center text-[10px] tracking-[0.2em] uppercase text-[#1A1A17]">
        <div className="flex flex-col">
          <span className="font-bold tracking-[0.2em] sm:tracking-widest text-[#1A1A17] text-xs sm:text-sm">{content.workshop.shopName}</span>
          <span className="text-[7.5px] sm:text-[9px] tracking-[0.25em] text-[#9B7E58] font-medium hidden sm:block">{content.workshop.tagline}</span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          <Link
            href="/portal"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 border border-[#D4AF37]/60 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#7A5B32] hover:text-[#1A1A17] transition-all cursor-pointer shadow-xs text-[9px] sm:text-[10px] font-bold"
            title="Master Atelier Portal"
          >
            <Sparkles size={11} className="text-[#D4AF37] group-hover:text-[#1A1A17] shrink-0" />
            <span>Portal</span>
          </Link>

          <button 
            onClick={() => {
              const el = document.getElementById('the-story');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 border border-[#1A1A17]/30 hover:border-[#1A1A17] text-[#1A1A17] hover:bg-[#1A1A17] hover:text-white transition-all cursor-pointer shadow-xs text-[9px] sm:text-[10px]"
          >
            <BookOpen size={11} className="text-[#9B7E58] shrink-0" />
            <span className="font-bold"><span className="hidden xs:inline">The </span>Story</span>
          </button>

          <button 
            onClick={() => {
              const el = document.getElementById('boutique');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 border border-[#9B7E58] text-[#1A1A17] hover:bg-[#9B7E58] hover:text-white transition-all cursor-pointer shadow-xs text-[9px] sm:text-[10px]"
          >
            <Sparkles size={11} className="text-[#9B7E58] shrink-0" />
            <span className="font-bold">Collection</span>
          </button>
          
          <a
            href={`tel:${content.workshop.phone}`}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-[#1A1A17] text-white hover:bg-[#9B7E58] transition-colors cursor-pointer shadow-md text-[9px] sm:text-[10px]"
          >
            <Phone size={11} className="text-[#9B7E58] shrink-0" />
            <span className="hidden sm:inline font-mono">{content.workshop.phoneFormatted}</span>
            <span className="sm:hidden font-mono">Call</span>
          </a>

          <span className="hidden lg:flex items-center gap-1.5 text-[#1A1A17]/50 text-[10px]"><MapPin size={11} /> {content.workshop.cityState}</span>
          <span className="hidden md:flex items-center gap-1.5 text-[#1A1A17]/50 text-[10px]"><Clock size={11} /> {currentTime || "..."}</span>
        </div>
      </header>

      {/* The Asymmetric Split Hub */}
      <section className={`w-full flex-1 flex flex-col pt-20 sm:pt-24 md:pt-36 px-3 sm:px-6 md:px-12 pb-16 md:pb-24 transition-all duration-700 relative ${selectedIntent ? 'opacity-0 scale-95 pointer-events-none blur-md' : 'opacity-100 scale-100 blur-0'}`}>
        
        {/* Subtle Ambient Radial Highlight to enrich tonewood and contrast against white cards */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(155,126,88,0.07),transparent_70%)] pointer-events-none" />
        
        <div className="text-center mb-4 sm:mb-6 md:mb-12 max-w-4xl mx-auto px-2">
          {/* Refined Atelier Heritage Hallmark */}
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3.5 px-3.5 sm:px-4 py-1 sm:py-1.5 mb-3 sm:mb-4 rounded-full border border-[#9B7E58]/30 bg-[#FAF8F2]/90 shadow-[0_2px_8px_rgba(155,126,88,0.06)]">
            <span className="text-[#9B7E58] text-[9px] sm:text-[11px] leading-none">✦</span>
            <span className="text-[8.5px] sm:text-[10.5px] uppercase tracking-[0.18em] sm:tracking-[0.26em] font-bold text-[#7A5B32]">
              {content.announcementBadge}
            </span>
            <span className="text-[#9B7E58] text-[9px] sm:text-[11px] leading-none">✦</span>
          </div>
          
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1A1A17] tracking-tight">{content.heroTitle}</h1>
          <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#1A1A17]/70 mt-2 max-w-2xl mx-auto font-light leading-relaxed">
            {content.heroSubtitle}
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
                    const Icon = ICON_MAP[item.iconName] || Music;
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
                <span className="text-[11px] tracking-[0.35em] font-bold uppercase">{content.story.volumeTag}</span>
                <div className="h-[1px] w-20 bg-[#D4AF37]" />
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF9F5] tracking-tight">
                {content.story.headline}
              </h2>
            </div>
            <p className="font-serif italic text-lg sm:text-xl text-[#FAF9F5]/70 max-w-xl font-light">
              {content.story.subtitle}
            </p>
          </div>

          {/* Main Grid: Story Feature + The Three Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
            
            {/* Left 7 cols: The True Story & Matthew Lane at the Bench */}
            <div className="lg:col-span-7 flex flex-col bg-[#1A1A17] border-2 border-[#FAF9F5]/15 p-8 lg:p-10 shadow-2xl relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase tracking-widest font-bold">
                  {content.story.benchBadge}
                </span>
                <span className="text-xs text-[#FAF9F5]/40 uppercase tracking-wider font-mono">
                  {content.story.benchSubtext}
                </span>
              </div>

              {/* Bench Image with Badge */}
              <div className="relative w-full h-[320px] sm:h-[400px] border border-[#FAF9F5]/20 overflow-hidden mb-8 group">
                <Image
                  src={content.story.benchImage}
                  alt={content.story.benchTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-white">
                  <div>
                    <p className="font-serif text-lg font-bold">{content.story.benchTitle}</p>
                    <p className="text-xs text-white/70">{content.story.benchSubtitle}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-black/60 border border-white/20 backdrop-blur-sm">
                    {content.story.benchPill}
                  </span>
                </div>
              </div>

              {/* Story Narrative */}
              <div className="space-y-4 font-serif text-[#FAF9F5]/85 text-base sm:text-lg leading-relaxed">
                {content.story.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? "" : "text-sm sm:text-base font-sans text-[#FAF9F5]/70 leading-relaxed"}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#FAF9F5]/10 flex flex-wrap gap-4">
                <button
                  onClick={() => setSelectedIntent('legacy')}
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#c49f2e] text-[#1A1A17] font-bold text-xs uppercase tracking-widest transition-all shadow-[4px_4px_0px_#FAF9F5] cursor-pointer"
                >
                  Read Workshop Archive
                </button>
                <button
                  onClick={() => setSelectedIntent('repair')}
                  className="px-6 py-3 bg-transparent hover:bg-white/10 text-[#FAF9F5] border border-[#FAF9F5]/40 font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
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
                  {content.story.tenet1.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF9F5]/70 leading-relaxed font-sans">
                  {content.story.tenet1.text}
                </p>
              </div>

              {/* Tenet 2 */}
              <div className="bg-[#1A1A17] border-2 border-[#FAF9F5]/15 p-6 sm:p-8 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <Shield size={20} />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">Tenet 02</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-medium">
                  {content.story.tenet2.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF9F5]/70 leading-relaxed font-sans">
                  {content.story.tenet2.text}
                </p>
              </div>

              {/* Tenet 3 with Photo */}
              <div className="bg-[#1A1A17] border-2 border-[#FAF9F5]/15 p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <CheckCircle2 size={20} />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold">Tenet 03</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-medium">
                  {content.story.tenet3.title}
                </h3>
                <div className="relative w-full h-44 border border-[#FAF9F5]/20 overflow-hidden my-1">
                  <Image
                    src={content.story.tenet3.image}
                    alt={content.story.tenet3.caption}
                    fill
                    className="object-cover filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                    {content.story.tenet3.caption}
                  </span>
                </div>
                <p className="text-xs text-[#FAF9F5]/70 leading-relaxed font-sans">
                  {content.story.tenet3.text}
                </p>
              </div>

            </div>

          </div>

          {/* Purist Quote Banner */}
          <div className="bg-[#181816] border-2 border-[#D4AF37]/40 p-8 sm:p-12 relative overflow-hidden">
            <Quote className="absolute right-6 top-6 text-[#D4AF37]/10 w-24 h-24 pointer-events-none" />
            <div className="max-w-4xl relative z-10">
              <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-white leading-relaxed mb-6 font-light">
                &ldquo;{content.story.masterQuote.quote}&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#FAF9F5]/15">
                <div>
                  <p className="font-serif text-base font-bold text-[#D4AF37] tracking-wider uppercase">{content.story.masterQuote.author}</p>
                  <p className="text-xs text-[#FAF9F5]/60 font-mono">{content.story.masterQuote.role}</p>
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
            <span className="font-serif text-base tracking-widest text-white">{content.workshop.shopName}</span>
            <span>·</span>
            <span>{content.workshop.address}</span>
          </div>

          <div className="flex items-center gap-6 text-white/50">
            <span>© 1976 – 2026 Lane &amp; Edwards Violins. All rights reserved.</span>
            <Link
              href="/portal"
              className="text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1.5 font-mono text-[11px] font-semibold"
            >
              <span>✦ Master Luthier Portal</span>
            </Link>
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
                    {(() => {
                      const ModalIcon = ICON_MAP[selectedItem.iconName] || Music;
                      return <ModalIcon size={28} />;
                    })()}
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
