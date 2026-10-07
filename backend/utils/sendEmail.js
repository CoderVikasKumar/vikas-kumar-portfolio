import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async ({
  name,
  email,
  subject,
  message,
}) => {
  await transporter.sendMail({
    from: `"Vikas Portfolio" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Portfolio Contact: ${subject}`,

    text: `
New contact message from your portfolio.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>New Portfolio Contact</h2>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Subject:</strong> ${subject}
        </p>

        <hr />

        <h3>Message</h3>

        <p>
          ${message}
        </p>
      </div>
    `,
  });
};