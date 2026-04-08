import { motion } from 'framer-motion'

const services = [
  {
    emoji: '🌐',
    title: 'Website Development',
    description: 'Custom websites built with React, Next.js, and modern frameworks. Fast, scalable, and SEO-ready.',
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.15)'
  },
  {
    emoji: '📱',
    title: 'Mobile App Development',
    description: 'iOS & Android apps with React Native. Smooth UX, real-time features, and native performance.',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.15)'
  },
  {
    emoji: '🎮',
    title: 'Game Development',
    description: 'Interactive games and gamified applications with engaging mechanics and polished interfaces.',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.15)'
  },
  {
    emoji: '🎨',
    title: 'UI/UX Design',
    description: 'User-centered interface design. Wireframes, prototypes, and pixel-perfect implementations.',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)'
  },
  {
    emoji: '💎',
    title: 'Branding & Graphic Design',
    description: 'Complete brand identity — logos, color systems, marketing materials that make you stand out.',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.15)'
  },
  {
    emoji: '🖥️',
    title: 'Enterprise Systems',
    description: 'Billing systems, POS, RFID attendance, and custom business software built for reliability.',
    color: '#14b8a6',
    glow: 'rgba(20,184,166,0.15)'
  },
  {
    emoji: '📋',
    title: 'Project Management',
    description: 'End-to-end project delivery with Agile methodology. On time, on budget, every time.',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.15)'
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Services() {
  return (
    <section id="services" className="py-24" style={{ background: '#0a0e1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">All-in-One Services</h2>
          <p style={{ color: '#6b7280', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Everything your business needs to succeed in the digital world — under one roof.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              style={{
                background: '#161b22',
                border: '1px solid #21262d',
                borderRadius: '16px',
                padding: '1.75rem',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s'
              }}
              onHoverStart={e => {
                e.target.style && (e.target.style.borderColor = service.color + '60')
              }}
            >
              {/* Glow bg */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '120px', height: '120px',
                background: `radial-gradient(circle at top right, ${service.glow}, transparent 70%)`,
                borderRadius: '0 16px 0 0',
                pointerEvents: 'none'
              }} />

              {/* Icon */}
              <div style={{
                width: '54px', height: '54px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${service.color}22, ${service.color}11)`,
                border: `1px solid ${service.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem',
                marginBottom: '1.25rem'
              }}>
                {service.emoji}
              </div>

              <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                {service.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.8rem', lineHeight: 1.7, margin: 0 }}>
                {service.description}
              </p>

              {/* Bottom accent line */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                height: '2px', width: '40%',
                background: `linear-gradient(90deg, ${service.color}, transparent)`,
                borderRadius: '0 2px 0 0'
              }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
