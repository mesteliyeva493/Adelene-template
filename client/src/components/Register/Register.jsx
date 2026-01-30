import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CiUser,
  CiMail,
  CiLock,
  CiCircleCheck,
  CiCircleMinus,
} from "react-icons/ci";
import { Helmet } from "react-helmet";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "client",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Too short").required("Required"),
      email: Yup.string()
        .matches(emailRegex, "Invalid email")
        .required("Required"),
      password: Yup.string()
        .matches(passwordRegex, "Must be stronger")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "No match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const { confirmPassword: _, ...registerData } = values;
        await axios.post("http://localhost:5050/users/register", registerData);
        toast.success("Success!");
        navigate("/login");
      } catch (err) {
        toast.error(err.response?.data?.message || "Error");
      }
    },
  });

  return (
  <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <section className="max-w-[1200px] mx-auto pt-[34px] font-sans px-4 md:px-[16px]">
        <div>
          <nav className="flex items-center gap-[8px] text-[10px] tracking-[2px] uppercase text-gray-400 mb-8 md:mb-12">
            <Link to="/" className="hover:text-[#BC4C2A] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#BC4C2A] font-bold">Register</span>
          </nav>

          <div className="flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[450px] pb-12"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-serif italic text-[#BB4B2A] mb-3 leading-tight">
                  Create Account
                </h2>
                <p className="text-[10px] uppercase tracking-[4px] text-gray-400">
                  Welcome to Adelene
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-9">
                
                <div className="relative group">
                  <div className="flex items-center border-b border-gray-200 py-3 group-focus-within:border-[#BB4B2A] transition-all">
                    <CiUser className="text-2xl text-gray-400 mr-3" />
                    <input
                      name="username"
                      placeholder="Username"
                      className="w-full bg-transparent outline-none text-sm font-serif italic"
                      {...formik.getFieldProps("username")}
                    />
                  </div>
                  {formik.touched.username && formik.errors.username && (
                    <span className="text-[10px] text-red-500 absolute mt-1 left-0 italic">
                      {formik.errors.username}
                    </span>
                  )}
                </div>

                <div className="relative group">
                  <div className="flex items-center border-b border-gray-200 py-3 group-focus-within:border-[#BB4B2A] transition-all">
                    <CiMail className="text-2xl text-gray-400 mr-3" />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full bg-transparent outline-none text-sm"
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-[10px] text-red-500 absolute mt-1 left-0 italic">
                      {formik.errors.email}
                    </span>
                  )}
                </div>

                <div className="relative group">
                  <div className="flex items-center border-b border-gray-200 py-3 group-focus-within:border-[#BB4B2A] transition-all">
                    <CiLock className="text-2xl text-gray-400 mr-3" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full bg-transparent outline-none text-sm"
                      {...formik.getFieldProps("password")}
                    />
                    <button
                      type="button"
                      className="outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <CiCircleMinus className="text-2xl text-gray-400 hover:text-[#BB4B2A] transition-colors" />
                      ) : (
                        <CiCircleCheck className="text-2xl text-gray-400 hover:text-[#BB4B2A] transition-colors" />
                      )}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <span className="text-[10px] text-red-500 absolute mt-1 left-0 italic leading-tight">
                      {formik.errors.password}
                    </span>
                  )}
                </div>

                <div className="relative group">
                  <div className="flex items-center border-b border-gray-200 py-3 group-focus-within:border-[#BB4B2A] transition-all">
                    <CiLock className="text-2xl text-gray-400 mr-3" />
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full bg-transparent outline-none text-sm"
                      {...formik.getFieldProps("confirmPassword")}
                    />
                  </div>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <span className="text-[10px] text-red-500 absolute mt-1 left-0 italic">
                        {formik.errors.confirmPassword}
                      </span>
                    )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01, backgroundColor: "#904F2E" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#BB4B2A] text-white py-4 mt-6 text-[11px] uppercase tracking-[4px] font-medium transition-all duration-300 shadow-sm"
                >
                  Complete Registration
                </motion.button>

                <div className="text-center">
                  <p className="text-[10px] text-gray-500 tracking-[1px] uppercase">
                    Already have an account?
                    <Link 
                      to="/login" 
                      className="text-[#BB4B2A] font-semibold border-b border-[#BB4B2A] ml-2 pb-0.5 hover:text-gray-400 hover:border-gray-400 transition-all"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
  </>
  );
};

export default Register;
