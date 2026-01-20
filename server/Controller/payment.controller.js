const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PaymentController = {
    createPaymentIntent: async (req, res) => {
        try {
            const { amount, currency } = req.body;

            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), 
                currency: currency || "usd",
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            console.error("Stripe Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = PaymentController;