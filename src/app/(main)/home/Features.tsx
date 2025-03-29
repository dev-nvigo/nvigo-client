import HeaderOne from "@/components/ui/header1";
import HeaderTwo from "@/components/ui/header2";
import SubText from "@/components/ui/sub-text";
import CTAButton from "@/components/ui/ctabutton";
import { featureData } from "@/data/features";
import Cards from "@/components/ui/cards";
import { COMINGSOON } from "@/components/ConstantLinks";


const Features = () => {
    return (
        <section id="features" className="w-full flex flex-col items-center text-center py-12 px-4 md:px-12 lg:px-20 mt-15 md:mt-0">
            <h2 className="max-w-4xl px-6 flex flex-col md:block items-center md:items-start">
                <HeaderOne type={2}>Things that&nbsp;</HeaderOne>
                <HeaderTwo className="mt-3 text-c-red-0">Matter!</HeaderTwo>
            </h2>
            <SubText>Everything international students need, all in one place.</SubText>
            <CTAButton className="mt-5 bg-c-red-0 hover:bg-c-red-0-h" label="Join" href={COMINGSOON}>Join NviGo</CTAButton>

            <Cards
                basePath=""
                cards={featureData}
                category="Features"
                className="flex flex-wrap md:flex-nowrap justify-center gap-10 mx-auto !text-left w-[80%] mt-10"
                cardClassName="w-[min(90vw,24rem)]"
            />
        </section>
    );
};

export default Features;
