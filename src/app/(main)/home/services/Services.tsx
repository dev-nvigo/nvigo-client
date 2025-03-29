import React from "react";
import FloatingQuestions from "./FloatingQuestions";
import HeaderOne from "@/components/ui/header1";
import HeaderTwo from "@/components/ui/header2";
import SubText from "@/components/ui/sub-text";
import CTAButton from "@/components/ui/ctabutton";
import { COMINGSOON } from "@/components/ConstantLinks";


const Services = () => {
    return (
        <section id="services" className="relative w-full md:min-h-screen flex items-center justify-center overflow-hidden bg-white mt-15 md:mt-0">
            <div className="relative w-full flex flex-col-reverse md:flex-row items-center justify-center px-5 md:px-10 gap-10">
                <FloatingQuestions />
                <div className="flex flex-col w-full md:max-w-[50%] items-center md:items-start">
                    <h2 className="flex flex-col md:block items-center md:items-start">
                        <HeaderOne type={2}>Everything You Need,&nbsp;</HeaderOne>
                        <HeaderTwo className="mt-3 text-c-green-100">Hassle-Free</HeaderTwo>
                    </h2>
                    <SubText>Seamlessly access trusted vendors for housing,</SubText>
                    <SubText>banking, SIM cards, travel, and more. All in one</SubText>
                    <SubText>place. Make your transition effortless and focus</SubText>
                    <SubText>on your journey, stress-free!</SubText>
                    <CTAButton className="mt-5 bg-c-green-100 hover:bg-c-green-0" category="Services" href={COMINGSOON}>View All Services</CTAButton>
                </div>
            </div>
        </section>
    );
};

export default Services;
