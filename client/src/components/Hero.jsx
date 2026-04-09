import { motion } from 'framer-motion'

const stats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '500+', label: 'Users Served' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="circuit-bg relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0a0e1a' }}
    >
      {/* Ambient blobs — UI UX Pro Max: cinematic dark mobile pattern */}
      <div className="ambient-blob" style={{
        width: '600px', height: '600px', top: '-100px', left: '-150px',
        background: 'rgba(14,165,233,0.07)',
        animationDelay: '0s'
      }} />
      <div className="ambient-blob" style={{
        width: '500px', height: '500px', top: '20%', right: '-100px',
        background: 'rgba(99,102,241,0.07)',
        animationDelay: '-3s'
      }} />
      <div className="ambient-blob" style={{
        width: '300px', height: '300px', bottom: '10%', left: '30%',
        background: 'rgba(14,165,233,0.05)',
        animationDelay: '-5s'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(14,165,233,0.08)',
                border: '1px solid rgba(14,165,233,0.2)',
                borderRadius: '100px', padding: '6px 16px',
                marginBottom: '1.5rem'
              }}
            >
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#0ea5e9', display: 'inline-block',
                boxShadow: '0 0 8px rgba(14,165,233,0.8)',
                animation: 'pulse 2s ease-in-out infinite'
              }} />
              <span style={{ color: '#0ea5e9', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Software Development Company
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              We Build{' '}
              <span className="gradient-text">Digital Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontSize: '1.2rem', fontWeight: 500,
                color: '#c0c8d8', marginBottom: '0.75rem',
                letterSpacing: '-0.01em'
              }}
            >
              That Power Your Business Forward
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{
                color: '#6b7280', maxWidth: '480px',
                margin: '0 auto 2rem', lineHeight: 1.75,
                fontSize: '1rem'
              }}
              className="lg:mx-0"
            >
              From custom websites and mobile apps to enterprise systems — OMji delivers
              top-quality software solutions that help businesses grow and thrive in the digital age.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a href="#projects" className="gradient-btn text-center">
                View Our Projects
              </a>
              <a href="#contact" className="outline-btn text-center">
                Get a Quote
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Logo with glow ring */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer glow ring */}
            <div style={{
              position: 'absolute', inset: '-20px',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, rgba(14,165,233,0.3), rgba(99,102,241,0.3), rgba(14,165,233,0), rgba(14,165,233,0.3))',
              animation: 'spin 8s linear infinite',
              filter: 'blur(2px)'
            }} />
            {/* Glow backdrop */}
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, rgba(99,102,241,0.1) 50%, transparent 70%)',
              filter: 'blur(30px)', transform: 'scale(1.3)'
            }} />
            <img
              src="/assets/legoo.jpeg"
              alt="OMji Software Development"
              style={{
                position: 'relative', zIndex: 1,
                width: 'clamp(220px, 28vw, 320px)',
                height: 'clamp(220px, 28vw, 320px)',
                borderRadius: '50%',
                border: '2px solid rgba(14,165,233,0.3)',
                boxShadow: '0 0 80px rgba(14,165,233,0.15), inset 0 0 30px rgba(14,165,233,0.05)'
              }}
            />
          </motion.div>
        </div>

        {/* Glow divider */}
        <div className="glow-line mt-16 mb-10" />

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center lg:justify-start gap-10 sm:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center lg:text-left">
              <div style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                fontFamily: "'Space Grotesk', sans-serif",
                background: i % 2 === 0
                  ? 'linear-gradient(135deg, #0ea5e9, #38bdf8)'
                  : 'linear-gradient(135deg, #6366f1, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '4px', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
      `}</style>
    </section>
  )
}
