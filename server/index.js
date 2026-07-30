const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Load data (re-require picks up updated files after server restart)
const profile    = require('./data/profile.json');
const skills     = require('./data/skills.json');
const projects   = require('./data/projects.json');
const education  = require('./data/education.json');
const experience = require('./data/experience.json');

const messages = [];

// ── Routes ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Sohini Sharma — Portfolio API', version: '2.0.0' });
});

app.get('/api/profile',    (req, res) => res.json({ success: true, data: profile }));
app.get('/api/skills',     (req, res) => res.json({ success: true, data: skills }));
app.get('/api/projects',   (req, res) => res.json({ success: true, data: projects }));
app.get('/api/education',  (req, res) => res.json({ success: true, data: education }));
app.get('/api/experience', (req, res) => res.json({ success: true, data: experience }));

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  const newMessage = { id: messages.length + 1, name, email, message, receivedAt: new Date().toISOString() };
  messages.push(newMessage);
  console.log('📬 New contact message:', newMessage);
  res.status(201).json({ success: true, message: 'Message received! Thank you for reaching out.' });
});

app.use((req, res) => res.status(404).json({ success: false, error: 'Route not found' }));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
