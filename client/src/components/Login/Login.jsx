import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiMail, CiLock, CiCircleCheck, CiCircleMinus } from "react-icons/ci";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5050/users/login', values);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success(`Welcome, ${response.data.user.username}!`);
        
        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Email or password is incorrect');
      }
    },
  });

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[400px] py-12 px-2"
      >
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif italic text-[#BB4B2A] mb-3"
          >
            Sign In
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] uppercase tracking-[4px] text-gray-400 font-light"
          >
            Welcome back
          </motion.p>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
          
          <div className="relative group">
            <div className="flex items-center border-b border-gray-200 py-3 group-focus-within:border-[#BB4B2A] transition-all duration-500">
              <CiMail className="text-2xl text-gray-400 mr-3 group-focus-within:text-[#BB4B2A] transition-colors" />
              <input
                name="email"
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent outline-none text-sm font-light tracking-wide placeholder:text-gray-300 font-serif italic"
                {...formik.getFieldProps('email')}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] text-red-500 absolute -bottom-5 left-0 italic"
              >
                {formik.errors.email}
              </motion.span>
            )}
          </div>

          <div className="relative group">
            <div className="flex items-center border-b border-gray-200 py-3 group-focus-within:border-[#BB4B2A] transition-all duration-500">
              <CiLock className="text-2xl text-gray-400 mr-3 group-focus-within:text-[#BB4B2A] transition-colors" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                className="w-full bg-transparent outline-none text-sm font-light tracking-wide placeholder:text-gray-300"
                {...formik.getFieldProps('password')}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-[#BB4B2A] transition-colors px-2"
              >
                {showPassword ? <CiCircleMinus className="text-2xl" /> : <CiCircleCheck className="text-2xl" />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] text-red-500 absolute -bottom-5 left-0 italic"
              >
                {formik.errors.password}
              </motion.span>
            )}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#904F2E" }}
            whileTap={{ scale: 1 }}
            type="submit" 
            className="w-full bg-[#BB4B2A] text-white py-4 mt-6 text-[11px] uppercase tracking-[4px] font-medium transition-all duration-300 shadow-sm"
          >
            Sign In
          </motion.button>

          <div className="text-center mt-4">
            <p className="text-[11px] text-gray-500 tracking-[1px] uppercase">
              Don’t have an account?
              <Link 
                to="/register" 
                className="text-[#BB4B2A] font-semibold border-b border-[#BB4B2A] ml-2 pb-0.5 hover:text-gray-400 hover:border-gray-400 transition-all"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
