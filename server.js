const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ferarifadlemonie.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const corsOptions = {
  origin: 'https://ferarifadlemonie.vercel.app'
};
app.use(cors(corsOptions));

app.post('/api/send-email', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  const replyTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const replyMailOptions = {
    from: process.env.EMAIL_RECEIVER,
    to: email,
    subject: "Balasan dari FERA RIFA D'LEMONIE",
    html: `
      <h1>FERA RIFA D'LEMONIE</h1>
      <img src="https://ferarifadlemonie.vercel.app/assets/favicon.bc8366ee.png" alt="Logo" style="width: 100px; height: 100px;">
      <p>Halo ${name},</p>
      <p>Terima kasih sudah menghubungi Kontak Toko FERA RIFA D'LEMONIE (Distributor D'Lemonie Tasikmalaya).</p>
      <p>Kami telah menerima pesan berikut:</p>
      <p>${message}</p><br/><br/>
      <p>Kami akan segera merespons pesan Anda.</p>
      <p>Terima kasih.<br/>Tim Admin CS FERA RIFA DLEMONIE</p>
    `
  };  

  replyTransporter.sendMail(replyMailOptions, (error, info) => {
    if (error) {
      console.log('Terjadi kesalahan saat mengirim email balasan:', error);
    } else {
      console.log('Email balasan terkirim: ' + info.response);
    }
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_RECEIVER,
    subject: subject,
    html: `
    <h1>FERA RIFA D'LEMONIE</h1>
    <img src="https://ferarifadlemonie.vercel.app/assets/favicon.bc8366ee.png" alt="Logo" style="width: 100px; height: 100px;">
    <p>Nama: ${name}</p>
    <p>Email: ${email}</p>
    <p>Pesan: ${message}</p>
  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Terjadi kesalahan saat mengirim email:', error);
      res.status(500).send('Terjadi kesalahan saat mengirim email.');
    } else {
      console.log('Email terkirim: ' + info.response);
      res.send('Pesan Anda telah terkirim, Terima Kasih.');
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
