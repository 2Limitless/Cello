"use client";

import React, { useState, useEffect } from 'react';
import { VIPBooking, VIPBookingStatus } from '@/context/CartContext';
import { Calendar, Phone, Mail, User, CheckCircle2, Clock, Trash2, Search, Filter, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

export function PortalBookingsInbox() {
  const [bookings, setBookings] = useState<VIPBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | VIPBookingStatus>('all');
  const [selectedBooking, setSelectedBooking] = useState<VIPBooking | null>(null);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        if (data.bookings) {
          setBookings(data.bookings);
        }
      }
    } catch (e) {
      console.error('Failed fetching bookings:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, status: VIPBookingStatus) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
        if (selectedBooking?.id === id) {
          setSelectedBooking((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this consultation record?')) return;
    try {
      const res = await fetch(`/api/bookings?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        if (selectedBooking?.id === id) setSelectedBooking(null);
      }
    } catch (e) {
      console.error('Error deleting booking:', e);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return (
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.toLowerCase().includes(q) ||
        b.productName.toLowerCase().includes(q) ||
        (b.customerEmail && b.customerEmail.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getStatusBadge = (status: VIPBookingStatus) => {
    switch (status) {
      case 'acquired':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">✦ Acquired</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-300">Completed</span>;
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-300">Cancelled</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">● Scheduled</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FAF8F2] p-6 rounded-2xl border border-[#1A1A17]/15">
        <div>
          <div className="flex items-center gap-2 text-[#9B7E58] mb-1">
            <Calendar size={16} />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">VIP Concierge Desk</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1A1A17]">Instrument Auditions & Inquiries</h3>
          <p className="text-xs text-[#1A1A17]/70 font-sans mt-0.5">
            Real-time player trial requests and bench consultation passes submitted by patrons.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBookings}
            className="p-2 bg-white hover:bg-[#1A1A17] hover:text-white border border-[#1A1A17]/20 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            title="Refresh bookings"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            <span className="text-xs font-semibold">Refresh</span>
          </button>

          <div className="px-4 py-2 bg-white border border-[#1A1A17]/15 rounded-xl text-center shadow-xs">
            <span className="text-[10px] uppercase font-mono text-[#9B7E58] font-bold block">Total Inquiries</span>
            <span className="font-serif text-xl font-bold text-[#1A1A17]">{bookings.length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['all', 'scheduled', 'acquired', 'completed', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#1A1A17] text-white shadow-xs'
                  : 'bg-white text-[#1A1A17]/70 hover:bg-[#1A1A17]/10 border border-[#1A1A17]/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A17]/40" />
          <input
            type="text"
            placeholder="Search patron, phone, instrument..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#1A1A17]/20 rounded-lg focus:outline-none focus:border-[#9B7E58]"
          />
        </div>
      </div>

      {/* Bookings List */}
      {isLoading ? (
        <div className="p-12 text-center bg-white border border-[#1A1A17]/10 rounded-2xl">
          <p className="text-xs text-[#1A1A17]/60 font-mono animate-pulse">Loading atelier inquiries...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="p-12 text-center bg-white border border-[#1A1A17]/10 rounded-2xl">
          <p className="font-serif text-lg text-[#1A1A17]">No inquiries matching this view</p>
          <p className="text-xs text-[#1A1A17]/60 mt-1">New player trial submissions will appear here automatically.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-[#1A1A17]/15 rounded-xl p-5 hover:border-[#9B7E58] transition-all shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-[10px] text-[#9B7E58] font-bold px-2 py-0.5 bg-[#9B7E58]/10 rounded border border-[#9B7E58]/20">
                    {b.id}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#1A1A17]">{b.customerName}</h4>
                  {getStatusBadge(b.status)}
                  <span className="text-[11px] text-[#1A1A17]/50 font-mono">
                    {new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#1A1A17]/80 flex-wrap">
                  <span className="font-semibold text-[#7A5B32] flex items-center gap-1">
                    <Sparkles size={12} /> {b.productName}
                  </span>
                  <span>·</span>
                  <a href={`tel:${b.customerPhone}`} className="hover:underline flex items-center gap-1 font-mono">
                    <Phone size={12} className="text-[#9B7E58]" /> {b.customerPhone}
                  </a>
                  {b.customerEmail && (
                    <>
                      <span>·</span>
                      <a href={`mailto:${b.customerEmail}`} className="hover:underline flex items-center gap-1">
                        <Mail size={12} className="text-[#9B7E58]" /> {b.customerEmail}
                      </a>
                    </>
                  )}
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#1A1A17]/60">
                    <Clock size={12} /> {b.preferredDate} ({b.preferredTime})
                  </span>
                </div>

                {b.notes && (
                  <p className="text-xs text-[#1A1A17]/70 italic bg-[#FAF8F2] p-2.5 rounded-lg border border-[#1A1A17]/10 mt-2">
                    &ldquo;{b.notes}&rdquo;
                  </p>
                )}
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                <select
                  value={b.status}
                  onChange={(e) => handleUpdateStatus(b.id, e.target.value as VIPBookingStatus)}
                  className="text-xs bg-[#FAF9F5] border border-[#1A1A17]/20 rounded-md px-2.5 py-1.5 font-semibold focus:outline-none focus:border-[#9B7E58] cursor-pointer"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="acquired">✦ Acquired (Sold)</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleDelete(b.id)}
                  className="p-1.5 text-[#1A1A17]/40 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete record"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
