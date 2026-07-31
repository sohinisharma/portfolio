const nodemailer = require('nodemailer');

// ── Transporter ───────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ── HTML builder helpers ──────────────────────────────────────
const baseStyles = `
  body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0e1a; margin: 0; padding: 0; }
  .wrapper { max-width: 600px; margin: 40px auto; background: #0f1629; border-radius: 16px; overflow: hidden; border: 1px solid rgba(108,99,255,0.25); }
  .header { background: linear-gradient(135deg, #6c63ff, #00d4ff); padding: 36px 32px; text-align: center; }
  .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
  .header p  { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 13px; }
  .body { padding: 36px; }
  .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #718096; font-weight: 700; margin-bottom: 6px; }
  .value { background: rgba(255,255,255,0.05); border: 1px solid rgba(108,99,255,0.2); border-radius: 10px; padding: 14px 18px; color: #e2e8f0; font-size: 14px; line-height: 1.6; word-break: break-word; margin-bottom: 20px; }
  .message-box { background: rgba(108,99,255,0.08); border: 1px solid rgba(108,99,255,0.25); border-radius: 10px; padding: 18px; color: #e2e8f0; font-size: 14px; line-height: 1.8; white-space: pre-wrap; margin-bottom: 20px; }
  .btn { display: inline-block; padding: 13px 30px; background: linear-gradient(135deg,#6c63ff,#00d4ff); color: #fff; text-decoration: none; border-radius: 50px; font-size: 13px; font-weight: 600; }
  .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 24px 0; }
  .footer { text-align: center; padding: 20px 32px; }
  .footer p { color: #4a5568; font-size: 12px; margin: 0; line-height: 1.6; }
  p { color: #a0aec0; font-size: 14px; line-height: 1.8; margin: 0 0 16px; }
  strong { color: #ffffff; }
  a { color: #00d4ff; }
`;

/**
 * 1️⃣  Notification email to Sohini (developer)
 */
function buildNotificationEmail({ name, email, message }) {
  return {
    from:    `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to:      process.env.CONTACT_RECEIVER,
    replyTo: email,
    subject: `📩 New message from ${name} — Portfolio`,
    html: `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>${baseStyles}</style></head>
    <body><div class="wrapper">
      <div class="header">
        <h1>📩 New Portfolio Message</h1>
        <p>Someone reached out via your portfolio contact form</p>
      </div>
      <div class="body">
        <div class="label">Sender Name</div>
        <div class="value">${name}</div>
        <div class="label">Sender Email</div>
        <div class="value">${email}</div>
        <div class="label">Message</div>
        <div class="message-box">${message}</div>
        <hr class="divider"/>
        <div style="text-align:center; margin-top:8px;">
          <a href="mailto:${email}?subject=Re: Your Portfolio Message" class="btn">↩ Reply to ${name}</a>
        </div>
      </div>
      <div class="footer">
        <p>Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST<br/>
        via <strong>https://sohiniportfolio.vercel.app</strong> portfolio contact form</p>
      </div>
    </div></body></html>`,
  };
}

/**
 * 2️⃣  Auto-reply email to the sender (visitor)
 */
function buildAutoReplyEmail({ name, email, message }) {
  return {
    from:    `"Sohini Sharma" <${process.env.GMAIL_USER}>`,
    to:      email,
    subject: `✅ Got your message, ${name}! I'll be in touch soon.`,
    html: `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>${baseStyles}</style></head>
    <body><div class="wrapper">
      <div class="header">
        <h1>Thanks for reaching out! 🙌</h1>
        <p>I've received your message and will reply shortly.</p>
      </div>
      <div class="body">
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for getting in touch! I've received your message and will get back to you
        as soon as possible — usually <strong>within 24 hours</strong>.</p>
        <p>Here's a copy of what you sent me:</p>
        <blockquote style="border-left:3px solid #6c63ff; margin:16px 0; padding:14px 20px;
          background:rgba(108,99,255,0.08); border-radius:0 10px 10px 0; color:#6c63ff; font-style:italic; font-size:14px; line-height:1.8;">
          "${message}"
        </blockquote>
        <hr class="divider"/>
        <p>In the meantime, feel free to explore:</p>
        <p>
          🔗 <a href="${process.env.PORTFOLIO_URL || 'https://github.com/sohinisharma'}">My GitHub</a> &nbsp;|&nbsp;
          🔗 <a href="https://www.linkedin.com/in/sohini-sharma-2967ba271/">LinkedIn Profile</a>
        </p>
        <p>Talk soon! 🚀</p>
        <p><strong>Sohini Sharma</strong><br/>
        <span style="color:#6c63ff; font-size:13px;">Frontend Developer</span></p>
      </div>
    </div></body></html>`,
  };
}

/**
 * Send both emails independently — one failure never blocks the other.
 * Returns { notifySent, replySent, errors }
 */
async function sendContactEmail({ name, email, message }) {
  const results = { notifySent: false, replySent: false, errors: [] };

  // Send notification to developer
  try {
    await transporter.sendMail(buildNotificationEmail({ name, email, message }));
    results.notifySent = true;
    console.log(`📧 Notification sent → ${process.env.CONTACT_RECEIVER}`);
  } catch (err) {
    results.errors.push(`Notification failed: ${err.message}`);
    console.error('⚠️  Notification email error:', err.message);
  }

  // Send auto-reply to visitor
  try {
    await transporter.sendMail(buildAutoReplyEmail({ name, email, message }));
    results.replySent = true;
    console.log(`📧 Auto-reply sent → ${email}`);
  } catch (err) {
    results.errors.push(`Auto-reply failed: ${err.message}`);
    console.error('⚠️  Auto-reply email error:', err.message);
  }

  return results;
}

module.exports = { sendContactEmail };
