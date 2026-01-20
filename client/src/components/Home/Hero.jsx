import React from "react";
import heroBg from "../../img/herobg.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
     
          <h1 className="text-white  md:text-4xl font-medium tracking-widest mb-8 uppercase">
            Cue the Color
          </h1>

          <Link to="/shopAll">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "white", color: "#BB4B2A" }}
              whileTap={{ scale: 1.00 }}
              className="px-10 py-3 border border-white text-white text-[11px] uppercase tracking-[4px] backdrop-blur-sm transition-all duration-300"
            >
              Shop Collection
            </motion.button>
          </Link>
        </motion.div>


      </div>
    </section>
  );
}

export default Hero;