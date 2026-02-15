import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('=== Supabase Config ===');
console.log('URL:', supabaseUrl);
console.log('Key exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`Missing env vars: URL=${!!supabaseUrl}, Key=${!!supabaseAnonKey}`);
}

export const createServerClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};
