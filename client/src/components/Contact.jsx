import { useState } from 'react'
import { motion } from 'framer-motion'
import api from '../lib/api'

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  padding: '0.8rem 1rem',
  color: 'white',
  fontSize: '0.875rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, background 0.2s',
  fontFamily: "'Inter', sans-serif"
}

const contactItems = [
  { icon: '📞', label: 'Phone', value: '09655343312' },
  { icon: '📧', label: 'Email', value: 'contact@omji.dev' },
  { icon: '📘', label: 'Facebook', value: 'Official OMji Page' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
    setLoading(false)
    setTimeout(() => setStatus(null), 6000)
  }

  const handleFocus = (e) => { e.target.style.borderColor = 'rgba(14,165,233,0.5)'; e.target.style.background = 'rgba(14,165,233,0.04)' }
  const handleBlur = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.03)' }

  return (
    <section id="contact" className="py-24" style={{ background: '#0d1117', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '-100px', transform: 'translateY(-50%)',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)',
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
          <span className="section-label">Let's Talk</span>
          <h2 className="section-title">Get In Touch</h2>
          <p style={{ color: '#6b7280', maxWidth: '440px', margin: '0 auto', fontSize: '0.9rem', lineHeight: 1.75 }}>
            Ready to start your project? Drop us a message and we'll get back to you shortly.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card" style={{ padding: '2rem' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text" placeholder="Your Name" required
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                  />
                  <input
                    type="email" placeholder="your@email.com" required
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                  />
                </div>
                <input
                  type="text" placeholder="Subject"
                  value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                  style={inputStyle} onFocus={handleFocus} onBlur={handleBlur}
                />
                <textarea
                  placeholder="Tell us about your project..."
                  required rows={5}
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={handleFocus} onBlur={handleBlur}
                  style={{ ...inputStyle, resize: 'none' }}
                />
                <button
                  type="submit" disabled={loading}
                  className="gradient-btn"
                  style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer', width: '100%' }}
                >
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
                {status === 'success' && (
                  <p style={{ color: '#10b981', fontSize: '0.875rem', textAlign: 'center' }}>
                    ✅ Message sent! We'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center' }}>
                    ❌ Failed to send. Please try again or contact us directly.
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            style={{ minWidth: '260px' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', color: '#ffffff' }}>
              Contact Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
              {contactItems.map(item => (
                <div key={item.label} className="glass-card" style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '0.875rem 1rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</p>
                    <p style={{ color: '#c0c8d8', fontSize: '0.825rem', fontWeight: 500 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
              <p style={{ color: '#6b7280', fontSize: '0.75rem', marginBottom: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['📘', '📸', '💼'].map(icon => (
                  <a key={icon} href="#" className="glass-card" style={{
                    width: '42px', height: '42px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.1rem', cursor: 'pointer',
                    textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s',
                    borderRadius: '10px'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none' }}
                  >{icon}</a>
                ))}
              </div>
            </div>

            {/* CTA hint */}
            <div style={{
              marginTop: '2rem', padding: '1rem', borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(99,102,241,0.08))',
              border: '1px solid rgba(14,165,233,0.15)'
            }}>
              <p style={{ fontSize: '0.75rem', color: '#8b95a5', lineHeight: 1.7 }}>
                We typically respond within <strong style={{ color: '#0ea5e9' }}>24 hours</strong>. For urgent inquiries, reach us directly via phone.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
