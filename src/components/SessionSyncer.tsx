"use client";

import { useSupabaseSession } from "@/hooks/useSupabaseSession";

export const SessionSyncer = () => {
    useSupabaseSession(); // syncs supabase → redux
    return null; // doesn't render anything
};
