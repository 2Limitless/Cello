"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Search, Plus, Eye, ShieldCheck, Check, Calendar, BookOpen, Phone, Sparkles } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useSiteContent } from '@/context/SiteContentContext';

interface AtelierBoutiqueProps {
  initialCategory?: string;
}

export function AtelierBoutique({ initialCategory }: AtelierBoutiqueProps) {
  const { products } = useSiteContent();
  const {
    setSelectedProduct,
    setBookingProduct,
    setIsBookingModalOpen
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ category?: string }>;
      if (customEvent.detail?.category) {
        if (customEvent.detail.category === 'cases' || customEvent.detail.category === 'strings' || customEvent.detail.category === 'accessories') {
          setActiveCategory(customEvent.detail.category);
        } else {
          setActiveCategory('all');
        }
      }
    };
    window.addEventListener('filter-boutique', handleFilterEvent);
    return () => window.removeEventListener('filter-boutique', handleFilterEvent);
  }, []);

  // Categories including sample instruments and supplies
  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'instruments', label: 'Sample Instruments' },
    { id: 'bows', label: 'Sample Bows' },
    { id: 'cases', label: 'Cases & Travel' },
    { id: 'strings', label: 'Concert Strings' },
    { id: 'accessories', label: 'Care & Accessories' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchesOrigin = product.origin.toLowerCase().includes(q);
        const matchesMaker = product.maker?.toLowerCase().includes(q);
        if (!matchesName && !matchesSubtitle && !matchesOrigin && !matchesMaker) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy, products]);

  return (
    <section id="boutique" className="w-full bg-[#FAF7F0] text-[#1c2024] pt-14 pb-28 border-t-2 border-[#c2a15a]/30 relative">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14 pb-10 border-b-2 border-[#c2a15a]/25">
          <div>
            <div className="flex items-center gap-3 text-[#003152] mb-3">
              <span className="text-[11px] tracking-[0.25em] font-serif font-bold uppercase text-[#003152]">Fine Instruments, Bows &amp; Supplies</span>
              <div className="h-[1.5px] w-16 bg-gradient-to-r from-[#c2a15a] to-transparent" />
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#003152] tracking-tight font-medium">
              Collection &amp; Workshop Gear
            </h2>
            <p className="font-book italic text-lg sm:text-xl text-[#3e444b] mt-3 max-w-2xl font-light leading-relaxed">
              Explore a curated sample of our benchmark instruments, master bows, and workshop-calibrated supplies. Fine instruments and bows are available for unhurried in-shop acoustic trials in Jeffersontown.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 w-full lg:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('the-story');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3.5 bg-white border border-[#c2a15a]/50 text-[#003152] font-serif text-xs uppercase tracking-widest font-bold shadow-xs hover:bg-[#003152] hover:text-[#FAF7F0] transition-all flex items-center gap-2.5 cursor-pointer rounded-lg"
            >
              <BookOpen size={14} className="text-[#c2a15a]" />
              <span>Our Story</span>
            </button>

            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-5 py-3.5 bg-[#003152] text-[#FAF7F0] hover:bg-[#00223a] font-serif text-xs uppercase tracking-widest font-bold shadow-md flex items-center gap-2.5 rounded-lg border border-[#c2a15a]/40 cursor-pointer transition-all"
            >
              <Calendar size={14} className="text-[#c2a15a]" />
              <span>Acoustic Trials by Appointment</span>
            </button>
          </div>
        </div>

        {/* Prominent Showcase Card for Fine Instruments & Bows (Variable Inventory) */}
        <div className="mb-14 p-8 sm:p-10 rounded-[22px] bg-gradient-to-br from-[#003152] to-[#001f35] text-[#FAF7F0] border-2 border-[#c2a15a]/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(194,161,90,0.18),transparent_70%)] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c2a15a]/20 border border-[#c2a15a]/40 text-[#dfc88a] text-[10px] sm:text-[11px] font-serif uppercase tracking-widest font-bold">
                <Sparkles size={12} className="text-[#c2a15a]" />
                <span>Fine Violins, Violas, Cellos &amp; Bows</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium">
                Inquiring About Fine Instruments or Bows?
              </h3>
              <p className="font-book text-[#FAF7F0]/90 text-sm sm:text-base leading-relaxed font-light">
                Because our showroom collection includes fine European antiques, contemporary workshop commissions, and carefully restored violins, violas, cellos, and basses with constantly rotating inventory, we refrain from advertising specific instruments online. We warmly invite you to visit our historic home in Jeffersontown for an unhurried, private acoustic trial, or speak directly with Matthew Lane to learn what is currently available at the bench.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-6 py-3.5 bg-[#c2a15a] hover:bg-[#b3924a] text-[#001f35] font-serif text-xs uppercase tracking-widest font-bold rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar size={14} />
                <span>Schedule an Acoustic Trial</span>
              </button>
              <a
                href="tel:5026905908"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF7F0] border border-white/20 font-serif text-xs uppercase tracking-widest font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone size={14} className="text-[#c2a15a]" />
                <span>Call (502) 690-5908</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filter Controls Suite */}
        <div className="space-y-6 mb-12">
          {/* Search + Sort Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#003152]/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cases, strings, shoulder rests..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#c2a15a]/40 text-[#1c2024] rounded-xl text-sm font-book outline-none focus:border-[#003152] shadow-xs transition-all placeholder:text-[#1c2024]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-serif font-bold text-[#003152] hover:text-[#c2a15a]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-xs uppercase font-serif tracking-widest text-[#3e444b] font-bold hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                className="bg-white border border-[#c2a15a]/40 text-[#1c2024] px-4 py-2.5 text-xs uppercase font-serif tracking-wider font-bold rounded-xl shadow-xs outline-none cursor-pointer"
              >
                <option value="featured">Featured Supplies</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#c2a15a]/20">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 text-xs uppercase font-serif tracking-[0.15em] font-bold rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#003152] text-[#FAF7F0] shadow-sm border border-[#003152]'
                      : 'bg-white border border-[#c2a15a]/35 text-[#1c2024] hover:border-[#003152]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-[#c2a15a]/35 p-10 rounded-[20px] bg-white/60">
            <h4 className="font-serif text-2xl text-[#003152] mb-2 font-medium">No matching items found</h4>
            <p className="text-[#3e444b] max-w-md mx-auto text-sm mb-6 font-book">
              We carry a wide range of accessories and strings in our Jeffersontown shop. Contact Matt directly if you are looking for a specific set or fitting.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-6 py-2.5 bg-[#003152] text-[#FAF7F0] uppercase font-serif text-xs tracking-widest font-bold rounded-lg cursor-pointer hover:bg-[#00223a]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white border border-[#c2a15a]/30 shadow-[0_8px_24px_rgba(0,49,82,0.05)] rounded-[20px] flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-[#c2a15a] hover:shadow-[0_16px_32px_rgba(0,49,82,0.1)] transition-all duration-300"
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full bg-[#FAF7F0] overflow-hidden border-b border-[#c2a15a]/20">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                      {product.badge ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#003152]/90 backdrop-blur-md border border-[#c2a15a]/40 text-[#dfc88a] text-[10px] tracking-[0.2em] uppercase font-bold rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c2a15a]" />
                          {product.badge}
                        </div>
                      ) : <div />}

                      <div className="px-2.5 py-1 bg-white/95 border border-[#c2a15a]/30 text-[#003152] text-[10px] uppercase tracking-widest font-bold rounded-full shadow-xs">
                        {product.origin.split(',')[0]}
                      </div>
                    </div>

                    {/* Quick Examine Button Overlay on Hover - Neutral Dark Background */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-5 py-2.5 bg-white text-[#003152] uppercase tracking-[0.2em] text-xs font-bold shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform rounded-full">
                        {product.category === 'instruments' || product.category === 'bows' ? (
                          <>
                            <Calendar size={14} className="text-[#c2a15a]" /> Trial Details
                          </>
                        ) : (
                          <>
                            <Eye size={14} className="text-[#c2a15a]" /> View Details
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <h4 className="font-serif text-xl md:text-2xl text-[#003152] font-medium leading-tight group-hover:text-[#c2a15a] transition-colors">
                        {product.name}
                      </h4>
                      <p className="font-serif italic text-xs text-[#c2a15a] mt-1">
                        {product.subtitle}
                      </p>
                      <p className="font-book text-[#3e444b] text-sm leading-relaxed mt-3 font-normal line-clamp-2">
                        {product.shortDesc}
                      </p>
                    </div>

                    {/* Card Footer: Price or Trial Audition */}
                    <div className="pt-5 border-t border-[#c2a15a]/20 flex justify-between items-center">
                      {product.category === 'instruments' || product.category === 'bows' ? (
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-[#c2a15a] block font-serif font-bold">
                            Sample Benchmark
                          </span>
                          <span className="font-serif text-lg font-bold text-[#003152]">
                            In-Shop Trial
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-[10px] tracking-widest uppercase text-[#3e444b] block font-serif font-bold">Price</span>
                          <span className="font-serif text-2xl font-bold text-[#003152]">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {product.category === 'instruments' || product.category === 'bows' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className="px-4 py-2 bg-[#c2a15a] hover:bg-[#b3924a] text-[#001f35] uppercase tracking-[0.15em] text-[11px] font-serif font-bold rounded-full transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Calendar size={12} />
                          <span>Trial Details</span>
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className="px-4 py-2 bg-[#FAF7F0] border border-[#c2a15a]/40 text-[#003152] hover:bg-[#003152] hover:text-[#FAF7F0] uppercase tracking-[0.15em] text-[11px] font-serif font-bold rounded-full transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                        >
                          <Eye size={12} className="text-[#c2a15a]" />
                          <span>View Item</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 100% Equity Banner */}
        <div className="mt-20 bg-gradient-to-br from-[#003152] to-[#00223a] text-[#FAF7F0] p-10 md:p-14 border-2 border-[#c2a15a]/40 rounded-[22px] relative overflow-hidden shadow-2xl">
          <ShieldCheck size={360} className="absolute -bottom-20 -right-20 text-[#c2a15a]/[0.06] pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs uppercase font-serif tracking-[0.25em] font-bold text-[#dfc88a] mb-3 block">
              ✦ The Lane &amp; Edwards Guarantee
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-5 leading-tight font-medium">
              Every instrument you acquire protects <span className="italic text-[#dfc88a]">100% of your equity</span>.
            </h3>
            <p className="font-book text-[#FAF7F0]/90 text-sm sm:text-base leading-relaxed font-light mb-7">
              When you or your student are ready to advance to your next instrument, 100% of your first-year rental equity and instrument investment follows you, credited directly toward your next step-up instrument. We are here to support your musical journey for a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-7 py-3.5 bg-[#c2a15a] hover:bg-[#b3924a] text-[#001f35] font-serif uppercase tracking-[0.18em] text-xs font-bold rounded-full transition-colors cursor-pointer shadow-md"
              >
                Schedule an Acoustic Trial
              </button>
              <a
                href="tel:5026905908"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF7F0] border border-white/25 font-serif uppercase tracking-[0.18em] text-xs font-bold rounded-full transition-colors cursor-pointer text-center"
              >
                Speak with Matthew Lane
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
