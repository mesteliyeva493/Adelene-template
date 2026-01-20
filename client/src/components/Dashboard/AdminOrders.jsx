import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function AdminOrders ()  {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5050/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      toast.error("Məlumatlar gətirilərkən xəta!");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5050/orders/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Status ${newStatus} olaraq dəyişdi`);
      setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
    } catch (err) {
      toast.error("Yenilənmə alınmadı");
    }
  };

  if (loading) return <div className="text-center py-20 text-[#BB4B2A] animate-pulse font-bold">YÜKLƏNİR...</div>;

  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-500 text-[11px] uppercase tracking-[0.2em] px-4">
              <th className="pb-4 pl-6">Müştəri / E-mail</th>
              <th className="pb-4">Məhsullar</th>
              <th className="pb-4">Məbləğ</th>
              <th className="pb-4">Status</th>
              <th className="pb-4 text-right pr-6">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <motion.tr 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={order._id} 
                className="bg-white/5 hover:bg-white/10 transition-all duration-300 group shadow-lg"
              >
                <td className="py-5 pl-6 rounded-l-[20px]">
                  <div className="font-semibold text-white">{order.customerInfo.fullName}</div>
                  <div className="text-[11px] text-gray-500">{order.customerInfo.email}</div>
                </td>
                <td className="py-5 text-sm text-gray-300 italic">
                  {order.items.map(item => item.title).join(", ").substring(0, 30)}...
                </td>
                <td className="py-5 font-mono text-[#BB4B2A] font-bold">
                  ${order.totalPrice}
                </td>
                <td className="py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                    order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-5 pr-6 rounded-r-[20px] text-right">
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-[#0f0f0f] border border-white/10 text-[11px] text-white p-2 rounded-lg outline-none focus:border-[#BB4B2A] transition-colors cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Ləğv et</option>
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="text-center py-20 text-gray-600 italic">Hələ ki, heç bir sifariş yoxdur.</div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;