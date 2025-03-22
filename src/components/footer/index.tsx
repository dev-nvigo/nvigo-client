"use client";

import Logo from "@/components/Logo";
import { Linkedin, Instagram } from "lucide-react";
import { useRouter } from "next/navigation";
import { COMINGSOON, FAQS } from "@/components/ConstantLinks";

interface FooterProps { full?: boolean; };

const Footer: React.FC<FooterProps> = ({ full = true }) => {
    const router = useRouter();

    return (
        <footer className="w-full bg-white pb-5">
            <div className="max-w-6xl mx-auto px-6">
                {/* Main Footer Section */}
                {full &&
                    <div className="flex flex-row justify-between items-center md:items-start gap-4 mt-10">
                        {/* Left Section: Logo & Description */}
                        <div className="max-w-sm space-y-4">
                            <div className="h-12">
                                <Logo isFooter={true} />
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs md:text-lg !font-circular-book">
                                    Simplifying study abroad with
                                </p>
                                <p className="text-gray-500 text-xs md:text-lg !font-circular-book">
                                    essential services, all in one place.
                                </p>
                            </div>
                        </div>

                        {/* Center Section: Quick Links & Legal */}
                        <div className="flex flex-wrap gap-16 mr-2 md:mr-10">
                            {/* Quick Links */}
                            <div className="hidden md:block space-y-3">
                                <h3 className="text-gray-900 !font-circular font-bold text-lg">Quick Links</h3>
                                <ul className="text-gray-500 space-y-2">
                                    <li><button onClick={() => router.push(COMINGSOON)} className="hover:text-gray-900 !font-circular-med">About</button></li>
                                    <li><button onClick={() => router.push(COMINGSOON)} className="hover:text-gray-900 !font-circular-med">Services</button></li>
                                    <li><button onClick={() => router.push(FAQS)} className="hover:text-gray-900 !font-circular-med">FAQs</button></li>
                                    <li><button onClick={() => router.push(COMINGSOON)} className="hover:text-gray-900 !font-circular-med">Contact</button></li>
                                </ul>
                            </div>
                            
                            {/* Legal Links */}
                            <div className="hidden md:block space-y-3">
                                <h3 className="text-gray-900 !font-circular font-bold text-lg">Legal</h3>
                                <ul className="text-gray-500 space-y-2">
                                    <li><button onClick={() => router.push(COMINGSOON)} className="hover:text-gray-900 !font-circular-med">Privacy Policy</button></li>
                                    <li><button onClick={() => router.push(COMINGSOON)} className="hover:text-gray-900 !font-circular-med">Terms and Conditions</button></li>
                                </ul>
                            </div>

                            {/* Right Section: Social Links */}
                            <div className="space-y-3">
                                <h3 className="text-gray-900 !font-circular font-bold md:text-lg">Reach us out</h3>
                                <div className="flex justify-center md:justify-start space-x-4">
                                    <a
                                        href="https://www.linkedin.com/company/nvigoio/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        className="text-gray-500 hover:text-gray-900 !font-circular-med"
                                    >
                                        <Linkedin size={24} />
                                    </a>

                                    <a
                                        href="https://www.instagram.com/nvigoio?igsh=MWNhcTluaGRtenFzZw=="
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="text-gray-500 hover:text-gray-900 !font-circular-med"
                                    >
                                        <Instagram size={24} />
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                }

                {/* Divider */}
                <div className="border-t border-gray-300 my-8"></div>

                {/* Copyright */}
                <p className="text-center text-gray-700 text-xs md:text-lg !font-circular-book">
                    Built with ❤️ by NviGo Team | © 2025 NviGo. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
