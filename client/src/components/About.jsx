import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20" style={{ background: '#0d1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">
              About <span style={{ color: '#0ea5e9' }}>OMji</span>
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: '#8b95a5' }}>
              OMji is a software development company founded in 2018, specializing in building
              high-quality digital solutions for businesses and communities. From our roots in
              WiFi vendo systems to full-stack web and mobile development, we've grown into a
              trusted technology partner.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: '#8b95a5' }}>
              We believe in delivering top-quality products at accessible prices. Our team combines
              cutting-edge technology with deep understanding of local business needs — whether it's
              building school management systems, billing platforms, ride-sharing apps, or custom
              software solutions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card p-5">
                <h4 className="font-bold mb-2" style={{ color: '#0ea5e9' }}>Our Mission</h4>
                <p className="text-sm" style={{ color: '#8b95a5' }}>To empower businesses with affordable, top-quality software solutions that drive growth and efficiency.</p>
              </div>
              <div className="card p-5" style={{ borderColor: 'rgba(99,102,241,0.3)' }}>
                <h4 className="font-bold mb-2" style={{ color: '#6366f1' }}>Our Vision</h4>
                <p className="text-sm" style={{ color: '#8b95a5' }}>To be the leading software development partner in the Philippines, known for innovation and reliability.</p>
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
              style={{
                width: '280px',
                height: '280px',
                borderRadius: '1rem',
                border: '1px solid rgba(14,165,233,0.2)',
                boxShadow: '0 20px 60px rgba(14,165,233,0.05)'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
