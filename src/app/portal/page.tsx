"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Save,
  RotateCcw,
  Eye,
  Check,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  ExternalLink,
  Shield,
  Lock,
  Unlock,
  Layers,
  ShoppingBag,
  BookOpen,
  MessageSquare,
  MapPin,
  Calendar,
  Feather,
  Download,
  Share2,
  ArrowRight,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';
import { Product } from '@/data/products';
import { BentoCardItem, TestimonialItem } from '@/data/defaultSiteContent';
import { AtelierImageSwapperModal } from '@/components/portal/AtelierImageSwapperModal';
import { ToneSculptor } from '@/components/portal/ToneSculptor';
import { LuthierCopyAssistant } from '@/components/portal/LuthierCopyAssistant';
import { PortalBookingsInbox } from '@/components/portal/PortalBookingsInbox';

type PortalTab = 'bento' | 'products' | 'story' | 'testimonials' | 'workshop' | 'bookings';

export default function AtelierPortalPage() {
  const {
    content,
    products,
    updateContent,
    updateProducts,
    updateProduct,
    addProduct,
    deleteProduct,
    saveChanges,
    resetToDefaults,
    discardChanges,
    hasUnsavedChanges,
    lastSaved,
    isLoading
  } = useSiteContent();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<PortalTab>('bento');

  // Image Swapper State
  const [swapperOpen, setSwapperOpen] = useState(false);
  const [swapperTarget, setSwapperTarget] = useState<{
    title: string;
    currentImage: string;
    onApply: (url: string) => void;
  } | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected Product for editing
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState('');

  // Confirmation Modal
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Check auth session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('atelier_master_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    // Passcodes accepted: stradivari, lane1976, 1976, master, or empty demo unlock
    if (clean === 'stradivari' || clean === 'lane1976' || clean === '1976' || clean === 'master' || clean === 'atelier') {
      setIsAuthenticated(true);
      sessionStorage.setItem('atelier_master_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleDemoUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('atelier_master_auth', 'true');
    setAuthError(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('atelier_master_auth');
    setPasscode('');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = async () => {
    const result = await saveChanges();
    if (result.success) {
      showToast(result.message || 'Published to live site successfully!');
    } else {
      showToast('Save failed: ' + result.message);
    }
  };

  const handleReset = async () => {
    await resetToDefaults();
    setConfirmResetOpen(false);
    showToast('Reset to original workshop default text and photos.');
  };

  const handleOpenSwapper = (title: string, currentImage: string, onApply: (url: string) => void) => {
    setSwapperTarget({ title, currentImage, onApply });
    setSwapperOpen(true);
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      content,
      products
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lane_edwards_atelier_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Exported site backup file.');
  };

  // Import JSON backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.content) updateContent(parsed.content);
        if (parsed.products) updateProducts(parsed.products);
        showToast('Backup restored into editor! Click Publish Live to commit.');
      } catch (err) {
        showToast('Invalid backup file format.');
      }
    };
    reader.readAsText(file);
  };

  // Add new empty product
  const handleAddNewProduct = () => {
    const newId = `artisan-${Date.now().toString(36)}`;
    const newProd: Product = {
      id: newId,
      name: "New Workshop Instrument",
      subtitle: "Hand-Graduated Master Workshop Setup",
      category: "instruments",
      instrumentType: "violin",
      price: 0,
      image: "/atelier/violin_moretti_front.jpg",
      badge: "Master Bench",
      origin: "Louisville Workshop",
      maker: "Matthew Lane Atelier",
      year: "2026",
      tonewood: "Aged Alpine Spruce & Flamed Bosnian Maple",
      varnish: "Amber Spirit & Oil Varnish",
      setup: "Aubert Mirecourt Bridge, Pirastro Strings",
      shortDesc: "Rich acoustic projection and velvety lower resonance calibrated by hand.",
      fullDesc: "Crafted with devotion at the Wallace Avenue workbench. Every plate thicknessed for acoustic truth and optimal nodal resonance.",
      features: [
        "100% Lifetime Trade-In Credit guaranteed",
        "Hand-graduated top and back plates",
        "Acoustic setup signed by Matthew Lane",
        "Complimentary protective case included"
      ],
      toneProfile: {
        warmth: 92,
        projection: 95,
        brilliance: 88,
        responsiveness: 94
      },
      inStock: true,
      trialEligible: true
    };
    addProduct(newProd);
    setSelectedProductId(newId);
    showToast('Added new instrument to catalog!');
  };

  // If not authenticated, show luxury lock screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#1A1A17] via-[#24231E] to-[#141412] text-[#FAF9F5] flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-[#D4AF37] selection:text-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-[#1F1E1B] border-2 border-[#D4AF37]/40 shadow-2xl rounded-2xl p-8 sm:p-10 relative overflow-hidden text-center"
        >
          {/* Subtle gold glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

          {/* Hallmark */}
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/10 text-[#D4AF37] mx-auto flex items-center justify-center mb-6 shadow-inner">
            <Lock size={26} />
          </div>

          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-1">
            Proprietor Access
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-2">
            Lane & Edwards Violins
          </h1>
          <p className="text-xs text-[#FAF9F5]/60 mb-8 font-sans">
            Master Luthier Content & Inventory Management Portal
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#FAF9F5]/70 mb-1.5">
                Atelier Passcode:
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Enter master passcode (e.g. stradivari)"
                className="w-full px-4 py-3 bg-[#141412] border border-[#FAF9F5]/20 rounded-xl text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertTriangle size={12} /> Invalid passcode. Try &lsquo;stradivari&rsquo; or click Demo Unlock.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#c49f2e] text-[#1A1A17] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock size={14} />
              <span>Enter Master Workbench</span>
            </button>
          </form>

          {/* Quick Demo Access Bypass Button */}
          <div className="mt-8 pt-6 border-t border-[#FAF9F5]/10 space-y-3">
            <button
              type="button"
              onClick={handleDemoUnlock}
              className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-[#FAF9F5]/20 rounded-xl text-xs text-[#FAF9F5]/80 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-[#D4AF37]" />
              <span>Quick Unlock (Proprietor Demo)</span>
            </button>

            <Link
              href="/"
              className="inline-block text-[11px] text-[#FAF9F5]/50 hover:text-[#D4AF37] transition-colors"
            >
              ← Return to Public Storefront
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Active product being edited
  const activeProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <div className="min-h-screen w-full bg-[#F5F2EB] text-[#1A1A17] flex flex-col selection:bg-[#9B7E58] selection:text-white font-sans">
      {/* Top Studio Control Bar */}
      <header className="sticky top-0 z-40 bg-[#1A1A17] text-[#FAF9F5] border-b-2 border-[#D4AF37]/30 px-4 sm:px-6 md:px-10 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A1A17] transition-all"
            title="Return to Public Storefront"
          >
            <Sparkles size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm sm:text-base tracking-wider text-white">
                LANE & EDWARDS
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-mono bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-bold">
                PROPRIETOR STUDIO
              </span>
            </div>
            <p className="text-[10px] text-[#FAF9F5]/60 hidden sm:block">
              Matthew Lane Workbench · Live Content & Photo Customizer
            </p>
          </div>
        </div>

        {/* Center: Save status */}
        <div className="flex items-center gap-2.5">
          {hasUnsavedChanges ? (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Unsaved Draft Changes
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1.5">
              <Check size={12} strokeWidth={3} />
              All Content Live {lastSaved && `(${lastSaved})`}
            </span>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
            className={`px-4 sm:px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
              hasUnsavedChanges
                ? 'bg-[#D4AF37] hover:bg-[#c49f2e] text-[#1A1A17] shadow-[#D4AF37]/20 scale-105'
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }`}
          >
            <Save size={14} />
            <span>Publish Live</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="p-2 sm:px-3 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Open Live Front Storefront"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Storefront</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Lock Atelier / Log Out"
          >
            <Lock size={15} />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Editor Column */}
        <div className="flex-1 flex flex-col overflow-y-auto w-full max-w-[1500px] mx-auto">
          {/* Tabs Navigation */}
          <div className="bg-[#FAF9F5] border-b border-[#1A1A17]/10 px-4 sm:px-8 pt-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'bento', label: 'Bento & Homepage', icon: Layers },
              { id: 'products', label: `Catalog (${products.length})`, icon: ShoppingBag },
              { id: 'story', label: 'Wallace Chronicle', icon: BookOpen },
              { id: 'testimonials', label: `Patron Reviews (${content.testimonials?.length || 5})`, icon: MessageSquare },
              { id: 'workshop', label: 'Workshop Info', icon: MapPin },
              { id: 'bookings', label: 'VIP Inquiries Inbox', icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as PortalTab)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#9B7E58] text-[#1A1A17] bg-white rounded-t-xl shadow-2xs'
                      : 'border-transparent text-[#1A1A17]/60 hover:text-[#1A1A17] hover:bg-white/50'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-[#9B7E58]' : ''} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Canvas */}
          <div className="p-4 sm:p-8 space-y-8 flex-1">
            {/* ----------------- TAB 1: BENTO & HOMEPAGE ----------------- */}
            {activeTab === 'bento' && (
              <div className="space-y-8">
                {/* Hero Announcement & Headline Card */}
                <div className="bg-white p-6 rounded-2xl border border-[#1A1A17]/15 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1A1A17]/10">
                    <h3 className="font-serif text-lg font-bold text-[#1A1A17] flex items-center gap-2">
                      <Sparkles size={16} className="text-[#9B7E58]" /> Homepage Hero Section
                    </h3>
                    <span className="text-[10px] font-mono uppercase text-[#9B7E58] font-bold">Top Headline & Badge</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A17]/80 mb-1">
                        Hallmark Badge (Upper Pill Banner):
                      </label>
                      <input
                        type="text"
                        value={content.announcementBadge}
                        onChange={(e) => updateContent({ announcementBadge: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-lg focus:outline-none focus:border-[#9B7E58]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A17]/80 mb-1">
                        Main Hero Headline:
                      </label>
                      <input
                        type="text"
                        value={content.heroTitle}
                        onChange={(e) => updateContent({ heroTitle: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm font-serif font-bold bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-lg focus:outline-none focus:border-[#9B7E58]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A17]/80 mb-1">
                        Hero Subtitle / Devotion Statement:
                      </label>
                      <textarea
                        rows={2}
                        value={content.heroSubtitle}
                        onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-lg focus:outline-none focus:border-[#9B7E58]"
                      />
                    </div>
                  </div>
                </div>

                {/* 9 Bento Hub Cards */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1A1A17]">All 9 Homepage Navigation Cards</h3>
                      <p className="text-xs text-[#1A1A17]/60">
                        Customize card titles, subtitles, story copy, button labels, and swap out the background photo for each volume.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {content.bentoItems.map((item: BentoCardItem, idx: number) => (
                      <div
                        key={item.id}
                        className="bg-white border border-[#1A1A17]/15 rounded-2xl p-5 hover:border-[#9B7E58] transition-all shadow-xs flex flex-col justify-between gap-4"
                      >
                        {/* Header & Category */}
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] font-bold text-[#9B7E58] block mb-0.5">
                              {item.category} · Card #{idx + 1}
                            </span>
                            <h4 className="font-serif text-lg font-bold text-[#1A1A17]">{item.title}</h4>
                          </div>

                          {/* Thumbnail with quick swap button */}
                          <div className="relative group/img shrink-0">
                            <div className="relative w-20 h-16 rounded-xl border border-[#1A1A17]/20 overflow-hidden bg-black/10">
                              {item.image ? (
                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">None</div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenSwapper(`Bento Card: ${item.title}`, item.image, (newUrl) => {
                                  updateContent((prev) => ({
                                    ...prev,
                                    bentoItems: prev.bentoItems.map((bi) =>
                                      bi.id === item.id ? { ...bi, image: newUrl } : bi
                                    ),
                                  }));
                                })
                              }
                              className="absolute inset-0 bg-[#1A1A17]/80 opacity-0 group-hover/img:opacity-100 rounded-xl transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold uppercase cursor-pointer"
                            >
                              <ImageIcon size={14} className="mb-0.5" />
                              <span>Swap</span>
                            </button>
                          </div>
                        </div>

                        {/* Fields */}
                        <div className="space-y-3 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/60 mb-0.5">
                              Card Title:
                            </label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateContent((prev) => ({
                                  ...prev,
                                  bentoItems: prev.bentoItems.map((bi) =>
                                    bi.id === item.id ? { ...bi, title: val } : bi
                                  ),
                                }));
                              }}
                              className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-semibold text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/60 mb-0.5">
                              Subtitle Tagline:
                            </label>
                            <input
                              type="text"
                              value={item.subtitle}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateContent((prev) => ({
                                  ...prev,
                                  bentoItems: prev.bentoItems.map((bi) =>
                                    bi.id === item.id ? { ...bi, subtitle: val } : bi
                                  ),
                                }));
                              }}
                              className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md text-xs font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/60 mb-0.5">
                              Modal Detailed Story / Description:
                            </label>
                            <textarea
                              rows={3}
                              value={item.description}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateContent((prev) => ({
                                  ...prev,
                                  bentoItems: prev.bentoItems.map((bi) =>
                                    bi.id === item.id ? { ...bi, description: val } : bi
                                  ),
                                }));
                              }}
                              className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md text-xs leading-relaxed"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/60 mb-0.5">
                                Button 1 Text:
                              </label>
                              <input
                                type="text"
                                value={item.action1}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateContent((prev) => ({
                                    ...prev,
                                    bentoItems: prev.bentoItems.map((bi) =>
                                      bi.id === item.id ? { ...bi, action1: val } : bi
                                    ),
                                  }));
                                }}
                                className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/60 mb-0.5">
                                Button 2 Text:
                              </label>
                              <input
                                type="text"
                                value={item.action2}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateContent((prev) => ({
                                    ...prev,
                                    bentoItems: prev.bentoItems.map((bi) =>
                                      bi.id === item.id ? { ...bi, action2: val } : bi
                                    ),
                                  }));
                                }}
                                className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Card Picture Swapper Action Button */}
                        <div className="pt-2 border-t border-[#1A1A17]/10 flex justify-between items-center">
                          <span className="text-[10px] text-[#1A1A17]/50 font-mono truncate max-w-[200px]">
                            {item.image || 'No image set'}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenSwapper(`Bento Card: ${item.title}`, item.image, (newUrl) => {
                                updateContent((prev) => ({
                                  ...prev,
                                  bentoItems: prev.bentoItems.map((bi) =>
                                    bi.id === item.id ? { ...bi, image: newUrl } : bi
                                  ),
                                }));
                              })
                            }
                            className="px-3 py-1 bg-[#1A1A17]/5 hover:bg-[#1A1A17] hover:text-white rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <ImageIcon size={12} />
                            <span>Change Card Photo</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB 2: PRODUCTS CATALOG ----------------- */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Catalog Controls Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#1A1A17]/15">
                  <div className="flex items-center gap-2 flex-wrap">
                    {['all', 'instruments', 'bows', 'strings', 'cases', 'accessories'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setProductCategoryFilter(cat)}
                        className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          productCategoryFilter === cat
                            ? 'bg-[#1A1A17] text-white shadow-xs'
                            : 'bg-[#FAF9F5] text-[#1A1A17]/70 hover:bg-[#1A1A17]/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search instrument..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="px-3 py-1.5 text-xs bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-lg w-44"
                    />
                    <button
                      type="button"
                      onClick={handleAddNewProduct}
                      className="px-4 py-2 bg-[#9B7E58] hover:bg-[#7A5B32] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Add Product</span>
                    </button>
                  </div>
                </div>

                {/* 2-Column Layout: Left product list, Right detail inspector */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Product Selector (5 cols) */}
                  <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
                    {products
                      .filter((p) => {
                        if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
                        if (productSearch.trim()) {
                          const q = productSearch.toLowerCase();
                          return p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q);
                        }
                        return true;
                      })
                      .map((prod) => {
                        const isSelected = prod.id === activeProduct.id;
                        return (
                          <div
                            key={prod.id}
                            onClick={() => setSelectedProductId(prod.id)}
                            className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 bg-white ${
                              isSelected
                                ? 'border-[#9B7E58] ring-2 ring-[#9B7E58]/20 shadow-md'
                                : 'border-[#1A1A17]/10 hover:border-[#1A1A17]/30'
                            }`}
                          >
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#1A1A17]/15 bg-black/5 shrink-0">
                              <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] uppercase font-mono font-bold text-[#9B7E58]">
                                  {prod.category}
                                </span>
                                {prod.badge && (
                                  <span className="text-[8.5px] px-1.5 py-0.2 bg-[#FAF8F2] text-[#7A5B32] border border-[#9B7E58]/30 rounded">
                                    {prod.badge}
                                  </span>
                                )}
                              </div>
                              <h5 className="font-serif text-xs font-bold text-[#1A1A17] truncate">{prod.name}</h5>
                              <p className="text-[10px] text-[#1A1A17]/60 truncate">{prod.subtitle}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-mono text-[11px] font-bold text-[#1A1A17]">
                                  {prod.price === 0 ? 'Consultation Price' : `$${prod.price.toLocaleString()}`}
                                </span>
                                {prod.inStock ? (
                                  <span className="text-[9px] text-emerald-700 font-semibold">● In Stock</span>
                                ) : (
                                  <span className="text-[9px] text-red-600 font-semibold">● Reserved</span>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Delete "${prod.name}" from catalog?`)) {
                                  deleteProduct(prod.id);
                                }
                              }}
                              className="p-1 text-[#1A1A17]/30 hover:text-red-600 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        );
                      })}
                  </div>

                  {/* Right Column: Active Product Editor (7 cols) */}
                  <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#1A1A17]/15 shadow-sm space-y-6">
                    {activeProduct ? (
                      <>
                        {/* Title & Picture Banner */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1A1A17]/10">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#9B7E58]">
                              Editing SKU: {activeProduct.id}
                            </span>
                            <h3 className="font-serif text-xl font-bold text-[#1A1A17]">{activeProduct.name}</h3>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="relative w-16 h-16 rounded-xl border-2 border-[#9B7E58] overflow-hidden bg-black/10 shrink-0">
                              <Image src={activeProduct.image} alt={activeProduct.name} fill className="object-cover" />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenSwapper(`Product: ${activeProduct.name}`, activeProduct.image, (newUrl) => {
                                  updateProduct(activeProduct.id, { image: newUrl });
                                })
                              }
                              className="px-3 py-1.5 bg-[#1A1A17] hover:bg-[#9B7E58] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <ImageIcon size={14} />
                              <span>Swap Photo</span>
                            </button>
                          </div>
                        </div>

                        {/* Basic Info Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                              Product Name:
                            </label>
                            <input
                              type="text"
                              value={activeProduct.name}
                              onChange={(e) => updateProduct(activeProduct.id, { name: e.target.value })}
                              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-serif text-sm font-bold"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                              Subtitle / Designation:
                            </label>
                            <input
                              type="text"
                              value={activeProduct.subtitle}
                              onChange={(e) => updateProduct(activeProduct.id, { subtitle: e.target.value })}
                              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                              Category:
                            </label>
                            <select
                              value={activeProduct.category}
                              onChange={(e) =>
                                updateProduct(activeProduct.id, {
                                  category: e.target.value as Product['category'],
                                })
                              }
                              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-semibold"
                            >
                              <option value="instruments">Instruments</option>
                              <option value="bows">Fine Bows</option>
                              <option value="strings">Concert Strings</option>
                              <option value="cases">Cases & Travel</option>
                              <option value="accessories">Luthier Care</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                              Instrument Family:
                            </label>
                            <select
                              value={activeProduct.instrumentType || 'all'}
                              onChange={(e) =>
                                updateProduct(activeProduct.id, {
                                  instrumentType: e.target.value as Product['instrumentType'],
                                })
                              }
                              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-semibold"
                            >
                              <option value="violin">Violin</option>
                              <option value="viola">Viola</option>
                              <option value="cello">Cello</option>
                              <option value="bass">Bass</option>
                              <option value="all">All / Universal</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                              Price (0 for Consultation / Call for Price):
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">$</span>
                              <input
                                type="number"
                                value={activeProduct.price}
                                onChange={(e) => updateProduct(activeProduct.id, { price: Number(e.target.value) })}
                                className="w-full pl-7 pr-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-mono"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                              Badge (e.g. Soloist Grade, Orchestral):
                            </label>
                            <input
                              type="text"
                              value={activeProduct.badge || ''}
                              onChange={(e) => updateProduct(activeProduct.id, { badge: e.target.value })}
                              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                              Origin & Workshop:
                            </label>
                            <input
                              type="text"
                              value={activeProduct.origin}
                              onChange={(e) => updateProduct(activeProduct.id, { origin: e.target.value })}
                              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                              Year of Creation / Vintage:
                            </label>
                            <input
                              type="text"
                              value={activeProduct.year || ''}
                              onChange={(e) => updateProduct(activeProduct.id, { year: e.target.value })}
                              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md"
                            />
                          </div>
                        </div>

                        {/* Artisanal Tonewood & Setup Specs */}
                        <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#1A1A17]/10 space-y-3 text-xs">
                          <h4 className="font-serif font-bold text-sm text-[#1A1A17]">Luthier Bench Specifications</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/60 mb-0.5">
                                Tonewood:
                              </label>
                              <input
                                type="text"
                                value={activeProduct.tonewood || ''}
                                onChange={(e) => updateProduct(activeProduct.id, { tonewood: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-white border border-[#1A1A17]/20 rounded text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/60 mb-0.5">
                                Varnish:
                              </label>
                              <input
                                type="text"
                                value={activeProduct.varnish || ''}
                                onChange={(e) => updateProduct(activeProduct.id, { varnish: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-white border border-[#1A1A17]/20 rounded text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/60 mb-0.5">
                                Bridge & Setup:
                              </label>
                              <input
                                type="text"
                                value={activeProduct.setup || ''}
                                onChange={(e) => updateProduct(activeProduct.id, { setup: e.target.value })}
                                className="w-full px-2.5 py-1.5 bg-white border border-[#1A1A17]/20 rounded text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Tone Sculptor (Innovation!) */}
                        {activeProduct.toneProfile && (
                          <ToneSculptor
                            toneProfile={activeProduct.toneProfile}
                            onChange={(newProfile) =>
                              updateProduct(activeProduct.id, { toneProfile: newProfile })
                            }
                          />
                        )}

                        {/* Descriptions & Luthier Copy Assistant */}
                        <div className="space-y-3 text-xs">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70">
                                Short Synopsis (Card preview):
                              </label>
                            </div>
                            <input
                              type="text"
                              value={activeProduct.shortDesc}
                              onChange={(e) => updateProduct(activeProduct.id, { shortDesc: e.target.value })}
                              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70">
                                Full Acoustic Narrative:
                              </label>
                            </div>
                            <textarea
                              rows={4}
                              value={activeProduct.fullDesc}
                              onChange={(e) => updateProduct(activeProduct.id, { fullDesc: e.target.value })}
                              className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md leading-relaxed"
                            />

                            {/* Luthier Copy Assistant Component */}
                            <LuthierCopyAssistant
                              onInsertText={(txt) => {
                                updateProduct(activeProduct.id, {
                                  fullDesc: activeProduct.fullDesc ? `${activeProduct.fullDesc} ${txt}` : txt,
                                });
                              }}
                            />
                          </div>
                        </div>

                        {/* Features Bullet List */}
                        <div className="space-y-2 text-xs">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70">
                            Key Bullet Features ({activeProduct.features.length}):
                          </label>
                          {activeProduct.features.map((feat, fidx) => (
                            <div key={fidx} className="flex gap-2">
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) => {
                                  const updated = [...activeProduct.features];
                                  updated[fidx] = e.target.value;
                                  updateProduct(activeProduct.id, { features: updated });
                                }}
                                className="flex-1 px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded text-xs"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = activeProduct.features.filter((_, i) => i !== fidx);
                                  updateProduct(activeProduct.id, { features: updated });
                                }}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              updateProduct(activeProduct.id, {
                                features: [...activeProduct.features, "New atelier guarantee feature"],
                              });
                            }}
                            className="text-[11px] text-[#9B7E58] font-bold hover:underline flex items-center gap-1 pt-1"
                          >
                            <Plus size={12} /> Add Feature Bullet
                          </button>
                        </div>

                        {/* Toggles */}
                        <div className="flex items-center gap-6 pt-3 border-t border-[#1A1A17]/10 text-xs">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={activeProduct.inStock}
                              onChange={(e) => updateProduct(activeProduct.id, { inStock: e.target.checked })}
                              className="accent-[#9B7E58] w-4 h-4 cursor-pointer"
                            />
                            <span className="font-bold text-[#1A1A17]">Available In Stock / Bench</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={activeProduct.trialEligible}
                              onChange={(e) => updateProduct(activeProduct.id, { trialEligible: e.target.checked })}
                              className="accent-[#9B7E58] w-4 h-4 cursor-pointer"
                            />
                            <span className="font-bold text-[#1A1A17]">Eligible for 7-Day In-Home Trial</span>
                          </label>
                        </div>
                      </>
                    ) : (
                      <div className="py-20 text-center text-gray-500">
                        Select a product from the left to edit or click Add Product.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB 3: THE CHRONICLE / STORY ----------------- */}
            {activeTab === 'story' && (
              <div className="space-y-8">
                {/* Header Information */}
                <div className="bg-white p-6 rounded-2xl border border-[#1A1A17]/15 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1A1A17]/10">
                    <h3 className="font-serif text-lg font-bold text-[#1A1A17]">
                      Volume 05 // The Wallace Avenue Chronicle Header
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                        Volume Tagline:
                      </label>
                      <input
                        type="text"
                        value={content.story.volumeTag}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            story: { ...prev.story, volumeTag: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                        Story Headline:
                      </label>
                      <input
                        type="text"
                        value={content.story.headline}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            story: { ...prev.story, headline: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-serif text-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                        Lead Subtitle:
                      </label>
                      <textarea
                        rows={2}
                        value={content.story.subtitle}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            story: { ...prev.story, subtitle: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Matthew at the Bench Section & Photo */}
                <div className="bg-white p-6 rounded-2xl border border-[#1A1A17]/15 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-[#1A1A17]/10">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#1A1A17]">
                        Featured Bench Portrait & Narrative
                      </h4>
                      <p className="text-xs text-[#1A1A17]/60">Matthew Lane hand-graduating plate thickness</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="relative w-20 h-16 rounded-xl border-2 border-[#9B7E58] overflow-hidden bg-black/10 shrink-0">
                        <Image
                          src={content.story.benchImage}
                          alt="Bench Photo"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenSwapper("Story Bench Photo", content.story.benchImage, (newUrl) => {
                            updateContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, benchImage: newUrl },
                            }));
                          })
                        }
                        className="px-3 py-1.5 bg-[#1A1A17] hover:bg-[#9B7E58] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ImageIcon size={14} />
                        <span>Swap Photo</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                          Bench Title Caption:
                        </label>
                        <input
                          type="text"
                          value={content.story.benchTitle}
                          onChange={(e) =>
                            updateContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, benchTitle: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70 mb-1">
                          Bench Subtitle Caption:
                        </label>
                        <input
                          type="text"
                          value={content.story.benchSubtitle}
                          onChange={(e) =>
                            updateContent((prev) => ({
                              ...prev,
                              story: { ...prev.story, benchSubtitle: e.target.value },
                            }))
                          }
                          className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md"
                        />
                      </div>
                    </div>

                    {/* Story Paragraphs */}
                    <div className="space-y-3 pt-3">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A17]/70">
                        Story Narrative Paragraphs:
                      </label>
                      {content.story.paragraphs.map((para: string, pidx: number) => (
                        <div key={pidx} className="space-y-1">
                          <span className="text-[10px] font-mono text-[#9B7E58] font-bold">
                            Paragraph #{pidx + 1}
                          </span>
                          <textarea
                            rows={3}
                            value={para}
                            onChange={(e) => {
                              const updated = [...content.story.paragraphs];
                              updated[pidx] = e.target.value;
                              updateContent((prev) => ({
                                ...prev,
                                story: { ...prev.story, paragraphs: updated },
                              }));
                            }}
                            className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md text-xs leading-relaxed"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* The Three Tenets */}
                <div className="bg-white p-6 rounded-2xl border border-[#1A1A17]/15 shadow-xs space-y-5">
                  <h4 className="font-serif text-lg font-bold text-[#1A1A17] pb-2 border-b border-[#1A1A17]/10">
                    The 3 Uncompromising Workshop Tenets
                  </h4>

                  {/* Tenet 1 */}
                  <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#1A1A17]/10 space-y-2 text-xs">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#9B7E58]">Tenet 01</span>
                    <input
                      type="text"
                      value={content.story.tenet1.title}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          story: {
                            ...prev.story,
                            tenet1: { ...prev.story.tenet1, title: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 bg-white border border-[#1A1A17]/20 rounded font-serif font-bold text-sm"
                    />
                    <textarea
                      rows={3}
                      value={content.story.tenet1.text}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          story: {
                            ...prev.story,
                            tenet1: { ...prev.story.tenet1, text: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#1A1A17]/20 rounded text-xs leading-relaxed"
                    />
                  </div>

                  {/* Tenet 2 */}
                  <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#1A1A17]/10 space-y-2 text-xs">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#9B7E58]">Tenet 02</span>
                    <input
                      type="text"
                      value={content.story.tenet2.title}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          story: {
                            ...prev.story,
                            tenet2: { ...prev.story.tenet2, title: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 bg-white border border-[#1A1A17]/20 rounded font-serif font-bold text-sm"
                    />
                    <textarea
                      rows={3}
                      value={content.story.tenet2.text}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          story: {
                            ...prev.story,
                            tenet2: { ...prev.story.tenet2, text: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#1A1A17]/20 rounded text-xs leading-relaxed"
                    />
                  </div>

                  {/* Tenet 3 (with Mark & Matt Photo) */}
                  <div className="p-4 bg-[#FAF9F5] rounded-xl border border-[#1A1A17]/10 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase text-[#9B7E58]">Tenet 03</span>
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-10 rounded border border-[#9B7E58] overflow-hidden">
                          <Image
                            src={content.story.tenet3.image}
                            alt="Mentorship Photo"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenSwapper(
                              "Tenet 3 Mentorship Photo",
                              content.story.tenet3.image,
                              (newUrl) => {
                                updateContent((prev) => ({
                                  ...prev,
                                  story: {
                                    ...prev.story,
                                    tenet3: { ...prev.story.tenet3, image: newUrl },
                                  },
                                }));
                              }
                            )
                          }
                          className="px-2.5 py-1 bg-[#1A1A17] text-white rounded text-[10px] font-bold uppercase"
                        >
                          Swap Photo
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={content.story.tenet3.title}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          story: {
                            ...prev.story,
                            tenet3: { ...prev.story.tenet3, title: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 bg-white border border-[#1A1A17]/20 rounded font-serif font-bold text-sm"
                    />
                    <textarea
                      rows={3}
                      value={content.story.tenet3.text}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          story: {
                            ...prev.story,
                            tenet3: { ...prev.story.tenet3, text: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#1A1A17]/20 rounded text-xs leading-relaxed"
                    />
                  </div>
                </div>

                {/* Master Quote Banner */}
                <div className="bg-white p-6 rounded-2xl border border-[#1A1A17]/15 shadow-xs space-y-3 text-xs">
                  <h4 className="font-serif text-base font-bold text-[#1A1A17]">Matthew Lane Workshop Quote</h4>
                  <textarea
                    rows={3}
                    value={content.story.masterQuote.quote}
                    onChange={(e) =>
                      updateContent((prev) => ({
                        ...prev,
                        story: {
                          ...prev.story,
                          masterQuote: { ...prev.story.masterQuote, quote: e.target.value },
                        },
                      }))
                    }
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md italic"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={content.story.masterQuote.author}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          story: {
                            ...prev.story,
                            masterQuote: { ...prev.story.masterQuote, author: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded font-bold"
                    />
                    <input
                      type="text"
                      value={content.story.masterQuote.role}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          story: {
                            ...prev.story,
                            masterQuote: { ...prev.story.masterQuote, role: e.target.value },
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB 4: TESTIMONIALS ----------------- */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-5 rounded-2xl border border-[#1A1A17]/15">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1A1A17]">
                      Patron Reviews & Orchestral Testimonials
                    </h3>
                    <p className="text-xs text-[#1A1A17]/60">
                      Manage concertmaster quotes, artist endorsements, and verified patron credentials displayed on the homepage folio.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newT: TestimonialItem = {
                        author: "New Patron",
                        signature: "New Patron",
                        role: "Orchestral Musician",
                        credential: "Verified Patron · Master Instrument Setup",
                        tag: "Concert Artist",
                        year: "Patron Since 2026",
                        quote: "Matthew's bench calibration gave my instrument incredible acoustic projection and velvety resonance.",
                      };
                      updateContent((prev) => ({
                        ...prev,
                        testimonials: [...prev.testimonials, newT],
                      }));
                      showToast('Added new testimonial!');
                    }}
                    className="px-4 py-2 bg-[#9B7E58] hover:bg-[#7A5B32] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus size={14} />
                    <span>Add Review</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.testimonials.map((t: TestimonialItem, tidx: number) => (
                    <div
                      key={tidx}
                      className="bg-white p-5 rounded-xl border border-[#1A1A17]/15 hover:border-[#9B7E58] transition-all shadow-xs space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-[#9B7E58]">
                          Review #{tidx + 1} · {t.author}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete review by ${t.author}?`)) {
                              updateContent((prev) => ({
                                ...prev,
                                testimonials: prev.testimonials.filter((_, i) => i !== tidx),
                              }));
                            }
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/60 mb-0.5">
                            Author Name:
                          </label>
                          <input
                            type="text"
                            value={t.author}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateContent((prev) => {
                                const nextT = [...prev.testimonials];
                                nextT[tidx] = { ...nextT[tidx], author: val, signature: val };
                                return { ...prev, testimonials: nextT };
                              });
                            }}
                            className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/60 mb-0.5">
                            Role / Title:
                          </label>
                          <input
                            type="text"
                            value={t.role}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateContent((prev) => {
                                const nextT = [...prev.testimonials];
                                nextT[tidx] = { ...nextT[tidx], role: val };
                                return { ...prev, testimonials: nextT };
                              });
                            }}
                            className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/60 mb-0.5">
                            Tag / Badge:
                          </label>
                          <input
                            type="text"
                            value={t.tag}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateContent((prev) => {
                                const nextT = [...prev.testimonials];
                                nextT[tidx] = { ...nextT[tidx], tag: val };
                                return { ...prev, testimonials: nextT };
                              });
                            }}
                            className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/60 mb-0.5">
                            Credential Line:
                          </label>
                          <input
                            type="text"
                            value={t.credential}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateContent((prev) => {
                                const nextT = [...prev.testimonials];
                                nextT[tidx] = { ...nextT[tidx], credential: val };
                                return { ...prev, testimonials: nextT };
                              });
                            }}
                            className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/60 mb-0.5">
                            Patron Since Year:
                          </label>
                          <input
                            type="text"
                            value={t.year}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateContent((prev) => {
                                const nextT = [...prev.testimonials];
                                nextT[tidx] = { ...nextT[tidx], year: val };
                                return { ...prev, testimonials: nextT };
                              });
                            }}
                            className="w-full px-3 py-1.5 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/60 mb-0.5">
                          Quote Body:
                        </label>
                        <textarea
                          rows={2}
                          value={t.quote}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateContent((prev) => {
                              const nextT = [...prev.testimonials];
                              nextT[tidx] = { ...nextT[tidx], quote: val };
                              return { ...prev, testimonials: nextT };
                            });
                          }}
                          className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded italic leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------- TAB 5: WORKSHOP INFO ----------------- */}
            {activeTab === 'workshop' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-[#1A1A17]/15 shadow-xs space-y-4 text-xs">
                  <h3 className="font-serif text-lg font-bold text-[#1A1A17] pb-3 border-b border-[#1A1A17]/10">
                    Workshop & Atelier Location Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/70 mb-1">
                        Shop Name:
                      </label>
                      <input
                        type="text"
                        value={content.workshop.shopName}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            workshop: { ...prev.workshop, shopName: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/70 mb-1">
                        Heritage Tagline:
                      </label>
                      <input
                        type="text"
                        value={content.workshop.tagline}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            workshop: { ...prev.workshop, tagline: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/70 mb-1">
                        Phone Number:
                      </label>
                      <input
                        type="text"
                        value={content.workshop.phoneFormatted}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            workshop: { ...prev.workshop, phoneFormatted: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/70 mb-1">
                        Contact Email:
                      </label>
                      <input
                        type="email"
                        value={content.workshop.email}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            workshop: { ...prev.workshop, email: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/70 mb-1">
                        Street Address:
                      </label>
                      <input
                        type="text"
                        value={content.workshop.address}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            workshop: { ...prev.workshop, address: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/70 mb-1">
                        Workshop Hours & Days:
                      </label>
                      <input
                        type="text"
                        value={content.workshop.hours}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            workshop: { ...prev.workshop, hours: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-[#1A1A17]/70 mb-1">
                        Vagaro Online Booking URL:
                      </label>
                      <input
                        type="url"
                        value={content.workshop.vagaroUrl}
                        onChange={(e) =>
                          updateContent((prev) => ({
                            ...prev,
                            workshop: { ...prev.workshop, vagaroUrl: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Backup & System Controls */}
                <div className="bg-white p-6 rounded-2xl border border-[#1A1A17]/15 shadow-xs space-y-4">
                  <h4 className="font-serif text-base font-bold text-[#1A1A17] pb-2 border-b border-[#1A1A17]/10">
                    Atelier Safety, Backups & Factory Reset
                  </h4>
                  <p className="text-xs text-[#1A1A17]/70">
                    Export a full backup file of all customized descriptions, product specs, and photos, or restore to shop default settings anytime.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleExportBackup}
                      className="px-4 py-2 bg-[#1A1A17] hover:bg-[#9B7E58] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download size={14} />
                      <span>Export Backup File</span>
                    </button>

                    <label className="px-4 py-2 border border-[#1A1A17]/30 hover:bg-[#1A1A17]/5 text-[#1A1A17] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer">
                      <Upload size={14} />
                      <span>Restore Backup</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportBackup}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setConfirmResetOpen(true)}
                      className="px-4 py-2 text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <RotateCcw size={14} />
                      <span>Reset to Factory Defaults</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB 6: VIP INQUIRIES INBOX ----------------- */}
            {activeTab === 'bookings' && <PortalBookingsInbox />}
          </div>
        </div>
      </div>

      {/* Image Swapper Modal */}
      {swapperTarget && (
        <AtelierImageSwapperModal
          isOpen={swapperOpen}
          onClose={() => setSwapperOpen(false)}
          currentImage={swapperTarget.currentImage}
          itemTitle={swapperTarget.title}
          onSelectImage={(newUrl) => {
            swapperTarget.onApply(newUrl);
            showToast('Photo updated! Click Publish Live to commit.');
          }}
        />
      )}

      {/* Confirmation Modal for Reset */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border-2 border-red-200 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1A1A17]">Reset to Workshop Defaults?</h3>
            <p className="text-xs text-[#1A1A17]/70">
              This will restore all 9 bento cards, descriptions, photos, and boutique instruments to their original workshop state. Any custom edits will be reverted.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmResetOpen(false)}
                className="flex-1 py-2.5 border border-gray-300 rounded-lg text-xs font-bold uppercase tracking-wider text-[#1A1A17]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-[700] px-5 py-3 rounded-xl bg-[#1A1A17] text-[#FAF9F5] border border-[#D4AF37]/50 shadow-2xl flex items-center gap-2.5 text-xs font-semibold"
          >
            <Sparkles size={14} className="text-[#D4AF37] shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
