"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/storeClient";
import CurrentStudentForm from "./CurrentStudentForm";
import IncomingStudentForm from "./IncomingStudentForm";
import RecentGraduateForm from "./RecentGraduateForm";
import WorkingProfessionalForm from "./WorkingProfessionalForm";
import { updateProfile, ProfileFormData } from "@/lib/api/user";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/storeClient";


export default function FormChoice({ status }: { status: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useSelector((state: RootState) => state.user);
    const redirectTo = searchParams.get("redirectTo") || "/";
    const dispatch = useDispatch<AppDispatch>();

    switch (status) {
        case "current_student":
            return <CurrentStudentForm onSubmit={(data) => handleSubmit(data)} />;
        case "incoming_student":
            return <IncomingStudentForm onSubmit={(data) => handleSubmit(data)} />;
        case "recent_graduate":
            return <RecentGraduateForm onSubmit={(data) => handleSubmit(data)} />;
        case "working_professional":
            return <WorkingProfessionalForm onSubmit={(data) => handleSubmit(data)} />;
        default:
            return <div className="text-center pt-8">Unknown status: {status}</div>;
    }

    async function handleSubmit(data: ProfileFormData) {
        if (user) {
            try {
                await updateProfile(user.id, data);

                dispatch(
                    setUser({
                        ...user,
                        profile_completed: true,
                    })
                );

                router.push(redirectTo);
            } catch (error) {
                console.error("Profile update failed:", error);
            }
        }
    }
}
