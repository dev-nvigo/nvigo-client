import { ReactNode } from "react";
import AuthWrapper from "./AuthWrapper";

export const dynamic = "force-dynamic";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    return (
        <AuthWrapper>
            {children}
        </AuthWrapper>
    );
}
