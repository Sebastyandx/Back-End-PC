const nodemailer = require("nodemailer");
const { PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gonzalogaete602@gmail.com",
    pass: PASS,
  },
});

transporter
  .verify()
  .then(() => {})
  .catch((err) => {});

const infoTransporter = async (fromTitle, toList, subject, html) => {
  transporter
    .sendMail({
      from: `"${fromTitle}" <gonzalogaete602@gmail.com>`,
      to: `${toList}`,
      subject: `${subject}`,
      html: `${html}`,
    })
    .then(() => {})
    .catch((e) => {});
};

module.exports = {
  transporter,
  infoTransporter,
};
