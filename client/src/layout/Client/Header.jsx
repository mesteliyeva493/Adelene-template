import React, { useState, useEffect } from "react";
import { CiSearch, CiUser, CiShoppingCart, CiLogout, CiMenuFries } from "react-icons/ci"; // CiMenuFries əlavə etdik
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterest } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Header({ onCartClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobil menyu state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart || { items: [] });
  const totalItems = items.reduce((t, i) => t + i.quantity, 0);

  const token = localStorage.getItem("token");
  const hasToken = !!token;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isSearchOpen || isMobileMenuOpen) ? "hidden" : "auto";
  }, [isSearchOpen, isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    navigate("/login");
  };

  const handleSearchAction = (e) => {
    if ((e.key === "Enter" || e.type === "click") && searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shopAll?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const linkStyle = ({ isActive }) =>
    `relative pb-1 tracking-[3px] transition-colors duration-300 uppercase text-[11px]
    ${isActive ? "text-[#BB4B2A]" : "text-gray-500 hover:text-[#BB4B2A]"}
    after:content-[''] after:absolute after:left-0 after:-bottom-[2px]
    after:h-[1px] after:w-0 after:bg-[#BB4B2A]
    after:transition-all after:duration-500 hover:after:w-full`;

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full  z-[1000] bg-white transition-all duration-500 ${
          isScrolled ? "py-3 shadow-sm" : "py-5 md:py-7"
        }`}
      >
        <div className="max-w-[1200px] mx-auto  md:px-3">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center gap-4 flex-1">
              <button 
                className="lg:hidden text-2xl text-gray-700"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <CiMenuFries />
              </button>
              
              <motion.div
                whileHover={{ x: 6 }}
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <CiSearch className="text-2xl text-[#BB4B2A]" />
                <span className="hidden md:block text-[10px] tracking-[3px] uppercase text-[#BB4B2A]">Search</span>
              </motion.div>
            </div>

            <NavLink to="/" className="flex-1 flex justify-center">
              <motion.h1
                animate={{ scale: isScrolled ? 0.8 : 1 }}
                transition={{ duration: 0.5 }}
                className="font-serif italic lowercase text-[#BB4B2A] text-[30px] md:text-[38px] leading-none"
              >
                adelene
              </motion.h1>
            </NavLink>

            <div className="flex items-center gap-3 md:gap-6 flex-1 justify-end">
              <div className="hidden lg:flex gap-4 text-gray-400 border-r pr-5 border-gray-100">
                {[FaFacebookF, FaInstagram, FaTwitter, FaPinterest].map((Icon, i) => (
                  <motion.div key={i} whileHover={{ y: -3 }} className="hover:text-[#BB4B2A] cursor-pointer"><Icon /></motion.div>
                ))}
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                {!hasToken ? (
                  <div className="hidden sm:flex gap-3 text-[9px] uppercase tracking-[2px] text-gray-400">
                    <NavLink to="/login" className="hover:text-[#BB4B2A]">Login</NavLink>
                    <span>|</span>
                    <NavLink to="/register" className="hover:text-[#BB4B2A]">Register</NavLink>
                  </div>
                ) : (
                  <>
                    <NavLink to="/profile"><CiUser className="text-2xl text-[#BB4B2A]" /></NavLink>
                    <button onClick={handleLogout} className="hidden sm:block">
                      <CiLogout className="text-xl text-gray-400 hover:text-red-500" />
                    </button>
                  </>
                )}
                
                <div onClick={onCartClick} className="relative cursor-pointer group">
                  <CiShoppingCart className="text-2xl text-gray-600 group-hover:text-[#BB4B2A] transition-colors" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#BB4B2A] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {!isScrolled && (
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="hidden lg:block mt-6 border-t border-gray-50 pt-4"
              >
                <ul className="flex justify-center gap-12">
                  <li><NavLink to="/shopAll" className={linkStyle}>Shop All</NavLink></li>
                  <li><NavLink to="/ourStory" className={linkStyle}>Our Story</NavLink></li>
                  <li><NavLink to="/ourCraft" className={linkStyle}>Our Craft</NavLink></li>
                  <li><NavLink to="/giftCard" className={linkStyle}>Gift Card</NavLink></li>
                  <li><NavLink to="/contact" className={linkStyle}>Contact</NavLink></li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 bg-white z-[3000] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-serif italic text-2xl text-[#BB4B2A]">adelene</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-3xl text-gray-800">
                <IoCloseOutline />
              </button>
            </div>
            <nav>
              <ul className="flex flex-col gap-8 text-[18px] tracking-[4px] uppercase font-light">
                <li><NavLink onClick={() => setIsMobileMenuOpen(false)} to="/shopAll">Shop All</NavLink></li>
                <li><NavLink onClick={() => setIsMobileMenuOpen(false)} to="/ourStory">Our Story</NavLink></li>
                <li><NavLink onClick={() => setIsMobileMenuOpen(false)} to="/ourCraft">Our Craft</NavLink></li>
                <li><NavLink onClick={() => setIsMobileMenuOpen(false)} to="/giftCard">Gift Card</NavLink></li>
                <li><NavLink onClick={() => setIsMobileMenuOpen(false)} to="/contact">Contact</NavLink></li>
              </ul>
            </nav>
            <div className="mt-auto flex gap-6 text-xl text-gray-400">
              <FaInstagram /> <FaFacebookF /> <FaTwitter /> <FaPinterest />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[2000] flex flex-col pt-32 px-6"
          >
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-10 right-10 text-4xl"><IoCloseOutline /></button>
            <div className="max-w-3xl mx-auto w-full border-b border-[#BB4B2A] flex items-center py-4">
              <input
                autoFocus
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchAction}
                className="w-full text-2xl md:text-4xl italic font-serif outline-none text-[#BB4B2A] bg-transparent"
              />
              <CiSearch className="text-3xl text-[#BB4B2A] cursor-pointer" onClick={handleSearchAction} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;