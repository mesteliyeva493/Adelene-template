// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, addToCart, decreaseCart } from '../../features/Cart/cartSlice';

// function BasketSidebar  ({ isOpen, onClose }) {
//   const { items } = useSelector((state) => state.cart || { items: [] });
//   const dispatch = useDispatch();

//   const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[5000]"
//           />

//           <motion.div
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//             className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[5001] shadow-2xl flex flex-col"
//           >
//             <div className="p-8 border-b flex justify-between items-center">
//               <div>
//                 <span className="text-[10px] uppercase tracking-[3px] text-gray-400">Your Selection</span>
//                 <h2 className="text-2xl font-serif italic text-[#BB4B2A]">Shopping Bag</h2>
//               </div>
//               <button onClick={onClose} className="text-3xl hover:rotate-90 transition-transform duration-300">
//                 <IoCloseOutline />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-8 space-y-8">
//               {items.length === 0 ? (
//                 <div className="h-full flex flex-col items-center justify-center text-center">
//                   <p className="font-serif italic text-gray-400 text-lg">Basket is emp.</p>
//                 </div>
//               ) : (
//                 items.map((item) => (
//                   <div key={item._id} className="flex gap-6">
//                     <div className="w-24 h-32 bg-[#F9F9F9] rounded-2xl overflow-hidden flex-shrink-0">
//                       <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
//                     </div>
//                     <div className="flex-1 flex flex-col justify-between py-2">
//                       <div className="flex justify-between items-start">
//                         <h4 className="text-[12px] uppercase tracking-[1px] font-medium w-[80%]">{item.title}</h4>
//                         <button onClick={() => dispatch(removeFromCart(item._id))} className="text-gray-300 hover:text-red-500">
//                           <IoTrashOutline size={18} />
//                         </button>
//                       </div>
//                       <div className="flex justify-between items-end">
//                         <div className="flex items-center gap-4 border border-gray-100 px-4 py-1.5 rounded-full text-sm">
//                           <button onClick={() => dispatch(decreaseCart(item))}>-</button>
//                           <span className="w-4 text-center font-bold">{item.quantity}</span>
//                           <button onClick={() => dispatch(addToCart(item))}>+</button>
//                         </div>
//                         <p className="text-[#BB4B2A] font-serif italic text-lg">${item.price * item.quantity}.00</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {items.length > 0 && (
//               <div className="p-8 border-t bg-[#FCFCFC] space-y-6">
//                 <div className="flex justify-between items-end">
//                   <span className="text-[10px] uppercase tracking-[3px] text-gray-400">Subtotal</span>
//                   <span className="text-3xl font-serif text-[#BB4B2A]">${totalPrice}.00</span>
//                 </div>
//                 <button className="w-full py-5 bg-[#BB4B2A] text-white text-[11px] uppercase tracking-[4px] hover:bg-black transition-all duration-500 rounded-full shadow-xl">
//                   Checkout Now
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default BasketSidebar;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Yönləndirmə üçün əlavə edildi
import { removeFromCart, addToCart, decreaseCart } from '../../features/Cart/cartSlice';

function BasketSidebar({ isOpen, onClose }) {
  const navigate = useNavigate(); // Navigate funksiyasını işə salırıq
  const { items } = useSelector((state) => state.cart || { items: [] });
  const dispatch = useDispatch();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Yönləndirmə funksiyaları
  const goToBasket = () => {
    onClose(); // Əvvəl sidebar-ı bağlayırıq
    navigate('/basket'); // Sonra səbət səhifəsinə göndəririk
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
            <div className="p-8 border-b flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[3px] text-gray-400">Your Selection</span>
                <h2 className="text-2xl font-serif italic text-[#BB4B2A]">Shopping Bag</h2>
              </div>
              <button onClick={onClose} className="text-3xl hover:rotate-90 transition-transform duration-300">
                <IoCloseOutline />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="font-serif italic text-gray-400 text-lg">Basket is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item._id} className="flex gap-6">
                    <div className="w-24 h-32 bg-[#F9F9F9] rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[12px] uppercase tracking-[1px] font-medium w-[80%]">{item.title}</h4>
                        <button onClick={() => dispatch(removeFromCart(item._id))} className="text-gray-300 hover:text-red-500">
                          <IoTrashOutline size={18} />
                        </button>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4 border border-gray-100 px-4 py-1.5 rounded-full text-sm">
                          <button onClick={() => dispatch(decreaseCart(item))}>-</button>
                          <span className="w-4 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => dispatch(addToCart(item))}>+</button>
                        </div>
                        <p className="text-[#BB4B2A] font-serif italic text-lg">${item.price * item.quantity}.00</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t bg-[#FCFCFC] space-y-4">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[10px] uppercase tracking-[3px] text-gray-400">Subtotal</span>
                  <span className="text-3xl font-serif text-[#BB4B2A]">${totalPrice}.00</span>
                </div>
                
                {/* DÜYMƏLƏR QRUPU */}
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={goToBasket}
                    className="w-full py-4 border border-[#BB4B2A] text-[#BB4B2A] text-[11px] uppercase tracking-[4px] hover:bg-[#BB4B2A] hover:text-white transition-all duration-500 rounded-full font-bold"
                  >
                    View Basket
                  </button>
                  <button 
                    onClick={goToCheckout}
                    className="w-full py-5 bg-[#BB4B2A] text-white text-[11px] uppercase tracking-[4px] hover:bg-black transition-all duration-500 rounded-full shadow-xl"
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