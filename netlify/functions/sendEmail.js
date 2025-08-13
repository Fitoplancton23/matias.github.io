const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO,
      subject: `Nuevo mensaje de ${name}`,
      text: `Email: ${email}\n\n${message}`
    });
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Error sending email' }) };
  }
};
