const express = require('express');
const bodyParser =require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/contact',(reg,res) =>{
    const{name, email, message} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user:'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `Contact from ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error,info) =>{
        if(error) {
            return
            res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent:' + info.response);
    });
});

app.listen(PORT,() => {
    console.log('Server is running on http://localhost:${PORT}');
});