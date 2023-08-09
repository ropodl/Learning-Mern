const nodemailer = require("nodemailer");
exports.transportInit = () =>
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "11435352248f96",
      pass: "5247b843cd1cd1",
    },
  });
