const nodemailer = require('nodemailer');

const sendContactMail = async (senderEmail, subject, content) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
            user: process.env.EMAIL__USERNAME, 
            pass: process.env.EMAIL__PASSWORD, 
        },
    });

    const mailOptions = {
        from: `"Adalene Store" <${process.env.EMAIL__USERNAME}>`,
        to: process.env.EMAIL__USERNAME, 
        replyTo: senderEmail, 
        subject: `Adalene Contact: ${subject}`,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
            <h2 style="color: #BB4B2A; border-bottom: 2px solid #BB4B2A; padding-bottom: 10px;">Yeni Əlaqə Mesajı</h2>
            <p><strong>Göndərən:</strong> ${senderEmail}</p>
            <p><strong>Mövzu:</strong> ${subject}</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #BB4B2A; margin-top: 20px;">
                <p style="margin: 0;"><strong>Mesaj:</strong></p>
                <p style="white-space: pre-wrap;">${content}</p>
            </div>
            <footer style="margin-top: 20px; font-size: 12px; color: #777;">
                Bu mesaj Adalene rəsmi saytındakı contact formundan göndərilib.
            </footer>
        </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email uğurla göndərildi!");
        return { success: true };
    } catch (error) {
        console.error("Nodemailer xətası:", error);
        return { success: false, error };
    }
};

module.exports = sendContactMail;