import { createClient } from '@supabase/supabase-js';

// ⚠️ REPLACE THESE WITH YOUR OWN SUPABASE PROJECT CREDENTIALS
// Go to https://supabase.com -> Project Settings -> API
const supabaseUrl = 'https://hcbfgrzqfdaufasmyddi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjYmZncnpxZmRhdWZhc215ZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5Mjc5MTQsImV4cCI6MjA4MDUwMzkxNH0.hNsLzTHDsixCfBdrnSUsPgm9XT1utMJohS8PxnmRC94';

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
const clientKey: string = supabaseAnonKey;

if (!isUrlValid(supabaseUrl)) {
  console.warn(
    'Supabase Client Error: Invalid URL detected. Please update "lib/supabase.ts" with your actual Supabase Project URL and Key.'
  );
}

// Simple check for common key copy-paste errors
if (clientKey && !clientKey.startsWith('ey') && clientKey !== 'YOUR_SUPABASE_ANON_KEY') {
    console.warn(
        'Supabase Key Warning: The provided key does not look like a standard Supabase Anon Key (usually starts with "ey..."). Check if you copied the correct "anon public" key.'
    );
}

export const supabase = createClient(clientUrl, clientKey);