import React from "react";

interface SubTextProps {
    children: React.ReactNode;
    className?: string;
}

const SubText: React.FC<SubTextProps> = ({ children, className = "" }) => {
    return (
        <span
            className={`text-sm py-1 md:text-2xl text-c-white-600 leading-none !font-circular-book ${className}`}
        >
            {children}
        </span>
    );
};

export default SubText;
