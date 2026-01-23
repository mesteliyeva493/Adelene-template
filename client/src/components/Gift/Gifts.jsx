import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/Cart/cartSlice';
import toast from 'react-hot-toast';

const giftAmounts = [50, 100, 200, 500];

function Gifts() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const giftCardItem = {
      _id: `giftcard-${selectedAmount}-${Date.now()}`,
      title: `Adelene E-Gift Card`,
      price: selectedAmount,
      quantity: 1,
      isGiftCard: true,
      image: null // Şəkil yoxdur, CSS istifadə edəcəyik
    };

    dispatch(addToCart(giftCardItem));
    toast.success(`$${selectedAmount} Gift Card added to bag!`, {
      style: { borderRadius: '0px', background: '#fff', color: '#BB4B2A', border: '1px solid #BB4B2A', fontSize: '12px' }
    });
  };

  return (
    <section className="bg-[#FCFBFA] min-h-screen font-sans">
      <div className="max-w-[1100px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          
          {/* SOL TƏRƏF: Minimalist Kart Vizualı */}
          <div className="relative group">
            {/* Kartın Kölgəsi/Effekti */}
            <div className="absolute -inset-4 bg-gray-100/50 rounded-[32px] blur-2xl group-hover:bg-orange-50 transition-all duration-700"></div>
            
            {/* Əsas Kart Dizaynı (Sade və İşıqlı) */}
            <div className="relative aspect-[1.6/1] bg-white border border-gray-100 rounded-3xl p-12 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
              
              {/* Zərif Loqo Hissəsi */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif italic tracking-[4px] text-gray-800 uppercase">Adelene</h2>
                  <p className="text-[9px] tracking-[3px] text-gray-400 mt-1 uppercase font-medium">Digital Card</p>
                </div>
                <div className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-300 italic font-serif">
                  A
                </div>
              </div>

              {/* Məbləğ Hissəsi */}
              <div className="flex justify-between items-end border-t border-gray-50 pt-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[2px] text-gray-400 mb-1">Value</p>
                  <span className="text-4xl font-light text-[#BB4B2A] tracking-tighter">${selectedAmount}.00</span>
                </div>
                <div className="text-[10px] text-gray-300 italic">No expiry date</div>
              </div>

              {/* Arxa fonda zərif dairə effekti */}
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-orange-50/30 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* SAĞ TƏRƏF: Məntiq */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-orange-50 rounded-full text-[9px] uppercase tracking-[2px] text-[#BB4B2A] font-bold">
                Perfect Gift
              </div>
              <h1 className="text-5xl font-serif italic text-gray-900 leading-[1.1]">
                The Gift of <br /> Beauty & Style
              </h1>
              <p className="text-gray-500 font-light leading-relaxed text-[16px]">
                Adelene hədiyyə kartları ilə sevdiklərinizə sərbəstlik verin. 
                Seçdiyiniz məbləğ birbaşa onların email ünvanına göndəriləcək.
              </p>
            </div>

            {/* Məbləğ Seçimi */}
            <div className="space-y-6">
              <h4 className="text-[11px] uppercase tracking-[3px] text-gray-400 font-bold">Choose Amount</h4>
              <div className="flex flex-wrap gap-3">
                {giftAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`h-14 w-24 rounded-2xl transition-all duration-500 text-sm font-medium border ${
                      selectedAmount === amount 
                      ? "bg-white border-[#BB4B2A] text-[#BB4B2A] shadow-lg shadow-orange-100 -translate-y-1" 
                      : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Düymə */}
            <button
              onClick={handleAddToCart}
              className="group relative w-full h-16 bg-[#BB4B2A] rounded-2xl overflow-hidden transition-all active:scale-[0.98] shadow-xl shadow-orange-100"
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <span className="relative text-white text-[11px] uppercase tracking-[4px] font-bold">
                Add to Shopping Bag
              </span>
            </button>

            {/* Alt məlumat */}
            <div className="pt-8 flex items-center gap-10 text-[10px] uppercase tracking-[2px] text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-[#BB4B2A] rounded-full"></div>
                Instant Delivery
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-[#BB4B2A] rounded-full"></div>
                Safe Payment
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Gifts;