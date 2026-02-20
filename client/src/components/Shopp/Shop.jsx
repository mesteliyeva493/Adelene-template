import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast"; 
import { addToCart } from "../../features/Cart/cartSlice";

const MATERIAL_TAGS = ["Leather", "Vegan"];

function ShopAll () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); 

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [priceLimit, setPriceLimit] = useState(2000);
  const [sortBy, setSortBy] = useState("Newest");
  const [visibleCount, setVisibleCount] = useState(6);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";
  const categoryFromUrl = queryParams.get("category"); 

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

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
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const colorTags = tags.filter(t => !MATERIAL_TAGS.includes(t.title));
  const materialTags = tags.filter(t => MATERIAL_TAGS.includes(t.title));

  const handleAddToCart = (e, product) => {
    if (e) e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add products", { style: { borderRadius: '0px', fontSize: '11px' } });
      navigate("/login");
      return; 
    }
    dispatch(addToCart(product));
    toast.success(`${product.title} added!`, { style: { borderRadius: '0px', fontSize: '11px' } });
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
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = selectedCategory === "All" || 
        item.categoryId?.title?.toLowerCase() === selectedCategory?.toLowerCase();
      const priceMatch = Number(item.price) <= priceLimit;

      const getTagIds = (product) => product.tags?.map(t => typeof t === 'object' ? t._id : t) || [];
      const productTagIds = getTagIds(item);

      const colorMatch = !selectedColorId || productTagIds.includes(selectedColorId);
      const materialMatch = !selectedMaterialId || productTagIds.includes(selectedMaterialId);

      return matchesSearch && categoryMatch && priceMatch && colorMatch && materialMatch;
    })
    .sort((a, b) => {
      if (sortBy === "LowToHigh") return a.price - b.price;
      if (sortBy === "HighToLow") return b.price - a.price;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
  <>
    <section className="max-w-[1200px] mx-auto px-[16px] font-sans mt-[128px] mb-[40px]">
      <nav className="flex items-center gap-[8px] text-[11px] tracking-[2px] uppercase text-gray-400 mb-[48px]">
        <Link to="/" className="hover:text-[#BC4C2A]">Home</Link>
        <span>/</span>
        <span className="text-[#BC4C2A] font-medium">Shop All</span>
      </nav>

      {(searchTerm || selectedCategory !== "All") && (
        <div className="mb-[32px] flex items-center justify-between bg-gray-50 p-[16px] rounded-[12px]">
          <p className="text-[14px] italic">
            Filter: <span className="text-[#BC4C2A] font-bold">
              {searchTerm ? `"${searchTerm}"` : selectedCategory}
            </span>
          </p>
          <button onClick={() => {
            navigate("/shopAll");
            setSelectedCategory("All");
            setSelectedColorId(null);
            setSelectedMaterialId(null);
          }} className="text-[10px] uppercase underline text-gray-400">Clear All</button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-[64px]">
        <aside className="w-full lg:w-[288px] flex-shrink-0">
          <div className="sticky top-[112px] space-y-[48px]">
            <h2 className="text-[24px] font-normal text-[#BB4B2A] tracking-[2px] uppercase italic">Filter By</h2>
            
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[2px] mb-[16px] text-gray-900">Categories</h3>
              <ul className="space-y-[12px] text-[14px] text-gray-500 italic">
                <li onClick={() => setSelectedCategory("All")} className={`cursor-pointer transition-colors hover:text-[#BC4C2A] ${selectedCategory === "All" ? "text-[#BC4C2A] underline" : ""}`}>All Products</li>
                {categories.map(cat => (
                  <li key={cat._id} onClick={() => setSelectedCategory(cat.title)} className={`cursor-pointer transition-colors hover:text-[#BC4C2A] ${selectedCategory === cat.title ? "text-[#BC4C2A] underline" : ""}`}>{cat.title}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[2px] mb-[16px] text-gray-900">Color</h3>
              <div className="flex flex-wrap gap-[12px]">
                <button 
                  onClick={() => setSelectedColorId(null)} 
                  className={`w-[32px] h-[32px] rounded-full border text-[9px] ${!selectedColorId ? "border-black" : "border-gray-200"}`}
                >
                  ALL
                </button>
                {colorTags.map(tag => (
                  <button 
                    key={tag._id} 
                    onClick={() => setSelectedColorId(prev => prev === tag._id ? null : tag._id)}
                    title={tag.title}
                    className={`w-[32px] h-[32px] rounded-full border-[2px] transition-all ${selectedColorId === tag._id ? "border-black scale-110" : "border-transparent"}`} 
                    style={{ backgroundColor: tag.title.toLowerCase() }} 
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[2px] mb-[16px] text-gray-900">Material</h3>
              <div className="flex flex-wrap gap-[12px]">
                <button 
                  onClick={() => setSelectedMaterialId(null)} 
                  className={`px-[16px] h-[32px] rounded-full border text-[10px] uppercase tracking-[1px] ${!selectedMaterialId ? "border-black text-black" : "border-gray-200 text-gray-400"}`}
                >
                  All
                </button>
                {materialTags.map(tag => (
                  <button 
                    key={tag._id} 
                    onClick={() => setSelectedMaterialId(prev => prev === tag._id ? null : tag._id)}
                    className={`px-[16px] h-[32px] rounded-full border-[2px] text-[10px] uppercase tracking-[1px] transition-all ${selectedMaterialId === tag._id ? "border-black text-black font-bold" : "border-gray-200 text-gray-400"}`}
                  >
                    {tag.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[2px] mb-[16px] text-gray-900">Max Price: ${priceLimit}</h3>
              <input type="range" min="0" max="2000" step="50" value={priceLimit} onChange={(e) => setPriceLimit(e.target.value)} className="w-full accent-[#BC4C2A]" />
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-[40px] pb-[16px] border-b border-gray-50">
            <p className="text-[14px] text-gray-400 italic">{filteredProducts.length} Products Found</p>
            <div className="flex items-center gap-[12px] text-[12px]">
              <span className="text-gray-400 uppercase tracking-widest">Sort:</span>
              <select onChange={(e) => setSortBy(e.target.value)} className="bg-transparent font-medium text-[#BC4C2A] outline-none uppercase">
                <option value="Newest">Newest</option>
                <option value="LowToHigh">Price: Low to High</option>
                <option value="HighToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-[40px] gap-y-[64px]">
            {filteredProducts.slice(0, visibleCount).map((item) => (
              <motion.div layout key={item._id} className="group flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] rounded-[30px] overflow-hidden bg-[#F3F3F3]">
                  <img src={item.image} alt={item.title} onClick={() => navigate(`/shopdetail/${item._id}`)} className="w-full h-full object-contain p-[24px] cursor-pointer group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 flex flex-col gap-[8px] w-[85%] opacity-0 translate-y-[24px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <button onClick={(e) => openModal(e, item)} className="bg-white/95 text-black text-[10px] uppercase py-[14px] rounded-full shadow-xl hover:bg-black hover:text-white transition-colors">Quick View</button>
                    <button onClick={(e) => handleAddToCart(e, item)} className="bg-[#BC4C2A] text-white text-[10px] uppercase py-[14px] rounded-full shadow-xl hover:bg-[#904F2E] transition-colors">Add to Cart</button>
                  </div>
                </div>
                <div className="mt-[24px] text-center">
                  <h3 className="text-[14px] uppercase tracking-[2px] group-hover:text-[#BC4C2A] transition-colors">{item.title}</h3>
                  <p className="text-[#BC4C2A] font-serif italic text-[20px]">${item.price}.00</p>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleCount < filteredProducts.length && (
            <div className="mt-[80px] text-center">
              <button onClick={() => setVisibleCount(v => v + 3)} className="px-[56px] py-[16px] border border-[#BC4C2A] text-[#BC4C2A] text-[11px] uppercase tracking-[4px] rounded-full hover:bg-[#BC4C2A] hover:text-white transition-all">Load More</button>
            </div>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-[16px]">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white w-full max-w-[896px] rounded-[40px] overflow-hidden flex flex-col md:flex-row z-[10001]">
               <button onClick={closeModal} className="absolute top-[24px] right-[24px] text-[24px] text-gray-400 transition-colors">✕</button>
               <div className="w-full md:w-1/2 bg-[#F3F3F3] p-[48px] flex items-center justify-center">
                 <img src={selectedProduct.image} className="max-h-[450px] object-contain drop-shadow-2xl" alt={selectedProduct.title} />
               </div>
               <div className="w-full md:w-1/2 p-[48px] flex flex-col justify-center text-black">
                 <span className="text-[#BC4C2A] text-[10px] uppercase tracking-[4px] mb-[16px] font-bold">Premium Selection</span>
                 <h2 className="text-[30px] font-light uppercase mb-[12px]">{selectedProduct.title}</h2>
                 <p className="text-[24px] text-[#BC4C2A] font-serif italic mb-[32px]">${selectedProduct.price}.00</p>
                 <button onClick={(e) => handleAddToCart(e, selectedProduct)} className="w-full py-[20px] bg-[#BC4C2A] text-white text-[11px] uppercase tracking-[4px] rounded-full hover:bg-[#904F2E] transition-colors">Add to Cart</button>
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  </>
  );
}

export default ShopAll;