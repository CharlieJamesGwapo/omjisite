import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const typeColors = { completion: '#10b981', recognition: '#f59e0b', participation: '#0ea5e9' }
const typeEmojis = { completion: '🎓', recognition: '🏆', participation: '📋' }
const typeLabels = { completion: 'Certified', recognition: 'Recognition', participation: 'Participation' }

export default function Certifications() {
  const [certs, setCerts] = useState([])

  useEffect(() => {
    axios.get('/api/certifications').then(res => setCerts(res.data)).catch(() => {})
  }, [])

  if (certs.length === 0) return null

  return (
    <section id="certifications" className="py-20" style={{ background: '#0a0e1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="section-label">Professional Growth</span>
          <h2 className="section-title">Certifications & Recognitions</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="card p-4"
              style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
            >
              <div style={{
                width: '44px', height: '44px', flexShrink: 0, borderRadius: '10px',
                background: cert.type === 'recognition' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem'
              }}>
                {typeEmojis[cert.type] || '🎓'}
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '2px' }}>{cert.title}</h4>
                <p style={{ color: '#6b7280', fontSize: '0.7rem', marginBottom: '4px' }}>{cert.issuer}</p>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: typeColors[cert.type] || '#10b981' }}>
                  {typeLabels[cert.type] || 'Certified'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
