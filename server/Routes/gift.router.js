const express = require("express");
const GiftCardController = require("../Controller/gift.controller");
const gift_router = express.Router();
gift_router.post("/", GiftCardController.post);

gift_router.post("/validate", GiftCardController.validate);

module.exports = gift_router;