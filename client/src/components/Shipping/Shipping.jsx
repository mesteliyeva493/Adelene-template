import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Shipping() {
  const sections = [
    { title: "Processing", content: "Orders are prepared and dispatched within 24-48 hours, Monday through Friday." },
    { title: "Domestic", content: "Standard delivery: 3-5 business days. Express: 1-2 business days." },
    { title: "International", content: "Worldwide shipping available. Delivery times vary by location, typically 7-14 days." },
    { title: "Returns", content: "We accept returns on all unused items within 14 days of delivery." },
  ];

  return (
    <>
      <Helmet>
        <title>Shipping | Adelene</title>
      </Helmet>
      
      <section className="max-w-[1200px] mx-auto pt-[120px] pb-[80px] font-sans px-[16px]">
        <nav className="flex items-center gap-[8px] text-[10px] tracking-[2px] uppercase text-gray-400 mb-[40px]">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#BB4B2A] font-bold">SHIPPING</span>
        </nav>

        <div className="flex flex-col items-center text-center mb-[80px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif italic text-[#BB4B2A] text-[40px] md:text-[50px] mb-[15px] lowercase"
          >
            shipping & delivery
          </motion.h2>
          <div className="h-[1px] w-[96px] bg-[#BB4B2A] opacity-20"></div>
        </div>

        <div className="flex flex-wrap justify-between gap-y-[60px]">
          {sections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full md:w-[calc(50%-40px)]  flex flex-col items-center"
            >
              <h2 className="uppercase tracking-[4px] text-[11px] text-[#BB4B2A] mb-[16px] font-medium">
                {item.title}
              </h2>
              <p className="text-gray-500 font-light leading-[1.8] text-[14px] max-w-[420px]">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-[100px] pt-[40px] border-t border-gray-50 flex justify-center">
          <p className="text-gray-400 text-[10px] tracking-[3px] uppercase">
            Questions? <span className="text-[#BB4B2A] ml-[10px] cursor-pointer hover:underline">support@adelene.com</span>
          </p>
        </div>
      </section>
    </>
  );
}

export default Shipping;