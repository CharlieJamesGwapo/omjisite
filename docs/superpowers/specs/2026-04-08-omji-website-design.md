# OMji Website - Design Specification

## Overview

A full-stack website for OMji Software Development company showcasing services, projects portfolio, WiFi vendo system, tech stack, certifications, and contact functionality. Built with React + Node.js + MongoDB.

## Color Palette (from logo: legoo.jpeg)

- **Primary Background:** #0a0e1a (Dark Navy)
- **Secondary Background:** #0d1117 (Dark Gray)
- **Card Background:** #161b22
- **Border:** #21262d
- **Cyan Blue (Primary Accent):** #0ea5e9
- **Purple (Secondary Accent):** #6366f1
- **Silver/Light Text:** #c0c8d8
- **Muted Text:** #8b95a5 / #6b7280
- **Gradient:** linear-gradient(135deg, #0ea5e9, #6366f1)
- **Success:** #10b981
- **Warning:** #f59e0b

## Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- Framer Motion (scroll animations, hover effects, parallax)
- React Router (SPA navigation)
- React Icons
- Swiper.js (testimonials carousel)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication (admin panel)
- Multer (image uploads)
- Nodemailer (contact form email notifications)
- bcrypt (password hashing)

## Page Structure (12 Sections - Single Page App)

### 1. Navigation Bar (Sticky)
- OMji logo (legoo.jpeg) + "OMji" text
- Links: Home, About, Services, Projects, Tech Stack, Vendo System, Testimonials, Certifications
- "Contact Us" CTA button (gradient)
- Mobile: hamburger menu with slide-in drawer
- Transparent on hero, solid dark navy on scroll

### 2. Hero Section
- Animated circuit-board pattern background (CSS)
- Left: "SOFTWARE DEVELOPMENT COMPANY" label, "We Build Digital Solutions" h1 (gradient text), "That Power Your Business Forward" subtitle, description paragraph, two CTA buttons (gradient "View Our Projects" + outline "Get a Quote")
- Right: OMji logo (legoo.jpeg) in glowing circle
- Stats bar below: 10+ Projects, 500+ Users, 99.9% Uptime, 24/7 Support
- Typing animation on tagline

### 3. About OMji
- "Who We Are" label
- Company story: founded 2018, from WiFi vendo roots to full-stack development
- Mission & Vision cards (2-column grid)
- Right side: OMji logo/character image
- Scroll-reveal animation

### 4. Problems We Solve (Rooche-style)
- Full-width cyan-to-purple gradient background
- "WE GET IT..." uppercase label
- "Problems to be solved" large heading
- Subtitle paragraph about business challenges
- 4 white cards on gradient BG:
  1. Low Brand Awareness (📢 icon)
  2. Poor Conversion Score (📊 icon)
  3. Low-Quality Design & UX (🎨 icon)
  4. Outdated Systems (🖥️ icon)
- Each card: icon, bold uppercase title, description
- Mobile: 2-column then 1-column grid

### 5. Services
- "What We Offer" label, "All-in-One Services" heading
- 4x2 grid of service cards with gradient icon backgrounds:
  1. Website Development (blue)
  2. Game Development (purple)
  3. Graphic Design (pink)
  4. Mobile App Development (green)
  5. UI/UX Design (yellow)
  6. Branding (violet)
  7. Project Management (teal)
  8. OMji Vendo System (highlighted with gradient border)
- Each card: colored icon square, title, short description
- Hover: lift + glow effect
- Mobile: 2-column grid

### 6. Why Choose OMji (Rooche-style)
- Dark gradient background
- "We've been working hard..." label
- "Get even better deals on your design and development needs" heading (gradient text highlight)
- Left: Two phone mockup frames showing OMji Billing + One Ride app screenshots, floating dot decorations
- Right: 3 feature blocks with icons:
  1. 🔔 Fast solutions for your long-term success
  2. 🎯 An interface design tailored for you
  3. 🚀 The breakthrough of design and development
- Mobile: stacks vertically, mockups above features

### 7. Projects Portfolio (CJ Abejo style)
- "Our Work" label, "Featured Projects" heading
- Filter tabs: All | Web Apps | Mobile | Systems
- 3-column grid of project cards:
  - Gradient header (unique color per project) with URL badge, project name, type, "Featured" tag
  - Body: description, tech tags (pill badges), "Live Demo" gradient button + link icon
- Projects:
  1. SJBHS Smart Access (blue gradient) - React, Node.js, RFID, Mobile
  2. OMji Billing System (navy-to-cyan) - React, Node.js, MikroTik, MongoDB
  3. One Ride Balingasag (brown-to-orange) - React Native, Node.js, Maps API
  4. G2 POS System (indigo-to-purple) - Go, Next.js, PostgreSQL, Docker
  5. E-Cycle Hub (green) - Go, Next.js, NeonDB
  6. ReflectiCSS (pink) - React, CSS3, JavaScript
  7. Study Pulse (blue-to-teal) - React, Tailwind CSS, JavaScript
- Stats counter below: Total Projects, Live Websites, Mobile Apps, Billing Systems
- Dynamic: loaded from MongoDB, manageable via admin
- Mobile: 1-column cards

### 8. Skills & Tech Stack
- "Technologies We Use" label, "Skills & Tech Stack" heading
- 6 category cards (3x2 grid):
  1. Frontend (⚡ blue): React.js, Next.js, Vue.js, Tailwind CSS, Bootstrap, TypeScript, HTML5/CSS3
  2. Backend (🔧 yellow): Go, Node.js, C#/.NET, PHP Laravel, Python, REST API, JWT/OAuth
  3. Databases (🗄️ green): PostgreSQL, MySQL, MongoDB, Supabase, Firebase, NeonDB
  4. Cloud & DevOps (☁️ purple): AWS Lambda, Docker, Git & GitHub, Vercel, CI/CD, Windows Server
  5. Mobile (📱 pink): React Native, Android Studio, Mobile UI/UX, API Integration
  6. Tools & Practices (🛠️ teal): VS Code, Figma, Agile/Scrum, Clean Code, RBAC
- Each card: colored icon, category title, tag pills
- Mobile: 2-column then 1-column

### 9. OMji Vendo System
- Dark gradient background
- Left: product image placeholder (for vendo hardware photos)
- Right: "Our Product" label, "OMji Vendo System" heading, "Maker of Top Quality Hotspot Vendo" subtitle
- Description about earning from internet sharing
- 3 feature cards: VLAN (no USB2LAN), Remote Management, 24/7 Earning
- Yellow warning box: "Beware of fake products!"
- Two CTAs: "Inquire Now" (gradient) + "Visit FB Page" (outline)
- Mobile: stacks vertically

### 10. Testimonials (Carousel)
- "What Our Clients Say" label, "Love from our clients" heading
- 3 testimonial cards visible at once (Swiper carousel):
  - 5-star rating
  - Quote text
  - Client name + company/context
- Navigation arrows (circular, cyan border)
- Testimonials managed from admin panel
- Mobile: 1 card visible, swipeable

### 11. Certifications
- "Professional Growth" label, "Certifications & Recognitions" heading
- 3-column grid of cert cards:
  1. Databases with SQL - CS50 Harvard
  2. Windows Server 2012 - ITFreeTraining
  3. Active Directory - ITFreeTraining
  4. AD DS & FSMO Roles - Microsoft
  5. Dean's Lister Rank 2 - MOIST (highlighted gold)
  6. MongoDB Training - MongoDB
  7. TOPCIT - Participation
  8. PHP Web Development - CodeMy
  9. JavaScript & HTML/CSS - Bro Code & Telugu
- Each: gradient icon, cert name, issuer, "Certified"/"Recognition" badge
- Mobile: 2-column then 1-column

### 12. Contact + Footer
- Left: contact form (Name, Email, Subject, Message, Send button)
- Right: Contact info (phone: 09655343312, FB page, email), social icons
- Form submissions: saved to MongoDB + email notification via Nodemailer
- Footer bar: copyright "OMji 2018-2026", "Made with ❤️ by OMji"
- Mobile: stacks vertically

## Admin Panel (Separate Route: /admin)

### Authentication
- JWT-based login
- Default admin account created on first run

### Dashboard Features
- **Projects CRUD:** Add/edit/delete projects with title, description, tech tags, gradient color, demo URL, screenshots (image upload), featured flag, category
- **Contact Messages:** View submissions list, mark read/unread, delete
- **Testimonials CRUD:** Add/edit/delete client reviews
- **Certifications CRUD:** Manage certificates
- **Services:** Update service offerings
- **Vendo Content:** Edit product info, warning text

## API Endpoints

```
POST   /api/auth/login          - Admin login
GET    /api/projects             - List all projects
POST   /api/projects             - Create project (admin)
PUT    /api/projects/:id         - Update project (admin)
DELETE /api/projects/:id         - Delete project (admin)
POST   /api/contact              - Submit contact form (public)
GET    /api/contact              - List messages (admin)
GET    /api/testimonials          - List testimonials
POST   /api/testimonials          - Create testimonial (admin)
PUT    /api/testimonials/:id      - Update testimonial (admin)
DELETE /api/testimonials/:id      - Delete testimonial (admin)
GET    /api/certifications        - List certifications
POST   /api/certifications        - Create certification (admin)
PUT    /api/certifications/:id    - Update certification (admin)
DELETE /api/certifications/:id    - Delete certification (admin)
POST   /api/upload               - Upload image (admin)
```

## Data Models

### Project
```
{
  title: String,
  subtitle: String,
  category: String (webapp|mobile|system),
  description: String,
  techTags: [String],
  gradientFrom: String,
  gradientTo: String,
  demoUrl: String,
  repoUrl: String,
  screenshots: [String],
  featured: Boolean,
  urlBadge: String,
  order: Number
}
```

### Contact
```
{
  name: String,
  email: String,
  subject: String,
  message: String,
  read: Boolean,
  createdAt: Date
}
```

### Testimonial
```
{
  clientName: String,
  company: String,
  quote: String,
  rating: Number,
  order: Number
}
```

### Certification
```
{
  title: String,
  issuer: String,
  type: String (completion|recognition|participation),
  iconColor: String,
  order: Number
}
```

## Animations & Effects
- Scroll-triggered fade-in/slide-up (Framer Motion)
- Typing animation on hero tagline
- CSS circuit-board pattern background (animated subtle movement)
- Card hover: translate-y lift + box-shadow glow
- Gradient text on headings
- Smooth scroll between sections
- Parallax effect on hero elements
- Counter animation on stats (count up on scroll)
- Testimonial carousel auto-play with pause on hover

## Responsive Breakpoints
- Desktop: 1280px+ (full layout)
- Tablet: 768px-1279px (2-column grids, adjusted spacing)
- Mobile: <768px (1-column, hamburger menu, stacked layouts)

## Project Images (existing in /Users/dev3/omjisite/)
- legoo.jpeg - OMji logo
- school1.png, school2.png, school3.png, school5.png - SJBHS project
- billing.png, billing1.png, billing2.png - OMji Billing project
- oneride.png, oneride1.png, oneride3.png - One Ride project

## Folder Structure
```
omjisite/
├── client/                    # React frontend
│   ├── public/
│   │   └── assets/           # Logo, project images
│   ├── src/
│   │   ├── components/       # Reusable components
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
│   │   │   └── Admin.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                    # Node.js backend
│   ├── models/
│   │   ├── Project.js
│   │   ├── Contact.js
│   │   ├── Testimonial.js
│   │   └── Certification.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── contact.js
│   │   ├── testimonials.js
│   │   └── certifications.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
└── docs/
```
