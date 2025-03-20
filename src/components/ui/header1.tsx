import React from "react";

interface HeaderOneProps {
    children: React.ReactNode;
    type: number;
    className?: string;
}

const HeaderOne: React.FC<HeaderOneProps> = ({ children, type, className = "" }) => {
    let fontSize;
    if (type === 1) {
        fontSize = "text-4xl md:text-7xl";
    } else {
        fontSize = "text-3xl md:text-6xl";
    }
    return (
        <span
            className={`${fontSize} font-bold text-[#1C1C28]/80 leading-tight !font-circular ${className}`}
        >
            {children}
        </span>
    );
};

export default HeaderOne;
