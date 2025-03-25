import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY =
    process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log(SUPABASE_URL, SUPABASE_ANON_KEY, process.env.NEXT_PUBLIC_SUPABASE_URL);


export const supabase = createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
