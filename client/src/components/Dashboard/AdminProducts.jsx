import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

function AdminProducts ()  {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null); // Redaktə edilən məhsul
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5050/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Məhsullar yüklənmədi");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu məhsulu silmək istədiyinizə əminsiniz?")) return;
    try {
      await axios.delete(`http://localhost:5050/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Məhsul silindi");
    } catch (err) {
      toast.error("Silinmə xətası!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5050/products/${editingProduct._id}`,
        editingProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Məhsul yeniləndi!");
      setEditingProduct(null); 
      fetchProducts(); 
    } catch (err) {
      toast.error("Yenilənmə alınmadı!");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-[#BB4B2A] animate-pulse">
        YÜKLƏNİR...
      </div>
    );

  return (
    <div className="w-full relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-500 text-[11px] uppercase tracking-widest px-4">
              <th className="pb-4 pl-6">Şəkil</th>
              <th className="pb-4">Ad</th>
              <th className="pb-4">Qiymət</th>
              <th className="pb-4 text-right pr-6">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr
                key={item._id}
                className="bg-white/5 hover:bg-white/10 transition-all group"
              >
                <td className="py-4 pl-6 rounded-l-2xl">
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>
                <td className="py-4 font-medium">{item.title}</td>
                <td className="py-4 text-[#BB4B2A] font-bold">${item.price}</td>
                <td className="py-4 pr-6 rounded-r-2xl text-right">
                  <button
                    onClick={() => setEditingProduct(item)}
                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg mr-2"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#161616] w-full max-w-md p-8 rounded-[30px] border border-white/10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-[#BB4B2A]">
                Məhsulu Redaktə Et
              </h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  className="w-full bg-[#0f0f0f] border border-white/10 p-4 rounded-xl outline-none focus:border-[#BB4B2A]"
                  value={editingProduct.title}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      title: e.target.value,
                    })
                  }
                  placeholder="Məhsul adı"
                />
                <input
                  type="number"
                  className="w-full bg-[#0f0f0f] border border-white/10 p-4 rounded-xl outline-none focus:border-[#BB4B2A]"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: Number(e.target.value),
                    })
                  }
                  placeholder="Qiymət"
                />
                <input
                  type="text"
                  className="w-full bg-[#0f0f0f] border border-white/10 p-4 rounded-xl outline-none focus:border-[#BB4B2A]"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: e.target.value,
                    })
                  }
                  placeholder="Şəkil URL"
                />
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase ml-1">
                    Məhsul Etiketi
                  </label>
                  <select
                    className="w-full bg-[#0f0f0f] border border-white/10 p-4 rounded-xl outline-none focus:border-[#BB4B2A] text-gray-300"
                    value={editingProduct.label || "None"}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        label: e.target.value,
                      })
                    }
                  >
                    <option value="None">Yoxdur</option>
                    <option value="New">New</option>
                    <option value="Sale">Sale</option>
                    <option value="Best Seller">Best Seller</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 bg-white/5 py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
                  >
                    LƏĞV ET
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#BB4B2A] py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-[#BB4B2A]/20"
                  >
                    YADDA SAXLA
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
