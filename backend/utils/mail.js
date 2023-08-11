const nodemailer = require("nodemailer");
exports.transportInit = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.mail_user,
      pass: process.env.mail_password,
    },
  });
