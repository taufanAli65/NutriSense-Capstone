const nodemailer = require("nodemailer");

async function sendVerificationEmail(userEmail, verificationToken) {
  require("dotenv").config();
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail", // or another email service
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email content
  let mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Email Verification",
    text: `Please verify your email by clicking the following link: ${verificationToken}`,
  };

  // Send email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
}

module.exports = sendVerificationEmail;
