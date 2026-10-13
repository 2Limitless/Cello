import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { VIPBooking } from '@/context/CartContext';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'bookings.json');

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function readBookings(): Promise<VIPBooking[]> {
  // 1. Try Vercel KV first
  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/get/vip_bookings`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        }
      }
    } catch (e) {
      console.warn('Failed reading bookings from KV:', e);
    }
  }

  // 2. Fall back to local file
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed reading bookings database:', err);
  }
  return [];
}

async function writeBookings(bookings: VIPBooking[]) {
  // 1. Save to Vercel KV if available
  if (KV_URL && KV_TOKEN) {
    try {
      await fetch(`${KV_URL}/set/vip_bookings`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.stringify(bookings))
      });
    } catch (e) {
      console.warn('Failed writing bookings to KV:', e);
    }
  }

  // 2. Also try writing local file with safe catch for Vercel read-only fs
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (err) {
    // Graceful catch for read-only Vercel filesystem
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

    const newBooking: VIPBooking = {
      id,
      customerName,
      customerPhone,
      customerEmail: customerEmail || '',
      musicianLevel: musicianLevel || 'General',
      preferredDate: preferredDate || 'Flexible',
      preferredTime: preferredTime || 'Flexible',
      notes: notes || '',
      productId,
      productName,
      productPrice: Number(productPrice),
      commissionRate: 0,
      commissionAmount: 0,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    const current = await readBookings();
    const updated = [newBooking, ...current];
    await writeBookings(updated);

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

    const current = await readBookings();
    const updated = current.map(b => (b.id === id ? { ...b, status } : b));
    await writeBookings(updated);

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

    const current = await readBookings();
    const updated = current.filter(b => b.id !== id);
    await writeBookings(updated);

    return NextResponse.json({ success: true, bookings: updated });
  } catch (err) {
    console.error('Error deleting booking:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete booking' }, { status: 500 });
  }
}
