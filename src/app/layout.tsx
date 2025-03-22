import ReduxProvider from "./providers/Provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
    title: "NviGo - Navigational Amigo",
    description: "Helping international students from admission to graduation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    <Toaster position="bottom-center" gutter={56} />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
