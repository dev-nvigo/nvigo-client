import React from "react";
import GridBackground from "./GridBackground";
import ImageGrid from "./grid/ImageGrid";
import HeaderOne from "@/components/ui/header1";
import HeaderTwo from "@/components/ui/header2";
import SubText from "@/components/ui/sub-text";
import CTAButton from "@/components/ui/ctabutton";
import { COMINGSOON } from "@/components/ConstantLinks";


const Hero = () => {
    return (
        <div className="w-full h-full min-h-[90vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-white">
            <GridBackground />
            <div className="relative w-full flex flex-col md:flex-row items-center justify-center px-10 gap-10 max-w-7xl mx-auto">
                <div className="flex flex-col w-full md:max-w-[50%] items-center md:items-start">
                    <HeaderOne type={1}>Moving Abroad</HeaderOne>
                    <HeaderTwo className="mt-3 text-c-blue-200">Made Simple</HeaderTwo>
                    <SubText>Manage everything—loans, housing, SIM cards,</SubText>
                    <SubText>banking, jobs, and more—all in one place.</SubText>
                    <SubText>Nvigo makes your transition effortless.</SubText>
                    <CTAButton className="mt-5 bg-c-blue-200 hover:bg-c-blue-200-h" href={COMINGSOON}>Explore Services</CTAButton>
                </div>
                <ImageGrid />
            </div>

        </div>
    );
};

export default Hero;
