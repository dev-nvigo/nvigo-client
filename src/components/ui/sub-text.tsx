import React from "react";

interface SubTextProps {
    children: React.ReactNode;
    className?: string;
}

const SubText: React.FC<SubTextProps> = ({ children, className = "" }) => {
    return (
        <span
            className={`py-1 text-[3vw] md:text-2xl text-c-white-600 leading-none !font-circular-book ${className}`}
        >
            {children}
        </span>
    );
};

export default SubText;
