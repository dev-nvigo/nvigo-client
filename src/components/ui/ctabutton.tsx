import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


interface CTAButtonProps {
    children: React.ReactNode;
    className?: string;
    href: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ children, className = "", href }) => {
    return (
        <Button className={`cursor-pointer relative !font-circular-book text-white text-base md:text-xl p-4 md:p-6 rounded-md shadow-md transition-all duration-300 w-fit ${className}`}>
            <Link href={href} className="flex items-center gap-2">
                {children} <ArrowRight className="h-5 w-5" />
            </Link>
        </Button>
    );
};

export default CTAButton;