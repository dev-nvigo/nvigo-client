import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function MinBaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Navbar />
            <main>{children}</main>
            <Footer full={false}/>
        </div>
    );
}
