import { motion } from 'framer-motion'

const features = [
  {
    icon: '⚡',
    title: 'Fast Solutions for Long-Term Success',
    description: 'We deliver quickly without cutting corners. Our systems are designed to get results, increase efficiency, and maximize your ROI from day one.',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05))'
  },
  {
    icon: '🎯',
    title: 'Interface Design Tailored for You',
    description: 'We create professional, user-friendly interfaces built for your brand. From school systems to ride-sharing apps — beautiful on every device.',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))'
  },
  {
    icon: '🚀',
    title: 'Design + Development Breakthrough',
    description: 'Hassle-free, quick, and affordable — but exceptional output every time. Full-stack applications, enterprise systems, and mobile apps that scale.',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))'
  }
]

export default function WhyChoose() {
  return (
    <section
      className="py-24"
      style={{ background: 'linear-gradient(180deg, #0a0e1a 0%, #0d1117 100%)', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: Phone mockups */}
          <motion.div
            className="flex-shrink-0 relative"
            style={{ width: '300px', height: '340px' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow behind phones */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: '250px', height: '250px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)',
              filter: 'blur(30px)'
            }} />

            {/* Phone 1 */}
            <motion.div
              style={{
                width: '155px', height: '285px',
                border: '1.5px solid rgba(14,165,233,0.25)',
                borderRadius: '22px', padding: '6px',
                position: 'absolute', left: 0, top: 0, zIndex: 2,
                background: 'rgba(22,27,34,0.9)',
                boxShadow: '0 24px 48px rgba(14,165,233,0.12)',
                backdropFilter: 'blur(12px)'
              }}
              whileInView={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src="/assets/billing.png" alt="OMji Billing" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </motion.div>

            {/* Phone 2 */}
            <motion.div
              style={{
                width: '155px', height: '285px',
                border: '1.5px solid rgba(99,102,241,0.25)',
                borderRadius: '22px', padding: '6px',
                position: 'absolute', left: '115px', top: '40px', zIndex: 1,
                background: 'rgba(22,27,34,0.9)',
                boxShadow: '0 24px 48px rgba(99,102,241,0.12)',
                backdropFilter: 'blur(12px)'
              }}
              whileInView={{ y: [0, -6, 0] }}
              transition={{ duration: 4, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img src="/assets/oneride.png" alt="One Ride" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </motion.div>

            {/* Floating dots */}
            <div style={{ position: 'absolute', top: '-10px', right: '10px', width: '14px', height: '14px', background: '#f59e0b', borderRadius: '50%', boxShadow: '0 0 10px rgba(245,158,11,0.6)' }} />
            <div style={{ position: 'absolute', bottom: '30px', left: '-12px', width: '10px', height: '10px', background: '#0ea5e9', borderRadius: '50%', boxShadow: '0 0 10px rgba(14,165,233,0.6)' }} />
            <div style={{ position: 'absolute', top: '50%', right: '-6px', width: '6px', height: '6px', background: '#6366f1', borderRadius: '50%' }} />
          </motion.div>

          {/* Right: Features */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">Why Choose Us</span>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800,
              marginTop: '0.5rem', marginBottom: '2.5rem', lineHeight: 1.2,
              letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif"
            }}>
              Better deals on your{' '}
              <span className="gradient-text">design & development</span> needs
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  style={{
                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                    padding: '1.25rem', borderRadius: '1rem',
                    background: feature.gradient,
                    border: `1px solid ${feature.color}20`,
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ y: -2, boxShadow: `0 8px 30px ${feature.color}15` }}
                >
                  <div style={{
                    width: '46px', height: '46px', flexShrink: 0, borderRadius: '10px',
                    background: `${feature.color}20`,
                    border: `1px solid ${feature.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.25rem'
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '0.375rem', color: feature.color, fontSize: '0.875rem' }}>
                      {feature.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.7 }}>
                      {feature.description}
                    </p>
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
