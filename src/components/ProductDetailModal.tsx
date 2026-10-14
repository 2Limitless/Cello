"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Check, ShieldCheck, Sparkles, Calendar, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function ProductDetailModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    setBookingProduct,
    setIsBookingModalOpen
  } = useCart();

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-0 md:p-6 lg:p-12">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-[#1A1A17]/70 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] bg-[#FAF5EA] border-2 border-[#8C6239]/35 shadow-2xl flex flex-col lg:flex-row overflow-hidden md:rounded-[32px]"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-6 right-6 z-30 w-11 h-11 rounded-full bg-[#2A190E] text-[#FAF5EA] flex items-center justify-center hover:bg-[#8C6239] transition-colors cursor-pointer shadow-xl border border-[#8C6239]/30"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {/* Left: Image Showcase */}
          <div className="lg:w-1/2 h-[340px] lg:h-auto relative bg-[#1E1107] shrink-0 overflow-hidden">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E05] via-[#1A0E05]/40 to-transparent opacity-90" />

            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              {selectedProduct.badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-[#FAF5EA] text-[10px] tracking-[0.25em] uppercase font-serif font-bold mb-3 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C68628]" />
                  {selectedProduct.badge}
                </div>
              )}
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-serif font-bold">
                {selectedProduct.origin}
              </p>
              <h4 className="font-serif text-3xl md:text-4xl text-white mt-1 font-medium">
                ${selectedProduct.price.toFixed(2)}
              </h4>
            </div>
          </div>

          {/* Right: Detailed Content */}
          <div className="lg:w-1/2 flex-1 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#8C6239] font-bold">
                  ✦ Atelier Catalog · {selectedProduct.category.toUpperCase()}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1E1107] mt-2 leading-tight font-medium">
                  {selectedProduct.name}
                </h3>
                <p className="font-serif italic text-lg md:text-xl text-[#8C6239] mt-1">
                  {selectedProduct.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-[#3A2414] text-base md:text-lg leading-relaxed font-book">
                {selectedProduct.fullDesc}
              </p>

              {/* Tone Profile Bar Chart if instrument */}
              {selectedProduct.toneProfile && (
                <div className="bg-[#24160C] text-[#FAF5EA] p-6 shadow-xl space-y-4 rounded-[18px] border border-[#8C6239]/30">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#D4AF37] font-bold flex items-center gap-2">
                      <Sparkles size={14} /> Acoustic Tone Architecture
                    </span>
                    <span className="text-[10px] text-white/60 font-serif italic">Calibrated at Wallace Ave Bench</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Warmth & Depth", val: selectedProduct.toneProfile.warmth },
                      { label: "Hall Projection", val: selectedProduct.toneProfile.projection },
                      { label: "Overtone Brilliance", val: selectedProduct.toneProfile.brilliance },
                      { label: "Bow Responsiveness", val: selectedProduct.toneProfile.responsiveness },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-serif text-white/80">
                          <span>{item.label}</span>
                          <span className="text-[#D4AF37] font-bold">{item.val}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 overflow-hidden rounded-full">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.val}%` }}
                            transition={{ duration: 0.8, delay: 0.1 * idx }}
                            className="h-full bg-gradient-to-r from-[#8C6239] to-[#D4AF37]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Provenance & Specs Table */}
              <div className="border-t border-[#8C6239]/20 pt-6 space-y-3 text-sm">
                <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#8C6239] font-bold block mb-3">
                  Luthier Specifications
                </span>
                {selectedProduct.maker && (
                  <div className="flex justify-between py-1.5 border-b border-[#8C6239]/10">
                    <span className="text-[#7C542A] font-serif">Maker:</span>
                    <span className="font-serif font-bold text-[#1E1107]">{selectedProduct.maker}</span>
                  </div>
                )}
                {selectedProduct.tonewood && (
                  <div className="flex justify-between py-1.5 border-b border-[#8C6239]/10">
                    <span className="text-[#7C542A] font-serif">Selected Tonewood:</span>
                    <span className="font-serif text-[#1E1107] text-right max-w-xs">{selectedProduct.tonewood}</span>
                  </div>
                )}
                {selectedProduct.varnish && (
                  <div className="flex justify-between py-1.5 border-b border-[#8C6239]/10">
                    <span className="text-[#7C542A] font-serif">Varnish Formulation:</span>
                    <span className="font-serif text-[#1E1107] text-right max-w-xs">{selectedProduct.varnish}</span>
                  </div>
                )}
                {selectedProduct.setup && (
                  <div className="flex justify-between py-1.5 border-b border-[#8C6239]/10">
                    <span className="text-[#7C542A] font-serif">Acoustic Setup:</span>
                    <span className="font-serif text-[#1E1107] text-right max-w-xs">{selectedProduct.setup}</span>
                  </div>
                )}
              </div>

              {/* Highlights Checklist */}
              <div className="space-y-2 pt-2">
                {selectedProduct.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#3A2414] font-book">
                    <div className="w-5 h-5 rounded-full bg-[#C68628] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Guarantee Banner */}
              <div className="p-4 bg-[#FAF4E6] border border-[#8C6239]/30 rounded-[14px] flex items-center gap-4">
                <ShieldCheck size={28} className="text-[#C68628] shrink-0" />
                <p className="text-xs text-[#5C3818] font-book leading-snug">
                  <strong className="font-bold text-[#1E1107] font-serif">100% Lifetime Equity Protection:</strong> Any instrument acquired maintains full purchase value in trade towards an instrument of greater value.
                </p>
              </div>
            </div>

            {/* CTAs: Atelier Reservation & In-Person Availability */}
            <div className="pt-6 border-t border-[#8C6239]/20">
              {selectedProduct.category === 'instruments' || selectedProduct.category === 'bows' ? (
                <button
                  onClick={() => {
                    const p = selectedProduct;
                    setSelectedProduct(null);
                    setBookingProduct(p);
                    setIsBookingModalOpen(true);
                  }}
                  className="w-full py-4.5 bg-[#2A190E] text-[#FAF5EA] uppercase font-serif tracking-[0.2em] text-xs font-bold hover:bg-[#8C6239] transition-colors shadow-xl flex items-center justify-center gap-3 cursor-pointer rounded-full"
                >
                  <Calendar size={16} className="text-[#C68628]" />
                  <span>Reserve In-Shop Playing Session (Complimentary)</span>
                </button>
              ) : (
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#FAF4E6] border border-[#8C6239]/30 rounded-[16px]">
                  <div className="text-left">
                    <span className="text-[10.5px] font-serif uppercase tracking-widest text-[#8C6239] font-bold block">✦ In-Stock at 315 Wallace Ave</span>
                    <span className="text-xs text-[#5C3818] font-book italic">Walk in during workshop hours or hold for in-store pickup</span>
                  </div>
                  <a
                    href="tel:5026905908"
                    className="px-6 py-3.5 bg-[#2A190E] text-[#FAF5EA] hover:bg-[#8C6239] uppercase font-serif tracking-[0.15em] text-xs font-bold transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-md rounded-full"
                  >
                    <Phone size={14} className="text-[#C68628]" />
                    <span>Call Shop: (502) 690-5908</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
