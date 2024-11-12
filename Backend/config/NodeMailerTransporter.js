const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "eafe53bf254c22",
    pass: "248ba362a04322"
  }
})

module.exports = transporter;