const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) create transpoter
  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail  "less secure app" option
  });

  // 2) Define email options
  const mailOptions = {
    from: 'Pratik Kshirsagar <hello@pratik.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  const info = await transpoter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
