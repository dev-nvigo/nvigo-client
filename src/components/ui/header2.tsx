import React from "react";

interface HeaderTwoProps {
    children: React.ReactNode;
    className?: string;
}

const HeaderTwo: React.FC<HeaderTwoProps> = ({ children, className = "" }) => {
    return (
        <span
            className={`text-[12vw] xs:text-[15vw] md:text-7xl leading-none !font-orange-juice ${className}`}
        >
            {children}
        </span>
    );
};

export default HeaderTwo;
