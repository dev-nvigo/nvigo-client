"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const gearPositions = [
    { src: "/images/gears/gear-5.svg", top: "0%", left: "0%", size: "5vw", direction: -1 },
    { src: "/images/gears/gear-4.svg", top: "0%", left: "8%", size: "5vw", direction: -1 },
    { src: "/images/gears/gear-1.svg", top: "0%", left: "16%", size: "5vw", direction: 1 },
    { src: "/images/gears/gear-2.svg", top: "0%", left: "24%", size: "5vw", direction: 1 },
    { src: "/images/gears/gear-3.svg", top: "0%", left: "32%", size: "5vw", direction: 1 },
    { src: "/images/gears/gear-2.svg", top: "0%", left: "40%", size: "5vw", direction: -1 },
    { src: "/images/gears/gear-5.svg", top: "0%", left: "48%", size: "5vw", direction: 1 },
    { src: "/images/gears/gear-1.svg", top: "0%", left: "64%", size: "5vw", direction: -1 },
];

const ConstructionImage = () => {
    return (
        <div className="relative w-full max-w-[50vw] mx-auto aspect-[7/4]">
            {/* Gears with Adjusted Positions */}
            {gearPositions.map((gear, index) => (
                <motion.div
                    key={index}
                    className="absolute"
                    style={{
                        top: gear.top,
                        left: gear.left,
                        width: gear.size,
                        height: gear.size,
                    }}
                    animate={{
                        rotate: [0, 360 * gear.direction], // Full rotation
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 10 + (index % 3), // Slight variation in speed
                        ease: "linear",
                    }}
                >
                    <Image
                        src={gear.src}
                        alt={`Gear ${index + 1}`}
                        width={100} // Placeholder
                        height={100} // Placeholder
                        className="w-full h-full object-contain"
                    />
                </motion.div>
            ))}

            {/* Workers - Adjusted Size & Position */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[65%]">
                <Image
                    src="/images/workers.svg"
                    alt="Workers"
                    width={500}
                    height={400}
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
};

export default ConstructionImage;
