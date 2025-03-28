"use client";

import Logo from "@/components/Logo";
import { Linkedin, Instagram } from "lucide-react";
import { COMINGSOON, FAQS } from "@/components/ConstantLinks";
import Link from "next/link";
import { event } from "@/lib/gtag";


const trackFooterLinkClick = (linkName: string, category: string) => {    
    event({
        action: "click",
        category: category,
        label: linkName,
        value: 1,
    });
};

interface FooterProps { full?: boolean; };

const Footer: React.FC<FooterProps> = ({ full = true }) => {

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
                                    <li><Link href={COMINGSOON} className="hover:text-gray-900 !font-circular-med" onClick={() => trackFooterLinkClick("About", "Footer Quick Links")}>About</Link></li>
                                    <li><Link href={COMINGSOON} className="hover:text-gray-900 !font-circular-med" onClick={() => trackFooterLinkClick("Services", "Footer Quick Links")}>Services</Link></li>
                                    <li><Link href={FAQS} className="hover:text-gray-900 !font-circular-med" onClick={() => trackFooterLinkClick("FAQs", "Footer Quick Links")}>FAQs</Link></li>
                                    <li><Link href={COMINGSOON} className="hover:text-gray-900 !font-circular-med" onClick={() => trackFooterLinkClick("Contact", "Footer Quick Links")}>Contact</Link></li>
                                </ul>
                            </div>

                            {/* Legal Links */}
                            <div className="hidden md:block space-y-3">
                                <h3 className="text-gray-900 !font-circular font-bold text-lg">Legal</h3>
                                <ul className="text-gray-500 space-y-2">
                                    <li><Link href={COMINGSOON} className="hover:text-gray-900 !font-circular-med" onClick={() => trackFooterLinkClick("Privacy Policy", "Footer Legal Links")}>Privacy Policy</Link></li>
                                    <li><Link href={COMINGSOON} className="hover:text-gray-900 !font-circular-med" onClick={() => trackFooterLinkClick("Terms and Conditions", "Footer Legal Links")}>Terms and Conditions</Link></li>
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
                                        onClick={() => trackFooterLinkClick("LinkedIn", "Footer Social Links")}
                                    >
                                        <Linkedin size={24} />
                                    </a>

                                    <a
                                        href="https://www.instagram.com/nvigoio?igsh=MWNhcTluaGRtenFzZw=="
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="text-gray-500 hover:text-gray-900 !font-circular-med"
                                        onClick={() => trackFooterLinkClick("Instagram", "Footer Social Links")}
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
