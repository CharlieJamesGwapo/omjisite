import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import api from '../lib/api'
import 'swiper/css'
import 'swiper/css/navigation'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    api.get('/api/testimonials').then(res => setTestimonials(res.data)).catch(() => {})
  }, [])

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-24" style={{ background: '#0d1117', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="section-label">What Our Clients Say</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Loved by our clients</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button className="swiper-btn-prev" style={{
              width: '42px', height: '42px', borderRadius: '50%',
              border: '1.5px solid rgba(14,165,233,0.4)', background: 'rgba(14,165,233,0.06)',
              color: '#0ea5e9', cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '20px', transition: 'all 0.2s'
            }}>‹</button>
            <button className="swiper-btn-next" style={{
              width: '42px', height: '42px', borderRadius: '50%',
              border: '1.5px solid rgba(14,165,233,0.4)', background: 'rgba(14,165,233,0.06)',
              color: '#0ea5e9', cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '20px', transition: 'all 0.2s'
            }}>›</button>
          </div>
        </motion.div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{ prevEl: '.swiper-btn-prev', nextEl: '.swiper-btn-next' }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={t.id}>
              <motion.div
                className="glass-card"
                style={{ padding: '1.5rem', height: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Big quote mark */}
                <div style={{
                  position: 'absolute', top: '-8px', right: '16px',
                  fontSize: '5rem', lineHeight: 1, fontFamily: 'Georgia, serif',
                  background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  opacity: 0.15, fontWeight: 900, pointerEvents: 'none'
                }}>"</div>

                {/* Stars */}
                <div style={{ marginBottom: '12px' }}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} style={{
                      color: idx < t.rating ? '#f59e0b' : '#374151',
                      fontSize: '0.85rem', marginRight: '1px'
                    }}>★</span>
                  ))}
                </div>

                <p style={{ color: '#c0c8d8', fontSize: '0.825rem', lineHeight: 1.75, marginBottom: '1.25rem', position: 'relative' }}>
                  "{t.quote}"
                </p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                    background: i % 2 === 0 ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'linear-gradient(135deg,#6366f1,#ec4899)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '0.875rem'
                  }}>
                    {t.clientName?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.825rem', color: '#ffffff' }}>{t.clientName}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.7rem' }}>{t.company}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
