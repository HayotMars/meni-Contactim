const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN'; // BotFather dan olingan token
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // Sizning chat ID

app.post('/send-message', async (req, res) => {
    const { fullName, email, phone, subject, message } = req.body;

    const text = `
🌟 New Contact Form Submission 🌟
👤 Full Name: ${fullName}
📧 Email: ${email}
📞 Phone: ${phone}
📑 Subject: ${subject}
💬 Message: ${message}
    `;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: text,
        });
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send message.');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    };

    try {
        const response = await fetch('http://localhost:3000/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Xabar muvaffaqiyatli yuborildi!');
            e.target.reset();
        } else {
            alert('Xabar yuborishda xatolik yuz berdi.');
        }
    } catch (error) {
        console.error(error);
        alert('Xabar yuborishda xatolik yuz berdi.');
    }
});
