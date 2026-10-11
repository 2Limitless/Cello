"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Calendar, Clock, Phone, User, Check, Sparkles, MapPin, Copy, ExternalLink, Gift, Mail } from 'lucide-react';
import { useCart, VIPBooking } from '@/context/CartContext';

export function VIPBookingModal() {
  const {
    bookingProduct,
    setBookingProduct,
    isBookingModalOpen,
    setIsBookingModalOpen,
    addVIPBooking,
    partnerPhone
  } = useCart();

  const [step, setStep] = useState<'form' | 'pass'>('form');
  const [createdBooking, setCreatedBooking] = useState<VIPBooking | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('This Thursday, Oct 15');
  const [preferredTime, setPreferredTime] = useState('2:00 PM');
  const [musicianLevel, setMusicianLevel] = useState('Conservatory / Advanced');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isBookingModalOpen || !bookingProduct) return null;

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setBookingProduct(null);
    setStep('form');
    setCreatedBooking(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newBooking = addVIPBooking({
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      musicianLevel,
      preferredDate,
      preferredTime,
      notes,
      productId: bookingProduct.id,
      productName: bookingProduct.name,
      productPrice: bookingProduct.price,
    });

    setCreatedBooking(newBooking);
    setStep('pass');
  };

  // Pre-filled SMS Message for Matt Lane
  const workshopPhone = "5026905908"; // (502) 690-5908
  const smsMessage = createdBooking
    ? `Hello Matt! I reserved an in-shop playing session for the ${createdBooking.productName} ($${createdBooking.productPrice.toLocaleString()}). My VIP Pass ID is ${createdBooking.id}. Musician: ${createdBooking.customerName}, Phone: ${createdBooking.customerPhone}, Requested: ${createdBooking.preferredDate} at ${createdBooking.preferredTime}. Looking forward to testing it at 315 Wallace Ave!`
    : '';

  // Cross-platform SMS URI (?&body works on both iOS and Android)
  const smsHref = `sms:${workshopPhone}?&body=${encodeURIComponent(smsMessage)}`;
  const cleanPartner = partnerPhone ? partnerPhone.replace(/\D/g, '') : '';
  const partnerSmsHref = cleanPartner ? `sms:${cleanPartner}?&body=${encodeURIComponent(smsMessage)}` : '';

  const handleCopySMS = () => {
    if (smsMessage) {
      navigator.clipboard.writeText(smsMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[280] flex items-center justify-center p-2 sm:p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#1A1A17]/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative z-10 w-full max-w-4xl max-h-[94vh] bg-[#FAF9F5] border-4 border-[#1A1A17] shadow-2xl flex flex-col overflow-hidden md:rounded-[32px]"
        >
          {/* Top Bar Header */}
          <div className="bg-[#1A1A17] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#9B7E58] shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9B7E58] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9B7E58] font-bold">
                Louisville Workshop // Private Playing Session
              </span>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#9B7E58] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-10 overflow-y-auto no-scrollbar flex-1">
            {step === 'form' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Instrument Card & Value Proposition */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white border-2 border-[#1A1A17] shadow-[6px_6px_0px_#1A1A17] overflow-hidden">
                    <div className="relative aspect-[4/3] w-full bg-[#1A1A17]">
                      <Image
                        src={bookingProduct.image}
                        alt={bookingProduct.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#1A1A17] text-[#9B7E58] text-[10px] tracking-widest uppercase font-bold px-2.5 py-1 border border-[#9B7E58]">
                        Held for You
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#9B7E58] font-bold block">
                        Master Instrument
                      </span>
                      <h4 className="font-serif text-2xl text-[#1A1A17] leading-snug">
                        {bookingProduct.name}
                      </h4>
                      <p className="font-serif italic text-xs text-[#1A1A17]/70">
                        {bookingProduct.subtitle}
                      </p>
                      <div className="pt-3 border-t border-[#1A1A17]/10 flex justify-between items-baseline">
                        <span className="text-xs uppercase tracking-wider text-[#1A1A17]/60 font-bold">Appraised Value</span>
                        <span className="font-serif text-2xl font-bold text-[#1A1A17]">
                          ${bookingProduct.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Free Trial Reassurance Box */}
                  <div className="bg-[#FAF9F5] border-2 border-[#9B7E58] p-5 space-y-3">
                    <div className="flex items-center gap-2 text-[#9B7E58] font-bold text-xs uppercase tracking-widest">
                      <Sparkles size={16} />
                      <span>$0 Deposit // Zero Obligation</span>
                    </div>
                    <p className="text-xs text-[#1A1A17]/80 leading-relaxed font-light">
                      Fine instruments must be felt under the ear and balanced in the hand. We prepare the instrument with optimal bridge cut and string tension prior to your arrival at our Louisville atelier.
                    </p>
                    <div className="flex items-start gap-2 pt-2 text-[11px] text-[#1A1A17]/70">
                      <MapPin size={14} className="text-[#9B7E58] shrink-0 mt-0.5" />
                      <span>315 Wallace Ave, Louisville, KY 40207 (Historic St. Matthews)</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Reservation Booking Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A17]">
                      Reserve In-Shop Trial
                    </h3>
                    <p className="text-sm text-[#1A1A17]/70 font-light mt-1">
                      Choose your preferred day and time. You will receive a direct VIP Playing Pass to test this instrument in person.
                    </p>
                  </div>

                  {/* Day Selection */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-[#1A1A17] flex items-center gap-2">
                      <Calendar size={14} className="text-[#9B7E58]" /> Preferred Date
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'This Wednesday',
                        'This Thursday',
                        'This Friday',
                        'This Saturday',
                        'Next Tuesday',
                        'Next Thursday',
                      ].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setPreferredDate(d)}
                          className={`py-2.5 px-3 text-xs font-bold border-2 transition-all cursor-pointer text-center ${
                            preferredDate === d
                              ? 'bg-[#1A1A17] text-white border-[#1A1A17] shadow-[3px_3px_0px_#9B7E58]'
                              : 'bg-white text-[#1A1A17] border-[#1A1A17]/20 hover:border-[#1A1A17]'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Window */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-[#1A1A17] flex items-center gap-2">
                      <Clock size={14} className="text-[#9B7E58]" /> Preferred Time Window
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {['10:30 AM', '1:00 PM', '2:30 PM', '4:30 PM'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setPreferredTime(t)}
                          className={`py-2 px-2 text-xs font-bold border-2 transition-all cursor-pointer text-center ${
                            preferredTime === t
                              ? 'bg-[#1A1A17] text-white border-[#1A1A17] shadow-[3px_3px_0px_#9B7E58]'
                              : 'bg-white text-[#1A1A17] border-[#1A1A17]/20 hover:border-[#1A1A17]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Musician Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider font-bold text-[#1A1A17] flex items-center gap-1.5">
                        <User size={13} className="text-[#9B7E58]" /> Musician / Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Julian Chen"
                        className="w-full p-3 bg-white border-2 border-[#1A1A17] text-sm outline-none focus:border-[#9B7E58] shadow-[3px_3px_0px_#1A1A17]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-wider font-bold text-[#1A1A17] flex items-center gap-1.5">
                        <Phone size={13} className="text-[#9B7E58]" /> Mobile Phone (for SMS) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(502) 555-0192"
                        className="w-full p-3 bg-white border-2 border-[#1A1A17] text-sm outline-none focus:border-[#9B7E58] shadow-[3px_3px_0px_#1A1A17]"
                      />
                    </div>
                  </div>

                  {/* Optional Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-bold text-[#1A1A17] flex items-center gap-1.5">
                      <Mail size={13} className="text-[#9B7E58]" /> Email (Optional, for pass copy)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="musician@domain.com"
                      className="w-full p-3 bg-white border-2 border-[#1A1A17] text-sm outline-none focus:border-[#9B7E58] shadow-[3px_3px_0px_#1A1A17]"
                    />
                  </div>

                  {/* Musician Level & Repertoire */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-bold text-[#1A1A17]">
                      Musician Experience Level
                    </label>
                    <select
                      value={musicianLevel}
                      onChange={(e) => setMusicianLevel(e.target.value)}
                      className="w-full p-3 bg-white border-2 border-[#1A1A17] text-sm outline-none font-sans font-medium shadow-[3px_3px_0px_#1A1A17] cursor-pointer"
                    >
                      <option value="Student / Advancing Youth">Student / Advancing Youth (Audition / School)</option>
                      <option value="Conservatory / Advanced">Conservatory / Collegiate Major</option>
                      <option value="Professional Orchestral / Soloist">Professional Orchestral / Soloist</option>
                      <option value="Dedicated Adult Amateur">Dedicated Adult Amateur / Collector</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider font-bold text-[#1A1A17]">
                      Acoustic Preferences or Questions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Comparing against my German violin, looking for dark tone & fast response."
                      className="w-full p-3 bg-white border-2 border-[#1A1A17] text-sm outline-none focus:border-[#9B7E58] shadow-[3px_3px_0px_#1A1A17]"
                    />
                  </div>

                  {/* VIP Incentive Callout */}
                  <div className="p-3.5 bg-amber-50 border border-amber-300 rounded flex items-center gap-3">
                    <Gift size={20} className="text-[#9B7E58] shrink-0" />
                    <p className="text-xs text-[#1A1A17]/85 font-serif italic">
                      <strong className="font-sans font-bold not-italic text-[#1A1A17]">VIP Acquisition Benefit:</strong> Your pass includes complimentary concert strings or bespoke rosin upon acquisition in our shop.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-5 bg-[#1A1A17] text-white uppercase tracking-[0.25em] text-xs font-bold hover:bg-[#9B7E58] transition-colors shadow-[6px_6px_0px_#9B7E58] flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <Sparkles size={16} />
                    <span>Generate Free VIP Atelier Playing Pass</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Step 2: The Physical-Look VIP Pass and Direct SMS Trigger */
              <div className="max-w-2xl mx-auto space-y-8 py-4">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-400 text-emerald-800 text-xs font-bold uppercase tracking-widest rounded-full">
                    <Check size={14} /> Pass Confirmed & Held in Atelier
                  </div>
                  <h3 className="font-serif text-3xl md:text-5xl text-[#1A1A17]">
                    Your VIP Playing Pass
                  </h3>
                  <p className="text-sm text-[#1A1A17]/70 font-light max-w-md mx-auto">
                    Matthew Lane and our workshop have been notified. Tap below to send this pass directly to Matt&apos;s phone.
                  </p>
                </div>

                {/* Luxury Printable-Style Ticket Card */}
                {createdBooking && (
                  <div className="bg-[#1A1A17] text-white p-6 sm:p-8 rounded-2xl border-4 border-[#9B7E58] shadow-2xl relative overflow-hidden">
                    {/* Background watermark */}
                    <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none font-serif text-[180px] font-bold">
                      LE
                    </div>

                    {/* Top Ticket Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-white/20 gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#9B7E58] font-bold block">
                          Official Atelier Document
                        </span>
                        <h4 className="font-serif text-2xl tracking-wider text-white">
                          LANE & EDWARDS VIOLINS
                        </h4>
                      </div>
                      <div className="px-4 py-2 bg-[#9B7E58] text-[#1A1A17] font-mono font-bold text-sm tracking-wider rounded">
                        {createdBooking.id}
                      </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-white/20 text-sm">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/50 block">Musician</span>
                        <p className="font-serif text-xl text-white mt-0.5">{createdBooking.customerName}</p>
                        <p className="text-xs text-[#9B7E58] font-mono mt-0.5">{createdBooking.customerPhone}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/50 block">Instrument Held</span>
                        <p className="font-serif text-xl text-white mt-0.5">{createdBooking.productName}</p>
                        <p className="text-xs text-[#9B7E58] font-bold mt-0.5">${createdBooking.productPrice.toLocaleString()}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/50 block">Session Scheduled</span>
                        <p className="font-medium text-white mt-0.5">{createdBooking.preferredDate}</p>
                        <p className="text-xs text-white/70">{createdBooking.preferredTime}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-white/50 block">Workshop Location</span>
                        <p className="font-medium text-white mt-0.5">315 Wallace Ave</p>
                        <p className="text-xs text-white/70">Louisville, KY 40207</p>
                      </div>
                    </div>

                    {/* Incentive Seal Banner */}
                    <div className="mt-6 p-4 bg-white/5 border border-[#9B7E58]/40 rounded-lg flex items-start gap-3">
                      <Gift size={22} className="text-[#9B7E58] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#9B7E58]">
                          Exclusive In-Shop Privilege
                        </p>
                        <p className="text-xs text-white/90 font-serif italic mt-0.5 leading-relaxed">
                          &quot;Present this pass code <strong className="text-white font-mono">{createdBooking.id}</strong> to Matthew Lane during your visit for complimentary concert-grade strings or bespoke rosin upon acquisition.&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1-Tap SMS & Action Controls */}
                <div className="space-y-4">
                  {/* Big Primary 1-Tap Text Button */}
                  <a
                    href={smsHref}
                    className="w-full py-5 bg-[#9B7E58] text-[#1A1A17] uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#FAF9F5] hover:text-[#1A1A17] border-2 border-[#1A1A17] transition-all shadow-[6px_6px_0px_#1A1A17] flex items-center justify-center gap-3 cursor-pointer text-center"
                  >
                    <Phone size={18} />
                    <span>📱 1-Tap Text Pass to Matthew Lane (502) 690-5908</span>
                  </a>

                  {partnerPhone && partnerSmsHref && (
                    <a
                      href={partnerSmsHref}
                      className="w-full py-3.5 bg-white text-[#1A1A17] uppercase tracking-[0.18em] text-xs font-bold hover:bg-[#1A1A17] hover:text-white border-2 border-[#1A1A17] transition-all shadow-[4px_4px_0px_#1A1A17] flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <Phone size={15} className="text-emerald-700" />
                      <span>📱 Also Send Copy to Affiliate Partner ({partnerPhone})</span>
                    </a>
                  )}

                  {/* Secondary buttons: Copy SMS text & Call Shop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={handleCopySMS}
                      className="py-3 px-4 bg-white border-2 border-[#1A1A17] text-[#1A1A17] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF9F5] shadow-[3px_3px_0px_#1A1A17] flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-600" />
                          <span>Copied Pre-filled SMS!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy SMS Message Text</span>
                        </>
                      )}
                    </button>

                    <a
                      href="tel:5026905908"
                      className="py-3 px-4 bg-white border-2 border-[#1A1A17] text-[#1A1A17] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF9F5] shadow-[3px_3px_0px_#1A1A17] flex items-center justify-center gap-2 cursor-pointer transition-all text-center"
                    >
                      <ExternalLink size={14} />
                      <span>Call Atelier Directly</span>
                    </a>
                  </div>

                  {/* Reassurance note */}
                  <p className="text-center text-[11px] text-[#1A1A17]/60">
                    No app download or paid SMS service required. Opens directly in your phone&apos;s standard messaging app.
                  </p>
                </div>

                {/* Done Button */}
                <div className="text-center pt-2">
                  <button
                    onClick={handleClose}
                    className="text-xs uppercase tracking-widest font-bold text-[#1A1A17] hover:text-[#9B7E58] underline underline-offset-4 cursor-pointer"
                  >
                    Return to Atelier Catalog
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
