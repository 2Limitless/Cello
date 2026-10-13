"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Upload, Link as LinkIcon, Image as ImageIcon, Search, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { ATELIER_GALLERY, GalleryImage } from '@/data/atelierGallery';

interface AtelierImageSwapperModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  itemTitle: string;
  onSelectImage: (newUrl: string) => void;
}

export function AtelierImageSwapperModal({
  isOpen,
  onClose,
  currentImage,
  itemTitle,
  onSelectImage,
}: AtelierImageSwapperModalProps) {
  const [activeTab, setActiveTab] = useState<'vault' | 'upload' | 'url'>('vault');
  const [selectedImage, setSelectedImage] = useState<string>(currentImage);
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'instruments' | 'bows-cases' | 'workshop-bench' | 'legacy-store'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const filteredGallery = ATELIER_GALLERY.filter((img) => {
    if (galleryFilter !== 'all' && img.category !== galleryFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return img.name.toLowerCase().includes(q) || img.description.toLowerCase().includes(q);
    }
    return true;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/portal/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setSelectedImage(data.url);
      } else {
        setUploadError(data.error || 'Failed to upload photo');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload network error';
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleApply = () => {
    if (activeTab === 'url' && customUrl.trim()) {
      onSelectImage(customUrl.trim());
    } else {
      onSelectImage(selectedImage);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1A17]/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] bg-[#FAF9F5] border-2 border-[#1A1A17] shadow-2xl flex flex-col rounded-2xl md:rounded-3xl overflow-hidden text-[#1A1A17]"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#1A1A17] text-[#FAF9F5] flex items-center justify-between border-b border-[#FAF9F5]/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <ImageIcon size={16} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wide">Swap Atelier Photograph</h3>
                <p className="text-xs text-[#FAF9F5]/60 font-sans truncate max-w-md">
                  Updating picture for: <span className="text-[#D4AF37] font-semibold">{itemTitle}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#1A1A17]/10 bg-[#FAF9F5] px-6 pt-3 gap-2">
            <button
              onClick={() => setActiveTab('vault')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'vault'
                  ? 'border-[#9B7E58] text-[#1A1A17] bg-white rounded-t-lg'
                  : 'border-transparent text-[#1A1A17]/60 hover:text-[#1A1A17]'
              }`}
            >
              <Sparkles size={14} className="text-[#9B7E58]" />
              <span>Atelier Photo Vault ({ATELIER_GALLERY.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'upload'
                  ? 'border-[#9B7E58] text-[#1A1A17] bg-white rounded-t-lg'
                  : 'border-transparent text-[#1A1A17]/60 hover:text-[#1A1A17]'
              }`}
            >
              <Upload size={14} className="text-[#9B7E58]" />
              <span>Upload Custom Photo</span>
            </button>

            <button
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'url'
                  ? 'border-[#9B7E58] text-[#1A1A17] bg-white rounded-t-lg'
                  : 'border-transparent text-[#1A1A17]/60 hover:text-[#1A1A17]'
              }`}
            >
              <LinkIcon size={14} className="text-[#9B7E58]" />
              <span>Paste Image URL</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 min-h-[380px] max-h-[55vh]">
            {/* TAB 1: VAULT */}
            {activeTab === 'vault' && (
              <div className="space-y-4">
                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-[#1A1A17]/10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      { id: 'all', label: 'All Photos' },
                      { id: 'instruments', label: 'Violins & Cellos' },
                      { id: 'bows-cases', label: 'Bows & Cases' },
                      { id: 'workshop-bench', label: 'Bench & Craft' },
                      { id: 'legacy-store', label: 'Story & Heritage' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setGalleryFilter(f.id as typeof galleryFilter)}
                        className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                          galleryFilter === f.id
                            ? 'bg-[#1A1A17] text-white shadow-xs'
                            : 'bg-[#1A1A17]/5 text-[#1A1A17]/70 hover:bg-[#1A1A17]/10'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A17]/40" />
                    <input
                      type="text"
                      placeholder="Search photos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#1A1A17]/20 rounded-md focus:outline-none focus:border-[#9B7E58]"
                    />
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {filteredGallery.map((img: GalleryImage) => {
                    const isSelected = selectedImage === img.src;
                    return (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setSelectedImage(img.src)}
                        className={`group text-left rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col bg-white relative ${
                          isSelected
                            ? 'border-[#9B7E58] ring-2 ring-[#9B7E58]/30 shadow-md'
                            : 'border-[#1A1A17]/10 hover:border-[#1A1A17]/40 shadow-xs'
                        }`}
                      >
                        <div className="relative aspect-4/3 w-full bg-[#1A1A17]/5 overflow-hidden">
                          <Image
                            src={img.src}
                            alt={img.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-[#9B7E58]/20 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-[#1A1A17] text-[#D4AF37] flex items-center justify-center shadow-lg">
                                <Check size={18} strokeWidth={3} />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="p-2.5 flex-1 flex flex-col justify-between">
                          <p className="font-serif text-xs font-bold line-clamp-1 text-[#1A1A17]">{img.name}</p>
                          <p className="text-[10px] text-[#1A1A17]/60 line-clamp-1 mt-0.5">{img.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: UPLOAD */}
            {activeTab === 'upload' && (
              <div className="max-w-xl mx-auto py-6 flex flex-col items-center text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-[#9B7E58]/50 hover:border-[#9B7E58] bg-[#FAF8F2] rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors group shadow-inner"
                >
                  <div className="w-16 h-16 rounded-full bg-[#9B7E58]/10 group-hover:bg-[#9B7E58]/20 text-[#9B7E58] flex items-center justify-center mb-4 transition-colors">
                    {isUploading ? <Loader2 size={28} className="animate-spin" /> : <Upload size={28} />}
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#1A1A17] mb-1">
                    {isUploading ? 'Uploading to Atelier...' : 'Click to Upload Workshop Photograph'}
                  </h4>
                  <p className="text-xs text-[#1A1A17]/60 max-w-sm mb-4">
                    Supports high-resolution JPG, PNG, WEBP, or SVG images. File will be saved securely to the workshop media folder.
                  </p>

                  <button
                    type="button"
                    disabled={isUploading}
                    className="px-5 py-2.5 bg-[#1A1A17] hover:bg-[#9B7E58] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-sm"
                  >
                    Select File From Device
                  </button>
                </div>

                {uploadError && (
                  <p className="text-xs text-red-600 font-semibold mt-3 bg-red-50 px-4 py-2 rounded-md border border-red-200">
                    {uploadError}
                  </p>
                )}
              </div>
            )}

            {/* TAB 3: URL */}
            {activeTab === 'url' && (
              <div className="max-w-xl mx-auto py-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1A17] mb-2">
                  External Image URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/violin_photo.jpg"
                    value={customUrl}
                    onChange={(e) => {
                      setCustomUrl(e.target.value);
                      if (e.target.value.trim().startsWith('http')) {
                        setSelectedImage(e.target.value.trim());
                      }
                    }}
                    className="flex-1 px-4 py-2.5 text-xs bg-white border border-[#1A1A17]/20 rounded-md focus:outline-none focus:border-[#9B7E58]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customUrl.trim()) setSelectedImage(customUrl.trim());
                    }}
                    className="px-4 py-2.5 bg-[#1A1A17] hover:bg-[#9B7E58] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors"
                  >
                    Preview
                  </button>
                </div>
                <p className="text-[11px] text-[#1A1A17]/60 mt-2">
                  Enter any direct image address. Ensure the image is publicly accessible with CORS enabled.
                </p>
              </div>
            )}
          </div>

          {/* Footer: Before / After Preview & Action Button */}
          <div className="px-6 py-4 bg-[#F2EDE2] border-t border-[#1A1A17]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Before vs After Preview */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="relative w-12 h-12 rounded-lg border border-[#1A1A17]/20 overflow-hidden bg-black/10 shrink-0">
                  {currentImage ? (
                    <Image src={currentImage} alt="Current" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">None</div>
                  )}
                </div>
                <div className="hidden xs:block text-[11px]">
                  <span className="text-[#1A1A17]/50 block font-mono uppercase text-[9px]">Current</span>
                  <span className="font-semibold text-[#1A1A17] truncate max-w-[100px] block">Active Photo</span>
                </div>
              </div>

              <ArrowRight size={14} className="text-[#9B7E58] shrink-0" />

              <div className="flex items-center gap-2">
                <div className="relative w-12 h-12 rounded-lg border-2 border-[#9B7E58] overflow-hidden bg-black/10 shrink-0 shadow-xs">
                  {selectedImage ? (
                    <Image src={selectedImage} alt="Selected" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">None</div>
                  )}
                </div>
                <div className="text-[11px]">
                  <span className="text-[#9B7E58] font-mono uppercase text-[9px] font-bold">New Selection</span>
                  <span className="font-bold text-[#1A1A17] truncate max-w-[120px] block">Ready to Apply</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 border border-[#1A1A17]/30 hover:bg-[#1A1A17]/5 text-[#1A1A17] text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={!selectedImage}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#1A1A17] hover:bg-[#9B7E58] text-white text-xs font-bold uppercase tracking-widest rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Check size={14} />
                <span>Apply New Photo</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
