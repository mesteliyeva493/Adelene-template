const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    
    label: { 
      type: String, 
      enum: ["Best Seller", "New", "Sale", "None"], 
      default: "None" 
    },
    
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    
    tags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }],
    
    details: {
      productInfo: { type: String },
      returnPolicy: { type: String },
      shippingInfo: { type: String }
    }
  },
  { timestamps: true }
);

module.exports = productSchema;