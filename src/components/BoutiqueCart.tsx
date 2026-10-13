"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, Sparkles, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function BoutiqueCart() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    total,
    hasTradeIn,
    setHasTradeIn,
    tradeInValue,
    setTradeInValue,
    setCheckoutState,
    setSelectedProduct,
  } = useCart();

  const hasTrialEligible = items.some(item => item.product.trialEligible);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#1A1A17]/60 backdrop-blur-md cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl h-full bg-[#FAF9F5] text-[#1A1A17] shadow-2xl flex flex-col border-l-2 border-[#1A1A17]"
          >
            {/* Header */}
            <div className="p-8 border-b-2 border-[#1A1A17] flex justify-between items-center bg-[#FAF9F5]">
              <div>
                <span className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#9B7E58]">
                  Volume IV // Boutique Bag
                </span>
                <h3 className="font-serif text-3xl md:text-4xl mt-1 text-[#1A1A17]">
                  Your Selection
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-12 h-12 rounded-full border border-[#1A1A17]/20 flex items-center justify-center hover:bg-[#1A1A17] hover:text-white transition-colors cursor-pointer"
                aria-label="Close Bag"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#1A1A17]/20 flex items-center justify-center mb-6 text-[#9B7E58]">
                    <Sparkles size={32} />
                  </div>
                  <h4 className="font-serif text-2xl text-[#1A1A17] mb-2">Your Bag is Empty</h4>
                  <p className="text-[#1A1A17]/70 text-base max-w-xs mb-8 font-light">
                    Explore our curated collection of fine European instruments, bows, and luthier accessories.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-8 py-4 bg-[#1A1A17] text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#9B7E58] transition-colors shadow-lg cursor-pointer"
                  >
                    Explore Boutique
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="bg-white border-2 border-[#1A1A17] p-5 shadow-[4px_4px_0px_#1A1A17] flex gap-5 group"
                      >
                        <div
                          className="relative w-24 h-24 shrink-0 bg-[#1A1A17]/5 border border-[#1A1A17]/10 overflow-hidden cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsCartOpen(false);
                          }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h5
                                onClick={() => {
                                  setSelectedProduct(product);
                                  setIsCartOpen(false);
                                }}
                                className="font-serif text-lg md:text-xl text-[#1A1A17] leading-snug hover:text-[#9B7E58] transition-colors cursor-pointer"
                              >
                                {product.name}
                              </h5>
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="text-[#1A1A17]/40 hover:text-red-600 transition-colors p-1"
                                title="Remove item"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <p className="text-[11px] uppercase tracking-[0.15em] text-[#9B7E58] font-semibold mt-1">
                              {product.origin}
                            </p>
                          </div>

                          <div className="flex justify-between items-end mt-4 pt-3 border-t border-[#1A1A17]/10">
                            {/* Quantity Controls */}
                            <div className="inline-flex items-center border border-[#1A1A17]/30 bg-[#FAF9F5]">
                              <button
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                className="p-2 hover:bg-[#1A1A17] hover:text-white transition-colors cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-3 text-xs font-mono font-bold">{quantity}</span>
                              <button
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="p-2 hover:bg-[#1A1A17] hover:text-white transition-colors cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <span className="font-serif text-xl font-medium text-[#1A1A17]">
                              ${(product.price * quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 100% Trade-In Equity Estimator */}
                  <div className="bg-[#9B7E58]/10 border-2 border-[#9B7E58] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <ShieldCheck size={24} className="text-[#9B7E58] shrink-0 mt-0.5" />
                        <div>
                          <h6 className="font-serif text-lg text-[#1A1A17] leading-tight font-medium">
                            Apply 100% Trade-In Credit
                          </h6>
                          <p className="text-xs text-[#1A1A17]/70 font-light mt-1">
                            Have an instrument purchased from Lane & Edwards? Deduct its full purchase value from today&apos;s step-up instrument.
                          </p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={hasTradeIn}
                        onChange={(e) => setHasTradeIn(e.target.checked)}
                        className="w-5 h-5 accent-[#9B7E58] cursor-pointer mt-1"
                      />
                    </div>

                    {hasTradeIn && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-[#9B7E58]/30 space-y-3"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-[#1A1A17]">Previous Instrument Value:</span>
                          <span className="font-mono font-bold text-base text-[#9B7E58]">
                            ${tradeInValue.toLocaleString()}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="300"
                          max="4000"
                          step="100"
                          value={tradeInValue}
                          onChange={(e) => setTradeInValue(Number(e.target.value))}
                          className="w-full accent-[#9B7E58] cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-[#1A1A17]/50 uppercase tracking-widest font-mono">
                          <span>$300 (Spark)</span>
                          <span>$2,000 (Journey)</span>
                          <span>$4,000+ (Master)</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Reassurance Badges */}
                  <div className="grid grid-cols-2 gap-3 text-[11px] text-[#1A1A17]/70 py-2">
                    <div className="flex items-center gap-2">
                      <Truck size={14} className="text-[#9B7E58]" />
                      <span>Insured White Glove Courier</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#9B7E58]" />
                      <span>Master Luthier Bench Setup</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="p-6 md:p-8 border-t-2 border-[#1A1A17] bg-white space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#1A1A17]/70">
                    <span>Acquisitions Subtotal</span>
                    <span className="font-mono text-[#1A1A17]">${subtotal.toLocaleString()}</span>
                  </div>

                  {hasTradeIn && (
                    <div className="flex justify-between text-[#9B7E58] font-medium">
                      <span>100% Trade-In Equity Credit</span>
                      <span className="font-mono">-${tradeInValue.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#1A1A17]/70">
                    <span>Insured Courier Delivery</span>
                    <span className="font-mono text-emerald-800 font-bold uppercase text-xs">Complimentary</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-[#1A1A17]/10">
                    <span className="font-serif text-2xl text-[#1A1A17]">Final Investment</span>
                    <span className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A17]">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutState('checkout');
                    }}
                    className="w-full py-5 bg-[#1A1A17] text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#9B7E58] transition-colors shadow-xl flex items-center justify-center gap-3 group cursor-pointer"
                  >
                    <span>Proceed to Acquisition</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  {hasTrialEligible && (
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCheckoutState('trial');
                      }}
                      className="w-full py-4 border-2 border-[#1A1A17] text-[#1A1A17] uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#1A1A17]/5 transition-colors cursor-pointer"
                    >
                      Request 7-Day In-Home Trial
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
