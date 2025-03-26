"use client";

import React, { useState } from "react";
import HeroBlogCard from "./HeroBlogCard";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/lib/blogService";


export default function Hero ({ featuredBlogs }: { featuredBlogs: BlogPost[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 3) % featuredBlogs.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex - 3 < 0 ? featuredBlogs.length - 3 : prevIndex - 3
        );
    };

    return (
        <div className="hidden md:flex flex-col justify-center items-center w-full gap-4">
            {/* Top Section: Left Arrow, Cards, Right Arrow */}
            <div className="flex w-full justify-center items-center gap-4">
                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    className="text-white bg-black bg-opacity-30 p-2 rounded-full"
                >
                    ◀
                </button>

                {/* Card Section */}
                <div className="relative grid grid-flow-col grid-rows-2 gap-6 w-[80vw]">
                    {featuredBlogs.slice(activeIndex, activeIndex + 3).map((blog, index) => (
                        <div
                            key={index}
                            className={index === 0 ? "row-span-2 col-span-2" : "col-span-1"}
                        >
                            <HeroBlogCard blog={blog} size={index === 0 ? "large" : "small"} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    className="text-white bg-black bg-opacity-30 p-2 rounded-full"
                >
                    ▶
                </button>
            </div>

            {/* Bottom Section: Dots Navigation */}
            <div className="flex gap-2">
                {Array.from({ length: Math.ceil(featuredBlogs.length / 3) }).map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setActiveIndex(index * 3)}
                        className={cn(
                            "w-3 h-3 rounded-full transition-all cursor-pointer",
                            activeIndex === index * 3 ? "bg-black scale-110" : "bg-gray-400"
                        )}
                    />
                ))}
            </div>
        </div>
    );
};
