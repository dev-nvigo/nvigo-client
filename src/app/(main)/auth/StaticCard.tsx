import Image from 'next/image';

const StaticCard: React.FC = () => {
    return (
        <div className="hidden md:flex w-full h-[120vh] justify-center items-center p-10 max-w-[50vw]">
            <div className="relative w-[80%] h-full bg-gradient-to-t from-[#16B57F] to-[#61C986] rounded-xl shadow-md overflow-hidden flex flex-col items-center text-center justify-evenly">
                <div className="z-10 text-white">
                    <h1 className="text-3xl leading-tight !font-circular-book">
                        Welcome to Nvigo
                    </h1>
                    <p className="mt-4 text-xl !font-circular-book">
                        Effortless Transition
                    </p>
                </div>
                <Image
                    src="/images/Uni.svg"
                    alt="University Building"
                    width={5}
                    height={5}
                    objectFit=""
                    className="w-full"
                    priority
                />
                <div className="z-10 mb-8">
                    <h2 className="text-3xl !font-circular-book text-white">
                        Find your Room
                    </h2>
                    <p className="text-2xl md:text-base text-white !font-circular-book">
                        Effortlessly find your need to run your show
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StaticCard;
