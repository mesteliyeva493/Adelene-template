import Header from "@/layout/Client/Header";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"; // useNavigate əlavə edildi
import { motion, AnimatePresence } from "framer-motion";
import BasketSidebar from "@/components/Basket/BasketSidebar";
import toast from "react-hot-toast";
import Footer from "@/layout/Client/Footer";

function MainRoot() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname]);

  const handleCartOpen = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to view your cart", {
        style: {
          borderRadius: "0px",
          background: "#333",
          color: "#fff",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
        },
      });
      navigate("/login");
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header onCartClick={handleCartOpen} />

      <BasketSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          >
            <h2 className="text-4xl font-serif italic text-[#BB4B2A]">
              adelene....
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-[150px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainRoot;
