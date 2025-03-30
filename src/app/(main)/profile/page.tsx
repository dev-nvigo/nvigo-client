'use client';

import { useSearchParams } from "next/navigation";
import BasicInfoForm from "./BasicInfo";


const ProfilePage = () => {
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";

    return (
        <div className="flex flex-col items-center bg-c-white-150">
            <BasicInfoForm redirectTo={redirectTo} />
        </div>
    );
};

export default ProfilePage;
