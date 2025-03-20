import React from "react";
import Hero from "./home/hero/Hero";
import Services from "./home/services/Services";
import Features from "./home/Features";


const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Services />
      <Features />
    </div>
  );
};

export default Home;
