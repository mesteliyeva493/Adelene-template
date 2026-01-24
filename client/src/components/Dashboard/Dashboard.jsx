import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import CountUp from 'react-countup';

import AdminOrders from './AdminOrders';
import AddProduct from './AddProduct';
import AdminProducts from './AdminProducts'; 

const AnimatedNumber = ({ value }) => {
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[$,]/g, '')) 
    : value;

  return (
    <CountUp
      start={0}
      end={numericValue}
      duration={2.5}
      separator=","
      decimals={value.toString().includes('.') ? 2 : 0}
      prefix={value.toString().includes('$') ? '$' : ''}
      easingFn={(t, b, c, d) => c * (-Math.pow(2, -10 * t / d) + 1) + b} 
    />
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState({ totalRevenue: 0, orderCount: 0, pending: 0 });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5050/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const orders = res.data;
        const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
        const pending = orders.filter(o => o.status === 'Pending').length;
        
        setStats({
          totalRevenue: revenue,
          orderCount: orders.length,
          pending: pending
        });
      } catch (err) {
        console.error("Stats error", err);
      }
    };
    if (token) fetchStats();
  }, [token, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'stats':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} color="#BB4B2A" />
            <StatCard title="Total Orders" value={stats.orderCount} color="#ffffff" />
            <StatCard title="Pending Orders" value={stats.pending} color="#facc15" />
          </div>
        );
      case 'orders': return <AdminOrders />;
      case 'add-product': return <AddProduct />;
      case 'products': return <AdminProducts />;
      default: return <div className="text-white text-center py-20">No Data Found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      
      <motion.div 
        initial={{ x: -100 }} animate={{ x: 0 }}
        className="w-72 bg-[#121212] border-r border-white/5 p-8 flex flex-col fixed h-full z-50"
      >
        <div className="mb-12">
          <h2 className="text-3xl font-black tracking-tighter">
            ADALENE<span className="text-[#BB4B2A]">.</span>
          </h2>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            Admin Control
          </span>
        </div>

        <nav className="space-y-3 flex-1">
          <MenuBtn icon="📊" label="Dashboard" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
          <MenuBtn icon="📦" label="Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <MenuBtn icon="✨" label="Add Product" active={activeTab === 'add-product'} onClick={() => setActiveTab('add-product')} />
          <MenuBtn icon="👕" label="Product List" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto p-4 bg-white/5 rounded-2xl text-red-500 font-bold hover:bg-red-500/10 transition-all duration-300 border border-red-500/10 tracking-widest text-[10px]"
        >
          LOG OUT
        </button>
      </motion.div>

      <div className="flex-1 ml-72 p-12 relative">
        <header className="mb-10 flex justify-between items-center">
          <h1 className="text-4xl font-bold capitalize tracking-tight">
            {activeTab === 'stats' ? 'Dashboard' : activeTab.replace('-', ' ')}
          </h1>
          
          <div className="flex items-center gap-4 bg-[#121212] p-2 pr-6 rounded-full border border-white/5">
             <div className="w-10 h-10 rounded-full bg-[#BB4B2A] flex items-center justify-center font-bold text-[10px] shadow-lg shadow-[#BB4B2A]/20">
               ADMIN
             </div>
             <span className="text-sm font-medium tracking-wide">Administrator</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="bg-[#121212] p-8 rounded-[32px] border border-white/5 relative overflow-hidden group hover:border-[#BB4B2A]/30 transition-all duration-500">
    <div className="relative z-10">
      <p className="text-gray-500 text-[10px] uppercase tracking-[2px] mb-3 font-bold">
        {title}
      </p>
      <h3 className="text-4xl font-black" style={{ color }}>
        <AnimatedNumber value={value} />
      </h3>
    </div>
    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#BB4B2A]/5 rounded-full blur-3xl group-hover:bg-[#BB4B2A]/15 transition-all duration-700" />
  </div>
);

const MenuBtn = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
      active 
      ? 'bg-[#BB4B2A] text-white shadow-xl shadow-[#BB4B2A]/20' 
      : 'text-gray-500 hover:bg-white/5 hover:text-white'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-bold text-[12px] uppercase tracking-wider">{label}</span>
  </button>
);

export default Dashboard;