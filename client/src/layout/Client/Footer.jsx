import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaPinterestP, FaFacebookF } from "react-icons/fa";

function Footer() {
  return (

    <>
        <footer className="w-full bg-[#F9F6F2] pt-[80px] pb-[40px] font-sans border-t border-[1px] border-gray-100">
      <div className="max-w-[1200px] mx-auto px-[24px]">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-[60px] mb-[80px]">
          
          <div className="flex flex-col gap-[24px] min-w-[200px]">
            <h3 className="text-[30px] font-serif italic tracking-[-1px] text-[#BB4B2A]">
              Adelene.
            </h3>
            <div className="flex gap-[20px]">
              <a href="/" className="text-gray-400 hover:text-[#BC4C2A] transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="/" className="text-gray-400 hover:text-[#BC4C2A] transition-colors">
                <FaPinterestP size={16} />
              </a>
              <a href="/" className="text-gray-400 hover:text-[#BC4C2A] transition-colors">
                <FaFacebookF size={16} />
              </a>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center text-center max-w-[350px] pt-[10px]">
            <p className="text-[16px] font-serif italic text-gray-400 leading-[26px]">
              "Beauty in simplicity, quality in every thread. Crafted for those who appreciate the art of living."
            </p>
            <div className="w-[40px] h-[1px] bg-gray-200 mt-[20px]"></div>
          </div>

          <div className="flex gap-[80px]">
            <div className="flex flex-col gap-[20px]">
              <h4 className="text-[10px] font-bold uppercase tracking-[3px] text-gray-900">Shop</h4>
              <ul className="flex flex-col gap-[10px] text-[13px] text-gray-500 font-light">
                <li><Link to="/shopAll" className="hover:text-[#BC4C2A] transition-colors">Shop All</Link></li>
                <li><Link to="/giftCard" className="hover:text-[#BC4C2A] transition-colors">Gift Cards</Link></li>
                <li><Link to="/ourStory" className="hover:text-[#BC4C2A] transition-colors">Our Story</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-[20px]">
              <h4 className="text-[10px] font-bold uppercase tracking-[3px] text-gray-900">Info</h4>
              <ul className="flex flex-col gap-[10px] text-[13px] text-gray-500 font-light">
                <li><Link to="/faq" className="hover:text-[#BC4C2A] transition-colors">FAQ</Link></li>
                <li><Link to="/shipping" className="hover:text-[#BC4C2A] transition-colors">Shipping</Link></li>
                <li><Link to="/contact" className="hover:text-[#BC4C2A] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-[30px] border-gray-200/50 flex  justify-center">
          <div className="flex gap-[30px] text-[9px] text-gray-400 uppercase tracking-[2px]">
            <p>© 2026 ADELENE STUDIO</p>
            <Link to="policy" className="hover:text-black">Privacy Policy</Link>
          </div>
          
        
        </div>

      </div>
    </footer>
    
    </>
  );
}

export default Footer;