🚀 Adelene — Full-Stack E-Commerce Platform

Adelene is a modern, responsive, and full-featured e-commerce web application tailored for luxury accessories, belts, bags, and wallets. Built with React (Vite) and Node.js.

---

✨ Key Features

- 🛍️ **Dynamic Product Catalog:** Filter products seamlessly by categories, tags/materials (Leather, Vegan, etc.), colors, and price range.
- 🔍 **Advanced Multi-Filter & Search:** Real-time search and multiple-select tagging (OR logic integration).
- 🛒 **Shopping Cart & Persistence:** State-managed cart system with `Redux Toolkit` and `Redux Persist` (cart items stay after page refresh).
- ⚡ **Quick View Modal:** Smooth product preview modal built with `Framer Motion`.
- 🔐 **Authentication & Security:** User registration and login powered by `JWT` and password hashing with `bcrypt`.
- 💳 **Secure Payment:** Integrated `Stripe` payment gateway for seamless checkout.
- 📧 **Automated Mailing:** Transporter service via `Nodemailer` with Google App Passwords for transaction/status emails.


🛠️ Tech Stack & Dependencies

Frontend (React + Vite)
- **State Management:** `@reduxjs/toolkit`, `react-redux`, `redux-persist`
- **Routing & UI:** `react-router-dom`, `framer-motion`, `swiper`
- **Icons & Styling:** `lucide-react`, `react-icons`, `tailwind-merge`, `clsx`
- **Forms & Validation:** `formik`, `yup`
- **Payments & Toast:** `@stripe/stripe-js`, `@stripe/react-stripe-js`, `react-hot-toast`
- **API Handling:** `axios`, `react-helmet`

Backend (Node.js + Express)
- **Server & DB:** `express`, `mongoose` (MongoDB)
- **Security & Auth:** `jsonwebtoken`, `bcrypt`, `cors`, `dotenv`
- **Services:** `stripe`, `nodemailer`

---

⚙️ Installation & Local Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/mesteliyeva493/Adelene-template.git](https://github.com/mesteliyeva493/Adelene-template.git)



   Frontend Setup:
   cd client
   npm install
   npm run dev
   
   Backend Setup:
   cd server
   npm install
   npm start


   Environment Variables (.env):
Create a .env file in the server directory with the following keys:
PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_16_digit_app_password




   
