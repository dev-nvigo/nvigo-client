import React from "react";
import Hero from "./home/hero/Hero";
import Services from "./home/services/Services";
import Features from "./home/Features";
import FAQs from "./home/FAQs";


const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Services />
      <Features />
      <FAQs />
    </div>
  );
};

export default Home;
