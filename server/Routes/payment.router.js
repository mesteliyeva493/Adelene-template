const express = require("express");
const PaymentController = require("../Controller/payment.controller");
const payment_router = express.Router();
payment_router.post("/create-payment-intent", PaymentController.createPaymentIntent);

module.exports = payment_router;