import React from "react";
import Link from "next/link";


interface NavbarLogoProps { isFooter?: boolean };

const NavbarLogo: React.FC<NavbarLogoProps> = ({ isFooter = false }) => {
    const fontSize = isFooter ? "text-[10vh] xs:text-6xl md:text-5xl lg:text-7xl" : "text-6xl md:text-5xl lg:text-7xl";
    return (
        <Link href="/" className="flex items-center">
            <div className="relative w-[10vw] flex items-center">
                <span
                    className={`text-[#0A8ED9] tracking-wide mt-2 !font-orange-juice ${fontSize}`}
                >
                    Nvi
                </span>

                <span
                    style={{
                        background: "conic-gradient(from 153deg, #FE6B64 28%, #569DDF 40%, #61C986 63%, #FDB900 86%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                    className={`tracking-wide mt-2 !font-orange-juice ${fontSize}`}
                >
                    Go
                </span>
            </div>
        </Link>
    );
};

export default NavbarLogo;
