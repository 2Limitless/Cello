import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xhoaymplvbparsmrvlln.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_gsZZzaHHO3V2H4FAtGpgUQ_06EkL7Qf';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhob2F5bXBsdmJwYXJzbXJ2bGxuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTkxMjYyMywiZXhwIjoyMTA3NDg4NjIzfQ._0WCixbMvnoX0la2MQr86ybpzy9lmd8d1uy80c1uwYg';

// Client-side Supabase client (using anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client with admin privileges (using service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
