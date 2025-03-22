"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import Image from "next/image";
import { gridData } from "@/data/heroItems";


const GridCarousel = () => {
    const [index, setIndex] = useState(0);

    const handlers = useSwipeable({
        onSwipedLeft: () => setIndex((prev) => (prev + 1) % gridData.length),
        onSwipedRight: () => setIndex((prev) => (prev - 1 + gridData.length) % gridData.length),
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    return (
        <>
            {/* Mobile Carousel */}
            <div className="block md:hidden w-full mt-5 overflow-hidden mb-5 flex-grow" {...handlers}>
                <motion.div
                    className="flex w-full"
                    animate={{ x: `-${index * 100}%` }}
                    transition={{ ease: "easeInOut", duration: 0.5 }} // ✅ Smooth transition
                >
                    {gridData.map((item, i) => (
                        <div
                            key={i}
                            className="w-full min-w-full flex flex-col items-left text-left p-6 rounded-xl justify-end"
                            style={{ backgroundColor: item.bgColor }}
                        >
                            {/* Image: Auto scales but doesn't exceed 40vh */}
                            <Image
                                src={item.src}
                                alt={item.alt}
                                width={500}
                                height={500}
                                className="w-[100%] h-auto max-h-[40vh] aspect-[4/3]"
                            />
                            <h2 className={`mt-4 text-2xl font-bold ${item.textColor} !font-circular`}>{item.alt}</h2>
                            <p className={`text-base mt-1 font-semibold ${item.textColor} !font-circular-book`}>
                                {item.line_1}
                            </p>
                            <p className={`text-xs mt-1 ${item.textColor} !font-circular-book`}>
                                {item.line_2}
                            </p>
                            {/* <a href="#" className="mt-2 text-c-white-800 self-start text-left">
                                Learn More
                            </a> */}
                        </div>
                    ))}
                </motion.div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                    {gridData.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                // ✅ Smooth transition when clicking dots
                                setIndex((prev) => (prev === i ? prev : i));
                            }}
                            className={`w-3 h-3 rounded-full ${index === i ? "bg-black" : "bg-gray-400"} transition-all duration-300`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default GridCarousel;
