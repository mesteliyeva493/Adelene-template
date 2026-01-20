import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Link animasiyası və stilləri
  const footerLinkStyle = "text-[11px] uppercase tracking-[2px] text-gray-500 hover:text-[#BB4B2A] transition-colors duration-300 relative group";
  const lineEffect = "absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[#BB4B2A] transition-all duration-300 group-hover:w-full";

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
      <div className="container max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* 1. Brend Hissəsi */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif italic text-[#BB4B2A]">adelene</h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-[200px]">
              Təbiətdən ilhamlanan, əllə hazırlanan minimalist toxunuşlar.
            </p>
          </div>

          {/* 2. Mağaza Linkləri */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] uppercase tracking-[4px] text-black font-semibold mb-2">Shop</h4>
            <Link to="/shop-all" className={footerLinkStyle}>Hamısına bax <span className={lineEffect}></span></Link>
            <Link to="/new-arrivals" className={footerLinkStyle}>Yeni gələnlər <span className={lineEffect}></span></Link>
            <Link to="/bestsellers" className={footerLinkStyle}>Ən çox satılanlar <span className={lineEffect}></span></Link>
          </div>

          {/* 3. Köməkçi Linklər */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] uppercase tracking-[4px] text-black font-semibold mb-2">Destek</h4>
            <Link to="/shipping" className={footerLinkStyle}>Çatdırılma <span className={lineEffect}></span></Link>
            <Link to="/returns" className={footerLinkStyle}>Qaytarılma <span className={lineEffect}></span></Link>
            <Link to="/contact" className={footerLinkStyle}>Əlaqə <span className={lineEffect}></span></Link>
          </div>

          {/* 4. Abunəlik (Newsletter) */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[4px] text-black font-semibold mb-2">Yeniliklərdən xəbərdar ol</h4>
            <div className="flex border-b border-gray-200 py-2 focus-within:border-[#BB4B2A] transition-all duration-500">
              <input 
                type="email" 
                placeholder="Email ünvanınız" 
                className="bg-transparent outline-none text-sm font-light w-full placeholder:text-gray-300"
              />
              <button className="text-[10px] uppercase tracking-[2px] text-gray-400 hover:text-[#BB4B2A] transition-colors">
                Qoşul
              </button>
            </div>
          </div>
        </div>

        {/* Alt Hissə: Sosial və Müəllif Hüquqları */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-50 gap-6">
          <div className="flex gap-6 text-gray-400">
            <motion.a whileHover={{ y: -3, color: "#BB4B2A" }} href="#" className="transition-colors"><FaInstagram size={18} /></motion.a>
            <motion.a whileHover={{ y: -3, color: "#BB4B2A" }} href="#" className="transition-colors"><FaFacebookF size={18} /></motion.a>
            <motion.a whileHover={{ y: -3, color: "#BB4B2A" }} href="#" className="transition-colors"><FaPinterestP size={18} /></motion.a>
            <motion.a whileHover={{ y: -3, color: "#BB4B2A" }} href="#" className="transition-colors"><FaTwitter size={18} /></motion.a>
          </div>
          
          <p className="text-[9px] uppercase tracking-[2px] text-gray-400">
            © {currentYear} adelene. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;