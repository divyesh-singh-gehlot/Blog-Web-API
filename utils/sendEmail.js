const nodeMail = require("nodemailer");
const { senderEmail, emailPassword } = require("../config/keys");

const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodeMail.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: emailPassword,
    },
  });

  const message = {
    to: emailTo,
    subject,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
        <div style="max-width: 500px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; text-align: center;">🔐 Verification Code</h2>
          <p style="font-size: 16px; color: #555; text-align: center;">Use the code below to <strong>${content}</strong></p>
          <div style="margin: 30px 0; text-align: center;">
            <span style="display: inline-block; background-color: #000; color: #fff; font-size: 24px; font-weight: bold; padding: 12px 24px; border-radius: 8px; letter-spacing: 2px;">
              ${code}
            </span>
          </div>
          <p style="font-size: 14px; color: #888; text-align: center;">
            If you didn't request this, you can ignore this email.
          </p>
        </div>
        <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 20px;">
          &copy; ${new Date().getFullYear()} Notionary. All rights reserved.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;
