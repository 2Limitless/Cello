import React from 'react';
import Image from 'next/image';
import { Check, Star, ArrowRight, ShieldCheck, Clock, MapPin, Calendar, Wrench, Music, ShoppingBag, Sparkles, Phone } from 'lucide-react';

export interface ModalContentOptions {
  onNavigateToBoutique?: (category?: string, instrumentType?: string) => void;
  onOpenBooking?: () => void;
  onClose?: () => void;
}

export const getModalContent = (id: string, options?: ModalContentOptions) => {
  const navigate = (category = 'all', instrumentType = 'all') => {
    if (options?.onNavigateToBoutique) {
      options.onNavigateToBoutique(category, instrumentType);
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('filter-boutique', { detail: { category, instrumentType } }));
      options?.onClose?.();
      setTimeout(() => {
        const el = document.getElementById('boutique');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 250);
    }
  };

  const openBooking = () => {
    if (options?.onOpenBooking) {
      options.onOpenBooking();
    }
  };

  switch (id) {
    case 'purchase':
      return (
        <div className="mt-6 space-y-10 animate-fade-in text-[#1c2024]">
          {/* Family Overview Header */}
          <div className="border-t-2 border-[#003152]/20 pt-8">
            <div className="flex items-center gap-3 text-[#c2a15a] mb-3">
              <span className="text-xs tracking-[0.25em] font-serif font-bold uppercase text-[#003152]">Fine String Instruments</span>
              <div className="h-[1px] w-12 bg-[#c2a15a]" />
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#003152] mb-3 font-medium">
              Acoustic Trials &amp; Personalized Selection
            </h4>
            <p className="font-book text-base text-[#3e444b] max-w-2xl leading-relaxed">
              Every violin, viola, cello, and bass in our care is individually evaluated, adjusted for tonal balance, and prepared by Matthew Lane. Because our fine instrument inventory is constantly rotating with vintage, antique, and workshop arrivals, we invite you to experience them in person.
            </p>
          </div>

          {/* 4 Instrument Family Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: "Violins",
                badge: "Soloist & Advancing",
                desc: "Hand-graduated top plates, French bridges, and Italian-style spirit varnishes tuned for brilliant resonance.",
                image: "/atelier/violin_moretti_front.jpg"
              },
              {
                title: "Violas",
                badge: "Deep Warmth",
                desc: "Broad lower bouts and responsive C-string depth, balanced for chamber and orchestral performance.",
                image: "/atelier/viola_ming.jpg"
              },
              {
                title: "Cellos",
                badge: "Full Sonority",
                desc: "Montagnana and Stradivari geometries hand-voiced for rich low-register authority and singing upper registers.",
                image: "/atelier/cello_montagnana_cs4900.png"
              },
              {
                title: "Double Basses & Bows",
                badge: "Tone & Balance",
                desc: "Hybrid and carved basses set up for orchestral stability, paired with select pernambuco and carbon bows.",
                image: "/atelier/shop_bows_display.jpg"
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className="group p-5 sm:p-6 bg-white border border-[#c2a15a]/35 rounded-[18px] text-left shadow-[0_4px_16px_rgba(0,49,82,0.04)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-serif font-bold text-[#c2a15a]">
                      {card.badge}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#003152]/10 flex items-center justify-center text-[#003152]">
                      <Sparkles size={13} className="text-[#c2a15a]" />
                    </span>
                  </div>
                  <h5 className="font-serif text-2xl md:text-3xl text-[#003152] mb-2 font-medium">
                    {card.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-[#3e444b] font-book leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#c2a15a]/20 flex items-center justify-between text-xs font-serif font-bold text-[#003152] uppercase tracking-wider">
                  <span>Inquire for Current Stock</span>
                  <span className="text-[#c2a15a] font-serif">In-Shop Trial →</span>
                </div>
              </div>
            ))}
          </div>

          {/* Core Commitments */}
          <div className="border-t-2 border-[#003152]/20 pt-8">
            <h4 className="font-serif text-2xl sm:text-3xl text-[#003152] mb-6 font-medium">
              Why Musicians Choose Lane &amp; Edwards
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 bg-[#003152] text-white rounded-[16px] space-y-2.5 shadow-md">
                <div className="w-10 h-10 rounded-full bg-[#c2a15a]/20 flex items-center justify-center text-[#dfc88a] mb-3">
                  <Wrench size={18} />
                </div>
                <h6 className="font-serif text-xl text-white font-medium">Luthier Bench Setup</h6>
                <p className="text-xs sm:text-sm text-white/80 font-book leading-relaxed">
                  Every bridge is custom-carved, fingerboard planed, and soundpost dialed to optimal acoustic nodal points by Matthew Lane.
                </p>
              </div>

              <div className="p-6 bg-[#c2a15a] text-[#001f35] rounded-[16px] space-y-2.5 shadow-md">
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-[#001f35] mb-3">
                  <Calendar size={18} />
                </div>
                <h6 className="font-serif text-xl text-[#001f35] font-medium">Unhurried In-Shop Trials</h6>
                <p className="text-xs sm:text-sm text-[#001f35]/90 font-book leading-relaxed">
                  Test instruments in the natural acoustics of our historic home, with friendly, charitable guidance and zero pressure.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#c2a15a]/40 text-[#1c2024] rounded-[16px] space-y-2.5 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#003152]/10 flex items-center justify-center text-[#003152] mb-3">
                  <ShieldCheck size={18} className="text-[#c2a15a]" />
                </div>
                <h6 className="font-serif text-xl text-[#003152] font-medium">100% Lifetime Equity</h6>
                <p className="text-xs sm:text-sm text-[#3e444b] font-book leading-relaxed">
                  Every dollar invested in your instrument follows you toward your next upgrade, supporting your musical advancement for life.
                </p>
              </div>
            </div>
          </div>

          {/* Action Center Banner */}
          <div className="p-6 sm:p-8 bg-[#FAF7F0] border border-[#c2a15a]/50 rounded-[18px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] font-serif font-bold text-[#c2a15a] block">
                Historic Jeffersontown Showroom
              </span>
              <h5 className="font-serif text-2xl text-[#003152] font-medium">
                Ready to play-test an instrument?
              </h5>
              <p className="text-xs text-[#3e444b] font-book">
                Reserve an acoustic trial session with Matthew Lane at 3606 College Dr.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={openBooking}
                className="px-6 py-3 bg-[#003152] text-[#FAF7F0] text-xs uppercase tracking-wider font-serif font-bold hover:bg-[#00223a] transition-colors shadow-sm cursor-pointer flex items-center gap-2 rounded-full"
              >
                <Calendar size={14} className="text-[#c2a15a]" />
                Book Trial Session
              </button>
              <a
                href="tel:5026905908"
                className="px-6 py-3 border border-[#003152] text-[#003152] text-xs uppercase tracking-wider font-serif font-bold hover:bg-[#003152] hover:text-[#FAF7F0] transition-colors cursor-pointer rounded-full"
              >
                Call (502) 690-5908
              </a>
            </div>
          </div>
        </div>
      );

    case 'rental':
      return (
        <div className="mt-8 space-y-16 animate-fade-in text-[#1c2024]">
          {/* Equity Section */}
          <div className="border-t-2 border-[#003152]/20 pt-10">
            <div className="text-xs tracking-[0.2em] uppercase font-serif text-[#003152] font-bold mb-6">
              Rent-to-Own Equity Program
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="bg-[#003152] text-white p-8 md:p-12 lg:w-1/2 relative overflow-hidden rounded-[20px] shadow-lg">
                <div className="relative z-10">
                  <div className="text-5xl md:text-6xl font-serif text-[#dfc88a] mb-4 font-bold">100%</div>
                  <p className="text-xl md:text-2xl font-serif italic mb-4">First Year Equity</p>
                  <p className="text-white/85 text-sm md:text-base leading-relaxed font-book">
                    Every dollar of your first-year rental investment applies directly toward owning your instrument or stepping up to an advanced model.
                  </p>
                </div>
              </div>
              
              <div className="bg-[#c2a15a] text-[#001f35] p-8 md:p-12 lg:w-1/2 relative overflow-hidden rounded-[20px] shadow-lg">
                <div className="relative z-10">
                  <div className="text-5xl md:text-6xl font-serif text-[#001f35] mb-4 font-bold">50%</div>
                  <p className="text-xl md:text-2xl font-serif italic text-[#001f35] mb-4">Subsequent Equity</p>
                  <p className="text-[#001f35]/90 text-sm md:text-base leading-relaxed font-book">
                    Continues to build your investment over time, ensuring your child always plays on a properly sized, high-caliber instrument.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rates Table */}
          <div className="border-t-2 border-[#003152]/20 pt-10">
            <div className="text-xs tracking-[0.2em] uppercase font-serif text-[#003152] font-bold mb-6">
              Rental Instrument Options
            </div>
            <div className="divide-y divide-[#c2a15a]/25 border-y border-[#c2a15a]/25">
              {[
                { title: "Student Violin / Viola", size: "All Fractional Sizes (1/16 to 3/4)", desc: "Carved spruce and maple, Ebony fittings, hand-adjusted bridge and four fine tuners." },
                { title: "Full Size Violin / Viola", size: "4/4 Violin & 14\"+ Viola", desc: "Solid tonewoods, shop-graduated tone, premium strings, protective case & bow." },
                { title: "Student Cello", size: "Fractional Sizes (1/8 to 3/4)", desc: "Shop-cut Belgian or French bridge, Wittner tailpiece, and padded travel bag." },
                { title: "Full Size Cello & Bass", size: "Professional Student Setup", desc: "Individually soundpost-calibrated for smooth playability and effortless bowing." },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 group hover:pl-4 transition-all duration-300">
                  <div>
                    <div className="font-serif text-2xl md:text-3xl text-[#003152] group-hover:text-[#c2a15a] transition-colors font-medium">{item.title}</div>
                    <div className="text-xs uppercase tracking-wider text-[#c2a15a] font-serif font-bold mt-1">{item.size}</div>
                    <p className="text-xs text-[#3e444b] font-book mt-1">{item.desc}</p>
                  </div>
                  <div className="text-sm font-serif font-bold text-[#003152] mt-4 sm:mt-0 bg-[#FAF7F0] px-4 py-2 rounded-full border border-[#c2a15a]/40">
                    Inquire for Current Rates
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Action */}
          <div className="p-6 sm:p-8 bg-white border border-[#c2a15a]/50 rounded-[18px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-serif font-bold text-[#c2a15a] block">
                Complimentary Sizing
              </span>
              <h5 className="font-serif text-2xl text-[#003152] font-medium">
                Begin Your Musical Journey
              </h5>
              <p className="text-xs text-[#3e444b] font-book mt-1">
                Visit 3606 College Dr in Jeffersontown for personal sizing and setup with Matthew Lane.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:5026905908"
                className="px-6 py-3 bg-[#003152] text-white text-xs uppercase tracking-wider font-serif font-bold hover:bg-[#00223a] transition-colors shadow-sm flex items-center gap-2 cursor-pointer rounded-full"
              >
                <Phone size={14} className="text-[#c2a15a]" />
                Call (502) 690-5908
              </a>
            </div>
          </div>
        </div>
      );

    case 'repair':
      return (
        <div className="mt-8 space-y-14 animate-fade-in text-[#1c2024]">
          {/* Editorial Intro */}
          <div className="border-t-2 border-[#003152]/20 pt-10">
            <div className="text-xs tracking-[0.2em] uppercase font-serif text-[#003152] font-bold mb-3">
              Luthier Care &amp; Restoration
            </div>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#003152] font-medium">
              We listen, carving and adjusting <span className="italic text-[#c2a15a]">fractions of a millimeter</span> until your instrument&apos;s natural acoustic warmth is awakened.
            </p>
          </div>

          {/* Authentic Repair Bench Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-72 rounded-[18px] overflow-hidden border border-[#c2a15a]/30 shadow-md group">
              <Image src="/atelier/matt_luthier_bench.jpg" alt="Matthew Lane at the Luthier Bench" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-serif uppercase tracking-widest font-bold">
                Matthew Lane · Hand-Carving Bridges &amp; Plates
              </div>
            </div>
            <div className="relative h-64 md:h-72 rounded-[18px] overflow-hidden border border-[#c2a15a]/30 shadow-md group">
              <Image src="/atelier/instrument_repair_clamps.jpg" alt="Instrument Restoration in Clamps" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs font-serif uppercase tracking-widest font-bold">
                Seam &amp; Crack Restoration with Hot Hide Glue
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Tonal Optimization", desc: "Acoustic balancing and soundpost positioning for maximum resonance and projection." },
              { title: "Bespoke Bridges", desc: "Hand-carved French & Belgian maple bridges fitted flush to plate arching." },
              { title: "Soundpost Tuning", desc: "Precision cutting and placement to 0.1mm for immediate bow response and singing clarity." },
              { title: "Restoration & Repairs", desc: "Seam gluing, crack repair, peg rebushing, touch-up varnishing & setup." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white border border-[#c2a15a]/30 p-6 md:p-8 rounded-[18px] shadow-xs group">
                <div className="text-[#003152] font-serif text-xl md:text-2xl mb-2 flex items-center justify-between font-medium">
                  {service.title}
                  <Check size={18} className="text-[#c2a15a]" />
                </div>
                <div className="text-[#3e444b] text-sm leading-relaxed font-book">{service.desc}</div>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="bg-[#003152] text-white p-8 md:p-10 rounded-[20px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div>
              <div className="text-xs tracking-[0.2em] uppercase font-serif text-[#dfc88a] font-bold mb-2">In-Shop Consultations</div>
              <div className="text-white font-serif text-3xl mb-2 font-medium">Hands-On Assessment</div>
              <div className="text-white/85 text-sm md:text-base font-book max-w-xl leading-relaxed">
                Bring your instrument to our historic Jeffersontown shop for an unhurried, expert evaluation with Matthew Lane.
              </div>
            </div>
            <a
              href="tel:5026905908"
              className="px-6 py-3 bg-[#c2a15a] hover:bg-[#b3924a] text-[#001f35] font-serif uppercase tracking-wider text-xs font-bold rounded-full transition-colors shrink-0 shadow-md"
            >
              Contact the Bench
            </a>
          </div>
        </div>
      );

    case 'rehair':
      return (
        <div className="mt-8 space-y-14 animate-fade-in text-[#1c2024]">
          {/* Editorial Intro */}
          <div className="border-t-2 border-[#003152]/20 pt-10">
            <div className="text-xs tracking-[0.2em] uppercase font-serif text-[#003152] font-bold mb-3">
              Bow Service &amp; Rehairs
            </div>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#003152] font-medium">
              The bow is the voice of your arm. A fresh, properly balanced rehair transforms your technical execution and string contact.
            </p>
          </div>

          {/* Authentic Bow Wall Image */}
          <div className="relative w-full h-64 md:h-72 rounded-[18px] overflow-hidden border border-[#c2a15a]/30 shadow-md group">
            <Image src="/atelier/shop_bows_display.jpg" alt="Bow Collection in Workshop" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#dfc88a] font-bold block mb-1">In-Shop Bow Services</span>
              <p className="font-serif text-xl md:text-2xl font-medium">Fine Violin, Viola, Cello, and Bass Bows Rehaired &amp; Serviced in Jeffersontown</p>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Star, title: "Select Stallion Hair", desc: "Pure unbleached Mongolian stallion hair selected for optimal rosin grip and even ribbon spread." },
              { icon: Clock, title: "Dependable Turnaround", desc: "Swift, reliable service so you are never separated from your primary bow for long." },
              { icon: Wrench, title: "Bow Maintenance", desc: "Tip plate repair, silver wire and silk winding, fine leather grips, and camber checking." }
            ].map((col, idx) => (
              <div key={idx} className="bg-white border border-[#c2a15a]/30 p-6 md:p-8 rounded-[18px] flex flex-col items-start shadow-xs">
                <div className="w-12 h-12 bg-[#003152] rounded-full flex items-center justify-center mb-5 text-[#dfc88a]">
                  <col.icon size={20} />
                </div>
                <div className="text-[#003152] font-serif text-xl mb-2 font-medium">{col.title}</div>
                <div className="text-[#3e444b] text-xs sm:text-sm font-book leading-relaxed">{col.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'instruction':
      return (
        <div className="mt-8 space-y-14 animate-fade-in text-[#1c2024]">
          <div className="border-t-2 border-[#003152]/20 pt-10">
            <div className="text-xs tracking-[0.2em] uppercase font-serif text-[#003152] font-bold mb-3">
              Private Pedagogy &amp; Mentorship
            </div>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#003152] font-medium">
              Connecting advancing students with Louisville&apos;s leading educators and symphonic artists.
            </p>
          </div>

          {/* Studio Photo */}
          <div className="relative w-full h-64 md:h-72 rounded-[18px] overflow-hidden border border-[#c2a15a]/30 shadow-md group">
            <Image src="/atelier/instruction_pedagogy.jpg" alt="Strings Pedagogy & Masterclass" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#dfc88a] font-bold block mb-1">Community Mentorship</span>
              <p className="font-serif text-xl md:text-2xl font-medium">Supporting Louisville&apos;s String Studios &amp; Advancing Musicians</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-[#c2a15a]/30 p-6 md:p-8 rounded-[18px] flex flex-col md:flex-row gap-6 items-start shadow-xs">
              <div className="w-16 h-16 bg-[#003152] text-[#dfc88a] flex items-center justify-center font-serif text-2xl font-bold rounded-full shrink-0">
                KR
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                  <h5 className="font-serif text-2xl text-[#003152] font-medium">Kathie Raymond</h5>
                  <span className="text-[#c2a15a] text-sm italic font-serif">San Diego State University</span>
                </div>
                <p className="text-[#3e444b] text-sm font-book leading-relaxed mb-4">
                  A nurturing, accomplished violin instructor with a proven record of preparing students for All-State Orchestras and the Louisville Youth Orchestra.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-wider font-bold text-[#003152]">
                  <span>Studio Contact:</span> <span className="text-[#c2a15a]">(502) 263-3490</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#c2a15a]/30 p-6 md:p-8 rounded-[18px] flex flex-col md:flex-row gap-6 items-start shadow-xs">
              <div className="w-16 h-16 bg-[#c2a15a] text-[#001f35] flex items-center justify-center font-serif text-2xl font-bold rounded-full shrink-0">
                LS
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                  <h5 className="font-serif text-2xl text-[#003152] font-medium">Linda Starks</h5>
                  <span className="text-[#c2a15a] text-sm italic font-serif">Louisville Symphony Orchestra</span>
                </div>
                <p className="text-[#3e444b] text-sm font-book leading-relaxed mb-4">
                  Educated at UofL and IU Bloomington. Renowned Suzuki instructor blending rigorous technical foundation with deep musical expression.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-wider font-bold text-[#003152]">
                  <span>Inquire in-shop for current studio availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'legacy':
      return (
        <div className="mt-8 space-y-12 animate-fade-in text-[#1c2024]">
          {/* Authentic Historic Home Photo */}
          <div className="relative w-full h-[300px] md:h-[400px] rounded-[20px] overflow-hidden border border-[#c2a15a]/30 shadow-xl group">
            <Image
              src="/atelier/historic_jeffersontown_storefront.jpg"
              alt="Lane & Edwards Violins - 3606 College Dr, Jeffersontown, KY"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003152] via-[#003152]/30 to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-serif text-[#dfc88a] font-bold block mb-1">
                National Register of Historic Places · Jeffersontown, KY
              </span>
              <p className="font-serif text-xl md:text-2xl font-medium">
                Lane &amp; Edwards Violins — 3606 College Drive
              </p>
            </div>
          </div>

          {/* Narrative */}
          <div className="border-t-2 border-[#003152]/20 pt-10">
            <h4 className="font-serif text-2xl sm:text-4xl text-[#003152] mb-6 leading-tight font-medium">
              Old-World Charm, Timeless Craft, <br/>
              <span className="italic text-[#c2a15a]">and Warm Personal Service.</span>
            </h4>
            
            <div className="text-[#3e444b] space-y-5 font-book leading-relaxed text-base sm:text-lg">
              <p>
                The foundations of our craft began decades ago under Mark Edwards (1952–2026), who operated a home-based violin repair and sales business built on honest relationships with area musicians. In 1988, a young Matthew Lane was fitted for his first student rental violin in that shop. Over the following twenty years, Matt apprenticed and worked shoulder-to-shoulder with Mark, mastering the acoustic disciplines of European violin making.
              </p>
              <p>
                In 2016, the business was officially founded under its current name, <strong className="text-[#003152]">Lane &amp; Edwards Violins</strong>. Today, Owner &amp; Luthier Matthew Lane welcomes musicians into our new home at 3606 College Drive in Jeffersontown—a historic residence listed on the National Register of Historic Places.
              </p>
              <p>
                Here, the historic charm of our home mirrors the vintage character of the violins, violas, cellos, and basses we curate and service. Our goal is always to provide friendly, candid, and charitable guidance so that every student, parent, and professional feels right at home.
              </p>
            </div>
          </div>

          {/* Matt Lane Card */}
          <div className="p-8 bg-[#003152] text-white rounded-[20px] shadow-lg border border-[#c2a15a]/40">
            <h5 className="font-serif text-2xl sm:text-3xl text-white mb-1 font-medium">Matthew Lane</h5>
            <p className="text-xs tracking-[0.2em] uppercase font-serif text-[#dfc88a] font-bold mb-4">Owner &amp; Luthier · Lane &amp; Edwards Violins</p>
            <p className="text-white/85 leading-relaxed text-sm sm:text-base font-book">
              Respected luthier, youth symphony mentor, and Kentucky string specialist. Matt personally inspects, sets up, and acoustically tests every instrument in the shop, ensuring musicians receive honest counsel and dedicated craftsmanship.
            </p>
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className="mt-8 space-y-12 animate-fade-in text-[#1c2024]">
          {/* Historic Building Photo */}
          <div className="relative w-full h-72 md:h-96 rounded-[20px] overflow-hidden border border-[#c2a15a]/30 shadow-xl group">
            <Image src="/atelier/historic_jeffersontown_storefront.jpg" alt="Lane & Edwards Violins Historic Home" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#dfc88a] font-bold block mb-1">National Register of Historic Places</span>
              <p className="font-serif text-2xl md:text-3xl font-medium">3606 College Dr · Jeffersontown, KY 40299</p>
            </div>
          </div>

          <div className="border-t-2 border-[#003152]/20 pt-8">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#003152] font-medium">
              The scent of seasoned spruce, maple shavings, and rosin await you. <span className="italic text-[#c2a15a]">Welcome to our shop.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#003152] text-white p-8 md:p-10 rounded-[18px] flex flex-col justify-between min-h-[300px] shadow-lg relative overflow-hidden">
              <MapPin size={120} className="absolute -bottom-8 -right-8 text-white/5" />
              <div>
                <div className="text-xs tracking-[0.2em] uppercase font-serif text-[#dfc88a] font-bold mb-3">Our Location</div>
                <div className="font-serif text-2xl md:text-3xl mb-3 font-medium">Lane &amp; Edwards Violins</div>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed font-book">
                  3606 College Dr<br/>
                  Jeffersontown, KY 40299<br/>
                  <span className="text-white/60 text-xs italic">Listed on the National Register of Historic Places</span>
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[#dfc88a] text-xs font-serif font-bold uppercase tracking-wider">
                Historic Jeffersontown Home
              </div>
            </div>

            <div className="bg-[#c2a15a] text-[#001f35] p-8 md:p-10 rounded-[18px] flex flex-col justify-between min-h-[300px] shadow-lg relative overflow-hidden">
              <Calendar size={120} className="absolute -bottom-8 -right-8 text-[#001f35]/10" />
              <div>
                <div className="text-xs tracking-[0.2em] uppercase font-serif text-[#001f35]/80 font-bold mb-3">Auditions &amp; Consultations</div>
                <div className="font-serif text-2xl md:text-3xl mb-3 text-[#001f35] font-medium">Schedule a Visit</div>
                <p className="text-[#001f35]/90 text-sm sm:text-base leading-relaxed font-book">
                  (502) 690-5908<br/>
                  Tuesday – Saturday: 10:00 AM – 5:30 PM<br/>
                  <span className="text-xs italic">Acoustic trials &amp; bench consultations by appointment</span>
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[#001f35] text-xs font-serif font-bold uppercase tracking-wider">
                Speak with Matthew Lane →
              </div>
            </div>
          </div>
        </div>
      );

    case 'accessories':
      return (
        <div className="mt-6 space-y-8 animate-fade-in text-[#1c2024]">
          <div className="border-t-2 border-[#003152]/20 pt-8">
            <div className="flex items-center gap-3 text-[#c2a15a] mb-2">
              <span className="text-xs tracking-[0.25em] font-serif font-bold uppercase text-[#003152]">Concert Supplies</span>
              <div className="h-[1px] w-12 bg-[#c2a15a]" />
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#003152] mb-3 font-medium">
              Concert Protection &amp; Fittings
            </h4>
            <p className="font-book text-sm sm:text-base text-[#3e444b] max-w-xl">
              Browse our workshop supplies, tested and fitted for Kentucky string musicians.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                title: "Concert Strings",
                badge: "Pirastro · Larsen · Dominant",
                desc: "Dominant Pro, Evah Pirazzi Gold, Larsen Magnacore, and Spirocore sets in stock.",
                category: "strings"
              },
              {
                title: "Suspension Cases",
                badge: "Climate Protection",
                desc: "Luxury velvet oblong cases, archtop suspension cases, and cello flight cases.",
                category: "cases"
              },
              {
                title: "Care & Fittings",
                badge: "Bespoke Tonewood",
                desc: "Mach One curly maple shoulder rests, Core digital hygrometers, and varnish polish.",
                category: "accessories"
              }
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => navigate(item.category, 'all')}
                className="group p-6 bg-white border border-[#c2a15a]/35 rounded-[18px] text-left hover:-translate-y-1 transition-all duration-300 shadow-xs flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <span className="text-[10px] uppercase font-serif tracking-[0.2em] font-bold text-[#c2a15a] block mb-2">
                    {item.badge}
                  </span>
                  <h5 className="font-serif text-2xl text-[#003152] group-hover:text-[#c2a15a] transition-colors mb-2 font-medium">
                    {item.title}
                  </h5>
                  <p className="text-xs text-[#3e444b] font-book leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#c2a15a]/20 flex items-center justify-between text-xs font-serif font-bold text-[#003152] uppercase tracking-wider">
                  <span>Browse Items</span>
                  <span className="text-[#c2a15a]">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      );

    case 'guarantee':
      return (
        <div className="mt-8 space-y-12 animate-fade-in text-[#1c2024]">
          {/* Authentic Signature Photo */}
          <div className="relative w-full h-64 md:h-72 rounded-[18px] overflow-hidden border border-[#c2a15a]/30 shadow-md group">
            <Image src="/atelier/antique_maker_signature.jpg" alt="Master Maker Signature Provenance" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase font-serif tracking-[0.25em] text-[#dfc88a] font-bold block mb-1">Authenticity &amp; Integrity</span>
              <p className="font-serif text-2xl md:text-3xl font-medium">The Craftsman&apos;s Guarantee: 100% Lifetime Equity Protection</p>
            </div>
          </div>

          <div className="border-t-2 border-[#003152]/20 pt-8">
            <div className="bg-[#003152] p-8 md:p-12 rounded-[20px] relative overflow-hidden shadow-xl text-white">
              <ShieldCheck size={400} className="absolute -top-24 -right-24 text-white/[0.04] pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="text-xs tracking-[0.2em] font-serif uppercase text-[#dfc88a] font-bold">
                  Protecting the Musician&apos;s Equity
                </div>
                
                <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-tight font-medium">
                  Any instrument acquired through Lane &amp; Edwards maintains its <span className="text-[#dfc88a] italic">100% full trade-in value</span> toward your next instrument.
                </p>
                
                <div className="flex gap-4 items-start pt-2">
                  <div className="w-[2px] h-16 bg-[#c2a15a] shrink-0 mt-1" />
                  <p className="text-white/85 text-sm sm:text-base leading-relaxed font-book">
                    We stake our livelihood on supporting your growth as an artist. Every dollar invested in your instrument follows your musical advancement, helping young students and advancing musicians transition smoothly to their next voice with total peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
