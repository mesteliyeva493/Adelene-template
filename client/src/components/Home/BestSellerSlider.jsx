import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 

import "swiper/css";
import "swiper/css/navigation";

function BestSellerSlider() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5050/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const bestSeller = products.filter((item) => item.label === "Best Seller");

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <section className="py-[100px] bg-white">
        <div className="container max-w-[1200px] mx-auto flex flex-col gap-[50px]">
          <h2 className="text-center text-3xl font-normal text-[#BB4B2A] tracking-[4px] uppercase">
            Best Sellers
          </h2>
          <hr  className="w-[10%] mx-[auto] border-[1px]"/>
      

          <div className="relative md:px-[40px]">
            <Swiper
              modules={[Navigation]}
              navigation={true}
              spaceBetween={30}
              className="best-seller-swiper !static"
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {bestSeller.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="relative group flex flex-col items-center">
                    
                    <div className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden bg-[#F3F3F3]">
                      <Link to={`/shopdetail/${item._id}`}>
                        <img
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                          src={item.image}
                          alt={item.title}
                        />
                      </Link>

                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setIsModalOpen(true);
                        }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-full shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#BC4C2A] hover:text-white"
                      >
                        Quick View
                      </button>

                      <div className="absolute top-0 right-0 bg-[#BC4C2A] text-white text-[10px] italic rounded-bl-[20px] px-4 py-2 z-10">
                        best seller
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <h5 className="text-[13px] uppercase tracking-wider text-gray-800">
                        {item.title}
                      </h5>
                      <p className="text-[#BC4C2A] font-serif italic mt-1 text-lg">
                        ${item.price}.00
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex justify-center">
            <Link
              to="/shopAll"
              className="inline-block px-12 py-4 border border-[#BC4C2A] text-[#BC4C2A] text-[11px] uppercase tracking-[4px] transition-all duration-300 hover:bg-[#BC4C2A] hover:text-white"
            >
              Shop All 
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-3xl rounded-[30px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black z-10"
              >
                ✕
              </button>

              <div className="w-full md:w-1/2 bg-[#F3F3F3] p-8 flex items-center justify-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="max-h-[400px] object-contain"
                />
              </div>

              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
                <h2 className="text-2xl font-light uppercase tracking-widest mb-2">
                  {selectedProduct.title}
                </h2>
                <p className="text-xl text-[#BC4C2A] font-serif italic mb-6">
                  ${selectedProduct.price}.00
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {selectedProduct.details?.productInfo || "No additional information available."}
                </p>
                
                <Link 
                  to={`/shopdetail/${selectedProduct._id}`}
                  className="w-full py-4 bg-[#BB4B2A] rounded-2xl text-white text-center text-[11px] uppercase tracking-[3px] hover:bg-[#8f371d] transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default BestSellerSlider;