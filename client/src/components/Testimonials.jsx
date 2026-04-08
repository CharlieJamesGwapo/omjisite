import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import axios from 'axios'
import 'swiper/css'
import 'swiper/css/navigation'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    axios.get('/api/testimonials').then(res => setTestimonials(res.data)).catch(() => {})
  }, [])

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-20" style={{ background: '#0d1117' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="section-label">What Our Clients Say</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Love from our clients</h2>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button className="swiper-btn-prev" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #0ea5e9', background: 'transparent', color: '#0ea5e9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>‹</button>
            <button className="swiper-btn-next" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #0ea5e9', background: 'transparent', color: '#0ea5e9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>›</button>
          </div>
        </motion.div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{ prevEl: '.swiper-btn-prev', nextEl: '.swiper-btn-next' }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {testimonials.map(t => (
            <SwiperSlide key={t.id}>
              <div className="card p-6" style={{ height: '100%', boxSizing: 'border-box' }}>
                <div style={{ color: '#f59e0b', fontSize: '1rem', marginBottom: '12px' }}>
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <p style={{ color: '#c0c8d8', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>"{t.quote}"</p>
                <div style={{ borderTop: '1px solid #21262d', paddingTop: '12px' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{t.clientName}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>{t.company}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
