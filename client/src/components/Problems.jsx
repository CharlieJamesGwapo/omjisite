import { motion } from 'framer-motion'

const problems = [
  {
    emoji: '📢',
    title: 'Low Brand Awareness',
    description: 'Increase your brand awareness and get more word-of-mouth recommendations from satisfied customers with higher lifetime values.'
  },
  {
    emoji: '📊',
    title: 'Poor Conversion Score',
    description: 'Revamp your digital presence and give your business a more competent website and systems that can boost your growth.'
  },
  {
    emoji: '🎨',
    title: 'Low-Quality Design & UX',
    description: 'Customize your layout, colors, and design that tells a story about your brand — attract and compel customers to come back.'
  },
  {
    emoji: '🖥️',
    title: 'Outdated Systems',
    description: 'Update your site and apps to a modern look and features. Build easy-to-use systems perfectly aligned with your business.'
  }
]

export default function Problems() {
  return (
    <section
      className="py-20"
      style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, marginBottom: '0.5rem' }}>
            We Get It...
          </p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '1rem' }}>
            Problems to be solved
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', fontSize: '1rem', lineHeight: 1.7, marginBottom: '3rem' }}>
            Do you wish you had more time to focus on the success of your business?
            Do you feel like you could be doing more to grow if you weren't so busy
            worrying about how to keep up with everything?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              style={{ background: 'white', borderRadius: '0.75rem', padding: '1.5rem' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            >
              <div style={{
                width: '48px', height: '48px',
                background: 'rgba(14,165,233,0.1)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem', fontSize: '1.5rem'
              }}>
                {problem.emoji}
              </div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.75rem', color: '#0a0e1a' }}>
                {problem.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.6 }}>
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
