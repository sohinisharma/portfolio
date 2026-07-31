require('dotenv').config();

const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const Contact  = require('./models/Contact');
const { sendContactEmail } = require('./services/emailService');

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());

// ── MongoDB — cached connection (required for Vercel serverless)
let cachedDb = null;

async function connectDB() {
  if (cachedDb && mongoose.connection.readyState === 1) return cachedDb;
  try {
    cachedDb = await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
    return cachedDb;
  } catch (err) {
    console.error('⚠️  MongoDB unavailable:', err.message);
    return null;
  }
}

// ── Static data ───────────────────────────────────────────────
const profile    = require('./data/profile.json');
const skills     = require('./data/skills.json');
const projects   = require('./data/projects.json');
const education  = require('./data/education.json');
const experience = require('./data/experience.json');

// ── Routes ────────────────────────────────────────────────────
app.get('/', async (req, res) => {
  const db = await connectDB();
  res.json({
    message: 'Sohini Sharma — Portfolio API v2',
    status:  'running',
    db:      db ? 'connected' : 'disconnected',
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

  // Server-side validation
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
    const db = await connectDB();
    if (db) {
      try {
        const contact = await Contact.create({ name: n, email: e, message: m });
        console.log('💾 Saved to MongoDB:', contact._id);
      } catch (dbErr) {
        console.error('⚠️  DB save failed (non-fatal):', dbErr.message);
      }
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

// ── Admin: view all messages ──────────────────────────────────
app.get('/api/messages', async (req, res) => {
  const db = await connectDB();
  if (!db) return res.json({ success: false, error: 'Database not connected.' });
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

// ── Export for Vercel (don't call app.listen in serverless) ───
// Local dev: only listen when running directly (not imported by Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  });
}

module.exports = app;
