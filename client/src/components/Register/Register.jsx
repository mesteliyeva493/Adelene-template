import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiUser, CiMail, CiLock, CiCircleCheck, CiCircleMinus } from "react-icons/ci";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'client'
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username is too short')
        .required('Username is required'),
      email: Yup.string()
        .matches(emailRegex, 'Please enter a valid email address')
        .required('Email is required'),
      password: Yup.string()
        .matches(
          passwordRegex,
          'Password must be at least 8 characters and include one uppercase letter, one number, and one special character'
        )
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .required('Please confirm your password')
    }),
    onSubmit: async (values) => {
      try {
        const { confirmPassword: _, ...registerData } = values;
        await axios.post('http://localhost:5050/users/register', registerData);
        toast.success('Registration completed successfully!');
        navigate('/login');
      } catch (err) {
        toast.error(err.response?.data?.message || 'An error occurred during registration');
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[450px]"
      >
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif italic text-[#BB4B2A] mb-3"
          >
            Create Account
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] uppercase tracking-[4px] text-gray-400 font-light"
          >
            Welcome to Adelene
          </motion.p>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
          
          <div className="relative group">
            <div className="flex items-center border-b border-gray-200 py-3 group-focus-within:border-[#BB4B2A] transition-all duration-500">
              <CiUser className="text-2xl text-gray-400 mr-3 group-focus-within:text-[#BB4B2A] transition-colors" />
              <input
                name="username"
                placeholder="Username"
                className="w-full bg-transparent outline-none text-sm font-light tracking-wide placeholder:text-gray-300 font-serif italic"
                {...formik.getFieldProps('username')}
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <motion.span className="text-[10px] text-red-500 absolute mt-1 italic">
                {formik.errors.username}
              </motion.span>
            )}
          </div>

          <div className="relative group">
            <div className="flex items-center border-b border-gray-200 py-3 group-focus-within:border-[#BB4B2A] transition-all duration-500">
              <CiMail className="text-2xl text-gray-400 mr-3 group-focus-within:text-[#BB4B2A] transition-colors" />
              <input
                name="email"
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent outline-none text-sm font-light tracking-wide placeholder:text-gray-300"
                {...formik.getFieldProps('email')}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <motion.span className="text-[10px] text-red-500 absolute mt-1 italic">
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
                placeholder="Password"
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
              <motion.span className="text-[10px] text-red-500 absolute mt-1 italic leading-[1.2]">
                {formik.errors.password}
              </motion.span>
            )}
          </div>

          <div className="relative group">
            <div className="flex items-center border-b border-gray-200 py-3 group-focus-within:border-[#BB4B2A] transition-all duration-500">
              <CiLock className="text-2xl text-gray-400 mr-3 group-focus-within:text-[#BB4B2A] transition-colors" />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="w-full bg-transparent outline-none text-sm font-light tracking-wide placeholder:text-gray-300"
                {...formik.getFieldProps('confirmPassword')}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <motion.span className="text-[10px] text-red-500 absolute mt-1 italic">
                {formik.errors.confirmPassword}
              </motion.span>
            )}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#904F2E" }}
            whileTap={{ scale: 1 }}
            type="submit" 
            className="w-full bg-[#BB4B2A] text-white py-4 mt-4 text-[11px] uppercase tracking-[4px] font-medium transition-all duration-300 shadow-sm"
          >
            Complete Registration
          </motion.button>

          <div className="text-center mt-2">
            <p className="text-[11px] text-gray-500 tracking-[1px] uppercase">
              Already have an account?
              <Link 
                to="/login" 
                className="text-[#BB4B2A] font-semibold border-b border-[#BB4B2A] ml-2 pb-0.5 hover:text-gray-400 hover:border-gray-400 transition-all"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
