import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { VIPBooking } from '@/context/CartContext';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'bookings.json');

function readBookings(): VIPBooking[] {
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

function writeBookings(bookings: VIPBooking[]) {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed writing bookings database:', err);
  }
}

export async function GET() {
  const bookings = readBookings();
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
    const commissionRate = 0.05;
    const commissionAmount = Math.round(Number(productPrice) * commissionRate * 100) / 100;

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
      commissionRate,
      commissionAmount,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    const current = readBookings();
    const updated = [newBooking, ...current];
    writeBookings(updated);

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

    const current = readBookings();
    const updated = current.map(b => (b.id === id ? { ...b, status } : b));
    writeBookings(updated);

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

    const current = readBookings();
    const updated = current.filter(b => b.id !== id);
    writeBookings(updated);

    return NextResponse.json({ success: true, bookings: updated });
  } catch (err) {
    console.error('Error deleting booking:', err);
    return NextResponse.json({ success: false, error: 'Failed to delete booking' }, { status: 500 });
  }
}
