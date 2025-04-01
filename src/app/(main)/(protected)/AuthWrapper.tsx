"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeClient";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const redirectTo = searchParams.get("redirectTo") || pathname;
  const profile_completed = useSelector((state: RootState) => state.user.user?.profile_completed);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace(`/auth?redirectTo=${redirectTo}`);
        return;
      }

      if (!profile_completed) {
        router.replace(`/profile?redirectTo=${redirectTo}`);
        return;
      }
    }

    checkSession();
  }, [redirectTo, profile_completed, router]);

  return <>{children}</>;
}
