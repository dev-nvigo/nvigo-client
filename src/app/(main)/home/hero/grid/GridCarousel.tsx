"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import Image from "next/image";
import TrackerLink from "@/components/TrackerLink";
import { gridData } from "@/data/heroItems";


const GridCarousel = () => {
    const [index, setIndex] = useState(0);
    const [timerDuration, setTimerDuration] = useState(3000);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = useCallback((duration: number) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % gridData.length);
        }, duration);
    }, []);

    useEffect(() => {
        startTimer(timerDuration);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [timerDuration, startTimer]);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            setIndex((prev) => (prev + 1) % gridData.length);
            setTimerDuration(5000); // Set the timer duration to 5 seconds after swipe
        },
        onSwipedRight: () => {
            setIndex((prev) => (prev - 1 + gridData.length) % gridData.length);
            setTimerDuration(5000); // Set the timer duration to 5 seconds after swipe
        },
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
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                >
                    {gridData.map((item, i) => (
                        <TrackerLink
                            key={i}
                            className="w-full min-w-full flex flex-col p-6 rounded-xl justify-end"
                            style={{ backgroundColor: item.bgColor }}
                            href={`/services?service=${item.slug}`}
                            action="card-click" label={item.slug} category="Services"
                        >
                            {/* Image: Auto scales but doesn't exceed 40vh */}
                            <Image
                                src={item.src}
                                alt={item.alt}
                                width={500}
                                height={500}
                                className="w-[100%] h-auto max-h-[40vh] aspect-[4/3]"
                            />
                            <h2 className={`mt-4 text-2xl font-bold ${item.textColor} !font-circular self-center text-center`}>{item.alt}</h2>
                            <p className={`text-base mt-1 font-semibold ${item.textColor} !font-circular-book`}>
                                {item.line_1}
                            </p>
                            <p className={`text-xs mt-1 ${item.textColor} !font-circular-book`}>
                                {item.line_2}
                            </p>
                        </TrackerLink>
                    ))}
                </motion.div>

                {/* Pagination Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                    {gridData.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
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
