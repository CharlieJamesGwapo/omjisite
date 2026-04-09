const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://omjisolutions.vercel.app',
  /\.vercel\.app$/,
]
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)
    const ok = allowedOrigins.some(o => typeof o === 'string' ? o === origin : o.test(origin))
    cb(ok ? null : new Error('CORS blocked'), ok)
  },
  credentials: true
}))
app.use(express.json());

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/certifications', require('./routes/certifications'));

// Static file serving only when client/dist exists (local full-stack mode)
const clientDist = path.join(__dirname, '../client/dist')
const fs = require('fs')
if (process.env.NODE_ENV === 'production' && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist))
  app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')))
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
