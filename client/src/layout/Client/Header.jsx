import React, { useState, useEffect } from "react";
import {
  CiSearch,
  CiUser,
  CiShoppingCart,
  CiLogout,
} from "react-icons/ci";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Header({ onCartClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    document.body.style.overflow = isSearchOpen ? "hidden" : "auto";
  }, [isSearchOpen]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `relative pb-1 tracking-[3px] transition-colors duration-300
    ${
      isActive
        ? "text-[#BB4B2A]"
        : "text-gray-500 hover:text-[#BB4B2A]"
    }
    after:content-[''] after:absolute after:left-0 after:-bottom-[2px]
    after:h-[1px] after:w-0 after:bg-[#BB4B2A]
    after:transition-all after:duration-500 hover:after:w-full`;

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-[1000] bg-white
        transition-all duration-500 ease-in-out
        ${isScrolled ? "py-3 shadow-sm" : "py-7"}`}
      >
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-3 items-center">

            {/* SEARCH */}
            <motion.div
              whileHover={{ x: 6 }}
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <CiSearch className="text-2xl text-[#BB4B2A]" />
              <span className="hidden md:block text-[10px] tracking-[3px] uppercase text-[#BB4B2A]">
                Search
              </span>
            </motion.div>

            {/* LOGO */}
            <NavLink to="/" className="justify-self-center">
              <motion.h1
                animate={{
                  scale: isScrolled ? 0.82 : 1,
                  y: isScrolled ? -2 : 0,
                }}
                transition={{ duration: 0.5 }}
                className="font-serif italic lowercase text-[#BB4B2A]
                text-[38px] leading-none"
              >
                adelene
              </motion.h1>
            </NavLink>

            {/* RIGHT */}
            <div className="flex items-center gap-6 justify-self-end">
              {!isScrolled && (
                <div className="hidden lg:flex gap-4 text-gray-400">
                  {[FaFacebookF, FaInstagram, FaTwitter, FaPinterest].map(
                    (Icon, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -3 }}
                        className="hover:text-[#BB4B2A]"
                      >
                        <Icon />
                      </motion.div>
                    )
                  )}
                </div>
              )}

              <div className="flex items-center gap-4 border-l pl-5 border-gray-200">
                {!hasToken ? (
                  <div className="flex gap-3 text-[9px] uppercase tracking-[2px] text-gray-400">
                    <NavLink to="/login">Login</NavLink>
                    <span>|</span>
                    <NavLink to="/register">Register</NavLink>
                  </div>
                ) : (
                  <>
                    <NavLink to="/profile">
                      <CiUser className="text-2xl text-[#BB4B2A]" />
                    </NavLink>
                    <button onClick={handleLogout}>
                      <CiLogout className="text-xl text-gray-400 hover:text-red-500" />
                    </button>
                  </>
                )}

                <div onClick={onCartClick} className="relative cursor-pointer">
                  <CiShoppingCart className="text-2xl text-gray-600 hover:text-[#BB4B2A]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#BB4B2A]
                    text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* NAV */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-6 border-t border-gray-100 pt-4"
              >
                <ul className="flex justify-center gap-14 text-[11px] uppercase">
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

      {/* SEARCH OVERLAY – toxunulmayıb */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[2000] flex flex-col pt-32 px-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 text-4xl"
            >
              <IoCloseOutline />
            </button>

            <div className="max-w-3xl mx-auto w-full border-b border-[#BB4B2A] flex items-center py-4">
              <input
                autoFocus
                placeholder="Search products..."
                className="w-full text-4xl italic font-serif outline-none text-[#BB4B2A]"
              />
              <CiSearch className="text-3xl text-[#BB4B2A]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
