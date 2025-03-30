import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

export function createSupabaseMiddlewareClient(
    req: NextRequest,
    res: NextResponse
) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () =>
                    req.cookies.getAll().map((c) => ({
                        name: c.name,
                        value: c.value,
                    })),
                setAll: (cookies) => {
                    cookies.forEach((cookie) => {
                        res.cookies.set(cookie.name, cookie.value, cookie.options);
                    });
                },
            },
        }
    );
}
