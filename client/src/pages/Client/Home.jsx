import BestSellerSlider from "@/components/Home/BestSellerSlider";
import Hero from "@/components/Home/Hero";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Helmet>
        <title> Home</title>
      </Helmet>
   
   <Hero/>
  <BestSellerSlider/>













    </>
  );
}

export default Home;
