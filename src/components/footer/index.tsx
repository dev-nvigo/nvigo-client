import Logo from "@/components/Logo";
import { Linkedin, Instagram } from "lucide-react";

interface FooterProps { full?: boolean; };

export default function Footer({ full = true }) {
    return (
        <footer className="w-full bg-white pb-5">
            <div className="max-w-6xl mx-auto px-6">
                {/* Main Footer Section */}
                {full &&
                    <div className="flex flex-row justify-between items-start gap-4 mt-10">
                        {/* Left Section: Logo & Description */}
                        <div className="max-w-sm space-y-4">
                            <div className="h-12">
                                <Logo isFooter={true} />
                            </div>
                            <p className="hidden md:block text-gray-500 text-lg !font-circular-book">
                                Simplifying study abroad with essential services, all in one place.
                            </p>
                        </div>

                        {/* Center Section: Quick Links & Legal */}
                        <div className="flex flex-wrap gap-16 mr-2 md:mr-10">
                            {/* Quick Links */}
                            <div className="hidden md:block space-y-3">
                                <h3 className="text-gray-900 !font-circular font-bold text-lg">Quick Links</h3>
                                <ul className="text-gray-500 space-y-2">
                                    <li><a href="/about" className="hover:text-gray-900 !font-circular-med">About</a></li>
                                    <li><a href="/services" className="hover:text-gray-900 !font-circular-med">Services</a></li>
                                    <li><a href="/faqs" className="hover:text-gray-900 !font-circular-med">FAQs</a></li>
                                    <li><a href="/contact" className="hover:text-gray-900 !font-circular-med">Contact</a></li>
                                </ul>
                            </div>

                            {/* Legal Links */}
                            <div className="hidden md:block space-y-3">
                                <h3 className="text-gray-900 !font-circular font-bold text-lg">Legal</h3>
                                <ul className="text-gray-500 space-y-2">
                                    <li><a href="/privacy-policy" className="hover:text-gray-900 !font-circular-med">Privacy Policy</a></li>
                                    <li><a href="/terms" className="hover:text-gray-900 !font-circular-med">Terms and Conditions</a></li>
                                </ul>
                            </div>

                            {/* Right Section: Social Links */}
                            <div className="space-y-3">
                                <h3 className="text-gray-900 !font-circular font-bold text-lg">Reach us out</h3>
                                <div className="flex justify-end md:justify-start space-x-4">
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
                    Built with ❤️ by Nvigo Team | © 2025 Nvigo. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
