import ReduxProvider from "./providers/Provider";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import Analytics from "@/components/Analytics";
import "./globals.css";

export const metadata = {
    title: "NviGo - Navigational Amigo",
    description: "Helping international students simplify life abroad.",
};

const GA_TRACKING_ID = process.env.GA_TRACKING_ID!;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <Script
                    strategy="afterInteractive"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <Script
                    id="gtag-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', { send_page_view: false });
            `,
                    }}
                />
            </head>
            <body>
                <ReduxProvider>
                    <Analytics />
                    <Toaster position="bottom-center" gutter={56} />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
