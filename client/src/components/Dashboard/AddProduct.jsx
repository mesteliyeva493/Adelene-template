import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddProduct ()  {
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [product, setProduct] = useState({
    title: '',
    price: '',
    image: '',
    categoryId: '',
    label: 'None',
    tags: [],
    details: { productInfo: '', returnPolicy: '', shippingInfo: '' }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          axios.get("http://localhost:5050/categories"),
          axios.get("http://localhost:5050/tag")
        ]);
        setCategories(catRes.data);
        setAvailableTags(tagRes.data);
      } catch (err) {
        console.error("Məlumatlar gəlmədi:", err);
        toast.error("Kateqoriyalar yüklənərkən xəta!");
      }
    };
    fetchData();
  }, []);

  const handleTagChange = (tagId) => {
    setProduct(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId) 
        ? prev.tags.filter(id => id !== tagId) 
        : [...prev.tags, tagId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!product.categoryId) {
      return toast.error("Zəhmət olmasa kateqoriya seçin!");
    }

    try {
      const response = await axios.post("http://localhost:5050/products", product, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Uğurla yaradıldı:", response.data);
      toast.success("Məhsul bazaya əlavə edildi!");
      
      setProduct({
        title: '', price: '', image: '', categoryId: '', label: 'None', tags: [],
        details: { productInfo: '', returnPolicy: '', shippingInfo: '' }
      });
    } catch (err) {
      console.error("Göndərmə xətası:", err.response?.data);
      toast.error(err.response?.data?.message || "Məhsul yaradıla bilmədi (400)!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#161616] p-10 rounded-[40px] border border-white/5 text-white">
      <h2 className="text-3xl font-bold mb-8 text-[#BB4B2A]">Məhsul Yaradılması</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
             <label className="text-xs text-gray-500 ml-2">Məhsul Adı</label>
             <input type="text" placeholder="Məhsulun adını yazın..." className="w-full bg-[#0f0f0f] p-4 rounded-2xl border border-white/10 outline-none focus:border-[#BB4B2A]" value={product.title} onChange={(e)=>setProduct({...product, title: e.target.value})} required />
          </div>
          <div className="space-y-2">
             <label className="text-xs text-gray-500 ml-2">Qiymət ($)</label>
             <input type="number" placeholder="0.00" className="w-full bg-[#0f0f0f] p-4 rounded-2xl border border-white/10 outline-none focus:border-[#BB4B2A]" value={product.price} onChange={(e)=>setProduct({...product, price: Number(e.target.value)})} required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
             <label className="text-xs text-gray-500 ml-2">Kateqoriya</label>
             <select className="w-full bg-[#0f0f0f] p-4 rounded-2xl border border-white/10 outline-none focus:border-[#BB4B2A] text-gray-300" value={product.categoryId} onChange={(e)=>setProduct({...product, categoryId: e.target.value})} required>
                <option value="">Kateqoriya seçin...</option>
                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.title}</option>)}
             </select>
          </div>
          <div className="space-y-2">
             <label className="text-xs text-gray-500 ml-2">Label</label>
             <select className="w-full bg-[#0f0f0f] p-4 rounded-2xl border border-white/10 outline-none focus:border-[#BB4B2A] text-gray-300" value={product.label} onChange={(e)=>setProduct({...product, label: e.target.value})}>
                <option value="None">Yoxdur</option>
                <option value="New">New</option>
                <option value="Sale">Sale</option>
                <option value="Best Seller">Best Seller</option>
             </select>
          </div>
        </div>

        <div className="space-y-2">
           <label className="text-xs text-gray-500 ml-2">Şəkil URL</label>
           <input type="text" placeholder="https://..." className="w-full bg-[#0f0f0f] p-4 rounded-2xl border border-white/10 outline-none focus:border-[#BB4B2A]" value={product.image} onChange={(e)=>setProduct({...product, image: e.target.value})} required />
        </div>

        <div className="bg-[#0f0f0f] p-6 rounded-3xl border border-white/5">
          <p className="text-[10px] text-gray-500 mb-4 uppercase tracking-[0.2em] font-black">RƏNG VƏ MATERİAL TAG-LƏRİ:</p>
          <div className="grid grid-cols-4 gap-4">
            {availableTags.map(tag => (
              <label key={tag._id} className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${product.tags.includes(tag._id) ? 'border-[#BB4B2A] bg-[#BB4B2A]/10 text-white' : 'border-white/5 bg-black/20 text-gray-500'}`}>
                <input type="checkbox" className="hidden" checked={product.tags.includes(tag._id)} onChange={() => handleTagChange(tag._id)} />
                <span className="text-xs font-bold uppercase">{tag.title}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
           <label className="text-xs text-gray-500 ml-2">Məhsul Təsviri</label>
           <textarea placeholder="Məhsul haqqında məlumat..." rows="4" className="w-full bg-[#0f0f0f] p-4 rounded-2xl border border-white/10 outline-none focus:border-[#BB4B2A]" value={product.details.productInfo} onChange={(e)=>setProduct({...product, details: {...product.details, productInfo: e.target.value}})} />
        </div>

        <button type="submit" className="w-full bg-[#BB4B2A] py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all shadow-2xl shadow-[#BB4B2A]/20 uppercase tracking-widest">
          MƏHSULU BAZAYA ƏLAVƏ ET
        </button>
      </form>
    </div>
  );
};

export default AddProduct;