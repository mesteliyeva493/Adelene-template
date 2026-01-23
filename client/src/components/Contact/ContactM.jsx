import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <section className="min-h-[100vh] w-full mx-auto bg-[#FBFAF8] flex flex-col items-center justify-center px-[24px] font-serif ">
      <div  className='  w-full  max-w-[1200px]'>
          <nav className="flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-gray-400 mb-12">
                <Link to="/" className="hover:text-[#BC4C2A]">Home</Link>
                <span>/</span>
                <span className="text-[#BC4C2A] font-medium">Contact</span>
              </nav>
      </div>
      <div className="w-full max-w-[576px] ">


        <div className="text-center mb-[56px]">
          <h2 className="text-[28px] tracking-[4px] uppercase text-[#BB4B2A] font-light">
            Contact
          </h2>
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
              className="w-full bg-transparent py-[12px] text-[14px] tracking-[0.5px] outline-none"
            />
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-300"></span>
            <span
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#BB4B2A]
              transition-all duration-500 group-focus-within:w-full"
            ></span>
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
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-300"></span>
            <span
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#BB4B2A]
              transition-all duration-500 group-focus-within:w-full"
            ></span>
          </div>

          <div className="relative group">
            <textarea
              name="message"
              rows="3"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-transparent py-[12px] text-[14px] tracking-[0.5px]
              outline-none resize-none"
            />
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-300"></span>
            <span
              className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#BB4B2A]
              transition-all duration-500 group-focus-within:w-full"
            ></span>
          </div>

          {status.msg && (
            <p
              className={`text-center text-[11px] tracking-[1px]
              ${status.type === 'success' ? 'text-green-600' : 'text-[#BB4B2A]'}`}
            >
              {status.msg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-[24px] w-full border border-[#BB4B2A]
            py-[16px] text-[11px] tracking-[4px] uppercase text-[#BB4B2A]
            transition-all duration-500 hover:bg-[#BB4B2A] hover:text-white
            disabled:opacity-40"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

      </div>
    </section>
    </>
    
  );
}

export default ContactM;
