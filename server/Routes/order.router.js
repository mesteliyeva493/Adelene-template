const express = require("express");
const { protect, isAdmin } = require("../Middleware/auth.middleware");
const OrderController = require("../Controller/order.controller");
const order_router = express.Router();

order_router.get("/", protect, isAdmin, OrderController.getAll);

order_router.get("/:id", protect, isAdmin, OrderController.getOne);

order_router.post("/", OrderController.post);

order_router.patch("/:id", protect, isAdmin, OrderController.updateStatus);

order_router.delete("/:id", protect, isAdmin, OrderController.delete);

module.exports = order_router;