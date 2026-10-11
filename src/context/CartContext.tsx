"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type VIPBookingStatus = 'scheduled' | 'completed' | 'acquired' | 'cancelled';

export interface VIPBooking {
  id: string; // e.g. "PASS-LE-4821"
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  musicianLevel: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  productId: string;
  productName: string;
  productPrice: number;
  commissionRate: number; // 0.05
  commissionAmount: number; // productPrice * 0.05
  status: VIPBookingStatus;
  createdAt: string;
}

const DEFAULT_BOOKINGS: VIPBooking[] = [
  {
    id: "PASS-LE-4821",
    customerName: "Dr. Evelyn Vance",
    customerPhone: "(502) 419-8234",
    customerEmail: "evelyn.vance@louisville.edu",
    musicianLevel: "Conservatory Professor",
    preferredDate: "Thursday, Oct 15",
    preferredTime: "2:30 PM",
    notes: "Testing against personal 19th c. German violin for orchestra season.",
    productId: "guarneri-1742-replica",
    productName: "Guarneri del Gesù 'Il Cannone' Tribute",
    productPrice: 4850,
    commissionRate: 0.05,
    commissionAmount: 242.50,
    status: "acquired",
    createdAt: "2026-10-08T14:20:00Z"
  },
  {
    id: "PASS-LE-3914",
    customerName: "Julian Chen",
    customerPhone: "(502) 882-9912",
    customerEmail: "j.chen.cello@gmail.com",
    musicianLevel: "Pre-College Soloist",
    preferredDate: "Saturday, Oct 17",
    preferredTime: "11:00 AM",
    notes: "Auditioning for Louisville Youth Orchestra principal cello seat.",
    productId: "montagnana-cello-soloist",
    productName: "Domenico Montagnana 1739 Pattern Cello",
    productPrice: 6200,
    commissionRate: 0.05,
    commissionAmount: 310.00,
    status: "scheduled",
    createdAt: "2026-10-10T10:15:00Z"
  }
];

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  // Trade-in Equity Estimator
  hasTradeIn: boolean;
  setHasTradeIn: (has: boolean) => void;
  tradeInValue: number;
  setTradeInValue: (val: number) => void;
  // Selected product for quick inspect
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  // Checkout flow
  checkoutState: 'idle' | 'checkout' | 'trial' | 'confirmed';
  setCheckoutState: (state: 'idle' | 'checkout' | 'trial' | 'confirmed') => void;
  lastOrderNumber: string;
  setLastOrderNumber: (num: string) => void;
  // VIP In-Shop Playing Sessions & 5% Commission
  bookingProduct: Product | null;
  setBookingProduct: (product: Product | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isLedgerOpen: boolean;
  setIsLedgerOpen: (open: boolean) => void;
  vipBookings: VIPBooking[];
  addVIPBooking: (booking: Omit<VIPBooking, 'id' | 'createdAt' | 'commissionRate' | 'commissionAmount' | 'status'>) => VIPBooking;
  updateBookingStatus: (id: string, status: VIPBookingStatus) => void;
  removeBooking: (id: string) => void;
  // Partner / Your Contact Details for Alerts
  partnerPhone: string;
  setPartnerPhone: (phone: string) => void;
  partnerEmail: string;
  setPartnerEmail: (email: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lane_edwards_cart');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [tradeInValue, setTradeInValue] = useState(500);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'checkout' | 'trial' | 'confirmed'>('idle');
  const [lastOrderNumber, setLastOrderNumber] = useState('');

  // Partner Alert Details
  const [partnerPhone, setPartnerPhoneState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('le_partner_phone') || '';
    }
    return '';
  });
  const [partnerEmail, setPartnerEmailState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('le_partner_email') || '';
    }
    return '';
  });

  const setPartnerPhone = (phone: string) => {
    setPartnerPhoneState(phone);
    try {
      localStorage.setItem('le_partner_phone', phone);
    } catch {
      // ignore
    }
  };

  const setPartnerEmail = (email: string) => {
    setPartnerEmailState(email);
    try {
      localStorage.setItem('le_partner_email', email);
    } catch {
      // ignore
    }
  };

  // VIP Booking and Commission Ledger state
  const [bookingProduct, setBookingProduct] = useState<Product | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);

  const [vipBookings, setVipBookings] = useState<VIPBooking[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lane_edwards_vip_leads');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return DEFAULT_BOOKINGS;
  });

  // Sync with central server database on initial load
  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.bookings) && data.bookings.length > 0) {
          setVipBookings(data.bookings);
        }
      })
      .catch(err => console.error('Failed fetching central bookings from server:', err));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('lane_edwards_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('lane_edwards_vip_leads', JSON.stringify(vipBookings));
    } catch {
      // ignore
    }
  }, [vipBookings]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const addVIPBooking = (
    data: Omit<VIPBooking, 'id' | 'createdAt' | 'commissionRate' | 'commissionAmount' | 'status'>
  ): VIPBooking => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const id = `PASS-LE-${randomDigits}`;
    const commissionRate = 0.05;
    const commissionAmount = Math.round(data.productPrice * commissionRate * 100) / 100;
    const newBooking: VIPBooking = {
      ...data,
      id,
      commissionRate,
      commissionAmount,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    setVipBookings(prev => [newBooking, ...prev]);

    // Asynchronously sync to central server database
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(err => console.error('Failed syncing booking to server:', err));

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: VIPBookingStatus) => {
    setVipBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status } : b))
    );
    // Asynchronously sync update to server
    fetch('/api/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    }).catch(err => console.error('Failed syncing status update to server:', err));
  };

  const removeBooking = (id: string) => {
    setVipBookings(prev => prev.filter(b => b.id !== id));
    // Asynchronously sync deletion to server
    fetch(`/api/bookings?id=${id}`, {
      method: 'DELETE',
    }).catch(err => console.error('Failed syncing deletion to server:', err));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - (hasTradeIn ? tradeInValue : 0));

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        total,
        isCartOpen,
        setIsCartOpen,
        hasTradeIn,
        setHasTradeIn,
        tradeInValue,
        setTradeInValue,
        selectedProduct,
        setSelectedProduct,
        checkoutState,
        setCheckoutState,
        lastOrderNumber,
        setLastOrderNumber,
        bookingProduct,
        setBookingProduct,
        isBookingModalOpen,
        setIsBookingModalOpen,
        isLedgerOpen,
        setIsLedgerOpen,
        vipBookings,
        addVIPBooking,
        updateBookingStatus,
        removeBooking,
        partnerPhone,
        setPartnerPhone,
        partnerEmail,
        setPartnerEmail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
