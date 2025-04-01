import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/redux/slices";
import { fetchBasicProfile } from "@/lib/api/user";

export const useSupabaseSession = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const {
                    data: { user },
                    error,
                } = await supabase.auth.getUser();

                if (error || !user) {
                    console.warn("Supabase user restore failed:", error?.message);
                    await supabase.auth.signOut(); // flush corrupted state
                    dispatch(clearUser());
                    return;
                }

                const profile = await fetchBasicProfile(user.id);

                dispatch(
                    setUser({
                        id: user.id,
                        email: user.email ?? "",
                        full_name: profile?.full_name ?? "",
                        profile_completed: profile?.profile_completed ?? false,
                        current_status: profile?.current_status ?? "",
                    })
                );
            } catch (err) {
                console.error("Supabase session check failed:", err);
                await supabase.auth.signOut();
                dispatch(clearUser());
            }
        };

        restoreSession();
    }, [dispatch]);
};
