import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { clearCart } from "@/features/Cart/cartSlice";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet";

function CheckoutForm() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "Azerbaijan",
      street: "",
      city: "",
      note: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Enter a valid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      street: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
    }),
    onSubmit: async (values) => {
      if (!stripe || !elements) return;

      setIsProcessing(true);
      const loadingToast = toast.loading("Processing payment...");

      try {
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/success`,
            payment_method_data: {
              billing_details: {
                name: `${values.firstName} ${values.lastName}`,
                email: values.email,
                phone: values.phone,
              },
            },
          },
          redirect: "if_required",
        });

        if (error) {
          toast.dismiss(loadingToast);
          toast.error(error.message);
          setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          const finalOrder = {
            customerInfo: {
              fullName: `${values.firstName} ${values.lastName}`,
              email: values.email,
              phone: values.phone,
              address: `${values.street}, ${values.city}, ${values.country}`,
              note: values.note,
            },
            items: items.map((item) => ({
              productId: item.isGiftCard ? "GIFT-CARD" : String(item._id),
              title: item.title,
              price: Number(item.price),
              quantity: Number(item.quantity),
            })),
            totalPrice: Number(totalPrice),
            paymentStatus: "Paid",
            stripePaymentId: paymentIntent.id,
          };

          await axios.post("http://localhost:5050/orders", finalOrder);

          toast.dismiss(loadingToast);
          toast.success("Payment completed successfully!");
          dispatch(clearCart());
          navigate("/success");
        }
      } catch (err) {
        toast.dismiss(loadingToast);
        console.error("Process error:", err);
        toast.error(
          "Payment was received, but the order could not be saved. Please contact support."
        );
      } finally {
        setIsProcessing(false);
      }
    },
  });

  return (
    <>
         <Helmet>
              <title> Checkout</title>
            </Helmet>
      <section>
        <div className="max-w-[1200px] mx-auto pt-[34px] pb-[30px] font-sans">
          <div style={{ maxWidth: "1200px" }} className="mx-auto px-[24px] py-[64px]">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col lg:flex-row gap-[64px]"
            >
              <div className="flex-1 space-y-[32px]">
                <h2 className="text-[24px] font-serif italic border-b pb-[16px]">
                  Delivery and Payment
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <div className="flex flex-col">
                    <input
                      placeholder="First Name"
                      style={{ padding: "16px" }}
                      className="w-full bg-[#F9F9F9] rounded-xl outline-none"
                      {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <span className="text-red-500 text-[12px] mt-[4px] ml-[8px]">
                        {formik.errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <input
                      placeholder="Last Name"
                      style={{ padding: "16px" }}
                      className="w-full bg-[#F9F9F9] rounded-xl outline-none"
                      {...formik.getFieldProps("lastName")}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <span className="text-red-500 text-[12px] mt-[4px] ml-[8px]">
                        {formik.errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <input
                    placeholder="Email"
                    style={{ padding: "16px" }}
                    className="w-full bg-[#F9F9F9] rounded-xl outline-none"
                    {...formik.getFieldProps("email")}
                  />
                  <input
                    placeholder="Phone"
                    style={{ padding: "16px" }}
                    className="w-full bg-[#F9F9F9] rounded-xl outline-none"
                    {...formik.getFieldProps("phone")}
                  />
                </div>

                <input
                  placeholder="Street Address"
                  style={{ padding: "16px" }}
                  className="w-full bg-[#F9F9F9] rounded-xl outline-none"
                  {...formik.getFieldProps("street")}
                />

                <input
                  placeholder="City"
                  style={{ padding: "16px" }}
                  className="w-full bg-[#F9F9F9] rounded-xl outline-none"
                  {...formik.getFieldProps("city")}
                />

                <div
                  style={{ marginTop: "40px", padding: "24px", borderRadius: "30px" }}
                  className="bg-white border border-gray-100 shadow-sm"
                >
                  <h4 className="text-[12px] font-bold mb-[16px] text-gray-400 uppercase tracking-[2px]">
                    Card Details
                  </h4>
                  <PaymentElement />
                </div>
              </div>

              <div className="w-full lg:w-[400px]">
                <div
                  style={{ padding: "32px", borderRadius: "30px", top: "40px" }}
                  className="bg-[#FBFBFB] border border-gray-100 sticky"
                >
                  <h3 className="text-center font-bold uppercase mb-[32px] tracking-[2px]">
                    Your Order
                  </h3>

                  <div className="space-y-[16px] mb-[24px]">
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between text-[14px] italic text-gray-600"
                      >
                        <span>
                          {item.title} x{item.quantity}
                        </span>
                        <span>${item.price * item.quantity}.00</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{ paddingTop: "16px" }}
                    className="border-t flex justify-between font-bold text-[20px] text-[#BB4B2A]"
                  >
                    <span>Total:</span>
                    <span>${totalPrice}.00</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    style={{ marginTop: "32px", padding: "16px" }}
                    className="w-full bg-[#BB4B2A] text-white rounded-full uppercase font-bold hover:bg-black transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg active:scale-95"
                  >
                    {isProcessing ? "Processing..." : "Complete Payment"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default CheckoutForm;
