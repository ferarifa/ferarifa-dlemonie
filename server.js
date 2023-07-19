const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Middleware untuk meng-handle data yang dikirimkan oleh formulir
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint untuk menangani permintaan POST dari formulir
app.post('http://localhost:3000/submit-form', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  // Mengatur konfigurasi transporter email
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    service: 'gmail',
    auth: {
      user: 'ferarifa87@gmail.com', // Ganti dengan alamat email Anda
      pass: 'hvgoeblsfrzirfzb' // Ganti dengan kata sandi email Anda
    }
  });

  // Membuat pesan email
  const mailOptions = {
    from: email, // Menggunakan alamat email yang diinputkan oleh pengguna
    to: 'ferarifa87@gmail.com', // Ganti dengan alamat tujuan email
    subject: subject,
    text: `Nama: ${name}\nEmail: ${email}\nPesan: ${message}`
  };

  // Mengirim email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Terjadi kesalahan saat mengirim email.');
    } else {
      console.log('Email terkirim: ' + info.response);
      res.send('Pesan Anda telah terkirim.');
    }
  });
});

// Mulai server pada port yang ditentukan
app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
