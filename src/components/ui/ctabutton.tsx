"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { event } from "@/lib/gtag";


interface CTAButtonProps {
    children: React.ReactNode;
    category: string;
    className?: string;
    href: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ children, category, className = "", href }) => {
    const handleClick = () => {
        event({
            action: "click",
            category: `${category} CTA`,
            label: children?.toString() || "",
            value: 1,
        });
    };

    return (
        <Button
            className={`cursor-pointer relative text-white text-base md:text-xl p-4 md:p-6 rounded-md shadow-md transition-all duration-300 w-fit ${className}`}
            onClick={handleClick}
        >
            <Link href={href} className="flex !font-circular-book items-center gap-2">
                {children} <ArrowRight className="h-5 w-5" />
            </Link>
        </Button>
    );
};

export default CTAButton;
