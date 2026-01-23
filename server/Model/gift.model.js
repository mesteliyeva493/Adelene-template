const mongoose = require("mongoose");
const giftCardSchema = require("../Schemas/gift.schema");

const GiftCardModel = mongoose.model("GiftCard", giftCardSchema);

module.exports = GiftCardModel; 