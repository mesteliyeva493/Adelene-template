const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const category_router = require("./Routes/categories.router");
const tag_router = require("./Routes/tag.router");
const product_router = require("./Routes/product.router");
const user_router = require("./Routes/user.router");
const order_router = require("./Routes/order.router");
const payment_router = require("./Routes/payment.router");
const mail_router = require("./Routes/mail.router");
const gift_router = require("./Routes/gift.router");

app.use(cors());
const PORT = 5050;
app.use(express.json());

app.use("/categories", category_router);
app.use("/tag", tag_router);
app.use("/products", product_router);
app.use('/users', user_router);
app.use("/orders", order_router);
app.use("/api", payment_router);
app.use("/api",mail_router)
app.use("/giftcards", gift_router);
mongoose
  .connect(
    "mongodb+srv://mesteliyeva004:Mesteliyeva493.@products.3aodwgi.mongodb.net/"
  )
  .then(() => {
    console.log("connected");
  });
app.listen(PORT, () => {
  console.log("back is running");
});


