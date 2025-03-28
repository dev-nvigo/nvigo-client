"use client";

import React from "react";
// import React, { useState } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
// import { Menu } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { COMINGSOON } from "@/components/ConstantLinks";
import Link from "next/link";
import { event } from "@/lib/gtag";


const trackNavbarLinkClick = (linkName: string) => {
    event({
        action: "click",
        category: "Navbar Link",
        label: linkName,
        value: 1,
    });
};

const Navbar = () => {
    // const [openMobileMenu, setOpenMobileMenu] = useState(false);

    return (
        <div id="navbar" className="top-0 left-0 w-full bg-white shadow z-50">
            <div className="flex items-center justify-between px-6 md:px-16 py-0 h-full">
                <Logo />

                {/* Desktop Navigation */}
                <div className="flex flex-row">
                    <div className="lg:flex items-center gap-8">
                        <div className="hidden lg:flex">
                            <Button variant="ghost" className="text-base hover:bg-[#16B57F] text-[#232334]" onClick={() => trackNavbarLinkClick("Services")}>
                                <Link href={COMINGSOON} className="!font-circular-book">Services</Link>
                            </Button>
                            <Button variant="ghost" className="text-base hover:bg-[#16B57F] text-[#232334]" onClick={() => trackNavbarLinkClick("Forums")}>
                                <Link href={COMINGSOON} className="!font-circular-book">Forums</Link>
                            </Button>
                            <Button variant="ghost" className="text-base hover:bg-[#16B57F] text-[#232334]" onClick={() => trackNavbarLinkClick("GoTools")}>
                                <Link href={COMINGSOON} className="!font-circular-book">GoTools</Link>
                            </Button>
                            <Button variant="ghost" className="text-base hover:bg-[#16B57F] text-[#232334]" onClick={() => trackNavbarLinkClick("Blogs")}>
                                <Link href={COMINGSOON} className="!font-circular-book">Blogs</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {/* <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col gap-6 mt-8">
                                <Button className="!font-circular-book" variant="ghost" onClick={() => router.push(COMINGSOON)}>Services</Button>
                                <Button className="!font-circular-book" variant="ghost" onClick={() => router.push(COMINGSOON)}>Forums</Button>
                                <Button className="!font-circular-book" variant="ghost" onClick={() => router.push(COMINGSOON)}>GoTools</Button>
                                <Button className="!font-circular-book" variant="ghost" onClick={() => router.push(COMINGSOON)}>Blogs</Button>
                            </div>
                        </SheetContent>
                    </Sheet> */}
                </div>

                <Button
                    variant="default"
                    className="bg-[#fe6b64] text-white px-4 py-2 text-xs md:text-sm rounded-md hover:bg-[#e85c56]"
                    onClick={() => trackNavbarLinkClick("Join NviGo")}
                >
                    <Link href={COMINGSOON} className="!font-circular font-bold">Join NviGo</Link>
                </Button>
            </div>
        </div>
    );
};

export default Navbar;
