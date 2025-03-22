import React from "react";

interface HeaderTwoProps {
    children: React.ReactNode;
    smaller?: boolean;
    className?: string;
}

const HeaderTwo: React.FC<HeaderTwoProps> = ({ children, smaller = false, className = "" }) => {
    const fontSize = smaller ?
        "text-[8vw]"
        :
        "text-[12vw]";

    return (
        <span
            className={`${fontSize} xs:text-[15vw] md:text-7xl leading-none !font-orange-juice ${className}`}
        >
            {children}
        </span>
    );
};

export default HeaderTwo;
