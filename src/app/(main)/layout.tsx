import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
