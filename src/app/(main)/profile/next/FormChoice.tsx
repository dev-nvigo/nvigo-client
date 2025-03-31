"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CurrentStudentForm from "./CurrentStudentForm";
import IncomingStudentForm from "./IncomingStudentForm";
import RecentGraduateForm from "./RecentGraduateForm";
import WorkingProfessionalForm from "./WorkingProfessionalForm";

export default function FormChoice({ status }: { status: string}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";

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

    async function handleSubmit(data: any) {
        // Send to Supabase → update profile
        // Dispatch setUser() if needed
        // Redirect to `/services` or wherever
        console.log("Submitted form data:", data);
        router.push(redirectTo);
    }
}
