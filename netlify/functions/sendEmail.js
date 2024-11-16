const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const { name, email, message } = data;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // or another email service
    auth: {
      user: process.env.EMAIL_USER, // Add this in Netlify's environment variables
      pass: process.env.EMAIL_PASS, // Add this in Netlify's environment variables
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER, // Add this in Netlify's environment variables
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Email sent!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
