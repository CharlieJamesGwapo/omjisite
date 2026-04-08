import { motion } from 'framer-motion'

const services = [
  { emoji: '🌐', title: 'Website Development', description: 'Custom websites built with modern frameworks', color: '#0ea5e9' },
  { emoji: '🎮', title: 'Game Development', description: 'Interactive games and gamified applications', color: '#6366f1' },
  { emoji: '🎨', title: 'Graphic Design', description: 'Branding, logos, marketing materials', color: '#ec4899' },
  { emoji: '📱', title: 'Mobile App Dev', description: 'iOS & Android apps with React Native', color: '#10b981' },
  { emoji: '✏️', title: 'UI/UX Design', description: 'User-centered interface design', color: '#f59e0b' },
  { emoji: '💎', title: 'Branding', description: 'Complete brand identity packages', color: '#8b5cf6' },
  { emoji: '📋', title: 'Project Management', description: 'End-to-end project delivery', color: '#14b8a6' },
  { emoji: '📶', title: 'OMji Vendo System', description: 'Top quality WiFi hotspot vendo', color: '#0ea5e9', highlight: true },
]

export default function Services() {
  return (
    <section id="services" className="py-20" style={{ background: '#0a0e1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">All-in-One Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="card p-6 text-center"
              style={service.highlight ? {
                borderColor: 'rgba(14,165,233,0.3)',
                background: 'linear-gradient(135deg, rgba(14,165,233,0.05), rgba(99,102,241,0.05))'
              } : {}}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(14,165,233,0.05)' }}
            >
              <div style={{
                width: '56px', height: '56px',
                margin: '0 auto 1rem',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {service.emoji}
              </div>
              <h3 className="font-bold text-sm mb-2" style={{ color: service.highlight ? '#0ea5e9' : 'white' }}>
                {service.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
