import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addToCart, decreaseCart, removeFromCart } from '../../features/Cart/cartSlice';
import { IoCloseOutline } from "react-icons/io5";

const Basket = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ümumi məbləğ
  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <h2 className="text-2xl font-serif italic text-gray-400 uppercase tracking-widest">Basket is empty</h2>
        <Link to="/shopAll" className="px-12 py-4 border border-[#BB4B2A] text-[#BB4B2A] text-[11px] uppercase tracking-[3px] rounded-full hover:bg-[#BB4B2A] hover:text-white transition-all duration-500">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 font-sans">
      <div className="flex flex-col lg:flex-row gap-20">
        
        {/* SOL TƏRƏF: MƏHSUL SİYAHISI */}
        <div className="flex-1">
          <h1 className="text-3xl font-light uppercase tracking-[4px] mb-12 text-gray-800">Shopping Basket</h1>
          
          <div className="hidden md:grid grid-cols-5 border-b border-gray-100 pb-6 text-[10px] uppercase tracking-[2px] text-gray-400 font-bold">
            <div className="col-span-2">Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Total</div>
          </div>

          <div className="divide-y divide-gray-50">
            {items.map((item) => (
              <div key={item._id} className="grid grid-cols-1 md:grid-cols-5 items-center py-10 group relative">
                <div className="col-span-2 flex items-center gap-6">
                  <div className="w-24 h-32 bg-[#F3F3F3] rounded-[20px] overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain p-3" />
                  </div>
                  <div>
                    <h3 className="text-[13px] uppercase tracking-[1px] font-medium text-gray-800">{item.title}</h3>
                    <button 
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="mt-2 text-[10px] uppercase tracking-[1px] text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-center text-[#BB4B2A] font-serif italic text-lg mt-4 md:mt-0">
                  ${item.price}.00
                </div>

                <div className="flex justify-center mt-4 md:mt-0">
                  <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 gap-4">
                    <button onClick={() => dispatch(decreaseCart(item))} className="hover:text-[#BB4B2A] transition-colors">-</button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button onClick={() => dispatch(addToCart(item))} className="hover:text-[#BB4B2A] transition-colors">+</button>
                  </div>
                </div>

                <div className="text-right font-medium text-gray-800 mt-4 md:mt-0">
                  ${item.price * item.quantity}.00
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ TƏRƏF: ÖDƏNİŞ ÖZƏTİ (ORDER SUMMARY) */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-[#FBFBFB] p-10 rounded-[40px] border border-gray-50 sticky top-32">
            <h2 className="text-xl font-normal uppercase tracking-[2px] mb-10 text-gray-800">Summary</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center text-sm text-gray-500 italic">
                <span>Subtotal</span>
                <span>${totalAmount}.00</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 italic">
                <span>Shipping</span>
                <span className="text-[10px] uppercase tracking-[1px]">Calculated at checkout</span>
              </div>
              <div className="h-[1px] bg-gray-100 w-full my-6"></div>
              <div className="flex justify-between items-center text-lg font-bold text-[#BB4B2A]">
                <span>Total</span>
                <span>${totalAmount}.00</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-5 bg-[#BB4B2A] text-white text-[11px] uppercase tracking-[4px] rounded-full hover:bg-black transition-all duration-500 shadow-xl shadow-orange-50"
            >
              Proceed to Checkout
            </button>
     
          </div>
        </div>

      </div>
    </div>
  );
};

export default Basket;