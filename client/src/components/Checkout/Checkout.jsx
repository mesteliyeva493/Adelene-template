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
    if (items.length === 0) {
      const timer = setTimeout(() => {
        navigate('/'); 
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (totalPrice > 0 && !clientSecret) {
      axios.post("http://localhost:5050/api/create-payment-intent", {
        amount: Math.round(totalPrice * 100)
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("Stripe Secret Error:", err);
      });
    }
  }, [totalPrice, items, navigate, clientSecret]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-[16px]">
        <p className="text-[20px] font-serif italic text-gray-700">Your basket is empty...</p>
        <p className="text-[14px] text-gray-400">You are redirected to the home page.</p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-[18px] italic text-gray-500">The payment system is being prepared...</div>
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