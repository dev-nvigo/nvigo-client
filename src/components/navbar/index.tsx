"use client";

import React, { useState } from "react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { COMINGSOON, LOGIN, SIGNUP } from "@/components/ConstantLinks";
import Link from "next/link";

const Navbar = () => {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    return (
        <div id="navbar" className="top-0 left-0 w-full bg-white shadow z-50">
            <div className="flex items-center justify-between px-6 md:px-16 py-0 h-full">
                <Logo />

                {/* Desktop Navigation */}
                <div className="flex flex-row">
                    <div className="lg:flex items-center gap-8">
                        <div className="hidden lg:flex">
                            <Button variant="ghost" className="text-base !font-circular-book hover:bg-[#16B57F] text-[#232334]">
                                <Link href={COMINGSOON}>Services</Link>
                            </Button>
                            <Button variant="ghost" className="text-base !font-circular-book hover:bg-[#16B57F] text-[#232334]">
                                <Link href={COMINGSOON}>Forums</Link>
                            </Button>
                            <Button variant="ghost" className="text-base !font-circular-book hover:bg-[#16B57F] text-[#232334]">
                                <Link href={COMINGSOON}>GoTools</Link>
                            </Button>
                            <Button variant="ghost" className="text-base !font-circular-book hover:bg-[#16B57F] text-[#232334]">
                                <Link href={COMINGSOON}>Blogs</Link>
                            </Button>
                        </div>
                    </div>

                </div>

                <div>
                    <Button
                        variant="ghost"
                        className="text-base !font-circular-book text-[#232334] hover:bg-[#fe6b64] hover:text-white"
                    >
                        <Link href={LOGIN}>Log In</Link>
                    </Button>
                    <Button
                        variant="default"
                        className="bg-[#fe6b64] text-white px-4 py-2 text-xs md:text-sm rounded-md hover:bg-[#e85c56] !font-circular font-bold"
                    >
                        <Link href={SIGNUP}>Sign Up</Link>
                    </Button>
                    {/* Mobile Menu */}
                    <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col gap-6 mt-8">
                                <Button className="!font-circular-book" variant="ghost">
                                    <Link href={COMINGSOON}>Services</Link>
                                </Button>
                                <Button className="!font-circular-book" variant="ghost">
                                    <Link href={COMINGSOON}>Forums</Link>
                                </Button>
                                <Button className="!font-circular-book" variant="ghost">
                                    <Link href={COMINGSOON}>GoTools</Link>
                                </Button>
                                <Button className="!font-circular-book" variant="ghost">
                                    <Link href={COMINGSOON}>Blogs</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
