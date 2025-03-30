"use client";

import React, { useState } from "react";
import Logo from "../Logo";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { BLOGS, COMINGSOON, LOGIN, SERVICES, SIGNUP } from "../ConstantLinks";
import TrackerLink from "../TrackerLink";
import { DialogTitle } from "../ui/dialog";


const Navbar = () => {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    return (
        <div id="navbar" className="top-0 left-0 w-full bg-white shadow z-50">
            <div className="flex items-center justify-between pl-6 pr-2 md:px-16 py-0 h-full">
                <Logo />

                {/* Desktop Navigation */}
                <div className="flex flex-row">
                    <div className="lg:flex items-center gap-8">
                        <div className="hidden lg:flex">
                            <Button variant="ghost" className="text-base hover:bg-[#16B57F] text-[#232334]">
                                <TrackerLink action="click" category="Navbar" label="Services" href={SERVICES} className="!font-circular-book">Services</TrackerLink>
                            </Button>
                            <Button variant="ghost" className="text-base hover:bg-[#16B57F] text-[#232334]">
                                <TrackerLink action="click" category="Navbar" label="Forums" href={COMINGSOON} className="!font-circular-book">Forums</TrackerLink>
                            </Button>
                            <Button variant="ghost" className="text-base hover:bg-[#16B57F] text-[#232334]">
                                <TrackerLink action="click" category="Navbar" label="GoTools" href={COMINGSOON} className="!font-circular-book">GoTools</TrackerLink>
                            </Button>
                            <Button variant="ghost" className="text-base hover:bg-[#16B57F] text-[#232334]">
                                <TrackerLink action="click" category="Navbar" label="Blogs" href={BLOGS} className="!font-circular-book">Blogs</TrackerLink>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        className="text-base !font-circular-book text-[#232334] hover:bg-[#fe6b64] hover:text-white"
                    >
                        <TrackerLink action="click" category="Navbar" label="Login" href={LOGIN} className="!font-circular">Log In</TrackerLink>
                    </Button>
                    <Button
                        variant="default"
                        className="bg-[#fe6b64] text-white px-4 py-2 text-xs md:text-sm rounded-md hover:bg-[#e85c56]"
                    >
                        <TrackerLink action="click" category="Navbar" label="SignUp" href={SIGNUP} className="!font-circular font-bold">Sign Up</TrackerLink>
                    </Button>
                    <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="!h-5 !w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <DialogTitle className="text-center !font-circular text-3xl mb-3">Features</DialogTitle>
                            <hr className="border-t border-gray-300 mb-10" />
                            <div className="flex flex-col gap-6 mt-8 items-center">
                                <Button className="!font-circular-book text-2xl" variant="ghost" onClick={() => setOpenMobileMenu(false)}>
                                    <TrackerLink action="click" category="Navbar" label="" href={COMINGSOON}>Services</TrackerLink>
                                </Button>
                                <hr className="border-t w-[75%] border-gray-300" />
                                <Button className="!font-circular-book text-2xl" variant="ghost" onClick={() => setOpenMobileMenu(false)}>
                                    <TrackerLink action="click" category="Navbar" label="" href={COMINGSOON}>Forums</TrackerLink>
                                </Button>
                                <hr className="border-t w-[75%] border-gray-300" />
                                <Button className="!font-circular-book text-2xl" variant="ghost" onClick={() => setOpenMobileMenu(false)}>
                                    <TrackerLink action="click" category="Navbar" label="" href={COMINGSOON}>GoTools</TrackerLink>
                                </Button>
                                <hr className="border-t w-[75%] border-gray-300" />
                                <Button className="!font-circular-book text-2xl" variant="ghost" onClick={() => setOpenMobileMenu(false)}>
                                    <TrackerLink action="click" category="Navbar" label="" href={BLOGS}>Blogs</TrackerLink>
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
