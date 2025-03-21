"use client";

import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";
import Image from "next/image";

const gridData = [
    {
        src: "/svgs/image1.svg",
        alt: "Travel & Flight Booking",
        line_1: "✈️ Fly smarter, save more!",
        line_2: "Compare affordable flight options and get student discounts for a budget-friendly journey.",
        bgColor: "#569DDF",
        scale: ""
    },
    {
        src: "/svgs/image2.svg",
        alt: "Airport Pickup",
        line_1: "🚖 Stress-free airport rides!",
        line_2: "Skip the confusion—book reliable airport pickups to your university or city hassle-free.",
        bgColor: "#FF9A9E",
        scale: "scale-125"
    },
    {
        src: "/svgs/image3.svg",
        alt: "Health Insurance",
        line_1: "🩺 Get covered, stay safe!",
        line_2: "Find affordable health insurance plans tailored for international students.",
        bgColor: "#D7D3E4",
        scale: ""
    },
    {
        src: "/svgs/image4.svg",
        alt: "Tax Filing Assistance",
        line_1: "📑 File taxes without stress!",
        line_2: "Get expert guidance to file your U.S. taxes correctly and maximize returns.",
        bgColor: "#FE6B64",
        scale: ""
    },
    {
        src: "/svgs/image5.svg",
        alt: "Food & Grocery Delivery",
        line_1: "🥗 Eat well, live better!",
        line_2: "Find student meal plans, grocery delivery services, and budget-friendly dining options.",
        bgColor: "#C2785D",
        scale: "scale-115"
    },
    {
        src: "/svgs/image6.svg",
        alt: "Banking & Finances",
        line_1: "💳 Set up hassle-free banking!",
        line_2: "Open a student-friendly account, get credit cards, and manage finances easily in the U.S.",
        bgColor: "#61C986",
        scale: ""
    },
    {
        src: "/svgs/image7.svg",
        alt: "Job Portals & Placement",
        line_1: "💼 Kickstart your career!",
        line_2: "Explore job portals, internships, and networking opportunities to land your dream role.",
        bgColor: "#FFC107",
        scale: "scale-120"
    },
    {
        src: "/svgs/image8.svg",
        alt: "Mobile SIM & Data Plans",
        line_1: "📶 Stay connected anywhere!",
        line_2: "Choose from the best SIM card and data plans designed for international students.",
        bgColor: "#A7F2ED",
        scale: ""
    },
    {
        src: "/svgs/image9.svg",
        alt: "Housing Assistance",
        line_1: "🏠 Find a safe & affordable home!",
        line_2: "Navigating housing in a new country is tough, but we’ve got you covered with trusted rental options.",
        bgColor: "#FDB900",
        scale: ""
    },
];


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
                            className="w-full min-w-full flex flex-col items-center text-center p-6 rounded-xl justify-end"
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
                            <h2 className="mt-4 text-lg font-bold text-c-white-900">{item.alt}</h2>
                            <p className="text-sm mt-1 font-semibold text-c-white-800">
                                {item.line_1}
                            </p>
                            <p className="text-sm mt-1 text-white-800">
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
                            className={`w-3 h-3 rounded-full ${index === i ? "bg-black scale-110" : "bg-gray-400"} transition-all duration-300`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default GridCarousel;
