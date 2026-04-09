import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../lib/api'

const typeConfig = {
  completion: { color: '#10b981', gradient: 'linear-gradient(135deg,#10b981,#059669)', icon: '🎓', label: 'Certified' },
  recognition: { color: '#f59e0b', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', icon: '🏆', label: 'Recognition' },
  participation: { color: '#0ea5e9', gradient: 'linear-gradient(135deg,#0ea5e9,#0284c7)', icon: '📋', label: 'Participation' },
}

export default function Certifications() {
  const [certs, setCerts] = useState([])

  useEffect(() => {
    api.get('/api/certifications').then(res => setCerts(res.data)).catch(() => {})
  }, [])

  if (certs.length === 0) return null

  return (
    <section id="certifications" className="py-24" style={{ background: '#0a0e1a', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(16,185,129,0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Professional Growth</span>
          <h2 className="section-title">Certifications & Recognitions</h2>
          <p style={{ color: '#6b7280', maxWidth: '440px', margin: '0 auto', fontSize: '0.875rem', lineHeight: 1.75 }}>
            Continuous learning and recognized achievements in software development and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert, i) => {
            const cfg = typeConfig[cert.type] || typeConfig.completion
            return (
              <motion.div
                key={cert.id}
                className="glass-card"
                style={{
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  padding: '1.125rem', position: 'relative', overflow: 'hidden',
                  transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
                  borderLeft: `3px solid ${cfg.color}40`
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                whileHover={{ y: -3, boxShadow: `0 8px 32px ${cfg.color}12` }}
              >
                <div style={{
                  width: '42px', height: '42px', flexShrink: 0, borderRadius: '10px',
                  background: cfg.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.15rem', boxShadow: `0 4px 12px ${cfg.color}30`
                }}>
                  {cfg.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '3px', color: '#e2e8f0', lineHeight: 1.3 }}>
                    {cert.title}
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '0.7rem', marginBottom: '6px' }}>{cert.issuer}</p>
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, color: cfg.color,
                    background: `${cfg.color}12`, padding: '2px 8px',
                    borderRadius: '100px', border: `1px solid ${cfg.color}20`
                  }}>
                    {cfg.label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
