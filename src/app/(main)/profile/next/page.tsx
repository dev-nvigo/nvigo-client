"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeClient";
import { useEffect, useState } from "react";
import FormChoice from "./FormChoice";
import StepIndicator from "@/components/StepIndicator";
import Image from "next/image";


export default function ProfileNextPage() {
    const user = useSelector((state: RootState) => state.user.user);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        if (user?.current_status) {
            setStatus(user.current_status);
        } else {
            // Optionally fetch profile from supabase here if not in Redux
        }
    }, [user]);

    if (!status) return <div className="text-center pt-8">Loading profile...</div>;

    return (
        <div className="relative md:min-h-[85vh] flex flex-col items-center bg-c-white-150">
            <StepIndicator
                step={3}
                totalSteps={3}
                title="Where are you headed to?"
                subtitle="Let us help you out with place and people"
            />

            <FormChoice status={status} />
            <div className="hidden lg:flex absolute inset-0 items-end justify-end z-0 pointer-events-none">
                <Image
                    src="/svgs/profile/next.svg"
                    alt="Profile Illustration"
                    width={275}
                    height={275}
                    className="object-contain pr-10"
                    priority
                />
            </div>
        </div>
    );
}
