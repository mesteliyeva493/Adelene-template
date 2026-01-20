import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoCheckmarkCircleOutline } from "react-icons/io5";

function Succes  ()  {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center space-y-10"
      >
        {/* ICON ANIMATION */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="relative">
            <IoCheckmarkCircleOutline className="text-[#BB4B2A] text-[150px] font-thin" />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute inset-0 bg-[#BB4B2A]/5 rounded-full -z-10 scale-125"
            />
          </div>
        </motion.div>
        
        {/* TEXT CONTENT */}
        <div className="space-y-4">
          <h1 className="text-5xl font-serif italic text-gray-800">Thank you!</h1>
          <p className="text-gray-500 uppercase tracking-[3px] text-[11px] font-medium leading-relaxed">
            Your order has been successfully placed <br /> and is now being processed.
          </p>
        </div>

        {/* DETAILS BOX */}
        <div className="bg-[#FBFBFB] p-8 rounded-[40px] border border-gray-50 space-y-3">
          <p className="text-[10px] text-gray-400 uppercase tracking-[1.5px]">
            Order Confirmation
          </p>
          <p className="text-[13px] text-gray-600 italic">
            A confirmation email with your order details <br /> has been sent to your inbox.
          </p>
        </div>

        {/* BUTTON */}
        <div className="pt-4">
          <Link 
            to="/shopAll" 
            className="inline-block px-14 py-5 bg-[#BB4B2A] text-white text-[10px] uppercase tracking-[4px] rounded-full hover:bg-black transition-all duration-500 shadow-2xl shadow-orange-100 hover:shadow-none"
          >
            Continue Shopping
          </Link>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-[9px] text-gray-300 uppercase tracking-[2px] pt-10">
          Adelene — Curated Style & Quality
        </p>
      </motion.div>
    </div>
  );
};

export default Succes;