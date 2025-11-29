import nodemailer from "nodemailer";

// Function to send an email

export const sendEmail = async (email, subject, message) => {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Define email options

  const options = {
    // Set the email sender and recipient

    from: process.env.SMTP_MAIL,

    // Set the email recipient
    to: email,

    subject,
    // Set the email content
    html: message,
  };
  // Send the email
 // console.log("Sending email to:", email);
  await transporter.sendMail(options);
};
