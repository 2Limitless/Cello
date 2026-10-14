"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Search, Plus, Eye, ShieldCheck, Check, Calendar, BookOpen } from 'lucide-react';
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
  const [activeInstrumentType, setActiveInstrumentType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  useEffect(() => {
    const handleFilterEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ category?: string; instrumentType?: string }>;
      if (customEvent.detail?.category) {
        setActiveCategory(customEvent.detail.category);
      }
      if (customEvent.detail?.instrumentType) {
        setActiveInstrumentType(customEvent.detail.instrumentType);
      }
    };
    window.addEventListener('filter-boutique', handleFilterEvent);
    return () => window.removeEventListener('filter-boutique', handleFilterEvent);
  }, []);

  const categories = [
    { id: 'all', label: 'All Acquisitions' },
    { id: 'instruments', label: 'Master Instruments' },
    { id: 'bows', label: 'Fine Bows' },
    { id: 'strings', label: 'Concert Strings' },
    { id: 'cases', label: 'Cases & Travel' },
    { id: 'accessories', label: 'Luthier Care' },
  ];

  const instrumentTypes = [
    { id: 'all', label: 'All Families' },
    { id: 'violin', label: 'Violin' },
    { id: 'viola', label: 'Viola' },
    { id: 'cello', label: 'Cello' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Instrument type filter
      if (activeInstrumentType !== 'all') {
        if (product.instrumentType && product.instrumentType !== activeInstrumentType && product.instrumentType !== 'all') {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchesOrigin = product.origin.toLowerCase().includes(q);
        const matchesMaker = product.maker?.toLowerCase().includes(q);
        const matchesWood = product.tonewood?.toLowerCase().includes(q);
        if (!matchesName && !matchesSubtitle && !matchesOrigin && !matchesMaker && !matchesWood) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // featured order in dataset
    });
  }, [activeCategory, activeInstrumentType, searchQuery, sortBy]);



  return (
    <section id="boutique" className="w-full bg-[#F6F0E5] text-[#22160E] pt-14 pb-28 border-t-4 border-[#8C6239]/40 relative">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 pb-12 border-b-2 border-[#8C6239]/25">
          <div>
            <div className="flex items-center gap-4 text-[#8C6239] mb-3">
              <span className="text-[11px] tracking-[0.3em] font-serif font-bold uppercase">Volume IV · Master Instrument Collection</span>
              <div className="h-[1.5px] w-20 bg-gradient-to-r from-[#C68628] to-transparent" />
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1E1107] tracking-tight font-medium">
              The Atelier Boutique
            </h2>
            <p className="font-book italic text-xl md:text-2xl text-[#6D4721] mt-4 max-w-2xl font-light">
              Master instruments, pernambuco bows, and concert fittings—rigorously vetted and acoustically balanced in our Louisville workshop.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('the-story');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-4 bg-[#FAF5EA] border-2 border-[#8C6239]/35 text-[#2A190E] font-serif text-xs uppercase tracking-widest font-bold shadow-[4px_4px_0px_#8C6239] hover:bg-[#8C6239] hover:text-[#FAF5EA] transition-all flex items-center gap-3 cursor-pointer rounded-lg"
            >
              <BookOpen size={15} className="text-[#8C6239]" />
              <span>Our Story &amp; Ethos</span>
            </button>

            <div className="px-6 py-4 bg-[#2A190E] text-[#FAF5EA] font-serif text-xs uppercase tracking-widest font-bold shadow-xl flex items-center gap-3 rounded-lg border border-[#8C6239]/30">
              <Calendar size={15} className="text-[#C68628]" />
              <span>Acoustic Trials by Appointment</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Suite */}
        <div className="space-y-6 mb-12">
          {/* Search + Sort Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C6239]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by maker, tonewood, or model..."
                className="w-full pl-12 pr-4 py-3.5 bg-[#FAF5EA] border-2 border-[#8C6239]/30 text-[#22160E] rounded-xl text-sm font-book outline-none focus:border-[#C68628] shadow-[0_2px_10px_rgba(70,40,15,0.04)] transition-all placeholder:text-[#8C6239]/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-serif font-bold text-[#8C6239] hover:text-[#1E1107]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-xs uppercase font-serif tracking-widest text-[#7C542A] font-bold hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                className="bg-[#FAF5EA] border-2 border-[#8C6239]/30 text-[#22160E] px-4 py-3 text-xs uppercase font-serif tracking-wider font-bold rounded-xl shadow-xs outline-none cursor-pointer"
              >
                <option value="featured">Featured Curation</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#8C6239]/15">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 text-xs uppercase font-serif tracking-[0.15em] font-bold rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2A190E] text-[#FAF5EA] shadow-md border border-[#8C6239]'
                      : 'bg-[#FAF5EA] border border-[#8C6239]/25 text-[#5C3818] hover:border-[#8C6239]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Instrument Family Secondary Filters (when on All or Instruments or Bows) */}
          {(activeCategory === 'all' || activeCategory === 'instruments' || activeCategory === 'bows') && (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-[11px] uppercase font-serif tracking-wider font-bold text-[#8C6239]">Filter Family:</span>
              <div className="flex gap-2">
                {instrumentTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveInstrumentType(t.id)}
                    className={`px-3 py-1 text-[11px] uppercase font-serif tracking-wider font-bold transition-colors cursor-pointer rounded-full ${
                      activeInstrumentType === t.id
                        ? 'bg-[#C68628] text-white shadow-xs'
                        : 'text-[#7C542A] hover:text-[#1E1107] underline underline-offset-4'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-[#8C6239]/30 p-12 rounded-[20px] bg-[#FAF5EA]/50">
            <h4 className="font-serif text-3xl text-[#22160E] mb-3">No matching acquisitions found</h4>
            <p className="text-[#7C542A] max-w-md mx-auto text-sm mb-6 font-book">
              Our workshop curates fine instruments continuously. Contact our luthiers to request a custom acquisition or adjustment.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setActiveInstrumentType('all');
              }}
              className="px-6 py-3 bg-[#2A190E] text-[#FAF5EA] uppercase font-serif text-xs tracking-widest font-bold rounded-lg"
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
                  className="group bg-[#FAF5EA] border-2 border-[#8C6239]/25 shadow-[0_12px_32px_rgba(65,35,12,0.07)] rounded-[22px] flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1.5 hover:border-[#8C6239]/50 hover:shadow-[0_18px_40px_rgba(65,35,12,0.12)] transition-all duration-300"
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full bg-[#1A1A17] overflow-hidden border-b-2 border-[#1A1A17]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-[#1A1A17]/10 group-hover:bg-transparent transition-colors" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                      {product.badge ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] tracking-[0.25em] uppercase font-bold">
                          <span className="w-1.5 h-1.5 bg-[#9B7E58]" />
                          {product.badge}
                        </div>
                      ) : <div />}

                      <div className="px-2.5 py-1 bg-[#FAF9F5] border border-[#1A1A17] text-[#1A1A17] text-[10px] uppercase tracking-widest font-bold">
                        {product.origin.split(',')[0]}
                      </div>
                    </div>

                    {/* Quick Examine Button Overlay on Hover */}
                    <div className="absolute inset-0 bg-[#1A1A17]/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-6 py-3 bg-white text-[#1A1A17] uppercase tracking-[0.2em] text-xs font-bold shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye size={14} /> Examine Specs
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-serif text-2xl md:text-3xl text-[#1E1107] font-medium leading-tight group-hover:text-[#C68628] transition-colors">
                          {product.name}
                        </h4>
                      </div>
                      <p className="font-serif italic text-sm text-[#8C6239] mt-1">
                        {product.subtitle}
                      </p>
                      <p className="font-book text-[#4A2D13]/80 text-sm leading-relaxed mt-4 font-normal line-clamp-2">
                        {product.shortDesc}
                      </p>
                    </div>

                    {/* Card Footer: Price & Add to Bag */}
                    <div className="pt-6 border-t border-[#8C6239]/15 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] tracking-widest uppercase text-[#7C542A] block font-serif font-bold">Acquisition</span>
                        <span className="font-serif text-3xl font-bold text-[#1E1107]">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      {product.category === 'instruments' || product.category === 'bows' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookingProduct(product);
                            setIsBookingModalOpen(true);
                          }}
                          className="px-5 py-3 bg-[#2A190E] text-[#FAF5EA] hover:bg-[#8C6239] uppercase tracking-[0.15em] text-[11px] font-serif font-bold rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
                        >
                          <Calendar size={13} className="text-[#C68628]" />
                          <span>Reserve Trial</span>
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                          className="px-5 py-3 bg-[#FAF5EA] border border-[#8C6239]/35 text-[#2A190E] hover:bg-[#8C6239] hover:text-white uppercase tracking-[0.15em] text-[11px] font-serif font-bold rounded-full transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>Examine Specs</span>
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
        <div className="mt-20 bg-[#1F1309] text-[#FAF5EA] p-10 md:p-16 border-2 border-[#8C6239]/40 rounded-[24px] relative overflow-hidden shadow-2xl">
          <ShieldCheck size={360} className="absolute -bottom-20 -right-20 text-[#C68628]/[0.05] pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs uppercase font-serif tracking-[0.3em] font-bold text-[#D4AF37] mb-4 block">
              ✦ The Lane &amp; Edwards Guarantee
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight font-medium">
              Every instrument you acquire protects <span className="italic text-[#D4AF37]">100% of your equity</span>.
            </h3>
            <p className="font-book text-[#FAF5EA]/85 text-base md:text-lg leading-relaxed font-light mb-8">
              When you or your student are ready to advance to a master instrument, every dollar paid towards your current Lane &amp; Edwards instrument is credited directly toward your new voice. Lutherie should nurture your artistic journey, not diminish it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setActiveCategory('instruments');
                  const el = document.getElementById('boutique');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#C68628] hover:bg-[#b0741e] text-[#1E1107] font-serif uppercase tracking-[0.2em] text-xs font-bold rounded-full transition-colors cursor-pointer shadow-lg"
              >
                Browse Master Instruments
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
