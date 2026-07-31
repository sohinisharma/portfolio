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
let dbConnected = false;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    dbConnected = true;
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('⚠️  MongoDB unavailable:', err.message);
    console.log('ℹ️  Server will run without DB — messages will only be emailed.');
  });

// ── Static data ───────────────────────────────────────────────
const profile    = require('./data/profile.json');
const skills     = require('./data/skills.json');
const projects   = require('./data/projects.json');
const education  = require('./data/education.json');
const experience = require('./data/experience.json');

// ── Routes ────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Sohini Sharma — Portfolio API v2',
    status: 'running',
    db: dbConnected ? 'connected' : 'disconnected',
  });
});

app.get('/api/profile',    (req, res) => res.json({ success: true, data: profile }));
app.get('/api/skills',     (req, res) => res.json({ success: true, data: skills }));
app.get('/api/projects',   (req, res) => res.json({ success: true, data: projects }));
app.get('/api/education',  (req, res) => res.json({ success: true, data: education }));
app.get('/api/experience', (req, res) => res.json({ success: true, data: experience }));

// ── Contact Form ──────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // ── Server-side validation (mirrors frontend rules) ──────────
  const n = name?.trim();
  const e = email?.trim().toLowerCase();
  const m = message?.trim();

  if (!n || n.length < 2)
    return res.status(400).json({ success: false, error: 'Name must be at least 2 characters.' });
  if (!e || !EMAIL_REGEX.test(e))
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
  if (!m || m.length < 10)
    return res.status(400).json({ success: false, error: 'Message must be at least 10 characters.' });
  if (m.length > 2000)
    return res.status(400).json({ success: false, error: 'Message must be under 2000 characters.' });

  try {
    // 1️⃣  Save to MongoDB
    if (dbConnected) {
      try {
        const contact = await Contact.create({ name: n, email: e, message: m });
        console.log('💾 Saved to MongoDB:', contact._id);
      } catch (dbErr) {
        console.error('⚠️  DB save failed (non-fatal):', dbErr.message);
      }
    } else {
      console.log('⚠️  DB not connected — skipping save. Message from:', e);
    }

    // 2️⃣  Send both emails independently
    const emailResult = await sendContactEmail({ name: n, email: e, message: m });
    console.log('📧 Email results:', emailResult);

    // 3️⃣  Always respond success
    return res.status(201).json({
      success: true,
      message: "Message received! You'll get a confirmation email shortly. 🚀",
    });

  } catch (err) {
    console.error('❌ Contact route error:', err.message);
    return res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
});

// ── View all messages (admin) ─────────────────────────────────
app.get('/api/messages', async (req, res) => {
  if (!dbConnected) {
    return res.json({ success: false, error: 'Database not connected.' });
  }
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
