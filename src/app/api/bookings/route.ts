import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { VIPBooking, VIPBookingStatus } from '@/context/CartContext';
import { supabaseAdmin } from '@/lib/supabase';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'bookings.json');

interface SupabaseBookingRow {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  musician_level?: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
  notes?: string | null;
  product_id?: string | null;
  product_name?: string | null;
  product_price?: number | null;
  commission_rate?: number | null;
  commission_amount?: number | null;
  status: string;
  created_at: string;
}

function mapRowToBooking(row: SupabaseBookingRow): VIPBooking {
  return {
    id: row.id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerEmail: row.customer_email || '',
    musicianLevel: row.musician_level || 'General',
    preferredDate: row.preferred_date || 'Flexible',
    preferredTime: row.preferred_time || 'Flexible',
    notes: row.notes || '',
    productId: row.product_id || '',
    productName: row.product_name || 'Instrument Consultation',
    productPrice: Number(row.product_price) || 0,
    commissionRate: 0,
    commissionAmount: 0,
    status: (row.status as VIPBookingStatus) || 'scheduled',
    createdAt: row.created_at,
  };
}

async function readBookings(): Promise<VIPBooking[]> {
  // 1. Try reading from Supabase
  try {
    const { data, error } = await supabaseAdmin
      .from('vip_bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return (data as SupabaseBookingRow[]).map(mapRowToBooking);
    }
  } catch (err) {
    console.warn('Supabase bookings read skipped:', err);
  }

  // 2. Fall back to local file
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed reading local bookings database:', err);
  }
  return [];
}

async function writeLocalBookings(bookings: VIPBooking[]) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (err) {
    // Safe on Vercel
  }
}

export async function GET() {
  const bookings = await readBookings();
  return NextResponse.json({ success: true, bookings });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      musicianLevel,
      preferredDate,
      preferredTime,
      notes,
      productId,
      productName,
      productPrice,
    } = body;

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const id = `PASS-LE-${randomDigits}`;
    const createdAt = new Date().toISOString();

    const newBooking: VIPBooking = {
      id,
      customerName,
      customerPhone,
      customerEmail: customerEmail || '',
      musicianLevel: musicianLevel || 'General',
      preferredDate: preferredDate || 'Flexible',
      preferredTime: preferredTime || 'Flexible',
      notes: notes || '',
      productId: productId || '',
      productName: productName || 'Instrument Consultation',
      productPrice: Number(productPrice) || 0,
      commissionRate: 0,
      commissionAmount: 0,
      status: 'scheduled',
      createdAt,
    };

    // 1. Save to Supabase Cloud Database
    try {
      await supabaseAdmin.from('vip_bookings').insert([
        {
          id,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail || null,
          musician_level: musicianLevel || null,
          preferred_date: preferredDate || null,
          preferred_time: preferredTime || null,
          notes: notes || null,
          product_id: productId || null,
          product_name: productName || null,
          product_price: Number(productPrice) || 0,
          status: 'scheduled',
          created_at: createdAt,
        },
      ]);
    } catch (supaErr) {
      console.warn('Supabase booking insert error:', supaErr);
    }

    // 2. Also save to local file
    const current = await readBookings();
    const updated = [newBooking, ...current.filter((b) => b.id !== id)];
    await writeLocalBookings(updated);

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (err) {
    console.error('Error saving booking:', err);
    return NextResponse.json({ success: false, error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    // 1. Update in Supabase
    try {
      await supabaseAdmin
        .from('vip_bookings')
        .update({ status })
        .eq('id', id);
    } catch (e) {
      console.warn('Supabase booking status update error:', e);
    }

    // 2. Update local file
    const current = await readBookings();
    const updated = current.map((b) => (b.id === id ? { ...b, status } : b));
    await writeLocalBookings(updated);

    return NextResponse.json({ success: true, bookings: updated });
  } catch (err) {
    console.error('Error updating booking:', err);
    return NextResponse.json({ success: false, error: 'Failed to update status' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    }

    // 1. Delete in Supabase
    try {
      await supabaseAdmin.from('vip_bookings').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase booking delete error:', e);
    }

    // 2. Delete in local file
    const current = await readBookings();
    const updated = current.filter((b) => b.id !== id);
    await writeLocalBookings(updated);

    return NextResponse.json({ success: true, bookings: updated });
  } catch (err) {
    console.error('Error deleting booking:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete booking' }, { status: 500 });
  }
}
