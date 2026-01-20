import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast"; 
import { addToCart } from "../../features/Cart/cartSlice";

const ShopAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTagId, setSelectedTagId] = useState("All");
  const [priceLimit, setPriceLimit] = useState(2000);
  const [sortBy, setSortBy] = useState("Newest");
  const [visibleCount, setVisibleCount] = useState(6);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, tagRes] = await Promise.all([
          axios.get("http://localhost:5050/products"),
          axios.get("http://localhost:5050/categories"),
          axios.get("http://localhost:5050/tag")
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
        setTags(tagRes.data);
      } catch (error) {
        console.error("Məlumat yüklənərkən xəta baş verdi:", error);
      }
    };
    fetchData();
  }, []);


  const handleAddToCart = (e, product) => {
    if (e) e.stopPropagation();
    
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add products to your cart", {
        style: {
          borderRadius: '0px',
          background: '#333',
          color: '#fff',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }
      });
      navigate("/login");
      return; 
    }

    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`, {
      style: {
        borderRadius: '0px',
        fontSize: '11px'
      }
    });
  };

  const openModal = (e, item) => {
    e.stopPropagation();
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products
    .filter((item) => {
      const categoryMatch = selectedCategory === "All" || item.categoryId?.title === selectedCategory;
      const priceMatch = Number(item.price) <= priceLimit;
      const tagMatch = selectedTagId === "All" || (item.tags && item.tags.some(t => {
        const tId = typeof t === 'object' ? t._id : t;
        return tId === selectedTagId;
      }));
      return categoryMatch && priceMatch && tagMatch;
    })
    .sort((a, b) => {
      if (sortBy === "LowToHigh") return a.price - b.price;
      if (sortBy === "HighToLow") return b.price - a.price;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 font-sans">
      <nav className="flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-gray-400 mb-12">
        <Link to="/" className="hover:text-[#BC4C2A] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#BC4C2A] font-medium">Shop All</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16">
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-28 space-y-12">
            <h2 className="text-2xl font-normal text-[#BB4B2A] tracking-[2px] uppercase italic">Filter By</h2>

            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[2px] mb-4 text-gray-900">Categories</h3>
              <ul className="space-y-3 text-[14px] text-gray-500 italic">
                <li 
                  onClick={() => setSelectedCategory("All")}
                  className={`cursor-pointer hover:text-[#BC4C2A] transition-all ${selectedCategory === "All" ? "text-[#BC4C2A] font-bold underline" : ""}`}
                >
                  All Products
                </li>
                {categories.map(cat => (
                  <li 
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat.title)}
                    className={`cursor-pointer hover:text-[#BC4C2A] transition-all ${selectedCategory === cat.title ? "text-[#BC4C2A] font-bold underline" : ""}`}
                  >
                    {cat.title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[2px] mb-4 text-gray-900">Color</h3>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setSelectedTagId("All")}
                  className={`w-8 h-8 rounded-full border text-[9px] font-bold transition-all ${selectedTagId === "All" ? "border-black bg-gray-100 shadow-md" : "border-gray-200"}`}
                >
                  ALL
                </button>
                {tags.map(tag => (
                  <button
                    key={tag._id}
                    onClick={() => setSelectedTagId(tag._id)}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-125 ${selectedTagId === tag._id ? "border-black scale-110 shadow-lg" : "border-transparent"}`}
                    style={{ backgroundColor: tag.title.toLowerCase() }}
                    title={tag.title}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[2px] mb-4 text-gray-900">Max Price: ${priceLimit}</h3>
              <input
                type="range" min="0" max="2000" step="50"
                value={priceLimit}
                onChange={(e) => setPriceLimit(e.target.value)}
                className="w-full h-1 bg-gray-100 appearance-none cursor-pointer accent-[#BC4C2A]"
              />
            </div>
            
            <button 
              onClick={() => { setSelectedCategory("All"); setSelectedTagId("All"); setPriceLimit(2000); }}
              className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black underline transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-50">
            <p className="text-sm text-gray-400 italic font-light">{filteredProducts.length} Products Found</p>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-gray-400 uppercase tracking-widest">Sort:</span>
              <select 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium border-none focus:ring-0 cursor-pointer outline-none uppercase text-[#BC4C2A]"
              >
                <option value="Newest">Newest</option>
                <option value="LowToHigh">Price: Low to High</option>
                <option value="HighToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-16">
            {filteredProducts.slice(0, visibleCount).map((item) => (
              <motion.div layout key={item._id} className="group flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] rounded-[30px] overflow-hidden bg-[#F3F3F3] shadow-sm hover:shadow-xl transition-all duration-500">
                  <img
                    src={item.image}
                    alt={item.title}
                    onClick={() => navigate(`/shopdetail/${item._id}`)}
                    className="w-full h-full object-contain p-6 cursor-pointer transition-transform duration-1000 group-hover:scale-110"
                  />

                  {item.label && item.label.toLowerCase() !== "none" && (
                    <div className="absolute top-0 right-0 bg-[#BC4C2A] text-white text-[10px] italic rounded-bl-[20px] px-5 py-2 z-10 uppercase tracking-tighter">
                      {item.label}
                    </div>
                  )}

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 w-[85%] opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <button 
                      onClick={(e) => openModal(e, item)}
                      className="bg-white/95 backdrop-blur-md text-black text-[10px] uppercase tracking-[2px] py-3.5 rounded-full shadow-2xl hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Quick View
                    </button>
                    <button 
                      onClick={(e) => handleAddToCart(e, item)}
                      className="bg-[#BC4C2A] text-white text-[10px] uppercase tracking-[2px] py-3.5 rounded-full shadow-2xl hover:bg-black transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="mt-6 text-center cursor-pointer" onClick={() => navigate(`/shopdetail/${item._id}`)}>
                  <h3 className="text-[14px] uppercase tracking-[2px] text-gray-800 font-normal mb-1 group-hover:text-[#BC4C2A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#BC4C2A] font-serif italic text-xl">
                    ${item.price}.00
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleCount < filteredProducts.length && (
            <div className="mt-20 text-center">
              <button 
                onClick={() => setVisibleCount(v => v + 3)}
                className="px-14 py-4 border border-[#BC4C2A] text-[#BC4C2A] text-[11px] uppercase tracking-[4px] hover:bg-[#BC4C2A] hover:text-white transition-all duration-500 rounded-full font-bold shadow-sm"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative bg-white w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row z-[10001]"
            >
              <button 
                onClick={closeModal} 
                className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-black z-50 transition-colors"
              >
                ✕
              </button>
              
              <div className="w-full md:w-1/2 bg-[#F3F3F3] p-12 flex items-center justify-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="max-h-[450px] object-contain drop-shadow-2xl" 
                />
              </div>

              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                <span className="text-[#BC4C2A] text-[10px] uppercase tracking-[4px] mb-4 font-bold italic">Premium Selection</span>
                <h2 className="text-3xl font-light uppercase tracking-widest mb-3">{selectedProduct.title}</h2>
                <p className="text-2xl text-[#BC4C2A] font-serif italic mb-8">${selectedProduct.price}.00</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-10">
                  {selectedProduct.details?.productInfo || "Experience the perfect blend of style and quality with our handcrafted collection."}
                </p>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={(e) => {
                      handleAddToCart(e, selectedProduct); // Modal düyməsi də eyni təhlükəsizlik funksiyasını işlədir
                      if(localStorage.getItem("token")) closeModal(); 
                    }}
                    className="w-full py-5 bg-[#BC4C2A] text-white text-center text-[11px] uppercase tracking-[4px] hover:bg-black transition-all rounded-full"
                  >
                    Add to Cart
                  </button>
                  <Link 
                    to={`/shopdetail/${selectedProduct._id}`}
                    className="w-full py-5 border border-gray-200 text-center text-[11px] uppercase tracking-[4px] hover:bg-gray-50 transition-all rounded-full"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopAll;