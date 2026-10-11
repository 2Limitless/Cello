import React from 'react';
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
        <div className="mt-8 space-y-20 animate-fade-in">
          {/* Editorial Intro */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-t-2 border-[#1A1A17] pt-12">
            <div className="md:w-1/4 text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold">
              01 // The Approach
            </div>
            <div className="md:w-3/4">
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A17]">
                We reject rigid &quot;standard measurements&quot;—instead, we listen, adjusting <span className="italic text-[#9B7E58]">fractions of a millimeter</span> until the instrument&apos;s true, uninhibited voice is finally revealed.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: "Tonal Optimization", desc: "Acoustic balancing for maximum resonance." },
              { title: "Bespoke Bridges", desc: "Hand-carved and precisely fitted to the belly." },
              { title: "Sound Post", desc: "Cutting & tensioning for perfect energy transfer." },
              { title: "Restoration", desc: "Crack repair, cleating & hot hide gluing." }
            ].map((service, idx) => (
              <div key={idx} className="bg-white border-2 border-[#1A1A17] p-10 md:p-12 hover:-translate-y-2 transition-all duration-500 shadow-[8px_8px_0px_#1A1A17] group cursor-default">
                <div className="text-[#1A1A17] font-serif text-3xl mb-4 flex items-center justify-between">
                  {service.title}
                  <Check size={24} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9B7E58]" />
                </div>
                <div className="text-[#1A1A17]/80 text-lg md:text-xl font-light leading-relaxed">{service.desc}</div>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="bg-[#1A1A17] text-white p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 group shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#9B7E58]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-125 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className="text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold mb-6">02 // Evaluation</div>
              <div className="text-white font-serif text-5xl md:text-6xl mb-6">Free Consultations</div>
              <div className="text-white/90 text-lg md:text-xl font-light max-w-xl leading-relaxed">Bring your instrument to our workshop for a comprehensive, hands-on assessment rooted in decades of expertise.</div>
            </div>
            <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 border-2 border-[#9B7E58] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#9B7E58] transition-colors text-[#9B7E58] group-hover:text-white cursor-pointer shadow-lg">
              <ArrowRight className="-rotate-45" size={32} />
            </div>
          </div>
        </div>
      );

    case 'rehair':
      return (
        <div className="mt-8 space-y-20 animate-fade-in">
          {/* Editorial Intro */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-t-2 border-[#1A1A17] pt-12">
            <div className="md:w-1/4 text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold">
              01 // The Craft
            </div>
            <div className="md:w-3/4">
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A17]">
                The bow is the <span className="italic text-[#9B7E58]">breath</span> of the string. A master rehair transforms your technical execution and tonal command.
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: "Premium Hair", desc: "Unbleached Mongolian stallion hair renowned for superior rosin retention." },
              { icon: Clock, title: "Prompt Return", desc: "Predictable, swift turnarounds. A musician cannot be without their bow." },
              { icon: Wrench, title: "Full Service", desc: "Ivory tip replacement, leather grips, wire winding, and camber adjustments." }
            ].map((col, idx) => (
              <div key={idx} className="bg-[#1A1A17] text-white p-10 md:p-12 flex flex-col items-start hover:-translate-y-2 transition-transform duration-500 shadow-2xl group">
                <div className="w-16 h-16 bg-[#9B7E58] rounded-full flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <col.icon size={24} className="text-white" />
                </div>
                <div className="text-white font-serif text-3xl mb-6">{col.title}</div>
                <div className="text-white/90 text-lg font-light leading-relaxed">{col.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'instruction':
      return (
        <div className="mt-8 space-y-20 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-t-2 border-[#1A1A17] pt-12">
            <div className="md:w-1/4 text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold">
              01 // The Faculty
            </div>
            <div className="md:w-3/4">
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A17]">
                Great musicianship is an oral tradition, passed intimately from master to apprentice over generations. 
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Faculty 1 - Dark Card */}
            <div className="bg-[#1A1A17] text-white p-10 md:p-14 flex flex-col md:flex-row gap-8 md:gap-12 items-start shadow-2xl group">
              <div className="w-24 h-24 bg-[#9B7E58] text-white flex items-center justify-center font-serif text-4xl shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                KR
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4">
                  <h5 className="font-serif text-3xl md:text-4xl text-white">Kathie Raymond</h5>
                  <span className="text-[#9B7E58] text-lg italic font-serif">San Diego State University</span>
                </div>
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-8">
                  A profoundly nurturing instructor with a proven track record of elevating students into All State Orchestras and the Louisville Youth Orchestra.
                </p>
                <div className="inline-flex items-center gap-4 bg-white/10 px-6 py-4 text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-white">
                  <span>Call to Book:</span> <span className="text-[#9B7E58] font-bold">(502) 263-3490</span>
                </div>
              </div>
            </div>

            {/* Faculty 2 - Contrast White / Border Card */}
            <div className="bg-white border-2 border-[#1A1A17] p-10 md:p-14 flex flex-col md:flex-row gap-8 md:gap-12 items-start shadow-[8px_8px_0px_#1A1A17] group">
              <div className="w-24 h-24 bg-[#1A1A17] text-[#9B7E58] flex items-center justify-center font-serif text-4xl shrink-0 group-hover:bg-[#9B7E58] group-hover:text-white transition-colors shadow-lg">
                LS
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4">
                  <h5 className="font-serif text-3xl md:text-4xl text-[#1A1A17]">Linda Starks</h5>
                  <span className="text-[#9B7E58] text-lg italic font-serif">Louisville Symphony Orchestra</span>
                </div>
                <p className="text-[#1A1A17]/90 text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-8">
                  Educated at UofL and IU Bloomington. A celebrated Suzuki Pedagogy expert who blends rigorous technique with deep musical expression across a 22-year symphonic tenure.
                </p>
                <div className="inline-flex items-center gap-4 bg-[#FAF9F5] px-6 py-4 border border-[#1A1A17]/20 text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#1A1A17]">
                  <span className="text-[#9B7E58] font-bold">Inquire within for availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'legacy':
      return (
        <div className="mt-8 space-y-20 animate-fade-in">
          <div className="border-t-2 border-[#1A1A17] pt-12">
            <div className="text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold mb-12">
              01 // Since 1976
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              <div className="lg:w-1/2 p-10 md:p-12 bg-[#1A1A17] text-white shadow-2xl relative">
                <div className="mb-6">
                  <h5 className="font-serif text-4xl md:text-5xl text-white mb-3">Mark Edwards</h5>
                  <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#9B7E58] font-bold">Founder (1952 - 2026)</p>
                </div>
                <p className="text-white/90 leading-relaxed text-lg md:text-xl font-light">
                  When Mark opened his doors in 1976, he wasn&apos;t just building a shop; he was cultivating a haven for musicians. For over 50 years, there was hardly a day he wasn&apos;t elbow-deep in wood shavings, driven by an unyielding obsession with tone. Mark famously fit a young Matt Lane for his first violin in the late 1980s, sparking a lifelong partnership.
                </p>
              </div>

              <div className="lg:w-1/2 p-10 md:p-12 bg-[#9B7E58] text-white shadow-2xl relative">
                <div className="mb-6">
                  <h5 className="font-serif text-4xl md:text-5xl text-white mb-3">Matthew Lane</h5>
                  <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/80 font-bold">Owner & Master Luthier</p>
                </div>
                <p className="text-white/95 leading-relaxed text-lg md:text-xl font-light">
                  A highly respected violinist, Matt traverses the globe studying the methods of modern and historical violin makers. Returning to his roots to carry the torch, he takes immense pride in fairly and rigorously evaluating an instrument&apos;s every attribute, ensuring the uncompromising Lane & Edwards standard continues.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className="mt-8 space-y-20 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start border-t-2 border-[#1A1A17] pt-12">
            <div className="md:w-1/4 text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold">
              01 // Connect
            </div>
            <div className="md:w-3/4">
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-relaxed text-[#1A1A17]">
                The scent of aged spruce and the warmth of varnished maple await you. <span className="italic text-[#9B7E58]">Step into our sanctuary.</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1A1A17] text-white p-12 md:p-16 flex flex-col justify-between min-h-[360px] group shadow-2xl relative overflow-hidden">
              <MapPin size={140} className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-110 transition-transform duration-700" />
              <div>
                <div className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#9B7E58] font-bold mb-6">Location</div>
                <div className="font-serif text-4xl md:text-5xl mb-6">The Workshop</div>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light">315 Wallace Ave.<br/>Louisville, KY 40207</p>
              </div>
              <div className="mt-12 flex items-center gap-4 text-[#9B7E58] text-xs md:text-sm uppercase tracking-[0.2em] font-bold">
                Get Directions <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>

            <div className="bg-[#9B7E58] text-white p-12 md:p-16 flex flex-col justify-between min-h-[360px] group shadow-2xl relative overflow-hidden">
              <Calendar size={140} className="absolute -bottom-10 -right-10 text-white/10 group-hover:scale-110 transition-transform duration-700" />
              <div>
                <div className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/80 font-bold mb-6">Appointments</div>
                <div className="font-serif text-4xl md:text-5xl mb-6 text-white">Book a Time</div>
                <p className="text-white/95 text-lg md:text-xl leading-relaxed font-light">(502) 690-5908<br/>Scheduling via Vagaro</p>
              </div>
              <div className="mt-12 flex items-center gap-4 text-white text-xs md:text-sm uppercase tracking-[0.2em] font-bold">
                Schedule Now <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'accessories':
      return (
        <div className="mt-8 space-y-20 animate-fade-in">
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
              { title: "Strings", desc: "Explore tonal possibilities with Thomastik-Infeld, Pirastro, D'Addario, and Larsen. Professional string fitting and tension matching available." },
              { title: "Cases", desc: "Protect your investment. From lightweight student gig bags to professional climate-sealed carbon fiber models by BAM and Musafia." },
              { title: "Fittings", desc: "Custom ergonomic chinrests and shoulder rests designed to dissolve physical tension and promote ultimate playing freedom." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 group hover:px-8 transition-all duration-500 cursor-default">
                <div className="font-serif text-4xl md:text-5xl text-[#1A1A17] group-hover:text-[#9B7E58] transition-colors mb-4 md:mb-0 md:w-1/3">
                  {item.title}
                </div>
                <div className="md:w-2/3 text-[#1A1A17]/80 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'guarantee':
      return (
        <div className="mt-8 space-y-20 animate-fade-in">
          <div className="border-t-2 border-[#1A1A17] pt-12">
            <div className="bg-[#1A1A17] p-12 md:p-24 relative overflow-hidden group shadow-2xl">
              <ShieldCheck size={600} className="absolute -top-32 -right-32 text-white/[0.03] group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000 ease-out" />
              
              <div className="relative z-10 max-w-4xl">
                <div className="text-sm md:text-base tracking-[0.2em] uppercase text-[#9B7E58] font-bold mb-12">
                  01 // The 100% Promise
                </div>
                
                <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-12">
                  Any instrument purchased from Lane & Edwards maintains its <span className="text-[#9B7E58] italic">full purchase value</span> in trade towards an instrument of greater value.
                </p>
                
                <div className="flex gap-8 items-start">
                  <div className="w-[2px] h-28 bg-[#9B7E58]" />
                  <p className="text-white/90 text-lg md:text-2xl leading-relaxed max-w-2xl font-light">
                    This guarantee is a measure of our immense confidence in the master instruments we curate. We believe an instrument should never hold you back—as you grow as an artist, your investment grows with you.
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
