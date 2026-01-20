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
      firstName: Yup.string().required("Ad mütləqdir"),
      lastName: Yup.string().required("Soyad mütləqdir"),
      email: Yup.string().email("Düzgün email yazın").required("Email mütləqdir"),
      phone: Yup.string().required("Telefon mütləqdir"),
      street: Yup.string().required("Ünvan mütləqdir"),
      city: Yup.string().required("Şəhər mütləqdir"),
    }),
    onSubmit: async (values) => {
      if (!stripe || !elements) return;

      setIsProcessing(true);
      const loadingToast = toast.loading("Ödəniş yoxlanılır...");

      try {
        // 1. Stripe ödənişini təsdiqləyirik
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/succes`,
            payment_method_data: {
              billing_details: {
                name: `${values.firstName} ${values.lastName}`,
                email: values.email,
                phone: values.phone,
              },
            },
          },
          redirect: "if_required", // Bu çox vacibdir: Səhifəni dərhal yeniləmir
        });

        if (error) {
          toast.dismiss(loadingToast);
          toast.error(error.message);
          setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          // 2. Ödəniş uğurlu olduqda məlumatları bazaya göndəririk
          const finalOrder = {
            customerInfo: {
              fullName: `${values.firstName} ${values.lastName}`,
              email: values.email,
              phone: values.phone,
              address: `${values.street}, ${values.city}, ${values.country}`,
              note: values.note,
            },
            items: items.map((item) => ({
              productId: item._id,
              title: item.title,
              price: Number(item.price),
              quantity: Number(item.quantity),
            })),
            totalPrice: Number(totalPrice),
            paymentStatus: "Paid",
            stripePaymentId: paymentIntent.id,
          };

          await axios.post("http://localhost:5050/orders", finalOrder);

          // 3. Uğurlu nəticə və təmizlik
          toast.dismiss(loadingToast);
          toast.success("Ödəniş uğurla tamamlandı!");
          dispatch(clearCart());
          navigate("/success");
        }
      } catch (err) {
        toast.dismiss(loadingToast);
        console.error("Proses xətası:", err);
        toast.error("Xəta baş verdi, lakin ödənişiniz alınmış ola bilər. Zəhmət olmasa yoxlayın.");
      } finally {
        setIsProcessing(false);
      }
    },
  });

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <form onSubmit={formik.handleSubmit} className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-8">
          <h2 className="text-2xl font-serif italic border-b pb-4">Çatdırılma və Ödəniş</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <input placeholder="Ad" className="w-full p-4 bg-[#F9F9F9] rounded-xl outline-none" {...formik.getFieldProps("firstName")} />
              {formik.touched.firstName && formik.errors.firstName && <span className="text-red-500 text-xs mt-1 ml-2">{formik.errors.firstName}</span>}
            </div>
            <div className="flex flex-col">
              <input placeholder="Soyad" className="w-full p-4 bg-[#F9F9F9] rounded-xl outline-none" {...formik.getFieldProps("lastName")} />
              {formik.touched.lastName && formik.errors.lastName && <span className="text-red-500 text-xs mt-1 ml-2">{formik.errors.lastName}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input placeholder="Email" className="w-full p-4 bg-[#F9F9F9] rounded-xl outline-none" {...formik.getFieldProps("email")} />
            <input placeholder="Telefon" className="w-full p-4 bg-[#F9F9F9] rounded-xl outline-none" {...formik.getFieldProps("phone")} />
          </div>

          <input placeholder="Küçə və Ev ünvanı" className="w-full p-4 bg-[#F9F9F9] rounded-xl outline-none" {...formik.getFieldProps("street")} />
          <input placeholder="Şəhər" className="w-full p-4 bg-[#F9F9F9] rounded-xl outline-none" {...formik.getFieldProps("city")} />

          <div className="mt-10 p-6 bg-white border border-gray-100 rounded-[30px] shadow-sm">
            <h4 className="text-sm font-bold mb-4 text-gray-400 uppercase tracking-widest">Kart Məlumatları</h4>
            <PaymentElement />
          </div>
        </div>

        <div className="w-full lg:w-[400px]">
          <div className="bg-[#FBFBFB] p-8 rounded-[30px] border border-gray-100 sticky top-10">
            <h3 className="text-center font-bold uppercase mb-8 tracking-widest">Sifarişiniz</h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm italic text-gray-600">
                  <span>{item.title} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-xl text-[#BB4B2A]">
              <span>Cəmi:</span>
              <span>${totalPrice}.00</span>
            </div>
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="w-full mt-8 py-4 bg-[#BB4B2A] text-white rounded-full uppercase font-bold hover:bg-black transition-all disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer shadow-lg active:scale-95"
            >
              {isProcessing ? "İşlənilir..." : "Ödənişi Tamamla"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;