"use client";

import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { BlogPost } from "@/lib/blogService";
import HeroBlogCard from "./HeroBlogCard";


export default function BlogCarousel ({ featuredBlogs }: { featuredBlogs: BlogPost[] }) {
    const [current, setCurrent] = useState(0);
    const [carouselRef, setCarouselRef] = useState<CarouselApi | null>(null);

    useEffect(() => {
        if (!carouselRef) return;

        const handleSelect = () => {
            const index = carouselRef.selectedScrollSnap();
            setCurrent(index);
        };

        carouselRef.on("select", handleSelect);
        handleSelect(); // set initial

        return () => {
            carouselRef.off("select", handleSelect);
        };
    }, [carouselRef]);


    return (
        <div className="flex flex-col items-center md:hidden"> {/* Show only on mobile */}
            {/* <HeaderTwo>Featured Blogs</HeaderTwo> */}
            <Carousel
                setApi={setCarouselRef}
                className="mx-auto w-full max-w-sm px-2"
                opts={{
                    align: "start",
                }}
            >
                <CarouselContent
                    className="!ml-0"
                >
                    {featuredBlogs.map((blog, i) => (
                        <CarouselItem key={i} className="py-2 px-4">
                            <HeroBlogCard blog={blog} size="small" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Dot Navigation */}
            <div className="mt-2 flex justify-center gap-2">
                {featuredBlogs.map((_, i) => (
                    <span
                        key={i}
                        onClick={() => carouselRef?.scrollTo(i)}
                        className={`h-2 w-2 rounded-full transition-all cursor-pointer ${current === i ? "bg-primary" : "bg-muted"
                            }`}
                    />

                ))}
            </div>
        </div>
    );
};
