import HeaderTwo from "@/components/ui/header2";
import SubText from "@/components/ui/sub-text";
import CTAButton from "@/components/ui/ctabutton";
import Cards from "@/components/ui/cards";
import { BLOGS } from "@/components/ConstantLinks";
import { fetchRecentBlogs } from '@/lib/blogService';
import { notFound } from "next/navigation";


export default async function BlogScroll () {
    const { data: recent_blogs } = await fetchRecentBlogs(9);
    if (!recent_blogs) return notFound();

    return (
        <section className="w-full md:min-h-screen py-12 px-6 md:px-12 lg:px-20">
            <div className="flex flex-col md:flex-row justify-between items:start md:items-center mb-6">
                <h2 className="flex flex-col">
                    <HeaderTwo className="mt-3 text-c-teal-0">Fresh News</HeaderTwo>
                    <SubText>Hot off the press</SubText>
                </h2>
                <CTAButton href={BLOGS} className="mt-5 bg-c-teal-0 hover:bg-c-teal-0-h">View All</CTAButton>
            </div>
            <Cards cards={recent_blogs} basePath={BLOGS} className="overflow-x-auto whitespace-nowrap px-4 py-2 flex gap-6" cardClassName="w-[min(80vw,20rem)] flex-shrink-0" />
        </section>
    );
};
