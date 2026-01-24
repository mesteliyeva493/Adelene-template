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
    <section>
      <div  className="max-w-[1200px] mx-auto    pt-[34px] font-sans">
              <nav className="flex items-center gap-[8px] text-[10px] tracking-[2px] uppercase text-gray-400 mb-12">
        <Link to="/" className="hover:text-[#BC4C2A]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#BC4C2A] font-bold">Register</span>
      </nav>

      <div className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[450px]"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-serif italic text-[#BB4B2A] mb-3">
              Create Account
            </h2>
            <p className="text-[10px] uppercase tracking-[4px] text-gray-400">
              Welcome to Adelene
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8">
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
                <span className="text-[10px] text-red-500 absolute mt-1 italic">
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
                <span className="text-[10px] text-red-500 absolute mt-1 italic">
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
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <CiCircleMinus className="text-2xl text-gray-400" />
                  ) : (
                    <CiCircleCheck className="text-2xl text-gray-400" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="text-[10px] text-red-500 absolute mt-1 italic leading-tight">
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
                  <span className="text-[10px] text-red-500 absolute mt-1 italic">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#904F2E" }}
              whileTap={{ scale: 1 }}
              type="submit"
              className="w-full bg-[#BB4B2A] text-white py-4 mt-6 text-[11px] uppercase tracking-[4px] font-medium transition-all duration-300 shadow-sm"
            >
              Complete Registration
            </motion.button>
          </form>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Register;
