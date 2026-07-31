require('dotenv').config();

const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const Contact  = require('./models/Contact');
const { sendContactEmail } = require('./services/emailService');

const app  = express();
const PORT = process.env.PORT || 5001;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── MongoDB Connection ────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// ── Static data ───────────────────────────────────────────────
const profile    = require('./data/profile.json');
const skills     = require('./data/skills.json');
const projects   = require('./data/projects.json');
const education  = require('./data/education.json');
const experience = require('./data/experience.json');

// ── Routes ────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Sohini Sharma — Portfolio API v2', status: 'running' });
});

app.get('/api/profile',    (req, res) => res.json({ success: true, data: profile }));
app.get('/api/skills',     (req, res) => res.json({ success: true, data: skills }));
app.get('/api/projects',   (req, res) => res.json({ success: true, data: projects }));
app.get('/api/education',  (req, res) => res.json({ success: true, data: education }));
app.get('/api/experience', (req, res) => res.json({ success: true, data: experience }));

// ── Contact Form ──────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  try {
    // 1️⃣  Save to MongoDB
    const contact = await Contact.create({ name, email, message });
    console.log('💾 Saved to MongoDB:', contact._id);

    // 2️⃣  Send emails (notification + auto-reply) — non-blocking
    sendContactEmail({ name, email, message })
      .then(() => console.log(`📧 Emails sent — to: ${process.env.CONTACT_RECEIVER}, reply-to: ${email}`))
      .catch((err) => console.error('⚠️  Email error (non-fatal):', err.message));

    // 3️⃣  Respond immediately (don't wait for email)
    return res.status(201).json({
      success: true,
      message: 'Message received! I\'ll get back to you soon. 🚀',
    });
  } catch (err) {
    console.error('❌ Contact route error:', err.message);
    return res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
});

// ── Get all messages (optional admin route) ───────────────────
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
