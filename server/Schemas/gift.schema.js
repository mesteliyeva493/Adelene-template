const mongoose = require("mongoose");

const giftCardSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  isUsed: { type: Boolean, default: false }
});

module.exports = giftCardSchema; 