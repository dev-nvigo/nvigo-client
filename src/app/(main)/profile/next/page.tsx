"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormChoice from "./FormChoice";

export default function ProfileNextPage() {
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter();
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.profile_completed) {
            router.push("/profile");
        } else if (user?.current_status) {
            setStatus(user.current_status);
        } else {
            // Optionally fetch profile from supabase here if not in Redux
        }
    }, [user]);

    if (!status) return <div className="text-center pt-8">Loading profile...</div>;

    return (
        <div className="bg-c-white-150 overflow-hidden pb-10">
            <FormChoice status={status}/>
        </div>
    );
}
