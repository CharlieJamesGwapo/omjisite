const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const prisma = new PrismaClient()

async function main() {
  // Clear all tables
  await prisma.certification.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash('omji2024', 10)
  await prisma.user.create({ data: { username: 'admin', password: hashedPassword } })
  console.log('Admin user created: admin / omji2024')

  // Create projects
  const projects = [
    {
      title: 'SJBHS Smart Access',
      subtitle: 'Full Stack App',
      category: 'system',
      description: 'RFID attendance system with parent/teacher mobile apps, real-time push notifications, and admin dashboard for St. John Baptist High School.',
      techTags: ['React', 'Node.js', 'RFID', 'Mobile', 'Push Notifications'],
      gradientFrom: '#1e3a8a',
      gradientTo: '#3b82f6',
      demoUrl: '',
      screenshots: ['/assets/school5.png', '/assets/school1.png', '/assets/school2.png'],
      featured: true,
      urlBadge: 'sjbhs-attendance.app',
      order: 1
    },
    {
      title: 'OMji Billing System',
      subtitle: 'Internet & Billing',
      category: 'system',
      description: 'Complete billing dashboard with MikroTik integration, subscription management, payments, SMS notifications, and reporting.',
      techTags: ['React', 'Node.js', 'MikroTik', 'PostgreSQL', 'SMS'],
      gradientFrom: '#0f172a',
      gradientTo: '#0ea5e9',
      demoUrl: '',
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
      demoUrl: '',
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
      screenshots: [],
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
      screenshots: [],
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
      screenshots: [],
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
      screenshots: [],
      urlBadge: 'study-pulse-ten.vercel.app',
      order: 7
    }
  ]

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }
  console.log(`${projects.length} projects created`)

  // Create testimonials
  const testimonials = [
    {
      clientName: 'SJBHS Administration',
      company: 'St. John Baptist High School',
      quote: "OMji delivered our school's RFID attendance system on time and within budget. The parent app is very user-friendly and the push notifications work perfectly. Highly recommended!",
      rating: 5,
      order: 1
    },
    {
      clientName: 'ISP Business Owner',
      company: 'Billing System Client',
      quote: 'The OMji Billing System transformed how we manage our internet business. MikroTik integration works seamlessly and the dashboard is clean and easy to use.',
      rating: 5,
      order: 2
    },
    {
      clientName: 'Community User',
      company: 'One Ride Balingasag',
      quote: 'One Ride has been a game-changer for our community in Balingasag. Easy to use for both riders and customers. The delivery and food ordering features are very convenient.',
      rating: 5,
      order: 3
    }
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }
  console.log(`${testimonials.length} testimonials created`)

  // Create certifications
  const certifications = [
    { title: 'Databases with SQL', issuer: 'CS50 (Harvard)', type: 'completion', order: 1 },
    { title: 'Windows Server 2012 Training', issuer: 'ITFreeTraining', type: 'completion', order: 2 },
    { title: 'Active Directory', issuer: 'ITFreeTraining', type: 'completion', order: 3 },
    { title: 'AD DS Domain Controllers & FSMO Roles', issuer: 'Microsoft', type: 'completion', order: 4 },
    { title: "Dean's Lister (2nd & 3rd Year) - Ranked 2", issuer: 'MOIST', type: 'recognition', order: 5 },
    { title: 'TOPCIT (Test of Practical Competency in IT)', issuer: 'TOPCIT', type: 'participation', order: 6 },
    { title: 'MongoDB Database Training', issuer: 'MongoDB', type: 'completion', order: 7 },
    { title: 'PHP for Web Development', issuer: 'CodeMy', type: 'completion', order: 8 },
    { title: 'JavaScript Programming', issuer: 'Bro Code', type: 'completion', order: 9 },
    { title: 'HTML and CSS', issuer: 'Telugu', type: 'completion', order: 10 }
  ]

  for (const c of certifications) {
    await prisma.certification.create({ data: c })
  }
  console.log(`${certifications.length} certifications created`)

  console.log('\nSeed complete! Login: admin / omji2024')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
