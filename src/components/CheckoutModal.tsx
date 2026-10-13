"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Lock, MapPin, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CheckoutModal() {
  const {
    checkoutState,
    setCheckoutState,
    items,
    total,
    hasTradeIn,
    tradeInValue,
    clearCart,
    lastOrderNumber,
    setLastOrderNumber,
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup'>('courier');
  const [musicianRole, setMusicianRole] = useState('Soloist / Conservatory');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (checkoutState === 'idle') return null;

  const isTrial = checkoutState === 'trial';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrder = `LE-${Math.floor(100000 + Math.random() * 900000)}`;
      setLastOrderNumber(generatedOrder);
      setIsSubmitting(false);
      setCheckoutState('confirmed');
      clearCart();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCheckoutState('idle')}
          className="fixed inset-0 bg-[#1A1A17]/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl bg-[#FAF9F5] border-4 border-[#1A1A17] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] md:rounded-[28px]"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b-2 border-[#1A1A17] flex justify-between items-center bg-[#FAF9F5]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E58] font-bold">
                {checkoutState === 'confirmed'
                  ? "Atelier Vault // Confirmation"
                  : isTrial
                  ? "Trial Agreement // In-Home Evaluation"
                  : "Private Acquisition // Secure Checkout"}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A17] mt-1">
                {checkoutState === 'confirmed'
                  ? "Order Confirmed"
                  : isTrial
                  ? "Request 7-Day In-Home Trial"
                  : "Complete Acquisition"}
              </h3>
            </div>
            <button
              onClick={() => setCheckoutState('idle')}
              className="w-11 h-11 rounded-full border border-[#1A1A17]/20 flex items-center justify-center hover:bg-[#1A1A17] hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto no-scrollbar flex-1">
            {checkoutState === 'confirmed' ? (
              <div className="text-center py-8 space-y-6">
                <div className="w-20 h-20 bg-[#1A1A17] text-[#9B7E58] rounded-full mx-auto flex items-center justify-center shadow-xl">
                  <CheckCircle2 size={40} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E58] font-mono">
                    Certificate Code: {lastOrderNumber}
                  </span>
                  <h4 className="font-serif text-3xl md:text-4xl text-[#1A1A17] mt-2">
                    {isTrial ? "Trial Reserved for Review" : "Thank You for Your Trust"}
                  </h4>
                  <p className="text-[#1A1A17]/80 text-base max-w-md mx-auto font-light mt-3">
                    {isTrial
                      ? "Our master luthiers will balance the soundpost, tension the strings, and pack your trial instrument in a climate-controlled case. You will receive tracking within 24 hours."
                      : "Your instrument acquisition is being prepared in our Louisville workshop with a customized setup certificate signed by Matthew Lane."}
                  </p>
                </div>

                <div className="p-6 bg-white border-2 border-[#1A1A17] text-left max-w-md mx-auto shadow-[4px_4px_0px_#1A1A17] space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[#1A1A17]/10 pb-2">
                    <span className="text-[#1A1A17]/60">Recipient:</span>
                    <span className="font-medium">{fullName || "Patron of the Arts"}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1A1A17]/10 pb-2">
                    <span className="text-[#1A1A17]/60">Dispatch:</span>
                    <span className="font-medium">
                      {deliveryMethod === 'courier' ? "Insured White Glove Courier" : "Workshop Pickup (315 Wallace Ave)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1A1A17]/60">Trade-In Guarantee:</span>
                    <span className="font-medium text-emerald-800">100% Lifetime Equity Active</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutState('idle')}
                  className="px-10 py-5 bg-[#1A1A17] text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#9B7E58] transition-colors cursor-pointer shadow-xl"
                >
                  Return to Atelier
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Order Highlights Pill */}
                <div className="p-4 bg-white border-2 border-[#1A1A17] flex justify-between items-center">
                  <div>
                    <span className="text-xs text-[#1A1A17]/60">Total Acquisition:</span>
                    <div className="font-serif text-2xl font-bold text-[#1A1A17]">
                      ${total.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="text-[#9B7E58] font-bold block">{items.length} Curated Item(s)</span>
                    {hasTradeIn && (
                      <span className="text-emerald-800 block">-${tradeInValue.toLocaleString()} Equity Applied</span>
                    )}
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <h5 className="font-serif text-xl text-[#1A1A17] border-b border-[#1A1A17]/10 pb-2">
                    1 // Patron Details
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold mb-1 text-[#1A1A17]/70">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Elena Rostova"
                        className="w-full p-3 bg-white border border-[#1A1A17]/30 focus:border-[#9B7E58] outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold mb-1 text-[#1A1A17]/70">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@conservatory.edu"
                        className="w-full p-3 bg-white border border-[#1A1A17]/30 focus:border-[#9B7E58] outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold mb-1 text-[#1A1A17]/70">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(502) 555-0199"
                        className="w-full p-3 bg-white border border-[#1A1A17]/30 focus:border-[#9B7E58] outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold mb-1 text-[#1A1A17]/70">
                        Musician Discipline
                      </label>
                      <select
                        value={musicianRole}
                        onChange={(e) => setMusicianRole(e.target.value)}
                        className="w-full p-3 bg-white border border-[#1A1A17]/30 focus:border-[#9B7E58] outline-none text-sm"
                      >
                        <option>Orchestral Professional</option>
                        <option>Soloist / Conservatory</option>
                        <option>Advancing Student</option>
                        <option>Educator / Teacher</option>
                        <option>Enthusiast Collector</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Delivery Preference */}
                <div className="space-y-4">
                  <h5 className="font-serif text-xl text-[#1A1A17] border-b border-[#1A1A17]/10 pb-2">
                    2 // Delivery & Transit
                  </h5>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      onClick={() => setDeliveryMethod('courier')}
                      className={`p-4 border-2 cursor-pointer transition-all ${
                        deliveryMethod === 'courier'
                          ? 'border-[#1A1A17] bg-white shadow-[4px_4px_0px_#1A1A17]'
                          : 'border-[#1A1A17]/20 bg-[#FAF9F5]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Truck size={18} className="text-[#9B7E58]" />
                        <span className="font-bold text-sm">Insured Courier Delivery</span>
                      </div>
                      <p className="text-xs text-[#1A1A17]/70">
                        Climate-sealed thermal container sent via FedEx Priority Express. Complimentary.
                      </p>
                    </div>

                    <div
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`p-4 border-2 cursor-pointer transition-all ${
                        deliveryMethod === 'pickup'
                          ? 'border-[#1A1A17] bg-white shadow-[4px_4px_0px_#1A1A17]'
                          : 'border-[#1A1A17]/20 bg-[#FAF9F5]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={18} className="text-[#9B7E58]" />
                        <span className="font-bold text-sm">In-Workshop Pickup</span>
                      </div>
                      <p className="text-xs text-[#1A1A17]/70">
                        315 Wallace Ave, Louisville KY. Play-test with a master luthier in attendance.
                      </p>
                    </div>
                  </div>

                  {deliveryMethod === 'courier' && (
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold mb-1 text-[#1A1A17]/70">
                        Street Address & Zip Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="742 Evergreen Terrace, Louisville, KY 40207"
                        className="w-full p-3 bg-white border border-[#1A1A17]/30 focus:border-[#9B7E58] outline-none text-sm"
                      />
                    </div>
                  )}
                </div>

                {/* Assurance */}
                <div className="flex items-center gap-3 p-4 bg-white border border-[#1A1A17]/10 text-xs text-[#1A1A17]/70">
                  <Lock size={16} className="text-[#9B7E58] shrink-0" />
                  <span>
                    Encrypted Atelier Transaction. Includes complete Luthier Setup Documentation and 100% Lifetime Trade-In Certificate.
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-[#1A1A17] text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#9B7E58] transition-colors shadow-2xl flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Engraving Atelier Record...</span>
                  ) : (
                    <>
                      <span>{isTrial ? "Confirm 7-Day In-Home Trial" : `Authorize Acquisition — $${total.toFixed(2)}`}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
