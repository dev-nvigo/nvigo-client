import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { SessionSyncer } from "@/components/SessionSyncer";
import "./globals.css";


export const metadata = {
    title: "NviGo - Navigational Amigo",
    description: "Helping international students simplify life abroad.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <SessionSyncer />
                    <Toaster position="bottom-center" gutter={56} />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
