import React from "react";
import Hero from "./home/hero/Hero";
import Services from "./home/services/Services";
import Features from "./home/Features";
import BlogScroll from "./home/BlogScroll";
import FAQs from "@/components/FAQs";


export const metadata = {
    title: "NviGo - Study Abroad Made Simple for International Students",
    description: "NviGo simplifies your move abroad by helping you explore housing, banking, jobs, SIM cards, and more — all in one place for international students.",
    openGraph: {
        title: "NviGo - All-in-One Platform for International Students",
        description: "Explore verified vendors, get expert guidance, and access student services on NviGo — your go-to companion abroad.",
        url: "https://www.nvigo.io",
        siteName: "NviGo",
        type: "website"
    }
}

const Home = () => {
    return (
        <div className="flex flex-col">
            <Hero />
            <Services />
            <Features />
            <BlogScroll />
            <FAQs />
        </div>
    );
};

export default Home;
