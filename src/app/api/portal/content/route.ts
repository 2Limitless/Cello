import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { DEFAULT_SITE_CONTENT, SiteContent } from '@/data/defaultSiteContent';
import { PRODUCTS, Product } from '@/data/products';
import { supabaseAdmin } from '@/lib/supabase';

const CONTENT_FILE = path.join(process.cwd(), 'src', 'data', 'siteContent.json');
const PRODUCTS_FILE = path.join(process.cwd(), 'src', 'data', 'siteProducts.json');

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
    let loadedFromSupabase = false;

    // 1. Try reading from Supabase Cloud Database first
    try {
      const { data, error } = await supabaseAdmin
        .from('atelier_settings')
        .select('*');

      if (!error && data && data.length > 0) {
        const contentRow = data.find((row) => row.id === 'site_content');
        const productsRow = data.find((row) => row.id === 'site_products');

        if (contentRow?.data) {
          content = { ...DEFAULT_SITE_CONTENT, ...contentRow.data };
          loadedFromSupabase = true;
        }

        if (productsRow?.data && Array.isArray(productsRow.data)) {
          products = productsRow.data;
          loadedFromSupabase = true;
        }
      }
    } catch (dbErr) {
      console.warn('Supabase read skipped or table not created yet:', dbErr);
    }

    // 2. If not in Supabase yet, check local filesystem (for local dev / baseline)
    if (!loadedFromSupabase) {
      try {
        if (fs.existsSync(CONTENT_FILE)) {
          const rawContent = fs.readFileSync(CONTENT_FILE, 'utf-8');
          content = { ...DEFAULT_SITE_CONTENT, ...JSON.parse(rawContent) };
        }
      } catch (e) {
        // Safe catch on Vercel
      }

      try {
        if (fs.existsSync(PRODUCTS_FILE)) {
          const rawProducts = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
          products = JSON.parse(rawProducts);
        }
      } catch (e) {
        // Safe catch on Vercel
      }
    }

    return NextResponse.json({
      success: true,
      source: loadedFromSupabase ? 'supabase_cloud' : 'local_fallback',
      content,
      products
    });
  } catch (error) {
    console.error('Portal content GET error:', error);
    return NextResponse.json({
      success: true,
      source: 'default_fallback',
      content: DEFAULT_SITE_CONTENT,
      products: PRODUCTS
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, products, reset } = body;

    let savedToSupabase = false;

    // 1. Reset requested
    if (reset) {
      try {
        await supabaseAdmin.from('atelier_settings').upsert([
          { id: 'site_content', data: DEFAULT_SITE_CONTENT, updated_at: new Date().toISOString() },
          { id: 'site_products', data: PRODUCTS, updated_at: new Date().toISOString() }
        ]);
        savedToSupabase = true;
      } catch (e) {
        console.warn('Supabase reset error:', e);
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

    // 2. Save to Supabase Cloud Database
    try {
      const upsertRows = [];
      if (content) {
        upsertRows.push({
          id: 'site_content',
          data: content,
          updated_at: new Date().toISOString()
        });
      }
      if (products) {
        upsertRows.push({
          id: 'site_products',
          data: products,
          updated_at: new Date().toISOString()
        });
      }

      if (upsertRows.length > 0) {
        const { error } = await supabaseAdmin
          .from('atelier_settings')
          .upsert(upsertRows, { onConflict: 'id' });

        if (!error) {
          savedToSupabase = true;
        } else {
          console.warn('Supabase upsert returned error (table might need creation):', error.message);
        }
      }
    } catch (supaErr) {
      console.warn('Supabase write error:', supaErr);
    }

    // 3. Also write local files for local dev if filesystem is writable
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
      // Gracefully bypassed on Vercel serverless
    }

    return NextResponse.json({
      success: true,
      message: savedToSupabase
        ? 'Published permanently to Supabase Cloud Database'
        : 'Saved to workshop storage',
      storage: savedToSupabase ? 'supabase_cloud' : 'local_and_browser',
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
    try {
      await supabaseAdmin.from('atelier_settings').upsert([
        { id: 'site_content', data: DEFAULT_SITE_CONTENT, updated_at: new Date().toISOString() },
        { id: 'site_products', data: PRODUCTS, updated_at: new Date().toISOString() }
      ]);
    } catch (e) {
      // Ignore
    }

    try {
      if (fs.existsSync(CONTENT_FILE)) fs.unlinkSync(CONTENT_FILE);
      if (fs.existsSync(PRODUCTS_FILE)) fs.unlinkSync(PRODUCTS_FILE);
    } catch (e) {
      // Ignore
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
