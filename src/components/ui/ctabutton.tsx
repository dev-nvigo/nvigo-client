import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TrackerLink from "../TrackerLink";


interface CTAButtonProps {
    children: React.ReactNode;
    label: string;
    className?: string;
    href: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ children, label, className = "", href }) => {
    return (
        <Button
            className={`cursor-pointer relative text-white text-base md:text-xl p-4 md:p-6 rounded-md shadow-md transition-all duration-300 w-fit ${className}`}
        >
            <TrackerLink action="click" category="CTA" label={label} href={href} className="flex !font-circular-book items-center gap-2">
                {children} <ArrowRight className="h-5 w-5" />
            </TrackerLink>
        </Button>
    );
};

export default CTAButton;