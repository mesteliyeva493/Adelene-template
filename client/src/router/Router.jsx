import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainRoot from "@/pages/Client/MainRoot";
import Home from "@/pages/Client/Home";
import Login from "@/components/Login/Login";
import Register from "@/components/Register/Register";
import AdminRoot from "@/pages/Admin/AdminRoot";
import NotFound from "@/pages/Client/NotFound";
import ShopAll from "@/pages/Client/ShopAll";
import GiftCard from "@/pages/Client/GiftCard";
import Contact from "@/pages/Client/Contact";
import Shopdetail from "@/components/Shopdetail/Shopdetail";
import Profile from "@/components/Profile/Profile";
import Basket from "@/components/Basket/Basket";
import Checkout from "@/components/Checkout/checkout";
import Succes from "@/components/Succes/Succes";
import Admin from "@/pages/Admin/Admin";
import OurCraft from "@/pages/Client/OurCraft";
import OurStory from "@/pages/Client/OurStory";
import Faq from "@/components/Faq/Faq";
import Shipping from "@/components/Shipping/Shipping";
import Policys from "@/components/Policys/Policys";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRoot />,
    children: [
      { index: true, element: <Home /> },
      { path: "shopAll", element: <ShopAll /> },
      { path: "giftCard", element: <GiftCard /> },
      { path: "contact", element: <Contact /> },
      { path: "shopdetail/:id", element: <Shopdetail /> },
      { path: "login", element: <Login /> },
     {path:"faq", element:<Faq/>},
          {path:"shipping", element:<Shipping/>},
      {path:"policy",element:<Policys/>},     
      {path:"ourCraft",element:<OurCraft/>},     
      {path:"ourStory",element:<OurStory/>},
      { path: "register", element: <Register /> },
      { path: "profile", element: <Profile /> },
      { path: "basket", element: <Basket /> },
      { path: "checkout", element: <Checkout /> },
      { path: "success", element: <Succes /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [{ index: true, element: <Admin /> }],
  },
]);

export default router;
