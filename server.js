const express = require('express');
const bodyParser =require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const rateLimit = require('express-rate-Limit');
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many contact request, please try again later.'
});

app.post('/api/contact', contactLimiter, async (req,res) => {
    const{ name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    if (name.length > 100 || email.length > 100 || message.length > 1000) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    if (name.length > 100 || email.length > 100 || message.length > 1000) {
        return res.status(400).json({
            error: 'Input exceeds maximum length'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'Invalid email format'
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `NBG Contact from ${name}`,
            text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            replyTo: email
        };

        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({
            error: 'Failed to send message. Please try again later.'
        });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
   