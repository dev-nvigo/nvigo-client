"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
    children: React.ReactNode;
    className?: string;
    href: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ children, className = "", href }) => {
    const router = useRouter();

    return (
        <Button
            onClick={() => router.push(href)}
            className={`cursor-pointer relative !font-circular-book flex items-center gap-2 text-white text-base md:text-xl p-4 md:p-6 rounded-md shadow-md transition-all duration-300 w-fit ${className}`}
        >
            {children} <ArrowRight className="h-5 w-5" />
        </Button>
    );
};

export default CTAButton;
