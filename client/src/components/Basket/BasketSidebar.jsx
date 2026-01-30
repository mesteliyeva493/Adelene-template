import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart, decreaseCart } from '../../features/Cart/cartSlice';

function BasketSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart || { items: [] });
  const dispatch = useDispatch();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const goToBasket = () => {
    onClose();
    navigate('/basket');
  };

  const goToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[5000]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[5001] shadow-2xl flex flex-col"
          >
            <div style={{ padding: '32px' }} className="border-b flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[3px] text-gray-400">Your Selection</span>
                <h2 className="text-[24px] font-serif italic text-[#BB4B2A]">Shopping Bag</h2>
              </div>
              <button onClick={onClose} className="text-[30px] hover:rotate-90 transition-transform duration-300">
                <IoCloseOutline />
              </button>
            </div>

            <div style={{ padding: '32px' }} className="flex-1 overflow-y-auto space-y-[32px]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="font-serif italic text-gray-400 text-[18px]">Basket is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item._id} style={{ gap: '24px' }} className="flex">
                    
                    <div 
                      style={{ width: '96px', height: '128px' }} 
                      className="bg-[#F9F9F9] rounded-[16px] overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-50"
                    >
                      {item.isGiftCard ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-[9px] tracking-[2px] uppercase text-gray-300 font-light">Adelene</span>
                          <span className="text-[11px] tracking-[3px] uppercase text-[#BB4B2A] font-bold">Card</span>
                        </div>
                      ) : (
                        <img 
                          src={item.image || item.img} 
                          alt={item.title} 
                          className="w-full h-full object-contain" 
                          style={{ padding: '8px' }}
                        />
                      )}
                    </div>

                    <div style={{ paddingTop: '8px', paddingBottom: '8px' }} className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[12px] uppercase tracking-[1px] font-medium w-[80%] leading-tight">
                          {item.title}
                        </h4>
                        <button 
                          onClick={() => dispatch(removeFromCart(item._id))} 
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <IoTrashOutline size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between items-end">
                        <div 
                          style={{ gap: '16px', padding: '6px 16px' }} 
                          className="flex items-center border border-gray-100 rounded-full text-[14px]"
                        >
                          <button onClick={() => dispatch(decreaseCart(item))} className="hover:text-[#BB4B2A]">-</button>
                          <span style={{ width: '16px' }} className="text-center font-bold">{item.quantity}</span>
                          <button onClick={() => dispatch(addToCart(item))} className="hover:text-[#BB4B2A]">+</button>
                        </div>
                        
                        <p className="text-[#BB4B2A] font-serif italic text-[18px]">
                          ${item.price * item.quantity}.00
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div style={{ padding: '32px' }} className="border-t bg-[#FCFCFC] space-y-[16px]">
                <div style={{ marginBottom: '16px' }} className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[3px] text-gray-400">Subtotal</span>
                  <span className="text-[30px] font-serif text-[#BB4B2A]">${totalPrice}.00</span>
                </div>
                
                <div style={{ gap: '12px' }} className="flex flex-col">
                  <button 
                    onClick={goToBasket}
                    style={{ padding: '16px' }}
                    className="w-full border border-[#BB4B2A] text-[#BB4B2A] text-[11px] uppercase tracking-[4px] hover:bg-[#BB4B2A] hover:text-white transition-all duration-500 rounded-full font-bold"
                  >
                    View Basket
                  </button>
                  <button 
                    onClick={goToCheckout}
                    style={{ padding: '20px' }}
                    className="w-full bg-[#BB4B2A] text-white text-[11px] uppercase tracking-[4px] hover:bg-black transition-all duration-500 rounded-full shadow-xl"
                  >
                    Checkout Now
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default BasketSidebar;