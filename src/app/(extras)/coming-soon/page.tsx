import ConstructionGear from "@/components/animations/ConstructionGears";
import Subscribe from "@/components/ui/subscribe";

const ComingSoon = () => {
    return (
        <div className="flex flex-col items-center justify-start text-center px-6">
            <div className="w-[70vw] md:w-[50vw] lg:w-[30vw] mx-auto">
                <ConstructionGear />
            </div>

            <Subscribe />
        </div>
    );
};

export default ComingSoon;
