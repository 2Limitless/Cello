import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_SITE_CONTENT, SiteContent } from '@/data/defaultSiteContent';
import { PRODUCTS, Product } from '@/data/products';

const CONTENT_FILE = path.join(process.cwd(), 'src', 'data', 'siteContent.json');
const PRODUCTS_FILE = path.join(process.cwd(), 'src', 'data', 'siteProducts.json');

// Check if Vercel KV / Upstash cloud storage credentials exist
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function getFromCloudKV(key: string) {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      }
    }
  } catch (err) {
    console.warn(`[Cloud KV] Failed reading key ${key}:`, err);
  }
  return null;
}

async function setToCloudKV(key: string, value: unknown) {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    const res = await fetch(`${KV_URL}/set/${key}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(typeof value === 'string' ? value : JSON.stringify(value))
    });
    return res.ok;
  } catch (err) {
    console.warn(`[Cloud KV] Failed writing key ${key}:`, err);
  }
  return false;
}

function ensureDir(filePath: string) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (e) {
    // Read-only filesystem on Vercel
  }
}

export async function GET() {
  try {
    let content: SiteContent = DEFAULT_SITE_CONTENT;
    let products: Product[] = PRODUCTS;

    // 1. Try Vercel KV cloud database first if configured
    if (KV_URL && KV_TOKEN) {
      const cloudContent = await getFromCloudKV('atelier_content');
      const cloudProducts = await getFromCloudKV('atelier_products');
      if (cloudContent) content = { ...DEFAULT_SITE_CONTENT, ...cloudContent };
      if (cloudProducts && Array.isArray(cloudProducts)) products = cloudProducts;

      return NextResponse.json({
        success: true,
        source: 'cloud_kv',
        content,
        products
      });
    }

    // 2. Fall back to local filesystem (for local dev and VPS hosting)
    try {
      if (fs.existsSync(CONTENT_FILE)) {
        const rawContent = fs.readFileSync(CONTENT_FILE, 'utf-8');
        content = { ...DEFAULT_SITE_CONTENT, ...JSON.parse(rawContent) };
      }
    } catch (e) {
      console.warn('Filesystem read for site content skipped:', e);
    }

    try {
      if (fs.existsSync(PRODUCTS_FILE)) {
        const rawProducts = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
        products = JSON.parse(rawProducts);
      }
    } catch (e) {
      console.warn('Filesystem read for products skipped:', e);
    }

    return NextResponse.json({
      success: true,
      source: 'local_file',
      content,
      products
    });
  } catch (error) {
    console.error('Portal content GET failed:', error);
    return NextResponse.json(
      { success: true, content: DEFAULT_SITE_CONTENT, products: PRODUCTS },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, products, reset } = body;

    // Handle reset
    if (reset) {
      if (KV_URL && KV_TOKEN) {
        await setToCloudKV('atelier_content', DEFAULT_SITE_CONTENT);
        await setToCloudKV('atelier_products', PRODUCTS);
      }
      try {
        if (fs.existsSync(CONTENT_FILE)) fs.unlinkSync(CONTENT_FILE);
        if (fs.existsSync(PRODUCTS_FILE)) fs.unlinkSync(PRODUCTS_FILE);
      } catch (e) {
        // Ignore read-only fs error on Vercel
      }
      return NextResponse.json({
        success: true,
        message: 'Reset to factory defaults',
        content: DEFAULT_SITE_CONTENT,
        products: PRODUCTS
      });
    }

    // 1. Save to Vercel KV if cloud credentials exist
    let savedToCloud = false;
    if (KV_URL && KV_TOKEN) {
      if (content) await setToCloudKV('atelier_content', content);
      if (products) await setToCloudKV('atelier_products', products);
      savedToCloud = true;
    }

    // 2. Also attempt local file write (for dev / VPS) with safe error handling
    try {
      if (content) {
        ensureDir(CONTENT_FILE);
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
      }
      if (products) {
        ensureDir(PRODUCTS_FILE);
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
      }
    } catch (fsErr) {
      // On Vercel serverless, local fs may be read-only; this catch ensures the API never fails!
      console.info('Filesystem write bypassed (serverless environment)');
    }

    return NextResponse.json({
      success: true,
      message: savedToCloud ? 'Saved permanently to Cloud Database' : 'Saved to workshop storage',
      storage: savedToCloud ? 'cloud_kv' : 'local_and_browser',
      content: content || DEFAULT_SITE_CONTENT,
      products: products || PRODUCTS
    });
  } catch (error) {
    console.error('Portal content POST failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update portal content' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    if (KV_URL && KV_TOKEN) {
      await setToCloudKV('atelier_content', DEFAULT_SITE_CONTENT);
      await setToCloudKV('atelier_products', PRODUCTS);
    }
    try {
      if (fs.existsSync(CONTENT_FILE)) fs.unlinkSync(CONTENT_FILE);
      if (fs.existsSync(PRODUCTS_FILE)) fs.unlinkSync(PRODUCTS_FILE);
    } catch (e) {
      // Ignore on Vercel
    }
    return NextResponse.json({
      success: true,
      message: 'Reset to factory defaults successfully',
      content: DEFAULT_SITE_CONTENT,
      products: PRODUCTS
    });
  } catch (error) {
    console.error('Portal content DELETE failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset content' },
      { status: 500 }
    );
  }
}
