"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Trash2,
  Copy,
  Check,
  Download,
  PlusCircle,
  FileText,
  BadgeDollarSign,
  Lock,
  Smartphone,
  Mail
} from 'lucide-react';
import { useCart, VIPBookingStatus } from '@/context/CartContext';

export function CommissionLedgerModal() {
  const {
    isLedgerOpen,
    setIsLedgerOpen,
    vipBookings,
    updateBookingStatus,
    removeBooking,
    addVIPBooking,
    partnerPhone,
    setPartnerPhone,
    partnerEmail,
    setPartnerEmail
  } = useCart();

  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('le_ledger_unlocked') === 'true';
    }
    return false;
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [copiedSummary, setCopiedSummary] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddingManual, setIsAddingManual] = useState(false);
  const [isEditingAlerts, setIsEditingAlerts] = useState(false);
  const [myPhone, setMyPhone] = useState(partnerPhone || '');
  const [myEmail, setMyEmail] = useState(partnerEmail || '');
  const [savedAlertFeedback, setSavedAlertFeedback] = useState(false);

  // Manual Add Form State
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualInstrument, setManualInstrument] = useState('Guarneri del Gesù 1742 Tribute');
  const [manualPrice, setManualPrice] = useState(4850);
  const [manualDate, setManualDate] = useState('This Saturday');

  // Calculations
  const metrics = useMemo(() => {
    const totalLeads = vipBookings.length;
    const totalPipelineValue = vipBookings.reduce((sum, b) => sum + b.productPrice, 0);
    const potentialCommission = Math.round(totalPipelineValue * 0.05 * 100) / 100;

    const acquiredBookings = vipBookings.filter(b => b.status === 'acquired');
    const realizedSalesValue = acquiredBookings.reduce((sum, b) => sum + b.productPrice, 0);
    const realizedCommission = Math.round(realizedSalesValue * 0.05 * 100) / 100;

    const scheduledCount = vipBookings.filter(b => b.status === 'scheduled').length;
    const completedCount = vipBookings.filter(b => b.status === 'completed').length;
    const acquiredCount = acquiredBookings.length;

    return {
      totalLeads,
      totalPipelineValue,
      potentialCommission,
      realizedSalesValue,
      realizedCommission,
      scheduledCount,
      completedCount,
      acquiredCount
    };
  }, [vipBookings]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '4899') {
      setIsUnlocked(true);
      setPinError(false);
      setPinInput('');
      try {
        sessionStorage.setItem('le_ledger_unlocked', 'true');
      } catch {
        // ignore
      }
    } else {
      setPinError(true);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem('le_ledger_unlocked');
    } catch {
      // ignore
    }
  };

  if (!isLedgerOpen) return null;

  if (!isUnlocked) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-[290] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLedgerOpen(false)}
            className="fixed inset-0 bg-[#1A1A17]/85 backdrop-blur-md cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-md bg-[#FAF9F5] border-4 border-[#1A1A17] shadow-2xl p-8 rounded-2xl text-center space-y-6"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-[#1A1A17] text-[#9B7E58] flex items-center justify-center border-2 border-[#9B7E58]">
              <Lock size={24} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#9B7E58] block">
                Private Partner Access
              </span>
              <h3 className="font-serif text-3xl text-[#1A1A17] mt-1">
                Enter Security PIN
              </h3>
              <p className="text-xs text-[#1A1A17]/65 mt-1 font-light">
                Affiliate calculations and commission statements are confidential.
              </p>
            </div>
            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="password"
                maxLength={8}
                autoFocus
                required
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="••••"
                className="w-full text-center tracking-[0.4em] font-mono text-2xl py-3 px-4 bg-white border-2 border-[#1A1A17] outline-none shadow-[3px_3px_0px_#1A1A17]"
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-bold">Incorrect PIN code.</p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsLedgerOpen(false)}
                  className="w-1/3 py-3 border-2 border-[#1A1A17] text-xs uppercase font-bold tracking-wider hover:bg-[#1A1A17]/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 bg-[#1A1A17] text-white hover:bg-[#9B7E58] text-xs uppercase font-bold tracking-wider transition-colors shadow-[3px_3px_0px_#9B7E58] cursor-pointer"
                >
                  Unlock Ledger
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  const filteredList = vipBookings.filter(b => {
    if (filterStatus === 'all') return true;
    return b.status === filterStatus;
  });

  const handleCopySettlement = () => {
    const lines = [
      "========================================",
      "LANE & EDWARDS VIOLINS // AFFILIATE LEDGER",
      "Barter Deal & 5% Website Acquisition Summary",
      `Date Generated: ${new Date().toLocaleDateString('en-US')}`,
      "========================================",
      "",
      `Total Online Trial Bookings: ${metrics.totalLeads}`,
      `Total Inventory Pipeline: $${metrics.totalPipelineValue.toLocaleString()}`,
      `Potential 5% Commission: $${metrics.potentialCommission.toLocaleString()}`,
      `Confirmed Acquisitions: ${metrics.acquiredCount} instrument(s)`,
      `Total Confirmed Sales: $${metrics.realizedSalesValue.toLocaleString()}`,
      `>>> REALIZED 5% COMMISSION DUE: $${metrics.realizedCommission.toLocaleString()} <<<`,
      "",
      "--- VERIFIED PASS AUDIT TRAIL ---",
      ...vipBookings.map((b, idx) => 
        `[${idx + 1}] Pass: ${b.id} | Status: ${b.status.toUpperCase()} | Musician: ${b.customerName} (${b.customerPhone}) | Item: ${b.productName} ($${b.productPrice.toLocaleString()}) | 5% Cut: $${b.commissionAmount.toFixed(2)}`
      ),
      "",
      "Workshop: 315 Wallace Ave, Louisville, KY 40207"
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleExportCSV = () => {
    const headers = ["Pass ID", "Status", "Customer Name", "Phone", "Email", "Instrument", "Instrument Price", "5% Commission", "Scheduled Date", "Created At"];
    const rows = vipBookings.map(b => [
      b.id,
      b.status,
      `"${b.customerName}"`,
      `"${b.customerPhone}"`,
      `"${b.customerEmail || ''}"`,
      `"${b.productName}"`,
      b.productPrice,
      b.commissionAmount,
      `"${b.preferredDate} ${b.preferredTime}"`,
      `"${b.createdAt}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lane_edwards_5percent_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;

    addVIPBooking({
      customerName: manualName,
      customerPhone: manualPhone,
      musicianLevel: 'Walk-In / Phone Lead',
      preferredDate: manualDate,
      preferredTime: '12:00 PM',
      notes: 'Manually logged referral lead',
      productId: 'manual-entry',
      productName: manualInstrument,
      productPrice: Number(manualPrice) || 3000,
    });

    setIsAddingManual(false);
    setManualName('');
    setManualPhone('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[290] flex items-center justify-center p-2 sm:p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsLedgerOpen(false)}
          className="fixed inset-0 bg-[#1A1A17]/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative z-10 w-full max-w-6xl max-h-[94vh] bg-[#FAF9F5] border-4 border-[#1A1A17] shadow-2xl flex flex-col overflow-hidden md:rounded-[32px]"
        >
          {/* Header */}
          <div className="bg-[#1A1A17] text-white p-6 border-b-2 border-[#9B7E58] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
            <div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9B7E58] font-bold">
                  Private Affiliate System // Barter & Commission Tracker
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white mt-1">
                5% Instrument Commission Ledger
              </h3>
              <p className="text-xs text-white/70 font-light mt-0.5">
                Tracks all VIP playing sessions booked via the site. Verified pass codes give you proof for your 5% cut with Matt Lane.
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handleCopySettlement}
                className="px-4 py-2.5 bg-[#9B7E58] text-[#1A1A17] hover:bg-white text-xs uppercase tracking-wider font-bold transition-all shadow flex items-center gap-2 cursor-pointer"
              >
                {copiedSummary ? (
                  <>
                    <Check size={14} className="text-emerald-900" />
                    <span>Copied Statement!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Statement for Matt</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Download CSV"
              >
                <Download size={14} />
                <span className="hidden md:inline">Export CSV</span>
              </button>

              <button
                onClick={handleLock}
                className="px-3 py-2.5 bg-white/10 hover:bg-rose-900/60 text-white text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="Lock confidential ledger"
              >
                <Lock size={13} />
                <span className="hidden md:inline">Lock</span>
              </button>

              <button
                onClick={() => setIsLedgerOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer ml-1"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* KPI Dashboard Cards */}
          <div className="p-6 md:p-8 border-b-2 border-[#1A1A17]/10 bg-white grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
            {/* Card 1: Realized 5% Cut Due */}
            <div className="bg-[#FAF9F5] border-2 border-[#1A1A17] p-5 shadow-[4px_4px_0px_#1A1A17]">
              <div className="flex justify-between items-center text-[#1A1A17]/60 text-xs uppercase tracking-wider font-bold mb-1">
                <span>Earned 5% Cut</span>
                <BadgeDollarSign size={16} className="text-emerald-700" />
              </div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-emerald-800">
                ${metrics.realizedCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-[#1A1A17]/70 mt-1 font-mono">
                From {metrics.acquiredCount} acquired instrument(s)
              </p>
            </div>

            {/* Card 2: Total Pipeline Value */}
            <div className="bg-[#FAF9F5] border-2 border-[#1A1A17] p-5 shadow-[4px_4px_0px_#1A1A17]">
              <div className="flex justify-between items-center text-[#1A1A17]/60 text-xs uppercase tracking-wider font-bold mb-1">
                <span>Pipeline Value</span>
                <DollarSign size={16} className="text-[#9B7E58]" />
              </div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A17]">
                ${metrics.totalPipelineValue.toLocaleString()}
              </div>
              <p className="text-[11px] text-[#1A1A17]/70 mt-1 font-mono">
                Active held inventory
              </p>
            </div>

            {/* Card 3: Potential 5% Pipeline */}
            <div className="bg-[#FAF9F5] border-2 border-[#1A1A17] p-5 shadow-[4px_4px_0px_#1A1A17]">
              <div className="flex justify-between items-center text-[#1A1A17]/60 text-xs uppercase tracking-wider font-bold mb-1">
                <span>Potential 5% Total</span>
                <TrendingUp size={16} className="text-[#9B7E58]" />
              </div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-[#9B7E58]">
                ${metrics.potentialCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-[#1A1A17]/70 mt-1 font-mono">
                5% of all {metrics.totalLeads} reserved pieces
              </p>
            </div>

            {/* Card 4: Total VIP Playing Sessions */}
            <div className="bg-[#FAF9F5] border-2 border-[#1A1A17] p-5 shadow-[4px_4px_0px_#1A1A17]">
              <div className="flex justify-between items-center text-[#1A1A17]/60 text-xs uppercase tracking-wider font-bold mb-1">
                <span>Total Bookings</span>
                <Users size={16} className="text-[#1A1A17]" />
              </div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A17]">
                {metrics.totalLeads}
              </div>
              <p className="text-[11px] text-[#1A1A17]/70 mt-1">
                {metrics.scheduledCount} upcoming · {metrics.completedCount} tested
              </p>
            </div>
          </div>

          {/* Controls Bar: Filters & Manual Add */}
          <div className="px-6 md:px-8 py-4 bg-[#FAF9F5] border-b-2 border-[#1A1A17]/10 flex flex-wrap justify-between items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-[#1A1A17]/60">Filter:</span>
              {[
                { id: 'all', label: 'All Bookings' },
                { id: 'scheduled', label: '🟡 Scheduled' },
                { id: 'completed', label: '🔵 Visited Shop' },
                { id: 'acquired', label: '🟢 Acquired (5% Due)' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterStatus(f.id)}
                  className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer border ${
                    filterStatus === f.id
                      ? 'bg-[#1A1A17] text-white border-[#1A1A17]'
                      : 'bg-white text-[#1A1A17] border-[#1A1A17]/20 hover:border-[#1A1A17]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsEditingAlerts(!isEditingAlerts);
                  setIsAddingManual(false);
                }}
                className={`px-3.5 py-1.5 border-2 text-xs uppercase tracking-wider font-bold transition-all shadow-[2px_2px_0px_#1A1A17] flex items-center gap-1.5 cursor-pointer ${
                  partnerPhone
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-800'
                    : 'bg-white text-[#1A1A17] border-[#1A1A17] hover:bg-[#1A1A17] hover:text-white'
                }`}
              >
                <Smartphone size={14} className={partnerPhone ? "text-emerald-700" : "text-[#9B7E58]"} />
                <span>{partnerPhone ? `Alerts to: ${partnerPhone}` : 'Connect My Number'}</span>
              </button>

              <button
                onClick={() => {
                  setIsAddingManual(!isAddingManual);
                  setIsEditingAlerts(false);
                }}
                className="px-3.5 py-1.5 bg-white border-2 border-[#1A1A17] hover:bg-[#1A1A17] hover:text-white text-xs uppercase tracking-wider font-bold transition-all shadow-[2px_2px_0px_#1A1A17] flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle size={14} />
                <span>{isAddingManual ? 'Cancel' : 'Log Lead'}</span>
              </button>
            </div>
          </div>

          {/* Connect My Number / Alert Settings Drawer */}
          {isEditingAlerts && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={(e) => {
                e.preventDefault();
                setPartnerPhone(myPhone);
                setPartnerEmail(myEmail);
                setSavedAlertFeedback(true);
                setTimeout(() => {
                  setSavedAlertFeedback(false);
                  setIsEditingAlerts(false);
                }, 1500);
              }}
              className="p-6 bg-emerald-50/70 border-b-2 border-[#1A1A17] flex flex-col md:flex-row items-stretch md:items-end gap-3 shrink-0"
            >
              <div className="flex-1 space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A17] flex items-center gap-1">
                  <Smartphone size={12} className="text-emerald-700" /> Your Mobile Phone for Instant Lead Alerts *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. (502) 555-0199"
                  value={myPhone}
                  onChange={(e) => setMyPhone(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#1A1A17] text-xs font-mono"
                />
              </div>

              <div className="flex-1 space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A17] flex items-center gap-1">
                  <Mail size={12} className="text-emerald-700" /> Your Backup Alert Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. partner@myemail.com"
                  value={myEmail}
                  onChange={(e) => setMyEmail(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#1A1A17] text-xs"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-6 bg-[#1A1A17] text-white hover:bg-emerald-800 uppercase text-xs tracking-wider font-bold transition-all shadow-[2px_2px_0px_#1A1A17] cursor-pointer"
              >
                {savedAlertFeedback ? 'Saved!' : 'Save My Alert Number'}
              </button>
            </motion.form>
          )}

          {/* Manual Lead Logging Box */}
          {isAddingManual && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleAddManual}
              className="p-6 bg-amber-50/70 border-b-2 border-[#1A1A17] grid grid-cols-1 sm:grid-cols-6 gap-3 shrink-0"
            >
              <input
                type="text"
                required
                placeholder="Musician Name"
                value={manualName}
                onChange={e => setManualName(e.target.value)}
                className="p-2 bg-white border border-[#1A1A17] text-xs"
              />
              <input
                type="text"
                required
                placeholder="Phone (502...)"
                value={manualPhone}
                onChange={e => setManualPhone(e.target.value)}
                className="p-2 bg-white border border-[#1A1A17] text-xs"
              />
              <input
                type="text"
                placeholder="Instrument"
                value={manualInstrument}
                onChange={e => setManualInstrument(e.target.value)}
                className="p-2 bg-white border border-[#1A1A17] text-xs"
              />
              <input
                type="number"
                placeholder="Price ($)"
                value={manualPrice}
                onChange={e => setManualPrice(Number(e.target.value))}
                className="p-2 bg-white border border-[#1A1A17] text-xs"
              />
              <input
                type="text"
                placeholder="Target Date"
                value={manualDate}
                onChange={e => setManualDate(e.target.value)}
                className="p-2 bg-white border border-[#1A1A17] text-xs"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-[#1A1A17] text-white uppercase text-xs tracking-wider font-bold hover:bg-[#9B7E58] cursor-pointer"
              >
                Add to Ledger
              </button>
            </motion.form>
          )}

          {/* Bookings List Table */}
          <div className="p-6 md:p-8 overflow-y-auto no-scrollbar flex-1 space-y-4">
            {filteredList.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-[#1A1A17]/20">
                <FileText size={36} className="mx-auto text-[#1A1A17]/30 mb-2" />
                <p className="font-serif text-xl text-[#1A1A17]">No reservations match this filter</p>
                <p className="text-xs text-[#1A1A17]/60 mt-1">Book a session through the boutique to see it appear here immediately.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredList.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 bg-white border-2 border-[#1A1A17] shadow-[4px_4px_0px_#1A1A17] flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all ${
                      item.status === 'acquired' ? 'border-l-8 border-l-emerald-600' : ''
                    }`}
                  >
                    {/* Left: Pass Info & Musician */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#1A1A17] text-[#9B7E58] rounded">
                          {item.id}
                        </span>
                        <span className="text-xs text-[#1A1A17]/50 font-mono">
                          {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        {item.status === 'acquired' && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded">
                            Acquired • 5% Paid
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-xl text-[#1A1A17] font-bold">
                        {item.customerName}
                      </h4>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#1A1A17]/70">
                        <span>📱 {item.customerPhone}</span>
                        <span>🎻 {item.musicianLevel}</span>
                        <span>📅 {item.preferredDate} ({item.preferredTime})</span>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-[#1A1A17]/60 italic pt-1">
                          &quot;{item.notes}&quot;
                        </p>
                      )}
                    </div>

                    {/* Middle: Instrument & Cut */}
                    <div className="lg:text-right border-t lg:border-t-0 pt-3 lg:pt-0 border-[#1A1A17]/10 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#1A1A17]/50 block font-bold">
                        Instrument
                      </span>
                      <p className="font-serif text-base text-[#1A1A17] font-medium">
                        {item.productName}
                      </p>
                      <div className="flex lg:justify-end items-baseline gap-3">
                        <span className="text-xs text-[#1A1A17]/60">
                          Price: ${item.productPrice.toLocaleString()}
                        </span>
                        <span className="font-mono text-base font-bold text-emerald-800">
                          5% Cut: ${item.commissionAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Right: Status Switcher & Delete */}
                    <div className="flex items-center gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-[#1A1A17]/10 shrink-0">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-[#1A1A17]/50 block font-bold">
                          Update Status
                        </span>
                        <select
                          value={item.status}
                          onChange={(e) => updateBookingStatus(item.id, e.target.value as VIPBookingStatus)}
                          className="bg-white border-2 border-[#1A1A17] px-3 py-1.5 text-xs font-bold outline-none cursor-pointer shadow-[2px_2px_0px_#1A1A17]"
                        >
                          <option value="scheduled">🟡 Scheduled</option>
                          <option value="completed">🔵 Trial Visited</option>
                          <option value="acquired">🟢 Acquired (5% Due)</option>
                          <option value="cancelled">⚪ Passed / None</option>
                        </select>
                      </div>

                      <button
                        onClick={() => removeBooking(item.id)}
                        className="w-8 h-8 rounded text-[#1A1A17]/40 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer self-end"
                        title="Delete lead"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-[#FAF9F5] p-5 border-t-2 border-[#1A1A17] flex flex-col sm:flex-row justify-between items-center text-xs text-[#1A1A17]/70 gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-700" />
              <span>Data saved in browser localStorage. No monthly subscriptions, database hosting, or third-party fees.</span>
            </div>
            <button
              onClick={() => setIsLedgerOpen(false)}
              className="px-6 py-2.5 bg-[#1A1A17] text-white uppercase tracking-wider text-xs font-bold hover:bg-[#9B7E58] cursor-pointer"
            >
              Close Ledger
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
