# OMji Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-stack React + Node.js + MongoDB website for OMji Software Development showcasing services, projects, WiFi vendo system, tech stack, certifications, testimonials, and admin CMS.

**Architecture:** Single-page React app (Vite + Tailwind + Framer Motion) with Node.js/Express REST API backend and MongoDB database. Admin panel at /admin route with JWT auth. All content (projects, testimonials, certifications) managed dynamically via API.

**Tech Stack:** React 18, Vite, Tailwind CSS, Framer Motion, Swiper.js, Node.js, Express, MongoDB, Mongoose, JWT, Multer, Nodemailer, bcrypt

---

## File Structure

```
omjisite/
├── client/
│   ├── public/
│   │   └── assets/
│   │       ├── legoo.jpeg          (copy from root)
│   │       ├── school1.png         (copy from root)
│   │       ├── school2.png
│   │       ├── school3.png
│   │       ├── school5.png
│   │       ├── billing.png
│   │       ├── billing1.png
│   │       ├── billing2.png
│   │       ├── oneride.png
│   │       ├── oneride1.png
│   │       └── oneride3.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Problems.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── WhyChoose.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── TechStack.jsx
│   │   │   ├── VendoSystem.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── admin/
│   │   │   ├── ProjectsManager.jsx
│   │   │   ├── ContactMessages.jsx
│   │   │   ├── TestimonialsManager.jsx
│   │   │   └── CertificationsManager.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── models/
│   │   ├── Project.js
│   │   ├── Contact.js
│   │   ├── Testimonial.js
│   │   ├── Certification.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── contact.js
│   │   ├── testimonials.js
│   │   └── certifications.js
│   ├── middleware/
│   │   └── auth.js
│   ├── seeds/
│   │   └── seed.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
└── package.json (root - concurrently scripts)
```

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json` (root)
- Create: `client/package.json`
- Create: `client/vite.config.js`
- Create: `client/tailwind.config.js`
- Create: `client/postcss.config.js`
- Create: `client/index.html`
- Create: `client/src/main.jsx`
- Create: `client/src/App.jsx`
- Create: `client/src/index.css`
- Create: `server/package.json`
- Create: `server/server.js`
- Create: `server/config/db.js`
- Create: `.gitignore`

- [ ] **Step 1: Initialize root package.json**

```bash
cd /Users/dev3/omjisite
npm init -y
```

Then replace `package.json` with:

```json
{
  "name": "omjisite",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd server && npm run dev",
    "client": "cd client && npm run dev",
    "build": "cd client && npm run build",
    "seed": "cd server && node seeds/seed.js"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

- [ ] **Step 2: Create client with Vite + React**

```bash
cd /Users/dev3/omjisite
npm create vite@latest client -- --template react
cd client
npm install
npm install tailwindcss @tailwindcss/vite framer-motion react-router-dom react-icons swiper axios
```

- [ ] **Step 3: Configure Vite with Tailwind and API proxy**

Replace `client/vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000'
    }
  }
})
```

- [ ] **Step 4: Configure Tailwind with OMji theme colors**

Replace `client/src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-navy: #0a0e1a;
  --color-navy-light: #0d1117;
  --color-card: #161b22;
  --color-border: #21262d;
  --color-cyan: #0ea5e9;
  --color-purple: #6366f1;
  --color-silver: #c0c8d8;
  --color-muted: #8b95a5;
  --color-success: #10b981;
  --color-warning: #f59e0b;
}

@layer base {
  body {
    @apply bg-navy text-white font-sans;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .gradient-text {
    @apply bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent;
  }

  .gradient-btn {
    @apply bg-gradient-to-r from-cyan to-purple text-white font-bold py-3 px-8 rounded-lg
           hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-cyan/25;
  }

  .outline-btn {
    @apply border border-cyan text-cyan font-bold py-3 px-8 rounded-lg
           hover:bg-cyan/10 transition-all duration-300;
  }

  .card {
    @apply bg-card border border-border rounded-xl;
  }

  .section-label {
    @apply text-cyan text-sm uppercase tracking-[3px] font-bold;
  }

  .section-title {
    @apply text-3xl md:text-4xl font-bold mt-2 mb-6;
  }

  .tech-tag {
    @apply bg-navy-light px-3 py-1 rounded-md text-sm text-silver;
  }
}

/* Circuit board background pattern */
.circuit-bg {
  background-image:
    repeating-linear-gradient(90deg, rgba(14,165,233,0.03) 0px, transparent 1px, transparent 40px),
    repeating-linear-gradient(0deg, rgba(14,165,233,0.03) 0px, transparent 1px, transparent 40px);
}
```

- [ ] **Step 5: Create minimal App.jsx with router**

Replace `client/src/App.jsx`:

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
```

Replace `client/src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Step 6: Create placeholder Home page**

Create `client/src/pages/Home.jsx`:

```jsx
export default function Home() {
  return (
    <div className="min-h-screen bg-navy text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold gradient-text">OMji Website - Coming Soon</h1>
    </div>
  )
}
```

- [ ] **Step 7: Setup server with Express + MongoDB**

```bash
cd /Users/dev3/omjisite
mkdir -p server/models server/routes server/middleware server/seeds server/uploads
```

Create `server/package.json`:

```json
{
  "name": "omji-server",
  "version": "1.0.0",
  "scripts": {
    "dev": "node --watch server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.14"
  }
}
```

Create `server/server.js`:

```js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/omjisite'

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/testimonials', require('./routes/testimonials'))
app.use('/api/certifications', require('./routes/certifications'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
```

- [ ] **Step 8: Install server dependencies**

```bash
cd /Users/dev3/omjisite/server
npm install
cd /Users/dev3/omjisite
npm install
```

- [ ] **Step 9: Create .gitignore**

Create `/Users/dev3/omjisite/.gitignore`:

```
node_modules/
client/node_modules/
server/node_modules/
client/dist/
server/uploads/*
!server/uploads/.gitkeep
.env
.DS_Store
.superpowers/
```

- [ ] **Step 10: Copy project images to client/public/assets**

```bash
mkdir -p /Users/dev3/omjisite/client/public/assets
cp /Users/dev3/omjisite/legoo.jpeg /Users/dev3/omjisite/client/public/assets/
cp /Users/dev3/omjisite/school*.png /Users/dev3/omjisite/client/public/assets/
cp /Users/dev3/omjisite/billing*.png /Users/dev3/omjisite/client/public/assets/
cp /Users/dev3/omjisite/oneride*.png /Users/dev3/omjisite/client/public/assets/
touch /Users/dev3/omjisite/server/uploads/.gitkeep
```

- [ ] **Step 11: Verify frontend runs**

```bash
cd /Users/dev3/omjisite/client
npm run dev
```

Expected: Vite dev server on port 3000, shows "OMji Website - Coming Soon" with gradient text.

- [ ] **Step 12: Initialize git and commit**

```bash
cd /Users/dev3/omjisite
git init
git add -A
git commit -m "feat: initial project scaffolding - React + Vite + Tailwind + Express + MongoDB"
```

---

### Task 2: MongoDB Models & Auth Middleware

**Files:**
- Create: `server/models/User.js`
- Create: `server/models/Project.js`
- Create: `server/models/Contact.js`
- Create: `server/models/Testimonial.js`
- Create: `server/models/Certification.js`
- Create: `server/middleware/auth.js`
- Create: `server/routes/auth.js`

- [ ] **Step 1: Create User model**

Create `server/models/User.js`:

```js
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
```

- [ ] **Step 2: Create Project model**

Create `server/models/Project.js`:

```js
const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  category: { type: String, enum: ['webapp', 'mobile', 'system'], default: 'webapp' },
  description: { type: String, required: true },
  techTags: [String],
  gradientFrom: { type: String, default: '#0ea5e9' },
  gradientTo: { type: String, default: '#6366f1' },
  demoUrl: String,
  repoUrl: String,
  screenshots: [String],
  featured: { type: Boolean, default: false },
  urlBadge: String,
  order: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)
```

- [ ] **Step 3: Create Contact model**

Create `server/models/Contact.js`:

```js
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('Contact', contactSchema)
```

- [ ] **Step 4: Create Testimonial model**

Create `server/models/Testimonial.js`:

```js
const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  company: String,
  quote: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  order: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Testimonial', testimonialSchema)
```

- [ ] **Step 5: Create Certification model**

Create `server/models/Certification.js`:

```js
const mongoose = require('mongoose')

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  type: { type: String, enum: ['completion', 'recognition', 'participation'], default: 'completion' },
  order: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Certification', certificationSchema)
```

- [ ] **Step 6: Create auth middleware**

Create `server/middleware/auth.js`:

```js
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'omji-secret-key-change-in-production'

function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Access denied' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = { auth, JWT_SECRET }
```

- [ ] **Step 7: Create auth route**

Create `server/routes/auth.js`:

```js
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { JWT_SECRET } = require('../middleware/auth')

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, username: user.username })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
```

- [ ] **Step 8: Commit**

```bash
cd /Users/dev3/omjisite
git add server/models server/middleware server/routes/auth.js
git commit -m "feat: add MongoDB models and JWT auth middleware"
```

---

### Task 3: API Routes (Projects, Contact, Testimonials, Certifications)

**Files:**
- Create: `server/routes/projects.js`
- Create: `server/routes/contact.js`
- Create: `server/routes/testimonials.js`
- Create: `server/routes/certifications.js`

- [ ] **Step 1: Create projects route**

Create `server/routes/projects.js`:

```js
const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const Project = require('../models/Project')
const { auth } = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, upload.array('screenshots', 5), async (req, res) => {
  try {
    const data = { ...req.body }
    if (req.body.techTags) data.techTags = JSON.parse(req.body.techTags)
    if (req.files) data.screenshots = req.files.map(f => '/uploads/' + f.filename)
    const project = await Project.create(data)
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', auth, upload.array('screenshots', 5), async (req, res) => {
  try {
    const data = { ...req.body }
    if (req.body.techTags) data.techTags = JSON.parse(req.body.techTags)
    if (req.files && req.files.length > 0) {
      data.screenshots = req.files.map(f => '/uploads/' + f.filename)
    }
    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
```

- [ ] **Step 2: Create contact route**

Create `server/routes/contact.js`:

```js
const router = require('express').Router()
const Contact = require('../models/Contact')
const { auth } = require('../middleware/auth')

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' })
    }
    const contact = await Contact.create({ name, email, subject, message })
    res.status(201).json({ message: 'Message sent successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id/read', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    res.json(contact)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ message: 'Message deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
```

- [ ] **Step 3: Create testimonials route**

Create `server/routes/testimonials.js`:

```js
const router = require('express').Router()
const Testimonial = require('../models/Testimonial')
const { auth } = require('../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 })
    res.json(testimonials)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body)
    res.status(201).json(testimonial)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(testimonial)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ message: 'Testimonial deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
```

- [ ] **Step 4: Create certifications route**

Create `server/routes/certifications.js`:

```js
const router = require('express').Router()
const Certification = require('../models/Certification')
const { auth } = require('../middleware/auth')

router.get('/', async (req, res) => {
  try {
    const certs = await Certification.find().sort({ order: 1 })
    res.json(certs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const cert = await Certification.create(req.body)
    res.status(201).json(cert)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(cert)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id)
    res.json({ message: 'Certification deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
```

- [ ] **Step 5: Commit**

```bash
cd /Users/dev3/omjisite
git add server/routes/
git commit -m "feat: add CRUD API routes for projects, contact, testimonials, certifications"
```

---

### Task 4: Database Seed Script

**Files:**
- Create: `server/seeds/seed.js`

- [ ] **Step 1: Create seed script with all initial data**

Create `server/seeds/seed.js`:

```js
const mongoose = require('mongoose')
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })

const User = require('../models/User')
const Project = require('../models/Project')
const Testimonial = require('../models/Testimonial')
const Certification = require('../models/Certification')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/omjisite'

const projects = [
  {
    title: 'SJBHS Smart Access',
    subtitle: 'Full Stack App',
    category: 'system',
    description: 'RFID attendance system with parent/teacher mobile apps, real-time push notifications, and admin dashboard for St. John Baptist High School.',
    techTags: ['React', 'Node.js', 'RFID', 'Mobile', 'Push Notifications'],
    gradientFrom: '#1e3a8a',
    gradientTo: '#3b82f6',
    demoUrl: '#',
    screenshots: ['/assets/school5.png', '/assets/school1.png', '/assets/school2.png', '/assets/school3.png'],
    featured: true,
    urlBadge: 'sjbhs-attendance.app',
    order: 1
  },
  {
    title: 'OMji Billing System',
    subtitle: 'Internet & Billing',
    category: 'system',
    description: 'Complete billing dashboard with MikroTik integration, subscription management, payments, SMS notifications, and reporting.',
    techTags: ['React', 'Node.js', 'MikroTik', 'MongoDB', 'SMS'],
    gradientFrom: '#0f172a',
    gradientTo: '#0ea5e9',
    demoUrl: '#',
    screenshots: ['/assets/billing.png', '/assets/billing1.png', '/assets/billing2.png'],
    featured: true,
    urlBadge: 'omji-billing.app',
    order: 2
  },
  {
    title: 'One Ride Balingasag',
    subtitle: 'Mobile App',
    category: 'mobile',
    description: 'All-in-one ride, delivery & food app. Pasugo, Pasundo, Pasabay — serving Balingasag & Salay community.',
    techTags: ['React Native', 'Node.js', 'Maps API', 'Real-time'],
    gradientFrom: '#7c2d12',
    gradientTo: '#ea580c',
    demoUrl: '#',
    screenshots: ['/assets/oneride.png', '/assets/oneride1.png', '/assets/oneride3.png'],
    featured: true,
    urlBadge: 'oneride-balingasag.app',
    order: 3
  },
  {
    title: 'G2 POS System',
    subtitle: 'Full Stack App',
    category: 'webapp',
    description: 'Complete point-of-sale system with sales tracking, inventory management, order processing, and reporting dashboard.',
    techTags: ['Go (Golang)', 'Next.js', 'PostgreSQL', 'Docker'],
    gradientFrom: '#4338ca',
    gradientTo: '#7c3aed',
    demoUrl: 'https://g2possystem.vercel.app/landing',
    featured: true,
    urlBadge: 'g2possystem.vercel.app',
    order: 4
  },
  {
    title: 'E-Cycle Hub',
    subtitle: 'Full Stack App',
    category: 'webapp',
    description: 'Waste management and recycling platform with user registration, waste categorization, collection scheduling, and RESTful APIs.',
    techTags: ['Go (Golang)', 'Next.js', 'NeonDB (PostgreSQL)'],
    gradientFrom: '#065f46',
    gradientTo: '#10b981',
    demoUrl: 'https://ecyclehub.vercel.app',
    featured: true,
    urlBadge: 'ecyclehub.vercel.app',
    order: 5
  },
  {
    title: 'ReflectiCSS',
    subtitle: 'Developer Tool',
    category: 'webapp',
    description: 'CSS utility and reflection tool for developers. Interactive interface for exploring and generating CSS styles efficiently.',
    techTags: ['React', 'CSS3', 'JavaScript'],
    gradientFrom: '#be185d',
    gradientTo: '#ec4899',
    demoUrl: 'https://reflecticss.vercel.app',
    urlBadge: 'reflecticss.vercel.app',
    order: 6
  },
  {
    title: 'Study Pulse',
    subtitle: 'Web App',
    category: 'webapp',
    description: 'Study management application helping students track their learning progress, organize study sessions, and monitor performance.',
    techTags: ['React', 'Tailwind CSS', 'JavaScript'],
    gradientFrom: '#0e7490',
    gradientTo: '#06b6d4',
    demoUrl: 'https://study-pulse-ten.vercel.app',
    urlBadge: 'study-pulse-ten.vercel.app',
    order: 7
  }
]

const testimonials = [
  {
    clientName: 'SJBHS Administration',
    company: 'St. John Baptist High School',
    quote: 'OMji delivered our school\'s RFID attendance system on time and within budget. The parent app is very user-friendly and the push notifications work perfectly. The whole system transformed how we manage attendance. Highly recommended!',
    rating: 5,
    order: 1
  },
  {
    clientName: 'ISP Business Owner',
    company: 'Billing System Client',
    quote: 'The OMji Billing System transformed how we manage our internet business. MikroTik integration works seamlessly, the dashboard is clean and easy to use, and our customers love the automated SMS notifications.',
    rating: 5,
    order: 2
  },
  {
    clientName: 'Community User',
    company: 'One Ride Balingasag',
    quote: 'One Ride has been a game-changer for our community in Balingasag. Easy to use for both riders and customers. The delivery and food ordering features are very convenient. Great app!',
    rating: 5,
    order: 3
  }
]

const certifications = [
  { title: 'Databases with SQL', issuer: 'CS50 (Harvard)', type: 'completion', order: 1 },
  { title: 'Windows Server 2012 Training', issuer: 'ITFreeTraining', type: 'completion', order: 2 },
  { title: 'Active Directory', issuer: 'ITFreeTraining', type: 'completion', order: 3 },
  { title: 'AD DS Domain Controllers & FSMO Roles', issuer: 'Microsoft', type: 'completion', order: 4 },
  { title: 'Dean\'s Lister (2nd & 3rd Year) - Ranked 2', issuer: 'MOIST', type: 'recognition', order: 5 },
  { title: 'TOPCIT (Test of Practical Competency in IT)', issuer: 'TOPCIT', type: 'participation', order: 6 },
  { title: 'MongoDB Database Training', issuer: 'MongoDB', type: 'completion', order: 7 },
  { title: 'PHP for Web Development', issuer: 'CodeMy', type: 'completion', order: 8 },
  { title: 'JavaScript Programming', issuer: 'Bro Code', type: 'completion', order: 9 },
  { title: 'HTML and CSS', issuer: 'Telugu', type: 'completion', order: 10 }
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')

    await User.deleteMany({})
    await Project.deleteMany({})
    await Testimonial.deleteMany({})
    await Certification.deleteMany({})

    await User.create({ username: 'admin', password: 'omji2024' })
    console.log('Admin user created (admin / omji2024)')

    await Project.insertMany(projects)
    console.log(`${projects.length} projects seeded`)

    await Testimonial.insertMany(testimonials)
    console.log(`${testimonials.length} testimonials seeded`)

    await Certification.insertMany(certifications)
    console.log(`${certifications.length} certifications seeded`)

    console.log('Seed complete!')
    process.exit(0)
  } catch (err) {
    console.error('Seed error:', err)
    process.exit(1)
  }
}

seed()
```

- [ ] **Step 2: Run seed (requires MongoDB running)**

```bash
cd /Users/dev3/omjisite
npm run seed
```

Expected: All data seeded, admin user created.

- [ ] **Step 3: Commit**

```bash
git add server/seeds/
git commit -m "feat: add database seed script with projects, testimonials, certifications"
```

---

### Task 5: Frontend - Navbar Component

**Files:**
- Create: `client/src/components/Navbar.jsx`

- [ ] **Step 1: Create Navbar with mobile hamburger**

Create `client/src/components/Navbar.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Tech Stack', href: '#techstack' },
  { name: 'Vendo System', href: '#vendo' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Certifications', href: '#certifications' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img src="/assets/legoo.jpeg" alt="OMji" className="w-10 h-10 rounded-full" />
            <span className="text-xl font-bold">OMji</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted hover:text-cyan transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="gradient-btn !py-2 !px-6 text-sm">Contact Us</a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-navy-light/95 backdrop-blur-md border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="block text-muted hover:text-cyan transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="block gradient-btn text-center !py-2 mt-4"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/Navbar.jsx
git commit -m "feat: add responsive Navbar with mobile hamburger menu"
```

---

### Task 6: Frontend - Hero Section

**Files:**
- Create: `client/src/components/Hero.jsx`

- [ ] **Step 1: Create Hero with animated background and stats**

Create `client/src/components/Hero.jsx`:

```jsx
import { motion } from 'framer-motion'

const stats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '500+', label: 'Users Served' },
  { value: '99.9%', label: 'System Uptime' },
  { value: '24/7', label: 'Support' },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center circuit-bg overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label mb-4">Software Development Company</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              We Build{' '}
              <span className="gradient-text">Digital Solutions</span>
            </h1>
            <h2 className="text-xl sm:text-2xl text-muted font-normal mb-6">
              That Power Your Business Forward
            </h2>
            <p className="text-muted max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              From custom websites and mobile apps to WiFi vendo systems — OMji delivers
              top-quality software solutions that help businesses grow and thrive in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#projects" className="gradient-btn text-center">View Our Projects</a>
              <a href="#contact" className="outline-btn text-center">Get a Quote</a>
            </div>
          </motion.div>

          {/* Right - Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-purple/20 rounded-full blur-2xl scale-110" />
              <img
                src="/assets/legoo.jpeg"
                alt="OMji Software Development"
                className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border-2 border-cyan/30 shadow-2xl shadow-cyan/10"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12 mt-16 pt-8 border-t border-cyan/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className={`text-3xl sm:text-4xl font-bold ${i % 2 === 0 ? 'text-cyan' : 'text-purple'}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/Hero.jsx
git commit -m "feat: add Hero section with animations and stats"
```

---

### Task 7: Frontend - About, Problems, Services, WhyChoose Components

**Files:**
- Create: `client/src/components/About.jsx`
- Create: `client/src/components/Problems.jsx`
- Create: `client/src/components/Services.jsx`
- Create: `client/src/components/WhyChoose.jsx`

- [ ] **Step 1: Create About component**

Create `client/src/components/About.jsx`:

```jsx
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Who We Are</p>
            <h2 className="section-title">
              About <span className="text-cyan">OMji</span>
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              OMji is a software development company founded in 2018, specializing in building
              high-quality digital solutions for businesses and communities. From our roots in
              WiFi vendo systems to full-stack web and mobile development, we've grown into a
              trusted technology partner.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              We believe in delivering top-quality products at accessible prices. Our team combines
              cutting-edge technology with deep understanding of local business needs — whether it's
              building school management systems, billing platforms, ride-sharing apps, or custom
              software solutions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card p-5">
                <h4 className="text-cyan font-bold mb-2">Our Mission</h4>
                <p className="text-sm text-muted">To empower businesses with affordable, top-quality software solutions that drive growth and efficiency.</p>
              </div>
              <div className="card p-5" style={{ borderColor: 'rgba(99,102,241,0.3)' }}>
                <h4 className="text-purple font-bold mb-2">Our Vision</h4>
                <p className="text-sm text-muted">To be the leading software development partner in the Philippines, known for innovation and reliability.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/assets/legoo.jpeg"
              alt="OMji"
              className="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl border border-cyan/20 shadow-xl shadow-cyan/5"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create Problems component (Rooche-style)**

Create `client/src/components/Problems.jsx`:

```jsx
import { motion } from 'framer-motion'
import { HiSpeakerphone, HiTrendingUp, HiColorSwatch, HiDesktopComputer } from 'react-icons/hi'

const problems = [
  {
    icon: HiSpeakerphone,
    title: 'Low Brand Awareness',
    description: 'Increase your brand awareness and get more word-of-mouth recommendations from satisfied customers with higher lifetime values.'
  },
  {
    icon: HiTrendingUp,
    title: 'Poor Conversion Score',
    description: 'Revamp your digital presence and give your business a more competent website and systems that can boost your growth.'
  },
  {
    icon: HiColorSwatch,
    title: 'Low-Quality Design & UX',
    description: 'Customize your layout, colors, and design that tells a story about your brand — attract and compel customers to come back.'
  },
  {
    icon: HiDesktopComputer,
    title: 'Outdated Systems',
    description: 'Update your site and apps to a modern look and features. Build easy-to-use systems perfectly aligned with your business.'
  }
]

export default function Problems() {
  return (
    <section className="py-20 bg-gradient-to-br from-cyan to-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/80 text-sm uppercase tracking-[3px] font-bold mb-2">We Get It...</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Problems to be solved</h2>
          <p className="text-white/80 max-w-2xl text-lg leading-relaxed mb-12">
            Do you wish you had more time to focus on the success of your business?
            Do you feel like you could be doing more to grow if you weren't so busy
            worrying about how to keep up with everything?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-cyan" />
              </div>
              <h4 className="text-navy font-black uppercase text-sm mb-3">{problem.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create Services component**

Create `client/src/components/Services.jsx`:

```jsx
import { motion } from 'framer-motion'
import { HiGlobe, HiDeviceMobile, HiPencilAlt, HiTemplate, HiCode, HiSparkles, HiClipboardList, HiWifi } from 'react-icons/hi'

const services = [
  { icon: HiGlobe, title: 'Website Development', description: 'Custom websites built with modern frameworks', color: 'from-cyan to-sky-600' },
  { icon: HiCode, title: 'Game Development', description: 'Interactive games and gamified applications', color: 'from-purple to-indigo-600' },
  { icon: HiPencilAlt, title: 'Graphic Design', description: 'Branding, logos, marketing materials', color: 'from-pink-500 to-rose-600' },
  { icon: HiDeviceMobile, title: 'Mobile App Dev', description: 'iOS & Android apps with React Native', color: 'from-success to-emerald-600' },
  { icon: HiTemplate, title: 'UI/UX Design', description: 'User-centered interface design', color: 'from-warning to-amber-600' },
  { icon: HiSparkles, title: 'Branding', description: 'Complete brand identity packages', color: 'from-violet-500 to-purple' },
  { icon: HiClipboardList, title: 'Project Management', description: 'End-to-end project delivery', color: 'from-teal-500 to-teal-600' },
  { icon: HiWifi, title: 'OMji Vendo System', description: 'Top quality WiFi hotspot vendo', color: 'from-cyan to-purple', highlight: true },
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">All-in-One Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className={`card p-6 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-lg hover:shadow-cyan/5 ${
                service.highlight ? 'border-cyan/30 bg-gradient-to-br from-cyan/5 to-purple/5' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className={`font-bold text-sm mb-2 ${service.highlight ? 'text-cyan' : ''}`}>{service.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create WhyChoose component (Rooche-style)**

Create `client/src/components/WhyChoose.jsx`:

```jsx
import { motion } from 'framer-motion'
import { HiBell, HiLightningBolt, HiRocketLaunch } from 'react-icons/hi'

const features = [
  {
    icon: '🔔',
    title: 'Fast solutions for your long-term success',
    description: 'We are a software development company that offers fast solutions for your long-term success. With our plans, creativity, and dedication, we take your business to the next level. Our systems are designed to get results, increase efficiency, and maximize your ROI.',
    color: 'text-cyan'
  },
  {
    icon: '🎯',
    title: 'An interface design tailored for you',
    description: 'OMji developers love challenges! We create professional, user-friendly interfaces tailored for your brand. From school systems to ride-sharing apps — we make it work beautifully on every device.',
    color: 'text-purple'
  },
  {
    icon: '🚀',
    title: 'The breakthrough of design and development',
    description: 'OMji makes software development hassle-free, quick, and affordable but ensures exceptional output every time. From vendo systems to full-stack applications — that\'s what makes us the best partner for your digital needs.',
    color: 'text-success'
  }
]

export default function WhyChoose() {
  return (
    <section className="py-20 bg-gradient-to-b from-navy to-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Phone Mockups */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 sm:w-80">
              {/* Phone 1 */}
              <div className="w-44 h-80 bg-navy border-2 border-cyan/30 rounded-3xl p-2 relative z-10 shadow-xl shadow-cyan/10">
                <div className="bg-navy-light rounded-2xl h-full overflow-hidden">
                  <img src="/assets/billing.png" alt="OMji Billing" className="w-full h-full object-cover rounded-2xl" />
                </div>
              </div>
              {/* Phone 2 */}
              <div className="w-44 h-80 bg-navy border-2 border-purple/30 rounded-3xl p-2 absolute top-8 left-28 z-0 shadow-xl shadow-purple/10">
                <div className="bg-navy-light rounded-2xl h-full overflow-hidden">
                  <img src="/assets/oneride.png" alt="One Ride" className="w-full h-full object-cover rounded-2xl" />
                </div>
              </div>
              {/* Floating dots */}
              <div className="absolute -top-4 right-8 w-4 h-4 bg-warning rounded-full" />
              <div className="absolute bottom-12 -left-4 w-3 h-3 bg-cyan rounded-full" />
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label mb-2">We've been working hard to give you an unbeatable offer</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-10 leading-tight">
              Get even better deals on your{' '}
              <span className="gradient-text">design and development</span> needs
            </h2>

            <div className="space-y-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-card rounded-xl flex items-center justify-center text-2xl border border-border">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold mb-2 ${feature.color}`}>{feature.title}</h4>
                    <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add client/src/components/About.jsx client/src/components/Problems.jsx client/src/components/Services.jsx client/src/components/WhyChoose.jsx
git commit -m "feat: add About, Problems, Services, WhyChoose sections"
```

---

### Task 8: Frontend - Projects Component

**Files:**
- Create: `client/src/components/Projects.jsx`

- [ ] **Step 1: Create Projects with filter tabs and gradient cards**

Create `client/src/components/Projects.jsx`:

```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiExternalLink, HiLink } from 'react-icons/hi'
import axios from 'axios'

const filters = ['All', 'Web Apps', 'Mobile', 'Systems']
const filterMap = { 'All': null, 'Web Apps': 'webapp', 'Mobile': 'mobile', 'Systems': 'system' }

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    axios.get('/api/projects').then(res => setProjects(res.data)).catch(() => {})
  }, [])

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === filterMap[activeFilter])

  return (
    <section id="projects" className="py-20 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">Our Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-muted">Websites, apps, and systems we've built</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeFilter === filter
                  ? 'gradient-btn !py-2 !px-5'
                  : 'bg-card border border-border text-muted hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => (
              <motion.div
                key={project._id || project.title}
                className="card overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-cyan/5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                {/* Gradient Header */}
                <div
                  className="p-5 relative"
                  style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
                >
                  {project.urlBadge && (
                    <span className="inline-block text-xs bg-black/30 px-3 py-1 rounded-full mb-2">
                      {project.urlBadge}
                    </span>
                  )}
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs opacity-80">{project.subtitle}</span>
                    {project.featured && (
                      <span className="text-xs bg-warning text-black px-2 py-0.5 rounded font-bold">Featured</span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="text-muted text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techTags?.map(tag => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.demoUrl && project.demoUrl !== '#' ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 gradient-btn !py-2 text-center text-sm flex items-center justify-center gap-2"
                      >
                        <HiExternalLink /> Live Demo
                      </a>
                    ) : (
                      <div className="flex-1 bg-card border border-border text-muted text-center py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                        <HiLink /> Private / NDA
                      </div>
                    )}
                    <button className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted hover:text-cyan transition-colors">
                      <HiLink />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {[
            { value: `${projects.length}+`, label: 'Total Projects', color: 'text-cyan' },
            { value: `${projects.filter(p => p.demoUrl && p.demoUrl !== '#').length}+`, label: 'Live Websites', color: 'text-purple' },
            { value: `${projects.filter(p => p.category === 'mobile').length}+`, label: 'Mobile Apps', color: 'text-success' },
            { value: `${projects.filter(p => p.category === 'system').length}+`, label: 'Systems', color: 'text-warning' },
          ].map(stat => (
            <div key={stat.label} className="card px-8 py-4 text-center">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add client/src/components/Projects.jsx
git commit -m "feat: add Projects section with filter tabs and gradient cards"
```

---

### Task 9: Frontend - TechStack, VendoSystem, Testimonials, Certifications, Contact, Footer

**Files:**
- Create: `client/src/components/TechStack.jsx`
- Create: `client/src/components/VendoSystem.jsx`
- Create: `client/src/components/Testimonials.jsx`
- Create: `client/src/components/Certifications.jsx`
- Create: `client/src/components/Contact.jsx`
- Create: `client/src/components/Footer.jsx`

- [ ] **Step 1: Create TechStack component**

Create `client/src/components/TechStack.jsx`:

```jsx
import { motion } from 'framer-motion'

const categories = [
  {
    name: 'Frontend',
    icon: '⚡',
    color: 'from-cyan to-sky-600',
    tags: ['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Bootstrap', 'TypeScript', 'HTML5/CSS3']
  },
  {
    name: 'Backend',
    icon: '🔧',
    color: 'from-warning to-amber-600',
    tags: ['Go (Golang)', 'Node.js', 'C# / .NET', 'PHP Laravel', 'Python', 'REST API', 'JWT/OAuth']
  },
  {
    name: 'Databases',
    icon: '🗄️',
    color: 'from-success to-emerald-600',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firebase', 'NeonDB']
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    color: 'from-purple to-indigo-600',
    tags: ['AWS Lambda', 'Docker', 'Git & GitHub', 'Vercel', 'CI/CD', 'Windows Server']
  },
  {
    name: 'Mobile',
    icon: '📱',
    color: 'from-pink-500 to-rose-600',
    tags: ['React Native', 'Android Studio', 'Mobile UI/UX', 'API Integration']
  },
  {
    name: 'Tools & Practices',
    icon: '🛠️',
    color: 'from-teal-500 to-teal-600',
    tags: ['VS Code', 'Figma', 'Agile/Scrum', 'Clean Code', 'RBAC']
  }
]

export default function TechStack() {
  return (
    <section id="techstack" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">Technologies We Use</p>
          <h2 className="section-title">Skills & Tech Stack</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="card p-6 hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.tags.map(tag => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create VendoSystem component**

Create `client/src/components/VendoSystem.jsx`:

```jsx
import { motion } from 'framer-motion'

export default function VendoSystem() {
  return (
    <section id="vendo" className="py-20 bg-gradient-to-b from-navy to-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-64 h-64 lg:w-72 lg:h-72 bg-cyan/5 border-2 border-cyan/20 rounded-2xl flex items-center justify-center">
              <img src="/assets/legoo.jpeg" alt="OMji Vendo" className="w-48 h-48 rounded-xl" />
            </div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label">Our Product</p>
            <h2 className="section-title">OMji Vendo System</h2>
            <p className="text-silver font-bold mb-2">Maker of Top Quality Hotspot Vendo</p>
            <p className="text-muted leading-relaxed mb-6">
              Need extra income? Let your internet pay for itself. Start earning by sharing your internet
              with our WiFi Vendo system. We provide the best vendo software at the lowest cost possible.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: 'VLAN', label: 'No USB2LAN needed', color: 'text-cyan' },
                { value: 'Remote', label: 'Management', color: 'text-purple' },
                { value: '24/7', label: 'Earning', color: 'text-success' },
              ].map(item => (
                <div key={item.value} className="card p-4 text-center">
                  <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-xs text-muted mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-warning/10 border border-warning/25 rounded-lg p-4 mb-6">
              <p className="text-warning text-sm">
                ⚠️ Beware of fake products! Buy only from our official OMji store or authorized distributors.
                Visit our official OMji Facebook page for more details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="gradient-btn text-center">Inquire Now</a>
              <a href="#" className="outline-btn text-center">Visit FB Page</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create Testimonials component with Swiper**

Create `client/src/components/Testimonials.jsx`:

```jsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi'
import axios from 'axios'
import 'swiper/css'
import 'swiper/css/navigation'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    axios.get('/api/testimonials').then(res => setTestimonials(res.data)).catch(() => {})
  }, [])

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-20 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="section-label">What Our Clients Say</p>
            <h2 className="section-title !mb-0">Love from our clients</h2>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button className="swiper-prev w-10 h-10 rounded-full border-2 border-cyan flex items-center justify-center text-cyan hover:bg-cyan/10 transition-colors">
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <button className="swiper-next w-10 h-10 rounded-full border-2 border-cyan flex items-center justify-center text-cyan hover:bg-cyan/10 transition-colors">
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{ prevEl: '.swiper-prev', nextEl: '.swiper-next' }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map(t => (
            <SwiperSlide key={t._id}>
              <div className="card p-6 h-full">
                <div className="flex gap-1 text-warning mb-4">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <HiStar key={i} className="w-5 h-5" />
                  ))}
                </div>
                <p className="text-silver text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-sm">{t.clientName}</p>
                  <p className="text-muted text-xs">{t.company}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create Certifications component**

Create `client/src/components/Certifications.jsx`:

```jsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const typeColors = {
  completion: 'text-success',
  recognition: 'text-warning',
  participation: 'text-cyan'
}

const typeLabels = {
  completion: 'Certified',
  recognition: 'Recognition',
  participation: 'Participation'
}

export default function Certifications() {
  const [certs, setCerts] = useState([])

  useEffect(() => {
    axios.get('/api/certifications').then(res => setCerts(res.data)).catch(() => {})
  }, [])

  if (certs.length === 0) return null

  return (
    <section id="certifications" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">Professional Growth</p>
          <h2 className="section-title">Certifications & Recognitions</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <motion.div
              key={cert._id}
              className="card p-4 flex gap-4 items-start hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${
                cert.type === 'recognition' ? 'from-warning to-amber-600' : 'from-cyan to-purple'
              } flex items-center justify-center flex-shrink-0 text-lg`}>
                {cert.type === 'recognition' ? '🏆' : cert.type === 'participation' ? '📋' : '🎓'}
              </div>
              <div>
                <h4 className="font-bold text-sm">{cert.title}</h4>
                <p className="text-muted text-xs">{cert.issuer}</p>
                <span className={`text-xs font-bold ${typeColors[cert.type]}`}>
                  {typeLabels[cert.type]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create Contact component**

Create `client/src/components/Contact.jsx`:

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
    setLoading(false)
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section id="contact" className="py-20 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label">Let's Talk</p>
            <h2 className="section-title">Get In Touch</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:border-cyan focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:border-cyan focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:border-cyan focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Tell us about your project..."
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:border-cyan focus:outline-none transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-btn disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <p className="text-success text-sm">Message sent successfully! We'll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-sm">Failed to send. Please try again or contact us directly.</p>
              )}
            </form>
          </motion.div>

          <motion.div
            className="lg:w-72"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4 mb-8">
              <p className="text-silver flex items-center gap-3">📞 09655343312</p>
              <p className="text-silver flex items-center gap-3">📘 Official OMji FB Page</p>
              <p className="text-silver flex items-center gap-3">📧 contact@omji.dev</p>
            </div>
            <div className="border-t border-border pt-6">
              <p className="text-muted text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 card flex items-center justify-center text-lg hover:border-cyan transition-colors">📘</a>
                <a href="#" className="w-10 h-10 card flex items-center justify-center text-lg hover:border-cyan transition-colors">📸</a>
                <a href="#" className="w-10 h-10 card flex items-center justify-center text-lg hover:border-cyan transition-colors">🐦</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Create Footer component**

Create `client/src/components/Footer.jsx`:

```jsx
export default function Footer() {
  return (
    <footer className="bg-navy border-t border-border py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-muted text-sm">Copyright &copy; OMji 2018 - {new Date().getFullYear()}. All rights reserved.</p>
        <p className="text-muted text-sm">Made with ❤️ by OMji Software Development</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 7: Commit**

```bash
git add client/src/components/TechStack.jsx client/src/components/VendoSystem.jsx client/src/components/Testimonials.jsx client/src/components/Certifications.jsx client/src/components/Contact.jsx client/src/components/Footer.jsx
git commit -m "feat: add TechStack, VendoSystem, Testimonials, Certifications, Contact, Footer"
```

---

### Task 10: Assemble Home Page

**Files:**
- Modify: `client/src/pages/Home.jsx`

- [ ] **Step 1: Wire all components into Home page**

Replace `client/src/pages/Home.jsx`:

```jsx
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Problems from '../components/Problems'
import Services from '../components/Services'
import WhyChoose from '../components/WhyChoose'
import Projects from '../components/Projects'
import TechStack from '../components/TechStack'
import VendoSystem from '../components/VendoSystem'
import Testimonials from '../components/Testimonials'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Problems />
      <Services />
      <WhyChoose />
      <Projects />
      <TechStack />
      <VendoSystem />
      <Testimonials />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify the full page renders**

```bash
cd /Users/dev3/omjisite
npm run dev
```

Open http://localhost:3000. All 12 sections should render. Projects/testimonials/certifications will show once MongoDB is running and seeded.

- [ ] **Step 3: Commit**

```bash
git add client/src/pages/Home.jsx
git commit -m "feat: assemble all sections into Home page"
```

---

### Task 11: Admin Panel - Auth Context & Login

**Files:**
- Create: `client/src/context/AuthContext.jsx`
- Create: `client/src/pages/AdminLogin.jsx`
- Modify: `client/src/App.jsx`

- [ ] **Step 1: Create AuthContext**

Create `client/src/context/AuthContext.jsx`:

```jsx
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('omji-token'))

  const login = (newToken) => {
    localStorage.setItem('omji-token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('omji-token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

- [ ] **Step 2: Create AdminLogin page**

Create `client/src/pages/AdminLogin.jsx`:

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login', { username, password })
      login(data.token)
      navigate('/admin')
    } catch {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/assets/legoo.jpeg" alt="OMji" className="w-20 h-20 rounded-full mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-muted text-sm">Sign in to manage your website</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full bg-navy border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:border-cyan focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-navy border border-border rounded-lg px-4 py-3 text-white placeholder-muted focus:border-cyan focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full gradient-btn">Sign In</button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Update App.jsx with admin routes**

Replace `client/src/App.jsx`:

```jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/admin/login" />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
```

- [ ] **Step 4: Create placeholder AdminDashboard**

Create `client/src/pages/AdminDashboard.jsx`:

```jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProjectsManager from '../admin/ProjectsManager'
import ContactMessages from '../admin/ContactMessages'
import TestimonialsManager from '../admin/TestimonialsManager'
import CertificationsManager from '../admin/CertificationsManager'

const tabs = ['Projects', 'Messages', 'Testimonials', 'Certifications']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Projects')
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-navy-light border-r border-border min-h-screen p-6 hidden md:block">
          <div className="flex items-center gap-3 mb-8">
            <img src="/assets/legoo.jpeg" alt="OMji" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold">OMji</p>
              <p className="text-xs text-muted">Admin Panel</p>
            </div>
          </div>
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab ? 'bg-cyan/10 text-cyan font-bold' : 'text-muted hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="w-full mt-8 text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Mobile tabs */}
          <div className="flex gap-2 mb-6 md:hidden overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  activeTab === tab ? 'gradient-btn !py-2' : 'bg-card border border-border text-muted'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Projects' && <ProjectsManager />}
          {activeTab === 'Messages' && <ContactMessages />}
          {activeTab === 'Testimonials' && <TestimonialsManager />}
          {activeTab === 'Certifications' && <CertificationsManager />}
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add client/src/context/ client/src/pages/ client/src/App.jsx
git commit -m "feat: add admin auth context, login page, and dashboard layout"
```

---

### Task 12: Admin Panel - CRUD Managers

**Files:**
- Create: `client/src/admin/ProjectsManager.jsx`
- Create: `client/src/admin/ContactMessages.jsx`
- Create: `client/src/admin/TestimonialsManager.jsx`
- Create: `client/src/admin/CertificationsManager.jsx`

- [ ] **Step 1: Create ProjectsManager**

Create `client/src/admin/ProjectsManager.jsx`:

```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function ProjectsManager() {
  const { token } = useAuth()
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: '', subtitle: '', category: 'webapp', description: '',
    techTags: '', gradientFrom: '#0ea5e9', gradientTo: '#6366f1',
    demoUrl: '', urlBadge: '', featured: false
  })

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => { loadProjects() }, [])

  const loadProjects = () => {
    axios.get('/api/projects').then(res => setProjects(res.data))
  }

  const resetForm = () => {
    setForm({ title: '', subtitle: '', category: 'webapp', description: '', techTags: '', gradientFrom: '#0ea5e9', gradientTo: '#6366f1', demoUrl: '', urlBadge: '', featured: false })
    setEditing(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...form, techTags: JSON.stringify(form.techTags.split(',').map(t => t.trim()).filter(Boolean)) }
    try {
      if (editing) {
        await axios.put(`/api/projects/${editing}`, data, { headers })
      } else {
        await axios.post('/api/projects', data, { headers })
      }
      resetForm()
      loadProjects()
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleEdit = (p) => {
    setEditing(p._id)
    setForm({ ...p, techTags: p.techTags?.join(', ') || '' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await axios.delete(`/api/projects/${id}`, { headers })
    loadProjects()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>

      <form onSubmit={handleSubmit} className="card p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <input placeholder="Subtitle" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white focus:border-cyan focus:outline-none">
            <option value="webapp">Web App</option>
            <option value="mobile">Mobile</option>
            <option value="system">System</option>
          </select>
          <input placeholder="URL Badge (e.g. myapp.vercel.app)" value={form.urlBadge} onChange={e => setForm({ ...form, urlBadge: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
        </div>
        <textarea placeholder="Description" required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none resize-none" />
        <input placeholder="Tech Tags (comma separated)" value={form.techTags} onChange={e => setForm({ ...form, techTags: e.target.value })} className="w-full bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Demo URL" value={form.demoUrl} onChange={e => setForm({ ...form, demoUrl: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <div className="flex gap-2 items-center">
            <label className="text-sm text-muted">From:</label>
            <input type="color" value={form.gradientFrom} onChange={e => setForm({ ...form, gradientFrom: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
            <label className="text-sm text-muted">To:</label>
            <input type="color" value={form.gradientTo} onChange={e => setForm({ ...form, gradientTo: e.target.value })} className="w-10 h-10 rounded cursor-pointer" />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="rounded" />
            Featured Project
          </label>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="gradient-btn !py-2">{editing ? 'Update' : 'Add'} Project</button>
          {editing && <button type="button" onClick={resetForm} className="outline-btn !py-2">Cancel</button>}
        </div>
      </form>

      <div className="space-y-3">
        {projects.map(p => (
          <div key={p._id} className="card p-4 flex items-center justify-between">
            <div>
              <h4 className="font-bold">{p.title} {p.featured && <span className="text-xs text-warning">(Featured)</span>}</h4>
              <p className="text-muted text-sm">{p.category} - {p.techTags?.join(', ')}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(p)} className="text-cyan text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-red-400 text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create ContactMessages**

Create `client/src/admin/ContactMessages.jsx`:

```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function ContactMessages() {
  const { token } = useAuth()
  const [messages, setMessages] = useState([])
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get('/api/contact', { headers }).then(res => setMessages(res.data))
  }, [])

  const markRead = async (id) => {
    await axios.put(`/api/contact/${id}/read`, {}, { headers })
    setMessages(messages.map(m => m._id === id ? { ...m, read: true } : m))
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    await axios.delete(`/api/contact/${id}`, { headers })
    setMessages(messages.filter(m => m._id !== id))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Messages ({messages.filter(m => !m.read).length} unread)</h2>
      <div className="space-y-3">
        {messages.map(m => (
          <div key={m._id} className={`card p-5 ${!m.read ? 'border-cyan/30' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold">{m.name} {!m.read && <span className="text-xs text-cyan ml-2">NEW</span>}</h4>
                <p className="text-muted text-sm">{m.email}</p>
              </div>
              <p className="text-muted text-xs">{new Date(m.createdAt).toLocaleDateString()}</p>
            </div>
            {m.subject && <p className="text-silver text-sm font-bold mb-1">{m.subject}</p>}
            <p className="text-muted text-sm mb-3">{m.message}</p>
            <div className="flex gap-3">
              {!m.read && <button onClick={() => markRead(m._id)} className="text-cyan text-xs hover:underline">Mark Read</button>}
              <button onClick={() => handleDelete(m._id)} className="text-red-400 text-xs hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-muted text-center py-8">No messages yet.</p>}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create TestimonialsManager**

Create `client/src/admin/TestimonialsManager.jsx`:

```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function TestimonialsManager() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ clientName: '', company: '', quote: '', rating: 5 })
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => { load() }, [])
  const load = () => axios.get('/api/testimonials').then(res => setItems(res.data))

  const resetForm = () => { setForm({ clientName: '', company: '', quote: '', rating: 5 }); setEditing(null) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editing) { await axios.put(`/api/testimonials/${editing}`, form, { headers }) }
    else { await axios.post('/api/testimonials', form, { headers }) }
    resetForm(); load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return
    await axios.delete(`/api/testimonials/${id}`, { headers }); load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>
      <form onSubmit={handleSubmit} className="card p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Client Name" required value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
        </div>
        <textarea placeholder="Quote" required rows={3} value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} className="w-full bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none resize-none" />
        <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white focus:border-cyan focus:outline-none">
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
        </select>
        <div className="flex gap-3">
          <button type="submit" className="gradient-btn !py-2">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" onClick={resetForm} className="outline-btn !py-2">Cancel</button>}
        </div>
      </form>
      <div className="space-y-3">
        {items.map(t => (
          <div key={t._id} className="card p-4 flex justify-between items-start">
            <div><h4 className="font-bold">{t.clientName}</h4><p className="text-muted text-sm">{t.company} - {t.rating}★</p><p className="text-muted text-xs mt-1 line-clamp-2">{t.quote}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(t._id); setForm(t) }} className="text-cyan text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(t._id)} className="text-red-400 text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create CertificationsManager**

Create `client/src/admin/CertificationsManager.jsx`:

```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function CertificationsManager() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', issuer: '', type: 'completion' })
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => { load() }, [])
  const load = () => axios.get('/api/certifications').then(res => setItems(res.data))

  const resetForm = () => { setForm({ title: '', issuer: '', type: 'completion' }); setEditing(null) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editing) { await axios.put(`/api/certifications/${editing}`, form, { headers }) }
    else { await axios.post('/api/certifications', form, { headers }) }
    resetForm(); load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return
    await axios.delete(`/api/certifications/${id}`, { headers }); load()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Certifications</h2>
      <form onSubmit={handleSubmit} className="card p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <input placeholder="Issuer" required value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white placeholder-muted focus:border-cyan focus:outline-none" />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="bg-navy border border-border rounded-lg px-4 py-2 text-white focus:border-cyan focus:outline-none">
            <option value="completion">Completion</option>
            <option value="recognition">Recognition</option>
            <option value="participation">Participation</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="gradient-btn !py-2">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" onClick={resetForm} className="outline-btn !py-2">Cancel</button>}
        </div>
      </form>
      <div className="space-y-3">
        {items.map(c => (
          <div key={c._id} className="card p-4 flex justify-between items-center">
            <div><h4 className="font-bold text-sm">{c.title}</h4><p className="text-muted text-xs">{c.issuer} - {c.type}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(c._id); setForm(c) }} className="text-cyan text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(c._id)} className="text-red-400 text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
mkdir -p /Users/dev3/omjisite/client/src/admin
git add client/src/admin/
git commit -m "feat: add admin CRUD managers for projects, messages, testimonials, certifications"
```

---

### Task 13: Final Integration & Testing

**Files:**
- Verify all components render
- Verify API endpoints work
- Verify responsive design

- [ ] **Step 1: Start MongoDB (ensure running)**

```bash
mongosh --eval "db.runCommand({ ping: 1 })"
```

If not running, start it. On macOS with Homebrew: `brew services start mongodb-community`

- [ ] **Step 2: Seed the database**

```bash
cd /Users/dev3/omjisite
npm run seed
```

Expected output: Admin user created, 7 projects, 3 testimonials, 10 certifications seeded.

- [ ] **Step 3: Start dev servers**

```bash
cd /Users/dev3/omjisite
npm run dev
```

Expected: Server on :5000, Client on :3000.

- [ ] **Step 4: Test public site**

Open http://localhost:3000 and verify:
- Navbar is sticky, mobile hamburger works
- Hero shows with logo, gradient text, stats
- About section renders with mission/vision
- Problems section shows gradient banner with 4 white cards
- Services shows 8 cards in grid
- WhyChoose shows phone mockups and feature points
- Projects load from API with gradient cards and filter tabs
- Tech Stack shows 6 category cards
- Vendo System section renders fully
- Testimonials carousel works with navigation
- Certifications grid renders
- Contact form submits successfully
- Footer shows copyright

- [ ] **Step 5: Test admin panel**

Open http://localhost:3000/admin/login
- Login with admin / omji2024
- Verify Projects CRUD (add, edit, delete)
- Verify Messages list loads
- Verify Testimonials CRUD
- Verify Certifications CRUD

- [ ] **Step 6: Test responsive (mobile)**

Use browser DevTools responsive mode:
- 375px (iPhone SE)
- 768px (iPad)
- Verify hamburger menu, stacked layouts, readable text

- [ ] **Step 7: Final commit**

```bash
cd /Users/dev3/omjisite
git add -A
git commit -m "feat: OMji website complete - all sections, admin panel, responsive design"
```
