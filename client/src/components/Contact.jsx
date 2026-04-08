import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const inputStyle = {
  width: '100%',
  background: '#161b22',
  border: '1px solid #21262d',
  borderRadius: '8px',
  padding: '0.75rem 1rem',
  color: 'white',
  fontSize: '0.875rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s'
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
    setLoading(false)
    setTimeout(() => setStatus(null), 6000)
  }

  const handleFocus = (e) => { e.target.style.borderColor = '#0ea5e9' }
  const handleBlur = (e) => { e.target.style.borderColor = '#21262d' }

  return (
    <section id="contact" className="py-20" style={{ background: '#0d1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div className="flex-1" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="section-label">Let's Talk</span>
            <h2 className="section-title">Get In Touch</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              <input type="email" placeholder="your@email.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              <input type="text" placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={inputStyle} onFocus={handleFocus} onBlur={handleBlur} />
              <textarea
                placeholder="Tell us about your project..."
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ ...inputStyle, resize: 'none' }}
              />
              <button type="submit" disabled={loading} className="gradient-btn" style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p style={{ color: '#10b981', fontSize: '0.875rem' }}>✅ Message sent! We'll get back to you soon.</p>}
              {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>❌ Failed to send. Please try again or contact us directly.</p>}
            </form>
          </motion.div>

          <motion.div style={{ minWidth: '240px' }} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Contact Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
              <p style={{ color: '#c0c8d8', fontSize: '0.875rem' }}>📞 09655343312</p>
              <p style={{ color: '#c0c8d8', fontSize: '0.875rem' }}>📘 Official OMji Facebook Page</p>
              <p style={{ color: '#c0c8d8', fontSize: '0.875rem' }}>📧 contact@omji.dev</p>
            </div>
            <div style={{ borderTop: '1px solid #21262d', paddingTop: '1.5rem' }}>
              <p style={{ color: '#8b95a5', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Follow Us</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['📘', '📸', '🐦'].map(icon => (
                  <a key={icon} href="#" className="card" style={{ width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', cursor: 'pointer', textDecoration: 'none' }}>{icon}</a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
