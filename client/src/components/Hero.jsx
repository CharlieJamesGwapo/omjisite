import { motion } from 'framer-motion'

const stats = [
  { value: '10+', label: 'Projects Delivered', color: '#0ea5e9' },
  { value: '500+', label: 'Users Served', color: '#6366f1' },
  { value: '99.9%', label: 'System Uptime', color: '#0ea5e9' },
  { value: '24/7', label: 'Support', color: '#6366f1' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="circuit-bg relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0a0e1a' }}
    >
      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full relative z-10">
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
            <h2
              className="text-xl sm:text-2xl font-normal mb-6"
              style={{ color: '#8b95a5' }}
            >
              That Power Your Business Forward
            </h2>
            <p
              className="max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
              style={{ color: '#6b7280' }}
            >
              From custom websites and mobile apps to WiFi vendo systems — OMji delivers
              top-quality software solutions that help businesses grow and thrive in the
              digital age.
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
              <div
                className="absolute inset-0 rounded-full blur-3xl scale-110"
                style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2))' }}
              />
              <img
                src="/assets/legoo.jpeg"
                alt="OMji Software Development"
                className="relative rounded-full"
                style={{
                  width: '280px',
                  height: '280px',
                  border: '2px solid rgba(14,165,233,0.3)',
                  boxShadow: '0 0 60px rgba(14,165,233,0.1)'
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12 mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(14,165,233,0.1)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm mt-1" style={{ color: '#6b7280' }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
