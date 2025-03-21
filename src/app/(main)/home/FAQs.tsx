"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";
import SubText from "@/components/ui/sub-text";
import HeaderTwo from "@/components/ui/header2";


export default function FAQs() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="flex flex-col md:items-center md:justify-center pt-16 pb-8 md:pb-16 w-full">
            {/* Header */}
            <div className="text-center flex flex-col">
                <HeaderTwo className="text-[#3e965d]">Frequently Asked Questions</HeaderTwo>
                <SubText>We know moving abroad comes with a lot of questions.</SubText>
                <SubText>Here are some answers to help you get started!</SubText>
            </div>

            {/* FAQ List */}
            <div className="md:w-full max-w-[90vw] md:max-w-3xl mt-6 md:mt-12 self-center">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-300">
                        <button
                            className="w-full flex justify-between items-center py-4 text-left text-xs md:text-lg !font-circular-book focus:outline-none"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            {faq.question}
                            <ChevronDown
                                className={`min-w-5 min-h-5 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <p className="text-gray-600 text-xs md:text-base !font-circular-book pb-4 px-4">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
