const express = require('express');
const sendContactMail = require('../helpers/sendContactMail');
const mail_router = express.Router();

mail_router.post('/send-message', async (req, res) => {
    const { email, subject, message } = req.body;

    try {
        await sendContactMail(email, subject, message);
        
        res.status(200).json({
            success: true,
            message: "Mesajınız uğurla göndərildi!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Xəta baş verdi, email göndərilmədi."
        });
    }
});

module.exports = mail_router;