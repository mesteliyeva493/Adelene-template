import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ContactM() {
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5050/api/send-message', formData);
      if (res.data.success) {
        setStatus({ type: 'success', msg: 'Message sent successfully.' });
        setFormData({ email: '', subject: '', message: '' });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Please try again later.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: '', msg: '' }), 4000);
    }
  };

  return (
    <>
    <section >
      <div  className="max-w-[1200px] mx-auto    pt-[34px] pb-[30px]  font-sans">
        
        <nav className="flex items-center gap-[8px] text-[11px] tracking-[2px] uppercase text-gray-400 mb-[48px]">
          <Link to="/" className="hover:text-[#BC4C2A] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#BC4C2A] font-medium">Contact</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[576px] mx-auto flex flex-col"
        >
          <div className="text-center mb-[56px]">
            <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-5xl font-serif italic text-[#BB4B2A] mb-3"
                    >
                   Contact
                    </motion.h2>

               <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[10px] uppercase tracking-[4px] text-gray-400 font-light"
                      >
              We'd love to hear from you
                      </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[48px]">
            
            <div className="relative group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent py-[12px] text-[14px] tracking-[0.5px] outline-none font-serif italic"
              />
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-200"></span>
              <span className="absolute left-0 bottom-0 w-[0px] h-[1.5px] bg-[#BB4B2A] transition-all duration-[700ms] group-focus-within:w-full"></span>
            </div>

            <div className="relative group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-transparent py-[12px] text-[14px] tracking-[0.5px] outline-none"
              />
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-200"></span>
              <span className="absolute left-0 bottom-0 w-[0px] h-[1.5px] bg-[#BB4B2A] transition-all duration-[700ms] group-focus-within:w-full"></span>
            </div>

            <div className="relative group">
              <textarea
                name="message"
                rows="3"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-transparent py-[12px] text-[14px] tracking-[0.5px] outline-none resize-none min-h-[100px]"
              />
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-200"></span>
              <span className="absolute left-0 bottom-0 w-[0px] h-[1.5px] bg-[#BB4B2A] transition-all duration-[700ms] group-focus-within:w-full"></span>
            </div>

            {status.msg && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center text-[11px] tracking-[1.5px] font-bold uppercase ${
                  status.type === 'success'
                    ? 'text-green-600'
                    : 'text-[#BB4B2A]'
                }`}
              >
                {status.msg}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02, backgroundColor: '#904F2E' } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full bg-[#BB4B2A] text-white py-[16px] mt-[24px] text-[11px] uppercase tracking-[4px] font-medium transition-all duration-[300ms] shadow-lg shadow-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
    
    </>
  
  );
}

export default ContactM;
