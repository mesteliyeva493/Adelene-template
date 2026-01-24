import BestSellerSlider from "@/components/Home/BestSellerSlider";
import Hero from "@/components/Home/Hero";
import Mini from "@/components/Home/Mini";
import TawkChat from "@/components/TawkChat/TawkChat";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Helmet>
        <title> Home</title>
      </Helmet>
      <TawkChat />
      <Hero />
      <BestSellerSlider />
      <Mini />
    </>
  );
}

export default Home;
