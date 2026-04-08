import { motion } from 'framer-motion'

const features = [
  {
    emoji: '🔔',
    title: 'Fast solutions for your long-term success',
    description: 'We are a software development company that offers fast solutions for your long-term success. With our plans, creativity, and dedication, we take your business to the next level. Our systems are designed to get results, increase efficiency, and maximize your ROI.',
    color: '#0ea5e9'
  },
  {
    emoji: '🎯',
    title: 'An interface design tailored for you',
    description: 'OMji developers love challenges! We create professional, user-friendly interfaces tailored for your brand. From school systems to ride-sharing apps — we make it work beautifully on every device.',
    color: '#6366f1'
  },
  {
    emoji: '🚀',
    title: 'The breakthrough of design and development',
    description: "OMji makes software development hassle-free, quick, and affordable but ensures exceptional output every time. From vendo systems to full-stack applications — that's what makes us the best partner for your digital needs.",
    color: '#10b981'
  }
]

export default function WhyChoose() {
  return (
    <section
      className="py-20"
      style={{ background: 'linear-gradient(180deg, #0a0e1a, #0d1117)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Phone Mockups */}
          <motion.div
            className="flex-shrink-0 relative"
            style={{ width: '300px', height: '320px' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Phone 1 */}
            <div style={{
              width: '160px', height: '290px',
              border: '2px solid rgba(14,165,233,0.3)',
              borderRadius: '20px',
              padding: '6px',
              position: 'absolute',
              left: 0, top: 0,
              zIndex: 2,
              background: '#161b22',
              boxShadow: '0 20px 40px rgba(14,165,233,0.1)'
            }}>
              <img src="/assets/billing.png" alt="OMji Billing" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
            </div>
            {/* Phone 2 */}
            <div style={{
              width: '160px', height: '290px',
              border: '2px solid rgba(99,102,241,0.3)',
              borderRadius: '20px',
              padding: '6px',
              position: 'absolute',
              left: '120px', top: '30px',
              zIndex: 1,
              background: '#161b22',
              boxShadow: '0 20px 40px rgba(99,102,241,0.1)'
            }}>
              <img src="/assets/oneride.png" alt="One Ride" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
            </div>
            {/* Floating dots */}
            <div style={{ position: 'absolute', top: '-8px', right: '20px', width: '14px', height: '14px', background: '#f59e0b', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '40px', left: '-10px', width: '10px', height: '10px', background: '#0ea5e9', borderRadius: '50%' }} />
          </motion.div>

          {/* Features */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p style={{ color: '#0ea5e9', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '0.5rem' }}>
              We've been working hard to give you an unbeatable offer
            </p>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2.5rem', lineHeight: 1.2 }}>
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
                  <div className="card flex-shrink-0" style={{
                    width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.25rem', borderRadius: '10px'
                  }}>
                    {feature.emoji}
                  </div>
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: feature.color }}>{feature.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#8b95a5' }}>{feature.description}</p>
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
