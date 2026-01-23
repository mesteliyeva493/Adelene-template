const { default: GiftCardModel } = require("../Model/gift.model");

const GiftCardController = {
    post: async (req, res) => {
        try {
            const newCard = new GiftCardModel({ ...req.body });
            await newCard.save();
            res.status(201).send(newCard);
        } catch (error) {
            res.status(400).send("Xəta: " + error.message);
        }
    },

    validate: async (req, res) => {
        try {
            const { code } = req.body;
            const found = await GiftCardModel.findOne({ code, isUsed: false });

            if (!found) {
                return res.status(404).send("Kod yanlışdır və ya işlənib");
            }

            res.status(200).json({ amount: found.amount });
        } catch (error) {
            res.status(500).send("Server xətası");
        }
    }
};

module.exports = GiftCardController;