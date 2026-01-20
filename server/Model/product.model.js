const mongoose = require("mongoose");
const productSchema = require("../Schemas/product.schemas");

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;