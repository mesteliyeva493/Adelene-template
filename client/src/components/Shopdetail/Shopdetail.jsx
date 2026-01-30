import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/Cart/cartSlice';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

const AccordionItem = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 py-[20px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-[11px] uppercase tracking-[3px] font-bold text-gray-800 outline-none"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[20px] font-light"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="pt-[16px] text-[14px] text-gray-500 font-light italic leading-[22px]">
              {content || "No details available for this section."}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function ShopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to add products', {
        style: {
          borderRadius: '0px',
          fontSize: '11px',
          border: '1px solid #BC4C2A',
          color: '#BC4C2A',
        },
      });
      navigate('/login');
      return;
    }

    dispatch(addToCart({ ...product, quantity }));
    toast.success(`${product.title} added to bag!`, {
      style: { borderRadius: '0px', fontSize: '11px' },
    });
  };

  if (!product) return null;

  return (
    <>
      <Helmet>
        <title>{product.title} | Detail</title>
      </Helmet>
      
      <section className="max-w-[1200px] mx-auto pt-[20px] md:pt-[34px] font-sans px-4 md:px-[16px] mb-20">
        
        <nav className="flex flex-wrap items-center gap-[8px] text-[10px] tracking-[2px] uppercase text-gray-400 mb-[32px] md:mb-[48px]">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shopAll" className="hover:text-black transition-colors">Shop All</Link>
          <span>/</span>
          <span className="text-[#BC4C2A] font-bold">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[96px] items-start">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#F6F6F6] rounded-[30px] md:rounded-[40px] overflow-hidden aspect-[4/5] flex items-center justify-center p-[24px] md:p-[48px] shadow-sm"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-[1000ms]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <span className="text-[#BC4C2A] text-[11px] uppercase tracking-[4px] font-bold mb-[12px] md:mb-[16px]">
              {product.categoryId?.title || 'Premium Selection'}
            </span>

            <h1 className="text-[32px] md:text-[44px] font-light uppercase leading-[38px] md:leading-[48px] mb-[12px] md:mb-[16px] text-gray-900">
              {product.title}
            </h1>

            <p className="text-[22px] md:text-[26px] text-[#BC4C2A] font-serif italic mb-[30px] md:mb-[40px]">
              ${product.price}.00
            </p>

            <div className="mb-[30px] md:mb-[40px]">
              <label className="text-[10px] uppercase tracking-[2px] text-gray-400 font-bold block mb-[8px]">
                Quantity
              </label>

              <div className="flex items-center border border-gray-200 w-max rounded-[9999px] px-[8px] py-[4px]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-[40px] h-[40px] flex items-center justify-center hover:text-[#BC4C2A] transition-colors"
                >
                  -
                </button>
                <input
                  value={quantity}
                  readOnly
                  className="w-[40px] text-center text-[14px] bg-transparent outline-none"
                />
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-[40px] h-[40px] flex items-center justify-center hover:text-[#BC4C2A] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-[18px] md:py-[20px] bg-[#BC4C2A] text-white text-[11px] uppercase tracking-[4px] font-bold rounded-[9999px] hover:bg-[#da4e23] active:scale-[0.98] transition-all duration-[500ms] shadow-lg shadow-orange-100/50"
            >
              Add to Basket
            </button>

            <div className="pt-[24px] md:pt-[32px]">
              <AccordionItem title="Product Info" defaultOpen content={product.details?.productInfo} />
              <AccordionItem title="Return & Refund Policy" content={product.details?.returnPolicy} />
              <AccordionItem title="Shipping Info" content={product.details?.shippingInfo} />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default ShopDetail;