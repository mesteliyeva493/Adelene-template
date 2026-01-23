import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addToCart, decreaseCart, removeFromCart } from '../../features/Cart/cartSlice';

const Basket = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '60vh' }} className="flex flex-col items-center justify-center space-y-[24px]">
        <h2 className="text-[24px] font-serif italic text-gray-400 uppercase tracking-[4px]">Basket is empty</h2>
        <Link 
          to="/shopAll" 
          style={{ padding: '16px 48px' }}
          className="border border-[#BB4B2A] text-[#BB4B2A] text-[11px] uppercase tracking-[3px] rounded-full hover:bg-[#BB4B2A] hover:text-white transition-all duration-500"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (

    <>
    <section>
          <div style={{ maxWidth: '1440px' }} className="mx-auto px-[24px] md:px-[48px] py-[80px] font-sans">
      <div className="flex flex-col lg:flex-row gap-[80px]">
        
        {/* SOL TƏRƏF: MƏHSUL SİYAHISI */}
        <div className="flex-1">
          <h1 className="text-[30px] font-light uppercase tracking-[4px] mb-[48px] text-gray-800">Shopping Basket</h1>
          
          <div style={{ paddingBottom: '24px' }} className="hidden md:grid grid-cols-5 border-b border-gray-100 text-[10px] uppercase tracking-[2px] text-gray-400 font-bold">
            <div className="col-span-2">Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Total</div>
          </div>

          <div className="divide-y divide-gray-50">
            {items.map((item) => (
              <div key={item._id} style={{ padding: '40px 0' }} className="grid grid-cols-1 md:grid-cols-5 items-center group relative">
                <div className="col-span-2 flex items-center gap-[24px]">
                  
                  {/* PRODUCT IMAGE OR CARD TEXT */}
                  <div 
                    style={{ width: '96px', height: '128px' }} 
                    className="bg-[#F3F3F3] rounded-[20px] overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-50"
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
                        style={{ padding: '12px' }}
                      />
                    )}
                  </div>

                  <div>
                    <h3 className="text-[13px] uppercase tracking-[1px] font-medium text-gray-800 leading-tight">
                      {item.title}
                    </h3>
                    <button 
                      onClick={() => dispatch(removeFromCart(item._id))}
                      style={{ marginTop: '8px' }}
                      className="text-[10px] uppercase tracking-[1px] text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-center text-[#BB4B2A] font-serif italic text-[18px] mt-[16px] md:mt-0">
                  ${item.price}.00
                </div>

                <div className="flex justify-center mt-[16px] md:mt-0">
                  <div 
                    style={{ padding: '8px 16px', gap: '16px' }}
                    className="flex items-center border border-gray-200 rounded-full"
                  >
                    <button onClick={() => dispatch(decreaseCart(item))} className="hover:text-[#BB4B2A] transition-colors">-</button>
                    <span style={{ width: '16px' }} className="text-sm font-medium text-center">{item.quantity}</span>
                    <button onClick={() => dispatch(addToCart(item))} className="hover:text-[#BB4B2A] transition-colors">+</button>
                  </div>
                </div>

                <div className="text-right font-medium text-gray-800 mt-[16px] md:mt-0 text-[16px]">
                  ${item.price * item.quantity}.00
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ TƏRƏF: SUMMARY */}
        <div className="w-full lg:w-[400px]">
          <div 
            style={{ padding: '40px', borderRadius: '40px', top: '128px' }} 
            className="bg-[#FBFBFB] border border-gray-50 lg:sticky"
          >
            <h2 className="text-[20px] font-normal uppercase tracking-[2px] mb-[40px] text-gray-800">Summary</h2>
            
            <div className="space-y-[24px] mb-[40px]">
              <div className="flex justify-between items-center text-[14px] text-gray-500 italic">
                <span>Subtotal</span>
                <span>${totalAmount}.00</span>
              </div>
              <div className="flex justify-between items-center text-[14px] text-gray-500 italic">
                <span>Shipping</span>
                <span className="text-[10px] uppercase tracking-[1px]">Calculated at checkout</span>
              </div>
              <div style={{ height: '1px', margin: '24px 0' }} className="bg-gray-100 w-full"></div>
              <div className="flex justify-between items-center text-[18px] font-bold text-[#BB4B2A]">
                <span>Total</span>
                <span>${totalAmount}.00</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              style={{ padding: '20px' }}
              className="w-full bg-[#BB4B2A] text-white text-[11px] uppercase tracking-[4px] rounded-full hover:bg-black transition-all duration-500 shadow-xl shadow-orange-50"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
    </section>
    
    
    </>

  );
};

export default Basket;