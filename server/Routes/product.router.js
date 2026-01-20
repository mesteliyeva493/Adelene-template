const express = require("express");
const ProductController = require("../Controller/product.controller");
const product_router = express.Router();
const { protect, isAdmin } = require("../Middleware/auth.middleware");

product_router.get("/", ProductController.getAll);
product_router.get("/:id", ProductController.getOne);

// product_router.post("/", protect, isAdmin, ProductController.post);
product_router.post("/", ProductController.post);
product_router.patch("/:id", protect, isAdmin, ProductController.update);
product_router.put("/:id", protect, isAdmin, ProductController.update); // Hər ehtimala qarşı qalsın
product_router.delete("/:id", protect, isAdmin, ProductController.delete);

module.exports = product_router;