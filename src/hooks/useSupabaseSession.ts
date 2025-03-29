// hooks/useSupabaseSession.ts
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/redux/slices";

export const useSupabaseSession = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session?.user?.email) {
                dispatch(setUser({
                    id: session.user.id,
                    email: session.user.email,
                }));
            } else {
                dispatch(clearUser());
            }
        };

        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user?.email) {
                dispatch(setUser({
                    id: session.user.id,
                    email: session.user.email,
                }));
            } else {
                dispatch(clearUser());
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [dispatch]);
};
