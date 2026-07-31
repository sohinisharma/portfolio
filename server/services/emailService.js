const nodemailer = require('nodemailer');

// ── Create reusable transporter ───────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * Send notification email to Sohini when a visitor submits the contact form.
 * @param {{ name: string, email: string, message: string }} data
 */
async function sendContactEmail({ name, email, message }) {
  // ── Email to Sohini (notification) ─────────────────────────
  const notifyMail = {
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to:   process.env.CONTACT_RECEIVER,
    replyTo: email,
    subject: `📩 New message from ${name} — Portfolio`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0e1a; margin: 0; padding: 0; }
          .wrapper { max-width: 600px; margin: 40px auto; background: #0f1629; border-radius: 16px; overflow: hidden; border: 1px solid rgba(108,99,255,0.25); }
          .header { background: linear-gradient(135deg, #6c63ff, #00d4ff); padding: 32px; text-align: center; }
          .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
          .body { padding: 32px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #718096; font-weight: 700; margin-bottom: 6px; }
          .value { background: rgba(255,255,255,0.05); border: 1px solid rgba(108,99,255,0.2); border-radius: 10px; padding: 14px 18px; color: #e2e8f0; font-size: 14px; line-height: 1.6; word-break: break-word; }
          .message-box { background: rgba(108,99,255,0.08); border: 1px solid rgba(108,99,255,0.25); border-radius: 10px; padding: 18px; color: #e2e8f0; font-size: 14px; line-height: 1.8; white-space: pre-wrap; }
          .footer { text-align: center; padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.06); }
          .footer p { color: #4a5568; font-size: 12px; margin: 0; }
          .reply-btn { display: inline-block; margin-top: 24px; padding: 12px 28px; background: linear-gradient(135deg,#6c63ff,#00d4ff); color: #fff; text-decoration: none; border-radius: 50px; font-size: 13px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <h1>📩 New Portfolio Contact</h1>
          </div>
          <div class="body">
            <div class="field">
              <div class="label">From</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message}</div>
            </div>
            <div style="text-align:center;">
              <a href="mailto:${email}" class="reply-btn">Reply to ${name}</a>
            </div>
          </div>
          <div class="footer">
            <p>Sent via your portfolio at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // ── Auto-reply to the visitor ───────────────────────────────
  const autoReply = {
    from: `"Sohini Sharma" <${process.env.GMAIL_USER}>`,
    to:   email,
    subject: `Thanks for reaching out, ${name}! 👋`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0e1a; margin: 0; padding: 0; }
          .wrapper { max-width: 600px; margin: 40px auto; background: #0f1629; border-radius: 16px; overflow: hidden; border: 1px solid rgba(108,99,255,0.25); }
          .header { background: linear-gradient(135deg,#6c63ff,#00d4ff); padding: 32px; text-align: center; }
          .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
          .body { padding: 36px; color: #a0aec0; font-size: 14px; line-height: 1.8; }
          .highlight { color: #00d4ff; font-weight: 600; }
          .footer { text-align: center; padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.06); }
          .footer p { color: #4a5568; font-size: 12px; margin: 0; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <h1>Thanks for getting in touch! 🙌</h1>
          </div>
          <div class="body">
            <p>Hi <span class="highlight">${name}</span>,</p>
            <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible — usually within 24 hours.</p>
            <p>Here's a copy of what you sent:</p>
            <blockquote style="border-left:3px solid #6c63ff; margin:16px 0; padding:12px 20px; background:rgba(108,99,255,0.08); border-radius:0 10px 10px 0; color:#e2e8f0; font-style:italic;">
              "${message}"
            </blockquote>
            <p>In the meantime, feel free to check out my work on <a href="https://github.com/sohinisharma" style="color:#00d4ff;">GitHub</a> or connect with me on <a href="https://www.linkedin.com/in/sohini-sharma-2967ba271/" style="color:#00d4ff;">LinkedIn</a>.</p>
            <p>Talk soon! 🚀</p>
            <p><strong style="color:#fff;">Sohini Sharma</strong><br/>
            <span style="color:#6c63ff;">Frontend Developer</span></p>
          </div>
          <div class="footer">
            <p>This is an automated reply. Please don't reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // Send both emails in parallel
  await Promise.all([
    transporter.sendMail(notifyMail),
    transporter.sendMail(autoReply),
  ]);
}

module.exports = { sendContactEmail };
