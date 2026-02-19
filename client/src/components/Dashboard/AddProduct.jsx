import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [product, setProduct] = useState({
    title: '',
    price: '',
    image: '',
    categoryId: '',
    label: 'None',
    tags: [],
    details: { 
      productInfo: '', 
      returnPolicy: '', 
      shippingInfo: '' 
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          axios.get('http://localhost:5050/categories'),
          axios.get('http://localhost:5050/tag')
        ]);
        setCategories(catRes.data);
        setAvailableTags(tagRes.data);
      } catch (err) {
        console.error('Data fetch failed:', err);
        toast.error('Failed to load initial data!');
      }
    };
    fetchData();
  }, []);

  const handleTagChange = (tagId) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!product.categoryId) {
      return toast.error('Please select a category!');
    }

    try {
      await axios.post(
        'http://localhost:5050/products',
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Product added successfully!');

      setProduct({
        title: '',
        price: '',
        image: '',
        categoryId: '',
        label: 'None',
        tags: [],
        details: { productInfo: '', returnPolicy: '', shippingInfo: '' },
      });
    } catch (err) {
      console.error('Submit error:', err.response?.data);
      toast.error(err.response?.data?.message || 'Failed to create product!');
    }
  };

  return (
    <section className="py-10">
      <div className="max-w-[896px] mx-auto bg-[#161616] p-[40px] rounded-[40px] border border-white/5 text-white shadow-2xl">
        <h2 className="text-[30px] font-bold mb-[32px] text-[#BB4B2A] tracking-tight">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-[24px]">
          
          <div className="grid grid-cols-2 gap-[24px]">
            <div className="space-y-[8px]">
              <label className="text-[12px] text-gray-500 ml-[8px] uppercase font-bold tracking-wider">Product Name</label>
              <input
                type="text"
                placeholder="Enter product name..."
                className="w-full bg-[#0f0f0f] p-[16px] rounded-[16px] border border-white/10 outline-none focus:border-[#BB4B2A] transition-all"
                value={product.title}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-[8px]">
              <label className="text-[12px] text-gray-500 ml-[8px] uppercase font-bold tracking-wider">Price ($)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-[#0f0f0f] p-[16px] rounded-[16px] border border-white/10 outline-none focus:border-[#BB4B2A] transition-all"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[24px]">
            <div className="space-y-[8px]">
              <label className="text-[12px] text-gray-500 ml-[8px] uppercase font-bold tracking-wider">Category</label>
              <select
                className="w-full bg-[#0f0f0f] p-[16px] rounded-[16px] border border-white/10 outline-none focus:border-[#BB4B2A] text-gray-300"
                value={product.categoryId}
                onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
                required
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-[8px]">
              <label className="text-[12px] text-gray-500 ml-[8px] uppercase font-bold tracking-wider">Label</label>
              <select
                className="w-full bg-[#0f0f0f] p-[16px] rounded-[16px] border border-white/10 outline-none focus:border-[#BB4B2A] text-gray-300"
                value={product.label}
                onChange={(e) => setProduct({ ...product, label: e.target.value })}
              >
                <option value="None">None</option>
                <option value="New">New</option>
                <option value="Sale">Sale</option>
                <option value="Best Seller">Best Seller</option>
              </select>
            </div>
          </div>

          <div className="space-y-[8px]">
            <label className="text-[12px] text-gray-500 ml-[8px] uppercase font-bold tracking-wider">Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="w-full bg-[#0f0f0f] p-[16px] rounded-[16px] border border-white/10 outline-none focus:border-[#BB4B2A] transition-all"
              value={product.image}
              onChange={(e) => setProduct({ ...product, image: e.target.value })}
              required
            />
          </div>

          <div className="bg-[#0f0f0f] p-[24px] rounded-[24px] border border-white/5">
            <p className="text-[10px] text-gray-500 mb-[16px] uppercase tracking-[3px] font-black">Color & Material Tags</p>
            <div className="grid grid-cols-4 gap-[16px]">
              {availableTags.map((tag) => (
                <label
                  key={tag._id}
                  className={`flex items-center justify-center p-[12px] rounded-[12px] border cursor-pointer transition-all ${
                    product.tags.includes(tag._id)
                      ? 'border-[#BB4B2A] bg-[#BB4B2A]/10 text-white shadow-lg shadow-[#BB4B2A]/5'
                      : 'border-white/5 bg-black/20 text-gray-500 hover:border-white/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={product.tags.includes(tag._id)}
                    onChange={() => handleTagChange(tag._id)}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{tag.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-[#0f0f0f] p-[24px] rounded-[24px] border border-white/5 space-y-[20px]">
            <p className="text-[10px] text-gray-500 uppercase tracking-[3px] font-black mb-2">Product Detailed Sections</p>
            
            <div className="space-y-[8px]">
              <label className="text-[12px] text-gray-400 ml-[4px]">Product Information</label>
              <textarea
                placeholder="Describe the product details..."
                rows="3"
                className="w-full bg-black/30 p-[16px] rounded-[16px] border border-white/10 outline-none focus:border-[#BB4B2A] text-gray-300 resize-none"
                value={product.details.productInfo}
                onChange={(e) => setProduct({
                  ...product,
                  details: { ...product.details, productInfo: e.target.value }
                })}
              />
            </div>

            <div className="space-y-[8px]">
              <label className="text-[12px] text-gray-400 ml-[4px]">Return & Refund Policy</label>
              <textarea
                placeholder="Mention return conditions..."
                rows="2"
                className="w-full bg-black/30 p-[16px] rounded-[16px] border border-white/10 outline-none focus:border-[#BB4B2A] text-gray-300 resize-none"
                value={product.details.returnPolicy}
                onChange={(e) => setProduct({
                  ...product,
                  details: { ...product.details, returnPolicy: e.target.value }
                })}
              />
            </div>

            <div className="space-y-[8px]">
              <label className="text-[12px] text-gray-400 ml-[4px]">Shipping Information</label>
              <textarea
                placeholder="Delivery times, costs etc..."
                rows="2"
                className="w-full bg-black/30 p-[16px] rounded-[16px] border border-white/10 outline-none focus:border-[#BB4B2A] text-gray-300 resize-none"
                value={product.details.shippingInfo}
                onChange={(e) => setProduct({
                  ...product,
                  details: { ...product.details, shippingInfo: e.target.value }
                })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#BB4B2A] py-[20px] rounded-[16px] font-black text-[18px] hover:brightness-110 active:scale-[0.98] transition-all shadow-2xl shadow-[#BB4B2A]/20 uppercase tracking-[4px]"
          >
            ADD PRODUCT TO DATABASE
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddProduct;