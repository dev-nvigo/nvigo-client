import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";


const NotFound = () => {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Navbar />
            <div className="flex flex-col items-center justify-start text-center px-6">
                <div className="mt-10 md:mt-0 w-full max-w-[65vw] md:max-w-[25vw] mx-auto">
                    <Image
                        src="/images/404.svg"
                        alt="Workers"
                        width={500}
                        height={400}
                        className="w-full h-auto"
                    />
                </div>

                {/* Header */}
                <h1 className="mt-4 text-base sm:text-base md:text-4xl !font-circular text-black">
                    Oops! Looks Like You Took a Wrong Turn.
                </h1>

                {/* Content */}
                <p className="mt-3 text-[0.6em] sm:text-[0.6em] md:text-sm !font-circular-book text-black max-w-2xl">
                    This page seems lost in transit—just like your luggage at the airport! 🧳
                </p>
                <p className="text-[0.6em] sm:text-[0.6em] md:text-sm !font-circular-book text-black">
                    Try heading back home or checking out our services.
                </p>
            </div>
            <Footer full={false} />
        </div>
    );
};

export default NotFound;
