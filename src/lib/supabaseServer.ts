import { cookies } from "next/headers";
import type { SerializeOptions } from "cookie";
import { createServerClient } from "@supabase/ssr";


const SUPABASE_URL =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY =
    process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const getSupabaseServerClient = async () => {
    const cookieStore = await cookies();

    return createServerClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll: () =>
                    cookieStore.getAll().map((cookie) => ({
                        name: cookie.name,
                        value: cookie.value,
                    })),
                setAll: (cookies) => {
                    cookies.forEach((cookie: { name: string; value: string; options?: SerializeOptions }) => {
                        cookieStore.set(cookie.name, cookie.value, cookie.options);
                    });
                },
            },
        }
    );
};
