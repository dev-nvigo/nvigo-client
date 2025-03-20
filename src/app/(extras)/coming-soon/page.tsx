"use client"
import ConstructionGear from "@/components/animations/ConstructionGears";
import Subscribe from "./Subscribe";

const ComingSoon = () => {
    return (
        <div className="flex flex-col items-center justify-start text-center px-6">
            <div className="w-[70vw] md:w-[50vw] lg:w-[30vw] mx-auto">
                <ConstructionGear />
            </div>

            {/* Header */}
            <h1 className="mt-4 text-xl sm:text-xl md:text-3xl !font-circular text-black">
                We're Almost Ready to Launch! 🚀
            </h1>

            {/* Content */}
            <p className="mt-3 text-xs sm:text-xs md:text-sm !font-circular-book text-black max-w-2xl">
                Very soon, <span className="!font-circular font-bold">Nvigo</span> will be fully live—
                with all the features and services you need!
            </p>
            <p className="text-xs sm:text-xs md:text-sm !font-circular-book text-black">
                In the meantime, stay tuned and get ready for something exciting. 🎉
            </p>

            {/* Call to Action */}
            <Subscribe />
        </div>
    );
};

export default ComingSoon;
