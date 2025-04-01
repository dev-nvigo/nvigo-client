'use client';

import { useSearchParams } from "next/navigation";
import BasicInfoForm from "./BasicInfo";
import StepIndicator from "@/components/StepIndicator";
import Image from "next/image";


const ProfilePage = () => {
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";

    return (
        <div className="relative md:min-h-[85vh] flex flex-col items-center bg-c-white-150">
            <StepIndicator
                step={1}
                totalSteps={3}
                title="Basic Information"
                subtitle="It's always good to know your name"
            />

            <BasicInfoForm redirectTo={redirectTo} />
            <div className="hidden lg:flex absolute inset-0 items-end justify-end z-0 pointer-events-none">
                <Image
                    src="/svgs/profile/basic-info.svg"
                    alt="Profile Illustration"
                    width={300}
                    height={300}
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
};

export default ProfilePage;
