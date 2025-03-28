"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";
import SubText from "@/components/ui/sub-text";
import HeaderTwo from "@/components/ui/header2";
import CTAButton from "@/components/ui/ctabutton";
import { FAQS } from "@/components/ConstantLinks";
import React from "react";


interface FAQsProps {
    isFull?: boolean;
}

function boldNviGo(text: string) {
    const regex = /NviGo/g; // This regex will match every instance of 'NviGo'
    return text.split(regex).map((part, index, array) => {
        if (index === array.length - 1) return part; // No need to wrap the last part
        return (
            <React.Fragment key={index}>
                {part}
                <span
                    className={`text-[#0A8ED9] tracking-wide mt-2 !font-orange-juice`}
                >
                    Nvi
                </span>

                <span
                    style={{
                        background: "conic-gradient(from 153deg, #FE6B64 28%, #569DDF 40%, #61C986 63%, #FDB900 86%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                    className={`tracking-wide mt-2 !font-orange-juice`}
                >
                    Go
                </span>
            </React.Fragment>
        );
    });
}

const FAQs: React.FC<FAQsProps> = ({ isFull = false }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqsData = isFull ? faqs : faqs.slice(0, 6);

    return (
        <section className="flex flex-col md:items-center md:justify-center pt-16 pb-8 md:pb-16 w-full">
            {/* Header */}
            <div className="text-center flex flex-col">
                <HeaderTwo smaller={true} className="text-[#3e965d] md:mb-4">Frequently Asked Questions</HeaderTwo>
                <SubText>We know moving abroad comes with a lot of questions.</SubText>
                <SubText>Here are some answers to help you get started!</SubText>
            </div>

            {/* FAQ List */}
            <div className="md:w-full max-w-[90vw] md:max-w-3xl mt-6 self-center">
                {faqsData.map((faq, index) => (
                    <div key={index} className="border-b border-gray-300">
                        <button
                            className="w-full flex justify-between items-center py-4 text-left text-sm md:text-lg focus:outline-none"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <div className="!font-circular-book">{boldNviGo(faq.question)}</div>
                            <ChevronDown
                                className={`min-w-5 min-h-5 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                            />
                        </button>
                        { openIndex === index && (
                        <p className="text-gray-600 text-sm md:text-base !font-circular-book pb-4 px-4">{boldNviGo(faq.answer)}</p>
                    )}
            </div>
                ))}
        </div>

            { !isFull && <CTAButton className="mt-7 bg-[#3e965d] hover:bg-[#357d4f] self-center" category="FAQs" href={FAQS}>Know More</CTAButton> }
        </section >
    );
}

export default FAQs;