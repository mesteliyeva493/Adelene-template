import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '@/features/Cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const giftAmounts = [50, 100, 200, 500];

function Gifts() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to purchase a Gift Card", { 
        style: { 
          borderRadius: '0px', 
          fontSize: '11px',
          background: '#fff',
          color: '#BB4B2A',
          border: '1px solid #BB4B2A' 
        } 
      });
      navigate("/login");
      return; 
    }

    const giftCardItem = {
      _id: `giftcard-${selectedAmount}-${Date.now()}`,
      title: `Adelene E-Gift Card`,
      price: selectedAmount,
      quantity: 1,
      isGiftCard: true,
      image: null
    };

    dispatch(addToCart(giftCardItem));
    toast.success(`$${selectedAmount} Gift Card added to bag!`, { 
      style: { borderRadius: '0px', fontSize: '11px' } 
    });
  };

  return (
  <>
    <section className="mb-[40px] max-w-[1200px] mx-auto pt-[34px] font-sans px-4 md:px-[16px]">
      <div >
          <nav className="flex items-center gap-[8px] text-[10px] tracking-[2px] uppercase text-gray-400 ">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#BC4C2A] font-bold">Gift Card</span>
          </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center pt-[50px]">
          
          <div className="relative group w-full">
            <div className="absolute -inset-4 bg-gray-100/50 rounded-[32px] blur-2xl group-hover:bg-orange-50 transition-all duration-700"></div>
            <div className="relative aspect-[1.6/1] bg-white border border-gray-100 rounded-3xl p-6 md:p-12 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl md:text-2xl font-serif italic tracking-[4px] text-gray-800 uppercase">Adelene</h2>
                  <p className="text-[9px] tracking-[3px] text-gray-400 mt-1 uppercase font-medium">Digital Card</p>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 border border-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-300 italic font-serif">A</div>
              </div>
              <div className="flex justify-between items-end border-t border-gray-50 pt-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[2px] text-gray-400 mb-1">Value</p>
                  <span className="text-3xl md:text-4xl font-light text-[#BB4B2A] tracking-tighter">${selectedAmount}.00</span>
                </div>
                <div className="text-[9px] md:text-[10px] text-gray-300 italic">No expiry date</div>
              </div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-block px-3 py-1 bg-orange-50 rounded-full text-[9px] uppercase tracking-[2px] text-[#BB4B2A] font-bold">Perfect Gift</div>
              <h1 className="text-3xl md:text-4xl font-serif italic text-gray-900 leading-[1.1]">The Gift of Beauty & Style</h1>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[11px] uppercase tracking-[3px] text-gray-400 font-bold">Choose Amount</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:flex md:flex-wrap gap-3">
                {giftAmounts.map((amount) => (
                  <button 
                    key={amount} 
                    onClick={() => setSelectedAmount(amount)} 
                    className={`h-14 w-full md:w-24 rounded-2xl transition-all duration-500 text-sm font-medium border ${selectedAmount === amount ? "bg-white border-[#BB4B2A] text-[#BB4B2A] shadow-lg shadow-orange-100 -translate-y-1" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"}`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleAddToCart} className="group relative w-full h-16 bg-[#BB4B2A] rounded-2xl overflow-hidden transition-all active:scale-[0.98] shadow-xl shadow-orange-100">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <span className="relative text-white text-[11px] uppercase tracking-[4px] font-bold">Add to Basket</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </> 
  );
}

export default Gifts;