import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_SITE_CONTENT, SiteContent } from '@/data/defaultSiteContent';
import { PRODUCTS, Product } from '@/data/products';

const CONTENT_FILE = path.join(process.cwd(), 'src', 'data', 'siteContent.json');
const PRODUCTS_FILE = path.join(process.cwd(), 'src', 'data', 'siteProducts.json');

function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function GET() {
  try {
    let content: SiteContent = DEFAULT_SITE_CONTENT;
    let products: Product[] = PRODUCTS;

    if (fs.existsSync(CONTENT_FILE)) {
      try {
        const rawContent = fs.readFileSync(CONTENT_FILE, 'utf-8');
        content = { ...DEFAULT_SITE_CONTENT, ...JSON.parse(rawContent) };
      } catch (e) {
        console.error('Error reading custom site content:', e);
      }
    }

    if (fs.existsSync(PRODUCTS_FILE)) {
      try {
        const rawProducts = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
        products = JSON.parse(rawProducts);
      } catch (e) {
        console.error('Error reading custom products:', e);
      }
    }

    return NextResponse.json({
      success: true,
      content,
      products
    });
  } catch (error) {
    console.error('Portal content GET failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve portal content' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, products, reset } = body;

    if (reset) {
      if (fs.existsSync(CONTENT_FILE)) fs.unlinkSync(CONTENT_FILE);
      if (fs.existsSync(PRODUCTS_FILE)) fs.unlinkSync(PRODUCTS_FILE);
      return NextResponse.json({
        success: true,
        message: 'Reset to factory defaults',
        content: DEFAULT_SITE_CONTENT,
        products: PRODUCTS
      });
    }

    if (content) {
      ensureDir(CONTENT_FILE);
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
    }

    if (products) {
      ensureDir(PRODUCTS_FILE);
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
    }

    return NextResponse.json({
      success: true,
      message: 'Portal changes saved successfully',
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
    if (fs.existsSync(CONTENT_FILE)) fs.unlinkSync(CONTENT_FILE);
    if (fs.existsSync(PRODUCTS_FILE)) fs.unlinkSync(PRODUCTS_FILE);
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
