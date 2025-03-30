import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabaseMiddleware";

const protectedRoutes = ["/services"];

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createSupabaseMiddlewareClient(req, res);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const path = req.nextUrl.pathname;

    if (!session && protectedRoutes.some((route) => path.startsWith(route))) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = "/auth";
        redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname + req.nextUrl.search);
        return NextResponse.redirect(redirectUrl);
    }

    return res;
}

export const config = {
    matcher: ["/services/:path*"],
};
