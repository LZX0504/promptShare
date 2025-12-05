import { createClient } from '@supabase/supabase-js';

// ⚠️ REPLACE THESE WITH YOUR OWN SUPABASE PROJECT CREDENTIALS
// Go to https://supabase.com -> Project Settings -> API
const supabaseUrl = 'https://hcbfgrzqfdaufasmyddi.supabase.co';
const supabaseAnonKey = 'sb_publishable_00IfSpSydrhnrsbcn6I5FA_m9q9gQfu';

// Helper to prevent app crash if user hasn't updated keys yet
// The error "Failed to construct 'URL'" happens if supabaseUrl is not a valid URL string
const isUrlValid = (url: string) => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};

const clientUrl = isUrlValid(supabaseUrl) ? supabaseUrl : 'https://placeholder.supabase.co';
const clientKey = supabaseAnonKey;

if (!isUrlValid(supabaseUrl)) {
  console.warn(
    'Supabase Client Error: Invalid URL detected. Please update "lib/supabase.ts" with your actual Supabase Project URL and Key.'
  );
}

export const supabase = createClient(clientUrl, clientKey);