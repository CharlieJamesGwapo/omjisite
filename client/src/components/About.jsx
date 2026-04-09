import { motion } from 'framer-motion'

const highlights = [
  { value: '2018', label: 'Founded' },
  { value: '10+', label: 'Projects' },
  { value: '500+', label: 'Users' },
  { value: '5★', label: 'Rated' },
]

export default function About() {
  return (
    <section id="about" className="py-24" style={{ background: '#0d1117', position: 'relative', overflow: 'hidden' }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: '50%', right: '-100px', transform: 'translateY(-50%)',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">
              About <span className="gradient-text">OMji</span>
            </h2>
            <p style={{ color: '#8b95a5', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
              OMji is a software development company founded in 2018, specializing in building
              high-quality digital solutions for businesses and communities. We've grown into a
              trusted technology partner delivering web apps, mobile apps, and enterprise systems.
            </p>
            <p style={{ color: '#8b95a5', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
              We combine cutting-edge technology with deep understanding of local business needs —
              whether it's building school management systems, billing platforms, ride-sharing apps,
              or custom software solutions.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-card p-5" style={{ borderLeft: '3px solid #0ea5e9' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0ea5e9', fontSize: '0.875rem' }}>Our Mission</h4>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.7 }}>
                  Empower businesses with affordable, top-quality software solutions that drive growth.
                </p>
              </div>
              <div className="glass-card p-5" style={{ borderLeft: '3px solid #6366f1' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#6366f1', fontSize: '0.875rem' }}>Our Vision</h4>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.7 }}>
                  Leading software development partner in the Philippines, known for innovation.
                </p>
              </div>
            </div>

            {/* Highlights row */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {highlights.map((h, i) => (
                <div key={h.label}>
                  <div style={{
                    fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em',
                    background: i % 2 === 0 ? 'linear-gradient(135deg,#0ea5e9,#38bdf8)' : 'linear-gradient(135deg,#6366f1,#818cf8)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                  }}>{h.value}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 500, marginTop: '2px' }}>{h.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Logo image with decorative frame */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ position: 'relative' }}>
              {/* Glow background */}
              <div style={{
                position: 'absolute', inset: '-30px', borderRadius: '1.5rem',
                background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }} />
              {/* Decorative corner dots */}
              <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '16px', height: '16px', background: '#0ea5e9', borderRadius: '50%', opacity: 0.6 }} />
              <div style={{ position: 'absolute', bottom: '-8px', left: '-8px', width: '10px', height: '10px', background: '#6366f1', borderRadius: '50%', opacity: 0.6 }} />
              <img
                src="/assets/legoo.jpeg"
                alt="OMji Software Development"
                style={{
                  position: 'relative', zIndex: 1,
                  width: 'clamp(240px, 30vw, 300px)',
                  height: 'clamp(240px, 30vw, 300px)',
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(14,165,233,0.2)',
                  boxShadow: '0 30px 80px rgba(14,165,233,0.08), 0 0 0 1px rgba(255,255,255,0.04)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
