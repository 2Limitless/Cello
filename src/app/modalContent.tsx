import React from 'react';
import Image from 'next/image';
import { Check, Star, ArrowRight, ShieldCheck, Clock, MapPin, Calendar, Wrench } from 'lucide-react';

export const getModalContent = (id: string) => {
  switch (id) {
    case 'purchase':
      return (
        <div className="mt-8 space-y-20 animate-fade-in">
          {/* Editorial Intro */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-t-2 border-[#1A1A17] pt-12">
            <div className="md:w-1/4 text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold">
              01 // Philosophy
            </div>
            <div className="md:w-3/4">
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A17]">
                An instrument is not merely crafted; it is <span className="italic text-[#9B7E58]">awakened</span>. We believe the relationship between player and instrument is intensely intimate.
              </p>
            </div>
          </div>

          {/* Staggered Tiers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            
            {/* Tier 1 - Stark Dark */}
            <div className="lg:col-span-5 bg-[#1A1A17] text-white p-10 md:p-14 flex flex-col justify-between min-h-[400px] group overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#9B7E58]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                <div className="text-[#9B7E58] text-lg md:text-xl font-serif italic mb-4">The Spark</div>
                <div className="text-5xl md:text-6xl font-serif mb-8 font-light">$350 - $700</div>
              </div>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed relative z-10 font-light">Properly graduated and expertly set up. These instruments forgive beginner mistakes while offering a beautiful tone to inspire practice.</p>
            </div>
            
            {/* Tier 2 - Rich Solid Gold */}
            <div className="lg:col-span-7 bg-[#9B7E58] text-white p-10 md:p-14 flex flex-col justify-between min-h-[400px] shadow-2xl lg:mt-16 group relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/4 group-hover:scale-125 transition-transform duration-1000" />
              <div className="relative z-10">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                  <div className="text-white/80 text-lg md:text-xl font-serif italic">The Journey</div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/40 bg-white/10 backdrop-blur-sm text-white text-[11px] md:text-xs tracking-[0.25em] uppercase font-bold">
                    <span className="w-1.5 h-1.5 bg-white" />
                    Most Popular
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-serif mb-8 font-light">$1k - $2k</div>
              </div>
              <div className="flex justify-between items-end relative z-10">
                <p className="text-white/95 text-lg md:text-xl leading-relaxed max-w-md font-light">For the advancing student who demands a broader tonal palette and faster response. Hand-varnished European tonewoods.</p>
                <Star className="text-white opacity-60 group-hover:opacity-100 transition-opacity" size={48} />
              </div>
            </div>

            {/* Tier 3 - Crisp White / High Contrast Border */}
            <div className="lg:col-span-12 bg-white p-10 md:p-16 border-4 border-[#1A1A17] flex flex-col md:flex-row gap-12 items-start md:items-center justify-between shadow-[12px_12px_0px_#1A1A17]">
              <div className="md:w-2/3">
                <div className="text-[#9B7E58] text-lg md:text-xl font-serif italic mb-4">The Pinnacle</div>
                <div className="text-5xl md:text-7xl font-serif text-[#1A1A17] mb-6 font-light">$2,500+</div>
                <p className="text-[#1A1A17]/90 text-lg md:text-xl leading-relaxed font-light">Grade AAA master instruments. Singular works of art for the demanding professional. Includes rare contemporary makers and historical antiques.</p>
              </div>
              <div className="md:w-1/3 flex md:justify-end">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#9B7E58] flex items-center justify-center text-[#9B7E58] hover:bg-[#9B7E58] hover:text-white transition-colors cursor-default shadow-lg">
                  <span className="text-sm md:text-base uppercase tracking-[0.2em] font-bold">Inquire</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'rental':
      return (
        <div className="mt-8 space-y-20 animate-fade-in">
          {/* Equity Section */}
          <div className="border-t-2 border-[#1A1A17] pt-12">
            <div className="text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold mb-10">
              01 // Rent-to-Own
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="bg-[#1A1A17] text-white p-10 md:p-16 lg:w-1/2 relative overflow-hidden group shadow-2xl">
                <span className="absolute -bottom-10 -right-4 text-[200px] font-serif text-white/5 group-hover:text-[#9B7E58]/10 transition-colors duration-700 leading-none">1</span>
                <div className="relative z-10">
                  <div className="text-6xl md:text-7xl font-serif text-[#9B7E58] mb-6">100%</div>
                  <p className="text-2xl md:text-3xl font-serif italic mb-6">First Year Equity</p>
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-sm font-light">Applies directly toward the purchase of any master instrument in our shop.</p>
                </div>
              </div>
              
              <div className="bg-[#9B7E58] text-white p-10 md:p-16 lg:w-1/2 relative overflow-hidden group shadow-2xl">
                <span className="absolute -bottom-10 -right-4 text-[200px] font-serif text-white/10 group-hover:text-white/20 transition-colors duration-700 leading-none">2</span>
                <div className="relative z-10">
                  <div className="text-6xl md:text-7xl font-serif text-white mb-6">50%</div>
                  <p className="text-2xl md:text-3xl font-serif italic text-white mb-6">Subsequent Equity</p>
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-sm font-light">Continues to build your equity, ensuring your investment grows alongside your talent.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rates Table */}
          <div className="border-t-2 border-[#1A1A17] pt-12">
            <div className="text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold mb-10">
              02 // Monthly Rates
            </div>
            <div className="divide-y-2 divide-[#1A1A17]/10 border-y-2 border-[#1A1A17]/10">
              {[
                { title: "Violin / Viola", size: "Up to 13\" (3/4 Size)", price: "$19" },
                { title: "Adult Violin / Viola", size: "14\" or Larger", price: "$29" },
                { title: "Student Cello", size: "Up to 3/4 Size", price: "$38" },
                { title: "Full Size Cello", size: "Professional Setup", price: "$59" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-10 group hover:pl-8 transition-all duration-500 cursor-default">
                  <div>
                    <div className="font-serif text-3xl md:text-4xl text-[#1A1A17] group-hover:text-[#9B7E58] transition-colors">{item.title}</div>
                    <div className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#1A1A17]/70 mt-4">{item.size}</div>
                  </div>
                  <div className="font-serif text-4xl md:text-5xl text-[#9B7E58] mt-6 sm:mt-0">
                    {item.price}<span className="text-xl font-sans text-[#1A1A17]/30">/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'repair':
      return (
        <div className="mt-8 space-y-16 animate-fade-in">
          {/* Editorial Intro */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-t-2 border-[#1A1A17] pt-12">
            <div className="md:w-1/4 text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold">
              01 // Purist Benchwork
            </div>
            <div className="md:w-3/4">
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A17]">
                We reject factory shortcuts—instead, we listen, carving and adjusting <span className="italic text-[#9B7E58]">fractions of a millimeter</span> until the tonewood&apos;s true voice is awakened.
              </p>
            </div>
          </div>

          {/* Authentic Repair Bench Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-[#1A1A17] shadow-xl group">
              <Image src="/atelier/matt_luthier_bench.jpg" alt="Matthew Lane at the Luthier Bench" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs uppercase tracking-widest font-bold">
                Matthew Lane Hand-Carving &amp; Graduating Plates
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-[#1A1A17] shadow-xl group">
              <Image src="/atelier/instrument_repair_clamps.jpg" alt="Instrument Restoration in Clamps" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-xs uppercase tracking-widest font-bold">
                Acoustic Seam &amp; Crack Restoration in Clamps
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: "Tonal Optimization", desc: "Acoustic balancing and soundpost adjustments for maximum resonance." },
              { title: "Bespoke Bridges", desc: "Hand-carved French & Belgian maple bridges fitted flush to plate arching." },
              { title: "Soundpost Acoustic Tuning", desc: "Precision cutting and placement to 0.1mm for immediate bow response and rich projection." },
              { title: "Museum Restoration", desc: "Crack repair, edge replacement, cleating & reversible hot hide gluing." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white border-2 border-[#1A1A17] p-8 md:p-10 hover:-translate-y-1 transition-all duration-300 shadow-[6px_6px_0px_#1A1A17] group cursor-default">
                <div className="text-[#1A1A17] font-serif text-2xl md:text-3xl mb-3 flex items-center justify-between">
                  {service.title}
                  <Check size={22} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9B7E58]" />
                </div>
                <div className="text-[#1A1A17]/80 text-base md:text-lg font-light leading-relaxed">{service.desc}</div>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="bg-[#1A1A17] text-white p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#9B7E58]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-125 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className="text-sm tracking-[0.2em] uppercase text-[#9B7E58] font-bold mb-4">02 // Local Assessment</div>
              <div className="text-white font-serif text-4xl md:text-5xl mb-4">Hands-On Consultations</div>
              <div className="text-white/90 text-base md:text-lg font-light max-w-xl leading-relaxed">Bring your instrument to our Wallace Ave bench for an unhurried, expert assessment rooted in 50 years of devotion.</div>
            </div>
            <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 border-2 border-[#9B7E58] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#9B7E58] transition-colors text-[#9B7E58] group-hover:text-white cursor-pointer shadow-lg">
              <ArrowRight className="-rotate-45" size={28} />
            </div>
          </div>
        </div>
      );

    case 'rehair':
      return (
        <div className="mt-8 space-y-16 animate-fade-in">
          {/* Editorial Intro */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-t-2 border-[#1A1A17] pt-12">
            <div className="md:w-1/4 text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold">
              01 // The Breath of Tone
            </div>
            <div className="md:w-3/4">
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A17]">
                The bow is the <span className="italic text-[#9B7E58]">breath</span> of the string. A master rehair transforms your technical execution and tonal command.
              </p>
            </div>
          </div>

          {/* Authentic Bow Wall Image */}
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-[#1A1A17] shadow-xl group">
            <Image src="/atelier/shop_bows_display.jpg" alt="Bow Collection in Atelier" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E58] font-bold block mb-1">In-Shop Bow Expertise</span>
              <p className="font-serif text-xl md:text-2xl">Fine Pernambuco &amp; Carbon Bows Serviced, Rehaired, and Rebalanced</p>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: "Select Stallion Hair", desc: "Pure unbleached Mongolian stallion hair renowned for superior rosin retention and grip." },
              { icon: Clock, title: "Prompt Turnaround", desc: "Swift, dependable returns. A dedicated artist cannot afford to be without their bow." },
              { icon: Wrench, title: "Comprehensive Care", desc: "Ivory tip plate replacement, silver wire winding, leather grips, and camber adjustments." }
            ].map((col, idx) => (
              <div key={idx} className="bg-[#1A1A17] text-white p-8 md:p-10 flex flex-col items-start hover:-translate-y-1 transition-transform duration-300 shadow-xl group">
                <div className="w-14 h-14 bg-[#9B7E58] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <col.icon size={22} className="text-white" />
                </div>
                <div className="text-white font-serif text-2xl mb-4">{col.title}</div>
                <div className="text-white/90 text-base font-light leading-relaxed">{col.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'instruction':
      return (
        <div className="mt-8 space-y-16 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-t-2 border-[#1A1A17] pt-12">
            <div className="md:w-1/4 text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold">
              01 // The Oral Tradition
            </div>
            <div className="md:w-3/4">
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A17]">
                Great musicianship is passed intimately from master to apprentice over generations. 
              </p>
            </div>
          </div>

          {/* Authentic Studio Photo */}
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-[#1A1A17] shadow-xl group">
            <Image src="/atelier/instruction_pedagogy.jpg" alt="Strings Pedagogy & Masterclass" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E58] font-bold block mb-1">Generations of Excellence</span>
              <p className="font-serif text-xl md:text-2xl">Mentoring Kentucky&apos;s Next Generation of Concertmasters &amp; Soloists</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Faculty 1 - Dark Card */}
            <div className="bg-[#1A1A17] text-white p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-10 items-start shadow-xl group">
              <div className="w-20 h-20 bg-[#9B7E58] text-white flex items-center justify-center font-serif text-3xl shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                KR
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                  <h5 className="font-serif text-2xl md:text-3xl text-white">Kathie Raymond</h5>
                  <span className="text-[#9B7E58] text-base italic font-serif">San Diego State University</span>
                </div>
                <p className="text-white/90 text-base md:text-lg font-light leading-relaxed max-w-3xl mb-6">
                  A profoundly nurturing instructor with a proven track record of elevating students into All State Orchestras and the Louisville Youth Orchestra.
                </p>
                <div className="inline-flex items-center gap-3 bg-white/10 px-5 py-3 text-xs uppercase tracking-[0.2em] font-bold text-white">
                  <span>Call to Book:</span> <span className="text-[#9B7E58] font-bold">(502) 263-3490</span>
                </div>
              </div>
            </div>

            {/* Faculty 2 - Contrast White / Border Card */}
            <div className="bg-white border-2 border-[#1A1A17] p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-10 items-start shadow-[6px_6px_0px_#1A1A17] group">
              <div className="w-20 h-20 bg-[#1A1A17] text-[#9B7E58] flex items-center justify-center font-serif text-3xl shrink-0 group-hover:bg-[#9B7E58] group-hover:text-white transition-colors shadow-lg">
                LS
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                  <h5 className="font-serif text-2xl md:text-3xl text-[#1A1A17]">Linda Starks</h5>
                  <span className="text-[#9B7E58] text-base italic font-serif">Louisville Symphony Orchestra</span>
                </div>
                <p className="text-[#1A1A17]/90 text-base md:text-lg font-light leading-relaxed max-w-3xl mb-6">
                  Educated at UofL and IU Bloomington. A celebrated Suzuki Pedagogy expert who blends rigorous technique with deep musical expression across a 22-year symphonic tenure.
                </p>
                <div className="inline-flex items-center gap-3 bg-[#FAF9F5] px-5 py-3 border border-[#1A1A17]/20 text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A17]">
                  <span className="text-[#9B7E58] font-bold">Inquire within for availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'legacy':
      return (
        <div className="mt-8 space-y-16 animate-fade-in">
          {/* Authentic Legacy Hero Photo */}
          <div className="relative w-full h-[320px] md:h-[440px] rounded-2xl overflow-hidden border-2 border-[#1A1A17] shadow-2xl group">
            <Image
              src="/atelier/matt_and_mark_legacy.jpg"
              alt="Matthew Lane and Mark Edwards in their Louisville workshop"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A17] via-[#1A1A17]/30 to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#9B7E58] font-bold block mb-1">
                The Heritage · Since 1976
              </span>
              <p className="font-serif text-xl md:text-2xl italic font-light">
                Founder Mark Edwards (1952–2026) &amp; Matthew Lane at the workshop bench in Louisville, KY.
              </p>
            </div>
          </div>

          {/* The Wallace Avenue Chronicle & Pure Craft Ethos */}
          <div className="border-t-2 border-[#1A1A17] pt-12">
            <div className="flex items-center gap-3 text-[#9B7E58] mb-4">
              <span className="text-xs tracking-[0.25em] font-bold uppercase">The Wallace Avenue Chronicle</span>
              <div className="h-[1px] w-16 bg-[#9B7E58]" />
            </div>
            <h4 className="font-serif text-3xl md:text-5xl text-[#1A1A17] mb-8 leading-tight">
              A Boy Fitted in 1988. <br/>
              <span className="italic text-[#9B7E58]">A Purist Holding the Line Against Mass Production.</span>
            </h4>
            
            <div className="text-[#1A1A17]/85 space-y-6 font-light leading-relaxed text-lg md:text-xl">
              <p>
                In the late 1980s, a young boy walked through the doors of Mark Edwards Violins on Wallace Avenue with his parents, hoping to begin his musical journey. Mark personally fitted that kid—Matt Lane—for his very first student rental violin. Neither knew that day that a 50-year legacy had just found its successor.
              </p>
              <p>
                By 2005, Matt was working shoulder-to-shoulder with Mark at the bench. For the next twenty years, they breathed wood shavings, hot hide glue, and spirit varnish, building a sanctuary of acoustic truth. When Mark passed away in early 2026, corporate mega-retailers and online aggregators expected independent lutherie to quietly fold. Matt chose instead to stand his ground.
              </p>
              <div className="p-8 md:p-10 bg-[#1A1A17] text-white border-l-4 border-[#9B7E58] shadow-2xl relative overflow-hidden">
                <p className="font-serif italic text-2xl md:text-3xl leading-relaxed text-white">
                  &ldquo;The mega-retailers have boardrooms, automated spray lines, and quarterly spreadsheets. We have the French chisel, fifty years of wood shavings, and the acoustic truth. When an artist steps onto the stage with an instrument handcrafted and tuned by ear in our independent shop, all that corporate machinery evaporates into silence.&rdquo;
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <div className="w-10 h-[1px] bg-[#9B7E58]" />
                  <span className="text-xs tracking-[0.2em] uppercase text-[#9B7E58] font-bold">Matthew Lane, Owner &amp; Master Luthier</span>
                </div>
              </div>
            </div>
          </div>

          {/* Side by Side Founders Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <div className="p-10 bg-[#1A1A17] text-white shadow-2xl relative border-t-4 border-[#9B7E58]">
              <div className="mb-6">
                <h5 className="font-serif text-3xl md:text-4xl text-white mb-2">Mark Edwards</h5>
                <p className="text-xs tracking-[0.2em] uppercase text-[#9B7E58] font-bold">Founder (1952 – 2026)</p>
              </div>
              <p className="text-white/90 leading-relaxed text-base md:text-lg font-light">
                When Mark opened in 1976, he refused to sell commercial shortcuts. For 50 years, there was scarcely a day he wasn&apos;t elbow-deep in restoration. His heart lives on in every bridge cut and every young artist nurtured in St. Matthews.
              </p>
            </div>

            <div className="p-10 bg-[#9B7E58] text-white shadow-2xl relative border-t-4 border-[#1A1A17]">
              <div className="mb-6">
                <h5 className="font-serif text-3xl md:text-4xl text-white mb-2">Matthew Lane</h5>
                <p className="text-xs tracking-[0.2em] uppercase text-white/90 font-bold">Owner &amp; Master Luthier</p>
              </div>
              <p className="text-white/95 leading-relaxed text-base md:text-lg font-light">
                Respected violinist, youth symphony mentor, and global lutherie researcher. Matt personally evaluates every instrument&apos;s attributes and provenance, standing as the defiant guardian of old-world Cremonese and Parisian craftsmanship.
              </p>
            </div>
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className="mt-8 space-y-16 animate-fade-in">
          {/* Authentic Storefront Photo */}
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden border-2 border-[#1A1A17] shadow-2xl group">
            <Image src="/atelier/storefront_wallace.png" alt="Lane and Edwards Storefront at 315 Wallace Ave" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E58] font-bold block mb-1">Historic St. Matthews Sanctuary</span>
              <p className="font-serif text-2xl md:text-3xl">315 Wallace Ave · Louisville, KY 40207</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-t-2 border-[#1A1A17] pt-12">
            <div className="md:w-1/4 text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold">
              01 // The Sanctuary
            </div>
            <div className="md:w-3/4">
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A17]">
                The scent of aged spruce, bench tools, and varnished maple await you. <span className="italic text-[#9B7E58]">Step into our workshop.</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A1A17] text-white p-10 md:p-14 flex flex-col justify-between min-h-[340px] group shadow-2xl relative overflow-hidden">
              <MapPin size={140} className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-110 transition-transform duration-700" />
              <div>
                <div className="text-xs tracking-[0.2em] uppercase text-[#9B7E58] font-bold mb-4">Location</div>
                <div className="font-serif text-3xl md:text-4xl mb-4">The Workshop</div>
                <p className="text-white/90 text-base md:text-lg leading-relaxed font-light">315 Wallace Ave.<br/>Louisville, KY 40207</p>
              </div>
              <div className="mt-8 flex items-center gap-3 text-[#9B7E58] text-xs uppercase tracking-[0.2em] font-bold">
                St. Matthews Historic District <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>

            <div className="bg-[#9B7E58] text-white p-10 md:p-14 flex flex-col justify-between min-h-[340px] group shadow-2xl relative overflow-hidden">
              <Calendar size={140} className="absolute -bottom-10 -right-10 text-white/10 group-hover:scale-110 transition-transform duration-700" />
              <div>
                <div className="text-xs tracking-[0.2em] uppercase text-white/80 font-bold mb-4">Acoustic Auditions</div>
                <div className="font-serif text-3xl md:text-4xl mb-4 text-white">Book a Session</div>
                <p className="text-white/95 text-base md:text-lg leading-relaxed font-light">(502) 690-5908<br/>Direct Online Booking via Vagaro</p>
              </div>
              <div className="mt-8 flex items-center gap-3 text-white text-xs uppercase tracking-[0.2em] font-bold">
                Schedule With Matt <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'accessories':
      return (
        <div className="mt-8 space-y-16 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-t-2 border-[#1A1A17] pt-12">
            <div className="md:w-1/4 text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold">
              01 // Pairings
            </div>
            <div className="md:w-3/4">
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A17]">
                An extraordinary instrument demands extraordinary companions. Discover the <span className="italic text-[#9B7E58]">alchemy</span> of the perfect setup.
              </p>
            </div>
          </div>

          <div className="flex flex-col divide-y-2 divide-[#1A1A17]/10 border-y-2 border-[#1A1A17]/10">
            {[
              { title: "Strings", desc: "Explore tonal possibilities with Thomastik-Infeld Dominant Pro, Pirastro Evah Pirazzi Gold, and Larsen Magnacore. Professional string fitting and tension matching available." },
              { title: "Suspension Cases", desc: "Protect your investment. Hand-selected luxury green velvet suspension cases, archtop hardwood cases, and travel shells vetted for Kentucky climate swings." },
              { title: "Luthier Fittings", desc: "Solid carved maple Mach One shoulder rests, acoustic chinrests, and Core precision digital hygrometers that preserve delicate tonewoods." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 group hover:px-6 transition-all duration-300 cursor-default">
                <div className="font-serif text-3xl md:text-4xl text-[#1A1A17] group-hover:text-[#9B7E58] transition-colors mb-3 md:mb-0 md:w-1/3">
                  {item.title}
                </div>
                <div className="md:w-2/3 text-[#1A1A17]/80 text-base md:text-lg font-light leading-relaxed max-w-xl">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'guarantee':
      return (
        <div className="mt-8 space-y-16 animate-fade-in">
          {/* Authentic Signature Photo */}
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-[#1A1A17] shadow-2xl group">
            <Image src="/atelier/antique_maker_signature.jpg" alt="Master Maker Signature Provenance" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B7E58] font-bold block mb-1">Signed Authenticity &amp; Pride</span>
              <p className="font-serif text-2xl md:text-3xl">The Craftsman&apos;s Guarantee: 100% Lifetime Equity Protection</p>
            </div>
          </div>

          <div className="border-t-2 border-[#1A1A17] pt-12">
            <div className="bg-[#1A1A17] p-10 md:p-16 relative overflow-hidden group shadow-2xl">
              <ShieldCheck size={500} className="absolute -top-32 -right-32 text-white/[0.03] group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000 ease-out" />
              
              <div className="relative z-10 max-w-4xl">
                <div className="text-sm tracking-[0.2em] uppercase text-[#9B7E58] font-bold mb-8">
                  01 // Protecting the Musician&apos;s Equity
                </div>
                
                <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-8">
                  Any instrument purchased from Lane &amp; Edwards maintains its <span className="text-[#9B7E58] italic">100% full purchase value</span> in trade toward your next master instrument. Forever.
                </p>
                
                <div className="flex gap-6 items-start">
                  <div className="w-[2px] h-24 bg-[#9B7E58]" />
                  <p className="text-white/90 text-base md:text-xl leading-relaxed max-w-2xl font-light">
                    Corporate chains profit when student instruments depreciate. We stake our livelihood on your growth: every dollar you invest in this workshop follows your musical advancement, dollar-for-dollar, shielding your family&apos;s commitment for life.
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
