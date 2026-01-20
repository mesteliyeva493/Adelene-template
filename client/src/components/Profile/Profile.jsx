import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
    window.location.reload(); 
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center font-serif">
      <h2 className="text-3xl italic text-[#BB4B2A] mb-4">My Account</h2>
      
      <button 
        onClick={handleLogout}
        className="px-10 py-3 border border-red-200 text-red-500 hover:bg-red-50 transition-all rounded-full text-xs uppercase tracking-widest"
      >
        Logout / Exit
      </button>
    </div>
  );
};

export default Profile;