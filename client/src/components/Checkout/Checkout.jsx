import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    // ƏGƏR SƏBƏT BOŞDURSA (məsələn, ödənişdən sonra qayıdıblarsa)
    if (items.length === 0) {
      const timer = setTimeout(() => {
        navigate('/'); // 2 saniyə sonra ana səhifəyə at
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (totalPrice > 0) {
      axios.post("http://localhost:5050/api/create-payment-intent", {
        amount: totalPrice
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("Stripe Secret Error:", err);
      });
    }
  }, [totalPrice, items, navigate]);

  // Səbət boşdursa mesaj göstər
  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <p className="text-xl font-serif italic text-gray-700">Səbətiniz boşdur...</p>
        <p className="text-sm text-gray-400">Ana səhifəyə yönləndirilirsiniz.</p>
      </div>
    );
  }

  // Yalnız clientSecret olanda Elements-i göstər
  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-lg italic text-gray-500">Ödəniş sistemi hazırlanır...</div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;